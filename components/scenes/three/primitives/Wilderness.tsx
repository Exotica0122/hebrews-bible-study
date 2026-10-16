"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BoxGeometry,
  Color,
  CylinderGeometry,
  ExtrudeGeometry,
  type InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  PlaneGeometry,
  Quaternion,
  Shape,
  ShaderMaterial,
  Vector3,
  type Group,
} from "three";
import { Sky } from "./Earth";
import { Flames } from "./Flames";
import { Glow } from "./Glow";
import { Starfield } from "./Starfield";

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

/** Dune height above the floor at (x, z): long crests with a gentle windward slope and a steep slip face, flattened inside the clearing. */
function duneHeight(x: number, z: number, clear: Clearing, amp = 1) {
  const u = x * 0.8 + z * 0.6 + Math.sin(z * 0.23 + x * 0.05) * 2.2;
  const s = fract(u * 0.13);
  const crest = s < 0.72 ? s / 0.72 : (1 - s) / 0.28;
  const swell =
    0.6 +
    0.8 * (0.5 + 0.5 * Math.sin(x * 0.07 + 1.3) * Math.sin(z * 0.09 + 0.4));
  const h =
    crest * crest * (3 - 2 * crest) * 0.9 * swell +
    0.18 * Math.sin(x * 0.31 + z * 0.17) +
    0.12 * Math.sin(x * 0.53 - z * 0.41);
  const d = Math.hypot(x - clear[0], (z - clear[1]) * 1.2);
  const t = Math.min(1, Math.max(0, (d - clear[2]) / (clear[2] * 1.6 + 2)));
  const open = t * t * (3 - 2 * t);
  return Math.max(0, h + 0.2) * amp * open * (1 + Math.max(0, -z) * 0.035);
}

/** Sculpted, flat-shaded dunes lit by the low sun, running from under the camera to the horizon. */
export function DuneField({
  y,
  clear = [0, 0, 3],
  amp = 1,
  color = DUSK.sand,
  near = 10,
  far = -48,
  width = 120,
  glow = 0.08,
}: {
  y: number;
  clear?: Clearing;
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
    const g = new PlaneGeometry(width, depth, 150, 90);
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0, (near + far) / 2);
    const pos = g.getAttribute("position");
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, duneHeight(x, z, clear, amp));
    }
    g.computeVertexNormals();
    return g;
  }, [clear, amp, near, far, width]);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        roughness: 1,
        flatShading: true,
        emissive: color,
        emissiveIntensity: glow,
      }),
    [color, glow],
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

/** Matte cloth, wood or metal for the camp, flat-shaded so folds and edges read under the low sun. */
function useDuskMaterial(
  color: string,
  opts: { roughness?: number; metalness?: number; emissive?: number } = {},
) {
  const { roughness = 0.95, metalness = 0, emissive = 0 } = opts;
  const m = useMemo(
    () =>
      new MeshStandardMaterial({
        color,
        roughness,
        metalness,
        flatShading: true,
        emissive: color,
        emissiveIntensity: emissive,
      }),
    [color, roughness, metalness, emissive],
  );
  useEffect(() => () => m.dispose(), [m]);
  return m;
}

