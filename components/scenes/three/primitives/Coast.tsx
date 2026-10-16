"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  ConeGeometry,
  FrontSide,
  CylinderGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  Shape,
  ShapeGeometry,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  type Mesh,
  type Points,
  type Side,
} from "three";
import { Hills, Sky, type HillLayer } from "./Earth";
import { setOpacity, setUniform } from "./mutate";

/** Hebrews 6 palette: a headland above the sea as the rain moves off; slate cloud, sea-green swell, wet turf and clay, one break of pale gold. */
export const COAST = {
  top: "#56697A",
  mist: "#AEB9B8",
  horizon: "#D3D7CF",
  break: "#F4E3B8",
  sea: "#3C6670",
  deep: "#16323B",
  foam: "#E6ECE8",
  turf: "#5D7448",
  grass: "#7C9258",
  clay: "#6E5240",
  wet: "#4A3C30",
  wheat: "#D9B65A",
  thorn: "#3B2E26",
  stone: "#A9A497",
  sand: "#B8A888",
  wetSand: "#8C7F68",
  iron: "#2B3133",
  ink: "#1C272B",
};

export const HEADLANDS: HillLayer[] = [
  { y: -0.6, z: -40, amp: 0.7, freq: 0.12, seed: 1.3, color: "#9FAAAA" },
  { y: -0.9, z: -26, amp: 0.5, freq: 0.2, seed: 4.1, color: "#7F8E86" },
];

/** Overcast sky, pale low down where the rain is clearing, with a faint warm break rather than a sunset band. */
export function StormSky({
  horizonY = -0.8,
  warmth = 0.22,
}: {
  horizonY?: number;
  warmth?: number;
}) {
  return (
    <Sky
      top={COAST.top}
      horizon={COAST.horizon}
      glow={COAST.break}
      horizonY={horizonY}
      glowStrength={warmth}
      z={-48}
    />
  );
}

export function Headlands({ layers = HEADLANDS }: { layers?: HillLayer[] }) {
  return <Hills layers={layers} span={120} />;
}

/** Cool light from the cloud and a low warm key from the break. */
export function CoastLights({
  sun = [-6, 4, -6],
  intensity = 1.6,
}: {
  sun?: [number, number, number];
  intensity?: number;
}) {
  return (
    <>
      <hemisphereLight args={["#C9D3D6", "#4A5A48", 1.2]} />
      <directionalLight position={sun} intensity={intensity} color="#F6E7C6" />
    </>
  );
}

/** The swell as a sum of travelling sines: [dir x, dir z, frequency, amplitude, speed]. Mirrored in SEA_VERT. */
const WAVES: [number, number, number, number, number][] = [
  [0.958, 0.287, 0.55, 0.12, 0.9],
  [0.514, 0.857, 0.9, 0.06, 1.3],
  [-0.371, 0.928, 1.7, 0.025, 2.1],
  [0.874, -0.486, 2.6, 0.012, 2.7],
];

/** Height of the sea surface at (x, z), relative to its rest level, for floating things on it. */
export function swell(x: number, z: number, t: number, amp = 1) {
  let h = 0;
  for (const [dx, dz, f, a, s] of WAVES)
    h += a * Math.sin((dx * x + dz * z) * f + t * s);
  return h * amp;
}

const waveGlsl = WAVES.map(
  ([dx, dz, f, a, s]) =>
    `r += wave(p, vec2(${dx.toFixed(3)}, ${dz.toFixed(3)}), ${f.toFixed(2)}, ${a.toFixed(3)}, ${s.toFixed(2)}, t);`,
).join("\n  ");

const SEA_VERT = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vWorld;
varying vec3 vNormal;
varying float vHeight;
vec3 wave(vec2 p, vec2 d, float f, float a, float s, float t) {
  float ph = dot(d, p) * f + t * s;
  return vec3(a * sin(ph), a * f * d.x * cos(ph), a * f * d.y * cos(ph));
}
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vec2 p = w.xz;
  float t = uTime;
  vec3 r = vec3(0.0);
  ${waveGlsl}
  r *= uAmp;
  w.y += r.x;
  vHeight = r.x / max(uAmp, 0.001);
  vNormal = normalize(vec3(-r.y, 1.0, -r.z));
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

