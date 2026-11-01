"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  Color,
  DodecahedronGeometry,
  MeshStandardMaterial,
  PlaneGeometry,
  type Group,
  type Mesh,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Squall } from "../primitives/Squall";
import { Glow } from "../primitives/Glow";
import type { HillLayer } from "../primitives/Earth";
import {
  Clouds,
  DAY,
  DayLights,
  DaySky,
  GardenHills,
  Soft,
  Sun,
} from "../primitives/Garden";
import { Sand } from "../primitives/Wilderness";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { lerpColor, setUniform } from "../primitives/mutate";

const PERIOD = 17;
const GROUND = -1.2;
const RIVER_Z = -6.5;
const CAIRN: [number, number] = [1.5, -3.2];
const PATH_NEAR = -0.5;
const PATH_FAR = -15;
/** Pools of light along the path, near to far. */
const TRAIL = Array.from({ length: 14 }, (_, i) =>
  lerp(PATH_NEAR, PATH_FAR, i / 13),
);
const YEARS: [number, number] = [0.8, 7.4];
const TODAY = 8.2;
const HILLS: HillLayer[] = [
  { y: -0.7, z: -17, amp: 0.5, freq: 0.22, seed: 3.4, color: "#A9B7B4" },
  { y: -0.95, z: -12, amp: 0.25, freq: 0.36, seed: 1.2, color: "#9DB083" },
];
const CLOUDS: [number, number, number][] = [
  [-7, 4.4, 6],
  [2, 5.2, 8],
  [9, 3.9, 5],
];
const NEW_STONE = new Color(DAY.stone);
const OLD_STONE = new Color("#8E8C78");

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Twelve stones from the Jordan, set up in a heap (Josh 4:20): a ring of seven, a ring of four, one on top. */
const STONES = Array.from({ length: 12 }, (_, i) => {
  const ring = i < 7 ? 0 : i < 11 ? 1 : 2;
  const n = [7, 4, 1][ring];
  const k = i - [0, 7, 11][ring];
  const a = (k / n) * Math.PI * 2 + ring * 0.6;
  const r = [0.42, 0.22, 0][ring];
  return {
    x: Math.cos(a) * r,
    z: Math.sin(a) * r * 0.8,
    y: [0.12, 0.33, 0.52][ring],
    s: 0.17 - ring * 0.02 + hash(i) * 0.04,
    rot: hash(i + 9) * 6.28,
  };
});

/** “If Joshua had given them rest, God would not have spoken of another day”: the years turn the shadow of Joshua’s stones and weather them; then “Today” runs a path of light past them. */
export function JordanScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const fade = useRef(1);
  const sun = useRef<Group>(null);
  const shadow = useRef<Group>(null);
  const cairn = useRef<Group>(null);
  const trail = useRef<(ShaderMaterial | null)[]>([]);
  const head = useRef<ShaderMaterial>(null);
  const headMesh = useRef<Mesh | null>(null);
  const geometry = useMemo(() => {
    const g = new DodecahedronGeometry(1, 0);
    g.scale(1.25, 0.75, 1);
    return g;
  }, []);
  const stone = useMemo(
    () =>
      new MeshStandardMaterial({
        color: DAY.stone,
        roughness: 0.95,
        flatShading: true,
      }),
    [],
  );
  const bed = useMemo(() => new PlaneGeometry(40, 1.4), []);
  const water = useMemo(
    () =>
      new MeshStandardMaterial({
        color: DAY.water,
        emissive: "#B4D0D6",
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.1,
      }),
    [],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      stone.dispose();
      bed.dispose();
      water.dispose();
    },
    [geometry, stone, bed, water],
  );
  const arc = mobile ? 5 : 9;

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.05) * 0.15, 0.3, mobile ? 5.4 : 4);
    camera.lookAt(0, -0.6, -8);
    const p = t % PERIOD;
    fade.current = 1 - smoothstep(0, 0.9, p) + smoothstep(15.4, 16.8, p);
    const years = easeInOutCubic((p - YEARS[0]) / (YEARS[1] - YEARS[0]));
    const renew = smoothstep(15.6, 17, p);
    const age = years * (1 - renew);
    const run = easeInOutCubic((p - TODAY) / 3.4) * (1 - renew);

    sun.current?.position.set(
      lerp(-arc, arc, years),
      3.6 + Math.sin(years * Math.PI) * 1.4,
      -17.6,
    );
    if (shadow.current) shadow.current.rotation.y = lerp(1.1, -1.1, years);
    lerpColor(stone, NEW_STONE, OLD_STONE, age);
    cairn.current?.position.setY(GROUND - 0.1 * age);
    trail.current.forEach(
      (m, i) =>
        m &&
        setUniform(
          m,
          "uAlpha",
          0.75 *
            smoothstep(i / TRAIL.length - 0.02, i / TRAIL.length + 0.06, run) *
            (1 - renew),
        ),
    );
    headMesh.current?.position.set(
      0,
      GROUND + 0.02,
      lerp(PATH_NEAR, PATH_FAR, run),
    );
    if (head.current)
      setUniform(
        head.current,
        "uAlpha",
        0.9 * smoothstep(0, 0.1, run) * (1 - smoothstep(0.85, 1, run)),
      );
  });

  return (
    <>
      <DaySky horizonY={-0.8} />
      <group ref={sun}>
        <Sun position={[0, 0, 0]} size={0.9} />
      </group>
      <Clouds clouds={CLOUDS} />
      <GardenHills layers={HILLS} />
      <Sand y={GROUND} far={RIVER_Z} color="#7E9460" />
      <Sand y={GROUND} far={-13} near={RIVER_Z} color="#93A673" />
      <mesh
        geometry={bed}
        material={water}
        position={[0, GROUND + 0.02, RIVER_Z]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      {TRAIL.map((z, i) => (
        <group
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, GROUND + 0.015, z]}
        >
          <Glow
            size={1}
            scaleX={1.6}
            scaleY={2.2}
            color="#F0C27E"
            inner="#FFF8E8"
            alpha={0}
            power={1.2}
            renderOrder={4}
            onMaterial={(m) => {
              trail.current[i] = m;
            }}
          />
        </group>
      ))}
      <Glow
        size={1.2}
        color={DAY.gold}
        inner="#FFF8E8"
        alpha={0}
        power={1.6}
        renderOrder={5}
        billboard
        onMaterial={(m) => {
          head.current = m;
        }}
        onMesh={(m) => {
          headMesh.current = m;
        }}
      />
      <DayLights sun={[-3, 5, 3]} />
      <group
        ref={shadow}
        position={[CAIRN[0], GROUND + 0.005, CAIRN[1]]}
        scale={1.6}
      >
        <Soft
          position={[0.55, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          size={1}
          scaleX={1.6}
          scaleY={0.7}
          color={DAY.shade}
          opacity={0.4}
          renderOrder={2}
        />
      </group>
      <group ref={cairn} position={[CAIRN[0], GROUND, CAIRN[1]]} scale={1.6}>
        {STONES.map((s, i) => (
          <mesh
            key={i}
            geometry={geometry}
            material={stone}
            position={[s.x, s.y, s.z]}
            rotation={[0, s.rot, 0]}
            scale={s.s}
          />
        ))}
      </group>
      <Squall opacity={fade} color={DAY.haze} />
      {effects && (
        <SceneEffects bloom={0.25} threshold={0.95} vignette={0.25} />
      )}
    </>
  );
}
