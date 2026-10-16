"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BoxGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DoubleSide,
  Float32BufferAttribute,
  IcosahedronGeometry,
  type InstancedMesh,
  LatheGeometry,
  Matrix4,
  MeshStandardMaterial,
  PlaneGeometry,
  Quaternion,
  RepeatWrapping,
  SRGBColorSpace,
  ShaderMaterial,
  Vector2,
  Vector3,
  type Group,
} from "three";
import { Sky } from "./Earth";
import { Flames } from "./Flames";
import { Glow } from "./Glow";
import { Starfield } from "./Starfield";
import { setUniform } from "./mutate";

/** Hebrews 3 palette: the wilderness at dusk, indigo overhead, a last terracotta band on the horizon, ochre sand. */
export const DUSK = {
  top: "#1E2254",
  horizon: "#4A3552",
  glow: "#A65A34",
  sand: "#B88C62",
  fire: "#F09A3E",
  linen: "#E8DFCB",
  skins: "#6E2A22",
  hair: "#3E2E28",
  bronze: "#9A6A3A",
  gold: "#C9A24A",
  screen: "#4A3A78",
  haze: "#4E3A55",
  sun: "#FFAE78",
  shade: "#6A6CA8",
};

/** Dusk sky with the first stars, far enough back for the dune field to stand in front of it. */
export function DuskSky({
  horizonY = -1.8,
  glowStrength = 0.7,
  stars = 160,
}: {
  horizonY?: number;
  glowStrength?: number;
  stars?: number;
}) {
  return (
    <>
      <Sky
        top={DUSK.top}
        horizon={DUSK.horizon}
        glow={DUSK.glow}
        horizonY={horizonY}
        glowStrength={glowStrength}
        z={-50}
      />
      {stars > 0 && (
        <group position={[0, 12, -40]} scale={2.2}>
          <Starfield
            count={stars}
            spread={[34, 10]}
            depth={[-6, -2]}
            alpha={0.7}
            size={1}
          />
        </group>
      )}
    </>
  );
}

/** The sun just down in the west: a low rose key raking the sand from the left, indigo sky light in the shade. */
export function DuskLights({
  sun = [-10, 2.6, -4],
  intensity = 2.4,
  fill = 1.1,
}: {
  sun?: [number, number, number];
  intensity?: number;
  fill?: number;
}) {
  return (
    <>
      <hemisphereLight args={[DUSK.shade, "#4A3030", fill]} />
      <directionalLight position={sun} intensity={intensity} color={DUSK.sun} />
    </>
  );
}

