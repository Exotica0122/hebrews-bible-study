"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  LatheGeometry,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  type PointLight,
  type Points,
} from "three";
import { Glow } from "./Glow";
import { setUniform } from "./mutate";

/** Hebrews 5 palette: the Holy Place by lamplight, in the colours of the priestly garments (Exod 28): blue, purple, scarlet, fine linen and gold. */
export const HOLY = {
  blue: "#2E4C7E",
  purple: "#5E3B6E",
  scarlet: "#A3302C",
  linen: "#E6DCC6",
  gold: "#C9A24A",
  flame: "#F3B45A",
  core: "#FFF4D6",
  floor: "#3A2C22",
  smoke: "#D6CAB4",
  dark: "#120D0A",
};

export const FLOOR = -1.6;

/** Thread bands across the weave, as [colour, width in px of a 256px tile]. */
const CURTAIN_BANDS: [string, number][] = [
  [HOLY.linen, 70],
  [HOLY.blue, 26],
  [HOLY.linen, 8],
  [HOLY.purple, 22],
  [HOLY.linen, 8],
  [HOLY.scarlet, 22],
  [HOLY.linen, 100],
];
const VEIL_BANDS: [string, number][] = [
  [HOLY.blue, 64],
  [HOLY.purple, 52],
  [HOLY.scarlet, 26],
  [HOLY.purple, 52],
  [HOLY.blue, 62],
];

const textures = new Map<string, CanvasTexture>();
/** A woven cloth tile: vertical thread bands, a gold thread at each seam, and a fine over-under weave. */
function wovenTexture(kind: "curtain" | "veil") {
  const hit = textures.get(kind);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  let x = 0;
  for (const [col, w] of kind === "veil" ? VEIL_BANDS : CURTAIN_BANDS) {
    g.fillStyle = col;
    g.fillRect(x, 0, w, 256);
    g.fillStyle = HOLY.gold;
    g.fillRect(x, 0, 1.5, 256);
    x += w;
  }
  for (let y = 0; y < 256; y += 2) {
    g.fillStyle = y % 4 ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.06)";
    g.fillRect(0, y, 256, 1);
  }
  for (let i = 0; i < 256; i += 3) {
    g.fillStyle = "rgba(0,0,0,0.05)";
    g.fillRect(i, 0, 1, 256);
  }
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.colorSpace = SRGBColorSpace;
  textures.set(kind, t);
  return t;
}

interface ClothProps {
  width: number;
  height: number;
  position: [number, number, number];
  rotationY?: number;
  kind?: "curtain" | "veil";
  folds?: number;
  depth?: number;
  repeat?: number;
}

