"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree, type RootState } from "@react-three/fiber";
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  ShaderMaterial,
  SpriteMaterial,
  SRGBColorSpace,
  Vector2,
  type Camera,
  type Material,
} from "three";
import { setUniform } from "./mutate";
import { setLens, useResetCameraOnUnmount } from "./useSceneCamera";

/** Hebrews 8 palette: a cyanotype sheet. White line for the earthly copy, gold for the true thing, and pale print where a shadow fell. */
export const PATTERN = {
  deep: "#092037",
  wash: "#133C62",
  line: "#E8EEF0",
  gold: "#EDBE63",
  bright: "#FFE7AE",
  print: "#BCD6EA",
  paper: "#E8E2D0",
} as const;

export type V3 = [number, number, number];
type V2 = [number, number];

const LINE_VERT = /* glsl */ `
attribute vec3 aStart;
attribute vec3 aEnd;
attribute vec2 aMix;
attribute float aT;
attribute float aLen;
uniform vec2 uRes;
uniform float uWidth;
uniform float uScale;
varying float vT;
varying float vLen;
varying float vSide;
void main() {
  vec4 a = projectionMatrix * modelViewMatrix * vec4(aStart, 1.0);
  vec4 b = projectionMatrix * modelViewMatrix * vec4(aEnd, 1.0);
  vec2 d = normalize((b.xy / b.w - a.xy / a.w) * uRes + vec2(1e-5, 0.0));
  vec2 n = vec2(-d.y, d.x);
  vec4 p = mix(a, b, aMix.y);
  p.xy += (n * aMix.x + d * (aMix.y * 2.0 - 1.0) * 0.5) * uWidth * uScale / uRes * 2.0 * p.w;
  p.z -= 0.0006 * p.w;
  vT = aT;
  vLen = aLen;
  vSide = aMix.x;
  gl_Position = p;
}`;