/** Flat unlit sand from the viewer out to `far`, so lighting never turns the ground to a black slab. */
export function Sand({
  y,
  far = -12,
  near = 8,
  color = "#2B2022",
}: {
  y: number;
  far?: number;
  near?: number;
  color?: string;
}) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, y, (far + near) / 2]}
      renderOrder={-8}
    >
      <planeGeometry args={[60, near - far]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

/** A level patch of ground in the dunes, [x, z, radius], where the scene's action stands. */
export type Clearing = [number, number, number];

const fract = (x: number) => x - Math.floor(x);
const smooth01 = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Dune height above the floor at (x, z): long crests with a gentle windward slope and a steeper, rounded slip face, flattened inside the clearing. */
function duneHeight(
  x: number,
  z: number,
  clear: Clearing,
  amp = 1,
  channel?: [number, number],
) {
  const u = x * 0.8 + z * 0.6 + Math.sin(z * 0.23 + x * 0.05) * 2.2;
  const s = fract(u * 0.13);
  const rise = smooth01(0, 0.7, s);
  const fall = 1 - smooth01(0.7, 1, s);
  const crest = Math.min(rise, fall);
  const swell =
    0.6 +
    0.8 * (0.5 + 0.5 * Math.sin(x * 0.07 + 1.3) * Math.sin(z * 0.09 + 0.4));
  const h =
    Math.pow(crest, 1.4) * 0.95 * swell +
    0.16 * Math.sin(x * 0.31 + z * 0.17) +
    0.1 * Math.sin(x * 0.53 - z * 0.41);
  const d = Math.hypot(x - clear[0], (z - clear[1]) * 1.2);
  const t =
    smooth01(clear[2], clear[2] * 2.6 + 2, d) *
    (channel
      ? smooth01(channel[1], channel[1] + 1.6, Math.abs(z - channel[0]))
      : 1);
  return Math.max(0, h + 0.2) * amp * t * (1 + Math.max(0, -z) * 0.035);
}

let rippleTexture: CanvasTexture | null = null;
/** A tileable normal map of wind ripples, so the sand has grain under the low sun. */
function rippleMap() {
  if (rippleTexture) return rippleTexture;
  const n = 256;
  const c = document.createElement("canvas");
  c.width = c.height = n;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(n, n);
  const h = (x: number, y: number) => {
    const a = (x / n) * Math.PI * 2;
    const b = (y / n) * Math.PI * 2;
    return (
      Math.sin(a * 9 + Math.sin(b * 2) * 1.6 + Math.sin(a * 2 + b) * 0.6) +
      0.35 * Math.sin(a * 23 + b * 3 + Math.sin(b * 5) * 0.8)
    );
  };
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const dx = h(x + 1, y) - h(x - 1, y);
      const dy = h(x, y + 1) - h(x, y - 1);
      const v = new Vector3(-dx * 0.9, -dy * 0.9, 1).normalize();
      const i = (y * n + x) * 4;
      img.data[i] = (v.x * 0.5 + 0.5) * 255;
      img.data[i + 1] = (v.y * 0.5 + 0.5) * 255;
      img.data[i + 2] = (v.z * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  rippleTexture = new CanvasTexture(c);
  rippleTexture.wrapS = rippleTexture.wrapT = RepeatWrapping;
  return rippleTexture;
}

/** Sculpted dunes lit by the low sun, running from under the camera to the horizon: smooth crests, darker troughs and wind ripples in the sand. */
export function DuneField({
  y,
  clear = [0, 0, 3],
  amp = 1,
  color = DUSK.sand,
  near = 10,
  far = -48,
  width = 120,
  glow = 0.08,
  channel,
}: {
  y: number;
  clear?: Clearing;
  /** [z, half-width] of a level band across the whole field, where a river runs. */
  channel?: [number, number];
  amp?: number;
  color?: string;
  /** Emissive lift, so troughs facing the sky keep the ground's own colour. */
  glow?: number;
  near?: number;
  far?: number;
  width?: number;
}) {
  const geometry = useMemo(() => {
    const depth = near - far;
    const g = new PlaneGeometry(width, depth, 260, 150);
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0, (near + far) / 2);
    const pos = g.getAttribute("position");
    const colors = new Float32Array(pos.count * 3);
    const base = new Color(color);
    const low = base.clone().multiplyScalar(0.72);
    const high = base.clone().lerp(new Color("#F2D2A6"), 0.25);
    const c = new Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const hy = duneHeight(x, z, clear, amp, channel);
      pos.setY(i, hy);
      c.lerpColors(low, high, Math.min(1, hy / (1.2 * amp)));
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    g.setAttribute("color", new Float32BufferAttribute(colors, 3));
    g.computeVertexNormals();
    return g;
  }, [clear, amp, near, far, width, color, channel]);
  const material = useMemo(() => {
    const map = rippleMap().clone();
    map.repeat.set(width / 1.6, (near - far) / 1.6);
    map.needsUpdate = true;
    return new MeshStandardMaterial({
      vertexColors: true,
      roughness: 1,
      normalMap: map,
      normalScale: new Vector2(0.2, 0.2),
      emissive: color,
      emissiveIntensity: glow,
    });
  }, [color, glow, width, near, far]);
  useEffect(
    () => () => {
      geometry.dispose();
      material.normalMap?.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  return <mesh geometry={geometry} material={material} position={[0, y, 0]} />;
}

/** Cloth, wood or metal for the camp: smooth so folds catch the low sun, flat-shaded only for cut edges. */
function useDuskMaterial(
  color: string,
  opts: {
    roughness?: number;
    metalness?: number;
    emissive?: number;
    flat?: boolean;
    map?: CanvasTexture;
  } = {},
) {
  const {
    roughness = 0.95,
    metalness = 0,
    emissive = 0,
    flat = false,
    map,
  } = opts;
  const m = useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        roughness,
        metalness,
        flatShading: flat,
        emissive: color,
        emissiveIntensity: emissive,
        side: DoubleSide,
        map,
      }),
    [color, roughness, metalness, emissive, flat, map],
  );
  useEffect(() => () => m.dispose(), [m]);
  return m;
}

/** A goat-hair tent (the “tents of Kedar”, Song 1:5): the cloth peaks over two poles, sags between them and slopes down to stakes, open along the front (+z). Base at the origin. */
function tentGeometry() {
  const g = new PlaneGeometry(1.3, 0.9, 26, 14);
  g.rotateX(-Math.PI / 2);
  const pos = g.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const poles =
      Math.exp(-Math.pow((x - 0.3) * 4.5, 2)) +
      Math.exp(-Math.pow((x + 0.3) * 4.5, 2));
    const ridge = 0.34 + 0.12 * Math.min(1, poles);
    const across =
      z < 0 ? 1 - Math.pow(-z / 0.45, 1.4) : 1 - Math.pow(z / 0.45, 2) * 0.45;
    const ends = 1 - Math.pow(Math.abs(x) / 0.65, 6) * 0.8;
    pos.setY(i, Math.max(0, ridge * across * ends));
  }
  g.computeVertexNormals();
  return g;
}

