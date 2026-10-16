"use client";

import { useEffect, useMemo, useRef } from "react";
import { damp } from "maath/easing";
import {
  BufferGeometry,
  CatmullRomCurve3,
  Float32BufferAttribute,
  MeshStandardMaterial,
  Vector3,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import {
  City,
  Ground,
  SALEM,
  SalemHills,
  SalemLights,
  SalemSky,
  Terraces,
} from "../primitives/Salem";
import { useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const TELL: [number, number][] = [
  [7, 0.7],
  [5.6, 0.8],
  [4.3, 0.8],
  [3.2, 0.7],
];
const TELL_TOP = TELL.reduce((y, [, h]) => y + h, 0);
const HILL_X = 4;
const HILL_Z = -22;
/** The road down from the foot of the tell: x, z. */
const ROAD: [number, number][] = [
  [3.6, -14.6],
  [1.7, -11.5],
  [1.5, -8],
  [2.2, -5],
  [1.5, -1.5],
  [0.4, 2],
  [0, 6],
];
const ROAD_WIDTH = 0.9;

/** One flat ribbon along a smooth curve through the road's points. */
function roadGeometry(dx: number) {
  const curve = new CatmullRomCurve3(
    ROAD.map(([x, z]) => new Vector3(x + dx, 0.01, z)),
  );
  const pos: number[] = [];
  const index: number[] = [];
  const n = 80;
  for (let i = 0; i <= n; i++) {
    const p = curve.getPointAt(i / n);
    const d = curve.getTangentAt(i / n);
    const sx = -d.z * (ROAD_WIDTH / 2);
    const sz = d.x * (ROAD_WIDTH / 2);
    pos.push(p.x - sx, p.y, p.z - sz, p.x + sx, p.y, p.z + sz);
    if (i < n) {
      const a = i * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(pos, 3));
  g.setIndex(index);
  g.computeVertexNormals();
  return g;
}

/** Hebrews 7 opening: Salem on its terraced hill at first light, the walled city and its gate, the road down into the King’s Valley, all cut in stone and lit low from the east. */
export function HeroSalemScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  const placed = useRef(false);
  const hillX = mobile ? 1.5 : HILL_X;
  const road = useMemo(() => roadGeometry(hillX - HILL_X), [hillX]);
  const roadMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: SALEM.road,
        roughness: 1,
        emissive: SALEM.road,
        emissiveIntensity: 0.35,
      }),
    [],
  );
  useEffect(
    () => () => {
      road.dispose();
      roadMat.dispose();
    },
    [road, roadMat],
  );

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
    camera.lookAt(0, mobile ? -3 : 1.4, -20);
  });

  return (
    <>
      <fog attach="fog" args={[SALEM.haze, 20, 75]} />
      <SalemSky />
      <Glow
        position={[-16, 0.5, -55]}
        size={26}
        scaleY={0.45}
        color={SALEM.blush}
        inner="#FFF1DC"
        alpha={0.5}
        power={1.5}
        renderOrder={-9}
      />
      <SalemHills />
      <SalemLights />
      <Ground />
      <Terraces position={[hillX, 0, HILL_Z]} levels={TELL} />
      <City position={[hillX, TELL_TOP, HILL_Z]} radius={2.6} />
      <mesh geometry={road} material={roadMat} />
      <Terraces
        position={[-11, 0, -30]}
        levels={[
          [6, 0.6],
          [4.4, 0.6],
          [3, 0.5],
        ]}
        color={SALEM.deep}
      />
      <Terraces
        position={[-5, 0, -12]}
        levels={[
          [2.2, 0.35],
          [1.4, 0.3],
        ]}
        color={SALEM.stone}
        segments={8}
      />
      {effects && <SceneEffects bloom={0.25} threshold={0.92} vignette={0.3} />}
    </>
  );
}
