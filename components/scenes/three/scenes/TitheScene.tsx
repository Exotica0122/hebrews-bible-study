"use client";

import { useRef } from "react";
import type { Group } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Squall } from "../primitives/Squall";
import {
  Bundle,
  Carved,
  Ground,
  SALEM,
  SalemHills,
  SalemLights,
  SalemSky,
  Terraces,
} from "../primitives/Salem";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const PERIOD = 16;
const FROM: [number, number] = [-0.2, 1.1];
/** Abraham: where he stands, where he lifts the tenth, where he sets it down. */
const HOME: [number, number] = [-1.2, 0];
const PICK: [number, number] = [-0.6, 0.75];
const DROP: [number, number] = [0.75, 0.55];
const HANDS: [number, number, number] = [0.4, 0.5, 0];
/** Abraham’s line behind him, not yet born: Isaac, Jacob, Levi. */
const LINE: [number, number, number][] = [
  [-2.2, -1, 7],
  [-3.4, -1.7, 8.3],
  [-4.6, -2.4, 9.6],
];

/** “See how great this man was to whom Abraham the patriarch gave a tenth of the spoils”: ten bundles lie on the road; one is carried to Melchizedek’s feet, and behind Abraham his line appears, Levi among them, still in his loins. */
export function TitheScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const tenth = useRef<Group>(null);
  const abraham = useRef<Group>(null);
  const isaac = useRef(0);
  const jacob = useRef(0);
  const levi = useRef(0);

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    const out = 1 - smoothstep(14.4, 16, p);
    haze.current = 1 - smoothstep(0, 1.4, p) + smoothstep(14.4, 16, p);
    camera.position.set(Math.sin(t * 0.05) * 0.2, 1.8, mobile ? 8.5 : 7);
    camera.lookAt(-0.6, mobile ? -0.8 : 0.8, -0.8);
    const w1 = easeInOutCubic((p - 1.8) / 1.4);
    const w2 = easeInOutCubic((p - 4) / 2.4);
    const ax = lerp(lerp(HOME[0], PICK[0], w1), DROP[0], w2);
    const az = lerp(lerp(HOME[1], PICK[1], w1), DROP[1], w2);
    const walking = (w1 > 0 && w1 < 1) || (w2 > 0 && w2 < 1);
    abraham.current?.position.set(
      ax,
      walking ? Math.abs(Math.sin(p * 5)) * 0.03 : 0,
      az,
    );
    const lift = smoothstep(3.3, 3.9, p);
    const set = smoothstep(6.5, 7.1, p);
    if (tenth.current)
      tenth.current.position.set(
        lerp(FROM[0], ax + HANDS[0], lift),
        HANDS[1] * lift * (1 - set),
        lerp(FROM[1], az + HANDS[2], lift),
      );
    LINE.forEach(([, , at], i) => {
      [isaac, jacob, levi][i].current =
        0.55 * smoothstep(at, at + 1.4, p) * out;
    });
  });

  return (
    <>
      <fog attach="fog" args={[SALEM.haze, 12, 45]} />
      <SalemSky horizonY={0} />
      <SalemHills />
      <SalemLights />
      <Ground />
      <Terraces
        position={[-6, 0, -14]}
        levels={[
          [5, 0.5],
          [3.6, 0.5],
        ]}
        color={SALEM.deep}
      />
      <group ref={abraham} position={[HOME[0], 0, HOME[1]]}>
        <Carved position={[0, 0, 0]} robe={SALEM.mantle} rotationY={1.1} />
      </group>
      <Carved position={[1.7, 0, 0]} rotationY={-1.2} crown />
      {Array.from({ length: 9 }, (_, i) => (
        <Bundle
          key={i}
          position={[-3.1 + i * 0.33, 0, 1.1 + (i % 2) * 0.12]}
          rotationY={i * 0.7}
          scale={0.9}
        />
      ))}
      <group ref={tenth} position={[FROM[0], 0, FROM[1]]}>
        <Bundle position={[0, 0, 0]} color="#B08A5E" scale={0.9} />
      </group>
      <Carved
        position={[LINE[0][0], 0, LINE[0][1]]}
        robe={SALEM.stone}
        rotationY={1}
        scale={0.96}
        opacity={isaac}
      />
      <Carved
        position={[LINE[1][0], 0, LINE[1][1]]}
        robe={SALEM.stone}
        rotationY={1}
        scale={0.96}
        opacity={jacob}
      />
      <Carved
        position={[LINE[2][0], 0, LINE[2][1]]}
        robe={SALEM.stone}
        rotationY={1}
        scale={0.96}
        turban
        opacity={levi}
      />
      <Squall opacity={haze} color={SALEM.haze} />
      {effects && <SceneEffects bloom={0.25} threshold={0.92} vignette={0.3} />}
    </>
  );
}
