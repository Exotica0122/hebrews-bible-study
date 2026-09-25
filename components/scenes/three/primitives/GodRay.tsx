"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AddEquation, CustomBlending, OneFactor, Color, CylinderGeometry, DoubleSide, Mesh, Quaternion, ShaderMaterial, Vector3 } from "three";

const VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uAlpha;
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  float facing = abs(dot(normalize(vNormal), normalize(vView)));
  float body = pow(facing, 0.55);
  float along = pow(vUv.y, 1.1);
  float streak = 0.85 + 0.15 * sin(vUv.y * 40.0 - uTime * 0.6 + vUv.x * 6.2831);
  float a = body * along * streak * uAlpha;
  gl_FragColor = vec4(uColor * a, a);
}`;

interface GodRayProps {
  from: [number, number, number];
  to: [number, number, number];
  radiusStart?: number;
  radiusEnd?: number;
  color?: string;
  alpha?: number;
  renderOrder?: number;
}

const UP = new Vector3(0, 1, 0);

/** A soft volumetric beam: an open cone from `from` (tip) toward `to`, additive, brighter toward the source. */
export function GodRay({ from, to, radiusStart = 0.05, radiusEnd = 1.6, color = "#F3D38A", alpha = 0.5, renderOrder = 5 }: GodRayProps) {
  const mesh = useRef<Mesh>(null);
  const a = useMemo(() => new Vector3(...from), [from]);
  const b = useMemo(() => new Vector3(...to), [to]);
  const length = a.distanceTo(b);

  const geometry = useMemo(() => new CylinderGeometry(radiusStart, radiusEnd, length, 32, 1, true), [radiusStart, radiusEnd, length]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: { uColor: { value: new Color(color) }, uAlpha: { value: alpha }, uTime: { value: 0 } },
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: DoubleSide,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: OneFactor,
      }),
    [color, alpha],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  const placement = useMemo(() => {
    const dir = b.clone().sub(a).normalize();
    const q = new Quaternion().setFromUnitVectors(UP, dir.clone().negate());
    const mid = a.clone().add(b).multiplyScalar(0.5);
    return { q, mid };
  }, [a, b]);

  useFrame((_, delta) => {
    const m = mesh.current?.material as ShaderMaterial | undefined;
    if (m) m.uniforms.uTime.value += Math.min(delta, 0.05);
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      material={material}
      position={placement.mid}
      quaternion={placement.q}
      renderOrder={renderOrder}
      frustumCulled={false}
    />
  );
}
