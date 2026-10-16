"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import {
  AddEquation,
  BufferAttribute,
  BufferGeometry,
  Color,
  CustomBlending,
  CylinderGeometry,
  Float32BufferAttribute,
  MeshStandardMaterial,
  OneFactor,
  ShaderMaterial,
  type Mesh,
  type PointLight,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Squall } from "../primitives/Coast";
import { Carved } from "../primitives/Salem";
import {
  DUSK,
  DuneField,
  DuskLights,
  DuskSky,
  makeDuskWater,
  type Clearing,
} from "../primitives/Wilderness";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 15;
const GROUND = -1.35;
const CRAG_H = 2.6;
const CLEFT_A = Math.PI / 2 - 0.25;
/** Where the cleft meets the ground, in front of the crag. */
const FOOT: [number, number] = [0.32, 1.05];
const STRIKE = 3;
const OPEN = 3.4;
const FLOW = 3.9;
const DROPS = 260;
const CLEAR: Clearing = [0, 0.5, 3.4];
const STRATA = ["#B5805A", "#9E6A48", "#C29068", "#A8744E", "#8E5E40"];
/** The people standing back from the rock: x, z, facing, robe. */
const PEOPLE: [number, number, number, string][] = [
  [2.5, 1.2, -1.9, "#7A6248"],
  [3.1, 0.7, -1.7, "#5E4A3A"],
  [2.9, 1.8, -2.0, "#8A7056"],
  [3.6, 1.3, -1.8, "#6B5442"],
  [3.4, 0.1, -1.6, "#7E6650"],
  [4.1, 0.8, -1.8, "#5A4636"],
];

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** The rock at Horeb: a sandstone crag laid down in courses, each a slightly different shelf, split by a cleft on its face. Base at the origin. */
function cragGeometry() {
  const g = new CylinderGeometry(0.85, 1.5, CRAG_H, 30, 22);
  g.translate(0, CRAG_H / 2, 0);
  const pos = g.getAttribute("position");
  const colors: number[] = [];
  const c = new Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const r = Math.hypot(x, z);
    const a = Math.atan2(z, x);
    const band = Math.floor(y * 4.2);
    const shelf = 1 + (hash(band) - 0.5) * 0.12;
    const n =
      1 +
      Math.sin(a * 3 + y * 1.3) * 0.1 +
      Math.sin(a * 7 + y * 2.9 + 1) * 0.05 +
      (hash(i) - 0.5) * 0.07;
    const da = Math.atan2(Math.sin(a - CLEFT_A), Math.cos(a - CLEFT_A));
    const cleft =
      1 -
      0.32 *
        Math.exp(-Math.pow(da * 7, 2)) *
        smoothstep(0.05, 0.35, y / CRAG_H) *
        (1 - smoothstep(0.85, 1, y / CRAG_H));
    const k = r > 0.001 ? shelf * n * cleft : 1;
    const top = y > CRAG_H - 0.01 ? 0.9 : 1;
    pos.setXYZ(
      i,
      x * k * 1.15,
      y + (top < 1 ? (hash(i + 3) - 0.5) * 0.2 : (hash(i + 5) - 0.5) * 0.06),
      z * k * 0.85,
    );
    c.set(STRATA[((band % STRATA.length) + STRATA.length) % STRATA.length]);
    colors.push(c.r, c.g, c.b);
  }
  g.setAttribute("color", new Float32BufferAttribute(colors, 3));
  const flat = g.toNonIndexed();
  g.dispose();
  flat.computeVertexNormals();
  return flat;
}

