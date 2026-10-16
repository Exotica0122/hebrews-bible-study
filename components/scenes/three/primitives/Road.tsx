"use client";

import { useEffect, useMemo } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  MeshStandardMaterial,
  PlaneGeometry,
  Vector3,
} from "three";
import { Sky } from "./Earth";
import { Glow } from "./Glow";
import { Starfield } from "./Starfield";
import { Carved } from "./Salem";

/** Hebrews 2 palette: a moonlit night on the road home. Deep blue overhead, a warm glow where the town is, grey-olive hills under the moon, and gold lamplight. */
export const NIGHT = {
  top: "#0A1024",
  horizon: "#2A2A3C",
  glow: "#7A5228",
  moon: "#E4E9F4",
  moonLight: "#B4C3E2",
  hill: "#5A6150",
  far: "#3E4658",
  road: "#9A8566",
  lamp: "#F3C77A",
  core: "#FFF4D6",
  haze: "#1A2034",
  stone: "#8C877E",
  wood: "#5A4232",
};

/** Night sky with a moon high on the left and a warm glow low down where the town's lamps are. */
export function NightSky({
  horizonY = -1,
  glow = 0.5,
  stars = 200,
  moon = [-14, 11, -45],
  moonSize = 2.2,
}: {
  horizonY?: number;
  glow?: number;
  stars?: number;
  moon?: [number, number, number] | null;
  moonSize?: number;
}) {
  return (
    <>
      <Sky
        top={NIGHT.top}
        horizon={NIGHT.horizon}
        glow={NIGHT.glow}
        horizonY={horizonY}
        glowStrength={glow}
        z={-50}
      />
      {stars > 0 && (
        <group position={[0, 12, -40]} scale={2.2}>
          <Starfield
            count={stars}
            spread={[34, 10]}
            depth={[-6, -2]}
            alpha={0.8}
            size={1}
          />
        </group>
      )}
      {moon && (
        <group position={moon}>
          <Glow
            size={moonSize * 9}
            color="#3A4A70"
            alpha={0.45}
            power={2.4}
            renderOrder={-9}
          />
          <Glow
            size={moonSize}
            color="#C9D3E8"
            inner={NIGHT.moon}
            alpha={1}
            power={0.35}
            renderOrder={-8}
          />
        </group>
      )}
    </>
  );
}

/** Cool moonlight from high on the left, with blue sky light in the shade. */
export function MoonLights({
  moon = [-8, 7, 2],
  intensity = 1.6,
  fill = 0.9,
}: {
  moon?: [number, number, number];
  intensity?: number;
  fill?: number;
}) {
  return (
    <>
      <hemisphereLight args={["#5C6E9A", "#2A2420", fill]} />
      <directionalLight
        position={moon}
        intensity={intensity}
        color={NIGHT.moonLight}
      />
    </>
  );
}

/** A hill rising out of the rolling ground: [x, z, radius, height]. Its top is levelled for a town to stand on. */
export type Rise = [number, number, number, number];

export interface Terrain {
  rises?: Rise[];
  /** Scales the rolling ground; the far ground rolls higher than the near. */
  amp?: number;
}

/** Height of the ground at (x, z). */
export function terrainHeight(
  x: number,
  z: number,
  { rises = [], amp = 1 }: Terrain,
) {
  const roll =
    0.35 * Math.sin(x * 0.18 + z * 0.11) +
    0.25 * Math.sin(x * 0.31 - z * 0.23 + 1.7) +
    0.1 * Math.sin(x * 0.7 + z * 0.5 + 0.4);
  let h = (roll + 0.4) * amp * (0.35 + Math.max(0, -z) * 0.05);
  for (const [rx, rz, r, height] of rises) {
    const d = Math.hypot(x - rx, z - rz) / r;
    h += height * Math.min(1, 1.5 * Math.exp(-d * d));
  }
  return h;
}

