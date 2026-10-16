"use client";

import { useRef } from "react";
import type { Group } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Squall } from "../primitives/Coast";
import {
  Angel,
  CloudFloor,
  HEAVEN,
  HeavenLights,
  HeavenSky,
  Throne,
} from "../primitives/Heavens";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const PERIOD = 16;
const FLOOR = -1.4;
const RING: [number, number] = [2.6, 1.7];
/** Angles round the throne, leaving the front open so the throne shows; each angel bows in turn. */
const ANGELS = [-0.45, -0.95, -1.5, -2.05, -2.6, 0.45, 0.95].map((a, i) => ({
  a: a - Math.PI / 2,
  bows: 4.6 + i * 0.45,
}));

/** “Let all God’s angels worship him”: winged angels stand in a ring round the throne above the clouds; as its light grows, they bow one by one. */
export function AngelsScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const glory = useRef(0);
  const standing = useRef<(Group | null)[]>([]);
  const kneeling = useRef<(Group | null)[]>([]);

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.07) * 0.5, 1.6, mobile ? 9.8 : 7.2);
    camera.lookAt(0, -0.2, -0.6);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 1, p) + smoothstep(14.6, 16, p);
    glory.current = 0.35 + 0.65 * smoothstep(1.4, 4.4, p);
    ANGELS.forEach((g, i) => {
      const bowed = p > g.bows;
      const s = standing.current[i];
      const k = kneeling.current[i];
      if (s) s.visible = !bowed;
      if (k) k.visible = bowed;
    });
  });

  return (
    <>
      <fog attach="fog" args={[HEAVEN.haze, 10, 48]} />
      <HeavenSky horizonY={-0.6} stars={mobile ? 260 : 500} />
      <HeavenLights sun={[-3, 5, 6]} intensity={1.4} />
      <CloudFloor y={FLOOR - 0.7} warm={[0, -0.6]} />
      <Throne position={[0, FLOOR - 0.1, -0.6]} glory={glory} mobile={mobile} />
      {ANGELS.map(({ a }, i) => {
        const pos: [number, number, number] = [
          Math.cos(a) * RING[0],
          FLOOR + 0.1,
          -0.6 - Math.sin(a) * RING[1],
        ];
        const face = Math.atan2(-pos[0], -0.6 - pos[2]);
        return (
          <group key={i}>
            <group
              ref={(g) => {
                standing.current[i] = g;
              }}
            >
              <Angel
                position={pos}
                rotationY={face}
                scale={0.74}
                spread={0.9}
              />
            </group>
            <group
              ref={(g) => {
                kneeling.current[i] = g;
              }}
              visible={false}
            >
              <Angel
                position={pos}
                rotationY={face}
                scale={0.74}
                pose="kneeling"
                spread={0.35}
                bow={0.45}
              />
            </group>
          </group>
        );
      })}
      <Squall opacity={haze} color={HEAVEN.top} />
      {effects && <SceneEffects bloom={0.45} threshold={0.82} vignette={0.4} />}
    </>
  );
}
