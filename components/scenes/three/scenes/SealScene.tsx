"use client";

import { useEffect, useMemo, useRef } from "react";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { damp } from "maath/easing";
import { CanvasTexture, Group, Mesh, MeshStandardMaterial, type ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Starfield } from "../primitives/Starfield";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const HOVER_Y = 2.6;
const CONTACT_Y = 0.46;
const REST_Y = 1.5;

function drawImprint(): CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, 256, 256);
  ctx.strokeStyle = "rgba(90, 58, 12, 0.85)";
  ctx.lineWidth = 6;
  for (const r of [100, 78, 40]) {
    ctx.beginPath();
    ctx.arc(128, 128, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(128, 60);
  ctx.lineTo(128, 196);
  ctx.moveTo(84, 118);
  ctx.lineTo(172, 118);
  ctx.stroke();
  const tex = new CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

export function SealScene({ mobile, effects, drag }: SceneProps) {
  const seal = useRef<Group>(null);
  const turntable = useRef<Group>(null);
  const spin = useRef(0);
  const wax = useRef<Mesh>(null);
  const imprint = useRef<Mesh>(null);
  const underGlow = useRef<ShaderMaterial>(null);
  useResetCameraOnUnmount();

  const texture = useMemo(() => drawImprint(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  useSceneTime((t, dt, { camera }) => {
    camera.position.set(0, 3.6, mobile ? 11.5 : 9.6);
    camera.lookAt(0, 0.8, 0);

    const target = t < 0.2 ? HOVER_Y : t < 2.0 ? CONTACT_Y : REST_Y + Math.sin((t - 2) * 0.9) * 0.05;
    const press = t >= 1.2 && t < 2.0 ? 1 : 0;
    if (seal.current) damp(seal.current.position, "y", target, t < 2 ? 0.35 : 0.5, dt);

    const d = drag?.current;
    const spinTarget = (d?.active ? d.dx * 0.01 : 0) + t * 0.12;
    spin.current = d?.active ? d.dx * 0.01 + t * 0.12 : spin.current;
    if (turntable.current) damp(turntable.current.rotation, "y", d?.active ? spinTarget : spin.current + (t * 0.12 - spin.current) * 0, 0.3, dt);
    if (wax.current) wax.current.scale.y = 1 - 0.08 * press;
    const reveal = smoothstep(1.5, 2.3, t);
    const imprintMat = imprint.current?.material as MeshStandardMaterial | undefined;
    if (imprintMat) imprintMat.opacity = reveal;
    if (underGlow.current) underGlow.current.uniforms.uAlpha.value = 0.12 + press * (0.5 + 0.3 * Math.sin(t * 12));
  });

  return (
    <>
      <Starfield count={mobile ? 300 : 600} alpha={0.6} />
      <hemisphereLight args={["#F3D38A", "#241E17", 0.5]} />
      <pointLight position={[-2.5, 3.5, 3]} intensity={45} color="#F3D38A" decay={2} />
      <pointLight position={[2.5, 1.5, -2]} intensity={10} color="#B7892C" decay={2} />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={3} color="#F3D38A" position={[-3, 4, 3]} scale={[4, 2, 1]} target={[0, 0.5, 0]} />
        <Lightformer form="ring" intensity={1.4} color="#B7892C" position={[3.5, 2, -3]} scale={3} target={[0, 0.5, 0]} />
        <Lightformer form="rect" intensity={0.5} color="#EEE4CF" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[6, 6, 1]} />
      </Environment>
      <ContactShadows position={[0, -0.13, 0]} opacity={0.7} scale={9} blur={2.4} far={3} color="#120d06" frames={1} />

      <Glow position={[0, 0.3, -3]} size={12} color="#B7892C" alpha={0.12} power={2.5} renderOrder={1} />
      <Glow position={[0, 0.25, 0.4]} size={3.4} color="#F3D38A" alpha={0.12} power={2} renderOrder={3} onMaterial={(m) => { underGlow.current = m; }} billboard />

      <group ref={turntable}>
        <mesh ref={wax} position={[0, 0, 0]}>
          <cylinderGeometry args={[1.6, 1.75, 0.22, 64]} />
          <meshStandardMaterial color="#C9902A" emissive="#6E4A10" emissiveIntensity={0.2} roughness={0.32} metalness={0.15} envMapIntensity={0.8} />
        </mesh>
        <mesh ref={imprint} position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.35, 64]} />
          <meshStandardMaterial map={texture} bumpMap={texture} bumpScale={0.6} transparent opacity={0} roughness={0.5} />
        </mesh>

        <group ref={seal} position={[0, HOVER_Y, 0]}>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[1.15, 1.15, 0.36, 48]} />
            <meshStandardMaterial color="#8A6528" metalness={0.9} roughness={0.28} envMapIntensity={1.4} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <torusGeometry args={[1.0, 0.05, 12, 48]} />
            <meshStandardMaterial color="#D9AE4E" metalness={0.95} roughness={0.2} envMapIntensity={1.6} />
          </mesh>
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.26, 0.42, 2.1, 24]} />
            <meshStandardMaterial color="#38302A" roughness={0.55} metalness={0.25} envMapIntensity={0.9} />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <sphereGeometry args={[0.36, 24, 16]} />
            <meshStandardMaterial color="#2E2820" roughness={0.45} metalness={0.35} envMapIntensity={0.9} />
          </mesh>
        </group>
      </group>
      {effects && <SceneEffects bloom={0.5} />}
    </>
  );
}
