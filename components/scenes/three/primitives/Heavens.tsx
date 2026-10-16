"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  BoxGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Float32BufferAttribute,
  IcosahedronGeometry,
  MeshStandardMaterial,
  PlaneGeometry,
  Shape,
  SphereGeometry,
  type BufferGeometry,
  type Group,
  type PointLight,
  type ShaderMaterial,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Sky } from "./Earth";
import { Glow } from "./Glow";
import { Starfield } from "./Starfield";
import { Carved } from "./Salem";
import { setOpacity, setUniform } from "./mutate";

/** Hebrews 1 palette: the heavens at night above a sea of cloud, deep lapis overhead, gold where the throne's light falls. */
export const HEAVEN = {
  top: "#0B0D24",
  horizon: "#2A2440",
  glow: "#B7892C",
  haze: "#6E5862",
  cloudLow: "#3B3866",
  cloudHigh: "#EBD9B4",
  gold: "#D4A84A",
  goldDeep: "#9A7230",
  light: "#FFF1CF",
  angel: "#EFE8DA",
  wing: "#F6EEDC",
};

/** Night sky with stars, a warm band low down where the cloud sea meets it. */
export function HeavenSky({
  horizonY = -1,
  glow = 0.5,
  stars = 500,
}: {
  horizonY?: number;
  glow?: number;
  stars?: number;
}) {
  return (
    <>
      <group position={[0, 12, 0]}>
        <Sky
          top={HEAVEN.top}
          horizon={HEAVEN.horizon}
          glow={HEAVEN.glow}
          horizonY={horizonY}
          glowStrength={glow}
          z={-60}
        />
      </group>
      {stars > 0 && (
        <group position={[0, 14, -50]} scale={2.6}>
          <Starfield
            count={stars}
            spread={[40, 12]}
            depth={[-4, 0]}
            alpha={0.8}
            size={1.1}
          />
        </group>
      )}
    </>
  );
}

