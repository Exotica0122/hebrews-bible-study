"use client";

import { useEffect, useMemo, useRef } from "react";
import { Environment, Lightformer } from "@react-three/drei";
import { Color, DoubleSide, Group, InstancedMesh, Matrix4, MeshStandardMaterial, PlaneGeometry, Quaternion, ShaderMaterial, TorusGeometry, Vector3, type PointLight } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { easeInOutCubic, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setOpacity, setUniform } from "../primitives/mutate";

const PERIOD = 14;
const BREAK = 4.6;
const LINKS_PER_SIDE = 17;
const PITCH = 0.27;

const VEIL_VERT = /* glsl */ `
uniform float uTime;
uniform float uOpen;
uniform float uSide;
varying vec2 vUv;
varying float vShade;
void main() {
  vUv = uv;
  float inner = uSide > 0.0 ? 1.0 - uv.x : uv.x;
  vec3 p = position;
  float phase = p.x * 5.5 + sin(p.y * 0.8 + uTime * 0.4) * 0.6 + uTime * 0.35;
  p.z += sin(phase) * 0.09 * (0.6 + 0.4 * (1.0 - uv.y));
  vShade = 0.62 + 0.38 * cos(phase);
  float pull = uOpen * pow(inner, 2.2) * (0.35 + 0.65 * smoothstep(1.0, 0.25, uv.y));
  p.x += uSide * pull * 1.6;
  p.z += pull * 0.25;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const VEIL_FRAG = /* glsl */ `
