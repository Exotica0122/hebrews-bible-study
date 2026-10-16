"use client";

import { useMemo, useRef } from "react";
import type {
  Group,
  MeshBasicMaterial,
  PointLight,
  ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers } from "../primitives/Earth";
import { Soft } from "../primitives/Garden";
import { Squall } from "../primitives/Coast";
import {
  ALTAR_TOP,
  DUSK,
  DuneField,
  DuskLights,
  DuskSky,
  Tabernacle,
  TENT_CENTRE,
  TENT_DOOR,
  Tents,
  type Clearing,
  type TentSpot,
} from "../primitives/Wilderness";
import { easeOutCubic, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setOpacity, setUniform } from "../primitives/mutate";

const PERIOD = 14;
const GROUND = -1.2;
const POSTS_AT = 0.6;
const LINEN_AT = 2.1;
const TENT_AT = 3;
const GLORY_AT = 4.4;
const CLEAR: Clearing = [0, -0.5, 4];
/** The cloud as puffs around the tent, relative to its centre: x, y, z, size. */
const PUFFS: [number, number, number, number][] = [
  [0, 0.25, 0, 1.3],
  [-0.45, 0.15, 0.1, 0.95],
  [0.45, 0.2, -0.05, 1],
  [0.15, 0.55, 0.05, 1.1],
  [-0.25, 0.6, -0.1, 0.85],
  [0.05, 0.95, 0, 0.9],
];

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Tents of the camp pitched beyond the court. */
const CAMP: TentSpot[] = Array.from({ length: 34 }, (_, i) => {
  const a = -Math.PI * 0.95 + (i / 33) * Math.PI * 0.9;
  const r = 4.6 + hash(i) * 2.4;
  return {
    x: Math.cos(a) * r * 1.3,
    z: -0.5 + Math.sin(a) * r * 0.9,
    s: 0.34 + hash(i + 3) * 0.1,
    r: (hash(i + 5) - 0.5) * 0.8,
    lit: hash(i + 9) > 0.55,
  };
});

/** “Moses was faithful in all God’s house”: the court’s posts go up and its linen is hung, the tent is pitched, and the cloud comes down and covers it (Exod 40:33–34). */
export function TabernacleScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const posts = useRef(0);
  const linen = useRef(0);
  const tent = useRef(0);
  const site = useRef<Group>(null);
  const cloud = useRef<Group>(null);
  const puffs = useRef<MeshBasicMaterial[]>([]);
  const inside = useRef<PointLight>(null);
  const door = useRef<ShaderMaterial | null>(null);
  const fire = useRef<ShaderMaterial | null>(null);
  const tentTop = useMemo<[number, number, number]>(
    () => [TENT_CENTRE[0], GROUND + TENT_CENTRE[1], TENT_CENTRE[2]],
    [],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(
      Math.sin(t * 0.08) * 0.3,
      mobile ? 1.6 : 1.1,
      mobile ? 6.4 : 4.7,
    );
    camera.lookAt(0, -0.95, -0.4);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 0.9, p) + smoothstep(12.8, 14, p);
    posts.current = smoothstep(POSTS_AT, POSTS_AT + 1.6, p);
    linen.current = easeOutCubic((p - LINEN_AT) / 1);
    tent.current = easeOutCubic((p - TENT_AT) / 1);
    const lit = smoothstep(GLORY_AT + 0.8, GLORY_AT + 2.4, p);
    const down = easeOutCubic((p - GLORY_AT) / 2.2);

    if (site.current)
      site.current.rotation.y = -0.5 + Math.sin(t * 0.15) * 0.06;
    if (cloud.current) {
      cloud.current.position.y = tentTop[1] + 0.12 + (1 - down) * 1.6;
      cloud.current.visible = down > 0;
    }
    puffs.current.forEach((m, i) =>
      setOpacity(m, 0.7 * down * (0.9 + 0.1 * Math.sin(t * 0.7 + i))),
    );
    if (inside.current)
      inside.current.intensity = lit * (5 + Math.sin(t * 1.3) * 0.4);
    if (door.current) setUniform(door.current, "uAlpha", 0.7 * lit);
    if (fire.current)
      setUniform(
        fire.current,
        "uAlpha",
        0.6 *
          linen.current *
          (0.85 + Math.sin(t * 7) * 0.1 + Math.sin(t * 11) * 0.05),
      );
  });

  return (
    <>
      <fog attach="fog" args={[DUSK.haze, 7, 30]} />
      <DuskSky horizonY={-0.6} glowStrength={0.75} stars={mobile ? 90 : 180} />
      <DuskLights sun={[-8, 2.4, -6]} intensity={2.2} />
      <DuneField y={GROUND} clear={CLEAR} amp={0.9} near={8} far={-36} />
      <Tents spots={CAMP} y={GROUND} />
      <group ref={site} position={[0.1, 0, -0.5]} scale={mobile ? 0.85 : 1}>
        <group position={[0, GROUND, 0]}>
          <Tabernacle posts={posts} linen={linen} tent={tent} />
        </group>
        <pointLight
          position={[ALTAR_TOP[0], GROUND + 0.5, 0.2]}
          intensity={2.5}
          distance={3}
          decay={1.6}
          color={DUSK.fire}
        />
        <pointLight
          ref={inside}
          position={[TENT_DOOR[0] + 0.3, GROUND + 0.6, 0]}
          intensity={0}
          distance={4}
          decay={1.5}
          color="#FFE6BE"
        />
        <Glow
          position={[ALTAR_TOP[0], GROUND + ALTAR_TOP[1] + 0.08, 0]}
          size={0.45}
          color={DUSK.fire}
          inner="#FFE3B0"
          alpha={0}
          power={1.6}
          renderOrder={5}
          billboard
          onMaterial={(m) => {
            fire.current = m;
          }}
        />
        <Embers
          count={mobile ? 8 : 14}
          box={[0.2, 1.4, 0.2]}
          position={[ALTAR_TOP[0], GROUND + 0.2, 0]}
          rise={0.12}
          size={1.4}
          alpha={0.55}
        />
        <Glow
          position={[TENT_DOOR[0] + 0.05, GROUND + TENT_DOOR[1], 0]}
          size={1}
          color="#F3D38A"
          inner="#FFF8E8"
          alpha={0}
          power={1.8}
          renderOrder={6}
          billboard
          onMaterial={(m) => {
            door.current = m;
          }}
        />
        <group ref={cloud} position={[tentTop[0], tentTop[1] + 2, 0]}>
          {PUFFS.map(([x, y, z, s], i) => (
            <Soft
              key={i}
              position={[x, y, z]}
              size={s}
              scaleY={0.75}
              color="#F6E4C8"
              opacity={0}
              renderOrder={8}
              onMaterial={(m) => {
                puffs.current[i] = m;
              }}
            />
          ))}
        </group>
      </group>
      <Squall opacity={haze} color="#1E1A2A" />
      {effects && <SceneEffects bloom={0.4} threshold={0.8} />}
    </>
  );
}