const SEA_FRAG = /* glsl */ `
uniform vec3 uDeep;
uniform vec3 uSea;
uniform vec3 uSky;
uniform vec3 uFoam;
uniform vec3 uMist;
uniform vec3 uBreakColor;
uniform vec3 uLight;
uniform vec2 uBreak;
uniform float uBreakStrength;
uniform float uFade;
uniform float uFogNear;
uniform float uFogFar;
varying vec3 vWorld;
varying vec3 vNormal;
varying float vHeight;
void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(cameraPosition - vWorld);
  float fres = pow(1.0 - max(dot(n, v), 0.0), 4.0);
  vec3 c = mix(uDeep, uSea, smoothstep(-0.15, 0.15, vHeight));
  c = mix(c, uSky, fres * 0.5);
  vec3 l = normalize(uLight);
  float spec = pow(max(dot(reflect(-l, n), v), 0.0), 40.0);
  vec2 q = (vWorld.xz - uBreak) / vec2(9.0, 4.0);
  float lit = exp(-dot(q, q)) * uBreakStrength;
  c += uBreakColor * (lit * 0.5 + spec * (0.2 + lit * 2.2));
  c = mix(c, uFoam, smoothstep(0.13, 0.2, vHeight) * 0.45);
  float d = length(cameraPosition - vWorld);
  c = mix(c, uMist, smoothstep(uFogNear, uFogFar, d));
  gl_FragColor = vec4(c, uFade);
  #include <colorspace_fragment>
}`;

interface SeaProps {
  y?: number;
  near?: number;
  far?: number;
  width?: number;
  amp?: number;
  /** World xz of the patch where the light breaks through onto the water. */
  breakAt?: [number, number];
  breakStrength?: number;
  light?: [number, number, number];
  fog?: [number, number];
  segments?: [number, number];
  /** Overrides for a sea under another sky, such as at night. */
  tint?: { deep: string; sea: string; sky: string; mist: string };
  side?: Side;
  /** Multiplier on the swell's pace; match it when floating things with `swell`. */
  speed?: number;
  onMaterial?: (m: ShaderMaterial) => void;
}

/** A lit swell running to the horizon, shaded by its own shader so it can fade into the mist and catch the break of light. */
export function Sea({
  y = -1,
  near = 6,
  far = -70,
  width = 140,
  amp = 1,
  breakAt = [-8, -30],
  breakStrength = 1,
  light = [-6, 4, -6],
  fog = [12, 60],
  segments = [180, 120],
  tint,
  side = FrontSide,
  speed = 1,
  onMaterial,
}: SeaProps) {
  const geometry = useMemo(() => {
    const g = new PlaneGeometry(width, near - far, segments[0], segments[1]);
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0, (near + far) / 2);
    return g;
  }, [width, near, far, segments]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: SEA_VERT,
        fragmentShader: SEA_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: amp },
          uDeep: { value: new Color(tint?.deep ?? COAST.deep) },
          uSea: { value: new Color(tint?.sea ?? COAST.sea) },
          uSky: { value: new Color(tint?.sky ?? COAST.horizon) },
          uFoam: { value: new Color(COAST.foam) },
          uMist: { value: new Color(tint?.mist ?? COAST.mist) },
          uBreakColor: { value: new Color(COAST.break) },
          uLight: { value: light },
          uBreak: { value: new Vector2(...breakAt) },
          uBreakStrength: { value: breakStrength },
          uFade: { value: 1 },
          uFogNear: { value: fog[0] },
          uFogFar: { value: fog[1] },
        },
        side,
      }),
    [amp, breakAt, breakStrength, light, fog, tint, side],
  );
  useEffect(() => {
    onMaterial?.(material);
  }, [material, onMaterial]);
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  useFrame((_, dt) =>
    setUniform(
      material,
      "uTime",
      material.uniforms.uTime.value + Math.min(dt, 0.05) * speed,
    ),
  );
  return (
    <mesh
      geometry={geometry}
      material={material}
      position={[0, y, 0]}
      renderOrder={-6}
      frustumCulled={false}
    />
  );
}

