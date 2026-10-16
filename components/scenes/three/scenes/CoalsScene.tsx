"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  Color,
  DodecahedronGeometry,
  IcosahedronGeometry,
  MeshStandardMaterial,
  ShaderMaterial,
  type Mesh,
  type PointLight,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers } from "../primitives/Earth";
import { Squall } from "../primitives/Coast";
import { Carved } from "../primitives/Salem";
import {
  DUSK,
  DuneField,
  DuskLights,
  DuskSky,
  Tents,
  type Clearing,
  type TentSpot,
} from "../primitives/Wilderness";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 15;
const GROUND = -0.9;
const COALS = 30;
const LONE_HOME: [number, number] = [0.72, 0.42];
const LONE_AWAY = 1.95;
const LONE_R = 0.15;
const RING = 0.98;
const CLEAR: Clearing = [0, -0.5, 4.5];
const EMBER_BOX: [number, number, number] = [1.4, 2.4, 1.2];
/** Those gathered at the fire, kneeling round it: angle, robe. */
const KIN: [number, string][] = [
  [-2.5, "#7A5E48"],
  [-1.95, "#5E4A3A"],
  [-1.35, "#8A6A50"],
  [-0.8, "#6B5442"],
  [3.05, "#7E6650"],
];
const CAMP: TentSpot[] = [
  { x: -4.4, z: -5.2, s: 0.8, r: 0.3, lit: true },
  { x: -1.7, z: -6.6, s: 0.9, r: -0.1 },
  { x: 2.3, z: -6, s: 0.8, r: 0.2, lit: true },
  { x: 5, z: -4.8, s: 0.75, r: -0.4 },
  { x: 0.4, z: -8.4, s: 0.9, r: 0.1, lit: true },
];

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** The bed on a sunflower spiral inside the hearth ring. */
const BED = Array.from({ length: COALS - 1 }, (_, i) => {
  const a = i * 2.39996;
  const r = Math.sqrt((i + 0.5) / (COALS - 1)) * 0.72;
  return {
    x: Math.cos(a) * r,
    z: Math.sin(a) * r * 0.85,
    s: 0.11 + hash(i) * 0.07,
    rot: hash(i + 40) * 6.28,
    f: 1.3 + hash(i + 7) * 2.2,
    lift: (1 - r / 0.72) * 0.08,
  };
});

/** Hearth stones round the bed, with a gap on the right where the lone coal rolls out. */
const STONES = Array.from({ length: 14 }, (_, i) => {
  const a = 0.8 + (i / 14) * (Math.PI * 2 - 1);
  return {
    x: Math.cos(a) * RING,
    z: Math.sin(a) * RING * 0.85,
    s: 0.13 + hash(i + 70) * 0.06,
    r: hash(i + 80) * 6.28,
  };
});

function coalGeometry() {
  const g = new DodecahedronGeometry(1, 1);
  const pos = g.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const n =
      1 +
      Math.sin(x * 4.3 + z * 2.1) * 0.12 +
      Math.sin(y * 6.7 + x * 3.3) * 0.07;
    pos.setXYZ(i, x * n * 1.15, y * n * 0.7, z * n);
  }
  g.computeVertexNormals();
  return g;
}

const COAL_VERT = /* glsl */ `
varying vec3 vLocal;
varying vec3 vNormal;
void main() {
  vLocal = position;
  vNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const COAL_FRAG = /* glsl */ `