export interface TentSpot {
  x: number;
  z: number;
  /** Scale. */
  s: number;
  /** Rotation about y. */
  r: number;
  /** A lamp burns in the doorway. */
  lit?: boolean;
}

const TENT_SHADES = ["#6A5444", "#7A604C", "#5C4A3E", "#86684E", "#56463C"];

/** Many goat-hair tents in two draws (the cloth and the dark inside), each a slightly different weave; lit doorways glow at the open front (+z). */
export function Tents({
  spots,
  y,
  lamps = true,
}: {
  spots: TentSpot[];
  y: number;
  lamps?: boolean;
}) {
  const cloth = useRef<InstancedMesh>(null);
  const inside = useRef<InstancedMesh>(null);
  const geo = useMemo(
    () => ({ cloth: tentGeometry(), inside: new BoxGeometry(0.9, 0.16, 0.3) }),
    [],
  );
  const mats = useMemo(
    () => ({
      cloth: new MeshStandardMaterial({
        color: "#FFFFFF",
        roughness: 1,
        side: DoubleSide,
      }),
      inside: new MeshStandardMaterial({ color: "#1A1210", roughness: 1 }),
    }),
    [],
  );
  useEffect(
    () => () => {
      Object.values(geo).forEach((g) => g.dispose());
      Object.values(mats).forEach((m) => m.dispose());
    },
    [geo, mats],
  );
  useEffect(() => {
    const a = cloth.current;
    const b = inside.current;
    if (!a || !b) return;
    const mat = new Matrix4();
    const q = new Quaternion();
    const up = new Vector3(0, 1, 0);
    const c = new Color();
    spots.forEach((t, i) => {
      q.setFromAxisAngle(up, t.r);
      mat.compose(new Vector3(t.x, y, t.z), q, new Vector3(t.s, t.s, t.s));
      a.setMatrixAt(i, mat);
      a.setColorAt(i, c.set(TENT_SHADES[i % TENT_SHADES.length]));
      mat.compose(
        new Vector3(
          t.x + Math.sin(t.r) * 0.1 * t.s,
          y + 0.08 * t.s,
          t.z + Math.cos(t.r) * 0.1 * t.s,
        ),
        q,
        new Vector3(t.s, t.s, t.s),
      );
      b.setMatrixAt(i, mat);
    });
    a.instanceMatrix.needsUpdate = true;
    b.instanceMatrix.needsUpdate = true;
    if (a.instanceColor) a.instanceColor.needsUpdate = true;
  }, [spots, y]);
  return (
    <>
      <instancedMesh
        ref={cloth}
        args={[geo.cloth, mats.cloth, spots.length]}
        frustumCulled={false}
      />
      <instancedMesh
        ref={inside}
        args={[geo.inside, mats.inside, spots.length]}
        frustumCulled={false}
      />
      {lamps &&
        spots
          .filter((t) => t.lit)
          .map((t, i) => (
            <Glow
              key={i}
              position={[
                t.x + Math.sin(t.r) * 0.32 * t.s,
                y + 0.12 * t.s,
                t.z + Math.cos(t.r) * 0.32 * t.s,
              ]}
              size={0.36 * t.s}
              color="#F3B35A"
              inner="#FFF4D6"
              alpha={0.9}
              power={1.4}
              renderOrder={5}
              billboard
              depthTest
            />
          ))}
    </>
  );
}

/** Courtyard half-length (east–west, along x) and half-width of the tabernacle; the gate is on the +x end. */
const COURT = { l: 2.2, w: 1, gate: 0.45, h: 0.42 };
const POST_STEP = (2 * COURT.l) / 20;
const TENT_X = -1.05;
const TENT_L = 1.3;
const TENT_W = 0.44;
const TENT_H = 0.42;
const ALTAR_X = 0.9;

