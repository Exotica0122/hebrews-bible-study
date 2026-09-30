"use client";

import { useRef } from "react";
import { Hills, Sky, type HillLayer } from "./Earth";
import { Flames } from "./Flames";
import { Glow } from "./Glow";
import { Starfield } from "./Starfield";

/** Hebrews 3 palette: the wilderness at dusk, indigo overhead, a last terracotta band on the horizon, ochre sand. */
export const DUSK = {
  top: "#1E2254",
  horizon: "#4A3552",
  glow: "#A65A34",
  sand: "#C8A57A",
  fire: "#F09A3E",
  linen: "#E8DFCB",
  skins: "#6E2A22",
};

export const DUNES: HillLayer[] = [
  { y: -1.7, z: -16, amp: 0.5, freq: 0.22, seed: 0.7, color: "#4A3430" },
  { y: -1.85, z: -9, amp: 0.35, freq: 0.34, seed: 3.3, color: "#35262A" },
  { y: -1.55, z: -3, amp: 0.12, freq: 0.5, seed: 6.1, color: "#231A1C" },
];

const STAR_SPREAD: [number, number] = [34, 14];
const STAR_DEPTH: [number, number] = [-21, -17];

interface DuskSkyProps {
  horizonY?: number;
  glowStrength?: number;
  stars?: number;
}

/** Dusk sky with the first stars, set behind the dunes so the ridges hide the low ones. */
export function DuskSky({ horizonY = -1.8, glowStrength = 0.7, stars = 160 }: DuskSkyProps) {
  return (
    <>
      <Sky top={DUSK.top} horizon={DUSK.horizon} glow={DUSK.glow} horizonY={horizonY} glowStrength={glowStrength} />
      {stars > 0 && (
        <group position={[0, 4, 0]}>
          <Starfield count={stars} spread={STAR_SPREAD} depth={STAR_DEPTH} alpha={0.7} size={1} />
        </group>
      )}
    </>
  );
}

/** Flat unlit sand from the viewer out to `far`, so lighting never turns the ground to a black slab. */
export function Sand({ y, far = -12, near = 8, color = "#2B2022" }: { y: number; far?: number; near?: number; color?: string }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, (far + near) / 2]} renderOrder={-8}>
      <planeGeometry args={[60, near - far]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export function Dunes({ layers = DUNES }: { layers?: HillLayer[] }) {
  return <Hills layers={layers} />;
}

interface PillarProps {
  position: [number, number, number];
  height: number;
  mobile: boolean;
}

/** “By night in a pillar of fire to give them light” (Exod 13:21): a tall column of rising flame over a wide glow. */
export function PillarOfFire({ position, height, mobile }: PillarProps) {
  const gust = useRef(0);
  const [x, y, z] = position;
  return (
    <group>
      <Glow position={[x, y + height * 0.5, z - 0.1]} size={1} scaleX={height * 0.9} scaleY={height * 1.5} color="#8A4B2E" alpha={0.28} power={2.2} renderOrder={2} />
      <Glow position={[x, y + height * 0.45, z]} size={1} scaleX={height * 0.16} scaleY={height * 1.05} color={DUSK.fire} inner="#FFE3B0" alpha={0.75} power={1.5} renderOrder={3} />
      <Flames emitters={[[x, y, z]]} count={mobile ? 70 : 140} rise={height} size={mobile ? 7 : 9} gust={gust} />
    </group>
  );
}