const DROP_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uPixelRatio;
uniform float uFall;
varying float vAlpha;
float hash(float n) { return fract(sin(n) * 43758.5453); }
void main() {
  float life = fract(uTime * (0.7 + hash(aSeed * 5.3) * 0.4) + aSeed);
  float spread = hash(aSeed * 9.1) - 0.5;
  vec3 p = position;
  p.z += life * (0.25 + hash(aSeed * 2.7) * 0.2);
  p.x += spread * (0.04 + life * 0.1);
  p.y -= life * life * uFall;
  vAlpha = smoothstep(0.0, 0.06, life) * (1.0 - smoothstep(0.85, 1.0, life));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (0.5 + hash(aSeed * 3.3) * 0.7) * uPixelRatio * (40.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const DROP_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uFlow;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.1, d) * vAlpha * uFlow;
  gl_FragColor = vec4(uColor * a, a);
}`;

const STREAM_FRAG = /* glsl */ `
uniform float uTime;
uniform float uFlow;
varying vec2 vUv;
void main() {
  float across = 1.0 - abs(vUv.x - 0.5) * 2.0;
  float streak = 0.55 + 0.45 * sin(vUv.x * 40.0 + sin(vUv.y * 6.0) * 2.0) * sin(vUv.y * 30.0 + uTime * 14.0);
  float reach = smoothstep(1.0 - uFlow * 1.2, 1.0 - uFlow * 1.2 + 0.1, vUv.y);
  float a = smoothstep(0.0, 0.5, across) * streak * reach * uFlow * 0.5;
  vec3 c = mix(vec3(0.62, 0.7, 0.78), vec3(1.0, 0.95, 0.88), streak * across);
  gl_FragColor = vec4(c * a, a);
}`;

const STREAM_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const additive = {
  transparent: true,
  depthWrite: false,
  blending: CustomBlending,
  blendEquation: AddEquation,
  blendSrc: OneFactor,
  blendDst: OneFactor,
} as const;

/** “Where your fathers put me to the test”: Moses strikes the rock at Horeb while the people stand back; light breaks from the cleft and water pours out and spreads across the sand (Exod 17:1–7). */
export function RockScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const pixelRatio = useThree((s) => s.viewport.dpr);
  const haze = useRef(1);
  const key = useRef<PointLight>(null);
  const seam = useRef<ShaderMaterial | null>(null);
  const staff = useRef<Mesh>(null);
  const pool = useRef<Mesh>(null);
  const crag = useMemo(() => cragGeometry(), []);
  const stone = useMemo(
    () =>
      new MeshStandardMaterial({
        vertexColors: true,
        roughness: 1,
        flatShading: true,
        emissive: "#3A2420",
        emissiveIntensity: 0.25,
      }),
    [],
  );
  const water = useMemo(
    () => makeDuskWater({ source: [FOOT[0], FOOT[1]], rings: 1 }),
    [],
  );
  const stream = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: STREAM_VERT,
        fragmentShader: STREAM_FRAG,
        uniforms: { uTime: { value: 0 }, uFlow: { value: 0 } },
        ...additive,
      }),
    [],
  );
  const drops = useMemo(() => {
    const g = new BufferGeometry();
    const pos = new Float32Array(DROPS * 3);
    const seed = new Float32Array(DROPS);
    for (let i = 0; i < DROPS; i++) {
      pos[i * 3] = FOOT[0];
      pos[i * 3 + 1] = GROUND + 0.75;
      pos[i * 3 + 2] = FOOT[1] - 0.2;
      seed[i] = i / DROPS;
    }
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new BufferAttribute(seed, 1));
    const m = new ShaderMaterial({
      vertexShader: DROP_VERT,
      fragmentShader: DROP_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uFlow: { value: 0 },
        uFall: { value: 0.75 },
        uColor: { value: new Color("#DCE8E6") },
      },
      ...additive,
    });
    return { g, m };
  }, []);
  useEffect(
    () => () => {
      crag.dispose();
      stone.dispose();
      water.dispose();
      stream.dispose();
      drops.g.dispose();
      drops.m.dispose();
    },
    [crag, stone, water, stream, drops],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(
      Math.sin(t * 0.1) * 0.25 + 0.6,
      1.7,
      mobile ? 9.6 : 7.4,
    );
    camera.lookAt(0.8, -0.85, 0.4);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 0.9, p) + smoothstep(13.8, 15, p);
    const lift =
      smoothstep(1.2, 2.6, p) * (1 - smoothstep(STRIKE, STRIKE + 0.2, p));
    const open = smoothstep(OPEN, OPEN + 1, p);
    const flow = smoothstep(FLOW, FLOW + 0.8, p);
    const spread = smoothstep(FLOW + 0.3, FLOW + 4.5, p);

    if (staff.current) staff.current.rotation.z = 0.35 - lift * 0.9;
    setUniform(drops.m, "uTime", t);
    setUniform(drops.m, "uPixelRatio", pixelRatio);
    setUniform(drops.m, "uFlow", flow);
    setUniform(stream, "uTime", t);
    setUniform(stream, "uFlow", flow);
    setUniform(water, "uTime", t);
    setUniform(water, "uAlpha", 0.9 * smoothstep(0, 0.15, spread));
    if (pool.current) {
      const s = 0.2 + spread * (mobile ? 2.6 : 3.2);
      pool.current.scale.set(s * 1.6, s * 0.8, 1);
    }
    if (key.current) key.current.intensity = open * 4;
    if (seam.current)
      setUniform(
        seam.current,
        "uAlpha",
        open * (0.75 + Math.sin(t * 5) * 0.05),
      );
  });

  return (
    <>
      <fog attach="fog" args={[DUSK.haze, 9, 36]} />
      <DuskSky horizonY={-1.2} glowStrength={0.7} stars={mobile ? 90 : 180} />
      <DuskLights sun={[-9, 3, -1]} intensity={2.6} />
      <DuneField y={GROUND} clear={CLEAR} amp={1.1} near={9} far={-38} />
      <pointLight
        ref={key}
        position={[FOOT[0] + 0.1, GROUND + 0.9, FOOT[1] + 0.6]}
        intensity={0}
        distance={5}
        decay={1.6}
        color="#F3D38A"
      />
      <group scale={mobile ? 0.8 : 1}>
        <mesh
          geometry={crag}
          material={stone}
          position={[0, GROUND - 0.05, 0]}
        />
        <mesh
          ref={pool}
          material={water}
          position={[FOOT[0] + 1.1, GROUND + 0.012, FOOT[1] + 0.45]}
          rotation={[-Math.PI / 2, 0, 0]}
          renderOrder={3}
        >
          <circleGeometry args={[0.5, 40]} />
        </mesh>
        <Glow
          position={[FOOT[0], GROUND + 0.95, FOOT[1] - 0.15]}
          size={1}
          scaleX={0.22}
          scaleY={1.2}
          color="#F3D38A"
          inner="#FFF8E8"
          alpha={0}
          power={1.4}
          renderOrder={6}
          onMaterial={(m) => {
            seam.current = m;
          }}
        />
        <mesh
          material={stream}
          position={[FOOT[0], GROUND + 0.4, FOOT[1] - 0.05]}
          rotation={[-0.25, 0, 0]}
          renderOrder={7}
        >
          <planeGeometry args={[0.1, 0.8]} />
        </mesh>
        <points
          geometry={drops.g}
          material={drops.m}
          frustumCulled={false}
          renderOrder={7}
        />
        <group
          position={[1.35, GROUND, 1.25]}
          rotation={[0, -1.3, 0]}
          scale={0.62}
        >
          <Carved position={[0, 0, 0]} robe="#8C7A62" />
          <mesh ref={staff} position={[0.28, 1, 0.15]} rotation={[0, 0, 0.35]}>
            <cylinderGeometry args={[0.022, 0.022, 2.1, 5]} />
            <meshStandardMaterial color="#5A4636" roughness={0.9} />
          </mesh>
        </group>
        {PEOPLE.map(([x, z, r, robe], i) => (
          <Carved
            key={i}
            position={[x, GROUND, z]}
            rotationY={r}
            robe={robe}
            scale={0.56 + hash(i) * 0.06}
          />
        ))}
      </group>
      <Squall opacity={haze} color="#1E1A2A" />
      {effects && <SceneEffects bloom={0.45} threshold={0.8} />}
    </>
  );
}
