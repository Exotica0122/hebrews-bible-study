"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import type { Group, ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Squall } from "../primitives/Coast";
import {
  Angel,
  CloudFloor,
  Cumulus,
  HEAVEN,
  HeavenLights,
  HeavenSky,
  Throne,
  throneSeat,
} from "../primitives/Heavens";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 16;
const FLOOR = -1.6;
const STEPS = 6;
const THRONE_Y = FLOOR + 1.05;
const THRONE_Z = -3;
/** Ministering angels sent out from before the throne: when each leaves (s), and where it flies to (x, y, z). */
const SENT: [number, [number, number, number]][] = [
  [2.4, [-5.5, FLOOR + 0.3, 2.2]],
  [3.6, [5.8, FLOOR + 0.6, 1.6]],
  [5.4, [-3.8, FLOOR - 0.2, 3.6]],
  [6.8, [4.2, FLOOR - 0.1, 3.4]],
];
const FLIGHT = 4.2;

/** One ministering angel, flying out from the throne; it fades as it reaches the clouds below. */
function Messenger({
  onReady,
}: {
  onReady: (
    g: Group | null,
    fade: RefObject<number>,
    trail: ShaderMaterial | null,
  ) => void;
}) {
  const group = useRef<Group>(null);
  const fade = useRef(0);
  const trail = useRef<ShaderMaterial | null>(null);
  useEffect(() => onReady(group.current, fade, trail.current), [onReady]);
  return (
    <group ref={group}>
      <Glow
        position={[0, 0.9, -0.3]}
        size={2.6}
        color={HEAVEN.gold}
        inner={HEAVEN.light}
        alpha={0}
        power={2}
        renderOrder={5}
        billboard
        onMaterial={(m) => {
          trail.current = m;
        }}
      />
      <Angel
        position={[0, 0, 0]}
        scale={0.7}
        spread={1}
        bow={0.45}
        opacity={fade}
      />
    </group>
  );
}

/** “Sit at my right hand until I make your enemies a footstool for your feet … Are they not all ministering spirits sent out?”: the throne raised high on its steps above the clouds with the footstool before it, and angels sent out from it, one after another. */
export function ExaltedScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const glory = useRef(1);
  const sent = useRef<
    { g: Group | null; fade: RefObject<number>; trail: ShaderMaterial | null }[]
  >([]);
  const ready = useMemo(
    () =>
      SENT.map(
        (_, i) =>
          (
            g: Group | null,
            fade: RefObject<number>,
            trail: ShaderMaterial | null,
          ) => {
            sent.current[i] = { g, fade, trail };
          },
      ),
    [],
  );
  const seat = THRONE_Y + throneSeat(STEPS) * 1.3;

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(
      Math.sin(t * 0.06) * 0.3,
      THRONE_Y + 2.4,
      mobile ? 12 : 9,
    );
    camera.lookAt(0, THRONE_Y + 1.1, THRONE_Z);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 1, p) + smoothstep(14.6, 16, p);
    glory.current = 0.85 + 0.15 * smoothstep(1, 3, p);
    SENT.forEach(([at, to], i) => {
      const s = sent.current[i];
      if (!s?.g) return;
      const k = easeInOutCubic((p - at) / FLIGHT);
      const x = lerp(0, to[0], k);
      const z = lerp(THRONE_Z + 0.9, to[2], k);
      const y = lerp(seat - 0.4, to[1], k) + Math.sin(k * Math.PI) * 0.9;
      s.g.position.set(x, y, z);
      s.g.rotation.set(0, Math.atan2(to[0], to[2] - THRONE_Z), 0);
      const o =
        smoothstep(at, at + 0.5, p) *
        (1 - smoothstep(at + FLIGHT - 1, at + FLIGHT, p));
      s.fade.current = o;
      if (s.trail) setUniform(s.trail, "uAlpha", 0.4 * o);
    });
  });

  return (
    <>
      <fog attach="fog" args={[HEAVEN.haze, 10, 46]} />
      <HeavenSky horizonY={-1.2} stars={mobile ? 260 : 520} />
      <HeavenLights sun={[-3, 4, 7]} intensity={1.3} />
      <CloudFloor y={FLOOR - 0.6} warm={[0, THRONE_Z]} />
      <Cumulus
        position={[0, FLOOR - 0.6, THRONE_Z]}
        scale={[2.4, 2.1, 1.8]}
        seed={4}
        puffs={13}
      />
      <Throne
        position={[0, THRONE_Y, THRONE_Z]}
        scale={1.3}
        steps={STEPS}
        glory={glory}
        mobile={mobile}
        footstool
      />
      <Glow
        position={[0, seat + 1, THRONE_Z - 2]}
        size={mobile ? 10 : 14}
        color={HEAVEN.gold}
        alpha={0.16}
        power={2.4}
        renderOrder={1}
      />
      {SENT.map((_, i) => (
        <Messenger key={i} onReady={ready[i]} />
      ))}
      <Squall opacity={haze} color={HEAVEN.top} />
      {effects && <SceneEffects bloom={0.45} threshold={0.82} vignette={0.4} />}
    </>
  );
}
