"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import {
  AddEquation,
  BufferAttribute,
  BufferGeometry,
  Color,
  CustomBlending,
  IcosahedronGeometry,
  MeshStandardMaterial,
  OneFactor,
  ShaderMaterial,
  type PointLight,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { DuskSky, Dunes } from "../primitives/Wilderness";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 15;
const GROUND = -1.35;
const CLEFT: [number, number, number] = [0.12, -0.05, 0.62];
const OPEN = 3.4;
const FLOW = 4.4;
const DROPS = 320;

/** A split boulder: an icosphere pushed out of round by layered sine noise, flattened at the base. */
function rockGeometry() {
  const g = new IcosahedronGeometry(1, 4);
  const pos = g.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const n = 1 + Math.sin(x * 3.1 + y * 1.7) * 0.08 + Math.sin(y * 5.3 + z * 2.9) * 0.05 + Math.sin(z * 7.7 + x * 4.1) * 0.03;
    const cleft = 1 - 0.16 * Math.exp(-Math.pow((x - 0.1) * 9, 2)) * smoothstep(-0.2, 0.9, z);
    pos.setXYZ(i, x * n * 1.25 * cleft, Math.max(y * n, -0.55), z * n * 0.9);
  }
  g.computeVertexNormals();
  return g;
}

const DROP_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uPixelRatio;
varying float vAlpha;
float hash(float n) { return fract(sin(n) * 43758.5453); }
void main() {
  float life = fract(uTime * (0.55 + hash(aSeed * 5.3) * 0.3) + aSeed);
  float spread = (hash(aSeed * 9.1) - 0.5);
  vec3 p = position;
  p.z += life * (0.35 + hash(aSeed * 2.7) * 0.25);
  p.x += spread * (0.03 + life * 0.12);
  p.y -= life * life * 1.3;
  vAlpha = smoothstep(0.0, 0.08, life) * (1.0 - smoothstep(0.8, 1.0, life));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (0.45 + hash(aSeed * 3.3) * 0.6) * uPixelRatio * (40.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const DROP_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uFlow;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.1, d) * vAlpha * uFlow;
  gl_FragColor = vec4(uColor * a, a);
}`;

/** “Where your fathers put me to the test”: a rock in a dry wilderness at night; light breaks from its cleft and water pours out. */
export function RockScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const pixelRatio = useThree((s) => s.viewport.dpr);
  const key = useRef<PointLight>(null);
  const seam = useRef<ShaderMaterial>(null);
  const pool = useRef<ShaderMaterial>(null);
  const shimmer = useRef<ShaderMaterial>(null);
  const stream = useRef<ShaderMaterial>(null);
  const rock = useMemo(() => rockGeometry(), []);
  const stone = useMemo(() => new MeshStandardMaterial({ color: "#6B4E3C", roughness: 0.95, metalness: 0, flatShading: true }), []);
  const drops = useMemo(() => {
    const g = new BufferGeometry();
    const pos = new Float32Array(DROPS * 3);
    const seed = new Float32Array(DROPS);
    for (let i = 0; i < DROPS; i++) {
      pos[i * 3] = CLEFT[0];
      pos[i * 3 + 1] = CLEFT[1];
      pos[i * 3 + 2] = CLEFT[2];
      seed[i] = i / DROPS;
    }
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new BufferAttribute(seed, 1));
    const m = new ShaderMaterial({
      vertexShader: DROP_VERT,
      fragmentShader: DROP_FRAG,
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 }, uFlow: { value: 0 }, uColor: { value: new Color("#DCE8E6") } },
      transparent: true,
      depthWrite: false,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: OneFactor,
      blendDst: OneFactor,
    });
    return { g, m };
  }, []);
  useEffect(
    () => () => {
      rock.dispose();
      stone.dispose();
      drops.g.dispose();
      drops.m.dispose();
    },
    [rock, stone, drops],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.1) * 0.25, 0.25, mobile ? 8.6 : 6.6);
    camera.lookAt(0, -0.45, 0);
    const p = t % PERIOD;
    const fade = smoothstep(0, 0.8, p) * (1 - smoothstep(13.4, 15, p));
    const open = smoothstep(OPEN, OPEN + 1, p) * fade;
    const flow = smoothstep(FLOW, FLOW + 0.8, p) * fade;
    const spread = smoothstep(FLOW + 0.4, FLOW + 3.2, p) * fade;

    setUniform(drops.m, "uTime", t);
    setUniform(drops.m, "uPixelRatio", pixelRatio);
    setUniform(drops.m, "uFlow", flow);
    if (key.current) key.current.intensity = 0.4 + open * 5;
    if (seam.current) seam.current.uniforms.uAlpha.value = open * (0.9 + Math.sin(t * 5) * 0.05);
    if (stream.current) stream.current.uniforms.uAlpha.value = 0.45 * flow;
    if (pool.current) pool.current.uniforms.uAlpha.value = 0.7 * spread;
    if (shimmer.current) shimmer.current.uniforms.uAlpha.value = spread * (0.35 + 0.15 * Math.sin(t * 2.3));
  });

  return (
    <>
      <DuskSky horizonY={-1.8} glowStrength={0.5} stars={mobile ? 90 : 180} />
      <Dunes />
      <hemisphereLight args={["#3A3F6E", "#1B1413", 0.45]} />
      <directionalLight position={[4, 5, 2]} intensity={0.55} color="#C9C3E0" />
      <pointLight ref={key} position={[CLEFT[0], CLEFT[1], CLEFT[2] + 0.9]} intensity={0.4} distance={6} decay={1.8} color="#F3D38A" />
      <group scale={mobile ? 0.85 : 1}>
        <mesh geometry={rock} material={stone} position={[0, GROUND + 0.55, 0]} rotation={[0, -0.15, 0]} />
        <Glow position={[CLEFT[0], CLEFT[1], CLEFT[2]]} size={1} scaleX={0.28} scaleY={1.1} color="#F3D38A" inner="#FFF8E8" alpha={0} power={1.4} renderOrder={6} onMaterial={(m) => { seam.current = m; }} />
        <Glow position={[CLEFT[0], (CLEFT[1] + GROUND) / 2 - 0.05, CLEFT[2] + 0.3]} size={1} scaleX={0.09} scaleY={1.2} color="#9FB8BC" inner="#EEF4F2" alpha={0} power={1.2} renderOrder={6} onMaterial={(m) => { stream.current = m; }} />
        <points geometry={drops.g} material={drops.m} frustumCulled={false} renderOrder={7} />
        <Glow position={[0.2, GROUND + 0.02, 1.3]} size={1} scaleX={mobile ? 2.6 : 3.4} scaleY={0.32} color="#6F8C92" inner="#DCE8E6" alpha={0} power={1.3} renderOrder={5} onMaterial={(m) => { pool.current = m; }} />
        <Glow position={[0.2, GROUND + 0.03, 1.35]} size={1} scaleX={mobile ? 1.2 : 1.6} scaleY={0.12} color="#DCE8E6" inner="#FFFFFF" alpha={0} power={1.6} renderOrder={6} onMaterial={(m) => { shimmer.current = m; }} />
      </group>
      {effects && <SceneEffects bloom={0.5} />}
    </>
  );
}