/** Light for gold and white forms: lapis sky light in the shade, a warm key, and a small gold environment so metal reads. */
export function HeavenLights({
  sun = [-4, 6, 5],
  intensity = 1.8,
  fill = 1,
}: {
  sun?: [number, number, number];
  intensity?: number;
  fill?: number;
}) {
  return (
    <>
      <hemisphereLight args={["#5A5C9A", "#3A2C2A", fill]} />
      <directionalLight position={sun} intensity={intensity} color="#FFE2B0" />
      <Environment resolution={64} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#F3D38A"
          position={[-3, 4, 4]}
          scale={[5, 2, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={0.8}
          color="#6E70B0"
          position={[3, 2, -4]}
          scale={[5, 3, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={0.6}
          color="#EEE4CF"
          position={[0, 6, 0]}
          rotation-x={Math.PI / 2}
          scale={[8, 8, 1]}
        />
      </Environment>
    </>
  );
}

function hash2(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function noise2(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Billowing cloud-top height at (x, z): rounded heaps from layered noise, squared so the hollows between them run deep. */
function billow(x: number, z: number) {
  let h = 0;
  let amp = 1;
  let f = 0.32;
  for (let o = 0; o < 4; o++) {
    h += noise2(x * f + o * 17, z * f * 1.4 + o * 5) * amp;
    amp *= 0.48;
    f *= 2.1;
  }
  return Math.pow(h / 1.85, 2.2);
}

/** A sea of cloud from under the camera to the horizon, its tops lit cream and its hollows lapis. */
export function CloudFloor({
  y,
  amp = 1.6,
  near = 10,
  far = -60,
  width = 140,
  warm = [0, 0],
  tone = 1,
}: {
  y: number;
  amp?: number;
  near?: number;
  far?: number;
  width?: number;
  /** Where the throne's light falls on the clouds, (x, z); tops near it turn gold. */
  warm?: [number, number];
  /** Brightness of the cloud tops, 0–1; dim them where text sits over them. */
  tone?: number;
}) {
  const [wx, wz] = warm;
  const geometry = useMemo(() => {
    const g = new PlaneGeometry(width, near - far, 180, 110);
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0, (near + far) / 2);
    const pos = g.getAttribute("position");
    const colors: number[] = [];
    const low = new Color(HEAVEN.cloudLow);
    const high = new Color(HEAVEN.cloudHigh);
    const gold = new Color(HEAVEN.gold);
    const c = new Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const b = billow(x, z);
      pos.setY(i, b * amp * (1 + Math.max(0, -z) * 0.008));
      const d = Math.hypot(x - wx, z - wz);
      c.copy(low).lerp(high, Math.min(1, b * 1.5));
      c.multiplyScalar(tone).lerp(gold, Math.exp(-d * 0.12) * 0.45 * b);
      colors.push(c.r, c.g, c.b);
    }
    g.setAttribute("color", new Float32BufferAttribute(colors, 3));
    g.computeVertexNormals();
    return g;
  }, [amp, near, far, width, wx, wz, tone]);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        vertexColors: true,
        roughness: 1,
        emissive: "#2A2448",
        emissiveIntensity: 0.6,
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
  return <mesh geometry={geometry} material={material} position={[0, y, 0]} />;
}

/** Lumpy cloud puffs merged into one heap, base flattened; puffs are [x, y, z, radius] in heap units. */
function heapGeometry(seed: number, puffs: number) {
  const parts: BufferGeometry[] = [];
  for (let i = 0; i < puffs; i++) {
    const a = i * 2.39996 + seed;
    const r = Math.sqrt((i + 0.5) / puffs);
    const size = 0.55 - r * 0.25 + hash2(i, seed) * 0.15;
    const g = new IcosahedronGeometry(size, 5);
    const pos = g.getAttribute("position");
    for (let k = 0; k < pos.count; k++) {
      const x = pos.getX(k);
      const y = pos.getY(k);
      const z = pos.getZ(k);
      const n = 1 + (noise2(x * 5 + i, y * 5 + z * 3) - 0.5) * 0.18;
      pos.setXYZ(
        k,
        x * n + Math.cos(a) * r * 1.1,
        Math.max(y * n + (1 - r) * 0.45, -0.05),
        z * n + Math.sin(a) * r * 0.6,
      );
    }
    g.computeVertexNormals();
    parts.push(g);
  }
  const merged = mergeGeometries(parts);
  parts.forEach((p) => p.dispose());
  const pos = merged.getAttribute("position").array as Float32Array;
  const colors: number[] = [];
  const low = new Color(HEAVEN.cloudLow);
  const high = new Color(HEAVEN.cloudHigh);
  const c = new Color();
  for (let i = 0; i < pos.length; i += 3) {
    c.copy(low).lerp(high, Math.min(1, Math.max(0, pos[i + 1] * 1.1 + 0.45)));
    colors.push(c.r, c.g, c.b);
  }
  merged.setAttribute("color", new Float32BufferAttribute(colors, 3));
  return merged;
}

/** A cumulus heap, lit from above and lapis underneath, base at the origin, about 2.4 wide at scale 1. */
export function Cumulus({
  position,
  scale = 1,
  seed = 1,
  puffs = 9,
  opacity,
}: {
  position: [number, number, number];
  scale?: number | [number, number, number];
  seed?: number;
  puffs?: number;
  /** 0–1, read every frame; omit for a solid cloud. */
  opacity?: RefObject<number>;
}) {
  const geometry = useMemo(() => heapGeometry(seed, puffs), [seed, puffs]);
  const fading = !!opacity;
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        vertexColors: true,
        roughness: 1,
        emissive: "#4A3E5E",
        emissiveIntensity: 0.6,
        transparent: fading,
      }),
    [fading],
  );
  const group = useRef<Group>(null);
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  useFrame(() => {
    if (!opacity) return;
    setOpacity(material, opacity.current);
    if (group.current) group.current.visible = opacity.current > 0.005;
  });
  return (
    <group ref={group} position={position} scale={scale}>
      <mesh geometry={geometry} material={material} />
    </group>
  );
}

/** Polished gold, lifted by its own warmth so it never goes dark in shade. */
export function useHeavenGold(color: string = HEAVEN.gold, roughness = 0.3) {
  const m = useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        metalness: 0.85,
        roughness,
        emissive: HEAVEN.goldDeep,
        emissiveIntensity: 0.25,
        envMapIntensity: 1.4,
      }),
    [color, roughness],
  );
  useEffect(() => () => m.dispose(), [m]);
  return m;
}

