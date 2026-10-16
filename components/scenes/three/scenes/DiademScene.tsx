"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  BoxGeometry,
  ConeGeometry,
  CylinderGeometry,
  DoubleSide,
  MeshStandardMaterial,
  TorusGeometry,
  type Group,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Squall } from "../primitives/Coast";
import { Glow } from "../primitives/Glow";
import { Cloth, Flame, FLOOR, HOLY, useGold } from "../primitives/Sanctuary";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setEmissive, setUniform } from "../primitives/mutate";

const PERIOD = 16;
const DOWN = 2.4;
const REST = 7.4;
/** Height of the turban's crown band, where the crown comes to rest. */
const HEAD = 0.55;
const POINTS = 8;

/** “You are my Son … You are a priest forever, after the order of Melchizedek”: a king’s crown comes down and settles over the priest’s linen turban. */
export function DiademScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const fade = useRef(1);
  const level = useRef(0);
  const crown = useRef<Group>(null);
  const halo = useRef<ShaderMaterial | null>(null);
  const gold = useGold(0.3);
  const parts = useMemo(
    () => ({
      band: new CylinderGeometry(0.36, 0.34, 0.16, 32, 1, true),
      point: new ConeGeometry(0.045, 0.16, 8),
      wrap: new TorusGeometry(0.27, 0.07, 10, 32),
      dome: new CylinderGeometry(0.25, 0.3, 0.3, 24),
      plate: new BoxGeometry(0.22, 0.08, 0.02),
      stand: new CylinderGeometry(0.08, 0.16, 1, 16),
    }),
    [],
  );
  // Self-lit a little so the warm lamps don't dye the white linen tan.
  const linen = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#F4F1EA",
        roughness: 0.95,
        emissive: "#E4E2DC",
        emissiveIntensity: 0.3,
      }),
    [],
  );
  const plate = useMemo(
    () =>
      new MeshStandardMaterial({
        color: HOLY.gold,
        roughness: 0.4,
        metalness: 0.3,
        emissive: "#B8862A",
        emissiveIntensity: 0.6,
      }),
    [],
  );
  const wood = useMemo(
    () => new MeshStandardMaterial({ color: "#4A3426", roughness: 0.9 }),
    [],
  );
  const ring = useMemo(
    () =>
      new MeshStandardMaterial({
        color: HOLY.gold,
        roughness: 0.3,
        metalness: 0.75,
        side: DoubleSide,
      }),
    [],
  );
  useEffect(
    () => () => {
      Object.values(parts).forEach((g) => g.dispose());
      linen.dispose();
      wood.dispose();
      ring.dispose();
      plate.dispose();
    },
    [parts, linen, wood, ring, plate],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.07) * 0.2, 0.75, mobile ? 3.8 : 3.1);
    camera.lookAt(0, 0.35, -1);
    const p = t % PERIOD;
    fade.current = 1 - smoothstep(0, 0.9, p) + smoothstep(14.6, 15.9, p);
    level.current = smoothstep(0, 1.2, p) * (1 - smoothstep(14.6, 16, p));
    setEmissive(linen, 0.3 * level.current);
    setEmissive(plate, 0.6 * level.current);
    const fall = easeInOutCubic((p - DOWN) / (REST - DOWN));
    crown.current?.position.set(0, lerp(HEAD + 2.4, HEAD, fall), 0);
    if (crown.current) crown.current.rotation.y = t * 0.12;
    if (halo.current)
      setUniform(
        halo.current,
        "uAlpha",
        0.55 * smoothstep(REST - 0.4, REST + 1.2, p) * level.current,
      );
  });

  return (
    <>
      <Cloth
        kind="veil"
        width={8}
        height={5}
        position={[0, FLOOR, -2.4]}
        folds={12}
        depth={0.1}
        repeat={2}
      />
      <hemisphereLight args={["#3A2A20", "#120D0A", 0.5]} />
      <Flame
        position={[-1.3, 0.55, -1.2]}
        size={0.08}
        seed={1}
        level={level}
        light={5}
      />
      <Flame
        position={[1.3, 0.55, -1.2]}
        size={0.08}
        seed={4}
        level={level}
        light={5}
      />
      <pointLight
        position={[0.7, 1.3, 1.6]}
        color="#FFE2BC"
        intensity={2.6}
        distance={6}
        decay={1.4}
      />
      <Glow
        position={[0, HEAD + 0.1, -0.6]}
        size={2.6}
        color="#B8652A"
        inner={HOLY.core}
        alpha={0}
        power={1.8}
        renderOrder={6}
        onMaterial={(m) => {
          halo.current = m;
        }}
      />
      <mesh geometry={parts.stand} material={wood} position={[0, -0.25, 0]} />
      <group position={[0, 0.25, 0]}>
        <mesh geometry={parts.dome} material={linen} position={[0, 0.2, 0]} />
        <mesh
          geometry={parts.wrap}
          material={linen}
          position={[0, 0.1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={parts.wrap}
          material={linen}
          position={[0, 0.24, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.94}
        />
        <mesh
          geometry={parts.plate}
          material={plate}
          position={[0, 0.12, 0.355]}
        />
      </group>
      <group ref={crown} position={[0, HEAD + 2.4, 0]}>
        <mesh geometry={parts.band} material={ring} />
        {Array.from({ length: POINTS }, (_, i) => {
          const a = (i / POINTS) * Math.PI * 2;
          return (
            <mesh
              key={i}
              geometry={parts.point}
              material={gold}
              position={[Math.sin(a) * 0.355, 0.15, Math.cos(a) * 0.355]}
            />
          );
        })}
      </group>
      <Squall opacity={fade} color={HOLY.dark} />
      {effects && <SceneEffects bloom={0.7} threshold={0.6} vignette={0.5} />}
    </>
  );
}