/** The 60 posts of the court (Exod 27:9–16), in the order they go up: along the north side, across the west, back along the south, then the east. */
function postSpots(): [number, number][] {
  const { l, w } = COURT;
  const spots: [number, number][] = [];
  for (let i = 0; i <= 20; i++) spots.push([l - (i * 2 * l) / 20, -w]);
  for (let i = 1; i < 10; i++) spots.push([-l, -w + (i * 2 * w) / 10]);
  for (let i = 0; i <= 20; i++) spots.push([-l + (i * 2 * l) / 20, w]);
  for (let i = 1; i < 10; i++) spots.push([l, w - (i * 2 * w) / 10]);
  return spots;
}
const POSTS = postSpots();

/** A hanging of fine twined linen, `length` long and 1 high (scaled to height), its cloth falling in soft folds between the posts. Hangs from y = 0.5 down to -0.5. */
function hangingGeometry(length: number) {
  const g = new PlaneGeometry(length, 1, Math.ceil(length * 40), 6);
  const pos = g.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const fold = Math.sin(((x + length / 2) / POST_STEP) * Math.PI * 2);
    const loose = 0.6 + 0.4 * (0.5 - y);
    pos.setZ(i, fold * 0.03 * loose);
  }
  g.computeVertexNormals();
  return g;
}

/** The tent's coverings, draped over its boards: flat across the roof, falling down both sides to a scalloped hem (Exod 26:7–14). `drop` is how far down the sides it hangs. Long axis along x. */
function coveringGeometry(drop: number, spread: number) {
  const half = TENT_W / 2 + spread;
  const across = 40;
  const g = new PlaneGeometry(TENT_L + 0.04 + spread * 2, 1, 30, across);
  const pos = g.getAttribute("position");
  const roof = half * 2;
  const total = roof + drop * 2;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const s = (pos.getY(i) + 0.5) * total;
    let yy: number;
    let zz: number;
    if (s < drop) {
      const k = 1 - s / drop;
      yy = TENT_H + 0.02 - drop * k;
      zz = -half - 0.02 * Math.sin(k * Math.PI * 0.5);
    } else if (s > drop + roof) {
      const k = (s - drop - roof) / drop;
      yy = TENT_H + 0.02 - drop * k;
      zz = half + 0.02 * Math.sin(k * Math.PI * 0.5);
    } else {
      const k = (s - drop) / roof;
      yy = TENT_H + 0.02 + 0.015 * Math.sin(k * Math.PI);
      zz = -half + k * roof;
    }
    const sag = Math.sin((x / (TENT_L / 6)) * Math.PI) * 0.006;
    const edge = Math.abs(zz) > half - 0.001 ? 1 : 0;
    const hem =
      edge && yy < TENT_H + 0.02 - drop * 0.92 ? Math.sin(x * 40) * 0.008 : 0;
    pos.setXYZ(i, x, yy + sag + hem, zz);
  }
  g.computeVertexNormals();
  return g;
}

let weaveTexture: CanvasTexture | null = null;
/** The screens' weave: blue, purple and scarlet yarn on fine twined linen (Exod 26:36, 27:16). */
function weaveMap() {
  if (weaveTexture) return weaveTexture;
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 8;
  const ctx = c.getContext("2d")!;
  const bands: [string, number][] = [
    ["#E8DFCB", 14],
    ["#3A4E8E", 24],
    ["#E8DFCB", 6],
    ["#6A3E7E", 24],
    ["#E8DFCB", 6],
    ["#A8322C", 24],
    ["#E8DFCB", 30],
  ];
  let x = 0;
  for (const [color, w] of bands) {
    ctx.fillStyle = color;
    ctx.fillRect(x, 0, w, 8);
    x += w;
  }
  weaveTexture = new CanvasTexture(c);
  weaveTexture.colorSpace = SRGBColorSpace;
  return weaveTexture;
}

interface TabernacleProps {
  position?: [number, number, number];
  scale?: number;
  /** Build progress, each 0–1 and read every frame; omit for the finished tabernacle. */
  posts?: RefObject<number>;
  linen?: RefObject<number>;
  tent?: RefObject<number>;
}

