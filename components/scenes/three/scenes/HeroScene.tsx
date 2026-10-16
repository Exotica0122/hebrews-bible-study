"use client";

import { useEffect, useMemo, useRef } from "react";
import { Cloud, Clouds } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { damp } from "maath/easing";
import {
  BoxGeometry,
  CanvasTexture,
  ConeGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  IcosahedronGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Shape,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Flames } from "../primitives/Flames";
import { Glow, Light } from "../primitives/Glow";
import {
  CloudFloor,
  Cumulus,
  HEAVEN,
  HeavenLights,
  HeavenSky,
} from "../primitives/Heavens";
import {
  easeInSine,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setOpacity } from "../primitives/mutate";
import { HERO_FRAGMENTS } from "@/components/hero/fragments";

const CYCLE = 14;
/** Phase offset and trail colour per fragment, in HERO_FRAGMENTS order: the bush, Sinai, the pillar of cloud, the tablets. */
const LOOKS = [
  { phase: 0.0, trail: "#C8553D" },
  { phase: 0.28, trail: "#B7892C" },
  { phase: 0.55, trail: "#EEE4CF" },
  { phase: 0.8, trail: "#D8D1C2" },
];
const FRAGMENTS = HERO_FRAGMENTS.map((f, i) => ({
  ...LOOKS[i],
  left: f.left / 100,
  top: f.top / 100,
  leftMobile: f.leftMobile / 100,
  topMobile: f.topMobile / 100,
}));
/** The bush's forked limbs: tilt about z, lean about x, length. */
const LIMBS: [number, number, number][] = [
  [0, 0, 0.42],
  [0.55, 0.1, 0.36],
  [-0.6, -0.15, 0.34],
  [0.25, -0.5, 0.3],
  [-0.3, 0.55, 0.3],
];
/** Leaf clumps of the bush, each wrapped in flame: x, y, z, size. */
const LEAVES: [number, number, number, number][] = [
  [0, 0.46, 0, 0.16],
  [0.2, 0.36, 0.04, 0.13],
  [-0.21, 0.34, -0.03, 0.13],
  [0.1, 0.3, -0.16, 0.11],
  [-0.08, 0.32, 0.17, 0.11],
  [0.06, 0.58, 0.05, 0.1],
];
const BUSH_FIRE: [number, number, number][] = [
  [0, 0.5, 0.05],
  [0.19, 0.38, 0.08],
  [-0.2, 0.36, 0.06],
];
/** Pillar of cloud, as heaps stacked and turning slightly as they rise: y, scale. */
const PILLAR: [number, number][] = [
  [0.08, 0.36],
  [0.28, 0.32],
  [0.48, 0.3],
  [0.68, 0.28],
  [0.88, 0.27],
  [1.06, 0.24],
];
const FIRE = "#F09A3E";

function hash3(x: number, y: number, z: number) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return n - Math.floor(n);
}

/** Mount Sinai: a jagged granite peak with a shoulder, base on y = 0 and summit near y = 1. */
function mountainGeometry() {
  const g = new ConeGeometry(0.72, 1.15, 10, 6, true);
  g.translate(0, 0.575, 0);
  const pos = g.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (y < 0.01) continue;
    const n = hash3(x, y, z) - 0.5;
    const ridge = 1 + 0.18 * Math.sin(Math.atan2(z, x) * 3 + 0.6);
    const top = y > 1.14 ? 0 : 1;
    pos.setXYZ(
      i,
      x * (ridge + n * 0.35) * top,
      y + n * 0.12 * top,
      z * (ridge + n * 0.35) * 0.8 * top,
    );
  }
  const flat = g.toNonIndexed();
  g.dispose();
  flat.computeVertexNormals();
  return flat;
}

/** A stone tablet with a rounded top and softened edges, 0.4 wide and 0.56 tall, standing on y = 0. */
function tabletGeometry() {
  const w = 0.2;
  const h = 0.56;
  const s = new Shape();
  s.moveTo(-w, 0);
  s.lineTo(-w, h - w);
  s.absarc(0, h - w, w, Math.PI, 0, true);
  s.lineTo(w, 0);
  s.closePath();
  const g = new ExtrudeGeometry(s, {
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 2,
    curveSegments: 16,
  });
  g.translate(0, 0, -0.03);
  return g;
}

