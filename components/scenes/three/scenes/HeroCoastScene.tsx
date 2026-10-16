"use client";

import { useRef } from "react";
import { damp } from "maath/easing";
import type { Group } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Soft } from "../primitives/Garden";
import {
  Boat,
  Cliff,
  COAST,
  CoastLights,
  Headlands,
  Plot,
  Rain,
  Rope,
  Sea,
  StormSky,
  swell,
} from "../primitives/Coast";
import { useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const SEA_Y = -1;
const BOAT: [number, number] = [-5.2, -8];
const BOAT_MOBILE: [number, number] = [-1.5, -17];
/** Low cloud over the upper sky: x, y, z, width. */
const CLOUD: [number, number, number, number][] = [
  [-14, 6.5, -40, 26],
  [2, 7.5, -42, 30],
  [16, 6, -38, 24],
  [9, 4.2, -30, 14],
];

/** Hebrews 6 opening: a headland above the sea as the rain moves off. A ploughed field on the cliff, a boat riding at anchor in the bay, a break of light on the water. */
export function HeroCoastScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  const boat = useRef<Group>(null);
  const placed = useRef(false);
  const [boatX, boatZ] = mobile ? BOAT_MOBILE : BOAT;

  useSceneTime((t, dt, { camera }) => {
    const p = pointer?.current ?? { x: 0, y: 0 };
    const x = Math.sin(t * 0.05) * 0.15 + p.x * 0.35;
    const y = 1.3 - p.y * 0.15;
    // The default camera sits at y = 0, inside the field; start on the pose instead of easing up out of the ground.
    if (!placed.current) {
      camera.position.set(x, y, camera.position.z);
      placed.current = true;
    }
    damp(camera.position, "x", x, 0.9, dt);
    damp(camera.position, "y", y, 0.9, dt);
    camera.position.z = mobile ? 10 : 8.5;
    camera.lookAt(0, -0.4, -20);
    if (boat.current) {
      const x = boatX;
      const z = boatZ;
      boat.current.position.y = SEA_Y + swell(x, z, t);
      boat.current.rotation.z =
        (swell(x + 0.5, z, t) - swell(x - 0.5, z, t)) * 0.8;
      boat.current.rotation.x =
        (swell(x, z + 0.3, t) - swell(x, z - 0.3, t)) * 0.8;
    }
  });

  return (
    <>
      <fog attach="fog" args={[COAST.mist, 18, 70]} />
      <StormSky />
      <Glow
        position={[-12, 1.5, -58]}
        size={30}
        scaleY={0.5}
        color="#C9B27E"
        inner={COAST.break}
        alpha={0.35}
        power={1.6}
        renderOrder={-9}
      />
      {CLOUD.map(([x, y, z, w], i) => (
        <Soft
          key={i}
          position={[x, y, z]}
          size={w}
          scaleY={0.32}
          color="#5D6C78"
          opacity={0.55}
          renderOrder={-8}
        />
      ))}
      <Soft
        position={[11, 2.5, -24]}
        size={14}
        scaleX={0.7}
        scaleY={0.9}
        color="#7D8B90"
        opacity={0.4}
        renderOrder={-7}
      />
      <Rain
        position={[11, SEA_Y, -22]}
        box={[12, 9, 6]}
        count={mobile ? 500 : 900}
        size={14}
      />
      <Headlands />
      <Sea y={SEA_Y} breakAt={[-9, -30]} />
      <Cliff position={[6, SEA_Y, -7]} width={10} height={1.6} />
      <Cliff
        position={[-9, SEA_Y, -16]}
        width={8}
        height={1.2}
        turf="#6B7E5E"
        rock="#7A7A70"
        flip
      />
      <CoastLights />
      <group
        ref={boat}
        position={[boatX, SEA_Y, boatZ]}
        rotation={[0, -0.4, 0]}
      >
        <Boat scale={0.9} />
        <Rope from={[0.8, 0.15, 0]} to={[1.3, -1.2, 0.3]} />
      </group>
      <mesh position={[0, -0.005, 3.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 0.8]} />
        <meshStandardMaterial color={COAST.turf} roughness={1} />
      </mesh>
      <Plot position={[0, 0, 8]} size={[16, 8.4]} rows={22} />
      {effects && <SceneEffects bloom={0.3} threshold={0.9} vignette={0.3} />}
    </>
  );
}