/** Hanging woven cloth with soft vertical folds, lit by the lamps. Bottom edge at `position.y`. */
export function Cloth({
  width,
  height,
  position,
  rotationY = 0,
  kind = "curtain",
  folds = 9,
  depth = 0.08,
  repeat = 3,
}: ClothProps) {
  const geometry = useMemo(() => {
    const g = new PlaneGeometry(width, height, 96, 1);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const u = p.getX(i) / width;
      p.setZ(
        i,
        Math.sin(u * folds * Math.PI * 2) * depth +
          Math.sin(u * folds * 4.7) * depth * 0.3,
      );
    }
    g.translate(0, height / 2, 0);
    g.computeVertexNormals();
    return g;
  }, [width, height, folds, depth]);
  const material = useMemo(() => {
    const map = wovenTexture(kind).clone();
    map.repeat.set(repeat, 1);
    map.needsUpdate = true;
    return new MeshStandardMaterial({ map, roughness: 0.95 });
  }, [kind, repeat]);
  useEffect(
    () => () => {
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  return (
    <mesh
      geometry={geometry}
      material={material}
      position={position}
      rotation={[0, rotationY, 0]}
    />
  );
}

/** The earthen floor of the tent, with a dark ceiling far overhead. */
export function Floor({
  y = FLOOR,
  color = HOLY.floor,
}: {
  y?: number;
  color?: string;
}) {
  const material = useMemo(
    () => new MeshStandardMaterial({ color, roughness: 1 }),
    [color],
  );
  useEffect(() => () => material.dispose(), [material]);
  return (
    <mesh
      position={[0, y, -4]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
    >
      <planeGeometry args={[30, 30]} />
    </mesh>
  );
}

export function useGold(roughness = 0.35) {
  const m = useMemo(
    () =>
      new MeshStandardMaterial({
        color: HOLY.gold,
        roughness,
        metalness: 0.75,
      }),
    [roughness],
  );
  useEffect(() => () => m.dispose(), [m]);
  return m;
}

/** Steady with a small living flicker, scaled by `level`. */
function flicker(t: number, seed: number) {
  return (
    0.88 +
    Math.sin(t * 9 + seed * 7) * 0.05 +
    Math.sin(t * 23 + seed * 3) * 0.04 +
    Math.sin(t * 2.1 + seed) * 0.03
  );
}

interface FlameProps {
  position: [number, number, number];
  size?: number;
  seed?: number;
  /** 0–1, the lamp's brightness; 0 is out. */
  level?: RefObject<number>;
  light?: number;
  distance?: number;
}

/** One oil-lamp flame: a tall core in a warm halo, with a point light that flickers with it. */
export function Flame({
  position,
  size = 0.1,
  seed = 0,
  level,
  light = 0,
  distance = 9,
}: FlameProps) {
  const core = useRef<ShaderMaterial | null>(null);
  const halo = useRef<ShaderMaterial | null>(null);
  const lamp = useRef<PointLight>(null);
  useFrame(({ clock }) => {
    const f = flicker(clock.elapsedTime, seed) * (level?.current ?? 1);
    if (core.current) setUniform(core.current, "uAlpha", f);
    if (halo.current) setUniform(halo.current, "uAlpha", 0.32 * f);
    if (lamp.current) lamp.current.intensity = light * f;
  });
  return (
    <group position={position}>
      <Glow
        size={size * 7}
        color="#B8652A"
        inner={HOLY.flame}
        alpha={0.32}
        power={2.2}
        renderOrder={11}
        billboard
        onMaterial={(m) => {
          halo.current = m;
        }}
      />
      <Glow
        position={[0, size * 0.5, 0]}
        size={size}
        scaleY={1.9}
        color={HOLY.flame}
        inner={HOLY.core}
        alpha={1}
        power={0.9}
        renderOrder={12}
        billboard
        onMaterial={(m) => {
          core.current = m;
        }}
      />
      {light > 0 && (
        <pointLight
          ref={lamp}
          color="#FFC27A"
          intensity={light}
          distance={distance}
          decay={1.6}
        />
      )}
    </group>
  );
}

const ARMS = [0.17, 0.32, 0.47];
/** The golden lampstand: a stem on a stepped foot, three arms each side, seven lamps along the top. Base at the origin. */
export function Lampstand({
  position,
  scale = 1,
  level,
  light = 7,
}: {
  position: [number, number, number];
  scale?: number;
  level?: RefObject<number>;
  light?: number;
}) {
  const gold = useGold();
  const parts = useMemo(
    () => ({
      stem: new CylinderGeometry(0.025, 0.035, 1.5, 10),
      foot: new CylinderGeometry(0.08, 0.2, 0.12, 16),
      cup: new CylinderGeometry(0.045, 0.025, 0.06, 10),
      arms: ARMS.map((r) => new TorusGeometry(r, 0.018, 6, 28, Math.PI)),
    }),
    [],
  );
  useEffect(
    () => () => {
      parts.stem.dispose();
      parts.foot.dispose();
      parts.cup.dispose();
      parts.arms.forEach((a) => a.dispose());
    },
    [parts],
  );
  const top = 1.55;
  const lamps = [0, ...ARMS.flatMap((r) => [-r, r])];
  return (
    <group position={position} scale={scale}>
      <mesh geometry={parts.foot} material={gold} position={[0, 0.06, 0]} />
      <mesh geometry={parts.stem} material={gold} position={[0, 0.8, 0]} />
      {parts.arms.map((g, i) => (
        <mesh
          key={i}
          geometry={g}
          material={gold}
          position={[0, top, 0]}
          rotation={[0, 0, Math.PI]}
        />
      ))}
      {lamps.map((x) => (
        <mesh
          key={x}
          geometry={parts.cup}
          material={gold}
          position={[x, top + 0.03, 0]}
        />
      ))}
      {lamps.map((x, i) => (
        <Flame
          key={x}
          position={[x, top + 0.09, 0]}
          size={0.055}
          seed={i}
          level={level}
          light={x === 0 ? light : 0}
        />
      ))}
    </group>
  );
}

/** The gold-covered altar of incense, with a horn at each corner. Base at the origin. */
export function Altar({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const gold = useGold(0.5);
  const box = useMemo(() => new BoxGeometry(1, 1, 1), []);
  useEffect(() => () => box.dispose(), [box]);
  const horns: [number, number][] = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];
  return (
    <group position={position} scale={scale}>
      <mesh
        geometry={box}
        material={gold}
        position={[0, 0.45, 0]}
        scale={[0.5, 0.9, 0.5]}
      />
      <mesh
        geometry={box}
        material={gold}
        position={[0, 0.92, 0]}
        scale={[0.58, 0.05, 0.58]}
      />
      {horns.map(([x, z]) => (
        <mesh
          key={`${x}${z}`}
          geometry={box}
          material={gold}
          position={[x * 0.24, 1.0, z * 0.24]}
          scale={0.07}
        />
      ))}
    </group>
  );
}

/** The table of the bread of the Presence: a gold top on four legs. Top surface at `TABLE_TOP` above its base. */
export const TABLE_TOP = 0.75;
export function Table({
  position,
  width = 1.1,
  depth = 0.55,
}: {
  position: [number, number, number];
  width?: number;
  depth?: number;
}) {
  const gold = useGold(0.45);
  const box = useMemo(() => new BoxGeometry(1, 1, 1), []);
  useEffect(() => () => box.dispose(), [box]);
  const legs: [number, number][] = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];
  return (
    <group position={position}>
      <mesh
        geometry={box}
        material={gold}
        position={[0, TABLE_TOP - 0.03, 0]}
        scale={[width, 0.06, depth]}
      />
      <mesh
        geometry={box}
        material={gold}
        position={[0, TABLE_TOP - 0.1, 0]}
        scale={[width * 0.94, 0.08, depth * 0.9]}
      />
      {legs.map(([x, z]) => (
        <mesh
          key={`${x}${z}`}
          geometry={box}
          material={gold}
          position={[
            x * (width / 2 - 0.05),
            (TABLE_TOP - 0.06) / 2,
            z * (depth / 2 - 0.05),
          ]}
          scale={[0.05, TABLE_TOP - 0.06, 0.05]}
        />
      ))}
    </group>
  );
}

const STANDING: [number, number][] = [
  [0, 0],
  [0.3, 0],
  [0.27, 0.5],
  [0.22, 0.95],
  [0.26, 1.24],
  [0.2, 1.38],
  [0.07, 1.45],
  [0, 1.46],
];
const KNEELING: [number, number][] = [
  [0, 0],
  [0.36, 0],
  [0.34, 0.2],
  [0.26, 0.5],
  [0.22, 0.75],
  [0.16, 0.86],
  [0.06, 0.9],
  [0, 0.91],
];

const lathe = (profile: [number, number][]) =>
  new LatheGeometry(
    profile.map(([r, y]) => new Vector2(r, y)),
    20,
  );

/** Head height and forward offset for each pose. */
export const FIGURE_HEAD = {
  standing: [1.6, 0],
  kneeling: [1.03, 0.08],
} as const;

/** A robed figure turned on a lathe, about 1.75 tall standing or 1.1 kneeling, feet at the origin; `morph` gives a standing body with the kneeling one as morph target 0. */
export function useFigure(
  pose: "standing" | "kneeling" = "standing",
  morph = false,
) {
  return useMemo(() => {
    const body = lathe(pose === "standing" ? STANDING : KNEELING);
    if (morph) {
      const kneel = lathe(KNEELING);
      body.morphAttributes.position = [kneel.attributes.position];
      body.morphAttributes.normal = [kneel.attributes.normal];
      kneel.dispose();
    }
    const head = new SphereGeometry(0.105, 16, 12);
    return {
      body,
      head,
      headY: FIGURE_HEAD[pose][0],
      headZ: FIGURE_HEAD[pose][1],
    };
  }, [pose, morph]);
}

interface FigureProps {
  position: [number, number, number];
  robe: string;
  pose?: "standing" | "kneeling";
  scale?: number;
  rotationY?: number;
  /** The priest’s white linen turban. */
  turban?: boolean;
}

export function Figure({
  position,
  robe,
  pose = "standing",
  scale = 1,
  rotationY = 0,
  turban = false,
}: FigureProps) {
  const f = useFigure(pose);
  const cloth = useMemo(
    () => new MeshStandardMaterial({ color: robe, roughness: 0.9 }),
    [robe],
  );
  const skin = useMemo(
    () => new MeshStandardMaterial({ color: "#6E4E3A", roughness: 0.8 }),
    [],
  );
  const linen = useMemo(
    () => new MeshStandardMaterial({ color: HOLY.linen, roughness: 0.9 }),
    [],
  );
  const wrap = useMemo(() => new CylinderGeometry(0.13, 0.12, 0.12, 16), []);
  useEffect(
    () => () => {
      f.body.dispose();
      f.head.dispose();
      wrap.dispose();
      cloth.dispose();
      skin.dispose();
      linen.dispose();
    },
    [f, wrap, cloth, skin, linen],
  );
  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      <mesh geometry={f.body} material={cloth} />
      <mesh
        geometry={f.head}
        material={skin}
        position={[0, f.headY, f.headZ]}
      />
      {turban && (
        <mesh
          geometry={wrap}
          material={linen}
          position={[0, f.headY + 0.09, f.headZ]}
        />
      )}
    </group>
  );
}

