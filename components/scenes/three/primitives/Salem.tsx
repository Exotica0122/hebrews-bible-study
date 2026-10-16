"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  IcosahedronGeometry,
  LatheGeometry,
  MeshStandardMaterial,
  SphereGeometry,
  Vector2,
  type Group,
} from "three";
import { Hills, Sky, type HillLayer } from "./Earth";
import { useFigure } from "./Sanctuary";
import { setOpacity } from "./mutate";

/** Hebrews 7 palette: Salem at first light, cut in limestone. Pale lapis overhead, a peach dawn low down, honey stone with violet shade, and gold and wine for the priest-king. */
export const SALEM = {
  sky: "#8B9EC2",
  dawn: "#F3DCC4",
  blush: "#F2B08A",
  stone: "#E4D4B6",
  block: "#D5C09C",
  deep: "#B39A78",
  ground: "#CDB592",
  road: "#B89B74",
  shade: "#7A6C84",
  gold: "#C99A3E",
  wine: "#6E1A28",
  bread: "#C08646",
  clay: "#9A6744",
  baked: "#D6A878",
  linen: "#F2EADA",
  mantle: "#B49B7C",
  haze: "#EEDFCD",
};

export const SALEM_HILLS: HillLayer[] = [
  { y: -0.6, z: -40, amp: 1.2, freq: 0.09, seed: 1.3, color: "#C9C3CF" },
  { y: -1, z: -30, amp: 0.9, freq: 0.13, seed: 4.1, color: "#C8B7AA" },
];

/** Dawn sky: pale lapis overhead fading to peach where the sun is about to clear the hills. */
export function SalemSky({
  horizonY = -0.5,
  blush = 0.35,
}: {
  horizonY?: number;
  blush?: number;
}) {
  return (
    <Sky
      top={SALEM.sky}
      horizon={SALEM.dawn}
      glow={SALEM.blush}
      horizonY={horizonY}
      glowStrength={blush}
      z={-45}
    />
  );
}

export function SalemHills({ layers = SALEM_HILLS }: { layers?: HillLayer[] }) {
  return <Hills layers={layers} span={140} />;
}

/** Low sun raking in from the east so every carved edge throws a shadow side, with cool sky light in the shade. */
export function SalemLights({
  sun = [-8, 5, 6],
  intensity = 2.6,
}: {
  sun?: [number, number, number];
  intensity?: number;
}) {
  return (
    <>
      <hemisphereLight args={["#C3CEE6", "#B08C78", 1.4]} />
      <directionalLight position={sun} intensity={intensity} color="#FFD6A0" />
    </>
  );
}

/** Matte, flat-shaded stone so faces read as cut planes. */
export function useStone(
  color: string,
  opts: { roughness?: number; metalness?: number } = {},
) {
  const { roughness = 0.95, metalness = 0 } = opts;
  const m = useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        roughness,
        metalness,
        flatShading: true,
      }),
    [color, roughness, metalness],
  );
  useEffect(() => () => m.dispose(), [m]);
  return m;
}

function useBox() {
  const g = useMemo(() => new BoxGeometry(1, 1, 1), []);
  useEffect(() => () => g.dispose(), [g]);
  return g;
}

/** Flat ground running out to the hills, lifted by its own warm bounce so the low sun never leaves it a dark slab. */
export function Ground({
  y = 0,
  color = SALEM.ground,
  size = 120,
}: {
  y?: number;
  color?: string;
  size?: number;
}) {
  const m = useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        roughness: 1,
        emissive: color,
        emissiveIntensity: 0.35,
      }),
    [color],
  );
  useEffect(() => () => m.dispose(), [m]);
  return (
    <mesh position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m}>
      <planeGeometry args={[size, size]} />
    </mesh>
  );
}

