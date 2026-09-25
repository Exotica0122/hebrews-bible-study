"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AddEquation, CustomBlending, OneFactor, BufferAttribute, BufferGeometry, Color, Points, ShaderMaterial, Vector3 } from "three";

const VERT = /* glsl */ `
attribute float aSeed;
attribute float aEmitter;
uniform float uTime;
uniform float uGust;
uniform float uPixelRatio;
uniform vec3 uEmitters[4];
uniform float uRise;
uniform float uSize;
varying float vLife;
float hash(float n) { return fract(sin(n) * 43758.5453); }
void main() {
  float rate = 0.35 + hash(aSeed * 7.1) * 0.35;
  float life = fract(uTime * rate + aSeed);
  vLife = life;
  vec3 e = uEmitters[int(aEmitter)];
  float wobble = sin(uTime * 3.0 + aSeed * 20.0) * 0.08;
  float drift = (hash(aSeed * 3.3) - 0.5) * 0.25;
  vec3 p = e + vec3(drift + wobble + uGust * life * 1.4, life * uRise, 0.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float size = uSize * (0.35 + hash(aSeed * 5.5) * 0.65) * (1.0 - life * 0.7);
  gl_PointSize = size * uPixelRatio * (40.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
uniform vec3 uHot;
uniform vec3 uEmber;
varying float vLife;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float disc = smoothstep(1.0, 0.2, d);
  float fade = 1.0 - smoothstep(0.55, 1.0, vLife);
  vec3 c = mix(uHot, uEmber, smoothstep(0.0, 0.6, vLife));
  float a = disc * fade * 0.55;
  gl_FragColor = vec4(c * a, a);
}`;

interface FlamesProps {
  emitters: [number, number, number][];
  count: number;
  rise?: number;
  size?: number;
  gust: React.RefObject<number>;
}

/** GPU-driven ember particles rising from up to four emitters, bent sideways by `gust`. */
export function Flames({ emitters, count, rise = 1.4, size = 4, gust }: FlamesProps) {
  const pixelRatio = useThree((s) => s.viewport.dpr);
  const canvasHeight = useThree((s) => s.size.height);
  const heightScale = Math.min(1, Math.max(0.5, canvasHeight / 520));
  const ref = useRef<Points>(null);

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const emitter = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      seed[i] = (i * 0.618033) % 1;
      emitter[i] = i % emitters.length;
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new BufferAttribute(seed, 1));
    g.setAttribute("aEmitter", new BufferAttribute(emitter, 1));
    return g;
  }, [count, emitters.length]);

  const material = useMemo(() => {
    const list = [0, 1, 2, 3].map((i) => new Vector3(...(emitters[i] ?? emitters[0])));
    return new ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uGust: { value: 0 },
        uPixelRatio: { value: pixelRatio * heightScale },
        uEmitters: { value: list },
        uRise: { value: rise },
        uSize: { value: size },
        uHot: { value: new Color("#F3D38A") },
        uEmber: { value: new Color("#C8553D") },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: OneFactor,
    });
  }, [emitters, pixelRatio, heightScale, rise, size]);

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
    m.uniforms.uGust.value = gust.current;
  });

  return <points ref={ref} geometry={geometry} material={material} frustumCulled={false} renderOrder={8} />;
}
