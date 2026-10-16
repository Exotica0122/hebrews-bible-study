"use client";

import { useRef, useState } from "react";
import type {
  Group,
  Mesh,
  MeshBasicMaterial,
  PointLight,
  ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Squall } from "../primitives/Coast";
import {
  CloudFloor,
  Cumulus,
  HEAVEN,
  HeavenLights,
  HeavenSky,
} from "../primitives/Heavens";
import { easeOutCubic, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setOpacity, setUniform } from "../primitives/mutate";

const PERIOD = 15;
const FLOOR = -1.6;
const SUN_Z = -14;
const LOW = FLOOR + 0.3;
const HIGH = FLOOR + 2.7;
/** Shafts fanning out from the sun: angle from straight up, length. */
const SHAFTS: [number, number][] = [
  [-1.25, 16],
  [-0.8, 20],
  [-0.35, 18],
  [0.1, 22],
  [0.55, 17],
  [1, 21],
  [1.4, 15],
];
/** The bank of cloud the sun breaks through: x, z, scale, seed. */
const BANK: [number, number, [number, number, number], number][] = [
  [-3.2, -9, [2.6, 2.4, 1.6], 2],
  [-0.9, -10.5, [2, 2.9, 1.4], 7],
  [1.8, -9.5, [2.4, 2.2, 1.5], 3],
  [4.4, -10, [2.8, 2.6, 1.6], 9],
  [0.6, -7, [1.6, 1.1, 1.2], 5],
  [-5.6, -11, [2.4, 1.8, 1.4], 11],
];

/** “He is the radiance of the glory of God”: the sun breaks up through a bank of cloud above the cloud sea, its shafts pouring out between the heaps. */
export function RadianceScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const sun = useRef<Group>(null);
  const key = useRef<PointLight>(null);
  const halo = useRef<ShaderMaterial | null>(null);
  const corona = useRef<ShaderMaterial | null>(null);
  const shafts = useRef<ShaderMaterial[]>([]);
  const [sunMesh, setSunMesh] = useState<Mesh | null>(null);

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(
      Math.sin(t * 0.06) * 0.3,
      FLOOR + 1.3,
      mobile ? 9 : 6.5,
    );
    camera.lookAt(0, FLOOR + 1.9, SUN_Z);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 1, p) + smoothstep(13.6, 15, p);
    const rise = easeOutCubic((p - 0.6) / 8);
    const out = smoothstep(2.5, 7, p);
    if (sun.current) sun.current.position.y = LOW + (HIGH - LOW) * rise;
    if (key.current) key.current.intensity = 2 + out * 10;
    // god rays ignore the clouds in front, so their source shows only once the sun has cleared them
    const y = LOW + (HIGH - LOW) * rise;
    if (sunMesh)
      setOpacity(
        sunMesh.material as MeshBasicMaterial,
        smoothstep(LOW + 1.4, HIGH - 0.1, y) * (1 - haze.current),
      );
    if (halo.current) setUniform(halo.current, "uAlpha", 0.35 + out * 0.45);
    if (corona.current) setUniform(corona.current, "uAlpha", 0.12 + out * 0.2);
    shafts.current.forEach((m, i) =>
      setUniform(
        m,
        "uAlpha",
        out * (0.16 + 0.05 * Math.sin(t * 0.7 + i * 1.9)),
      ),
    );
  });

  return (
    <>
      <fog attach="fog" args={[HEAVEN.haze, 8, 40]} />
      <HeavenSky horizonY={FLOOR + 0.8} glow={0.9} stars={mobile ? 200 : 400} />
      <HeavenLights sun={[0, 3, -10]} intensity={0.9} fill={0.8} />
      <CloudFloor y={FLOOR - 0.8} warm={[0, -9]} />
      <group ref={sun} position={[0.3, LOW, SUN_Z]}>
        <pointLight
          ref={key}
          position={[0, 2, 7]}
          intensity={2}
          distance={18}
          decay={1.2}
          color="#FFE2B0"
        />
        <mesh>
          <circleGeometry args={[mobile ? 0.9 : 1.1, 40]} />
          <meshBasicMaterial color="#FFF3D0" fog={false} />
        </mesh>
        <mesh ref={setSunMesh} position={[0, 0, 0.02]}>
          <circleGeometry args={[mobile ? 0.9 : 1.1, 40]} />
          <meshBasicMaterial color="#FFF3D0" fog={false} transparent />
        </mesh>
        <Glow
          size={mobile ? 7 : 9}
          color={HEAVEN.gold}
          inner={HEAVEN.light}
          alpha={0.35}
          power={1.6}
          renderOrder={-6}
          depthTest
          onMaterial={(m) => {
            halo.current = m;
          }}
        />
        {SHAFTS.map(([a, len], i) => (
          <Glow
            key={i}
            position={[
              -Math.sin(a) * len * 0.45,
              Math.cos(a) * len * 0.45,
              -0.2,
            ]}
            rotation={a}
            size={1}
            scaleX={len * 0.07}
            scaleY={len}
            color={HEAVEN.gold}
            inner={HEAVEN.light}
            alpha={0}
            power={1.3}
            renderOrder={-6}
            depthTest
            onMaterial={(m) => {
              shafts.current[i] = m;
            }}
          />
        ))}
        <Glow
          size={mobile ? 22 : 30}
          color={HEAVEN.glow}
          alpha={0.12}
          power={2.4}
          renderOrder={-7}
          depthTest
          onMaterial={(m) => {
            corona.current = m;
          }}
        />
      </group>
      {BANK.map(([x, z, s, seed]) => (
        <Cumulus
          key={seed}
          position={[x, FLOOR - 0.7, z]}
          scale={s}
          seed={seed}
          puffs={11}
        />
      ))}
      <Squall opacity={haze} color={HEAVEN.top} />
      {effects && (
        <SceneEffects
          sun={sunMesh}
          bloom={0.5}
          threshold={0.8}
          vignette={0.4}
        />
      )}
    </>
  );
}