const LINE_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
uniform float uReveal;
uniform float uDash;
uniform float uWear;
uniform float uFade;
varying float vT;
varying float vLen;
varying float vSide;
float hash(float x) { return fract(sin(x * 127.1) * 43758.5453); }
void main() {
  if (vT > uReveal) discard;
  if (uDash > 0.0 && fract(vLen * uDash) > 0.55) discard;
  if (uWear > 0.0 && hash(floor(vLen * 26.0)) < uWear) discard;
  float edge = 1.0 - smoothstep(0.5, 1.0, abs(vSide));
  float chalk = 0.8 + 0.2 * hash(floor(gl_FragCoord.x / 2.0) + floor(gl_FragCoord.y / 2.0) * 57.0);
  gl_FragColor = vec4(uColor, uOpacity * uFade * edge * chalk * (1.0 - 0.5 * uWear));
  #include <colorspace_fragment>
}`;

const SHEET_FRAG = /* glsl */ `
uniform vec2 uRes;
uniform vec3 uDeep;
uniform vec3 uWash;
uniform vec3 uPaper;
varying vec2 vUv;
float rand(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(rand(i), rand(i + vec2(1.0, 0.0)), f.x), mix(rand(i + vec2(0.0, 1.0)), rand(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 5; i++) {
    s += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return s;
}
void main() {
  float ar = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * ar, vUv.y);
  float brush = fbm(vec2(p.x * 1.6, p.y * 26.0));
  float wash = fbm(p * 2.4);
  vec3 col = mix(uDeep, uWash, 0.35 * brush + 0.65 * wash);
  col += (fbm(p * 170.0) - 0.5) * 0.012;
  vec2 g = abs(fract(p * 9.0) - 0.5);
  col += 0.006 * smoothstep(0.49, 0.5, max(g.x, g.y));
  float edge = min(min(vUv.x * ar, (1.0 - vUv.x) * ar), min(vUv.y, 1.0 - vUv.y));
  float rough = edge / min(ar, 1.0) - 0.016 - 0.03 * fbm(vec2(p.x * 7.0 + p.y * 5.0, p.y * 40.0 - p.x * 7.0));
  col = mix(uPaper, col, smoothstep(0.0, 0.006, rough));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

const lerpV = (a: V2, b: V2, t: number): V2 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

/** Rounds a hand-placed outline by corner cutting, so figures read as drawn and not as polygons. */
function rounded(points: V2[], passes = 2) {
  let pts = points;
  for (let i = 0; i < passes; i++) {
    const next: V2[] = [pts[0]];
    for (let j = 0; j + 1 < pts.length; j++)
      next.push(
        lerpV(pts[j], pts[j + 1], 0.25),
        lerpV(pts[j], pts[j + 1], 0.75),
      );
    next.push(pts[pts.length - 1]);
    pts = next;
  }
  return pts;
}

/** An ordered list of strokes; the order is the order they are drawn on. */
export class Sketch {
  segments: [V3, V3][] = [];
  line(a: V3, b: V3) {
    this.segments.push([a, b]);
    return this;
  }
  poly(points: V3[], closed = false) {
    for (let i = 0; i + 1 < points.length; i++)
      this.line(points[i], points[i + 1]);
    if (closed) this.line(points[points.length - 1], points[0]);
    return this;
  }
}

interface TentOptions {
  open?: boolean;
}

/** The tent at its Exodus 26 proportions, 30 × 10 × 10 cubits: 20 boards a side, 6 behind and 5 pillars at the door. */
export function tent(
  sk: Sketch,
  [x, y, z]: V3,
  k = 1,
  { open = false }: TentOptions = {},
) {
  const L = 3 * k;
  const W = k;
  const top = y + k;
  const x0 = x - L / 2;
  const x1 = x + L / 2;
  const z0 = z - W / 2;
  const z1 = z + W / 2;
  sk.poly(
    [
      [x0, y, z0],
      [x1, y, z0],
      [x1, y, z1],
      [x0, y, z1],
    ],
    true,
  );
  for (let i = 0; i <= 20; i++) {
    const px = x0 + (L * i) / 20;
    sk.line([px, y, z1], [px, top, z1]);
    sk.line([px, top, z0], [px, y, z0]);
  }
  for (let i = 0; i <= 6; i++) {
    const pz = z0 + (W * i) / 6;
    sk.line([x0, y, pz], [x0, top, pz]);
  }
  if (!open)
    for (let i = 0; i <= 4; i++) {
      const pz = z0 + (W * i) / 4;
      sk.line([x1, y, pz], [x1, top, pz]);
    }
  sk.poly(
    [
      [x0, top, z0],
      [x1, top, z0],
      [x1, top, z1],
      [x0, top, z1],
    ],
    true,
  );
  for (let i = 1; i < 11; i++) {
    const px = x0 + (L * i) / 11;
    const sag: V3[] = [];
    for (let j = 0; j <= 6; j++) {
      const f = j / 6;
      sag.push([px, top - 0.05 * k * Math.sin(f * Math.PI), z0 + W * f]);
    }
    sk.poly(sag);
  }
  return sk;
}

/** The court of Exodus 27 at 100 × 50 cubits with its gate, altar and laver. */
export function court(sk: Sketch) {
  const X = 5;
  const Z = 2.5;
  const H = 0.5;
  const GATE = 0.75;
  sk.poly(
    [
      [-X, 0, -Z],
      [X, 0, -Z],
      [X, 0, Z],
      [-X, 0, Z],
    ],
    true,
  );
  sk.poly([
    [X, H, -GATE],
    [X, H, -Z],
    [-X, H, -Z],
    [-X, H, Z],
    [X, H, Z],
    [X, H, GATE],
  ]);
  for (let i = 0; i <= 20; i++) {
    const px = -X + i / 2;
    sk.line([px, 0, -Z], [px, H, -Z]);
    sk.line([px, 0, Z], [px, H, Z]);
  }
  for (let i = 0; i <= 10; i++) {
    const pz = -Z + i / 2;
    sk.line([-X, 0, pz], [-X, H, pz]);
    if (Math.abs(pz) >= GATE) sk.line([X, 0, pz], [X, H, pz]);
  }
  const a = 2.1;
  const s = 0.25;
  const h = 0.3;
  const corners: V2[] = [
    [-s, -s],
    [s, -s],
    [s, s],
    [-s, s],
  ];
  sk.poly(
    corners.map(([u, v]) => [a + u, h, v]),
    true,
  );
  sk.poly(
    corners.map(([u, v]) => [a + u, 0, v]),
    true,
  );
  corners.forEach(([u, v]) => sk.line([a + u, 0, v], [a + u, h, v]));
  const ring: V3[] = [];
  for (let i = 0; i < 28; i++) {
    const th = (i / 28) * Math.PI * 2;
    ring.push([0.75 + Math.cos(th) * 0.16, 0.14, Math.sin(th) * 0.16]);
  }
  sk.poly(ring, true);
  return sk;
}

/** Mountain as stacked survey contours. Returns the height of the top ring. */
export function contours(
  sk: Sketch,
  cx: number,
  cz: number,
  R: number,
  rings: number,
  step: number,
) {
  for (let i = 0; i < rings; i++) {
    const r = R * (1 - i / rings);
    const pts: V3[] = [];
    for (let j = 0; j < 72; j++) {
      const th = (j / 72) * Math.PI * 2;
      const w =
        1 +
        0.13 * Math.sin(3 * th + i * 0.45) +
        0.07 * Math.sin(5 * th - i * 0.7);
      pts.push([
        cx + Math.cos(th) * r * w,
        i * step,
        cz + Math.sin(th) * r * w * 0.8,
      ]);
    }
    sk.poly(pts, true);
  }
  return rings * step;
}

function circle(sk: Sketch, x: number, y: number, z: number, r: number) {
  const pts: V3[] = [];
  for (let i = 0; i < 20; i++) {
    const th = (i / 20) * Math.PI * 2;
    pts.push([x + Math.cos(th) * r, y + Math.sin(th) * r, z]);
  }
  sk.poly(pts, true);
}

/** A robed figure seen from the front, feet at `y`. */
export function figure(sk: Sketch, x: number, y: number, z: number, h: number) {
  const place = (pts: V2[]): V3[] =>
    pts.map(([u, v]) => [x + u * h, y + v * h, z]);
  circle(sk, x, y + 0.885 * h, z, 0.082 * h);
  sk.poly(
    place(
      rounded([
        [-0.025, 0.8],
        [-0.17, 0.72],
        [-0.2, 0.42],
        [-0.245, 0.02],
        [-0.12, -0.012],
        [0, -0.02],
        [0.12, -0.012],
        [0.245, 0.02],
        [0.2, 0.42],
        [0.17, 0.72],
        [0.025, 0.8],
      ]),
    ),
  );
  sk.poly(
    place(
      rounded([
        [-0.15, 0.66],
        [-0.13, 0.46],
        [0, 0.41],
        [0.13, 0.46],
        [0.15, 0.66],
      ]),
    ),
  );
  sk.poly(
    place(
      rounded([
        [-0.05, 0.4],
        [-0.075, 0.2],
        [-0.09, 0.03],
      ]),
    ),
  );
  sk.poly(
    place(
      rounded([
        [0.05, 0.4],
        [0.085, 0.2],
        [0.1, 0.03],
      ]),
    ),
  );
  return sk;
}

/** A robed figure seated front-on, its seat at `y`. */
export function seated(sk: Sketch, x: number, y: number, z: number, h: number) {
  const place = (pts: V2[]): V3[] =>
    pts.map(([u, v]) => [x + u * h, y + v * h, z]);
  circle(sk, x, y + 1.22 * h, z, 0.115 * h);
  sk.poly(
    place(
      rounded([
        [-0.04, 1.1],
        [-0.25, 1],
        [-0.3, 0.45],
        [-0.34, 0.08],
        [-0.3, -0.42],
        [-0.12, -0.44],
        [-0.1, 0.02],
      ]),
    ),
  );
  sk.poly(
    place(
      rounded([
        [0.04, 1.1],
        [0.25, 1],
        [0.3, 0.45],
        [0.34, 0.08],
        [0.3, -0.42],
        [0.12, -0.44],
        [0.1, 0.02],
      ]),
    ),
  );
  sk.poly(
    place(
      rounded([
        [-0.24, 0.5],
        [0, 0.44],
        [0.24, 0.5],
      ]),
    ),
  );
  return sk;
}

/** An arched throne from the front, with its step, feet at `y`. */
export function throne(sk: Sketch, x: number, y: number, z: number, w: number) {
  const seat = 0.5 * w + y;
  const top = 1.5 * w + y;
  const back: V3[] = [[x - w / 2, seat, z]];
  for (let i = 0; i <= 14; i++) {
    const th = Math.PI - (i / 14) * Math.PI;
    back.push([x + (Math.cos(th) * w) / 2, top + (Math.sin(th) * w) / 2, z]);
  }
  back.push([x + w / 2, seat, z]);
  sk.poly(back);
  const side = 0.62 * w;
  sk.poly(
    [
      [x - side, seat, z],
      [x + side, seat, z],
      [x + side, y + 0.12, z],
      [x - side, y + 0.12, z],
    ],
    true,
  );
  sk.poly(
    [
      [x - side - 0.14, y + 0.12, z],
      [x + side + 0.14, y + 0.12, z],
      [x + side + 0.14, y, z],
      [x - side - 0.14, y, z],
    ],
    true,
  );
  return sk;
}

export function tablet(sk: Sketch, x: number, z: number) {
  const pts: V3[] = [
    [x - 0.55, 0.05, z],
    [x - 0.55, 2.1, z],
  ];
  for (let i = 0; i <= 14; i++) {
    const th = Math.PI - (i / 14) * Math.PI;
    pts.push([x + Math.cos(th) * 0.55, 2.1 + Math.sin(th) * 0.55, z]);
  }
  pts.push([x + 0.55, 0.05, z]);
  return sk.poly(pts, true);
}

export function heart(sk: Sketch, x: number, y: number, z: number, s: number) {
  const pts: V3[] = [];
  for (let i = 0; i < 30; i++) {
    const t = (i / 30) * Math.PI * 2;
    pts.push([
      x + Math.sin(t) ** 3 * s,
      y +
        ((13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)) *
          s) /
          16,
      z,
    ]);
  }
  return sk.poly(pts, true);
}

export function hatch(x: number, z: number, w: number, d: number) {
  const sk = new Sketch();
  const x0 = x - w / 2;
  const z0 = z - d / 2;
  const y = 0.005;
  for (let c = 0.1; c < w + d; c += 0.16) {
    sk.line(
      c <= d ? [x0, y, z0 + c] : [x0 + c - d, y, z0 + d],
      c <= w ? [x0 + c, y, z0] : [x0 + w, y, z0 + c - w],
    );
  }
  return sk;
}

export function sketchGeometry({ segments }: Sketch) {
  const start: number[] = [];
  const end: number[] = [];
  const mix: number[] = [];
  const along: number[] = [];
  const length: number[] = [];
  const index: number[] = [];
  const sizes = segments.map(([a, b]) =>
    Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]),
  );
  const total = sizes.reduce((x, y) => x + y, 0) || 1;
  const corners: V2[] = [
    [-1, 0],
    [1, 0],
    [-1, 1],
    [1, 1],
  ];
  let run = 0;
  segments.forEach(([a, b], i) => {
    const v = start.length / 3;
    for (const [side, atEnd] of corners) {
      start.push(...a);
      end.push(...b);
      mix.push(side, atEnd);
      const at = run + atEnd * sizes[i];
      along.push(at / total);
      length.push(at);
    }
    index.push(v, v + 1, v + 2, v + 1, v + 3, v + 2);
    run += sizes[i];
  });
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(start, 3));
  g.setAttribute("aStart", new Float32BufferAttribute(start, 3));
  g.setAttribute("aEnd", new Float32BufferAttribute(end, 3));
  g.setAttribute("aMix", new Float32BufferAttribute(mix, 2));
  g.setAttribute("aT", new Float32BufferAttribute(along, 1));
  g.setAttribute("aLen", new Float32BufferAttribute(length, 1));
  g.setIndex(index);
  return g;
}

