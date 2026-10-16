"use client";

import { useEffect, useMemo, useRef } from "react";
import { Cloud, Clouds } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { damp } from "maath/easing";
import {
  CanvasTexture,
  ConeGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
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
const BRANCHES = Array.from({ length: 7 }, (_, i) => ({
  yaw: i * 2.4,
  tilt: 0.3 + (i % 3) * 0.24,
}));
const FIRE = "#F09A3E";

/** A stone tablet with a rounded top, 0.4 wide and 0.56 tall, standing on y = 0. */
function tabletGeometry() {
  const w = 0.2;
  const h = 0.56;
  const s = new Shape();
  s.moveTo(-w, 0);
  s.lineTo(-w, h - w);
  s.absarc(0, h - w, w, Math.PI, 0, true);
  s.lineTo(w, 0);
  s.closePath();
  const g = new ExtrudeGeometry(s, { depth: 0.07, bevelEnabled: false });
  g.translate(0, 0, -0.035);
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
      branch: new CylinderGeometry(0.012, 0.035, 0.5, 5),
      wood: new MeshStandardMaterial({
        color: "#4A2E1E",
        roughness: 1,
        transparent: true,
      }),
      peak: new ConeGeometry(0.95, 0.9, 6, 1),
      rock: new MeshStandardMaterial({
        color: "#1C1612",
        roughness: 1,
        flatShading: true,
        transparent: true,
      }),
      tablet: tabletGeometry(),
      stone: new MeshStandardMaterial({
        color: "#B9AE98",
        roughness: 0.95,
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
    () => [[kit.wood], [kit.rock], [], [kit.stone, kit.script]],
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
                {BRANCHES.map((b, j) => (
                  <group
                    key={j}
                    rotation={[
                      b.tilt * Math.sin(b.yaw),
                      0,
                      b.tilt * Math.cos(b.yaw),
                    ]}
                  >
                    <mesh
                      geometry={kit.branch}
                      material={kit.wood}
                      position={[0, 0.25, 0]}
                    />
                  </group>
                ))}
                <pointLight
                  position={[0, 0.5, 0.3]}
                  intensity={2.5}
                  distance={2}
                  decay={1.6}
                  color={FIRE}
                />
                <Glow
                  position={[0, 0.4, 0]}
                  size={1.5}
                  color="#C8553D"
                  alpha={0.3}
                  power={2.2}
                  renderOrder={8}
                />
                <Flames
                  emitters={[[0, 0.28, 0]]}
                  count={mobile ? 30 : 60}
                  rise={0.6}
                  size={mobile ? 4 : 5}
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
                  position={[0, 0.45, 0]}
                  rotation={[0, 0.4, 0]}
                />
                <pointLight
                  position={[0, 1, 0.25]}
                  intensity={1.5}
                  distance={2}
                  decay={1.6}
                  color={FIRE}
                />
                <Glow
                  position={[0, 0.95, 0]}
                  size={1.1}
                  color={FIRE}
                  inner="#FFE3B0"
                  alpha={0.5}
                  power={1.8}
                  renderOrder={8}
                />
                <Flames
                  emitters={[[0, 0.88, 0]]}
                  count={mobile ? 30 : 60}
                  rise={0.55}
                  size={mobile ? 4 : 5}
                  gust={gust}
                  fade={fadeRefs[1]}
                />
                <Cloud
                  position={[0, 1.1, 0]}
                  segments={mobile ? 4 : 6}
                  bounds={[0.9, 0.3, 0.4]}
                  volume={0.8}
                  color="#8A7A68"
                  opacity={0.4}
                  fade={30}
                  speed={0.1}
                  growth={1.4}
                  seed={5}
                />
              </>
            )}
            {i === 2 && (
              <>
                <Glow
                  position={[0, 0.55, 0]}
                  size={1.2}
                  scaleX={0.5}
                  scaleY={1.4}
                  color="#B7892C"
                  inner="#F3D38A"
                  alpha={0.3}
                  power={1.8}
                  renderOrder={6}
                />
                <Cloud
                  position={[0, 0.6, 0]}
                  segments={mobile ? 6 : 10}
                  bounds={[0.25, 1.1, 0.25]}
                  volume={0.8}
                  color="#E6DCC8"
                  opacity={0.5}
                  fade={40}
                  speed={0.15}
                  growth={1.2}
                  seed={3}
                  concentrate="inside"
                />
              </>
            )}
            {i === 3 && (
              <>
                {[-0.22, 0.22].map((x) => (
                  <group
                    key={x}
                    position={[x, 0, 0]}
                    rotation={[0, x * 0.5, 0]}
                  >
                    <mesh geometry={kit.tablet} material={kit.stone} />
                    <mesh material={kit.script} position={[0, 0.28, 0.037]}>
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
