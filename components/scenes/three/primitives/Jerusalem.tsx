"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import {
  BackSide,
  BoxGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Float32BufferAttribute,
  IcosahedronGeometry,
  type InstancedMesh,
  Matrix4,
  PlaneGeometry,
  Quaternion,
  ShaderMaterial,
  Vector3,
} from "three";

/**
 * The home page: Jerusalem at dawn, seen west from the Mount of Olives across
 * the Kidron valley, the temple still standing as it was when Hebrews was
 * written. Lit limestone forms in warm morning light, not glow and particles.
 */
export const DAWN = {
  skyTop: "#4C5E86",
  skyTopDay: "#86A6CC",
  skyLow: "#D98F74",
  skyLowDay: "#F3D2A8",
  haze: "#E2BE9A",
  hazeEarly: "#B98478",
  sunEarly: "#FF9C6A",
  sunDay: "#FFE7C2",
  shade: "#B9C6DE",
  ground: "#7A5C40",
  earth: "#B79A72",
  olive: "#7C8458",
  oliveDark: "#5E6844",
  valley: "#8E7556",
  stone: ["#E2D3B4", "#D8C6A2", "#CDB894", "#E8DCC2", "#C9B28A"],
  wall: "#CBB48C",
  mount: "#D9C7A1",
  porch: "#E9DCC0",
  temple: "#F3ECDC",
  gold: "#D9AE4E",
  door: "#6A3B2A",
  trunk: "#5A4632",
  bird: "#3B3026",
};

/** Deterministic noise so tests and stills see the same city every time. */
export function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Ground height: the slope rising to the viewer, the Kidron, the city hill and the Judean hills beyond. */
export function groundHeight(x: number, z: number) {
  const olives = Math.max(0, (z - 3) * 0.16);
  const valley = -1.4 * Math.exp(-(((z - 1.5) / 2.2) ** 2));
  const city = 1.6 * Math.exp(-((x / 9) ** 2 + ((z + 7) / 5) ** 2));
  const hills =
    ((1.3 * Math.max(0, -z - 18)) / 10) *
    (0.55 + 0.45 * Math.sin(x * 0.21) * Math.sin(x * 0.06 + 1));
  return (
    olives +
    valley +
    city +
    hills +
    Math.sin(x * 0.9) * Math.cos(z * 0.7) * 0.06
  );
}

/** The temple mount platform, in the north-east of the city, nearest the viewer. */
export const MOUNT = { x: 3.8, z: -6, w: 5.2, d: 5.6 };
export const MOUNT_Y = groundHeight(MOUNT.x, MOUNT.z) + 0.2;

const tmpM = new Matrix4();
const tmpQ = new Quaternion();
const tmpP = new Vector3();
const tmpS = new Vector3();
const Y = new Vector3(0, 1, 0);

interface Box {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  r: number;
  c: string;
}

function useInstances(
  ref: React.RefObject<InstancedMesh | null>,
  boxes: Box[],
) {
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const col = new Color();
    boxes.forEach((b, i) => {
      tmpQ.setFromAxisAngle(Y, b.r);
      tmpM.compose(tmpP.set(b.x, b.y, b.z), tmpQ, tmpS.set(b.w, b.h, b.d));
      mesh.setMatrixAt(i, tmpM);
      mesh.setColorAt(i, col.set(b.c));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [ref, boxes]);
}

/** Gradient dome: dawn rose low, slate blue overhead; `dawn` (0..1) warms it into morning. */
export function DawnSky() {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        side: BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          dawn: { value: 0 },
          fade: { value: 1 },
          top0: { value: new Color(DAWN.skyTop) },
          top1: { value: new Color(DAWN.skyTopDay) },
          low0: { value: new Color(DAWN.skyLow) },
          low1: { value: new Color(DAWN.skyLowDay) },
        },
        vertexShader: /* glsl */ `
          varying float vH;
          void main() {
            vH = normalize(position).y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform float dawn, fade;
          uniform vec3 top0, top1, low0, low1;
          varying float vH;
          void main() {
            vec3 top = mix(top0, top1, dawn);
            vec3 low = mix(low0, low1, dawn);
            vec3 c = mix(low, top, smoothstep(0.0, 0.55, max(vH, 0.0)));
            gl_FragColor = vec4(c * fade, 1.0);
            #include <colorspace_fragment>
          }`,
      }),
    [],
  );
  return (
    <mesh material={material} renderOrder={-1}>
      <sphereGeometry args={[70, 32, 16]} />
    </mesh>
  );
}