/** Uniforms every stroke in a scene shares. */
export interface Ink {
  res: { value: Vector2 };
  scale: { value: number };
  fade: { value: number };
}

/** The loop's fade in and out; the sheet itself stays. */
export function setFade(ink: Ink, value: number) {
  ink.fade.value = value;
}

function setResolution(ink: Ink, width: number, height: number) {
  ink.res.value.set(width, height);
  ink.scale.value = Math.min(1, Math.max(0.5, width / 1900));
}

/** Camera and shared ink for a drawn scene; the long lens flattens it towards a plan drawing. */
export function useDrawing() {
  useResetCameraOnUnmount();
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    const far = camera.far;
    setLens(camera, 20, 400);
    return () => setLens(camera, 20, far);
  }, [camera]);
  return useMemo<Ink>(
    () => ({
      res: { value: new Vector2(1, 1) },
      scale: { value: 1 },
      fade: { value: 1 },
    }),
    [],
  );
}

export interface View {
  dist: number;
  elevation: number;
  azimuth: number;
  look: V3;
  sway?: number;
  /** Extra azimuth, from the pointer. */
  turn?: number;
}

/** Orbits the drawing on its fixed view and pulls back on narrow screens so it keeps fitting the sheet. */
export function placeCamera(
  camera: Camera,
  { size }: RootState,
  t: number,
  { dist, elevation, azimuth, look, sway = 0.08, turn = 0 }: View,
) {
  const fit = Math.max(1, 1.8 / (size.width / size.height));
  const a = azimuth + Math.sin(t * 0.13) * sway + turn;
  const d = dist * fit;
  camera.position.set(
    look[0] + Math.sin(a) * Math.cos(elevation) * d,
    look[1] + Math.sin(elevation) * d,
    look[2] + Math.cos(a) * Math.cos(elevation) * d,
  );
  camera.lookAt(...look);
}

