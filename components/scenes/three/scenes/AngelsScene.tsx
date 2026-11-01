"use client";

import { useRef, useState } from "react";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Squall } from "../primitives/Squall";
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
const RING: [number, number] = [3.3, 2.1];
const BOW_TIME = 0.9;
const COUNT = 6;
const GAP = 0.55;
/** Angles from the front, evenly round the back, leaving the front open so the throne shows; each angel bows in turn. */
const ANGELS = Array.from({ length: COUNT }, (_, i) => ({
  a: GAP + (i * (Math.PI * 2 - GAP * 2)) / (COUNT - 1),
  bows: 4.6 + i * 0.5,
}));

/** “Let all God’s angels worship him”: winged angels stand in a ring round the throne above the clouds; as its light grows, they bow one by one. */
export function AngelsScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const glory = useRef(0);
  const [kneels] = useState(() => ANGELS.map(() => ({ current: 0 })));

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.07) * 0.5, 2.4, mobile ? 12.6 : 7.8);
    camera.lookAt(0, -0.35, -0.6);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 1, p) + smoothstep(14.6, 16, p);
    glory.current = 0.35 + 0.65 * smoothstep(1.4, 4.4, p);
    ANGELS.forEach((g, i) => {
      kneels[i].current = smoothstep(g.bows, g.bows + BOW_TIME, p);
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
          Math.sin(a) * RING[0],
          FLOOR + 0.1,
          -0.6 + Math.cos(a) * RING[1],
        ];
        const face = Math.atan2(-pos[0], -0.6 - pos[2]);
        return (
          <Angel
            key={i}
            position={pos}
            rotationY={face}
            scale={0.74}
            spread={0.9}
            kneel={kneels[i]}
            kneelSpread={0.35}
            kneelBow={0.45}
          />
        );
      })}
      <Squall opacity={haze} color={HEAVEN.top} />
      {effects && <SceneEffects bloom={0.45} threshold={0.82} vignette={0.4} />}
    </>
  );
}