/** A goat-hair tent in cross-section: a low ridge with the cloth pulled out to stakes. Extruded along z, base at the origin. */
function tentGeometry(length: number) {
  const s = new Shape();
  s.moveTo(-0.55, 0);
  s.lineTo(-0.44, 0.24);
  s.lineTo(-0.16, 0.44);
  s.lineTo(0, 0.5);
  s.lineTo(0.16, 0.44);
  s.lineTo(0.44, 0.24);
  s.lineTo(0.55, 0);
  s.closePath();
  const g = new ExtrudeGeometry(s, { depth: length, bevelEnabled: false });
  g.translate(0, 0, -length / 2);
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

const TENT_SHADES = ["#3E2E28", "#4A362C", "#33261F", "#56402F", "#2E2420"];

/** Many goat-hair tents in one draw, each a slightly different weave; lit doorways glow on the side facing +z. */
export function Tents({
  spots,
  y,
  lamps = true,
}: {
  spots: TentSpot[];
  y: number;
  lamps?: boolean;
}) {
  const mesh = useRef<InstancedMesh>(null);
  const geometry = useMemo(() => tentGeometry(1.3), []);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#FFFFFF",
        roughness: 1,
        flatShading: true,
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
  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const mat = new Matrix4();
    const q = new Quaternion();
    const up = new Vector3(0, 1, 0);
    const c = new Color();
    spots.forEach((t, i) => {
      mat.compose(
        new Vector3(t.x, y, t.z),
        q.setFromAxisAngle(up, t.r),
        new Vector3(t.s, t.s, t.s),
      );
      m.setMatrixAt(i, mat);
      m.setColorAt(i, c.set(TENT_SHADES[i % TENT_SHADES.length]));
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [spots, y]);
  return (
    <>
      <instancedMesh
        ref={mesh}
        args={[geometry, material, spots.length]}
        frustumCulled={false}
      />
      {lamps &&
        spots
          .filter((t) => t.lit)
          .map((t, i) => (
            <Glow
              key={i}
              position={[
                t.x + Math.sin(t.r) * 0.66 * t.s,
                y + 0.16 * t.s,
                t.z + Math.cos(t.r) * 0.66 * t.s,
              ]}
              size={0.4 * t.s}
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
const TENT_X = -1.05;
const TENT_L = 1.3;
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

/** The draped coverings of the tent, ram skins dyed red over goat hair, falling almost to the ground (Exod 26:7–14). */
function coveringGeometry() {
  const s = new Shape();
  s.moveTo(-0.3, 0);
  s.lineTo(-0.27, 0.36);
  s.quadraticCurveTo(-0.25, 0.47, -0.13, 0.5);
  s.lineTo(0.13, 0.5);
  s.quadraticCurveTo(0.25, 0.47, 0.27, 0.36);
  s.lineTo(0.3, 0);
  s.lineTo(0.27, 0);
  s.lineTo(0.24, 0.34);
  s.quadraticCurveTo(0.22, 0.44, 0.12, 0.46);
  s.lineTo(-0.12, 0.46);
  s.quadraticCurveTo(-0.22, 0.44, -0.24, 0.34);
  s.lineTo(-0.27, 0);
  s.closePath();
  const g = new ExtrudeGeometry(s, {
    depth: TENT_L + 0.06,
    bevelEnabled: false,
  });
  g.translate(0, 0, -(TENT_L + 0.06) / 2);
  return g;
}

interface TabernacleProps {
  position?: [number, number, number];
  scale?: number;
  /** Build progress, each 0–1 and read every frame; omit for the finished tabernacle. */
  posts?: RefObject<number>;
  linen?: RefObject<number>;
  tent?: RefObject<number>;
}

/** The tabernacle and its court (Exod 26–27): linen hangings on bronze posts, the gate screen in blue, purple and scarlet, the bronze altar and laver, and the tent with its gold boards and dark coverings. Floor at the origin. */
export function Tabernacle({
  position = [0, 0, 0],
  scale = 1,
  posts,
  linen,
  tent,
}: TabernacleProps) {
  const postMesh = useRef<InstancedMesh>(null);
  const hangings = useRef<Group>(null);
  const tentGroup = useRef<Group>(null);
  const altarGroup = useRef<Group>(null);
  const geo = useMemo(
    () => ({
      post: new CylinderGeometry(0.018, 0.024, COURT.h + 0.04, 6),
      box: new BoxGeometry(1, 1, 1),
      covering: coveringGeometry(),
      pillar: new CylinderGeometry(0.016, 0.016, 0.44, 6),
      laver: new CylinderGeometry(0.07, 0.05, 0.08, 10),
    }),
    [],
  );
  useEffect(() => () => Object.values(geo).forEach((g) => g.dispose()), [geo]);
  const mats = {
    linen: useDuskMaterial(DUSK.linen, { emissive: 0.32 }),
    screen: useDuskMaterial(DUSK.screen, { emissive: 0.12 }),
    bronze: useDuskMaterial(DUSK.bronze, { roughness: 0.5, metalness: 0.5 }),
    gold: useDuskMaterial(DUSK.gold, {
      roughness: 0.35,
      metalness: 0.7,
      emissive: 0.1,
    }),
    skins: useDuskMaterial(DUSK.skins),
    hair: useDuskMaterial(DUSK.hair),
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
    if (m) {
      const built = posts?.current ?? 1;
      POSTS.forEach(([x, z], i) => {
        const at = (i / POSTS.length) * 0.75;
        const k = Math.max(0.001, Math.min(1, (built - at) / 0.25));
        const ease = 1 - Math.pow(1 - k, 3);
        scratch.p.set(x, ((COURT.h + 0.04) * ease) / 2, z);
        scratch.s.set(1, ease, 1);
        scratch.m.compose(scratch.p, scratch.q, scratch.s);
        m.setMatrixAt(i, scratch.m);
      });
      m.instanceMatrix.needsUpdate = true;
    }
    const hung = Math.max(0.001, linen?.current ?? 1);
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

  const { l, w, gate } = COURT;
  const side = w - gate;
  const tentFront = TENT_X + TENT_L / 2;
  return (
    <group position={position} scale={scale}>
      <instancedMesh
        ref={postMesh}
        args={[geo.post, mats.bronze, POSTS.length]}
        frustumCulled={false}
      />
      <group ref={hangings}>
        <mesh
          geometry={geo.box}
          material={mats.linen}
          position={[0, COURT.h / 2, -w]}
          scale={[l * 2, COURT.h, 0.015]}
        />
        <mesh
          geometry={geo.box}
          material={mats.linen}
          position={[0, COURT.h / 2, w]}
          scale={[l * 2, COURT.h, 0.015]}
        />
        <mesh
          geometry={geo.box}
          material={mats.linen}
          position={[-l, COURT.h / 2, 0]}
          scale={[0.015, COURT.h, w * 2]}
        />
        <mesh
          geometry={geo.box}
          material={mats.linen}
          position={[l, COURT.h / 2, -(w - side / 2)]}
          scale={[0.015, COURT.h, side]}
        />
        <mesh
          geometry={geo.box}
          material={mats.linen}
          position={[l, COURT.h / 2, w - side / 2]}
          scale={[0.015, COURT.h, side]}
        />
        <mesh
          geometry={geo.box}
          material={mats.screen}
          position={[l, COURT.h / 2, 0]}
          scale={[0.015, COURT.h, gate * 2]}
        />
      </group>
      <group ref={altarGroup} position={[ALTAR_X, 0, 0]}>
        <mesh
          geometry={geo.box}
          material={mats.bronze}
          position={[0, 0.08, 0]}
          scale={[0.3, 0.16, 0.3]}
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
            scale={0.04}
          />
        ))}
        <mesh
          geometry={geo.laver}
          material={mats.bronze}
          position={[-0.55, 0.04, 0]}
        />
      </group>
      <group ref={tentGroup}>
        <mesh
          geometry={geo.box}
          material={mats.gold}
          position={[TENT_X, 0.21, 0]}
          scale={[TENT_L, 0.42, 0.44]}
        />
        <mesh
          geometry={geo.covering}
          material={mats.skins}
          position={[TENT_X, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <mesh
          geometry={geo.box}
          material={mats.hair}
          position={[TENT_X, 0.505, 0]}
          scale={[TENT_L + 0.08, 0.02, 0.3]}
        />
        {[-0.2, -0.1, 0, 0.1, 0.2].map((z) => (
          <mesh
            key={z}
            geometry={geo.pillar}
            material={mats.gold}
            position={[tentFront + 0.04, 0.22, z]}
          />
        ))}
        <mesh
          geometry={geo.box}
          material={mats.screen}
          position={[tentFront + 0.02, 0.22, 0]}
          scale={[0.01, 0.42, 0.44]}
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
}: {
  source?: [number, number];
  rings?: number;
  round?: boolean;
} = {}) {
  return new ShaderMaterial({
    vertexShader: WATER_VERT,
    fragmentShader: round
      ? WATER_FRAG
      : WATER_FRAG.replace(
          "float edge = 1.0 - smoothstep(0.42, 0.5, length(vUv - 0.5));",
          "float edge = smoothstep(0.0, 0.08, vUv.y) * (1.0 - smoothstep(0.92, 1.0, vUv.y));",
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

/** “By night in a pillar of fire to give them light” (Exod 13:21): a tall column of rising flame over a wide glow. */
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
  return (
    <group>
      <Glow
        position={[x, y + height * 0.5, z - 0.1]}
        size={1}
        scaleX={height * 0.9}
        scaleY={height * 1.5}
        color="#8A4B2E"
        alpha={0.28}
        power={2.2}
        renderOrder={2}
      />
      <Glow
        position={[x, y + height * 0.45, z]}
        size={1}
        scaleX={height * 0.16}
        scaleY={height * 1.05}
        color={DUSK.fire}
        inner="#FFE3B0"
        alpha={0.75}
        power={1.5}
        renderOrder={3}
      />
      <Flames
        emitters={[[x, y, z]]}
        count={mobile ? 70 : 140}
        rise={height}
        size={mobile ? 7 : 9}
        gust={gust}
      />
    </group>
  );
}