/** The tabernacle and its court (Exod 26–27): linen hangings on bronze posts with silver capitals, the gate screen woven in blue, purple and scarlet, the bronze altar and laver, and the tent of gold boards under its coverings of red ram skins and dark hides. Floor at the origin. */
export function Tabernacle({
  position = [0, 0, 0],
  scale = 1,
  posts,
  linen,
  tent,
}: TabernacleProps) {
  const postMesh = useRef<InstancedMesh>(null);
  const capMesh = useRef<InstancedMesh>(null);
  const hangings = useRef<Group>(null);
  const tentGroup = useRef<Group>(null);
  const altarGroup = useRef<Group>(null);
  const { l, w, gate } = COURT;
  const side = w - gate;
  const geo = useMemo(
    () => ({
      post: new CylinderGeometry(0.014, 0.018, COURT.h + 0.04, 8),
      cap: new CylinderGeometry(0.024, 0.016, 0.03, 8),
      box: new BoxGeometry(1, 1, 1),
      long: hangingGeometry(l * 2),
      short: hangingGeometry(w * 2),
      side: hangingGeometry(side),
      gate: hangingGeometry(gate * 2),
      door: hangingGeometry(TENT_W),
      hides: coveringGeometry(0.2, 0.035),
      rams: coveringGeometry(0.36, 0.025),
      pillar: new CylinderGeometry(0.013, 0.015, TENT_H, 8),
      laver: new LatheGeometry(
        [
          [0, 0],
          [0.05, 0],
          [0.02, 0.03],
          [0.02, 0.06],
          [0.08, 0.08],
          [0.09, 0.12],
          [0.085, 0.12],
          [0, 0.09],
        ].map(([r, yy]) => new Vector2(r, yy)),
        16,
      ),
    }),
    [l, w, side, gate],
  );
  useEffect(() => () => Object.values(geo).forEach((g) => g.dispose()), [geo]);
  const mats = {
    linen: useDuskMaterial(DUSK.linen, { emissive: 0.22, roughness: 0.85 }),
    screen: useDuskMaterial("#FFFFFF", {
      emissive: 0.04,
      roughness: 0.85,
      map: weaveMap(),
    }),
    bronze: useDuskMaterial(DUSK.bronze, { roughness: 0.45, metalness: 0.6 }),
    silver: useDuskMaterial("#D8D4CC", { roughness: 0.3, metalness: 0.8 }),
    gold: useDuskMaterial(DUSK.gold, {
      roughness: 0.3,
      metalness: 0.75,
      emissive: 0.08,
    }),
    rams: useDuskMaterial("#A33A2A", { roughness: 0.75, emissive: 0.1 }),
    hides: useDuskMaterial("#8A6E56", { roughness: 0.9, emissive: 0.08 }),
  };
  const scratch = useMemo(
    () => ({
      m: new Matrix4(),
      p: new Vector3(),
      q: new Quaternion(),
      s: new Vector3(),
    }),
    [],
  );

  useFrame(() => {
    const m = postMesh.current;
    const caps = capMesh.current;
    if (m && caps) {
      const built = posts?.current ?? 1;
      POSTS.forEach(([x, z], i) => {
        const at = (i / POSTS.length) * 0.75;
        const k = Math.max(0.001, Math.min(1, (built - at) / 0.25));
        const ease = 1 - Math.pow(1 - k, 3);
        const top = (COURT.h + 0.04) * ease;
        scratch.p.set(x, top / 2, z);
        scratch.s.set(1, ease, 1);
        scratch.m.compose(scratch.p, scratch.q, scratch.s);
        m.setMatrixAt(i, scratch.m);
        scratch.p.set(x, top, z);
        scratch.s.setScalar(ease);
        scratch.m.compose(scratch.p, scratch.q, scratch.s);
        caps.setMatrixAt(i, scratch.m);
      });
      m.instanceMatrix.needsUpdate = true;
      caps.instanceMatrix.needsUpdate = true;
    }
    const hung = Math.max(0.001, linen?.current ?? 1);
    if (hangings.current) hangings.current.visible = hung > 0.01;
    hangings.current?.children.forEach((panel) => {
      panel.scale.y = COURT.h * hung;
      panel.position.y = COURT.h * (1 - hung / 2);
    });
    if (altarGroup.current) altarGroup.current.scale.setScalar(hung);
    const pitched = tent?.current ?? 1;
    if (tentGroup.current) {
      tentGroup.current.position.y = (1 - pitched) * 0.9;
      tentGroup.current.visible = pitched > 0.001;
    }
  });

  const tentFront = TENT_X + TENT_L / 2;
  const turn = Math.PI / 2;
  return (
    <group position={position} scale={scale}>
      <instancedMesh
        ref={postMesh}
        args={[geo.post, mats.bronze, POSTS.length]}
        frustumCulled={false}
      />
      <instancedMesh
        ref={capMesh}
        args={[geo.cap, mats.silver, POSTS.length]}
        frustumCulled={false}
      />
      <group ref={hangings}>
        <mesh geometry={geo.long} material={mats.linen} position={[0, 0, -w]} />
        <mesh geometry={geo.long} material={mats.linen} position={[0, 0, w]} />
        <mesh
          geometry={geo.short}
          material={mats.linen}
          position={[-l, 0, 0]}
          rotation={[0, turn, 0]}
        />
        <mesh
          geometry={geo.side}
          material={mats.linen}
          position={[l, 0, -(w - side / 2)]}
          rotation={[0, turn, 0]}
        />
        <mesh
          geometry={geo.side}
          material={mats.linen}
          position={[l, 0, w - side / 2]}
          rotation={[0, turn, 0]}
        />
        <mesh
          geometry={geo.gate}
          material={mats.screen}
          position={[l + 0.005, 0, 0]}
          rotation={[0, turn, 0]}
        />
      </group>
      <group ref={altarGroup} position={[ALTAR_X, 0, 0]}>
        <mesh
          geometry={geo.box}
          material={mats.bronze}
          position={[0, 0.08, 0]}
          scale={[0.3, 0.16, 0.3]}
        />
        <mesh
          geometry={geo.box}
          material={mats.bronze}
          position={[0, 0.06, 0]}
          scale={[0.33, 0.025, 0.33]}
        />
        {[
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
        ].map(([x, z], i) => (
          <mesh
            key={i}
            geometry={geo.box}
            material={mats.bronze}
            position={[x * 0.13, 0.18, z * 0.13]}
            rotation={[z * 0.3, 0, -x * 0.3]}
            scale={[0.035, 0.05, 0.035]}
          />
        ))}
        <mesh
          geometry={geo.laver}
          material={mats.bronze}
          position={[-0.55, 0, 0]}
        />
      </group>
      <group ref={tentGroup}>
        <mesh
          geometry={geo.box}
          material={mats.gold}
          position={[TENT_X, TENT_H / 2, 0]}
          scale={[TENT_L, TENT_H, TENT_W]}
        />
        <mesh
          geometry={geo.rams}
          material={mats.rams}
          position={[TENT_X, 0, 0]}
        />
        <mesh
          geometry={geo.hides}
          material={mats.hides}
          position={[TENT_X, 0.006, 0]}
        />
        {[-0.2, -0.1, 0, 0.1, 0.2].map((z) => (
          <mesh
            key={z}
            geometry={geo.pillar}
            material={mats.gold}
            position={[tentFront + 0.035, TENT_H / 2, z]}
          />
        ))}
        <mesh
          geometry={geo.door}
          material={mats.screen}
          position={[tentFront + 0.012, TENT_H / 2, 0]}
          rotation={[0, turn, 0]}
          scale={[1, TENT_H, 1]}
        />
      </group>
    </group>
  );
}