/** A terraced hill, stacked like cut courses: each level is [radius, height]. Base at the origin. */
export function Terraces({
  position,
  levels,
  color = SALEM.block,
  segments = 11,
}: {
  position: [number, number, number];
  levels: [number, number][];
  color?: string;
  segments?: number;
}) {
  const m = useStone(color);
  const parts = useMemo(
    () =>
      levels.map(([r, h], i) => ({
        g: new CylinderGeometry(r * 0.94, r, h, segments, 1),
        y: levels.slice(0, i).reduce((y, [, lh]) => y + lh, 0) + h / 2,
        rot: i * 0.37,
      })),
    [levels, segments],
  );
  useEffect(() => () => parts.forEach((p) => p.g.dispose()), [parts]);
  return (
    <group position={position}>
      {parts.map((p, i) => (
        <mesh
          key={i}
          geometry={p.g}
          material={m}
          position={[0, p.y, 0]}
          rotation={[0, p.rot, 0]}
        />
      ))}
    </group>
  );
}

const HOUSES: [number, number, number, number][] = Array.from(
  { length: 16 },
  (_, i) => {
    const a = i * 2.39996;
    const r = 0.35 + Math.sqrt((i + 0.5) / 16) * 0.55;
    return [
      Math.cos(a) * r,
      Math.sin(a) * r,
      0.22 + ((i * 7) % 5) * 0.05,
      0.22 + ((i * 3) % 4) * 0.08,
    ];
  },
);

/** A walled hill town: a ring of wall and towers with the gate toward +z, flat-roofed houses inside. Base at the origin, `radius` to the wall. */
export function City({
  position,
  radius = 2,
  sides = 10,
}: {
  position: [number, number, number];
  radius?: number;
  sides?: number;
}) {
  const box = useBox();
  const wall = useStone(SALEM.stone);
  const house = useStone("#E9DCC2");
  const dark = useStone("#4A3E46");
  const segs = useMemo(
    () =>
      Array.from({ length: sides }, (_, i) => {
        const a0 = (i / sides) * Math.PI * 2 + Math.PI / 2 - Math.PI / sides;
        const a1 = a0 + (Math.PI * 2) / sides;
        const mid = (a0 + a1) / 2;
        return {
          x: Math.cos(mid) * radius,
          z: Math.sin(mid) * radius,
          len: 2 * radius * Math.sin(Math.PI / sides),
          rot: -mid + Math.PI / 2,
          tx: Math.cos(a0) * radius,
          tz: Math.sin(a0) * radius,
          gate: i === 0,
        };
      }),
    [radius, sides],
  );
  return (
    <group position={position}>
      {segs.map((s, i) => (
        <group key={i}>
          {s.gate ? (
            <>
              <mesh
                geometry={box}
                material={wall}
                position={[s.x, 0.62, s.z]}
                rotation={[0, s.rot, 0]}
                scale={[s.len, 0.28, 0.22]}
              />
              <mesh
                geometry={box}
                material={dark}
                position={[s.x, 0.24, s.z + 0.02]}
                rotation={[0, s.rot, 0]}
                scale={[s.len * 0.42, 0.48, 0.2]}
              />
              <mesh
                geometry={box}
                material={wall}
                position={[s.x - s.len * 0.36, 0.24, s.z]}
                rotation={[0, s.rot, 0]}
                scale={[s.len * 0.28, 0.48, 0.22]}
              />
              <mesh
                geometry={box}
                material={wall}
                position={[s.x + s.len * 0.36, 0.24, s.z]}
                rotation={[0, s.rot, 0]}
                scale={[s.len * 0.28, 0.48, 0.22]}
              />
            </>
          ) : (
            <mesh
              geometry={box}
              material={wall}
              position={[s.x, 0.38, s.z]}
              rotation={[0, s.rot, 0]}
              scale={[s.len, 0.76, 0.2]}
            />
          )}
          <mesh
            geometry={box}
            material={wall}
            position={[s.tx, 0.5, s.tz]}
            rotation={[0, s.rot, 0]}
            scale={[0.36, s.gate || i === 1 ? 1.15 : 1, 0.36]}
          />
        </group>
      ))}
      {HOUSES.map(([x, z, w, h], i) => (
        <mesh
          key={i}
          geometry={box}
          material={house}
          position={[
            x * radius,
            h / 2 + 0.1 + (1 - Math.hypot(x, z)) * 0.3,
            z * radius * 0.9,
          ]}
          rotation={[0, (i % 3) * 0.2, 0]}
          scale={[w * radius * 0.6, h * radius * 0.6 + 0.2, w * radius * 0.5]}
        />
      ))}
      <mesh
        geometry={box}
        material={house}
        position={[0, 0.7, -0.1]}
        scale={[radius * 0.4, 0.9, radius * 0.32]}
      />
    </group>
  );
}

