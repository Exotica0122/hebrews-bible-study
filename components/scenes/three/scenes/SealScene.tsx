"use client";

import { useEffect, useMemo, useRef } from "react";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { damp } from "maath/easing";
import {
  BufferAttribute,
  Group,
  LatheGeometry,
  RingGeometry,
  Vector2,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { CloudFloor, HEAVEN, HeavenSky } from "../primitives/Heavens";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

/** Radius of the seal's face, the device cut into it, and the wax pool. */
const FACE_R = 0.9;
const WAX_R = 1.3;
const RELIEF = 0.07;
const WAX_H = 0.16;
const TOP = 0.02;
const HOVER_Y = 2.4;
const PRESS_AT = 1.5;
const PRESS_END = 2.3;
const LIFT_END = 3.6;
const SHOW_END = 5;
const RAYS = 16;

/** The seal's device, a sun in glory: rim, inner ring, rays and a central boss, as relief height 0–1 at radius `u` (0–1 of the face) and angle `a`. */
function device(u: number, a: number) {
  const band = (lo: number, hi: number, soft = 0.022) =>
    smoothstep(lo - soft, lo + soft, u) *
    (1 - smoothstep(hi - soft, hi + soft, u));
  const rim = band(0.9, 0.99);
  const ring = band(0.8, 0.84);
  const boss = 1 - smoothstep(0.165, 0.205, u);
  const sector = (a / (Math.PI * 2)) * RAYS;
  const i = Math.round(sector);
  const long = i % 2 === 0;
  const off = Math.abs(sector - i) * ((Math.PI * 2) / RAYS) * u;
  const width = long ? 0.045 : 0.028;
  const ray =
    (1 - smoothstep(width - 0.016, width + 0.016, off)) *
    band(0.27, long ? 0.72 : 0.6, 0.02);
  return Math.max(rim, ring, boss, ray);
}

/** A disc meshed in rings so its surface can carry the device: the seal's face (relief standing out) or the wax (the same device pressed in). */
function discGeometry(radius: number, spokes: number, rings: number) {
  const g = new RingGeometry(0.0001, radius, spokes, rings);
  g.rotateX(-Math.PI / 2);
  return g;
}

/** Shape the wax pool: a soft puddle with an uneven rim, the device pressed `k` deep into its middle and a lip squeezed up round the seal's edge. */
function pressWax(g: RingGeometry, k: number) {
  const pos = g.getAttribute("position") as BufferAttribute;
  const arr = pos.array as Float32Array;
  for (let i = 0; i < pos.count; i++) {
    const x = arr[i * 3];
    const z = arr[i * 3 + 2];
    const r = Math.hypot(x, z);
    const a = Math.atan2(z, x);
    const edge =
      WAX_R * (0.97 + 0.012 * Math.sin(a * 3 + 1) + 0.008 * Math.sin(a * 7));
    const dome = Math.pow(1 - smoothstep(edge * 0.72, edge, r), 0.6);
    const u = r / FACE_R;
    const well =
      u < 1
        ? 0.035 + RELIEF * (1 - device(u, (a + Math.PI * 2) % (Math.PI * 2)))
        : 0;
    const lip = Math.exp(-Math.pow((u - 1.06) * 9, 2)) * 0.03;
    arr[i * 3 + 1] = WAX_H * dome + k * (lip - (u < 1 ? well : 0));
  }
  pos.needsUpdate = true;
  g.computeVertexNormals();
}

/** Raise the device on the seal's face, pointing down. */
function cutFace(g: RingGeometry) {
  const pos = g.getAttribute("position") as BufferAttribute;
  const arr = pos.array as Float32Array;
  for (let i = 0; i < pos.count; i++) {
    const x = arr[i * 3];
    const z = arr[i * 3 + 2];
    const u = Math.hypot(x, z) / FACE_R;
    const a = (Math.atan2(z, x) + Math.PI * 2) % (Math.PI * 2);
    arr[i * 3 + 1] = RELIEF * device(Math.min(u, 0.999), a);
  }
  g.rotateX(Math.PI);
  g.computeVertexNormals();
}

/** The seal's handle, turned on a lathe: a knob, a waisted grip and a flared collar onto the brass head. */
const HANDLE: [number, number][] = [
  [0, 2.35],
  [0.2, 2.32],
  [0.3, 2.2],
  [0.28, 2.05],
  [0.16, 1.92],
  [0.13, 1.6],
  [0.16, 1.2],
  [0.24, 0.9],
  [0.36, 0.72],
  [0.42, 0.62],
  [0, 0.62],
];
const HEAD: [number, number][] = [
  [FACE_R, 0],
  [FACE_R + 0.03, 0.04],
  [FACE_R + 0.03, 0.22],
  [FACE_R - 0.05, 0.3],
  [0.62, 0.42],
  [0.5, 0.56],
  [0.44, 0.64],
  [0, 0.64],
];

const PLINTH: [number, number][] = [
  [2.34, -1.8],
  [2.1, -0.2],
  [2.1, -0.16],
  [2.22, -0.13],
  [2.24, -0.05],
  [2.2, -0.005],
  [2.14, 0],
  [0, 0],
];

/** “The exact imprint of his nature”: on a stone above the clouds a gold signet comes down into warm wax and lifts away, then turns its face to show the sun in glory it has pressed there, line for line. */
export function SealScene({ mobile, effects, drag }: SceneProps) {
  const seal = useRef<Group>(null);
  const turntable = useRef<Group>(null);
  const spin = useRef(0);
  const pressed = useRef(0);
  const glow = useRef<ShaderMaterial | null>(null);
  useResetCameraOnUnmount();

  const geo = useMemo(() => {
    const wax = discGeometry(WAX_R, mobile ? 260 : 380, mobile ? 120 : 170);
    pressWax(wax, 0);
    const face = discGeometry(FACE_R, 380, 140);
    cutFace(face);
    return {
      wax,
      face,
      handle: new LatheGeometry(
        HANDLE.map(([r, y]) => new Vector2(r, y)),
        40,
      ),
      head: new LatheGeometry(
        HEAD.map(([r, y]) => new Vector2(r, y)),
        64,
      ),
      plinth: new LatheGeometry(
        PLINTH.map(([r, y]) => new Vector2(r, y)),
        96,
      ),
    };
  }, [mobile]);
  useEffect(() => () => Object.values(geo).forEach((g) => g.dispose()), [geo]);

  useSceneTime((t, dt, { camera }) => {
    camera.position.set(0, mobile ? 4 : 3.2, mobile ? 9.5 : 7.2);
    camera.lookAt(0, mobile ? -0.4 : 0.6, 0);

    const down = easeInOutCubic((t - 0.4) / (PRESS_AT - 0.4));
    const press = smoothstep(PRESS_AT - 0.15, PRESS_END - 0.3, t);
    const lift = easeInOutCubic((t - PRESS_END) / (LIFT_END - PRESS_END));
    const show = easeInOutCubic(
      (t - LIFT_END + 0.4) / (SHOW_END - LIFT_END + 0.4),
    );
    const away = mobile ? 1.05 : 1.55;
    if (seal.current) {
      const contact = TOP - press * 0.05;
      seal.current.position.y =
        lerp(lerp(HOVER_Y, contact, down), 1.45, lift) +
        Math.sin(t * 0.9) * 0.04 * show;
      seal.current.position.x = away * show;
      seal.current.position.z = 0.4 * show;
      seal.current.rotation.x = -1.05 * show;
      seal.current.rotation.z = -0.25 * show;
    }

    const k = press;
    if (Math.abs(k - pressed.current) > 0.002) {
      pressed.current = k;
      pressWax(geo.wax, k);
    }

    const d = drag?.current;
    if (d?.active) spin.current = d.dx * 0.01;
    if (turntable.current)
      damp(turntable.current.rotation, "y", spin.current + t * 0.05, 0.3, dt);
    if (glow.current)
      setUniform(
        glow.current,
        "uAlpha",
        0.03 + 0.2 * press * (1 - lift) + 0.04 * show,
      );
  });

  return (
    <>
      <fog attach="fog" args={[HEAVEN.haze, 12, 50]} />
      <group position={[0, 1.2, 0]}>
        <HeavenSky horizonY={-1} stars={mobile ? 260 : 500} />
      </group>
      <CloudFloor y={-2.6} warm={[0, 0]} />
      <mesh geometry={geo.plinth}>
        <meshStandardMaterial color="#6E6254" roughness={0.9} />
      </mesh>
      <hemisphereLight args={["#F3D38A", "#241E17", 0.5]} />
      <directionalLight position={[-4, 3, 2]} intensity={2.8} color="#FFE4B0" />
      <pointLight
        position={[2.5, 1.5, -2]}
        intensity={10}
        color="#B7892C"
        decay={2}
      />
      <Environment resolution={64} frames={1}>
        <Lightformer
          form="rect"
          intensity={3}
          color="#F3D38A"
          position={[-3, 4, 3]}
          scale={[4, 2, 1]}
          target={[0, 0.5, 0]}
        />
        <Lightformer
          form="ring"
          intensity={1.4}
          color="#B7892C"
          position={[3.5, 2, -3]}
          scale={3}
          target={[0, 0.5, 0]}
        />
        <Lightformer
          form="rect"
          intensity={0.6}
          color="#EEE4CF"
          position={[0, 6, 0]}
          rotation-x={Math.PI / 2}
          scale={[6, 6, 1]}
        />
      </Environment>
      <ContactShadows
        position={[0, 0.011, 0]}
        opacity={0.55}
        scale={6}
        blur={2.2}
        far={3}
        color="#120d06"
        frames={Infinity}
      />
      <Glow
        position={[0, 0.3, -3]}
        size={12}
        color="#B7892C"
        alpha={0.04}
        power={2.5}
        renderOrder={1}
      />
      <Glow
        position={[0, 0.25, 0.4]}
        size={3.4}
        color="#F3D38A"
        alpha={0.1}
        power={2}
        renderOrder={3}
        billboard
        onMaterial={(m) => {
          glow.current = m;
        }}
      />

      <group ref={turntable}>
        <mesh geometry={geo.wax} position={[0, TOP, 0]}>
          <meshPhysicalMaterial
            color="#A32A1C"
            emissive="#2E0805"
            emissiveIntensity={0.4}
            roughness={0.5}
            clearcoat={0.25}
            clearcoatRoughness={0.5}
            envMapIntensity={0.55}
          />
        </mesh>
      </group>

      <group ref={seal} position={[0, HOVER_Y, 0]}>
        <mesh geometry={geo.face} position={[0, RELIEF, 0]}>
          <meshStandardMaterial
            color="#D4AA52"
            metalness={0.75}
            roughness={0.32}
            emissive="#5A3E12"
            emissiveIntensity={0.35}
            envMapIntensity={1.6}
          />
        </mesh>
        <mesh geometry={geo.head} position={[0, RELIEF, 0]}>
          <meshStandardMaterial
            color="#B88A36"
            metalness={0.95}
            roughness={0.25}
            envMapIntensity={1.5}
          />
        </mesh>
        <mesh position={[0, RELIEF + 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[FACE_R + 0.035, 0.022, 10, 64]} />
          <meshStandardMaterial
            color="#E2BC62"
            metalness={0.95}
            roughness={0.18}
            envMapIntensity={1.7}
          />
        </mesh>
        <mesh geometry={geo.handle} position={[0, RELIEF, 0]}>
          <meshStandardMaterial
            color="#3A2418"
            roughness={0.45}
            metalness={0.05}
            envMapIntensity={0.8}
          />
        </mesh>
        <mesh position={[0, RELIEF + 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.245, 0.03, 10, 40]} />
          <meshStandardMaterial
            color="#D9AE4E"
            metalness={0.95}
            roughness={0.2}
            envMapIntensity={1.6}
          />
        </mesh>
      </group>
      {effects && <SceneEffects bloom={0.45} />}
    </>
  );
}
