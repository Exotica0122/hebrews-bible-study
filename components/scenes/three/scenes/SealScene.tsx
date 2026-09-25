"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { CanvasTexture, Group, Mesh, MeshStandardMaterial, type ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { Glow } from "../primitives/Glow";
import { Starfield } from "../primitives/Starfield";
import { easeInOutCubic, easeOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
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

export function SealScene({ mobile }: SceneProps) {
  const camera = useThree((s) => s.camera);
  const seal = useRef<Group>(null);
  const wax = useRef<Mesh>(null);
  const imprint = useRef<Mesh>(null);
  const underGlow = useRef<ShaderMaterial>(null);
  useResetCameraOnUnmount();

  const texture = useMemo(() => drawImprint(), []);
  useEffect(() => () => texture.dispose(), [texture]);

  useSceneTime((t) => {
    camera.position.set(0, 3.6, mobile ? 11.5 : 9.6);
    camera.lookAt(0, 0.8, 0);

    let y = HOVER_Y;
    let press = 0;
    if (t < 1.4) y = lerp(HOVER_Y, CONTACT_Y, easeInOutCubic(t / 1.4));
    else if (t < 2.0) {
      y = CONTACT_Y;
      press = 1;
    } else if (t < 3.2) y = lerp(CONTACT_Y, REST_Y, easeOutCubic((t - 2.0) / 1.2));
    else y = REST_Y + Math.sin((t - 3.2) * 0.9) * 0.05;

    if (seal.current) seal.current.position.y = y;
    if (wax.current) wax.current.scale.y = 1 - 0.08 * press;
    const reveal = smoothstep(1.5, 2.3, t);
    const imprintMat = imprint.current?.material as MeshStandardMaterial | undefined;
    if (imprintMat) imprintMat.opacity = reveal;
    if (underGlow.current) underGlow.current.uniforms.uAlpha.value = 0.12 + press * (0.5 + 0.3 * Math.sin(t * 12));
  });

  return (
    <>
      <Starfield count={mobile ? 300 : 600} alpha={0.6} />
      <hemisphereLight args={["#F3D38A", "#241E17", 0.7]} />
      <pointLight position={[-2.5, 3.5, 3]} intensity={60} color="#F3D38A" decay={2} />
      <pointLight position={[2.5, 1.5, -2]} intensity={12} color="#B7892C" decay={2} />

      <Glow position={[0, 0.3, -3]} size={12} color="#B7892C" alpha={0.12} power={2.5} renderOrder={1} />
      <Glow position={[0, 0.25, 0.4]} size={3.4} color="#F3D38A" alpha={0.12} power={2} renderOrder={3} onMaterial={(m) => { underGlow.current = m; }} billboard />

      <mesh ref={wax} position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.75, 0.22, 64]} />
        <meshStandardMaterial color="#C9902A" emissive="#6E4A10" emissiveIntensity={0.25} roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh ref={imprint} position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.35, 64]} />
        <meshStandardMaterial map={texture} bumpMap={texture} bumpScale={0.6} transparent opacity={0} roughness={0.5} />
      </mesh>

      <group ref={seal} position={[0, HOVER_Y, 0]}>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[1.15, 1.15, 0.36, 48]} />
          <meshStandardMaterial color="#7A5A22" metalness={0.85} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[1.0, 0.05, 12, 48]} />
          <meshStandardMaterial color="#D9AE4E" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.26, 0.42, 2.1, 24]} />
          <meshStandardMaterial color="#38302A" roughness={0.6} metalness={0.2} />
        </mesh>
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[0.36, 24, 16]} />
          <meshStandardMaterial color="#2E2820" roughness={0.5} metalness={0.3} />
        </mesh>
      </group>
    </>
  );
}
