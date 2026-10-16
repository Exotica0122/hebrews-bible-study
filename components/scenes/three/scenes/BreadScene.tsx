"use client";

import { useEffect, useMemo, useRef } from "react";
import { CylinderGeometry, LatheGeometry, MeshStandardMaterial, SphereGeometry, Vector2, Vector3, type Group } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Cloth, Flame, Floor, FLOOR, Table, TABLE_TOP } from "../primitives/Sanctuary";
import { easeInOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const PERIOD = 16;
const MOVE = 6;
const TOP = FLOOR + TABLE_TOP;
const CUP_X = -0.42;
const BREAD_X = 0.3;
const CUP: [number, number][] = [[0, 0], [0.06, 0], [0.065, 0.02], [0.085, 0.12], [0.09, 0.14], [0.082, 0.14], [0.077, 0.13]];
/** Flat loaves stacked on the table, and one round loaf broken open in front: x, y, z, size. */
const LOAVES: [number, number, number, number][] = [[BREAD_X + 0.05, 0.03, -0.1, 1], [BREAD_X + 0.05, 0.09, -0.1, 0.96], [BREAD_X + 0.05, 0.15, -0.1, 0.92]];
const look = new Vector3();

/** “You need milk, not solid food … solid food is for the mature”: the lamplight rests on a small cup of milk, then moves across the table to the bread. */
export function BreadScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const level = useRef(0);
  const lamp = useRef<Group>(null);
  const parts = useMemo(
    () => ({
      cup: new LatheGeometry(CUP.map(([r, y]) => new Vector2(r, y)), 24),
      milk: new CylinderGeometry(0.077, 0.077, 0.004, 24),
      loaf: new SphereGeometry(1, 20, 12),
      vessel: new SphereGeometry(0.07, 16, 10),
      chain: new CylinderGeometry(0.004, 0.004, 1.2, 4),
    }),
    [],
  );
  const clay = useMemo(() => new MeshStandardMaterial({ color: "#9A5B3A", roughness: 0.85 }), []);
  const milk = useMemo(() => new MeshStandardMaterial({ color: "#F4EEE2", roughness: 0.35 }), []);
  const crust = useMemo(() => new MeshStandardMaterial({ color: "#B07A45", roughness: 0.9 }), []);
  const crumb = useMemo(() => new MeshStandardMaterial({ color: "#E8D3A8", roughness: 1 }), []);
  useEffect(
    () => () => {
      Object.values(parts).forEach((g) => g.dispose());
      clay.dispose();
      milk.dispose();
      crust.dispose();
      crumb.dispose();
    },
    [parts, clay, milk, crust, crumb],
  );

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    level.current = smoothstep(0, 1.2, p) * (1 - smoothstep(14.6, 16, p));
    const across = easeInOutCubic((p - MOVE) / 3.6);
    const x = lerp(CUP_X, BREAD_X, across);
    lamp.current?.position.set(x + 0.05, TOP + 0.55, 0.25);
    camera.position.set(lerp(-0.35, 0.25, across), TOP + 0.75, mobile ? 2.3 : 1.8);
    camera.lookAt(look.set(lerp(-0.25, 0.2, across), TOP + 0.05, -0.1));
  });

  return (
    <>
      <Cloth kind="veil" width={8} height={5} position={[0, FLOOR, -1.6]} folds={12} depth={0.1} repeat={2} />
      <Floor />
      <hemisphereLight args={["#3A2A20", "#120D0A", 0.45]} />
      <Table position={[0, FLOOR, -0.1]} width={1.6} depth={0.7} />
      <group position={[CUP_X, TOP, 0.05]}>
        <mesh geometry={parts.cup} material={clay} />
        <mesh geometry={parts.milk} material={milk} position={[0, 0.128, 0]} />
      </group>
      {LOAVES.map(([x, y, z, s], i) => (
        <mesh key={i} geometry={parts.loaf} material={crust} position={[x, TOP + y, z]} scale={[0.24 * s, 0.035, 0.16 * s]} />
      ))}
      <group position={[BREAD_X - 0.05, TOP + 0.06, 0.16]}>
        <mesh geometry={parts.loaf} material={crust} position={[-0.06, 0, 0]} scale={[0.09, 0.065, 0.1]} />
        <mesh geometry={parts.loaf} material={crust} position={[0.07, 0, 0.02]} scale={[0.08, 0.06, 0.09]} rotation={[0, 0, -0.25]} />
        <mesh geometry={parts.loaf} material={crumb} position={[0.005, 0.005, 0.01]} scale={[0.03, 0.05, 0.07]} />
      </group>
      <group ref={lamp} position={[CUP_X, TOP + 0.55, 0.25]}>
        <mesh geometry={parts.vessel} material={clay} scale={[1.3, 0.55, 0.9]} />
        <mesh geometry={parts.chain} material={clay} position={[0, 0.6, 0]} />
        <Flame position={[0.09, 0.02, 0]} size={0.045} seed={3} level={level} light={2.4} distance={4} />
      </group>
      {effects && <SceneEffects bloom={0.7} threshold={0.6} vignette={0.5} />}
    </>
  );
}
