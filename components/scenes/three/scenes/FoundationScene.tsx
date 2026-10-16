"use client";

import { useEffect, useMemo, useRef } from "react";
import { BoxGeometry, MeshStandardMaterial, type Mesh } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import {
  COAST,
  CoastLights,
  Headlands,
  Sea,
  Squall,
  StormSky,
} from "../primitives/Coast";
import {
  easeInOutCubic,
  easeOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const PERIOD = 16;
const GROUND = -1.2;
const W = 0.62;
const H = 0.3;
const GAP = 0.01;
const COURSES = 5;
const BUILD = 2.4;
const STEP = 0.2;
/** The six foundation stones, then each course above in running bond: x, course. */
const FOUNDATION = Array.from({ length: 6 }, (_, i) => (i - 2.5) * (W + GAP));
const WALL = Array.from({ length: COURSES }, (_, c) => {
  const odd = c % 2 === 0;
  const n = odd ? 5 : 6;
  return Array.from({ length: n }, (_, k) => ({
    x: (k - (n - 1) / 2) * (W + GAP),
    c: c + 1,
  }));
}).flat();

/** “Not laying again a foundation”: six stones lie on the headland, laid once. Nobody lays them again; course by course the wall rises on them. */
export function FoundationScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const squall = useRef(1);
  const stones = useRef<(Mesh | null)[]>([]);
  const box = useMemo(() => new BoxGeometry(W, H, 0.42), []);
  const base = useMemo(() => new BoxGeometry(W, H * 1.4, 0.62), []);
  const core = useMemo(
    () => new BoxGeometry(W + GAP * 2, H + GAP * 2, 0.3),
    [],
  );
  const mortar = useMemo(
    () => new MeshStandardMaterial({ color: "#4A463E", roughness: 1 }),
    [],
  );
  const tones = useMemo(
    () =>
      ["#C9C3B2", "#BDB7A6", "#D2CCBB"].map(
        (color) => new MeshStandardMaterial({ color, roughness: 0.95 }),
      ),
    [],
  );
  const old = useMemo(
    () => new MeshStandardMaterial({ color: "#7F7A6C", roughness: 1 }),
    [],
  );
  const turf = useMemo(
    () => new MeshStandardMaterial({ color: COAST.turf, roughness: 1 }),
    [],
  );
  useEffect(
    () => () => {
      box.dispose();
      base.dispose();
      core.dispose();
      mortar.dispose();
      tones.forEach((m) => m.dispose());
      old.dispose();
      turf.dispose();
    },
    [box, base, core, mortar, tones, old, turf],
  );

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    squall.current = 1 - smoothstep(0, 1.4, p) + smoothstep(14.4, 16, p);
    const rise = easeInOutCubic((p - 1) / 11);
    camera.position.set(
      Math.sin(t * 0.05) * 0.2 + 0.4,
      lerp(GROUND + 0.9, GROUND + 1.3, rise),
      lerp(mobile ? 5.5 : 3.6, mobile ? 8.5 : 6.4, rise),
    );
    camera.lookAt(0, lerp(GROUND + 0.1, GROUND + 0.85, rise), 0);
    WALL.forEach((s, i) => {
      const m = stones.current[i];
      if (!m) return;
      const k = easeOutCubic((p - BUILD - i * STEP) / 0.5);
      m.visible = k > 0;
      m.position.y =
        GROUND + H + H / 2 + GAP + (s.c - 1) * (H + GAP) + (1 - k) * 2.5;
    });
  });

  return (
    <>
      <fog attach="fog" args={[COAST.mist, 10, 50]} />
      <StormSky horizonY={-1.6} />
      <Headlands />
      <Sea y={-3} near={-8} breakAt={[-6, -26]} />
      <CoastLights sun={[-5, 5, 4]} />
      <mesh
        position={[0, GROUND, -2]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={turf}
      >
        <planeGeometry args={[20, 12]} />
      </mesh>
      {FOUNDATION.map((x, i) => (
        <mesh
          key={i}
          geometry={base}
          material={old}
          position={[x, GROUND + H * 0.3, 0]}
        />
      ))}
      {WALL.map((s, i) => (
        <mesh
          key={i}
          ref={(m) => {
            stones.current[i] = m;
          }}
          geometry={box}
          material={tones[(i + 1) % 3]}
          position={[s.x, GROUND + 3, 0]}
          visible={false}
        >
          <mesh geometry={core} material={mortar} />
        </mesh>
      ))}
      <Squall opacity={squall} />
      {effects && <SceneEffects bloom={0.25} threshold={0.95} vignette={0.3} />}
    </>
  );
}
