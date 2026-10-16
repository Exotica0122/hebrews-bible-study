"use client";

import { damp } from "maath/easing";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import {
  Altar,
  FLOOR,
  HolyPlace,
  Lampstand,
  Smoke,
  Table,
  TABLE_TOP,
} from "../primitives/Sanctuary";
import { useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

/** Hebrews 5 opening: the Holy Place by lamplight. The lampstand burns, incense rises from the altar before the veil, and the bread lies on its table. */
export function HeroSanctuaryScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  const side = mobile ? 1.5 : 2.3;

  useSceneTime((t, dt, { camera }) => {
    const p = pointer?.current ?? { x: 0, y: 0 };
    damp(camera.position, "x", Math.sin(t * 0.06) * 0.15 + p.x * 0.3, 0.9, dt);
    damp(camera.position, "y", 0.2 - p.y * 0.12, 0.9, dt);
    camera.position.z = mobile ? 5.2 : 4;
    camera.lookAt(0, -0.1, -5);
  });

  return (
    <>
      <HolyPlace />
      <Lampstand position={[-side, FLOOR, -4]} />
      <Altar position={[0, FLOOR, -5.1]} />
      <Smoke position={[0, FLOOR + 1.0, -5.1]} rise={3.4} />
      <Table position={[side, FLOOR, -4]} />
      <BreadStacks x={side} />
      {effects && <SceneEffects bloom={0.7} threshold={0.6} vignette={0.5} />}
    </>
  );
}

function BreadStacks({ x }: { x: number }) {
  return (
    <group position={[x, FLOOR + TABLE_TOP, -4]}>
      {[-0.26, 0.26].map((dx) => (
        <group key={dx} position={[dx, 0, 0]}>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[0, 0.035 + i * 0.07, 0]}
              scale={[0.2, 0.035, 0.14]}
            >
              <sphereGeometry args={[1, 16, 10]} />
              <meshStandardMaterial color="#B98552" roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
