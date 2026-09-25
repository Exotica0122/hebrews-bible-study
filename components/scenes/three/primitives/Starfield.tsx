"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AddEquation, CustomBlending, OneFactor, BufferAttribute, BufferGeometry, Color, Points, ShaderMaterial } from "three";

const VERT = /* glsl */ `
attribute float aSize;
attribute float aPhase;
attribute float aTint;
uniform float uTime;
uniform float uPixelRatio;
varying float vTwinkle;
varying float vTint;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vTwinkle = 0.7 + 0.3 * sin(uTime * (0.6 + aPhase * 0.4) + aPhase * 6.2831);
  vTint = aTint;
  gl_PointSize = aSize * uPixelRatio * (40.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uAlpha;
varying float vTwinkle;
varying float vTint;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.25, d) * vTwinkle * uAlpha;
  vec3 c = mix(uColorA, uColorB, vTint);
  gl_FragColor = vec4(c * a, a);
}`;

function hash(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

interface StarfieldProps {
  count: number;
  spread?: [number, number];
  depth?: [number, number];
  alpha?: number;
  size?: number;
}

/** Twinkling additive star points on a slab behind the scene. */
export function Starfield({ count, spread = [20, 12], depth = [-25, -6], alpha = 0.75, size = 1.1 }: StarfieldProps) {
  const pixelRatio = useThree((s) => s.viewport.dpr);
  const canvasHeight = useThree((s) => s.size.height);
  const heightScale = Math.min(1, Math.max(0.5, canvasHeight / 520));
  const ref = useRef<Points>(null);

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phase = new Float32Array(count);
    const tint = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (hash(i, 1) - 0.5) * spread[0];
      pos[i * 3 + 1] = (hash(i, 2) - 0.5) * spread[1];
      pos[i * 3 + 2] = depth[0] + hash(i, 3) * (depth[1] - depth[0]);
      sizes[i] = size * (0.5 + hash(i, 4) * hash(i, 4) * 1.6);
      phase[i] = hash(i, 5);
      tint[i] = hash(i, 6) < 0.3 ? 1 : 0;
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aSize", new BufferAttribute(sizes, 1));
    g.setAttribute("aPhase", new BufferAttribute(phase, 1));
    g.setAttribute("aTint", new BufferAttribute(tint, 1));
    return g;
  }, [count, spread, depth, size]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: pixelRatio * heightScale },
          uColorA: { value: new Color("#EEE4CF") },
          uColorB: { value: new Color("#F3D38A") },
          uAlpha: { value: alpha },
        },
        transparent: true,
        depthWrite: false,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: OneFactor,
      }),
    [pixelRatio, heightScale, alpha],
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
    if (m) m.uniforms.uTime.value += Math.min(delta, 0.05);
  });

  return <points ref={ref} geometry={geometry} material={material} frustumCulled={false} renderOrder={0} />;
}
