"use client";

import { damp } from "maath/easing";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { ridgeY } from "../primitives/Earth";
import { Clouds, DayLights, DaySky, GARDEN_HILLS, GardenHills, GroundShadow, OliveTree, StillWater, Sun } from "../primitives/Garden";
import { useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const CLOUDS: [number, number, number][] = [[-9, 4.2, 7], [-1, 5.4, 9], [7, 3.6, 6], [14, 5, 8]];
/** [x, scale] on the near ridge, then on the mid ridge. */
const NEAR: [number, number][] = [[-5.6, 1.5], [-4.3, 1.1], [4.4, 1.7], [5.8, 1.2]];
const MID: [number, number][] = [[-7.2, 1.2], [-2.8, 0.9], [2.2, 0.8], [7.4, 1.3]];

/** Hebrews 4 opening: the garden on the seventh day, in full light. The work is finished; nothing moves but the clouds. */
export function HeroGardenScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  const sunX = mobile ? -2 : -5.5;

  useSceneTime((t, dt, { camera }) => {
    const p = pointer?.current ?? { x: 0, y: 0 };
    damp(camera.position, "x", Math.sin(t * 0.05) * 0.12 + p.x * 0.35, 0.9, dt);
    damp(camera.position, "y", 0.1 - p.y * 0.15, 0.9, dt);
    camera.position.z = mobile ? 9.5 : 8;
    camera.lookAt(0, -0.3, -8);
  });

  const [, mid, near] = GARDEN_HILLS;
  return (
    <>
      <DaySky />
      <Sun position={[sunX, 5.5, -17.6]} size={1.1} />
      <Clouds clouds={CLOUDS} />
      <GardenHills />
      <DayLights sun={[sunX, 6, 2]} />
      {MID.map(([x, s]) => (
        <OliveTree key={x} position={[x, ridgeY(mid, x) - 0.05, mid.z + 0.2]} scale={s} />
      ))}
      {NEAR.map(([x, s]) => (
        <group key={x}>
          <GroundShadow x={x + 0.25 * s} y={ridgeY(near, x) - 0.04} z={near.z + 0.2} w={1.1 * s} />
          <OliveTree position={[x, ridgeY(near, x) - 0.04, near.z + 0.2]} scale={s} />
        </group>
      ))}
      <StillWater y={-1.68} z={-4.6} alpha={0.6} />
      {effects && <SceneEffects bloom={0.25} threshold={0.95} vignette={0.25} />}
    </>
  );
}
