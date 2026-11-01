"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  MeshStandardMaterial,
  type Group,
  type Mesh,
} from "three";
import { FIGURE_HEAD, useFigure } from "./Sanctuary";
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
  /** Head colour; skin by default, stone for a carved angel. */
  skin?: string;
  /** 0–1, read every frame; omit for a solid figure. */
  opacity?: RefObject<number>;
  /** 0 standing to 1 kneeling, read every frame; overrides `pose`. */
  kneel?: RefObject<number>;
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
  skin = "#C9A07C",
  opacity,
  kneel,
}: CarvedProps) {
  const f = useFigure(kneel ? "standing" : pose, !!kneel);
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
      head: make(skin),
      gold: make(SALEM.gold, 0.7, 0.35),
      linen: make(SALEM.linen),
    };
  }, [robe, skin, fading]);
  const parts = useMemo(
    () => ({
      ring: new CylinderGeometry(0.115, 0.11, 0.07, 9, 1, true),
      wrap: new CylinderGeometry(0.125, 0.115, 0.13, 10),
      arm: new CylinderGeometry(0.035, 0.03, 0.55, 6),
    }),
    [],
  );
  const group = useRef<Group>(null);
  const body = useRef<Mesh>(null);
  const top = useRef<Group>(null);
  const hands = useRef<Group>(null);
  useEffect(
    () => () => {
      Object.values(mats).forEach((m) => m.dispose());
      Object.values(parts).forEach((g) => g.dispose());
    },
    [mats, parts],
  );
  useFrame(() => {
    if (kneel && body.current && top.current) {
      const k = kneel.current;
      if (!body.current.morphTargetInfluences)
        body.current.updateMorphTargets();
      body.current.morphTargetInfluences![0] = k;
      const [sy, sz] = FIGURE_HEAD.standing;
      const [ky, kz] = FIGURE_HEAD.kneeling;
      top.current.position.set(0, (ky - sy) * k, (kz - sz) * k);
      if (hands.current) {
        hands.current.position.y = 1.5 + (ky - sy) * k;
        hands.current.scale.setScalar(Math.max(1 - k, 0.001));
      }
    }
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
      <mesh ref={body} geometry={f.body} material={mats.robe} />
      <group ref={top}>
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
      </group>
      <group ref={hands} position={[0, 1.5, 0]}>
        {arms &&
          [-1, 1].map((s) => (
            <mesh
              key={s}
              geometry={parts.arm}
              material={mats.robe}
              position={[s * 0.3, 0, 0.05]}
              rotation={[0, 0, -s * 0.45]}
            />
          ))}
      </group>
    </group>
  );
}