uniform float uSide;
uniform float uBack;
uniform float uDim;
uniform vec3 uBlue;
uniform vec3 uPurple;
uniform vec3 uScarlet;
uniform vec3 uGold;
varying vec2 vUv;
varying float vShade;
void main() {
  float inner = uSide > 0.0 ? 1.0 - vUv.x : vUv.x;
  float band = fract(vUv.x * 9.0);
  vec3 c = mix(uBlue, uPurple, smoothstep(0.2, 0.8, sin(vUv.x * 18.0) * 0.5 + 0.5));
  c = mix(c, uScarlet, smoothstep(0.46, 0.5, band) * (1.0 - smoothstep(0.5, 0.54, band)) * 0.8);
  float weave = 0.93 + 0.07 * sin(vUv.y * 900.0) * sin(vUv.x * 700.0);
  c *= vShade * weave;
  c += uGold * pow(inner, 6.0) * uBack * 0.9;
  c += uGold * uBack * 0.06;
  gl_FragColor = vec4(c * uDim, 1.0);
}`;

/** Damped swing from 0 toward `target`, as a broken chain half falls from its anchor. */
function swing(target: number, s: number) {
  if (s <= 0) return 0;
  return target * (1 - Math.exp(-2.6 * s) * Math.cos(4.2 * s));
}

/** Links for one half of the chain, laid from its anchor toward the centre along a sagging curve. */
function linkMatrices(side: 1 | -1, span: number, sag: number) {
  const curve = (x: number) => -sag * Math.sin((Math.min(1, x / span) * Math.PI) / 2) ** 1.4;
  const m = new Matrix4();
  const q = new Quaternion();
  const turn = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);
  const z = new Vector3(0, 0, 1);
  const one = new Vector3(1, 1, 1);
  return Array.from({ length: LINKS_PER_SIDE }, (_, i) => {
    const d = (i + 0.5) * PITCH;
    const angle = Math.atan2(curve(d + 0.01) - curve(d - 0.01), 0.02 * side);
    q.setFromAxisAngle(z, angle);
    if (i % 2) q.multiply(turn);
    return m.compose(new Vector3(side * d, curve(d), 0), q, one).clone();
  });
}

export function FreedScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);
  const leftMesh = useRef<InstancedMesh>(null);
  const rightMesh = useRef<InstancedMesh>(null);
  const back = useRef<ShaderMaterial>(null);
  const flash = useRef<ShaderMaterial>(null);
  const backLight = useRef<PointLight>(null);

  const anchorX = LINKS_PER_SIDE * PITCH;
  const anchorY = 1.55;
  const sag = 1.1;
  const link = useMemo(() => new TorusGeometry(0.12, 0.036, 8, 20).scale(1.45, 1, 1), []);
  const iron = useMemo(() => new MeshStandardMaterial({ color: "#4A433B", metalness: 0.85, roughness: 0.42, envMapIntensity: 1.1, transparent: true }), []);
  const matrices = useMemo(() => ({ l: linkMatrices(1, anchorX, sag), r: linkMatrices(-1, anchorX, sag) }), [anchorX]);

  const veil = useMemo(() => {
    const g = new PlaneGeometry(9, 8, mobile ? 40 : 70, 30);
    const make = (side: number) =>
      new ShaderMaterial({
        vertexShader: VEIL_VERT,
        fragmentShader: VEIL_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uOpen: { value: 0 },
          uSide: { value: side },
          uBack: { value: 0 },
          uDim: { value: 1 },
          uBlue: { value: new Color("#1C2340") },
          uPurple: { value: new Color("#34203E") },
          uScarlet: { value: new Color("#7A2226") },
          uGold: { value: new Color("#F3C77A") },
        },
        side: DoubleSide,
      });
    return { g, l: make(-1), r: make(1) };
  }, [mobile]);
  useEffect(
    () => () => {
      link.dispose();
      iron.dispose();
      veil.g.dispose();
      veil.l.dispose();
      veil.r.dispose();
    },
    [link, iron, veil],
  );

  useEffect(() => {
    for (const [mesh, list] of [[leftMesh.current, matrices.l], [rightMesh.current, matrices.r]] as const) {
      if (!mesh) continue;
      list.forEach((m, i) => mesh.setMatrixAt(i, m));
      mesh.instanceMatrix.needsUpdate = true;
    }
  }, [matrices]);

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(0, 0.1, mobile ? 11 : 8.4);
    camera.lookAt(0, 0.2, 0);
    const p = t % PERIOD;
    const dim = smoothstep(0, 0.9, p) * (1 - smoothstep(12.8, 13.8, p));
    const tension = smoothstep(0.5, BREAK, p);
    const s = p - BREAK;
    const sway = Math.sin(t * 1.3) * 0.015 * (1 - tension) + (p < BREAK ? Math.sin(t * 17) * 0.004 * tension : 0);
    if (left.current) left.current.rotation.z = sway - swing(1.2, s);
    if (right.current) right.current.rotation.z = -sway + swing(1.2, s);
    setOpacity(iron, dim * (1 - smoothstep(BREAK + 3.4, BREAK + 5, p)));

    const open = easeInOutCubic((p - BREAK - 0.3) / 3.2);
    const backLit = (0.15 + 0.45 * tension + 0.9 * open) * dim;
    for (const m of [veil.l, veil.r]) {
      setUniform(m, "uTime", t);
      setUniform(m, "uOpen", open);
      setUniform(m, "uBack", backLit);
      setUniform(m, "uDim", 0.25 + 0.75 * dim);
    }
    if (back.current) back.current.uniforms.uAlpha.value = (0.25 + 0.95 * open) * dim;
    const burst = smoothstep(BREAK - 0.15, BREAK, p) * (1 - smoothstep(BREAK, BREAK + 1.2, p));
    if (flash.current) flash.current.uniforms.uAlpha.value = 0.7 * burst;
    if (backLight.current) backLight.current.intensity = (4 + 30 * open + 40 * burst) * dim;
  });

  return (
    <>
      <color attach="background" args={["#0B0908"]} />
      <hemisphereLight args={["#3A3028", "#050403", 0.4]} />
      <pointLight ref={backLight} position={[0, 0.6, 1.6]} intensity={4} distance={10} decay={1.8} color="#F3C77A" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2.5} color="#F3D38A" position={[0, 2, -3]} scale={[3, 5, 1]} target={[0, 0.5, 0]} />
        <Lightformer form="rect" intensity={0.8} color="#EEE4CF" position={[-3, 3, 3]} scale={[4, 2, 1]} target={[0, 0.5, 0]} />
      </Environment>

      <Glow position={[0, 0.3, -2.4]} size={1} scaleX={mobile ? 3.2 : 4} scaleY={7} color="#F3C77A" inner="#FFF8E8" alpha={0} power={1.4} renderOrder={1} onMaterial={(m) => { back.current = m; }} />
      <mesh geometry={veil.g} material={veil.l} position={[-4.5, 0.3, -1.6]} renderOrder={2} />
      <mesh geometry={veil.g} material={veil.r} position={[4.5, 0.3, -1.6]} renderOrder={2} />

      <group ref={left} position={[-anchorX, anchorY, 0]}>
        <instancedMesh ref={leftMesh} args={[link, iron, LINKS_PER_SIDE]} frustumCulled={false} />
      </group>
      <group ref={right} position={[anchorX, anchorY, 0]}>
        <instancedMesh ref={rightMesh} args={[link, iron, LINKS_PER_SIDE]} frustumCulled={false} />
      </group>
      {[-anchorX, anchorX].map((x) => (
        <mesh key={x} position={[x, anchorY, -0.1]}>
          <torusGeometry args={[0.16, 0.05, 10, 24]} />
          <meshStandardMaterial color="#3A332C" metalness={0.85} roughness={0.45} envMapIntensity={1.1} />
        </mesh>
      ))}
      <Glow position={[0, anchorY - sag, 0.3]} size={mobile ? 3 : 4} color="#FFF8E8" inner="#FFFFFF" alpha={0} power={1.5} renderOrder={12} onMaterial={(m) => { flash.current = m; }} />
      {effects && <SceneEffects bloom={0.6} />}
    </>
  );
}
