"use client";

import { useEffect, useMemo, useRef } from "react";
import { Environment, Lightformer } from "@react-three/drei";
import {
  CatmullRomCurve3,
  DoubleSide,
  Group,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  Object3D,
  Shape,
  ShapeGeometry,
  TubeGeometry,
  Vector3,
  type PointLight,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers, Sky } from "../primitives/Earth";
import { easeInOutCubic, easeOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setOpacity } from "../primitives/mutate";

const PERIOD = 14;
const PAIRS = 13;
const RADIUS = 1;
/** Each branch sweeps from the bottom of the ring to just short of the top, leaving the laurel's open crown. */
const ARC_START = -Math.PI / 2;
const ARC_END = Math.PI / 2 - 0.32;
const GROW_START = 0.8;
const GROW_TIME = 4.4;
const EMBER_BOX: [number, number, number] = [5, 3.5, 2];

function leafGeometry() {
  const s = new Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(0.09, 0.12, 0, 0.34);
  s.quadraticCurveTo(-0.09, 0.12, 0, 0);
  const g = new ShapeGeometry(s, 6);
  const pos = g.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const x = pos.getX(i);
    pos.setZ(i, -0.12 * y * y + 0.25 * x * x);
  }
  g.computeVertexNormals();
  return g;
}

interface Leaf {
  /** 0–1 along its branch, when the growing stem reaches it. */
  at: number;
  matrix: Matrix4;
}

function branchPoint(side: 1 | -1, k: number, out: Vector3) {
  const a = lerp(ARC_START, ARC_END, k);
  return out.set(side * Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, 0);
}

function buildLeaves(): Leaf[] {
  const o = new Object3D();
  const p = new Vector3();
  const q = new Vector3();
  const leaves: Leaf[] = [];
  for (const side of [1, -1] as const) {
    for (let i = 0; i < PAIRS; i++) {
      const k = (i + 0.6) / PAIRS;
      branchPoint(side, k, p);
      branchPoint(side, Math.min(1, k + 0.01), q);
      const tangent = Math.atan2(q.y - p.y, q.x - p.x) - Math.PI / 2;
      const size = lerp(1.05, 0.62, k);
      for (const out of [1, -1]) {
        o.position.copy(p);
        o.rotation.set(0, out * 0.35, tangent + out * side * -0.6);
        o.scale.setScalar(size);
        o.updateMatrix();
        leaves.push({ at: k, matrix: o.matrix.clone() });
      }
    }
  }
  return leaves;
}

export function CrownedScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const wreath = useRef<Group>(null);
  const leavesMesh = useRef<InstancedMesh>(null);
  const key = useRef<PointLight>(null);
  const pool = useRef<ShaderMaterial>(null);
  const low = useRef<ShaderMaterial>(null);
  const scratch = useMemo(() => ({ m: new Matrix4(), s: new Matrix4() }), []);

  const leaf = useMemo(() => leafGeometry(), []);
  const leaves = useMemo(() => buildLeaves(), []);
  const gold = useMemo(() => new MeshStandardMaterial({ color: "#C9A24A", metalness: 0.85, roughness: 0.32, envMapIntensity: 1.3, side: DoubleSide, transparent: true }), []);
  const stems = useMemo(
    () =>
      ([1, -1] as const).map((side) => {
        const pts = Array.from({ length: 24 }, (_, i) => branchPoint(side, i / 23, new Vector3()));
        return new TubeGeometry(new CatmullRomCurve3(pts), 96, 0.022, 6, false);
      }),
    [],
  );
  useEffect(
    () => () => {
      leaf.dispose();
      gold.dispose();
      stems.forEach((g) => g.dispose());
    },
    [leaf, gold, stems],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(0, 0.2, mobile ? 8.6 : 6.8);
    camera.lookAt(0, 0.1, 0);
    const p = t % PERIOD;
    const grow = (p - GROW_START) / GROW_TIME;
    const rise = easeInOutCubic((p - 3.4) / 4.2);
    const fade = smoothstep(0, 0.8, p) * (1 - smoothstep(12.8, 14, p));

    const w = wreath.current;
    if (w) {
      w.position.y = lerp(-1.25, 0.25, rise);
      w.rotation.x = lerp(-1.05, -0.12, rise);
      w.rotation.y = Math.sin(t * 0.35) * 0.28;
      w.scale.setScalar(mobile ? 0.9 : 1);
    }
    setOpacity(gold, fade);
    const drawn = Math.floor(Math.max(0, Math.min(1, grow)) * 96 * 6 * 6);
    stems.forEach((g) => g.setDrawRange(0, drawn));

    const mesh = leavesMesh.current;
    if (mesh) {
      leaves.forEach((l, i) => {
        const s = easeOutCubic((grow - l.at) / 0.12);
        scratch.s.makeScale(Math.max(0.001, s), Math.max(0.001, s), Math.max(0.001, s));
        scratch.m.multiplyMatrices(l.matrix, scratch.s);
        mesh.setMatrixAt(i, scratch.m);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }
    if (key.current) key.current.intensity = lerp(4, 38, rise) * fade;
    if (pool.current) pool.current.uniforms.uAlpha.value = 0.35 * rise * fade;
    if (low.current) low.current.uniforms.uAlpha.value = 0.22 * (1 - rise) * fade;
  });

  return (
    <>
      <Sky top="#0C0A08" horizon="#1A140F" glow="#3A2714" horizonY={-2.4} glowStrength={0.45} />
      <hemisphereLight args={["#F3D38A", "#1A140F", 0.25]} />
      <pointLight ref={key} position={[0.6, 2.8, 2.6]} intensity={4} distance={12} decay={1.8} color="#F3D38A" />
      <pointLight position={[-2.5, -0.5, 1.5]} intensity={3} distance={8} decay={2} color="#B7892C" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={3} color="#F3D38A" position={[-2, 3, 3]} scale={[4, 2, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={1.5} color="#B7892C" position={[3, 1, -2]} scale={3} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.6} color="#EEE4CF" position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[6, 6, 1]} />
      </Environment>

      <Glow position={[0, -1.35, -0.5]} size={1} scaleX={mobile ? 3 : 4.2} scaleY={0.5} color="#3A2A18" alpha={0} power={1.6} renderOrder={1} onMaterial={(m) => { low.current = m; }} />
      <Glow position={[0, 0.3, -1.2]} size={mobile ? 5 : 6.5} color="#B7892C" alpha={0} power={2.2} renderOrder={1} onMaterial={(m) => { pool.current = m; }} />

      <group ref={wreath} position={[0, -1.25, 0]}>
        {stems.map((g, i) => (
          <mesh key={i} geometry={g} material={gold} />
        ))}
        <instancedMesh ref={leavesMesh} args={[leaf, gold, leaves.length]} frustumCulled={false} />
      </group>
      <Embers count={mobile ? 18 : 36} box={EMBER_BOX} position={[0, -1.4, 0]} rise={0.05} size={2} alpha={0.55} />
      {effects && <SceneEffects bloom={0.45} />}
    </>
  );
}
