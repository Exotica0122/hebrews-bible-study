"use client";

import { useEffect, useMemo, useRef } from "react";
import { Color, DoubleSide, PlaneGeometry, ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Squall } from "../primitives/Squall";
import {
  CloudFloor,
  HEAVEN,
  HeavenLights,
  HeavenSky,
  Throne,
} from "../primitives/Heavens";
import {
  easeInOutCubic,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 16;
const FLOOR = -1.4;
const W = 9;
const H = 5.2;
const BOTTOM = FLOOR - 0.4;

const VERT = /* glsl */ `
uniform float uRoll;
uniform float uTime;
varying vec2 vUv;
varying float vShade;
varying float vRolled;

vec3 roll(vec3 p) {
  p.z += sin(p.x * 0.9 + uTime * 0.6) * 0.06 + sin(p.y * 1.3 + uTime * 0.4) * 0.04;
  float yr = uRoll;
  if (p.y < yr) {
    float R = 0.18 + (yr + ${(H / 2).toFixed(2)}) * 0.035;
    float a = (yr - p.y) / R;
    p = vec3(p.x, yr - R * sin(a), p.z + R * (1.0 - cos(a)));
  }
  return p;
}

void main() {
  vUv = uv;
  vec3 p = roll(position);
  vec3 px = roll(position + vec3(0.05, 0.0, 0.0));
  vec3 py = roll(position + vec3(0.0, 0.05, 0.0));
  vec3 n = normalize(cross(px - p, py - p));
  vShade = 0.35 + 0.65 * max(0.0, dot(n, normalize(vec3(-0.3, 0.5, 1.0))));
  vRolled = step(position.y, uRoll);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const FRAG = /* glsl */ `
uniform float uTime;
uniform float uAlpha;
uniform vec3 uNight;
uniform vec3 uDeep;
uniform vec3 uStar;
uniform vec3 uGold;
uniform vec3 uLining;
varying vec2 vUv;
varying float vShade;
varying float vRolled;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  float border = min(min(vUv.x, 1.0 - vUv.x) * ${(W / H).toFixed(2)}, min(vUv.y, 1.0 - vUv.y));
  float hem = smoothstep(0.02, 0.028, border) * (1.0 - smoothstep(0.05, 0.058, border));
  float edge = 1.0 - smoothstep(0.0, 0.012, border);
  vec3 col;
  if (gl_FrontFacing) {
    col = mix(uDeep, uNight, vUv.y * 0.6 + 0.2);
    vec2 grid = vUv * vec2(90.0, 52.0);
    vec2 cell = floor(grid);
    float h = hash(cell);
    if (h > 0.8) {
      vec2 off = vec2(hash(cell + 1.7), hash(cell + 9.1)) - 0.5;
      float d = length(fract(grid) - 0.5 - off * 0.6);
      float tw = 0.7 + 0.3 * sin(uTime * (1.0 + h * 3.0) + h * 40.0);
      col += uStar * smoothstep(0.12 + hash(cell + 3.3) * 0.1, 0.0, d) * tw * 1.4;
    }
    col = mix(col, uGold, hem + edge * 0.7);
  } else {
    col = mix(uLining, uGold, hem + edge);
  }
  col *= vShade;
  gl_FragColor = vec4(col, uAlpha);
}`;

/** “They will perish, but you remain … like a robe you will roll them up”: the starry heavens hang like a great cloth over the clouds; they are rolled up from the hem like a garment, and behind them the throne’s light is where it always was. */
export function FoldScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const geometry = useMemo(() => new PlaneGeometry(W, H, 120, 160), []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uRoll: { value: -H / 2 - 0.01 },
          uTime: { value: 0 },
          uAlpha: { value: 1 },
          uNight: { value: new Color("#1A1E4A") },
          uDeep: { value: new Color("#0C0E28") },
          uStar: { value: new Color("#FFF3D6") },
          uGold: { value: new Color(HEAVEN.gold) },
          uLining: { value: new Color("#5A2E4A") },
        },
        side: DoubleSide,
      }),
    [],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.07) * 0.3, 1.2, mobile ? 14.5 : 11.4);
    camera.lookAt(0, 0.8, -1);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 1, p) + smoothstep(14.6, 16, p);
    const rolled = easeInOutCubic((p - 2.5) / 7);
    setUniform(material, "uRoll", -H / 2 - 0.01 + rolled * (H + 0.2));
    setUniform(material, "uTime", t);
  });

  return (
    <>
      <fog attach="fog" args={[HEAVEN.haze, 12, 50]} />
      <HeavenSky horizonY={-0.6} stars={mobile ? 200 : 380} />
      <HeavenLights sun={[-3, 5, 7]} intensity={1.3} />
      <CloudFloor y={FLOOR - 0.7} warm={[0, -4]} />
      <Throne position={[0, FLOOR - 0.1, -4]} scale={1.2} mobile={mobile} />
      <mesh
        geometry={geometry}
        material={material}
        position={[0, BOTTOM + H / 2, 0]}
        frustumCulled={false}
      />
      <Squall opacity={haze} color={HEAVEN.top} />
      {effects && <SceneEffects bloom={0.45} threshold={0.82} vignette={0.4} />}
    </>
  );
}