interface CarvedProps {
  position: [number, number, number];
  robe?: string;
  pose?: "standing" | "kneeling";
  rotationY?: number;
  scale?: number;
  crown?: boolean;
  turban?: boolean;
  /** Both hands raised, as in prayer or blessing. */
  arms?: boolean;
  /** 0–1, read every frame; omit for a solid figure. */
  opacity?: RefObject<number>;
}

/** A robed figure in carved stone, about 1.75 tall standing, feet at the origin; a gold circlet for the priest-king, a linen turban for a priest. */
export function Carved({
  position,
  robe = SALEM.linen,
  pose = "standing",
  rotationY = 0,
  scale = 1,
  crown = false,
  turban = false,
  arms = false,
  opacity,
}: CarvedProps) {
  const f = useFigure(pose);
  const fading = !!opacity;
  const mats = useMemo(() => {
    const make = (color: string, metalness = 0, roughness = 0.9) =>
      new MeshStandardMaterial({
        color,
        roughness,
        metalness,
        flatShading: true,
        transparent: fading,
        opacity: fading ? 0 : 1,
      });
    return {
      robe: make(robe),
      head: make("#C9A07C"),
      gold: make(SALEM.gold, 0.7, 0.35),
      linen: make(SALEM.linen),
    };
  }, [robe, fading]);
  const parts = useMemo(
    () => ({
      ring: new CylinderGeometry(0.115, 0.11, 0.07, 9, 1, true),
      wrap: new CylinderGeometry(0.125, 0.115, 0.13, 10),
      arm: new CylinderGeometry(0.035, 0.03, 0.55, 6),
    }),
    [],
  );
  const group = useRef<Group>(null);
  useEffect(
    () => () => {
      Object.values(mats).forEach((m) => m.dispose());
      Object.values(parts).forEach((g) => g.dispose());
    },
    [mats, parts],
  );
  useFrame(() => {
    if (!opacity) return;
    const o = opacity.current;
    Object.values(mats).forEach((m) => setOpacity(m, o));
    if (group.current) group.current.visible = o > 0.005;
  });
  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      rotation={[0, rotationY, 0]}
    >
      <mesh geometry={f.body} material={mats.robe} />
      <mesh
        geometry={f.head}
        material={mats.head}
        position={[0, f.headY, f.headZ]}
      />
      {crown && (
        <mesh
          geometry={parts.ring}
          material={mats.gold}
          position={[0, f.headY + 0.08, f.headZ]}
          material-side={DoubleSide}
        />
      )}
      {turban && (
        <mesh
          geometry={parts.wrap}
          material={mats.linen}
          position={[0, f.headY + 0.08, f.headZ]}
        />
      )}
      {arms &&
        [-1, 1].map((s) => (
          <mesh
            key={s}
            geometry={parts.arm}
            material={mats.robe}
            position={[s * 0.3, 1.5, 0.05]}
            rotation={[0, 0, -s * 0.45]}
          />
        ))}
    </group>
  );
}

