"use client";

import { useRef } from "react";
import type { Group, PointLight } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import {
  Altar,
  Figure,
  FLOOR,
  HOLY,
  HolyPlace,
  Lampstand,
  Smoke,
} from "../primitives/Sanctuary";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const PERIOD = 16;
const ALTAR_Z = -4.6;
const SELF = 3.4;
const PEOPLE = 8.2;
/** The people waiting behind him: x, z, scale, robe. */
const CROWD: [number, number, number, string][] = [
  [-1.5, 0.2, 0.9, "#5A4636"],
  [-0.8, 0.6, 0.95, "#4A3E52"],
  [0.9, 0.5, 0.92, "#6B4A36"],
  [1.6, 0.1, 0.86, "#3E4A5A"],
  [0.1, 1.0, 0.98, "#584238"],
];

/** “He is obligated to offer sacrifice for his own sins just as he does for those of the people”: smoke rises first for the high priest himself, then wider for the people behind him. */
export function OfferingScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const level = useRef(0);
  const self = useRef(0);
  const people = useRef(0);
  const priest = useRef<Group>(null);
  const crowdLight = useRef<PointLight>(null);

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.05) * 0.12, 0.6, mobile ? 4.4 : 3.4);
    camera.lookAt(0, -0.3, -5);
    const p = t % PERIOD;
    level.current = smoothstep(0, 1.2, p) * (1 - smoothstep(14.6, 16, p));
    self.current =
      smoothstep(SELF, SELF + 1, p) *
      (1 - 0.75 * smoothstep(PEOPLE - 0.6, PEOPLE + 0.4, p)) *
      level.current;
    people.current = smoothstep(PEOPLE, PEOPLE + 1.4, p) * level.current;
    priest.current?.position.setZ(
      lerp(-2.2, ALTAR_Z + 0.75, easeInOutCubic((p - 1) / 2)),
    );
    if (crowdLight.current) crowdLight.current.intensity = 5 * people.current;
  });

  return (
    <>
      <HolyPlace veilZ={-5.6} />
      <Lampstand position={[-2.2, FLOOR, -4.2]} level={level} />
      <Altar position={[0, FLOOR, ALTAR_Z]} />
      <Glow
        position={[0, FLOOR + 0.97, ALTAR_Z]}
        size={0.5}
        scaleY={0.4}
        color="#C8553D"
        inner={HOLY.flame}
        alpha={0.6}
        power={1.6}
        renderOrder={9}
      />
      <Smoke
        position={[0, FLOOR + 1.0, ALTAR_Z]}
        rise={2.6}
        spread={0.18}
        count={110}
        strength={self}
      />
      <Smoke
        position={[0, FLOOR + 1.0, ALTAR_Z]}
        rise={3.4}
        spread={0.75}
        count={220}
        size={6}
        strength={people}
      />
      <group ref={priest} position={[-0.5, FLOOR, -2.2]}>
        <Figure position={[0, 0, 0]} robe={HOLY.blue} turban />
      </group>
      {CROWD.map(([x, z, s, robe]) => (
        <Figure key={x} position={[x, FLOOR, z]} robe={robe} scale={s} />
      ))}
      <pointLight
        position={[0.4, 0.8, 1.2]}
        color="#C9B8A0"
        intensity={1.6}
        distance={8}
        decay={1.4}
      />
      <pointLight
        ref={crowdLight}
        position={[0, 1.2, -1]}
        color="#FFC27A"
        intensity={0}
        distance={6}
        decay={1.6}
      />
      {effects && <SceneEffects bloom={0.7} threshold={0.6} vignette={0.5} />}
    </>
  );
}
