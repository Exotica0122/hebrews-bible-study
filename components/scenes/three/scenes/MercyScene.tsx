"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  BoxGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  type Group,
  type Mesh,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Squall } from "../primitives/Coast";
import { Glow } from "../primitives/Glow";
import { figureGeometry, type HillLayer } from "../primitives/Earth";
import {
  DAY,
  DayLights,
  DaySky,
  GardenHills,
  Soft,
} from "../primitives/Garden";
import { Sand } from "../primitives/Wilderness";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setEmissive, setOpacity, setUniform } from "../primitives/mutate";

const PERIOD = 17;
const GROUND = -1.4;
const RISE = 0.8;
const OPEN = 5.4;
const WALK = 7.6;
const STEP_H = 0.2;
const STEP_D = 0.5;
/** Front edge of the bottom step; each step above sits one STEP_D further back. */
const STEP_Z = -2.15;
const STEPS = 3;
const TOP = GROUND + STEP_H * STEPS;
const THRONE_Z = STEP_Z - STEP_D * STEPS - 0.4;
const BACK_Z = THRONE_Z - 0.6;
const HILLS: HillLayer[] = [
  { y: -0.9, z: -15, amp: 0.4, freq: 0.24, seed: 4.2, color: "#A9B7B4" },
  { y: -1.2, z: -10, amp: 0.2, freq: 0.4, seed: 1.7, color: "#8FA27E" },
];
/** Cloud banks the light passes through, low to high: y, z, width. */
const BANKS: [number, number, number][] = [
  [1.2, -9, 9],
  [2.6, -11, 12],
  [4, -13, 15],
];

/** Height of the stair under a point at depth `z`, lifting over the last part of each tread so a climber steps up rather than jumps. */
function stairY(z: number) {
  const u = (STEP_Z - z) / STEP_D + 1;
  const i = Math.floor(u);
  const n = Math.min(STEPS, Math.max(0, i + smoothstep(0.65, 1, u - i)));
  return GROUND + n * STEP_H;
}