interface StrokeOptions {
  color?: string;
  width?: number;
  opacity?: number;
  dash?: number;
  halo?: boolean;
}

const HALO_ALPHA = 0.13;

function strokeMaterial(
  ink: Ink,
  color: string,
  width: number,
  opacity: number,
  dash: number,
) {
  return new ShaderMaterial({
    vertexShader: LINE_VERT,
    fragmentShader: LINE_FRAG,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    uniforms: {
      uRes: ink.res,
      uScale: ink.scale,
      uFade: ink.fade,
      uColor: { value: new Color(color) },
      uWidth: { value: width },
      uOpacity: { value: opacity },
      uReveal: { value: 0 },
      uDash: { value: dash },
      uWear: { value: 0 },
    },
  });
}

export interface Stroke {
  geometry: BufferGeometry;
  materials: ShaderMaterial[];
  opacity: number;
}

/** Draws a module-level Sketch as screen-width ribbons, so a line keeps its weight at any distance. */
export function useStroke(
  ink: Ink,
  sketch: Sketch,
  {
    color = PATTERN.line,
    width = 2.4,
    opacity = 0.95,
    dash = 0,
    halo = false,
  }: StrokeOptions = {},
): Stroke {
  const stroke = useMemo(
    () => ({
      geometry: sketchGeometry(sketch),
      opacity,
      materials: [
        strokeMaterial(ink, color, width, opacity, dash),
        ...(halo
          ? [strokeMaterial(ink, color, width * 5, HALO_ALPHA, dash)]
          : []),
      ],
    }),
    [ink, sketch, color, width, opacity, dash, halo],
  );
  useEffect(
    () => () => {
      stroke.geometry.dispose();
      stroke.materials.forEach((m) => m.dispose());
    },
    [stroke],
  );
  return stroke;
}

