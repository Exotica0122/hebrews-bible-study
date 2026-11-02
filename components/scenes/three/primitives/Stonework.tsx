"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  BoxGeometry,
  Color,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
  type InstancedMesh,
} from "three";

const hash = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

type Stone = readonly [number, number, number, number, number, number];

function useStones(stones: readonly Stone[], color: string) {
  const ref = useRef<InstancedMesh>(null);
  const geometry = useMemo(() => new BoxGeometry(1, 1, 1), []);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#FFFFFF",
        roughness: 1,
        flatShading: true,
      }),
    [],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  useEffect(() => {
    const m = ref.current;
    if (!m) return;
    const matrix = new Matrix4();
    const tint = new Color();
    const still = new Quaternion();
    stones.forEach(([x, y, z, w, h, d], i) => {
      matrix.compose(new Vector3(x, y, z), still, new Vector3(w, h, d));
      m.setMatrixAt(i, matrix);
      m.setColorAt(i, tint.set(color).multiplyScalar(0.72 + hash(i) * 0.5));
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [stones, color]);
  return { ref, geometry, material };
}

interface CoursesProps {
  position: [number, number, number];
  width: number;
  rows: number;
  rowHeight: number;
  depth: number;
  blockWidth: number;
  color: string;
  /** Offsets every other course; turn off for a small squared block. */
  stagger?: boolean;
}

/** Courses of cut stone with staggered joints, top centred on `position`. */
export function Courses({
  position,
  width,
  rows,
  rowHeight,
  depth,
  blockWidth,
  color,
  stagger = true,
}: CoursesProps) {
  const stones = useMemo(() => {
    const out: Stone[] = [];
    const count = Math.ceil(width / blockWidth);
    for (let r = 0; r < rows; r++) {
      const offset = stagger && r % 2 ? blockWidth / 2 : 0;
      for (let i = 0; i < count; i++) {
        const x =
          -width / 2 +
          (i + 0.5) * blockWidth +
          offset -
          (stagger ? blockWidth / 4 : 0);
        if (Math.abs(x) > width / 2) continue;
        const inset = hash(r * 13 + i) * 0.03;
        out.push([
          x,
          -(r + 0.5) * rowHeight,
          inset,
          blockWidth * 0.97,
          rowHeight * 0.95,
          depth,
        ]);
      }
    }
    return out;
  }, [width, rows, rowHeight, depth, blockWidth, stagger]);
  const { ref, geometry, material } = useStones(stones, color);
  return (
    <group position={position}>
      <instancedMesh
        ref={ref}
        args={[geometry, material, stones.length]}
        frustumCulled={false}
      />
    </group>
  );
}

interface FlagstonesProps {
  position: [number, number, number];
  width: number;
  depth: number;
  size: number;
  color: string;
}

/** A floor of uneven flagstones laid in staggered rows, top at `position`. */
export function Flagstones({
  position,
  width,
  depth,
  size,
  color,
}: FlagstonesProps) {
  const stones = useMemo(() => {
    const out: Stone[] = [];
    const rows = Math.ceil(depth / size);
    const across = Math.ceil(width / size);
    for (let r = 0; r < rows; r++) {
      let x = -width / 2 - (r % 2) * size * 0.5;
      let i = 0;
      while (x < width / 2 && i < across + 2) {
        const w = size * (0.75 + hash(r * 7 + i) * 0.6);
        out.push([
          x + w / 2,
          -0.03 - hash(r + i * 3) * 0.018,
          -depth / 2 + (r + 0.5) * size,
          w * 0.97,
          0.06,
          size * 0.96,
        ]);
        x += w;
        i++;
      }
    }
    return out;
  }, [width, depth, size]);
  const { ref, geometry, material } = useStones(stones, color);
  return (
    <group position={position}>
      <instancedMesh
        ref={ref}
        args={[geometry, material, stones.length]}
        frustumCulled={false}
      />
    </group>
  );
}
