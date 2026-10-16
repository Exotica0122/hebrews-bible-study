"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  ConeGeometry,
  DoubleSide,
  ShaderMaterial,
  CylinderGeometry,
  MeshStandardMaterial,
  SphereGeometry,
  type DirectionalLight,
  type Group,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Flames } from "../primitives/Flames";
import { Glow } from "../primitives/Glow";
import {
  COAST,
  CoastLights,
  hash,
  Headlands,
  Plot,
  Rain,
  Sea,
  Squall,
  StormSky,
} from "../primitives/Coast";
import { easeOutCubic, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { lerpColor, setUniform } from "../primitives/mutate";

const PERIOD = 17;
const GROUND = -1.2;
const PLOT_X = 1.35;
const GROW: [number, number] = [2.4, 7.5];
const RIPEN: [number, number] = [8, 10.5];
const BURN = 9.5;
/** Wheat in rows on the left plot, thorn clumps scattered on the right: x, z, seed. */
const WHEAT = Array.from(
  { length: 48 },
  (_, i) =>
    [
      -PLOT_X - 0.8 + (i % 8) * 0.23 + hash(i) * 0.06,
      -1.15 + Math.floor(i / 8) * 0.3 + hash(i + 3) * 0.05,
      hash(i + 7),
    ] as const,
);
const THORNS = Array.from(
  { length: 16 },
  (_, i) =>
    [
      PLOT_X - 0.8 + (i % 4) * 0.52 + hash(i + 11) * 0.2,
      -1.1 + Math.floor(i / 4) * 0.45 + hash(i + 13) * 0.15,
      hash(i + 17),
    ] as const,
);
const SPIKES = Array.from(
  { length: 7 },
  (_, i) => [(i / 7) * Math.PI * 2, 0.5 + (i % 3) * 0.18] as const,
);
const GREEN = new Color(COAST.grass);
const GOLD = new Color(COAST.wheat);
const BRAMBLE = new Color("#4A4A2E");
const CHAR = new Color("#15110E");

const TONGUE_VERT = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying float vFacing;
varying float vSeed;
void main() {
  vUv = uv;
  vec4 o = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  vSeed = o.x * 7.0 + o.z * 13.0;
  vec3 p = position;
  p.x += sin(uTime * 2.3 + vSeed) * 0.07 * uv.y;
  p.xz *= 1.0 + 0.18 * sin(uv.y * 8.0 - uTime * 4.0 + uv.x * 12.566);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vFacing = abs(dot(normalize(normalMatrix * normal), normalize(-mv.xyz)));
  gl_Position = projectionMatrix * mv;
}`;

const TONGUE_FRAG = /* glsl */ `
uniform float uTime;
uniform float uAlpha;
varying vec2 vUv;
varying float vFacing;
varying float vSeed;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
void main() {
  vec2 q = vec2(vUv.x * 5.0 + vSeed, vUv.y * 3.0 - uTime * 2.4);
  float n = noise(q) * 0.6 + noise(q * 2.3 + 3.1) * 0.3 + noise(q * 5.1) * 0.1;
  float tongue = smoothstep(0.35, 0.75, n + 0.5 - vUv.y * 0.95);
  float body = pow(vFacing, 1.4);
  float a = tongue * body * smoothstep(0.0, 0.12, vUv.y) * uAlpha;
  vec3 c = mix(vec3(0.8, 0.22, 0.05), vec3(1.0, 0.62, 0.26), clamp(tongue * body - vUv.y * 0.5, 0.0, 1.0));
  gl_FragColor = vec4(c * a, a);
}`;

/** “Land that has drunk the rain … receives a blessing; if it bears thorns and thistles … its end is to be burned”: the same rain on two plots; one comes up in grain that ripens in the light, the other in thorns that burn. */
export function RainScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const rain = useRef(1);
  const squall = useRef(1);
  const fire = useRef(0);
  const gust = useRef(0.1);
  const wheat = useRef<Group>(null);
  const thorns = useRef<Group>(null);
  const sun = useRef<DirectionalLight>(null);
  const blessing = useRef<ShaderMaterial | null>(null);
  const shaft = useRef<ShaderMaterial | null>(null);
  const embers = useRef<ShaderMaterial | null>(null);
  const burning = useRef<Group>(null);
  const parts = useMemo(
    () => ({
      stalk: new CylinderGeometry(0.008, 0.012, 0.5, 4),
      ear: new SphereGeometry(1, 8, 6),
      spike: new ConeGeometry(0.025, 0.42, 4),
      head: new SphereGeometry(0.045, 8, 6),
      tongue: new CylinderGeometry(0.03, 0.17, 0.7, 14, 10, true).translate(
        0,
        0.35,
        0,
      ),
    }),
    [],
  );
  const flame = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: TONGUE_VERT,
        fragmentShader: TONGUE_FRAG,
        uniforms: { uTime: { value: 0 }, uAlpha: { value: 0 } },
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        blending: AdditiveBlending,
      }),
    [],
  );
  const grain = useMemo(
    () => new MeshStandardMaterial({ color: COAST.grass, roughness: 0.9 }),
    [],
  );
  const bramble = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#4A4A2E",
        roughness: 1,
        flatShading: true,
      }),
    [],
  );
  const thistle = useMemo(
    () => new MeshStandardMaterial({ color: "#6E4A6A", roughness: 1 }),
    [],
  );
  const turf = useMemo(
    () => new MeshStandardMaterial({ color: COAST.turf, roughness: 1 }),
    [],
  );
  useEffect(
    () => () => {
      Object.values(parts).forEach((g) => g.dispose());
      [grain, bramble, thistle, turf, flame].forEach((m) => m.dispose());
    },
    [parts, grain, bramble, thistle, turf, flame],
  );

  useSceneTime((t, dt, { camera }) => {
    const p = t % PERIOD;
    camera.position.set(
      Math.sin(t * 0.05) * 0.15,
      GROUND + (mobile ? 3.4 : 1.5),
      mobile ? 7.4 : 4,
    );
    camera.lookAt(0, GROUND - (mobile ? 1.6 : 0.15), -0.4);
    squall.current = 1 - smoothstep(0, 1.2, p) + smoothstep(15.6, 17, p);
    rain.current = 1 - 0.85 * smoothstep(7.5, 9.5, p);
    const grow = easeOutCubic((p - GROW[0]) / (GROW[1] - GROW[0]));
    const ripe = smoothstep(RIPEN[0], RIPEN[1], p);
    const burn = smoothstep(BURN, BURN + 1.2, p);
    const ash = smoothstep(BURN + 1.5, BURN + 4.5, p);
    fire.current = burn * (1 - smoothstep(BURN + 3.5, BURN + 5.5, p));
    wheat.current?.scale.set(1, Math.max(grow, 0.001), 1);
    thorns.current?.scale.set(1, Math.max(grow * (1 - 0.8 * ash), 0.001), 1);
    lerpColor(grain, GREEN, GOLD, ripe);
    lerpColor(bramble, BRAMBLE, CHAR, burn);
    lerpColor(thistle, BRAMBLE, CHAR, burn);
    if (sun.current) sun.current.intensity = 0.6 + 2.2 * ripe;
    if (blessing.current) setUniform(blessing.current, "uAlpha", 0.22 * ripe);
    if (shaft.current) setUniform(shaft.current, "uAlpha", 0.18 * ripe);
    if (embers.current)
      setUniform(embers.current, "uAlpha", 0.5 * fire.current);
    setUniform(flame, "uTime", flame.uniforms.uTime.value + Math.min(dt, 0.05));
    setUniform(flame, "uAlpha", 0.85 * fire.current);
    burning.current?.scale.set(1, 0.35 + 0.65 * fire.current, 1);
  });

  return (
    <>
      <fog attach="fog" args={[COAST.mist, 8, 40]} />
      <StormSky horizonY={-1.4} warmth={0.15} />
      <Headlands />
      <Sea y={-3.4} near={-9} breakAt={[-8, -24]} breakStrength={0.6} />
      <CoastLights intensity={0.6} />
      <directionalLight
        ref={sun}
        position={[-4, 5, 2]}
        color="#FFE9B8"
        intensity={0.6}
      />
      <mesh
        position={[0, GROUND - 0.01, -3]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={turf}
      >
        <planeGeometry args={[20, 12]} />
      </mesh>
      <Plot position={[-PLOT_X, GROUND, -0.35]} size={[2.1, 1.9]} rows={8} />
      <Plot position={[PLOT_X, GROUND, -0.35]} size={[2.1, 1.9]} rows={8} />
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-PLOT_X, GROUND + 0.02, -0.35]}
      >
        <Glow
          size={1}
          scaleX={3}
          scaleY={2.6}
          color="#D9A94E"
          inner="#F2D48C"
          alpha={0}
          power={2.2}
          renderOrder={4}
          onMaterial={(m) => {
            blessing.current = m;
          }}
        />
      </group>
      <Glow
        position={[-PLOT_X - 0.3, GROUND + 1.6, -0.9]}
        size={1}
        scaleX={1.6}
        scaleY={4.2}
        rotation={-0.25}
        color="#E9C77A"
        inner="#FFE9B8"
        alpha={0}
        power={2.6}
        renderOrder={4}
        onMaterial={(m) => {
          shaft.current = m;
        }}
      />
      <group ref={wheat} position={[0, GROUND, 0]}>
        {WHEAT.map(([x, z, s], i) => (
          <group
            key={i}
            position={[x, 0, z]}
            rotation={[(s - 0.5) * 0.15, 0, (s - 0.5) * 0.2]}
            scale={0.8 + s * 0.4}
          >
            <mesh
              geometry={parts.stalk}
              material={grain}
              position={[0, 0.25, 0]}
            />
            <mesh
              geometry={parts.ear}
              material={grain}
              position={[0, 0.55, 0]}
              scale={[0.025, 0.08, 0.025]}
            />
          </group>
        ))}
      </group>
      <group ref={thorns} position={[0, GROUND, 0]}>
        {THORNS.map(([x, z, s], i) => (
          <group
            key={i}
            position={[x, 0, z]}
            rotation={[0, s * 6.28, 0]}
            scale={0.7 + s * 0.5}
          >
            {SPIKES.map(([a, lean], j) => (
              <mesh
                key={j}
                geometry={parts.spike}
                material={bramble}
                position={[Math.cos(a) * 0.05, 0.18, Math.sin(a) * 0.05]}
                rotation={[Math.sin(a) * lean, 0, -Math.cos(a) * lean]}
              />
            ))}
            <mesh
              geometry={parts.head}
              material={thistle}
              position={[0, 0.4, 0]}
            />
          </group>
        ))}
      </group>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        position={[PLOT_X, GROUND + 0.03, -0.35]}
      >
        <Glow
          size={1}
          scaleX={2.6}
          scaleY={2.2}
          color="#C8553D"
          inner="#F3B45A"
          alpha={0}
          power={1.3}
          renderOrder={4}
          onMaterial={(m) => {
            embers.current = m;
          }}
        />
      </group>
      <group ref={burning} position={[0, GROUND, 0]}>
        {THORNS.map(([x, z, s], i) => (
          <mesh
            key={i}
            geometry={parts.tongue}
            material={flame}
            position={[x, 0, z]}
            rotation={[0, s * 6.28, 0]}
            scale={[1, 0.8 + s * 0.7, 1]}
            renderOrder={5}
          />
        ))}
      </group>
      <Flames
        emitters={[
          [PLOT_X - 0.6, GROUND + 0.1, -0.6],
          [PLOT_X + 0.5, GROUND + 0.1, -0.5],
          [PLOT_X - 0.2, GROUND + 0.1, 0.1],
          [PLOT_X + 0.6, GROUND + 0.1, 0.3],
        ]}
        count={mobile ? 50 : 90}
        rise={1.6}
        size={mobile ? 1.3 : 1.6}
        gust={gust}
        fade={fire}
      />
      <Rain
        position={[0, GROUND, -0.4]}
        box={[6, 3.5, 2.6]}
        count={mobile ? 500 : 1100}
        size={mobile ? 2.2 : 3.2}
        slant={0.1}
        strength={rain}
      />
      <Squall opacity={squall} />
      {effects && <SceneEffects bloom={0.45} threshold={0.8} vignette={0.3} />}
    </>
  );
}