/** One displaced sheet for all the land, coloured by place: olive slope, valley floor, pale city hill. */
export function Land({ segments }: { segments: number }) {
  const geometry = useMemo(() => {
    const g = new PlaneGeometry(90, 90, segments, segments);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    const colors: number[] = [];
    const earth = new Color(DAWN.earth);
    const olive = new Color(DAWN.olive);
    const valley = new Color(DAWN.valley);
    const city = new Color(DAWN.mount);
    const c = new Color();
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      p.setY(i, groundHeight(x, z));
      c.copy(earth);
      c.lerp(olive, Math.min(1, Math.max(0, (z - 3) / 3)) * 0.85);
      c.lerp(valley, Math.exp(-(((z - 1.5) / 1.6) ** 2)) * 0.5);
      c.lerp(city, Math.exp(-((x / 8) ** 2 + ((z + 7.5) / 4.5) ** 2)) * 0.45);
      const n = hash(i * 0.37) * 0.06 - 0.03;
      colors.push(c.r + n, c.g + n, c.b + n);
    }
    g.setAttribute("color", new Float32BufferAttribute(colors, 3));
    g.computeVertexNormals();
    return g;
  }, [segments]);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial vertexColors roughness={1} />
    </mesh>
  );
}

function cityBoxes(count: number): Box[] {
  const boxes: Box[] = [];
  for (let k = 0; boxes.length < count && k < count * 3; k++) {
    const x = -8 + hash(k + 1) * 14;
    const z = -12 + hash(k + 2) * 9;
    // Leave the temple mount and a street or two clear.
    if (x > 1.0 && z > -9.1) continue;
    if (Math.abs(x + 2.4) < 0.18 || Math.abs(z + 7.6) < 0.14) continue;
    const w = 0.35 + hash(k + 3) * 0.45;
    const d = 0.35 + hash(k + 4) * 0.45;
    const h = 0.25 + hash(k + 5) * 0.45;
    boxes.push({
      x,
      z,
      y: groundHeight(x, z) + h / 2 - 0.05,
      w,
      h,
      d,
      r: (hash(k + 6) - 0.5) * 0.25,
      c: DAWN.stone[Math.floor(hash(k + 7) * DAWN.stone.length)],
    });
  }
  return boxes;
}

function wallBoxes(): Box[] {
  const boxes: Box[] = [];
  const run = (x1: number, z1: number, x2: number, z2: number) => {
    const len = Math.hypot(x2 - x1, z2 - z1);
    const steps = Math.ceil(len / 0.6);
    const r = -Math.atan2(z2 - z1, x2 - x1);
    for (let s = 0; s < steps; s++) {
      const t = (s + 0.5) / steps;
      const x = x1 + (x2 - x1) * t;
      const z = z1 + (z2 - z1) * t;
      const g = groundHeight(x, z);
      boxes.push({
        x,
        z,
        y: g + 0.4,
        w: 0.65,
        h: 0.9,
        d: 0.22,
        r,
        c: DAWN.wall,
      });
      if (s % 5 === 0)
        boxes.push({
          x,
          z,
          y: g + 0.6,
          w: 0.5,
          h: 1.3,
          d: 0.5,
          r,
          c: DAWN.wall,
        });
    }
  };
  run(-8.5, -2.6, 6.6, -2.6);
  run(6.6, -2.6, 6.6, -12.6);
  run(-8.5, -2.6, -8.5, -12.6);
  run(-8.5, -12.6, 6.6, -12.6);
  // Herod's palace towers on the west, the Antonia fortress at the mount's north-west corner.
  [
    [-7.6, -5.2, 2.0],
    [-7.6, -6.2, 1.7],
    [-7.6, -7.0, 1.5],
  ].forEach(([x, z, h]) =>
    boxes.push({
      x,
      z,
      y: groundHeight(x, z) + h / 2,
      w: 0.6,
      h,
      d: 0.6,
      r: 0,
      c: DAWN.stone[1],
    }),
  );
  const ax = MOUNT.x - MOUNT.w / 2 + 0.3;
  const az = MOUNT.z - MOUNT.d / 2 + 0.2;
  boxes.push({
    x: ax,
    z: az,
    y: MOUNT_Y + 0.7,
    w: 1.4,
    h: 1.4,
    d: 1.1,
    r: 0,
    c: DAWN.wall,
  });
  [
    [-0.6, -0.45],
    [0.6, -0.45],
    [-0.6, 0.45],
    [0.6, 0.45],
  ].forEach(([dx, dz], i) =>
    boxes.push({
      x: ax + dx,
      z: az + dz,
      y: MOUNT_Y + (i === 3 ? 1.35 : 1.15),
      w: 0.32,
      h: i === 3 ? 2.7 : 2.3,
      d: 0.32,
      r: 0,
      c: DAWN.wall,
    }),
  );
  return boxes;
}

