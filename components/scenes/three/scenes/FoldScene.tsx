"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Color, DoubleSide, Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from "three";
import type { SceneProps } from "../registry";
import { Light } from "../primitives/Glow";
import { Starfield } from "../primitives/Starfield";
import { easeInOutCubic, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const VERT = /* glsl */ `
uniform float uFold;
uniform float uTime;
varying vec2 vUv;
varying float vShade;
varying float vDepth;

vec3 displace(vec3 p) {
  float k = 2.7;
  float pleat = sin(p.x * k) * 1.1 * uFold;
  float skew = sin(p.x * k) * p.y * 0.14 * uFold;
  vec3 q = vec3(p.x, p.y + skew, p.z + pleat);
  float xr = 11.5 - uFold * 11.5;
  if (q.x > xr) {
    float R = 0.9 + uFold * 0.9;
    float a = (q.x - xr) / R;
    q = vec3(xr + R * sin(a), q.y, q.z + R * (1.0 - cos(a)));
  }
  q.z += sin(q.y * 2.0 + uTime * 0.5) * 0.05;
  return q;
}

void main() {
  vUv = uv;
  vec3 p = displace(position);
  vec3 px = displace(position + vec3(0.08, 0.0, 0.0));
  vec3 py = displace(position + vec3(0.0, 0.08, 0.0));
  vec3 n = normalize(cross(px - p, py - p));
  vec3 lightDir = normalize(vec3(0.2, 0.6, 1.0));
  vShade = 0.15 + 0.85 * max(0.0, dot(n, lightDir));
  vDepth = p.z;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const FRAG = /* glsl */ `
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uNight;
uniform vec3 uNight2;
uniform vec3 uStar;
uniform vec3 uStarWarm;
varying vec2 vUv;
varying float vShade;
varying float vDepth;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 grid = vUv * vec2(104.0, 44.0);
  vec2 cell = floor(grid);
  vec2 f = fract(grid) - 0.5;
  float h = hash(cell);
  vec3 col = mix(uNight, uNight2, vShade) + uStarWarm * 0.04 * vShade;
  if (h > 0.86) {
    vec2 off = vec2(hash(cell + 1.7), hash(cell + 9.1)) - 0.5;
    float d = length(f - off * 0.6);
    float size = 0.06 + hash(cell + 3.3) * 0.08;
    float twinkle = 0.7 + 0.3 * sin(uTime * (0.8 + hash(cell + 5.5)) + h * 40.0);
    float star = smoothstep(size, 0.0, d) * twinkle;
    vec3 sc = mix(uStar, uStarWarm, step(0.5, hash(cell + 2.2)));
    col += sc * star * (0.4 + 0.6 * vShade);
  }
  vec2 sc = gl_FragCoord.xy / uResolution;
  float vig = smoothstep(0.95, 0.35, length((sc - 0.5) * vec2(1.4, 1.2)));
  col = mix(col * 0.35, col, vig);
  gl_FragColor = vec4(col, 1.0);
}`;

const CYCLE = 16;

function foldAt(t: number) {
  const p = t % CYCLE;
  const base = 0.3;
  if (p < 10) return base + (1 - base) * easeInOutCubic(p / 10);
  if (p < 12) return 1;
  return 1 - (1 - base) * smoothstep(12, 15.5, p);
}

export function FoldScene({ mobile }: SceneProps) {
  const { height } = useThree((s) => s.viewport);
  const size = useThree((s) => s.size);
  useResetCameraOnUnmount();
  const mesh = useRef<Mesh>(null);

  const geometry = useMemo(() => new PlaneGeometry(26, 11, mobile ? 80 : 160, mobile ? 32 : 56), [mobile]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uFold: { value: 0 },
          uTime: { value: 0 },
          uResolution: { value: new Vector2(1, 1) },
          uNight: { value: new Color("#14110D") },
          uNight2: { value: new Color("#4A3D2E") },
          uStar: { value: new Color("#EEE4CF") },
          uStarWarm: { value: new Color("#F3D38A") },
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

  useSceneTime((t) => {
    const m = mesh.current?.material as ShaderMaterial | undefined;
    if (!m) return;
    m.uniforms.uTime.value = t;
    m.uniforms.uFold.value = foldAt(t);
    const dpr = size.width > 0 ? window.devicePixelRatio || 1 : 1;
    m.uniforms.uResolution.value.set(size.width * dpr, size.height * dpr);
  });

  return (
    <>
      <Starfield count={mobile ? 200 : 400} alpha={0.35} depth={[-40, -20]} spread={[40, 20]} />
      <mesh ref={mesh} geometry={geometry} material={material} position={[0, 0, -2.5]} frustumCulled={false} renderOrder={1} />
      <Light position={[0, 0.1 * height, 1]} size={mobile ? 0.5 : 0.6} coronaScale={mobile ? 5 : 7} renderOrder={20} />
    </>
  );
}
