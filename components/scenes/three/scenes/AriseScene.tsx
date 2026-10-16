"use client";

import { useRef } from "react";
import type { Group, PointLight, ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { GodRay } from "../primitives/GodRay";
import { Squall } from "../primitives/Coast";
import {
  Carved,
  Ground,
  SALEM,
  SalemHills,
  SalemLights,
  SalemSky,
  Sceptre,
  StoneAltar,
} from "../primitives/Salem";
import { easeOutCubic, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 16;
const RISE_X = 0.9;
const PRIESTS: [number, number][] = [
  [-3.2, -0.2],
  [-2.6, -1.2],
  [-3.6, -1.4],
];

/** “Another priest arises in the likeness of Melchizedek … by the power of an indestructible life”: Aaron’s priests stand by Levi’s altar, Judah’s sceptre stands where no one has served at the altar, and out of Judah’s ground another priest rises, lit. */
export function AriseScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const priest = useRef<Group>(null);
  const halo = useRef<ShaderMaterial | null>(null);
  const lamp = useRef<PointLight>(null);

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 1.4, p) + smoothstep(14.4, 16, p);
    camera.position.set(Math.sin(t * 0.05) * 0.25, 1.7, mobile ? 10 : 7.5);
    camera.lookAt(-0.3, 1, -0.5);
    const rise = easeOutCubic((p - 2.5) / 6);
    if (priest.current) priest.current.position.y = -1.9 + rise * 1.9;
    const light = smoothstep(3, 9, p) * (1 - smoothstep(14, 15.6, p));
    if (halo.current) setUniform(halo.current, "uAlpha", 0.45 * light);
    if (lamp.current) lamp.current.intensity = 3 * light;
  });

  return (
    <>
      <fog attach="fog" args={[SALEM.haze, 12, 45]} />
      <SalemSky horizonY={0} />
      <SalemHills />
      <SalemLights />
      <Ground />
      <StoneAltar position={[-1.9, 0, -0.9]} />
      <Glow
        position={[-1.9, 1.05, -0.9]}
        size={0.6}
        scaleY={1.4}
        color="#E07A3A"
        inner="#FFE2B0"
        alpha={0.8}
        power={1.4}
        renderOrder={6}
      />
      {PRIESTS.map(([x, z], i) => (
        <Carved
          key={i}
          position={[x, 0, z]}
          robe={SALEM.linen}
          rotationY={0.9}
          turban
        />
      ))}
      <Sceptre position={[2.4, 0, -1]} />
      <group ref={priest} position={[RISE_X, -1.9, 0.2]}>
        <Carved position={[0, 0, 0]} rotationY={-0.2} crown />
      </group>
      <GodRay
        from={[RISE_X + 0.6, 6, -0.4]}
        to={[RISE_X, -0.2, 0.2]}
        radiusStart={0.2}
        radiusEnd={1.1}
        color="#FFE6BE"
        alpha={0.18}
      />
      <Glow
        position={[RISE_X, 1.1, -0.2]}
        size={3.2}
        scaleY={1.5}
        color={SALEM.blush}
        inner="#FFF6E6"
        alpha={0}
        power={1.5}
        renderOrder={6}
        onMaterial={(m) => {
          halo.current = m;
        }}
      />
      <pointLight
        ref={lamp}
        position={[RISE_X, 1.4, 1]}
        color="#FFE0B4"
        intensity={0}
        distance={5}
        decay={1.4}
      />
      <Squall opacity={haze} color={SALEM.haze} />
      {effects && <SceneEffects bloom={0.35} threshold={0.88} vignette={0.3} />}
    </>
  );
}