/** Where the tent's door is, relative to the Tabernacle's origin, for lights and the glory. */
export const TENT_DOOR: [number, number, number] = [
  TENT_X + TENT_L / 2 + 0.08,
  0.25,
  0,
];
export const TENT_CENTRE: [number, number, number] = [TENT_X, 0.5, 0];
export const ALTAR_TOP: [number, number, number] = [ALTAR_X, 0.2, 0];

/** The cloud's puffs, in units of its size: x, y, z, radius. */
const GLORY_PUFFS: [number, number, number, number][] = [
  [0, 0, 0, 0.46],
  [-0.4, -0.1, 0.06, 0.36],
  [0.42, -0.06, -0.05, 0.38],
  [0.16, 0.3, 0.08, 0.34],
  [-0.22, 0.28, -0.12, 0.32],
  [0.04, 0.56, 0, 0.26],
  [-0.66, -0.2, -0.1, 0.24],
  [0.7, -0.18, 0.1, 0.26],
  [0.28, 0.02, 0.34, 0.3],
  [-0.22, 0.0, 0.34, 0.28],
  [0, -0.18, -0.32, 0.32],
  [-0.46, 0.12, -0.28, 0.24],
  [0.5, 0.18, -0.26, 0.24],
  [0.36, 0.38, -0.08, 0.22],
];

const GLORY_VERT = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vec3 p = position;
  float lump = sin(p.x * 5.0 + uTime * 0.5) * sin(p.y * 4.0 + p.z * 3.0 - uTime * 0.4) * 0.08
    + sin(p.z * 9.0 + p.x * 7.0 + uTime * 0.7) * 0.04;
  p += normal * lump;
  vec4 w = modelMatrix * vec4(p, 1.0);
  vNormal = normalize(mat3(modelMatrix) * normal);
  vView = normalize(cameraPosition - w.xyz);
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

const GLORY_FRAG = /* glsl */ `
uniform float uOpacity;
uniform vec3 uSun;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vec3 n = normalize(vNormal);
  float facing = clamp(dot(n, vView), 0.0, 1.0);
  float sun = clamp(dot(n, uSun) * 0.5 + 0.5, 0.0, 1.0);
  float under = clamp(-n.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 shade = vec3(0.5, 0.46, 0.58);
  vec3 lit = vec3(0.82, 0.72, 0.64);
  vec3 c = mix(shade, lit, sun);
  c = mix(c, vec3(1.0, 0.84, 0.56), under * 0.45);
  float a = uOpacity * smoothstep(0.0, 0.55, facing);
  gl_FragColor = vec4(c, a);
}`;