export function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const RAIN_VERT = /* glsl */ `
attribute vec3 aSeed;
uniform float uTime;
uniform float uPixelRatio;
uniform vec3 uBox;
uniform float uSize;
void main() {
  float fall = fract(aSeed.y - uTime * (0.55 + aSeed.x * 0.25));
  vec3 p = vec3((aSeed.x - 0.5) * uBox.x, fall * uBox.y, (aSeed.z - 0.5) * uBox.z);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * uPixelRatio * (40.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const RAIN_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uAlpha;
uniform float uSlant;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float x = abs(c.x - c.y * uSlant);
  float a = smoothstep(0.025, 0.0, x) * (1.0 - smoothstep(0.3, 0.5, abs(c.y))) * uAlpha;
  gl_FragColor = vec4(uColor, a * 0.55);
  #include <colorspace_fragment>
}`;

interface RainProps {
  position?: [number, number, number];
  /** Width, height and depth of the falling sheet; streaks fall from the top to `position.y`. */
  box: [number, number, number];
  count: number;
  size?: number;
  slant?: number;
  color?: string;
  /** 0–1 density, read every frame. */
  strength?: RefObject<number>;
}

/** Rain as falling streaks inside a box. */
export function Rain({
  position = [0, 0, 0],
  box,
  count,
  size = 9,
  slant = 0.18,
  color = "#E4EAEA",
  strength,
}: RainProps) {
  const pixelRatio = useThree((s) => s.viewport.dpr);
  const ref = useRef<Points>(null);
  const geometry = useMemo(() => {
    const seed = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      seed[i * 3] = hash(i);
      seed[i * 3 + 1] = hash(i + 0.37);
      seed[i * 3 + 2] = hash(i + 0.71);
    }
    const g = new BufferGeometry();
    g.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(count * 3), 3),
    );
    g.setAttribute("aSeed", new BufferAttribute(seed, 3));
    return g;
  }, [count]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: RAIN_VERT,
        fragmentShader: RAIN_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
          uBox: { value: box },
          uSize: { value: size },
          uSlant: { value: slant },
          uColor: { value: new Color(color) },
          uAlpha: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
      }),
    [box, size, slant, color],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  useFrame((_, dt) => {
    const m = ref.current?.material as ShaderMaterial | undefined;
    if (!m) return;
    setUniform(m, "uTime", m.uniforms.uTime.value + Math.min(dt, 0.05));
    setUniform(m, "uPixelRatio", pixelRatio);
    setUniform(m, "uAlpha", strength?.current ?? 1);
  });
  return (
    <points
      ref={ref}
      position={position}
      geometry={geometry}
      material={material}
      frustumCulled={false}
      renderOrder={15}
    />
  );
}

const furrows = new Map<string, CanvasTexture>();
/** One furrow across a tile: a dark wet trough, a lit ridge and a thin line of green shoots along its crest. */
function furrowTexture(soil: string, ridge: string) {
  const key = soil + ridge;
  const hit = furrows.get(key);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 128, 0);
  grad.addColorStop(0, soil);
  grad.addColorStop(0.45, ridge);
  grad.addColorStop(0.6, ridge);
  grad.addColorStop(1, soil);
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  g.fillStyle = COAST.grass;
  for (let y = 0; y < 128; y += 6) g.fillRect(62 + ((y * 7) % 5) - 2, y, 3, 3);
  for (let i = 0; i < 400; i++) {
    g.fillStyle = `rgba(0,0,0,${0.04 + ((i * 37) % 7) / 100})`;
    g.fillRect((i * 53) % 128, (i * 29) % 128, 2, 1);
  }
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.colorSpace = SRGBColorSpace;
  furrows.set(key, t);
  return t;
}

/** A ploughed plot lying flat at `position`, furrows running away from the viewer. */
export function Plot({
  position,
  size,
  rows = 6,
  soil = "#4A3A2E",
  ridge = "#9A7A5A",
}: {
  position: [number, number, number];
  size: [number, number];
  rows?: number;
  soil?: string;
  ridge?: string;
}) {
  const material = useMemo(() => {
    const map = furrowTexture(soil, ridge).clone();
    map.repeat.set(rows, 1);
    map.needsUpdate = true;
    return new MeshStandardMaterial({ map, roughness: 1 });
  }, [soil, ridge, rows]);
  useEffect(
    () => () => {
      material.map?.dispose();
      material.dispose();
    },
    [material],
  );
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
    >
      <planeGeometry args={size} />
    </mesh>
  );
}