/** Lines of script to lay over a tablet's face. */
function drawScript(): CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 180;
  const ctx = c.getContext("2d")!;
  ctx.strokeStyle = "rgba(58, 48, 38, 0.85)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  for (let i = 0; i < 5; i++) {
    const y = 78 + i * 20;
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(i % 2 ? 92 : 100, y);
    ctx.stroke();
  }
  return new CanvasTexture(c);
}

/** Hebrews 1 opening: above a sea of cloud under the night heavens, the ways God once spoke (bush, Sinai, cloud, tablets) drift in and gather into one light, the Son, shining out over the clouds. */
export function HeroScene({ mobile, effects, captions, pointer }: SceneProps) {
  const { width, height } = useThree((s) => s.viewport);
  const size = useThree((s) => s.size);
  const gl = useThree((s) => s.gl);
  useResetCameraOnUnmount();

  const groups = useRef<(Group | null)[]>([]);
  const trailMats = useRef<(ShaderMaterial | null)[]>([]);
  const fades = useRef(FRAGMENTS.map(() => 1));
  const fadeRefs = useMemo(
    () =>
      FRAGMENTS.map((_, i) => ({
        get current() {
          return fades.current[i];
        },
      })),
    [],
  );
  const centreMat = useRef<ShaderMaterial>(null);
  const centre = useRef({ x: 0, y: 0.24 * height });
  const centreGroup = useRef<Group>(null);
  const gust = useRef(0);
  const frame = useRef(0);
  const base = mobile ? 0.5 : 0.85;

  const kit = useMemo(
    () => ({
      branch: new CylinderGeometry(0.014, 0.03, 1, 5),
      clump: new IcosahedronGeometry(1, 0),
      wood: new MeshStandardMaterial({
        color: "#5A3A26",
        roughness: 1,
        flatShading: true,
        transparent: true,
      }),
      leaf: new MeshStandardMaterial({
        color: "#4A5632",
        roughness: 0.9,
        flatShading: true,
        emissive: "#8A3A22",
        emissiveIntensity: 0.2,
        transparent: true,
      }),
      peak: mountainGeometry(),
      rock: new MeshStandardMaterial({
        color: "#6A4A40",
        roughness: 1,
        flatShading: true,
        emissive: "#2A1A1C",
        emissiveIntensity: 0.3,
        side: DoubleSide,
        transparent: true,
      }),
      tablet: tabletGeometry(),
      slab: new BoxGeometry(0.95, 0.08, 0.34),
      stone: new MeshStandardMaterial({
        color: "#BFB298",
        roughness: 0.9,
        emissive: "#3A3428",
        emissiveIntensity: 0.15,
        transparent: true,
      }),
      base: new MeshStandardMaterial({
        color: "#6E5E52",
        roughness: 1,
        flatShading: true,
        transparent: true,
      }),
      script: new MeshBasicMaterial({
        map: drawScript(),
        transparent: true,
        depthWrite: false,
      }),
    }),
    [],
  );
  const fading = useMemo(
    () => [
      [kit.wood, kit.leaf],
      [kit.rock],
      [],
      [kit.stone, kit.script, kit.base],
    ],
    [kit],
  );
  useEffect(
    () => () => {
      kit.script.map?.dispose();
      Object.values(kit).forEach((o) => o.dispose());
    },
    [kit],
  );

  useEffect(
    () => () => {
      captions?.current.forEach((el) => {
        if (!el) return;
        el.style.transform = "";
        const cap = el.lastElementChild as HTMLElement | null;
        if (cap) cap.style.opacity = "";
      });
    },
    [captions],
  );

  useSceneTime((t, dt, { camera }) => {
    frame.current++;
    if (frame.current % 30 === 1) {
      const target = document.getElementById("hb-hero-centre");
      const host = gl.domElement.getBoundingClientRect();
      if (target && host.width > 0) {
        const r = target.getBoundingClientRect();
        const cx = (r.left + r.width / 2 - host.left) / host.width;
        const cy = (r.top + r.height / 2 - host.top) / host.height;
        centre.current = { x: (cx - 0.5) * width, y: (0.5 - cy) * height };
      }
    }
    if (centreGroup.current)
      centreGroup.current.position.set(centre.current.x, centre.current.y, 0);
    const p = pointer?.current ?? { x: 0, y: 0 };
    damp(camera.position, "x", Math.sin(t * 0.11) * 0.12 + p.x * 0.35, 0.8, dt);
    damp(camera.position, "y", Math.cos(t * 0.09) * 0.08 - p.y * 0.25, 0.8, dt);
    camera.position.z = 8;
    camera.lookAt(0, 0, 0);
    gust.current = 0.15 + 0.15 * Math.sin(t * 0.8);

    let pulse = 0;
    FRAGMENTS.forEach((f, i) => {
      const p = (((t / CYCLE + f.phase) % 1) + 1) % 1;
      const hx = ((mobile ? f.leftMobile : f.left) - 0.5) * width;
      const hy = (0.5 - (mobile ? f.topMobile : f.top)) * height;
      const k = easeInSine(p);
      const x = lerp(hx, centre.current.x, k);
      const y =
        lerp(hy, centre.current.y, k) + Math.sin(t * 0.7 + i) * 0.03 * (1 - k);
      const alpha = smoothstep(0, 0.08, p) * (1 - smoothstep(0.9, 1, p));
      pulse = Math.max(pulse, smoothstep(0.92, 1, p));
      fades.current[i] = alpha * (1 - 0.6 * k);
      const g = groups.current[i];
      if (g) {
        g.position.set(x, y, 0);
        g.scale.setScalar(base * (1 - 0.7 * k));
        g.rotation.y = Math.sin(t * 0.25 + i * 1.7) * 0.25;
        g.visible = alpha > 0.02;
      }
      fading[i].forEach((m) => setOpacity(m, alpha));
      const tm = trailMats.current[i];
      if (tm) tm.uniforms.uAlpha.value = alpha * 0.2 * (1 - k);
      const el = captions?.current[i];
      if (el && size.width > 0) {
        const dx = ((x - hx) / width) * size.width;
        const dy = -((y - hy) / height) * size.height;
        el.style.transform = `translate(calc(-50% + ${dx.toFixed(1)}px), ${dy.toFixed(1)}px)`;
        const cap = el.lastElementChild as HTMLElement | null;
        if (cap)
          cap.style.opacity = (alpha * (1 - smoothstep(0.12, 0.4, k))).toFixed(
            2,
          );
      }
    });
    if (centreMat.current)
      centreMat.current.uniforms.uAlpha.value = 1 + pulse * 0.3;
  });

  return (
    <>
      <fog attach="fog" args={["#2A2238", 12, 70]} />
      <HeavenSky horizonY={-2.4} glow={0.7} stars={mobile ? 400 : 900} />
      <HeavenLights sun={[-3, 4, 6]} intensity={1.1} fill={0.7} />
      <CloudFloor y={-4.6} amp={1.6} tone={0.38} warm={[0, -14]} />
      {[-1.15, -0.6, 0, 0.6, 1.15].map((a, i) => (
        <Glow
          key={a}
          position={[Math.sin(a) * 9, -2 + Math.cos(a) * 9, -16]}
          rotation={-a}
          size={1}
          scaleX={mobile ? 1 : 1.4}
          scaleY={20}
          color={HEAVEN.gold}
          inner={HEAVEN.light}
          alpha={0.08 + (i % 2) * 0.04}
          power={1.4}
          renderOrder={-6}
        />
      ))}
      <group ref={centreGroup} position={[0, 0.24 * height, 0]}>
        <pointLight intensity={10} distance={8} decay={1.4} color="#F3D38A" />
        <Glow
          size={mobile ? 10 : 16}
          color="#B7892C"
          alpha={0.24}
          power={2.4}
          renderOrder={2}
        />
        <Light
          size={mobile ? 0.4 : 0.5}
          coronaScale={6}
          intensity={1.2}
          renderOrder={10}
        />
        <Glow
          size={0.3}
          color="#FFF8E8"
          inner="#FFFFFF"
          alpha={1}
          power={1}
          renderOrder={14}
          onMaterial={(m) => {
            centreMat.current = m;
          }}
        />
      </group>
      <Clouds
        material={MeshBasicMaterial}
        texture="/textures/cloud.png"
        limit={mobile ? 16 : 32}
        renderOrder={7}
      >
        {FRAGMENTS.map((f, i) => (
          <group
            key={i}
            ref={(g) => {
              groups.current[i] = g;
            }}
          >
            <Glow
              position={[0, 0.45, 0]}
              size={mobile ? 2.6 : 3.6}
              color={f.trail}
              alpha={0.2}
              power={2.2}
              renderOrder={6}
              onMaterial={(m) => {
                trailMats.current[i] = m;
              }}
            />
            {i === 0 && (
              <>
                {LIMBS.map(([tz, tx, len], j) => (
                  <group key={j} rotation={[tx, 0, tz]}>
                    <mesh
                      geometry={kit.branch}
                      material={kit.wood}
                      position={[0, len / 2, 0]}
                      scale={[1, len, 1]}
                    />
                  </group>
                ))}
                {LEAVES.map(([x, y, z, r], j) => (
                  <mesh
                    key={j}
                    geometry={kit.clump}
                    material={kit.leaf}
                    position={[x, y, z]}
                    rotation={[j, j * 1.3, 0]}
                    scale={[r * 1.2, r * 0.8, r]}
                  />
                ))}
                <pointLight
                  position={[0, 0.55, 0.35]}
                  intensity={1.6}
                  distance={2}
                  decay={1.5}
                  color={FIRE}
                />
                <Glow
                  position={[0, 0.45, 0]}
                  size={1.3}
                  color="#C8553D"
                  inner="#F3B35A"
                  alpha={0.3}
                  power={2.2}
                  renderOrder={8}
                />
                <Flames
                  emitters={BUSH_FIRE}
                  count={mobile ? 40 : 80}
                  rise={0.45}
                  size={mobile ? 3.5 : 4.5}
                  gust={gust}
                  fade={fadeRefs[0]}
                />
              </>
            )}
            {i === 1 && (
              <>
                <mesh
                  geometry={kit.peak}
                  material={kit.rock}
                  rotation={[0, 0.4, 0]}
                />
                <pointLight
                  position={[0, 1.3, 0.3]}
                  intensity={1.8}
                  distance={2.2}
                  decay={1.5}
                  color={FIRE}
                />
                <Glow
                  position={[0, 1.12, 0]}
                  size={1.1}
                  color={FIRE}
                  inner="#FFE3B0"
                  alpha={0.5}
                  power={1.8}
                  renderOrder={8}
                />
                <Flames
                  emitters={[[0, 1.08, 0]]}
                  count={mobile ? 30 : 60}
                  rise={0.55}
                  size={mobile ? 4 : 5}
                  gust={gust}
                  fade={fadeRefs[1]}
                />
                <Cloud
                  position={[0, 1.38, 0]}
                  segments={mobile ? 4 : 6}
                  bounds={[0.9, 0.25, 0.4]}
                  volume={0.7}
                  color="#5A4A48"
                  opacity={0.45}
                  fade={30}
                  speed={0.1}
                  growth={1.4}
                  seed={5}
                />
              </>
            )}
            {i === 2 && (
              <>
                {PILLAR.map(([y, sc], j) => (
                  <group key={j} rotation={[0, j * 0.9, 0]}>
                    <Cumulus
                      position={[Math.sin(j * 1.7) * 0.04, y, 0]}
                      scale={[sc, sc * 1.5, sc]}
                      seed={j + 11}
                      puffs={9}
                      opacity={fadeRefs[2]}
                    />
                  </group>
                ))}
                <pointLight
                  position={[0.3, 0.7, 0.8]}
                  intensity={1.4}
                  distance={2.5}
                  decay={1.5}
                  color="#F3D38A"
                />
                <Glow
                  position={[0, 0.6, -0.2]}
                  size={1.3}
                  scaleX={0.55}
                  scaleY={1.3}
                  color="#B7892C"
                  inner="#F3D38A"
                  alpha={0.25}
                  power={1.8}
                  renderOrder={6}
                />
              </>
            )}
            {i === 3 && (
              <>
                <mesh
                  geometry={kit.slab}
                  material={kit.base}
                  position={[0, -0.04, 0]}
                />
                {[-0.22, 0.22].map((x) => (
                  <group
                    key={x}
                    position={[x, 0, 0]}
                    rotation={[-0.08, -x * 0.9, x * 0.08]}
                  >
                    <mesh geometry={kit.tablet} material={kit.stone} />
                    <mesh material={kit.script} position={[0, 0.28, 0.047]}>
                      <planeGeometry args={[0.4, 0.56]} />
                    </mesh>
                  </group>
                ))}
                <pointLight
                  position={[0.3, 0.9, 0.8]}
                  intensity={2}
                  distance={2.5}
                  decay={1.6}
                  color="#EEE4CF"
                />
              </>
            )}
          </group>
        ))}
      </Clouds>
      {effects && <SceneEffects bloom={0.35} />}
    </>
  );
}