/** “The cloud covered the tent of meeting” (Exod 40:34): a soft, lumpy cloud of heaped puffs lit rose on its sun side and gold from the glory beneath, its edges thinning to nothing. `opacity` is read every frame. */
export function GloryCloud({
  position,
  size = 1,
  opacity,
}: {
  position: [number, number, number];
  size?: number;
  opacity: RefObject<number>;
}) {
  const group = useRef<Group>(null);
  const geometry = useMemo(() => new IcosahedronGeometry(1, 5), []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: GLORY_VERT,
        fragmentShader: GLORY_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0 },
          uSun: { value: new Vector3(-0.8, 0.35, 0.3).normalize() },
        },
        transparent: true,
        depthWrite: false,
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
  useFrame(({ clock }) => {
    const o = opacity.current;
    setUniform(material, "uOpacity", o);
    setUniform(material, "uTime", clock.elapsedTime);
    if (group.current) group.current.visible = o > 0.005;
  });
  return (
    <group ref={group} position={position} scale={size}>
      {GLORY_PUFFS.map(([x, y, z, r], i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={material}
          position={[x, y, z]}
          scale={r}
          renderOrder={8 + i}
        />
      ))}
    </group>
  );
}

const WATER_VERT = /* glsl */ `
varying vec3 vWorld;
varying vec2 vUv;
#include <fog_pars_vertex>
void main() {
  vUv = uv;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  vec4 mvPosition = viewMatrix * w;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;

const WATER_FRAG = /* glsl */ `
uniform float uTime;
uniform float uAlpha;
uniform vec3 uDeep;
uniform vec3 uSky;
uniform vec3 uGlint;
uniform vec2 uSource;
uniform float uRings;
varying vec3 vWorld;
varying vec2 vUv;
#include <fog_pars_fragment>
void main() {
  vec3 view = normalize(cameraPosition - vWorld);
  float fres = pow(1.0 - clamp(view.y, 0.0, 1.0), 2.0);
  vec2 q = vWorld.xz;
  float ripple = sin(q.x * 7.0 + uTime * 1.3 + sin(q.y * 3.0) * 1.5) * sin(q.y * 9.0 - uTime * 1.1);
  float d = length(q - uSource);
  float rings = sin(d * 18.0 - uTime * 4.0) * exp(-d * 1.4) * uRings;
  float n = ripple * 0.5 + rings;
  vec3 c = mix(uDeep, uSky, clamp(0.35 + fres * 0.8 + n * 0.12, 0.0, 1.0));
  float glint = smoothstep(0.82, 1.0, n * 0.5 + 0.5) * (0.4 + fres);
  c += uGlint * glint * 0.9;
  float edge = 1.0 - smoothstep(0.42, 0.5, length(vUv - 0.5));
  gl_FragColor = vec4(c, uAlpha * edge);
  #include <colorspace_fragment>
  #include <fog_fragment>
}`;

/** Water at dusk, holding the indigo and rose of the sky with moving glints; ripples ring out from `source`. Shape it with any flat geometry; a round patch fades at its rim. */
export function makeDuskWater({
  source = [0, 0],
  rings = 0,
  round = true,
  wet = false,
}: {
  source?: [number, number];
  rings?: number;
  round?: boolean;
  /** A round patch soaking into sand: a wavering rim that darkens to wet sand before it fades. */
  wet?: boolean;
} = {}) {
  return new ShaderMaterial({
    vertexShader: WATER_VERT,
    fragmentShader: wet
      ? WATER_FRAG.replace(
          "float edge = 1.0 - smoothstep(0.42, 0.5, length(vUv - 0.5));",
          `vec2 e = vUv - 0.5;
  float ang = atan(e.y, e.x);
  float wob = 0.06 * sin(ang * 3.0 + 1.0) + 0.04 * sin(ang * 7.0 + 2.0) + 0.02 * sin(ang * 13.0);
  float r = length(e) * 2.0 - wob;
  c = mix(c, vec3(0.09, 0.05, 0.03), smoothstep(0.35, 0.75, r));
  float edge = 1.0 - smoothstep(0.6, 0.92, r);`,
        )
      : round
        ? WATER_FRAG
        : WATER_FRAG.replace(
            "float edge = 1.0 - smoothstep(0.42, 0.5, length(vUv - 0.5));",
            "float edge = smoothstep(0.0, 0.2, vUv.y) * (1.0 - smoothstep(0.8, 1.0, vUv.y)) * smoothstep(0.0, 0.3, vUv.x) * (1.0 - smoothstep(0.7, 1.0, vUv.x));",
          ),
    uniforms: {
      uTime: { value: 0 },
      uAlpha: { value: 1 },
      uDeep: { value: new Color("#3A3C70") },
      uSky: { value: new Color("#D9A0A8") },
      uGlint: { value: new Color("#FFE3C4") },
      uSource: { value: source },
      uRings: { value: rings },
      fogColor: { value: new Color() },
      fogNear: { value: 1 },
      fogFar: { value: 2000 },
    },
    transparent: true,
    depthWrite: false,
    fog: true,
  });
}

const COLUMN_VERT = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying float vFacing;
void main() {
  vUv = uv;
  vec3 p = position;
  float sway = sin(uv.y * 5.0 - uTime * 1.6) * 0.06 + sin(uv.y * 11.0 - uTime * 2.7) * 0.025;
  p.x += sway * uv.y;
  p.xz *= 1.0 + 0.12 * sin(uv.y * 9.0 - uTime * 3.0 + uv.x * 6.2832 * 2.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec3 n = normalize(normalMatrix * normal);
  vFacing = abs(dot(n, normalize(-mv.xyz)));
  gl_Position = projectionMatrix * mv;
}`;

