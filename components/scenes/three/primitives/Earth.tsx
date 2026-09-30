"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  AddEquation,
  BufferAttribute,
  BufferGeometry,
  Color,
  CustomBlending,
  MeshBasicMaterial,
  OneFactor,
  PlaneGeometry,
  Points,
  ShaderMaterial,
  Shape,
  ShapeGeometry,
  Vector3,
} from "three";

const SKY_VERT = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

const SKY_FRAG = /* glsl */ `
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uGlow;
uniform float uHorizonY;
uniform float uGlowStrength;
varying vec3 vWorld;
void main() {
  float h = vWorld.y - uHorizonY;
  vec3 c = mix(uHorizon, uTop, smoothstep(0.0, 9.0, h));
  float band = exp(-abs(h) * 0.55) * uGlowStrength;
  c += uGlow * band;
  float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  c += (noise - 0.5) * (2.0 / 255.0);
  gl_FragColor = vec4(c, 1.0);
}`;

interface SkyProps {
  top?: string;
  horizon?: string;
  glow?: string;
  horizonY?: number;
  glowStrength?: number;
  z?: number;
}

/** Night sky backdrop: dark overhead, warmer toward a horizon band (an afterglow, not a sun). */
export function Sky({ top = "#0E0C0A", horizon = "#2A2017", glow = "#5A3A1C", horizonY = -1, glowStrength = 0.55, z = -22 }: SkyProps) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: SKY_VERT,
        fragmentShader: SKY_FRAG,
        uniforms: {
          uTop: { value: new Color(top) },
          uHorizon: { value: new Color(horizon) },
          uGlow: { value: new Color(glow) },
          uHorizonY: { value: horizonY },
          uGlowStrength: { value: glowStrength },
        },
        depthWrite: false,
      }),
    [top, horizon, glow, horizonY, glowStrength],
  );
  const geometry = useMemo(() => new PlaneGeometry(120, 60), []);
  useEffect(
    () => () => {
      material.dispose();
      geometry.dispose();
    },
    [material, geometry],
  );
  return <mesh position={[0, 0, z]} geometry={geometry} material={material} renderOrder={-10} frustumCulled={false} />;
}

/** Height of a hill layer's crest at `x`, for placing things on the ridge line. */
export function ridgeY(l: HillLayer, x: number) {
  return l.y + ridge(x, l.seed, l.amp, l.freq);
}

function ridge(x: number, seed: number, amp: number, freq: number) {
  return (
    Math.sin(x * freq + seed) * amp +
    Math.sin(x * freq * 2.3 + seed * 1.7) * amp * 0.38 +
    Math.sin(x * freq * 5.1 + seed * 3.1) * amp * 0.12
  );
}

export interface HillLayer {
  y: number;
  z: number;
  amp: number;
  freq: number;
  seed: number;
  color: string;
}

/** Layered hill silhouettes that occlude what lies behind them; nearer layers darker. */
export function Hills({ layers, span = 60 }: { layers: HillLayer[]; span?: number }) {
  const parts = useMemo(
    () =>
      layers.map((l) => {
        const shape = new Shape();
        const steps = 160;
        shape.moveTo(-span / 2, l.y - 20);
        for (let i = 0; i <= steps; i++) {
          const x = -span / 2 + (span * i) / steps;
          shape.lineTo(x, l.y + ridge(x, l.seed, l.amp, l.freq));
        }
        shape.lineTo(span / 2, l.y - 20);
        shape.closePath();
        return { geometry: new ShapeGeometry(shape), material: new MeshBasicMaterial({ color: l.color }), z: l.z };
      }),
    [layers, span],
  );
  useEffect(
    () => () =>
      parts.forEach((p) => {
        p.geometry.dispose();
        p.material.dispose();
      }),
    [parts],
  );
  return (
    <>
      {parts.map((p, i) => (
        <mesh key={i} position={[0, 0, p.z]} geometry={p.geometry} material={p.material} renderOrder={-9 + i} frustumCulled={false} />
      ))}
    </>
  );
}

const EMBER_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uPixelRatio;
uniform vec3 uBox;
uniform float uRise;
uniform float uSize;
varying float vAlpha;
float hash(float n) { return fract(sin(n) * 43758.5453); }
void main() {
  float life = fract(uTime * uRise * (0.5 + hash(aSeed * 3.1) * 0.5) + aSeed);
  vec3 p = position;
  p.y += life * uBox.y;
  p.x += sin(uTime * 0.6 + aSeed * 40.0) * 0.25;
  vAlpha = sin(life * 3.14159) * (0.55 + 0.45 * sin(uTime * 2.0 + aSeed * 90.0));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * (0.5 + hash(aSeed * 7.7) * 0.8) * uPixelRatio * (40.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const EMBER_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uAlpha;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.1, d) * vAlpha * uAlpha;
  gl_FragColor = vec4(uColor * a, a);
}`;

interface EmbersProps {
  count: number;
  /** Width, rise height and depth of the volume the embers float through. */
  box: [number, number, number];
  position?: [number, number, number];
  color?: string;
  rise?: number;
  size?: number;
  alpha?: number;
}

/** Slow warm motes drifting upward: fireflies, lamp sparks, dust in lamplight. */
export function Embers({ count, box, position = [0, 0, 0], color = "#F3D38A", rise = 0.05, size = 2.2, alpha = 0.8 }: EmbersProps) {
  const pixelRatio = useThree((s) => s.viewport.dpr);
  const ref = useRef<Points>(null);
  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const h = (n: number) => {
        const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
        return x - Math.floor(x);
      };
      pos[i * 3] = (h(1) - 0.5) * box[0];
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = (h(3) - 0.5) * box[2];
      seed[i] = h(4);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new BufferAttribute(seed, 1));
    return g;
  }, [count, box]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: EMBER_VERT,
        fragmentShader: EMBER_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
          uBox: { value: new Vector3(...box) },
          uRise: { value: rise },
          uSize: { value: size },
          uColor: { value: new Color(color) },
          uAlpha: { value: alpha },
        },
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: OneFactor,
      }),
    [box, rise, size, color, alpha],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  useFrame((_, delta) => {
    const m = ref.current?.material as ShaderMaterial | undefined;
    if (!m) return;
    m.uniforms.uTime.value += Math.min(delta, 0.05);
    m.uniforms.uPixelRatio.value = pixelRatio;
  });
  return <points ref={ref} position={position} geometry={geometry} material={material} frustumCulled={false} renderOrder={20} />;
}
