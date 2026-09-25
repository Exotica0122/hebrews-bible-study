"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AddEquation, CustomBlending, OneFactor, Color, Mesh, PlaneGeometry, ShaderMaterial } from "three";

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const FRAG = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uInner;
uniform float uAlpha;
uniform float uPower;
varying vec2 vUv;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float f = clamp(1.0 - d, 0.0, 1.0);
  float a = pow(f, uPower) * uAlpha;
  float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  a = max(0.0, a + (noise - 0.5) * (2.5 / 255.0) * step(0.001, a));
  vec3 c = mix(uColor, uInner, pow(f, 3.0));
  gl_FragColor = vec4(c * a, a);
}`;

export function makeGlowMaterial(color: string, inner: string, alpha: number, power: number) {
  return new ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uColor: { value: new Color(color) },
      uInner: { value: new Color(inner) },
      uAlpha: { value: alpha },
      uPower: { value: power },
    },
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: OneFactor,
  });
}

const SHARED_PLANE = new PlaneGeometry(1, 1);

interface GlowProps {
  position?: [number, number, number];
  size: number;
  color: string;
  inner?: string;
  alpha?: number;
  power?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  renderOrder?: number;
  billboard?: boolean;
  onMaterial?: (m: ShaderMaterial) => void;
  onMesh?: (m: Mesh | null) => void;
}

/** Camera-facing additive radial glow. Compose a core, halo and corona for a light. */
export function Glow({
  position = [0, 0, 0],
  size,
  color,
  inner = color,
  alpha = 1,
  power = 2,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  renderOrder = 10,
  billboard = false,
  onMaterial,
  onMesh,
}: GlowProps) {
  const material = useMemo(() => makeGlowMaterial(color, inner, alpha, power), [color, inner, alpha, power]);
  const localMesh = useRef<Mesh>(null);
  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => {
    onMaterial?.(material);
  }, [material, onMaterial]);
  useEffect(() => {
    onMesh?.(localMesh.current);
  }, [onMesh]);
  useFrame(({ camera }) => {
    if (billboard && localMesh.current) localMesh.current.quaternion.copy(camera.quaternion);
  });
  return (
    <mesh
      ref={localMesh}
      position={position}
      rotation={[0, 0, rotation]}
      scale={[size * scaleX, size * scaleY, 1]}
      geometry={SHARED_PLANE}
      material={material}
      renderOrder={renderOrder}
      frustumCulled={false}
    />
  );
}

export interface LightProps {
  position?: [number, number, number];
  size: number;
  core?: string;
  glow?: string;
  corona?: string;
  intensity?: number;
  coronaScale?: number;
  renderOrder?: number;
  billboard?: boolean;
}

/** A point of light: bright core, warm halo, and a wide faint corona. */
export function Light({
  position = [0, 0, 0],
  size,
  core = "#FFF8E8",
  glow = "#F3D38A",
  corona = "#B7892C",
  intensity = 1,
  coronaScale = 6,
  renderOrder = 10,
  billboard = false,
}: LightProps) {
  return (
    <group position={position}>
      <Glow size={size * coronaScale} color={corona} alpha={0.16 * intensity} power={2.4} renderOrder={renderOrder} billboard={billboard} />
      <Glow size={size * 2.4} color={glow} alpha={0.4 * intensity} power={2.2} renderOrder={renderOrder + 1} billboard={billboard} />
      <Glow size={size} color={glow} inner={core} alpha={0.95 * intensity} power={1.3} renderOrder={renderOrder + 2} billboard={billboard} />
    </group>
  );
}
