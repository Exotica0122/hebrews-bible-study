"use client";

import { useMemo, useRef } from "react";
import { damp } from "maath/easing";
import { Vector3, type CatmullRomCurve3, type Group } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers } from "../primitives/Earth";
import { OliveTree } from "../primitives/Garden";
import { City } from "../primitives/Salem";
import {
  HillField,
  MoonLights,
  NIGHT,
  NightSky,
  RoadStrip,
  Traveller,
  roadCurve,
  terrainHeight,
  type Terrain,
} from "../primitives/Road";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const WALK = 70;
const ROBES = [
  "#7A6248",
  "#5E4A3A",
  "#8A7056",
  "#6B5442",
  "#7E6650",
  "#5A4636",
  "#8C7A62",
];
const EMBER_BOX: [number, number, number] = [14, 3, 8];

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** One of the travellers, walking the road toward the town and fading in and out at its ends. */
function Pilgrim({
  curve,
  terrain,
  phase,
  robe,
  light,
}: {
  curve: CatmullRomCurve3;
  terrain: Terrain;
  phase: number;
  robe: string;
  light: number;
}) {
  const group = useRef<Group>(null);
  const scratch = useMemo(() => ({ p: new Vector3(), d: new Vector3() }), []);
  useSceneTime((t) => {
    const g = group.current;
    if (!g) return;
    const u = (t / WALK + phase) % 1;
    curve.getPointAt(u, scratch.p);
    curve.getTangentAt(u, scratch.d);
    const step = Math.abs(Math.sin(t * 4 + phase * 30)) * 0.02;
    g.position.set(
      scratch.p.x,
      terrainHeight(scratch.p.x, scratch.p.z, terrain) + step,
      scratch.p.z,
    );
    g.rotation.y = Math.atan2(scratch.d.x, scratch.d.z);
    g.scale.setScalar(
      0.42 * smoothstep(0, 0.04, u) * (1 - smoothstep(0.94, 1, u)),
    );
  });
  return (
    <group ref={group}>
      <Traveller robe={robe} light={light} />
    </group>
  );
}

/** Hebrews 2 opening: a moonlit night in the hills; lamp-carrying travellers wind up the road toward a walled town lit on its hill, “bringing many sons to glory”. */
export function HeroRoadScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  const placed = useRef(false);
  const town = useMemo<[number, number]>(
    () => (mobile ? [1.2, -30] : [6.5, -24]),
    [mobile],
  );
  const terrain = useMemo<Terrain>(
    () => ({
      amp: 1,
      rises: [
        [town[0], town[1], 5, mobile ? 5.5 : 3.2],
        [-12, -34, 7, 3],
        [16, -38, 6, 2.4],
      ],
    }),
    [town, mobile],
  );
  const curve = useMemo(
    () =>
      roadCurve(
        mobile
          ? [
              [0.4, 6],
              [1.5, 1.5],
              [2.5, -4],
              [3.5, -11],
              [4.3, -18],
              [4, -24],
              [town[0], town[1] + 2.6],
            ]
          : [
              [-5, 6],
              [-2.2, 1.5],
              [-3, -4],
              [0.6, -9],
              [-0.4, -14],
              [3.4, -18],
              [town[0], town[1] + 2.6],
            ],
      ),
    [mobile, town],
  );
  const top = terrainHeight(town[0], town[1], terrain);
  const windows = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = hash(i) * Math.PI * 2;
        const r = 0.5 + hash(i + 7) * 1.6;
        return [
          Math.cos(a) * r,
          0.25 + hash(i + 3) * 0.5,
          Math.sin(a) * r * 0.9 + 0.3,
        ] as const;
      }),
    [],
  );
  const trees = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const x = (hash(i + 20) - 0.5) * 20;
        const z = 3 - hash(i + 40) * 22;
        return [x, z, 0.7 + hash(i + 60) * 0.5] as const;
      }).filter(([x, z]) => {
        const p = new Vector3();
        let best = Infinity;
        for (let k = 0; k <= 40; k++) {
          curve.getPointAt(k / 40, p);
          best = Math.min(best, Math.hypot(p.x - x, p.z - z));
        }
        return best > 1.2;
      }),
    [curve],
  );

  useSceneTime((t, dt, { camera }) => {
    const p = pointer?.current ?? { x: 0, y: 0 };
    const x = Math.sin(t * 0.05) * 0.2 + p.x * 0.4;
    const y = 1.7 - p.y * 0.15;
    if (!placed.current) {
      camera.position.set(x, y, camera.position.z);
      placed.current = true;
    }
    damp(camera.position, "x", x, 0.9, dt);
    damp(camera.position, "y", y, 0.9, dt);
    camera.position.z = mobile ? 11 : 9;
    camera.lookAt(0, 1.3, -20);
  });

  return (
    <>
      <fog attach="fog" args={[NIGHT.haze, 16, 70]} />
      <NightSky
        horizonY={0.5}
        glow={0.55}
        stars={mobile ? 140 : 260}
        moon={mobile ? [-6, 15, -45] : [-15, 12, -45]}
      />
      <MoonLights />
      <Glow
        position={[town[0], top + 1.2, town[1] - 3]}
        size={mobile ? 9 : 12}
        scaleY={0.6}
        color="#8A5A26"
        inner="#F3C77A"
        alpha={0.35}
        power={2}
        renderOrder={-7}
      />
      <HillField y={0} terrain={terrain} />
      <RoadStrip y={0} curve={curve} terrain={terrain} width={0.55} />
      {trees.map(([x, z, s], i) => (
        <OliveTree
          key={i}
          position={[x, terrainHeight(x, z, terrain), z]}
          scale={s}
        />
      ))}
      <City position={[town[0], top - 0.1, town[1]]} radius={2.4} />
      <pointLight
        position={[town[0], top + 1.2, town[1] + 3]}
        intensity={14}
        distance={10}
        decay={1.4}
        color="#FFC27A"
      />
      {windows.map(([x, y, z], i) => (
        <Glow
          key={i}
          position={[town[0] + x, top + y, town[1] + z]}
          size={0.22}
          color={NIGHT.lamp}
          inner={NIGHT.core}
          alpha={0.95}
          power={1.2}
          renderOrder={5}
          billboard
          depthTest
        />
      ))}
      {ROBES.map((robe, i) => (
        <Pilgrim
          key={i}
          curve={curve}
          terrain={terrain}
          phase={i / ROBES.length}
          robe={robe}
          light={mobile ? 0 : 2}
        />
      ))}
      <Embers
        count={mobile ? 18 : 40}
        box={EMBER_BOX}
        position={[0, 0.2, -6]}
        rise={0.03}
        size={2}
        alpha={0.35}
      />
      {effects && <SceneEffects bloom={0.4} threshold={0.82} />}
    </>
  );
}
