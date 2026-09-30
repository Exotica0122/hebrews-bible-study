"use client";

import { useEffect, useMemo, useRef } from "react";
import { DodecahedronGeometry, MeshStandardMaterial, type Mesh, type PointLight, type ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers } from "../primitives/Earth";
import { easeInOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setEmissive, setOpacity } from "../primitives/mutate";

const PERIOD = 15;
const GROUND = -0.9;
const COALS = 26;
const LONE_HOME: [number, number] = [0.98, 0.35];
const LONE_AWAY = 2.35;
const LONE_R = 0.17;
const EMBER_BOX: [number, number, number] = [1.8, 2.4, 1.4];

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** The bed: coals on a sunflower spiral, the lone coal sitting on the rim toward the camera’s right. */
const BED = Array.from({ length: COALS - 1 }, (_, i) => {
  const a = i * 2.39996;
  const r = Math.sqrt((i + 0.5) / (COALS - 1)) * 0.95;
  return { x: Math.cos(a) * r, z: Math.sin(a) * r * 0.8, s: 0.13 + hash(i) * 0.08, rot: hash(i + 40) * 6.28, f: 1.3 + hash(i + 7) * 2.2 };
});

function coalGeometry() {
  const g = new DodecahedronGeometry(1, 1);
  const pos = g.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const n = 1 + Math.sin(x * 4.3 + z * 2.1) * 0.12 + Math.sin(y * 6.7 + x * 3.3) * 0.07;
    pos.setXYZ(i, x * n * 1.15, y * n * 0.7, z * n);
  }
  g.computeVertexNormals();
  return g;
}

/** “Exhort one another every day”: a coal rolls out of the fire and goes grey; drawn back among the others, it catches again. */
export function CoalsScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const lone = useRef<Mesh>(null);
  const key = useRef<PointLight>(null);
  const bedGlow = useRef<ShaderMaterial>(null);
  const loneGlow = useRef<ShaderMaterial>(null);
  const loneGlowMesh = useRef<Mesh | null>(null);
  const geometry = useMemo(() => coalGeometry(), []);
  const materials = useMemo(
    () => Array.from({ length: COALS }, () => new MeshStandardMaterial({ color: "#4A4541", roughness: 0.95, metalness: 0, emissive: "#E2621B", emissiveIntensity: 1, flatShading: true, transparent: true })),
    [],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      materials.forEach((m) => m.dispose());
    },
    [geometry, materials],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(-0.3, 2.4, mobile ? 5.6 : 4.2);
    camera.lookAt(0.55, GROUND + 0.1, 0);
    const p = t % PERIOD;
    const fade = smoothstep(0, 0.8, p) * (1 - smoothstep(13.8, 15, p));
    const out = easeInOutCubic((p - 2) / 1.6) * (1 - easeInOutCubic((p - 8.6) / 1.6));
    const heat = 1 - smoothstep(3.4, 7.5, p) + smoothstep(10, 12, p);

    BED.forEach((c, i) => {
      const flicker = 0.5 + 0.2 * Math.sin(t * c.f + i) + 0.08 * Math.sin(t * c.f * 2.7 + i * 3);
      setEmissive(materials[i], flicker * fade);
      setOpacity(materials[i], fade);
    });
    const lm = materials[COALS - 1];
    setEmissive(lm, Math.max(0.015, heat * (0.8 + 0.2 * Math.sin(t * 2.1))) * fade);
    setOpacity(lm, fade);

    const x = lerp(LONE_HOME[0], LONE_AWAY, out);
    if (lone.current) {
      lone.current.position.x = x;
      lone.current.rotation.z = -(x - LONE_HOME[0]) / LONE_R;
    }
    loneGlowMesh.current?.position.set(x, GROUND + 0.12, LONE_HOME[1]);
    if (loneGlow.current) loneGlow.current.uniforms.uAlpha.value = 0.55 * heat * fade;
    if (bedGlow.current) bedGlow.current.uniforms.uAlpha.value = (0.5 + 0.06 * Math.sin(t * 3.1)) * fade;
    if (key.current) key.current.intensity = (3.2 + Math.sin(t * 5.3) * 0.3 + Math.sin(t * 8.9) * 0.2) * fade;
  });

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND - 0.06, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#2B2022" roughness={1} />
      </mesh>
      <hemisphereLight args={["#3A3F6E", "#0B0907", 0.3]} />
      <pointLight ref={key} position={[0, GROUND + 0.9, 0]} intensity={3} distance={5} decay={1.6} color="#F09A3E" />
      <Glow position={[0, GROUND + 0.15, 0]} size={1} scaleX={3.2} scaleY={1.6} color="#C2531A" inner="#F3B35A" alpha={0} power={1.6} renderOrder={4} billboard onMaterial={(m) => { bedGlow.current = m; }} />
      {BED.map((c, i) => (
        <mesh key={i} geometry={geometry} material={materials[i]} position={[c.x, GROUND + c.s * 0.35, c.z]} rotation={[0, c.rot, 0]} scale={c.s} />
      ))}
      <mesh ref={lone} geometry={geometry} material={materials[COALS - 1]} position={[LONE_HOME[0], GROUND + LONE_R * 0.4, LONE_HOME[1]]} scale={LONE_R} />
      <Glow size={0.7} color="#C2531A" inner="#F3B35A" alpha={0} power={1.8} renderOrder={5} billboard onMaterial={(m) => { loneGlow.current = m; }} onMesh={(m) => { loneGlowMesh.current = m; }} />
      <Embers count={mobile ? 14 : 26} box={EMBER_BOX} position={[0, GROUND + 0.2, 0]} rise={0.07} size={1.6} alpha={0.6} color="#F3B35A" />
      {effects && <SceneEffects bloom={0.55} />}
    </>
  );
}
