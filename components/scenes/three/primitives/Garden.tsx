"use client";

import { useEffect, useMemo } from "react";
import {
  CylinderGeometry,
  IcosahedronGeometry,
  MeshStandardMaterial,
} from "three";

/** Hebrews 4 palette: the seventh day in full light, clear blue overhead, warm haze low, sage hills and olive leaves. */
export const DAY = {
  top: "#6E9CCB",
  horizon: "#E4E6DD",
  haze: "#F2DDB4",
  sun: "#FFF8E8",
  gold: "#F3C77A",
  water: "#BFD6DA",
  leaf: "#6E8550",
  bark: "#6B5640",
  stone: "#D9CBB0",
  shade: "#2B3324",
  ink: "#2E3826",
};

const TRUNK = new CylinderGeometry(0.05, 0.08, 0.6, 6);
const CROWN = new IcosahedronGeometry(1, 1);
const CROWN_PARTS: [number, number, number, number][] = [
  [-0.16, 0.7, 0, 0.26],
  [0.14, 0.76, 0.05, 0.28],
  [0, 0.92, -0.04, 0.22],
  [0.32, 0.64, -0.06, 0.17],
  [-0.36, 0.62, 0.04, 0.15],
];

/** An olive tree, lit and solid: a leaning trunk under a broad, lumpy crown, base at the group origin. */
export function OliveTree({
  position,
  scale = 1,
  lean = 0.12,
}: {
  position: [number, number, number];
  scale?: number;
  lean?: number;
}) {
  const bark = useMemo(
    () => new MeshStandardMaterial({ color: DAY.bark, roughness: 1 }),
    [],
  );
  const leaf = useMemo(
    () =>
      new MeshStandardMaterial({
        color: DAY.leaf,
        roughness: 0.9,
        flatShading: true,
      }),
    [],
  );
  useEffect(
    () => () => {
      bark.dispose();
      leaf.dispose();
    },
    [bark, leaf],
  );
  return (
    <group position={position} scale={scale}>
      <mesh
        geometry={TRUNK}
        material={bark}
        position={[0, 0.3, 0]}
        rotation={[0, 0, lean]}
      />
      {CROWN_PARTS.map(([x, y, z, r], i) => (
        <mesh
          key={i}
          geometry={CROWN}
          material={leaf}
          position={[x, y, z]}
          scale={[r * 1.25, r * 0.8, r]}
        />
      ))}
    </group>
  );
}