uniform float uHeat;
uniform float uTime;
uniform float uSeed;
uniform vec3 uSky;
varying vec3 vLocal;
varying vec3 vNormal;
float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
void main() {
  vec3 p = vLocal * 1.9 + uSeed * 7.0;
  float n = noise(p) * 0.65 + noise(p * 2.3) * 0.35;
  float crack = 1.0 - smoothstep(0.0, 0.07, abs(n - 0.5));
  float pulse = 0.85 + 0.15 * sin(uTime * 2.0 + uSeed * 20.0 + n * 6.0);
  float heat = clamp(uHeat, 0.0, 1.0);
  vec3 crust = mix(vec3(0.07, 0.055, 0.05), vec3(0.46, 0.44, 0.42), 1.0 - heat);
  crust *= 0.8 + 0.4 * noise(p * 3.0);
  float up = clamp(vNormal.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 lit = crust * (uSky * up * 0.35 + vec3(0.9, 0.5, 0.3) * 0.5);
  vec3 ember = mix(vec3(0.7, 0.12, 0.03), vec3(1.0, 0.5, 0.14), heat * pulse);
  float glow = heat * pulse * (crack * 1.1 + 0.45 * (1.0 - up) * heat + 0.08);
  gl_FragColor = vec4(lit + ember * glow * 1.6, 1.0);
}`;

/** “Exhort one another every day”: round a fire in the camp a coal rolls out of the bed and goes grey; drawn back among the others, it catches again. */
export function CoalsScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const lone = useRef<Mesh>(null);
  const key = useRef<PointLight>(null);
  const bedGlow = useRef<ShaderMaterial | null>(null);
  const loneGlow = useRef<ShaderMaterial | null>(null);
  const loneGlowMesh = useRef<Mesh | null>(null);
  const geometry = useMemo(() => coalGeometry(), []);
  const stoneGeo = useMemo(() => new IcosahedronGeometry(1, 0), []);
  const stone = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#6E625A",
        roughness: 1,
        flatShading: true,
      }),
    [],
  );
  const materials = useMemo(
    () =>
      Array.from(
        { length: COALS },
        (_, i) =>
          new ShaderMaterial({
            vertexShader: COAL_VERT,
            fragmentShader: COAL_FRAG,
            uniforms: {
              uHeat: { value: 1 },
              uTime: { value: 0 },
              uSeed: { value: hash(i + 200) },
              uSky: { value: new Color(DUSK.shade) },
            },
          }),
      ),
    [],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      stoneGeo.dispose();
      stone.dispose();
      materials.forEach((m) => m.dispose());
    },
    [geometry, stoneGeo, stone, materials],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(
      -0.2 + Math.sin(t * 0.08) * 0.15,
      mobile ? 1.7 : 1.3,
      mobile ? 7.6 : 5.2,
    );
    camera.lookAt(0.35, GROUND + (mobile ? 0.05 : 0.2), -0.9);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 0.9, p) + smoothstep(13.8, 15, p);
    const out =
      easeInOutCubic((p - 2) / 1.6) * (1 - easeInOutCubic((p - 8.6) / 1.6));
    const heat = 1 - smoothstep(3.4, 7.5, p) + smoothstep(10, 12, p);

    BED.forEach((c, i) => {
      setUniform(
        materials[i],
        "uHeat",
        0.72 + 0.18 * Math.sin(t * c.f * 0.5 + i) + c.lift * 2,
      );
      setUniform(materials[i], "uTime", t);
    });
    const lm = materials[COALS - 1];
    setUniform(lm, "uHeat", heat * (0.85 + 0.15 * Math.sin(t * 2.1)));
    setUniform(lm, "uTime", t);

    const x = lerp(LONE_HOME[0], LONE_AWAY, out);
    const z = lerp(LONE_HOME[1], LONE_HOME[1] + 0.35, out);
    if (lone.current) {
      lone.current.position.x = x;
      lone.current.position.z = z;
      lone.current.rotation.z = -(x - LONE_HOME[0]) / LONE_R;
    }
    loneGlowMesh.current?.position.set(x, GROUND + 0.12, z);
    if (loneGlow.current) setUniform(loneGlow.current, "uAlpha", 0.45 * heat);
    if (bedGlow.current)
      setUniform(bedGlow.current, "uAlpha", 0.38 + 0.05 * Math.sin(t * 3.1));
    if (key.current)
      key.current.intensity =
        6 + Math.sin(t * 5.3) * 0.6 + Math.sin(t * 8.9) * 0.4;
  });

  return (
    <>
      <fog attach="fog" args={["#2A2236", 5, 22]} />
      <DuskSky horizonY={-0.2} glowStrength={0.55} stars={mobile ? 90 : 180} />
      <DuskLights sun={[-8, 1.6, -8]} intensity={0.9} fill={0.55} />
      <DuneField y={GROUND} clear={CLEAR} amp={0.8} near={7} far={-28} />
      <Tents spots={CAMP} y={GROUND} />
      <pointLight
        ref={key}
        position={[0, GROUND + 0.7, 0]}
        intensity={6}
        distance={6}
        decay={1.5}
        color="#F08A3A"
      />
      <Glow
        position={[0, GROUND + 0.12, 0]}
        size={1}
        scaleX={2.4}
        scaleY={1.2}
        color="#C2531A"
        inner="#F3B35A"
        alpha={0}
        power={1.8}
        renderOrder={4}
        billboard
        onMaterial={(m) => {
          bedGlow.current = m;
        }}
      />
      {STONES.map((s, i) => (
        <mesh
          key={i}
          geometry={stoneGeo}
          material={stone}
          position={[s.x, GROUND + s.s * 0.45, s.z]}
          rotation={[s.r, s.r * 1.7, 0]}
          scale={[s.s * 1.3, s.s * 0.8, s.s]}
        />
      ))}
      {BED.map((c, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={materials[i]}
          position={[c.x, GROUND + c.s * 0.35 + c.lift, c.z]}
          rotation={[0, c.rot, 0]}
          scale={c.s}
        />
      ))}
      <mesh
        ref={lone}
        geometry={geometry}
        material={materials[COALS - 1]}
        position={[LONE_HOME[0], GROUND + LONE_R * 0.4, LONE_HOME[1]]}
        scale={LONE_R}
      />
      <Glow
        size={0.6}
        color="#C2531A"
        inner="#F3B35A"
        alpha={0}
        power={1.8}
        renderOrder={5}
        billboard
        onMaterial={(m) => {
          loneGlow.current = m;
        }}
        onMesh={(m) => {
          loneGlowMesh.current = m;
        }}
      />
      {KIN.map(([a, robe], i) => (
        <Carved
          key={i}
          position={[Math.cos(a) * 2.1, GROUND, Math.sin(a) * 1.7]}
          rotationY={-a - Math.PI / 2}
          robe={robe}
          pose="kneeling"
          scale={0.78}
        />
      ))}
      <Embers
        count={mobile ? 14 : 26}
        box={EMBER_BOX}
        position={[0, GROUND + 0.2, 0]}
        rise={0.07}
        size={1.6}
        alpha={0.6}
        color="#F3B35A"
      />
      <Squall opacity={haze} color="#120E16" />
      {effects && <SceneEffects bloom={0.55} threshold={0.75} />}
    </>
  );
}