/** A round loaf. */
export function Loaf({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const m = useStone(SALEM.bread, { roughness: 0.8 });
  const g = useMemo(() => new SphereGeometry(0.1, 10, 6), []);
  useEffect(() => () => g.dispose(), [g]);
  return (
    <mesh
      geometry={g}
      material={m}
      position={position}
      scale={[scale, scale * 0.5, scale * 0.85]}
    />
  );
}

const CUP: [number, number][] = [
  [0, 0],
  [0.06, 0],
  [0.06, 0.012],
  [0.015, 0.03],
  [0.015, 0.08],
  [0.07, 0.11],
  [0.085, 0.2],
  [0.078, 0.2],
  [0.064, 0.12],
  [0, 0.11],
];
/** A gold cup filled with wine. Base at the origin, about 0.2 tall. */
export function Cup({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const gold = useStone(SALEM.gold, { roughness: 0.3, metalness: 0.75 });
  const wine = useStone(SALEM.wine, { roughness: 0.25 });
  const parts = useMemo(
    () => ({
      cup: new LatheGeometry(
        CUP.map(([r, y]) => new Vector2(r, y)),
        14,
      ),
      wine: new CylinderGeometry(0.076, 0.076, 0.004, 14),
    }),
    [],
  );
  useEffect(
    () => () => Object.values(parts).forEach((g) => g.dispose()),
    [parts],
  );
  return (
    <group position={position} scale={scale}>
      <mesh geometry={parts.cup} material={gold} material-side={DoubleSide} />
      <mesh geometry={parts.wine} material={wine} position={[0, 0.185, 0]} />
    </group>
  );
}

/** A tied bundle of spoils. Base at the origin. */
export function Bundle({
  position,
  color = "#A07F58",
  scale = 1,
  rotationY = 0,
}: {
  position: [number, number, number];
  color?: string;
  scale?: number;
  rotationY?: number;
}) {
  const m = useStone(color);
  const g = useMemo(() => new IcosahedronGeometry(0.2, 0), []);
  useEffect(() => () => g.dispose(), [g]);
  return (
    <mesh
      geometry={g}
      material={m}
      position={[position[0], position[1] + 0.15 * scale, position[2]]}
      rotation={[0, rotationY, 0]}
      scale={[1.3 * scale, 0.8 * scale, scale]}
    />
  );
}

/** An altar of stone with a horn at each corner. Base at the origin, top at 0.8. */
export function StoneAltar({
  position,
}: {
  position: [number, number, number];
}) {
  const box = useBox();
  const m = useStone(SALEM.deep);
  return (
    <group position={position}>
      <mesh
        geometry={box}
        material={m}
        position={[0, 0.36, 0]}
        scale={[0.95, 0.72, 0.95]}
      />
      <mesh
        geometry={box}
        material={m}
        position={[0, 0.76, 0]}
        scale={[1.05, 0.08, 1.05]}
      />
      {[
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ].map(([x, z], i) => (
        <mesh
          key={i}
          geometry={box}
          material={m}
          position={[x * 0.44, 0.86, z * 0.44]}
          scale={0.13}
        />
      ))}
    </group>
  );
}

/** Judah’s sceptre standing on a cut stone (Gen 49:10). Base at the origin. */
export function Sceptre({ position }: { position: [number, number, number] }) {
  const box = useBox();
  const stone = useStone(SALEM.stone);
  const gold = useStone(SALEM.gold, { roughness: 0.3, metalness: 0.75 });
  const parts = useMemo(
    () => ({
      rod: new CylinderGeometry(0.03, 0.035, 1.1, 8),
      knob: new SphereGeometry(0.08, 10, 8),
    }),
    [],
  );
  useEffect(
    () => () => Object.values(parts).forEach((g) => g.dispose()),
    [parts],
  );
  return (
    <group position={position}>
      <mesh
        geometry={box}
        material={stone}
        position={[0, 0.3, 0]}
        scale={[0.6, 0.6, 0.6]}
      />
      <mesh geometry={parts.rod} material={gold} position={[0, 1.15, 0]} />
      <mesh geometry={parts.knob} material={gold} position={[0, 1.74, 0]} />
    </group>
  );
}
