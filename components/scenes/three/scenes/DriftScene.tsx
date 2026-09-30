"use client";

import { useEffect, useMemo, useRef, type ComponentRef } from "react";
import { Line } from "@react-three/drei";
import { Color, DoubleSide, Group, PlaneGeometry, ShaderMaterial, Vector3 } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Hills, Sky, type HillLayer } from "../primitives/Earth";
import { easeInOutCubic, lerp, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform, writeXYZ } from "../primitives/mutate";

const PERIOD = 13;
const WATER_Y = -1;
/** [dirX, dirZ, amplitude, wavenumber, speed]: mostly running toward +x, the way the current pulls. */
const WAVES: [number, number, number, number, number][] = [
  [1, 0.15, 0.07, 0.9, 1.1],
  [0.8, -0.6, 0.045, 1.7, 1.6],
  [0.95, 0.3, 0.025, 3.4, 2.3],
  [0.3, 1, 0.02, 2.6, 1.3],
];
const ROPE_POINTS = 24;
const SHORE: HillLayer[] = [{ y: WATER_Y - 0.05, z: -20, amp: 0.35, freq: 0.22, seed: 3.3, color: "#16120E" }];

function waveHeight(x: number, z: number, t: number) {
  let h = 0;
  for (const [dx, dz, a, k, w] of WAVES) {
    const len = Math.hypot(dx, dz);
    h += a * Math.sin(((dx * x + dz * z) / len) * k + t * w);
  }
  return h;
}

const WAVE_GLSL = WAVES.map(([dx, dz, a, k, w]) => {
  const len = Math.hypot(dx, dz);
  return `wave(p, vec2(${(dx / len).toFixed(4)}, ${(dz / len).toFixed(4)}), ${a.toFixed(4)}, ${k.toFixed(4)}, ${w.toFixed(4)}, h, grad);`;
}).join("\n  ");

const WATER_VERT = /* glsl */ `
uniform float uTime;
varying vec3 vWorld;
varying vec3 vNormal;
void wave(vec2 p, vec2 d, float a, float k, float w, inout float h, inout vec2 grad) {
  float ph = dot(d, p) * k + uTime * w;
  h += a * sin(ph);
  grad += d * a * k * cos(ph);
}
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec2 p = world.xz;
  float h = 0.0;
  vec2 grad = vec2(0.0);
  ${WAVE_GLSL}
  world.y += h;
  vWorld = world.xyz;
  vNormal = normalize(vec3(-grad.x, 1.0, -grad.y));
  gl_Position = projectionMatrix * viewMatrix * world;
}`;

const WATER_FRAG = /* glsl */ `
uniform float uTime;
uniform vec3 uDeep;
uniform vec3 uSky;
uniform vec3 uHorizon;
uniform vec3 uLampColor;
uniform vec3 uLamp;
varying vec3 vWorld;
varying vec3 vNormal;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
void main() {
  vec3 n = normalize(vNormal);
  vec3 view = normalize(cameraPosition - vWorld);
  float dist = length(cameraPosition - vWorld);
  float fres = pow(1.0 - max(dot(n, view), 0.0), 3.0);
  vec3 c = uDeep + uSky * fres * 0.9;

  vec3 toLamp = uLamp - vWorld;
  vec3 L = normalize(toLamp);
  vec3 H = normalize(L + view);
  float falloff = 1.0 / (1.0 + dot(toLamp, toLamp) * 0.06);
  float spec = pow(max(dot(n, H), 0.0), 160.0) * 5.0 * (1.0 - smoothstep(2.0, 4.5, vWorld.z));
  c += uLampColor * spec * falloff;
  c += uLampColor * 0.08 * falloff;

  float dx = vWorld.x - uLamp.x;
  float column = exp(-dx * dx * 2.2) * smoothstep(uLamp.z - 1.2, uLamp.z + 0.3, vWorld.z) * (1.0 - smoothstep(3.5, 8.0, vWorld.z));
  float ripple = smoothstep(0.5, 0.9, noise(vec2(vWorld.x * 3.0, vWorld.z * 7.0 - uTime * 0.9)));
  c += uLampColor * column * (0.12 + 0.9 * ripple) * 0.55;

  float streak = noise(vec2(vWorld.x * 0.7 - uTime * 0.9, vWorld.z * 5.0));
  c += vec3(0.9, 0.85, 0.75) * smoothstep(0.78, 0.95, streak) * 0.05 * (1.0 - smoothstep(4.0, 14.0, dist));

  c = mix(c, uHorizon, smoothstep(9.0, 30.0, dist));
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  c += (grain - 0.5) * (2.0 / 255.0);
  gl_FragColor = vec4(c, 1.0);
}`;

/** 0 = moored near the post, 1 = pulled furthest by the current; drawn back late in each cycle. */
function driftAt(t: number) {
  const p = t % PERIOD;
  return easeInOutCubic(p / 7) * (1 - easeInOutCubic((p - 8.5) / 3.5));
}

