"use client";

import { useMemo } from "react";
import { damp } from "maath/easing";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Embers } from "../primitives/Earth";
import {
  DUSK,
  DuneField,
  DuskLights,
  DuskSky,
  PillarOfFire,
  Tabernacle,
  TENT_CENTRE,
  Tents,
  type Clearing,
  type TentSpot,
} from "../primitives/Wilderness";
import { useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const GROUND = -1.62;
const CAMP_X = 4.3;
const CAMP_Z = -8.5;
const COURT_SCALE = 0.75;
const EMBER_BOX: [number, number, number] = [14, 3, 6];

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Israel camped by tribes on the four sides of the tabernacle, the Levites nearest it (Num 2–3), relative to the court. */
function campSpots(): TentSpot[] {
  const spots: TentSpot[] = [];
  const block = (
    cx: number,
    cz: number,
    cols: number,
    rows: number,
    seed: number,
  ) => {
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) {
        const n = seed + i * 13 + j * 7;
        spots.push({
          x: cx + (i - (cols - 1) / 2) * 0.72 + (hash(n) - 0.5) * 0.22,
          z: cz + (j - (rows - 1) / 2) * 0.62 + (hash(n + 1) - 0.5) * 0.2,
          s: 0.3 + hash(n + 2) * 0.08,
          r: (hash(n + 3) - 0.5) * 0.7,
          lit: hash(n + 4) > 0.6,
        });
      }
  };
  block(4.2, 0, 4, 6, 1);
  block(-4.2, 0, 4, 6, 101);
  block(0, -2.9, 9, 3, 201);
  block(0, 2.9, 9, 3, 301);
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    if (Math.abs(Math.cos(a)) > 0.94) continue;
    spots.push({
      x: Math.cos(a) * 2.5,
      z: Math.sin(a) * 1.5,
      s: 0.26,
      r: -a + Math.PI / 2,
      lit: i % 3 === 0,
    });
  }
  return spots;
}

/** Hebrews 3 opening: the camp of Israel in the dunes at dusk, tribe by tribe around the tabernacle court, the pillar of fire standing over the tent. */
export function HeroCampScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  const cx = mobile ? 1.4 : CAMP_X;
  const cz = mobile ? CAMP_Z - 5 : CAMP_Z;
  const clear = useMemo<Clearing>(() => [cx, cz, 6], [cx, cz]);
  const tents = useMemo(
    () => campSpots().map((t) => ({ ...t, x: t.x + cx, z: t.z + cz })),
    [cx, cz],
  );

  useSceneTime((t, dt, { camera }) => {
    const p = pointer?.current ?? { x: 0, y: 0 };
    damp(camera.position, "x", Math.sin(t * 0.06) * 0.2 + p.x * 0.4, 0.9, dt);
    damp(camera.position, "y", 0.9 - p.y * 0.2, 0.9, dt);
    camera.position.z = mobile ? 10 : 8;
    camera.lookAt(0, -0.4, -10);
  });

  const pillarX = cx + TENT_CENTRE[0] * COURT_SCALE;
  const pillarY = GROUND + TENT_CENTRE[1] * COURT_SCALE;
  return (
    <>
      <fog attach="fog" args={[DUSK.haze, 14, 58]} />
      <DuskSky horizonY={-1.2} glowStrength={0.8} stars={mobile ? 110 : 220} />
      <DuskLights />
      <pointLight
        position={[pillarX, pillarY + 1.6, cz + 0.6]}
        intensity={10}
        distance={8}
        decay={1.4}
        color={DUSK.fire}
      />
      <DuneField y={GROUND} clear={clear} amp={1.3} />
      <Tents spots={tents} y={GROUND} />
      <Tabernacle position={[cx, GROUND, cz]} scale={COURT_SCALE} />
      <PillarOfFire
        position={[pillarX, pillarY, cz]}
        height={mobile ? 3.4 : 4.2}
        mobile={mobile}
      />
      <Embers
        count={mobile ? 20 : 44}
        box={EMBER_BOX}
        position={[0, GROUND, -4]}
        rise={0.03}
        size={2}
        alpha={0.4}
      />
      {effects && <SceneEffects bloom={0.45} threshold={0.8} />}
    </>
  );
}
