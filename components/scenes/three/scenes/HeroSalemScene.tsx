"use client";

import { useRef } from "react";
import { damp } from "maath/easing";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { City, Ground, SALEM, SalemHills, SalemLights, SalemSky, Terraces, useStone } from "../primitives/Salem";
import { useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const TELL: [number, number][] = [[7, 0.7], [5.6, 0.8], [4.3, 0.8], [3.2, 0.7]];
const TELL_TOP = TELL.reduce((y, [, h]) => y + h, 0);
const HILL_X = 4;
const HILL_Z = -22;
/** The road down from the gate: x, z, rotation, length. */
const ROAD: [number, number, number, number][] = [[3.2, -15, 0.5, 4], [1, -11, -0.35, 6], [2.2, -5.5, 0.25, 6], [0.6, 0.5, -0.15, 8]];

/** Hebrews 7 opening: Salem on its terraced hill at first light, the walled city and its gate, the road down into the King’s Valley, all cut in stone and lit low from the east. */
export function HeroSalemScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  const placed = useRef(false);
  const road = useStone(SALEM.road);
  const hillX = mobile ? 1.5 : HILL_X;

  useSceneTime((t, dt, { camera }) => {
    const p = pointer?.current ?? { x: 0, y: 0 };
    const x = Math.sin(t * 0.05) * 0.2 + p.x * 0.35;
    const y = 1.6 - p.y * 0.15;
    if (!placed.current) {
      camera.position.set(x, y, camera.position.z);
      placed.current = true;
    }
    damp(camera.position, "x", x, 0.9, dt);
    damp(camera.position, "y", y, 0.9, dt);
    camera.position.z = mobile ? 12 : 9;
    camera.lookAt(0, 1.4, -20);
  });

  return (
    <>
      <fog attach="fog" args={[SALEM.haze, 20, 75]} />
      <SalemSky />
      <Glow position={[-16, 0.5, -55]} size={26} scaleY={0.45} color={SALEM.blush} inner="#FFF1DC" alpha={0.5} power={1.5} renderOrder={-9} />
      <SalemHills />
      <SalemLights />
      <Ground />
      <Terraces position={[hillX, 0, HILL_Z]} levels={TELL} />
      <City position={[hillX, TELL_TOP, HILL_Z]} radius={2.6} />
      {ROAD.map(([x, z, r, len], i) => (
        <mesh key={i} position={[x + hillX - HILL_X, 0.01, z]} rotation={[-Math.PI / 2, 0, r]} material={road}>
          <planeGeometry args={[0.9, len]} />
        </mesh>
      ))}
      <Terraces position={[-11, 0, -30]} levels={[[6, 0.6], [4.4, 0.6], [3, 0.5]]} color={SALEM.deep} />
      <Terraces position={[-5, 0, -12]} levels={[[2.2, 0.35], [1.4, 0.3]]} color={SALEM.stone} segments={8} />
      {effects && <SceneEffects bloom={0.25} threshold={0.92} vignette={0.3} />}
    </>
  );
}