/** A headland seen from the sea side: a turf top over a rock face that slopes down to the water. Its seaward foot is at x = 0, extending to +x. */
export function Cliff({
  position,
  width,
  height,
  depth = 0,
  turf = COAST.turf,
  rock = "#5E5A50",
  flip = false,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  depth?: number;
  turf?: string;
  rock?: string;
  flip?: boolean;
}) {
  const parts = useMemo(() => {
    const top = (x: number) =>
      height + Math.sin(x * 1.3) * 0.08 + Math.sin(x * 3.1) * 0.04;
    const face = new Shape();
    face.moveTo(0, -3);
    for (let i = 0; i <= 12; i++) {
      const k = i / 12;
      face.lineTo(
        width * 0.22 * k + Math.sin(i * 2.7) * 0.06,
        -3 + (height + 3) * Math.pow(k, 0.7),
      );
    }
    for (let i = 0; i <= 24; i++)
      face.lineTo(width * 0.22 + (width * 0.78 * i) / 24, top(i));
    face.lineTo(width, -3);
    face.closePath();
    const grass = new Shape();
    grass.moveTo(width * 0.2, top(0) - 0.12);
    for (let i = 0; i <= 24; i++)
      grass.lineTo(width * 0.22 + (width * 0.78 * i) / 24, top(i) + 0.01);
    grass.lineTo(width, top(24) - 0.22);
    for (let i = 24; i >= 0; i--)
      grass.lineTo(
        width * 0.22 + (width * 0.78 * i) / 24,
        top(i) - 0.16 - Math.sin(i * 1.9) * 0.05,
      );
    grass.closePath();
    return {
      face: new ShapeGeometry(face),
      grass: new ShapeGeometry(grass),
      rock: new MeshBasicMaterial({ color: rock }),
      turf: new MeshBasicMaterial({ color: turf }),
    };
  }, [width, height, rock, turf]);
  useEffect(
    () => () => {
      parts.face.dispose();
      parts.grass.dispose();
      parts.rock.dispose();
      parts.turf.dispose();
    },
    [parts],
  );
  return (
    <group position={position} scale={[flip ? -1 : 1, 1, 1]}>
      <mesh geometry={parts.face} material={parts.rock} />
      <mesh
        geometry={parts.grass}
        material={parts.turf}
        position={[0, 0, depth + 0.01]}
      />
    </group>
  );
}

/** A small open boat with a mast and furled sail, bow toward +x, waterline at the group origin. */
export function Boat({
  scale = 1,
  hull = "#5A4334",
}: {
  scale?: number;
  hull?: string;
}) {
  const parts = useMemo(
    () => ({
      hull: new SphereGeometry(
        1,
        24,
        12,
        0,
        Math.PI * 2,
        Math.PI / 2,
        Math.PI / 2,
      ),
      mast: new CylinderGeometry(0.02, 0.025, 1.5, 6),
      boom: new CylinderGeometry(0.035, 0.035, 0.9, 8),
    }),
    [],
  );
  const wood = useMemo(
    () => new MeshStandardMaterial({ color: hull, roughness: 0.85 }),
    [hull],
  );
  const sail = useMemo(
    () => new MeshStandardMaterial({ color: "#D8D0BC", roughness: 1 }),
    [],
  );
  useEffect(
    () => () => {
      Object.values(parts).forEach((g) => g.dispose());
      wood.dispose();
      sail.dispose();
    },
    [parts, wood, sail],
  );
  return (
    <group scale={scale}>
      <mesh
        geometry={parts.hull}
        material={wood}
        position={[0, 0.12, 0]}
        scale={[0.9, 0.32, 0.3]}
      />
      <mesh geometry={parts.mast} material={wood} position={[-0.05, 0.85, 0]} />
      <mesh
        geometry={parts.boom}
        material={sail}
        position={[-0.3, 0.32, 0]}
        rotation={[0, 0, Math.PI / 2 - 0.08]}
      />
    </group>
  );
}