/** “A great high priest who has passed through the heavens … draw near to the throne of grace”: a light passes up through the clouds; the throne below grows warm, and one climbs the steps to it unafraid. */
export function MercyScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const fade = useRef(1);
  const riser = useRef<Mesh | null>(null);
  const riserGlow = useRef<ShaderMaterial>(null);
  const banks = useRef<MeshBasicMaterial[]>([]);
  const halo = useRef<ShaderMaterial>(null);
  const walker = useRef<Group>(null);
  const box = useMemo(() => new BoxGeometry(1, 1, 1), []);
  const limestone = useMemo(
    () => new MeshStandardMaterial({ color: DAY.stone, roughness: 0.9 }),
    [],
  );
  const seat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#E8D6A8",
        roughness: 0.6,
        metalness: 0.2,
        emissive: "#F3C77A",
        emissiveIntensity: 0,
      }),
    [],
  );
  const figure = useMemo(() => figureGeometry(), []);
  const ink = useMemo(
    () => new MeshBasicMaterial({ color: DAY.ink, transparent: true }),
    [],
  );
  useEffect(
    () => () => {
      box.dispose();
      limestone.dispose();
      seat.dispose();
      figure.dispose();
      ink.dispose();
    },
    [box, limestone, seat, figure, ink],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.05) * 0.15, 0.2, mobile ? 5.6 : 4.4);
    camera.lookAt(0, mobile ? -1.35 : -0.55, -5);
    const p = t % PERIOD;
    fade.current = 1 - smoothstep(0, 0.9, p) + smoothstep(15.4, 16.8, p);
    const rise = easeInOutCubic((p - RISE) / (OPEN - RISE));
    const ry = lerp(TOP + 1.2, 6.2, rise);
    const open = smoothstep(OPEN - 0.6, OPEN + 1.8, p);
    const away = smoothstep(15.6, 17, p);

    riser.current?.position.set(0, ry, lerp(THRONE_Z, -13, rise));
    if (riserGlow.current)
      setUniform(
        riserGlow.current,
        "uAlpha",
        smoothstep(RISE, RISE + 0.5, p) * (1 - smoothstep(OPEN - 0.8, OPEN, p)),
      );
    BANKS.forEach(([y], i) => {
      const m = banks.current[i];
      if (m)
        setOpacity(
          m,
          0.55 + 0.35 * Math.exp(-Math.abs(ry - y) * 1.6) * (1 - open),
        );
    });
    setEmissive(seat, (mobile ? 0.12 : 0.35) * open * (1 - away));
    if (halo.current)
      setUniform(
        halo.current,
        "uAlpha",
        (mobile ? 0.28 : 0.55) * open * (1 - away),
      );

    const walk = easeInOutCubic((p - WALK) / 5.6);
    const z = lerp(-0.6, THRONE_Z + 0.75, walk);
    const step = walk > 0 && walk < 1 ? Math.sin(t * 5) : 0;
    walker.current?.position.set(0, stairY(z) + Math.abs(step) * 0.01, z);
    if (walker.current) walker.current.rotation.z = step * 0.03;
    setOpacity(ink, 1 - away);
  });

  return (
    <>
      <DaySky horizonY={-1.1} />
      <GardenHills layers={HILLS} />
      {BANKS.map(([y, z, w], i) => (
        <Soft
          key={i}
          position={[0, y, z]}
          size={w}
          scaleY={0.22}
          color="#FFFFFF"
          opacity={0.55}
          renderOrder={-7 + i}
          onMaterial={(m) => {
            banks.current[i] = m;
          }}
        />
      ))}
      <Glow
        size={0.8}
        color={DAY.gold}
        inner="#FFFFFF"
        alpha={0}
        power={1.1}
        renderOrder={8}
        billboard
        onMaterial={(m) => {
          riserGlow.current = m;
        }}
        onMesh={(m) => {
          riser.current = m;
        }}
      />
      <Sand y={GROUND} far={-9} color="#7E9460" />
      <DayLights sun={[-3, 6, 4]} />
      {Array.from({ length: STEPS }, (_, i) => {
        const front = STEP_Z - STEP_D * i;
        return (
          <mesh
            key={i}
            geometry={box}
            material={limestone}
            position={[0, GROUND + STEP_H * (i + 0.5), (front + BACK_Z) / 2]}
            scale={[3.2 - i * 0.5, STEP_H, front - BACK_Z]}
          />
        );
      })}
      <Glow
        position={[0, TOP + 0.8, THRONE_Z - 0.3]}
        size={3.6}
        scaleY={1.2}
        color="#E9B982"
        inner="#FFF1D6"
        alpha={0}
        power={1.6}
        renderOrder={3}
        onMaterial={(m) => {
          halo.current = m;
        }}
      />
      <group position={[0, TOP, THRONE_Z]}>
        <mesh
          geometry={box}
          material={seat}
          position={[0, 0.24, 0]}
          scale={[0.9, 0.48, 0.6]}
        />
        <mesh
          geometry={box}
          material={seat}
          position={[0, 0.78, -0.24]}
          scale={[0.9, 1.1, 0.14]}
        />
        <mesh
          geometry={box}
          material={seat}
          position={[-0.42, 0.62, 0.02]}
          scale={[0.12, 0.28, 0.6]}
        />
        <mesh
          geometry={box}
          material={seat}
          position={[0.42, 0.62, 0.02]}
          scale={[0.12, 0.28, 0.6]}
        />
      </group>
      <Soft
        position={[0.3, GROUND + 0.005, STEP_Z + 0.35]}
        rotation={[-Math.PI / 2, 0, 0]}
        size={1}
        scaleX={3.6}
        scaleY={0.5}
        color={DAY.shade}
        opacity={0.3}
        renderOrder={2}
      />
      <group ref={walker}>
        <mesh geometry={figure} material={ink} scale={0.5} renderOrder={10} />
      </group>
      <Squall opacity={fade} color={DAY.haze} />
      {effects && <SceneEffects bloom={0.3} threshold={0.94} vignette={0.25} />}
    </>
  );
}