/** The throne's back: tall, with a rounded crest. */
function backGeometry() {
  const s = new Shape();
  s.moveTo(-0.55, 0);
  s.lineTo(-0.55, 1.3);
  s.quadraticCurveTo(-0.5, 1.75, 0, 1.85);
  s.quadraticCurveTo(0.5, 1.75, 0.55, 1.3);
  s.lineTo(0.55, 0);
  s.closePath();
  const g = new ExtrudeGeometry(s, {
    depth: 0.14,
    bevelEnabled: true,
    bevelSize: 0.04,
    bevelThickness: 0.04,
    bevelSegments: 2,
  });
  g.translate(0, 0, -0.07);
  return g;
}

interface ThroneProps {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
  /** Steps of the dais below the throne. */
  steps?: number;
  /** 0–1 brightness of the light on the throne, read every frame; omit for full. */
  glory?: RefObject<number>;
  /** Mobile: smaller glows. */
  mobile?: boolean;
  /** A footstool before the seat (Ps 110:1). */
  footstool?: boolean;
}

/** The throne in the heavens: a gold seat on a stepped dais, and on it no figure, only light. Base of the dais at the origin, seat at `THRONE_SEAT` above it per step count. */
export function Throne({
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  steps = 3,
  glory,
  mobile = false,
  footstool = false,
}: ThroneProps) {
  const gold = useHeavenGold();
  const pale = useHeavenGold("#E9D6A4", 0.4);
  const parts = useMemo(
    () => ({
      box: new BoxGeometry(1, 1, 1),
      back: backGeometry(),
      step: new CylinderGeometry(1, 1, 1, 40),
      knob: new SphereGeometry(0.09, 16, 12),
    }),
    [],
  );
  useEffect(
    () => () => Object.values(parts).forEach((g) => g.dispose()),
    [parts],
  );
  const light = useRef<PointLight>(null);
  const glows = useRef<ShaderMaterial[]>([]);
  useFrame(({ clock }) => {
    const k = glory?.current ?? 1;
    const breathe = 0.94 + 0.06 * Math.sin(clock.elapsedTime * 0.9);
    if (light.current) light.current.intensity = 6 * k;
    glows.current.forEach((m, i) =>
      setUniform(m, "uAlpha", [0.55, 0.3, 0.14][i] * k * breathe),
    );
  });
  const rise = steps * 0.22;
  const seatY = rise + 0.5;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {Array.from({ length: steps }, (_, i) => (
        <mesh
          key={i}
          geometry={parts.step}
          material={i % 2 ? gold : pale}
          position={[0, i * 0.22 + 0.11, 0.1]}
          scale={[1.5 - (i / steps) * 0.75, 0.22, 1.25 - (i / steps) * 0.5]}
        />
      ))}
      <group position={[0, rise, 0]}>
        <mesh
          geometry={parts.box}
          material={gold}
          position={[0, 0.25, 0]}
          scale={[1.1, 0.5, 0.8]}
        />
        <mesh
          geometry={parts.box}
          material={pale}
          position={[0, 0.53, 0.03]}
          scale={[1, 0.08, 0.72]}
        />
        {footstool && (
          <group position={[0, 0, 0.66]}>
            <mesh
              geometry={parts.box}
              material={pale}
              position={[0, 0.2, 0]}
              scale={[0.8, 0.22, 0.34]}
            />
            <mesh
              geometry={parts.box}
              material={gold}
              position={[0, 0.03, 0]}
              scale={[0.62, 0.06, 0.28]}
            />
          </group>
        )}
        <mesh
          geometry={parts.back}
          material={gold}
          position={[0, 0.5, -0.38]}
        />
        <mesh
          geometry={parts.back}
          material={pale}
          position={[0, 0.62, -0.3]}
          scale={[0.78, 0.82, 0.4]}
        />
        {[-1, 1].map((s) => (
          <group key={s}>
            <mesh
              geometry={parts.box}
              material={gold}
              position={[s * 0.58, 0.72, 0]}
              scale={[0.14, 0.12, 0.8]}
            />
            <mesh
              geometry={parts.box}
              material={gold}
              position={[s * 0.58, 0.6, 0.34]}
              scale={[0.12, 0.25, 0.12]}
            />
            <mesh
              geometry={parts.knob}
              material={pale}
              position={[s * 0.58, 0.82, 0.4]}
            />
          </group>
        ))}
      </group>
      <pointLight
        ref={light}
        position={[0, seatY + 0.8, 1.4]}
        intensity={6}
        distance={12}
        decay={1.4}
        color={HEAVEN.light}
      />
      {[
        { size: mobile ? 0.9 : 1.1, power: 1.1, inner: "#FFF8E8" },
        { size: mobile ? 2.4 : 3, power: 1.8, inner: HEAVEN.light },
        { size: mobile ? 6 : 8, power: 2.4, inner: HEAVEN.gold },
      ].map((g, i) => (
        <Glow
          key={i}
          position={[0, seatY + 0.55, 0.15]}
          size={g.size}
          color={i === 0 ? HEAVEN.light : HEAVEN.gold}
          inner={g.inner}
          alpha={0}
          power={g.power}
          renderOrder={12 + i}
          billboard
          depthTest
          onMaterial={(m) => {
            glows.current[i] = m;
          }}
        />
      ))}
    </group>
  );
}