export function setReveal({ materials }: Stroke, value: number) {
  materials.forEach((m) => setUniform(m, "uReveal", value));
}

/** Breaks the line up stitch by stitch, 0 whole to 1 gone. */
export function setWear({ materials }: Stroke, value: number) {
  materials.forEach((m) => setUniform(m, "uWear", value));
}

export function setStrength({ materials, opacity }: Stroke, value: number) {
  materials.forEach((m, i) =>
    setUniform(m, "uOpacity", value * (i ? HALO_ALPHA : opacity)),
  );
}

export function Strokes({ stroke }: { stroke: Stroke }) {
  return stroke.materials.map((material) => (
    <mesh
      key={material.uuid}
      geometry={stroke.geometry}
      material={material}
      frustumCulled={false}
      renderOrder={3}
    />
  ));
}

/** Fills depth without colour so the lines behind a solid disappear: the hidden-line look. */
export function Occluder({ position, size }: { position: V3; size: V3 }) {
  return (
    <mesh position={position} renderOrder={-1}>
      <boxGeometry args={size} />
      <meshBasicMaterial
        colorWrite={false}
        polygonOffset
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
      />
    </mesh>
  );
}

/** The brushed sheet behind everything, and the per-frame resolution the ribbons need. */
export function Sheet({ ink }: { ink: Ink }) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 1.0, 1.0);
          }`,
        fragmentShader: SHEET_FRAG,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uRes: ink.res,
          uDeep: { value: new Color(PATTERN.deep) },
          uWash: { value: new Color(PATTERN.wash) },
          uPaper: { value: new Color(PATTERN.paper) },
        },
      }),
    [ink],
  );
  useEffect(() => () => material.dispose(), [material]);
  useFrame(({ size, viewport }) => {
    setResolution(ink, size.width * viewport.dpr, size.height * viewport.dpr);
  });
  return (
    <mesh material={material} frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

/** A cyanotype stays pale where light was blocked, so a shadow here is a pale print on the ground. */
export function usePrint(ink: Ink, sketch: Sketch) {
  return useStroke(ink, sketch, {
    color: PATTERN.print,
    width: 1.2,
    opacity: 0.4,
  });
}

interface PrintProps {
  stroke: Stroke;
  x: number;
  z: number;
  width: number;
  depth: number;
  onMaterial: (m: Material | null) => void;
}

export function Print({ stroke, x, z, width, depth, onMaterial }: PrintProps) {
  return (
    <>
      <mesh
        position={[x, 0.004, z]}
        rotation={[-Math.PI / 2, 0, 0]}
        renderOrder={1}
      >
        <planeGeometry args={[width, depth]} />
        <meshBasicMaterial
          ref={onMaterial}
          color={PATTERN.print}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <Strokes stroke={stroke} />
    </>
  );
}

/** A dimension in the sheet's italic hand. */
export function Dimension({
  text,
  position,
  width,
}: {
  text: string;
  position: V3;
  width: number;
}) {
  const material = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 96;
    const g = c.getContext("2d")!;
    g.font = "italic 64px 'EB Garamond', Georgia, serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = PATTERN.line;
    g.fillText(text, 256, 50);
    const map = new CanvasTexture(c);
    map.colorSpace = SRGBColorSpace;
    return new SpriteMaterial({
      map,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
      opacity: 0.8,
    });
  }, [text]);
  useEffect(
    () => () => {
      material.map?.dispose();
      material.dispose();
    },
    [material],
  );
  return (
    <sprite
      material={material}
      position={position}
      scale={[width, (width * 96) / 512, 1]}
      renderOrder={5}
    />
  );
}

export function setPoint(
  attribute: BufferAttribute,
  i: number,
  x: number,
  y: number,
  z: number,
) {
  attribute.setXYZ(i, x, y, z);
}

export function touch(attribute: BufferAttribute) {
  attribute.needsUpdate = true;
}