/** Smooth rolling hills under the moon, from under the camera to the horizon. */
export function HillField({
  y,
  terrain,
  color = NIGHT.hill,
  near = 10,
  far = -60,
  width = 140,
  segments = [160, 110],
}: {
  y: number;
  terrain: Terrain;
  color?: string;
  near?: number;
  far?: number;
  width?: number;
  segments?: [number, number];
}) {
  const geometry = useMemo(() => {
    const g = new PlaneGeometry(width, near - far, segments[0], segments[1]);
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0, (near + far) / 2);
    const pos = g.getAttribute("position");
    for (let i = 0; i < pos.count; i++)
      pos.setY(i, terrainHeight(pos.getX(i), pos.getZ(i), terrain));
    g.computeVertexNormals();
    return g;
  }, [terrain, near, far, width, segments]);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        roughness: 1,
        emissive: color,
        emissiveIntensity: 0.06,
      }),
    [color],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  return <mesh geometry={geometry} material={material} position={[0, y, 0]} />;
}

/** The road as a curve over the ground, through (x, z) points. */
export function roadCurve(points: [number, number][]) {
  return new CatmullRomCurve3(
    points.map(([x, z]) => new Vector3(x, 0, z)),
    false,
    "catmullrom",
    0.5,
  );
}

/** A pale dirt road laid over the ground along `curve`, `width` wide. */
export function RoadStrip({
  y,
  curve,
  terrain,
  width = 0.5,
  color = NIGHT.road,
}: {
  y: number;
  curve: CatmullRomCurve3;
  terrain: Terrain;
  width?: number;
  color?: string;
}) {
  const geometry = useMemo(() => {
    const n = 200;
    const pos = new Float32Array((n + 1) * 2 * 3);
    const index: number[] = [];
    const p = new Vector3();
    const tan = new Vector3();
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      curve.getPointAt(u, p);
      curve.getTangentAt(u, tan);
      const w = width * (0.6 + 0.4 * (1 - u));
      const nx = -tan.z * w * 0.5;
      const nz = tan.x * w * 0.5;
      for (const [k, s] of [
        [0, 1],
        [1, -1],
      ]) {
        const x = p.x + nx * s;
        const z = p.z + nz * s;
        pos.set([x, terrainHeight(x, z, terrain) + 0.03, z], (i * 2 + k) * 3);
      }
      if (i < n) {
        const a = i * 2;
        index.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setIndex(index);
    g.computeVertexNormals();
    return g;
  }, [curve, terrain, width]);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        roughness: 1,
        emissive: color,
        emissiveIntensity: 0.12,
        polygonOffset: true,
        polygonOffsetFactor: -2,
      }),
    [color],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  return <mesh geometry={geometry} material={material} position={[0, y, 0]} />;
}

/** A traveller with a staff and a lamp held out in front, feet at the origin, facing +z. */
export function Traveller({
  robe,
  light = 0,
}: {
  robe: string;
  /** Point-light intensity for the lamp; 0 for glow only. */
  light?: number;
}) {
  return (
    <group>
      <Carved position={[0, 0, 0]} robe={robe} />
      <mesh position={[0.3, 0.95, 0.05]} rotation={[0.08, 0, -0.05]}>
        <cylinderGeometry args={[0.02, 0.022, 1.9, 5]} />
        <meshStandardMaterial color={NIGHT.wood} roughness={0.9} />
      </mesh>
      <Lamp position={[-0.24, 0.95, 0.3]} size={2.2} light={light} />
    </group>
  );
}

/** A small clay lamp's flame in its warm halo. */
export function Lamp({
  position,
  size = 1,
  light = 0,
  distance = 3,
}: {
  position: [number, number, number];
  size?: number;
  light?: number;
  distance?: number;
}) {
  return (
    <group position={position}>
      <Glow
        size={1.1 * size}
        color="#B8652A"
        inner={NIGHT.lamp}
        alpha={0.45}
        power={2.2}
        renderOrder={11}
        billboard
      />
      <Glow
        size={0.16 * size}
        scaleY={1.5}
        color={NIGHT.lamp}
        inner={NIGHT.core}
        alpha={1}
        power={0.9}
        renderOrder={12}
        billboard
      />
      {light > 0 && (
        <pointLight
          color="#FFC27A"
          intensity={light}
          distance={distance}
          decay={1.6}
        />
      )}
    </group>
  );
}