/** An iron anchor hanging from its ring: shank, stock and two curved arms ending in flukes. Ring at the origin, about 1.4 tall. */
export function Anchor({ color = COAST.iron }: { color?: string }) {
  const parts = useMemo(
    () => ({
      ring: new TorusGeometry(0.1, 0.022, 8, 24),
      shank: new CylinderGeometry(0.035, 0.04, 1.2, 10),
      stock: new CylinderGeometry(0.03, 0.03, 0.6, 8),
      arms: new TorusGeometry(0.42, 0.04, 8, 32, Math.PI),
      fluke: new ConeGeometry(0.09, 0.2, 4),
    }),
    [],
  );
  const iron = useMemo(
    () => new MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.6 }),
    [color],
  );
  useEffect(
    () => () => {
      Object.values(parts).forEach((g) => g.dispose());
      iron.dispose();
    },
    [parts, iron],
  );
  return (
    <group>
      <mesh geometry={parts.ring} material={iron} position={[0, -0.08, 0]} />
      <mesh geometry={parts.shank} material={iron} position={[0, -0.78, 0]} />
      <mesh
        geometry={parts.stock}
        material={iron}
        position={[0, -0.3, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={parts.arms}
        material={iron}
        position={[0, -0.96, 0]}
        rotation={[0, 0, Math.PI]}
      />
      <mesh
        geometry={parts.fluke}
        material={iron}
        position={[-0.42, -0.86, 0]}
        rotation={[0, 0, 0.5]}
        scale={[1, 1, 0.4]}
      />
      <mesh
        geometry={parts.fluke}
        material={iron}
        position={[0.42, -0.86, 0]}
        rotation={[0, 0, -0.5]}
        scale={[1, 1, 0.4]}
      />
    </group>
  );
}

/** A squall of mist across the whole view, held just in front of the camera; covers the loop's reset. */
export function Squall({
  opacity,
  color = COAST.mist,
}: {
  opacity: RefObject<number>;
  color?: string;
}) {
  const ref = useRef<Mesh>(null);
  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
        fog: false,
      }),
    [color],
  );
  useEffect(() => () => material.dispose(), [material]);
  useFrame(({ camera }) => {
    const m = ref.current;
    if (!m) return;
    m.position.copy(camera.position);
    m.quaternion.copy(camera.quaternion);
    m.translateZ(-0.5);
    setOpacity(material, opacity.current);
    m.visible = opacity.current > 0.001;
  });
  return (
    <mesh ref={ref} material={material} renderOrder={100} frustumCulled={false}>
      <planeGeometry args={[4, 4]} />
    </mesh>
  );
}

const COUNTLESS_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uPixelRatio;
uniform float uReveal;
uniform float uSize;
varying float vAlpha;
void main() {
  float shown = smoothstep(aSeed - 0.04, aSeed, uReveal);
  float twinkle = 0.65 + 0.35 * sin(uTime * (1.2 + aSeed * 3.0) + aSeed * 90.0);
  vAlpha = shown * twinkle;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = uSize * (0.5 + fract(aSeed * 37.0) * 0.8) * uPixelRatio * shown;
  gl_Position = projectionMatrix * mv;
}`;

const COUNTLESS_FRAG = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = smoothstep(1.0, 0.0, d) * vAlpha;
  gl_FragColor = vec4(uColor * a, a);
}`;

interface CountlessProps {
  /** Point positions; their order is the order they appear in. */
  points: Float32Array;
  /** 0–1, how many have appeared, read every frame. */
  reveal: RefObject<number>;
  size?: number;
  color?: string;
}

/** Points that appear one after another until they cannot be counted, each twinkling: stars overhead, or glints in the sand. */
export function Countless({
  points,
  reveal,
  size = 2.4,
  color = "#F4F1E6",
}: CountlessProps) {
  const pixelRatio = useThree((s) => s.viewport.dpr);
  const ref = useRef<Points>(null);
  const geometry = useMemo(() => {
    const n = points.length / 3;
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) seed[i] = Math.pow(i / n, 1.6);
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(points, 3));
    g.setAttribute("aSeed", new BufferAttribute(seed, 1));
    return g;
  }, [points]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: COUNTLESS_VERT,
        fragmentShader: COUNTLESS_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
          uReveal: { value: 0 },
          uSize: { value: size },
          uColor: { value: new Color(color) },
        },
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    [size, color],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  useFrame((_, dt) => {
    const m = ref.current?.material as ShaderMaterial | undefined;
    if (!m) return;
    setUniform(m, "uTime", m.uniforms.uTime.value + Math.min(dt, 0.05));
    setUniform(m, "uPixelRatio", pixelRatio);
    setUniform(m, "uReveal", reveal.current);
  });
  return (
    <points
      ref={ref}
      geometry={geometry}
      material={material}
      frustumCulled={false}
      renderOrder={-5}
    />
  );
}
