"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import type { Group, ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers } from "../primitives/Earth";
import { Squall } from "../primitives/Squall";
import { Carved } from "../primitives/Salem";
import {
  DUSK,
  DuneField,
  DuskLights,
  DuskSky,
  makeDuskWater,
  type Clearing,
} from "../primitives/Wilderness";
import {
  easeInOutCubic,
  easeOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 18;
const GROUND = -1.2;
const START_Z = -1.2;
const STOP_Z = -5.6;
const RIVER_Z = -7;
const LAND_Z = -9.4;
const MARCH = 11;
const CROSS = 3;
const SCALE = 0.44;
/** Formation offsets (x, z), when each one falls (s), and robe; the first two are Joshua and Caleb, who never do. */
const PEOPLE: [number, number, number, string][] = [
  [-0.22, -0.3, Infinity, "#E2D6BE"],
  [0.24, -0.4, Infinity, "#D8C8A8"],
  [-0.6, 0.3, 3.2, "#7A6248"],
  [0.05, 0.2, 8.2, "#5E4A3A"],
  [0.62, 0.35, 5.1, "#8A7056"],
  [-0.3, 0.8, 9.8, "#6B5442"],
  [0.35, 0.9, 4.1, "#7E6650"],
  [-0.85, 1.0, 7.0, "#5A4636"],
  [0.9, 1.1, 9.1, "#7A6248"],
  [-0.05, 1.4, 6.1, "#6B5442"],
  [0.5, 1.6, 10.4, "#8A7056"],
  [-0.5, 1.7, 3.8, "#5E4A3A"],
];
const WILD: Clearing = [0, -3.4, 4.2];
const LAND: Clearing = [0, -9.6, 2.2];
const CHANNEL: [number, number] = [RIVER_Z, 0.9];
const EMBER_BOX: [number, number, number] = [8, 2.4, 3];

/** One of the people, walking away from the camera; its fade is handed up so the scene can let it settle into the sand. */
function Walker({
  robe,
  onFade,
  onHalo,
}: {
  robe: string;
  onFade: (fade: RefObject<number>) => void;
  onHalo: (m: ShaderMaterial) => void;
}) {
  const fade = useRef(1);
  useEffect(() => onFade(fade), [onFade]);
  return (
    <group scale={SCALE}>
      <Glow
        position={[0, 0.9, -0.1]}
        size={3.2}
        color="#F3D38A"
        inner="#FFF8E8"
        alpha={0}
        power={1.8}
        renderOrder={4}
        onMaterial={onHalo}
      />
      <Carved
        position={[0, 0, 0]}
        rotationY={Math.PI}
        robe={robe}
        opacity={fade}
      />
    </group>
  );
}

const marchZ = (p: number) => lerp(START_Z, STOP_Z, easeInOutCubic(p / MARCH));

/** “They were unable to enter because of unbelief”: a people walks toward the green land over the Jordan; one by one they fall in the sand, and only two cross over. */
export function ThresholdScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const people = useRef<Group>(null);
  const fades = useRef<RefObject<number>[]>([]);
  const halos = useRef<(ShaderMaterial | null)[]>([]);
  const landGlow = useRef<ShaderMaterial | null>(null);
  const river = useMemo(() => makeDuskWater({ round: false }), []);
  useEffect(() => () => river.dispose(), [river]);
  const spread = mobile ? 0.7 : 1;

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.07) * 0.2, -0.05, mobile ? 5.4 : 4.2);
    camera.lookAt(0, -0.85, -8);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 1, p) + smoothstep(16.6, 18, p);
    const cross = easeInOutCubic((p - MARCH) / CROSS);
    setUniform(river, "uTime", t);

    people.current?.children.forEach((g, i) => {
      const [dx, dz, falls] = PEOPLE[i];
      const faithful = falls === Infinity;
      const at = Math.min(p, falls);
      const z = (faithful ? lerp(marchZ(at), LAND_Z, cross) : marchZ(at)) + dz;
      const walking = p < falls && p < MARCH + (faithful ? CROSS : 0);
      const step = walking ? Math.sin(t * 5 + i * 1.7) : 0;
      const down = faithful ? 0 : easeOutCubic((p - falls) / 0.9);
      const sink = faithful ? 0 : smoothstep(falls + 1, falls + 3.2, p);
      g.position.set(
        dx * spread,
        GROUND + Math.abs(step) * 0.012 - sink * 0.12,
        z,
      );
      g.rotation.set(-down * Math.PI * 0.48, 0, step * 0.03);
      const f = fades.current[i];
      if (f) f.current = 1 - sink;
      const h = halos.current[i];
      if (h)
        setUniform(
          h,
          "uAlpha",
          faithful ? 0.7 * smoothstep(MARCH + 0.8, MARCH + CROSS, p) : 0,
        );
    });
    if (landGlow.current)
      setUniform(
        landGlow.current,
        "uAlpha",
        0.4 + 0.3 * smoothstep(MARCH + 1, MARCH + CROSS, p),
      );
  });

  return (
    <>
      <fog attach="fog" args={[DUSK.haze, 6, 30]} />
      <DuskSky horizonY={-1.1} glowStrength={1} stars={mobile ? 90 : 180} />
      <DuskLights sun={[-6, 2.2, -10]} intensity={2.4} />
      <Glow
        position={[0, -0.6, -30]}
        size={mobile ? 22 : 30}
        scaleY={0.45}
        color="#D9A24A"
        inner="#FFE3B0"
        alpha={0}
        power={1.8}
        renderOrder={-9}
        onMaterial={(m) => {
          landGlow.current = m;
        }}
      />
      <DuneField
        y={GROUND}
        clear={WILD}
        amp={0.9}
        near={6}
        far={RIVER_Z - 1}
        channel={CHANNEL}
      />
      <DuneField
        y={GROUND}
        clear={LAND}
        amp={0.7}
        near={RIVER_Z + 1}
        far={-40}
        color="#7E8A4E"
        glow={0.45}
        channel={CHANNEL}
      />
      <mesh
        material={river}
        position={[0, GROUND + 0.02, RIVER_Z]}
        rotation={[-Math.PI / 2, 0, 0]}
        renderOrder={3}
      >
        <planeGeometry args={[44, 2.2]} />
      </mesh>
      <group ref={people}>
        {PEOPLE.map(([, , , robe], i) => (
          <Walker
            key={i}
            robe={robe}
            onFade={(f) => {
              fades.current[i] = f;
            }}
            onHalo={(m) => {
              halos.current[i] = m;
            }}
          />
        ))}
      </group>
      <Embers
        count={mobile ? 16 : 30}
        box={EMBER_BOX}
        position={[0, GROUND, -4]}
        rise={0.03}
        size={1.8}
        alpha={0.35}
      />
      <Squall opacity={haze} color="#1E1A2A" />
      {effects && <SceneEffects bloom={0.45} threshold={0.8} />}
    </>
  );
}