/** Height of the throne's light above the dais base, for placing things relative to it. */
export const throneSeat = (steps = 3) => steps * 0.22 + 0.5;

/** A wing in profile: a long leading edge sweeping up to the tip, the trailing edge cut into feathers. */
function wingGeometry() {
  const s = new Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(0.2, 0.35, 0.5, 0.78, 0.95, 0.95);
  const feathers = 7;
  const tip: [number, number] = [0.95, 0.95];
  const end: [number, number] = [0.3, -0.55];
  for (let i = 0; i < feathers; i++) {
    const t0 = i / feathers;
    const t1 = (i + 1) / feathers;
    const x0 = tip[0] + (end[0] - tip[0]) * t0;
    const y0 = tip[1] + (end[1] - tip[1]) * t0;
    const x1 = tip[0] + (end[0] - tip[0]) * t1;
    const y1 = tip[1] + (end[1] - tip[1]) * t1;
    s.quadraticCurveTo((x0 + x1) / 2 + 0.09, (y0 + y1) / 2 - 0.05, x1, y1);
  }
  s.quadraticCurveTo(0.08, -0.35, 0, -0.08);
  s.closePath();
  const g = new ExtrudeGeometry(s, {
    depth: 0.02,
    bevelEnabled: true,
    bevelSize: 0.012,
    bevelThickness: 0.012,
    bevelSegments: 1,
  });
  g.translate(0, 0, -0.01);
  return g;
}

interface AngelProps {
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
  pose?: "standing" | "kneeling";
  /** Wing lift: 0 folded along the back, 1 raised high. */
  spread?: number;
  /** Lean forward at the waist, in radians: a bow. */
  bow?: number;
  robe?: string;
  /** 0–1, read every frame; omit for a solid angel. */
  opacity?: RefObject<number>;
}

/** A winged angel in white and gold: a carved robed figure with two feathered wings at the shoulders. Feet at the origin, facing +z. */
export function Angel({
  position,
  rotationY = 0,
  scale = 1,
  pose = "standing",
  spread = 0.5,
  bow = 0,
  robe = HEAVEN.angel,
  opacity,
}: AngelProps) {
  const wing = useMemo(() => wingGeometry(), []);
  const fading = !!opacity;
  const feather = useMemo(
    () =>
      new MeshStandardMaterial({
        color: HEAVEN.wing,
        roughness: 0.6,
        metalness: 0.1,
        emissive: "#B7892C",
        emissiveIntensity: 0.18,
        side: DoubleSide,
        flatShading: true,
        transparent: fading,
      }),
    [fading],
  );
  useEffect(
    () => () => {
      wing.dispose();
      feather.dispose();
    },
    [wing, feather],
  );
  useFrame(() => {
    if (opacity) setOpacity(feather, opacity.current);
  });
  const shoulder = pose === "standing" ? 1.32 : 0.82;
  const z = pose === "standing" ? -0.12 : -0.05;
  const lift = 0.35 + spread * 0.6;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <group rotation={[bow, 0, 0]}>
        <Carved
          position={[0, 0, 0]}
          robe={robe}
          pose={pose}
          opacity={opacity}
        />
        {[-1, 1].map((s) => (
          <mesh
            key={s}
            geometry={wing}
            material={feather}
            position={[s * 0.1, shoulder, z]}
            rotation={[0, Math.PI / 2 - s * 1.12, s * 0.15]}
            scale={[1.1, 0.9 * lift + 0.35, 1]}
          />
        ))}
      </group>
    </group>
  );
}