export function DriftScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const boat = useRef<Group>(null);
  const rope = useRef<ComponentRef<typeof Line>>(null);

  const postX = mobile ? -2.2 : -3.4;
  const lamp = useMemo(() => new Vector3(postX, 0.75, 0.4), [postX]);
  const moored = useMemo(() => ({ x: postX + 2.1, z: 0.9 }), [postX]);
  const adrift = useMemo(() => ({ x: mobile ? 2.2 : 3.6, z: -1.6 }), [mobile]);
  const ropePts = useMemo(() => new Float32Array(ROPE_POINTS * 3), []);
  const bow = useMemo(() => new Vector3(), []);

  const water = useMemo(() => {
    const g = new PlaneGeometry(70, 40, mobile ? 140 : 220, mobile ? 70 : 110);
    g.rotateX(-Math.PI / 2);
    const m = new ShaderMaterial({
      vertexShader: WATER_VERT,
      fragmentShader: WATER_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uDeep: { value: new Color("#0D1215") },
        uSky: { value: new Color("#6A5038") },
        uHorizon: { value: new Color("#33261A") },
        uLampColor: { value: new Color("#F3C77A") },
        uLamp: { value: lamp },
      },
    });
    return { g, m };
  }, [mobile, lamp]);
  useEffect(
    () => () => {
      water.g.dispose();
      water.m.dispose();
    },
    [water],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(0, 1.3, mobile ? 10.5 : 8.5);
    camera.lookAt(0, -0.45, 0);
    setUniform(water.m, "uTime", t);

    const d = driftAt(t);
    const bx = lerp(moored.x, adrift.x, d);
    const bz = lerp(moored.z, adrift.z, d);
    const h = waveHeight(bx, bz, t);
    const roll = (waveHeight(bx, bz + 0.3, t) - waveHeight(bx, bz - 0.3, t)) * 1.4;
    const pitch = (waveHeight(bx + 0.6, bz, t) - waveHeight(bx - 0.6, bz, t)) * 0.9;
    const yaw = lerp(0.05, -0.35, d);
    const b = boat.current;
    if (b) {
      b.position.set(bx, WATER_Y + h + 0.24, bz);
      b.rotation.set(roll, yaw, pitch);
      bow.set(-1.05, 0.12, 0).applyEuler(b.rotation).add(b.position);
    }

    const sag = lerp(0.28, 0.03, d);
    const start = { x: postX + 0.14, y: -0.25, z: 0.4 };
    for (let i = 0; i < ROPE_POINTS; i++) {
      const k = i / (ROPE_POINTS - 1);
      writeXYZ(ropePts, i, lerp(start.x, bow.x, k), lerp(start.y, bow.y, k) - sag * Math.sin(k * Math.PI), lerp(start.z, bow.z, k));
    }
    rope.current?.geometry.setPositions(ropePts);
  });

  return (
    <>
      <Sky horizon="#33261A" glow="#6A4420" horizonY={WATER_Y} glowStrength={0.85} />
      <Hills layers={SHORE} span={90} />
      <hemisphereLight args={["#5A4A36", "#0A0806", 1.1]} />
      <pointLight position={[2, 0.2, -6]} intensity={6} distance={14} decay={1.4} color="#B7892C" />
      <pointLight position={[lamp.x, lamp.y, lamp.z]} intensity={9} distance={14} decay={1.6} color="#F3C77A" />

      <mesh geometry={water.g} material={water.m} position={[0, WATER_Y, -12]} frustumCulled={false} />

      <group position={[postX, 0, 0.4]}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.11, 0.14, 2.4, 12]} />
          <meshStandardMaterial color="#2B2118" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.13, 0.11, 0.22, 8]} />
          <meshStandardMaterial color="#3A2E22" roughness={0.6} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <coneGeometry args={[0.17, 0.16, 8]} />
          <meshStandardMaterial color="#2E251C" roughness={0.6} metalness={0.4} />
        </mesh>
        <Glow position={[0, 0.75, 0.1]} size={mobile ? 3.2 : 4} color="#B7892C" alpha={0.28} power={2.4} renderOrder={12} billboard />
        <Glow position={[0, 0.75, 0.12]} size={0.26} color="#F3D38A" inner="#FFF8E8" alpha={1.3} power={1.1} renderOrder={13} billboard />
      </group>

      <Line ref={rope} points={[[0, 0, 0], [1, 0, 0]]} color="#B89A68" lineWidth={mobile ? 1.4 : 1.8} transparent opacity={0.85} />

      <group ref={boat} position={[moored.x, WATER_Y, moored.z]} scale={1.15}>
        <mesh scale={[1.1, 0.4, 0.42]}>
          <sphereGeometry args={[1, 32, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshStandardMaterial color="#7A5638" roughness={0.75} side={DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.1, 0.42, 1]}>
          <torusGeometry args={[1, 0.035, 6, 48]} />
          <meshStandardMaterial color="#A07A4E" roughness={0.6} />
        </mesh>
        <mesh position={[0.05, -0.08, 0]} scale={[0.06, 0.03, 0.8]}>
          <boxGeometry />
          <meshStandardMaterial color="#5A4130" roughness={0.8} />
        </mesh>
        <mesh position={[0.15, 0.5, 0]}>
          <cylinderGeometry args={[0.022, 0.028, 1.1, 6]} />
          <meshStandardMaterial color="#3A2A1C" roughness={0.8} />
        </mesh>
      </group>
      {effects && <SceneEffects bloom={0.55} />}
    </>
  );
}
