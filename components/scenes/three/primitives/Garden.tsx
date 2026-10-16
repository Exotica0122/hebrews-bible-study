"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  CanvasTexture,
  Color,
  CylinderGeometry,
  IcosahedronGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  type Group,
  type Mesh,
  type ShaderMaterial,
} from "three";
import { Hills, Sky, type HillLayer } from "./Earth";
import { Glow } from "./Glow";

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

export const GARDEN_HILLS: HillLayer[] = [
  { y: -0.9, z: -17, amp: 0.55, freq: 0.2, seed: 2.1, color: "#A9B7B4" },
  { y: -1.3, z: -11, amp: 0.38, freq: 0.31, seed: 5.2, color: "#8FA27E" },
  { y: -1.6, z: -5, amp: 0.16, freq: 0.46, seed: 0.9, color: "#6E8559" },
];

/** Clear daylight sky, with a low warm haze instead of a sunset band. */
export function DaySky({ horizonY = -1.2, haze = 0.08 }: { horizonY?: number; haze?: number }) {
  return <Sky top={DAY.top} horizon={DAY.horizon} glow={DAY.haze} horizonY={horizonY} glowStrength={haze} />;
}

export function GardenHills({ layers = GARDEN_HILLS }: { layers?: HillLayer[] }) {
  return <Hills layers={layers} />;
}

/** Sky light from above, warm bounce from the grass, and the sun as a key light. */
export function DayLights({ sun = [-4, 6, 3] }: { sun?: [number, number, number] }) {
  return (
    <>
      <hemisphereLight args={["#DCE8F2", "#6E7A4E", 1.3]} />
      <directionalLight position={sun} intensity={2.2} color="#FFF1D6" />
    </>
  );
}

let softTexture: CanvasTexture | null = null;
/** One shared radial falloff, white in the middle and clear at the rim, tinted per material. */
function softMap() {
  if (softTexture) return softTexture;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, "rgba(255,255,255,1)");
  r.addColorStop(0.45, "rgba(255,255,255,0.6)");
  r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  softTexture = new CanvasTexture(c);
  return softTexture;
}

const SOFT_PLANE = new PlaneGeometry(1, 1);

interface SoftProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size: number;
  scaleX?: number;
  scaleY?: number;
  color: string;
  opacity?: number;
  renderOrder?: number;
  onMaterial?: (m: MeshBasicMaterial) => void;
  onMesh?: (m: Mesh | null) => void;
}

/** A soft-edged patch with normal blending, for what glows can't do in daylight: white cloud, grey mist, cast shadow. */
export function Soft({ position = [0, 0, 0], rotation = [0, 0, 0], size, scaleX = 1, scaleY = 1, color, opacity = 1, renderOrder = 1, onMaterial, onMesh }: SoftProps) {
  const material = useMemo(() => new MeshBasicMaterial({ map: softMap(), color: new Color(color), transparent: true, opacity, depthWrite: false }), [color, opacity]);
  const mesh = useRef<Mesh>(null);
  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => {
    onMaterial?.(material);
  }, [material, onMaterial]);
  useEffect(() => {
    onMesh?.(mesh.current);
  }, [onMesh]);
  return <mesh ref={mesh} position={position} rotation={rotation} scale={[size * scaleX, size * scaleY, 1]} geometry={SOFT_PLANE} material={material} renderOrder={renderOrder} frustumCulled={false} />;
}

/** A shadow pooled on the ground under something, `y` at ground height. */
export function GroundShadow({ x, y, z, w, d = w * 0.5, opacity = 0.45 }: { x: number; y: number; z: number; w: number; d?: number; opacity?: number }) {
  return <Soft position={[x, y + 0.005, z]} rotation={[-Math.PI / 2, 0, 0]} size={1} scaleX={w} scaleY={d} color={DAY.shade} opacity={opacity} renderOrder={2} />;
}

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
export function OliveTree({ position, scale = 1, lean = 0.12 }: { position: [number, number, number]; scale?: number; lean?: number }) {
  const bark = useMemo(() => new MeshStandardMaterial({ color: DAY.bark, roughness: 1 }), []);
  const leaf = useMemo(() => new MeshStandardMaterial({ color: DAY.leaf, roughness: 0.9, flatShading: true }), []);
  useEffect(
    () => () => {
      bark.dispose();
      leaf.dispose();
    },
    [bark, leaf],
  );
  return (
    <group position={position} scale={scale}>
      <mesh geometry={TRUNK} material={bark} position={[0, 0.3, 0]} rotation={[0, 0, lean]} />
      {CROWN_PARTS.map(([x, y, z, r], i) => (
        <mesh key={i} geometry={CROWN} material={leaf} position={[x, y, z]} scale={[r * 1.25, r * 0.8, r]} />
      ))}
    </group>
  );
}

/** Still water lying across the view at depth `z`, holding the pale sky. */
export function StillWater({ y, z, width = 40, alpha = 0.55 }: { y: number; z: number; width?: number; alpha?: number }) {
  return <Glow position={[0, y, z]} size={1} scaleX={width} scaleY={0.32} color="#7FA0AA" inner={DAY.water} alpha={alpha} power={1.1} renderOrder={-5} />;
}

interface SunProps {
  position: [number, number, number];
  size: number;
  onMaterials?: (core: ShaderMaterial, halo: ShaderMaterial) => void;
}

/** A high daylight sun: a white core in a warm halo, hidden by nearer hills. */
export function Sun({ position, size, onMaterials }: SunProps) {
  const core = useRef<ShaderMaterial | null>(null);
  const halo = useRef<ShaderMaterial | null>(null);
  const report = () => {
    if (core.current && halo.current) onMaterials?.(core.current, halo.current);
  };
  return (
    <group position={position}>
      <Glow size={size * 6} color="#E9B982" inner="#FFF1D6" alpha={0.45} power={2.2} renderOrder={-4} billboard depthTest onMaterial={(m) => { halo.current = m; report(); }} />
      <Glow size={size} color={DAY.gold} inner={DAY.sun} alpha={1} power={0.7} renderOrder={-3} billboard depthTest onMaterial={(m) => { core.current = m; report(); }} />
    </group>
  );
}

const DRIFT = 0.04;
/** A cloud as overlapping puffs, in units of its width: x, y, size. */
const PUFFS: [number, number, number][] = [[-0.3, -0.02, 0.42], [-0.08, 0.06, 0.5], [0.18, 0.02, 0.46], [0.36, -0.04, 0.32], [0, -0.08, 0.6]];

/** Slow white clouds drifting across the upper sky; each is [x, y, width]. */
export function Clouds({ clouds, z = -16, opacity = 0.75, onMaterial }: { clouds: [number, number, number][]; z?: number; opacity?: number; onMaterial?: (m: MeshBasicMaterial) => void }) {
  const group = useRef<Group[]>([]);
  useFrame((_, dt) => {
    group.current.forEach((m, i) => {
      m.position.x += Math.min(dt, 0.05) * DRIFT * (1 + i * 0.3);
      if (m.position.x > 24) m.position.x = -24;
    });
  });
  return (
    <>
      {clouds.map(([x, y, w], i) => (
        <group key={i} position={[x, y, z]} ref={(g) => { if (g) group.current[i] = g; }}>
          {PUFFS.map(([px, py, s], j) => (
            <Soft key={j} position={[px * w, py * w, 0]} size={s * w} scaleY={0.7} color="#FFFFFF" opacity={opacity} renderOrder={-8} onMaterial={onMaterial} />
          ))}
        </group>
      ))}
    </>
  );
}