const UNIT_BOX = new BoxGeometry(1, 1, 1);

/** Houses, walls and towers as two instanced draws. */
export function City({ houses }: { houses: number }) {
  const houseRef = useRef<InstancedMesh>(null);
  const wallRef = useRef<InstancedMesh>(null);
  const homes = useMemo(() => cityBoxes(houses), [houses]);
  const walls = useMemo(() => wallBoxes(), []);
  useInstances(houseRef, homes);
  useInstances(wallRef, walls);
  return (
    <>
      <instancedMesh ref={houseRef} args={[UNIT_BOX, undefined, homes.length]}>
        <meshStandardMaterial roughness={0.95} />
      </instancedMesh>
      <instancedMesh ref={wallRef} args={[UNIT_BOX, undefined, walls.length]}>
        <meshStandardMaterial roughness={0.95} />
      </instancedMesh>
    </>
  );
}

/** The temple mount: platform, porticoes, inner court, and the sanctuary with its gilded front. */
export function TempleMount({
  goldRef,
}: {
  goldRef: React.RefObject<import("three").MeshStandardMaterial | null>;
}) {
  const { x, z, w, d } = MOUNT;
  const y = MOUNT_Y;
  const cols = [0, 1, 2, 3].map((i) => x - 0.55 + i * 0.37);
  return (
    <group>
      <mesh position={[x, y, z]}>
        <boxGeometry args={[w, 1.1, d]} />
        <meshStandardMaterial color={DAWN.mount} roughness={0.95} />
      </mesh>
      {(
        [
          [x, z + d / 2 - 0.1, w, 0.25],
          [x, z - d / 2 + 0.1, w, 0.25],
          [x - w / 2 + 0.1, z, 0.25, d],
          [x + w / 2 - 0.1, z, 0.25, d],
        ] as const
      ).map(([px, pz, pw, pd], i) => (
        <mesh key={i} position={[px, y + 0.75, pz]}>
          <boxGeometry args={[pw, 0.45, pd]} />
          <meshStandardMaterial color={DAWN.porch} roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[x, y + 0.72, z - 0.4]}>
        <boxGeometry args={[2.2, 0.35, 2.6]} />
        <meshStandardMaterial color={DAWN.porch} roughness={0.9} />
      </mesh>
      <mesh position={[x, y + 1.6, z - 0.8]}>
        <boxGeometry args={[1.0, 1.4, 1.5]} />
        <meshStandardMaterial color={DAWN.temple} roughness={0.6} />
      </mesh>
      <mesh position={[x, y + 2.0, z + 0.05]}>
        <boxGeometry args={[1.9, 2.3, 0.4]} />
        <meshStandardMaterial color={DAWN.temple} roughness={0.6} />
      </mesh>
      {cols.map((cx) => (
        <mesh key={cx} position={[cx, y + 1.3, z + 0.4]}>
          <cylinderGeometry args={[0.05, 0.05, 0.9, 8]} />
          <meshStandardMaterial color={DAWN.temple} roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[x, y + 1.45, z + 0.26]}>
        <boxGeometry args={[0.42, 0.9, 0.05]} />
        <meshStandardMaterial color={DAWN.door} roughness={0.8} />
      </mesh>
      <mesh position={[x, y + 3.18, z + 0.05]}>
        <boxGeometry args={[1.96, 0.1, 0.45]} />
        <meshStandardMaterial
          ref={goldRef}
          color={DAWN.gold}
          roughness={0.35}
          metalness={0.6}
          emissive={DAWN.gold}
          emissiveIntensity={0}
        />
      </mesh>
      <mesh position={[x, y + 1.05, z + 1.0]}>
        <boxGeometry args={[0.5, 0.3, 0.5]} />
        <meshStandardMaterial color={DAWN.porch} roughness={0.9} />
      </mesh>
    </group>
  );
}

const TRUNK = new CylinderGeometry(0.06, 0.12, 0.9, 6).translate(0, 0.45, 0);
const CANOPY = new IcosahedronGeometry(1, 0);

/** Olive trees on the slope in front of the viewer, framing the city from both sides. */
export function OliveGrove({ count }: { count: number }) {
  const trunkRef = useRef<InstancedMesh>(null);
  const leafRef = useRef<InstancedMesh>(null);
  const { trunks, leaves } = useMemo(() => {
    const trunks: Box[] = [];
    const leaves: Box[] = [];
    for (let i = 0; i < count; i++) {
      const side = i % 2 ? 1 : -1;
      const x = side * (5 + hash(i + 40) * 8);
      const z = 2.8 + hash(i + 41) * 3.4;
      const s = 0.45 + hash(i + 42) * 0.3;
      const g = groundHeight(x, z) - 0.05;
      trunks.push({
        x,
        z,
        y: g,
        w: s,
        h: s,
        d: s,
        r: hash(i + 43) * 6,
        c: DAWN.trunk,
      });
      for (let j = 0; j < 4; j++) {
        const r = (0.42 + hash(i * 7 + j) * 0.25) * s;
        leaves.push({
          x: x + (hash(i * 9 + j) - 0.5) * 0.8 * s,
          z: z + (hash(i * 11 + j) - 0.5) * 0.6 * s,
          y: g + (0.95 + hash(i * 13 + j) * 0.45) * s,
          w: r,
          h: r * 0.7,
          d: r,
          r: hash(i * 17 + j) * 6,
          c: j % 2 ? DAWN.olive : DAWN.oliveDark,
        });
      }
    }
    return { trunks, leaves };
  }, [count]);
  useInstances(trunkRef, trunks);
  useInstances(leafRef, leaves);
  return (
    <>
      <instancedMesh ref={trunkRef} args={[TRUNK, undefined, trunks.length]}>
        <meshStandardMaterial roughness={1} />
      </instancedMesh>
      <instancedMesh ref={leafRef} args={[CANOPY, undefined, leaves.length]}>
        <meshStandardMaterial roughness={1} flatShading />
      </instancedMesh>
    </>
  );
}

const BIRD = new ConeGeometry(0.03, 0.14, 3).rotateZ(Math.PI / 2);

/** A few birds crossing the morning sky; positions are written each frame by the scene. */
export function Birds({
  birdsRef,
  count,
}: {
  birdsRef: React.RefObject<InstancedMesh | null>;
  count: number;
}) {
  return (
    <instancedMesh ref={birdsRef} args={[BIRD, undefined, count]}>
      <meshBasicMaterial color={DAWN.bird} />
    </instancedMesh>
  );
}

export function placeBird(
  mesh: InstancedMesh,
  i: number,
  x: number,
  y: number,
  z: number,
) {
  tmpM.compose(tmpP.set(x, y, z), tmpQ.identity(), tmpS.set(1, 1, 1));
  mesh.setMatrixAt(i, tmpM);
  mesh.instanceMatrix.needsUpdate = true;
}