const COLUMN_FRAG = /* glsl */ `
uniform float uTime;
uniform float uAlpha;
varying vec2 vUv;
varying float vFacing;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
void main() {
  vec2 q = vec2(vUv.x * 6.0, vUv.y * 5.0 - uTime * 1.4);
  float n = noise(q) * 0.6 + noise(q * 2.3 + 3.1) * 0.3 + noise(q * 5.1) * 0.1;
  float tongue = smoothstep(0.35, 0.8, n + 0.3 - vUv.y * 0.6);
  float body = pow(vFacing, 1.6);
  float ends = smoothstep(0.0, 0.08, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y));
  float a = tongue * body * ends * uAlpha;
  vec3 hot = vec3(1.0, 0.78, 0.42);
  vec3 ember = vec3(0.86, 0.3, 0.08);
  vec3 c = mix(ember, hot, clamp(body * tongue - vUv.y * 0.6, 0.0, 1.0));
  gl_FragColor = vec4(c * a, a);
}`;

/** “By night in a pillar of fire to give them light” (Exod 13:21): a tall column of living flame, tongues climbing and swaying, sparks rising off it, over a wide glow. */
export function PillarOfFire({
  position,
  height,
  mobile,
}: {
  position: [number, number, number];
  height: number;
  mobile: boolean;
}) {
  const gust = useRef(0);
  const [x, y, z] = position;
  const column = useMemo(
    () => ({
      outer: new CylinderGeometry(
        height * 0.07,
        height * 0.11,
        height,
        32,
        40,
        true,
      ).translate(0, height / 2, 0),
      inner: new CylinderGeometry(
        height * 0.035,
        height * 0.06,
        height * 0.9,
        24,
        30,
        true,
      ).translate(0, height * 0.45, 0),
      mat: new ShaderMaterial({
        vertexShader: COLUMN_VERT,
        fragmentShader: COLUMN_FRAG,
        uniforms: { uTime: { value: 0 }, uAlpha: { value: 0.75 } },
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        blending: AdditiveBlending,
      }),
    }),
    [height],
  );
  useEffect(
    () => () => {
      column.outer.dispose();
      column.inner.dispose();
      column.mat.dispose();
    },
    [column],
  );
  useFrame((_, dt) => {
    setUniform(
      column.mat,
      "uTime",
      column.mat.uniforms.uTime.value + Math.min(dt, 0.05),
    );
  });
  return (
    <group>
      <Glow
        position={[x, y + height * 0.5, z - 0.1]}
        size={1}
        scaleX={height * 0.9}
        scaleY={height * 1.5}
        color="#8A4B2E"
        alpha={0.26}
        power={2.2}
        renderOrder={2}
      />
      <group position={[x, y, z]}>
        <mesh geometry={column.outer} material={column.mat} renderOrder={3} />
        <mesh geometry={column.inner} material={column.mat} renderOrder={4} />
      </group>
      <Flames
        emitters={[[x, y + height * 0.2, z]]}
        count={mobile ? 50 : 100}
        rise={height * 0.9}
        size={mobile ? 5 : 6}
        gust={gust}
      />
    </group>
  );
}