const SMOKE_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uPixelRatio;
uniform float uRise;
uniform float uSpread;
uniform float uSize;
varying float vLife;
varying float vSeed;
float hash(float n) { return fract(sin(n) * 43758.5453); }
void main() {
  float life = fract(uTime * (0.09 + hash(aSeed * 5.1) * 0.05) + aSeed);
  vLife = life;
  vSeed = aSeed;
  float curl = sin(uTime * 0.7 + life * 6.0 + aSeed * 30.0);
  vec3 p = position + vec3(curl * life * uSpread + (hash(aSeed * 2.7) - 0.5) * 0.08, life * uRise, cos(uTime * 0.5 + aSeed * 11.0) * life * uSpread * 0.5);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * (0.35 + life * 1.4) * uPixelRatio * (40.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const SMOKE_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uAlpha;
varying float vLife;
varying float vSeed;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.0, d) * sin(vLife * 3.14159) * (1.0 - vLife * 0.4) * uAlpha * 0.16;
  gl_FragColor = vec4(uColor, a);
}`;

interface SmokeProps {
  position: [number, number, number];
  count?: number;
  rise?: number;
  spread?: number;
  size?: number;
  color?: string;
  /** 0–1 density, read every frame. */
  strength?: RefObject<number>;
}

/** Incense smoke: soft puffs that rise, curl and widen from one point. */
export function Smoke({
  position,
  count = 160,
  rise = 3,
  spread = 0.35,
  size = 4.5,
  color = HOLY.smoke,
  strength,
}: SmokeProps) {
  const pixelRatio = useThree((s) => s.viewport.dpr);
  const ref = useRef<Points>(null);
  const geometry = useMemo(() => {
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) seed[i] = (i * 0.618033) % 1;
    const g = new BufferGeometry();
    g.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(count * 3), 3),
    );
    g.setAttribute("aSeed", new BufferAttribute(seed, 1));
    return g;
  }, [count]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: SMOKE_VERT,
        fragmentShader: SMOKE_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
          uRise: { value: rise },
          uSpread: { value: spread },
          uSize: { value: size },
          uColor: { value: new Color(color) },
          uAlpha: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
      }),
    [rise, spread, size, color],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  useFrame((_, delta) => {
    const m = ref.current?.material as ShaderMaterial | undefined;
    if (!m) return;
    m.uniforms.uTime.value += Math.min(delta, 0.05);
    m.uniforms.uPixelRatio.value = pixelRatio;
    m.uniforms.uAlpha.value = strength?.current ?? 1;
  });
  return (
    <points
      ref={ref}
      position={position}
      geometry={geometry}
      material={material}
      frustumCulled={false}
      renderOrder={14}
    />
  );
}

/** The Holy Place: woven curtains down both sides and the veil across the back. */
export function HolyPlace({
  veilZ = -6,
  halfWidth = 3.4,
  near = 2,
}: {
  veilZ?: number;
  halfWidth?: number;
  near?: number;
}) {
  const len = near - veilZ;
  return (
    <>
      <Cloth
        kind="veil"
        width={halfWidth * 2}
        height={5}
        position={[0, FLOOR, veilZ]}
        folds={11}
        depth={0.1}
        repeat={2}
      />
      <Cloth
        width={len}
        height={5}
        position={[-halfWidth, FLOOR, veilZ + len / 2]}
        rotationY={Math.PI / 2}
        folds={8}
        repeat={2}
      />
      <Cloth
        width={len}
        height={5}
        position={[halfWidth, FLOOR, veilZ + len / 2]}
        rotationY={-Math.PI / 2}
        folds={8}
        repeat={2}
      />
      <Floor />
      <hemisphereLight args={["#3A2A20", "#120D0A", 0.6]} />
    </>
  );
}
