"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  CatmullRomCurve3,
  Color,
  ConeGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  Shape,
  ShapeGeometry,
  TubeGeometry,
  Vector3,
  type Group,
  type InstancedMesh,
  type PointLight,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers } from "../primitives/Earth";
import { Squall } from "../primitives/Squall";
import { Courses, Flagstones } from "../primitives/Stonework";
import { Carved } from "../primitives/Salem";
import { MoonLights, NIGHT, NightSky } from "../primitives/Road";
import {
  easeInOutCubic,
  easeOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { lerpColor, setEmissive, setUniform } from "../primitives/mutate";

const PERIOD = 16;
const R = 0.42;
const LOW_Y = 0.3;
const HIGH_Y = 2.15;
const RISE_AT = 3;
const RISE_TIME = 5;
const GROW_AT = 4.6;
const GROW_TIME = 4.2;
const LEAVES = 30;
const THORNS = 70;
const TERRACE_Y = 0.85;
const ANGELS = [-2.6, -1.3, 0, 1.3, 2.6];
const THORN = new Color("#3A2A1C");
const GOLD = new Color("#9A7838");
const EMBER_BOX: [number, number, number] = [4, 3, 2];

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** One twisted strand of the thorn crown, lying flat round the y axis. */
function strand(phase: number) {
  return new CatmullRomCurve3(
    Array.from({ length: 40 }, (_, i) => {
      const a = (i / 40) * Math.PI * 2;
      return new Vector3(
        Math.cos(a) * (R + 0.035 * Math.sin(a * 7 + phase)),
        0.035 * Math.cos(a * 6 + phase * 1.3),
        Math.sin(a) * (R + 0.035 * Math.sin(a * 7 + phase)),
      );
    }),
    true,
  );
}

function leafGeometry() {
  const s = new Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(0.06, 0.08, 0, 0.22);
  s.quadraticCurveTo(-0.06, 0.08, 0, 0);
  const g = new ShapeGeometry(s, 6);
  const pos = g.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, -0.1 * y * y + 0.2 * x * x);
  }
  g.computeVertexNormals();
  return g;
}

/** Laurel leaves round the ring, two at each step, growing from the back toward the front on both sides. */
function laurel() {
  const out: { at: number; m: Matrix4 }[] = [];
  const up = new Vector3(0, 1, 0);
  for (const side of [1, -1]) {
    for (let i = 0; i < LEAVES / 2; i++) {
      const k = (i + 0.5) / (LEAVES / 2);
      const a = -Math.PI / 2 + side * k * Math.PI * 0.94;
      const p = new Vector3(Math.cos(a) * R, 0.02, Math.sin(a) * R);
      const tan = new Vector3(-Math.sin(a), 0, Math.cos(a)).multiplyScalar(
        side,
      );
      const nrm = new Vector3(Math.cos(a), 0, Math.sin(a));
      for (const o of [1, -1]) {
        const y = tan
          .clone()
          .multiplyScalar(0.8)
          .addScaledVector(nrm, o * 0.55)
          .addScaledVector(up, 0.35)
          .normalize();
        const x = new Vector3().crossVectors(y, up).normalize();
        const z = new Vector3().crossVectors(x, y);
        const m = new Matrix4().makeBasis(x, y, z).setPosition(p);
        m.scale(new Vector3(1, 1, 1).multiplyScalar(lerp(1.8, 1.3, k)));
        out.push({ at: k, m });
      }
    }
  }
  return out;
}

/** A wing in profile: a long curved leading edge and a scalloped trailing edge of primaries, extruded thin. Root at the origin, tip up and out to +x. */
function wingGeometry() {
  const s = new Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(0.25, 0.75, 0.55, 1.15);
  s.quadraticCurveTo(0.62, 0.7, 0.5, 0.2);
  for (let i = 0; i < 4; i++) {
    const x = 0.5 - (i + 1) * 0.12;
    s.quadraticCurveTo(x + 0.08, -0.25 - i * 0.04, x, -0.05 - i * 0.05);
  }
  s.lineTo(0, 0);
  const g = new ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: false });
  g.translate(0, 0, -0.015);
  return g;
}

/** A carved angel standing on the terrace, wings folded up behind. */
function Angel({ x, scale }: { x: number; scale: number }) {
  const wing = useMemo(() => wingGeometry(), []);
  const stone = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#D8D2C6",
        roughness: 0.85,
        flatShading: true,
        side: DoubleSide,
      }),
    [],
  );
  useEffect(
    () => () => {
      wing.dispose();
      stone.dispose();
    },
    [wing, stone],
  );
  return (
    <group position={[x, TERRACE_Y, -2]} scale={scale}>
      <Carved position={[0, 0, 0]} robe="#D8D2C6" skin="#CFC8BA" />
      {[1, -1].map((s) => (
        <mesh
          key={s}
          geometry={wing}
          material={stone}
          position={[s * 0.14, 1.05, -0.16]}
          rotation={[0.15, s * -0.5, 0]}
          scale={[s, 1, 1]}
        />
      ))}
    </group>
  );
}

/** “We see him who for a little while was made lower than the angels, namely Jesus, crowned with glory and honour because of the suffering of death”: a crown of thorns lies on a stone below a row of angels; it rises above them as laurel grows through the gilded thorns. */
export function CrownedScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const crown = useRef<Group>(null);
  const leavesMesh = useRef<InstancedMesh>(null);
  const key = useRef<PointLight>(null);
  const shaft = useRef<ShaderMaterial | null>(null);
  const halo = useRef<ShaderMaterial | null>(null);
  const scratch = useMemo(() => ({ m: new Matrix4(), s: new Matrix4() }), []);

  const geo = useMemo(() => {
    const strands = [0, 2.1, 4.2].map(
      (ph) => new TubeGeometry(strand(ph), 160, 0.016, 5, true),
    );
    const thorn = new ConeGeometry(0.012, 0.09, 4);
    thorn.translate(0, 0.045, 0);
    return { strands, thorn, leaf: leafGeometry() };
  }, []);
  const leaves = useMemo(() => laurel(), []);
  const thorns = useMemo(() => {
    const up = new Vector3(0, 1, 0);
    return Array.from({ length: THORNS }, (_, i) => {
      const a = (i / THORNS) * Math.PI * 2 + hash(i) * 0.1;
      const p = new Vector3(
        Math.cos(a) * R,
        (hash(i + 3) - 0.5) * 0.06,
        Math.sin(a) * R,
      );
      const dir = new Vector3(
        Math.cos(a) * (hash(i + 5) - 0.3),
        hash(i + 7) - 0.4,
        Math.sin(a) * (hash(i + 5) - 0.3),
      )
        .add(
          new Vector3(-Math.sin(a), 0, Math.cos(a)).multiplyScalar(
            hash(i + 9) - 0.5,
          ),
        )
        .normalize();
      return new Matrix4().compose(
        p,
        new Quaternion().setFromUnitVectors(up, dir),
        new Vector3(1, 0.7 + hash(i + 11) * 0.6, 1),
      );
    });
  }, []);
  const mats = useMemo(
    () => ({
      crown: new MeshStandardMaterial({
        color: THORN.clone(),
        roughness: 0.55,
        metalness: 0.45,
        emissive: "#F3C77A",
        emissiveIntensity: 0,
      }),
      leaf: new MeshStandardMaterial({
        color: "#7C8340",
        roughness: 0.5,
        metalness: 0.2,
        emissive: "#5C5A1E",
        emissiveIntensity: 0.28,
        side: DoubleSide,
      }),
    }),
    [],
  );
  useEffect(
    () => () => {
      geo.strands.forEach((g) => g.dispose());
      geo.thorn.dispose();
      geo.leaf.dispose();
      Object.values(mats).forEach((m) => m.dispose());
    },
    [geo, mats],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.08) * 0.25, 1, mobile ? 10 : 6.8);
    camera.lookAt(0, 0.8, 0);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 0.9, p) + smoothstep(14.8, 16, p);
    const rise = easeInOutCubic((p - RISE_AT) / RISE_TIME);
    const grow = (p - GROW_AT) / GROW_TIME;
    const gild = smoothstep(RISE_AT + 1, RISE_AT + RISE_TIME, p);

    const c = crown.current;
    if (c) {
      c.position.y = lerp(LOW_Y, HIGH_Y, rise);
      c.rotation.x = lerp(0.05, 0.42, rise);
      c.rotation.y = t * 0.12;
    }
    lerpColor(mats.crown, THORN, GOLD, gild);
    setEmissive(mats.crown, 0.08 * gild);
    const mesh = leavesMesh.current;
    if (mesh) {
      leaves.forEach((l, i) => {
        const s = Math.max(0.001, easeOutCubic((grow - l.at) / 0.15));
        scratch.s.makeScale(s, s, s);
        scratch.m.multiplyMatrices(l.m, scratch.s);
        mesh.setMatrixAt(i, scratch.m);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }
    if (key.current) key.current.intensity = lerp(3, 22, gild);
    if (shaft.current) setUniform(shaft.current, "uAlpha", 0.08 + 0.32 * gild);
    if (halo.current) setUniform(halo.current, "uAlpha", 0.3 * gild);
  });

  return (
    <>
      <fog attach="fog" args={[NIGHT.haze, 8, 30]} />
      <NightSky
        horizonY={-0.5}
        glow={0.3}
        stars={mobile ? 120 : 220}
        moon={null}
      />
      <MoonLights moon={[-5, 6, 4]} intensity={1.7} fill={1} />
      <Glow
        position={[0, 2.4, -2.6]}
        size={1}
        scaleX={mobile ? 2.4 : 3}
        scaleY={9}
        color="#8A6A3A"
        inner="#F3D38A"
        alpha={0}
        power={1.6}
        renderOrder={-5}
        onMaterial={(m) => {
          shaft.current = m;
        }}
      />
      <Courses
        position={[0, TERRACE_Y, -2.2]}
        width={13}
        rows={4}
        rowHeight={0.34}
        depth={1.6}
        blockWidth={0.95}
        color={NIGHT.stone}
      />
      <Flagstones
        position={[0, -0.5, 0.6]}
        width={18}
        depth={6.4}
        size={0.8}
        color="#4A4A52"
      />
      <Courses
        position={[0, LOW_Y, 0.4]}
        width={1.5}
        rows={2}
        rowHeight={0.4}
        depth={1.2}
        blockWidth={0.75}
        color="#8E8678"
        stagger={false}
      />
      {ANGELS.map((x) => (
        <Angel key={x} x={mobile ? x * 0.78 : x} scale={mobile ? 0.72 : 0.95} />
      ))}
      <pointLight
        ref={key}
        position={[0, 2.8, 1.6]}
        intensity={3}
        distance={13}
        decay={1.5}
        color="#FFD9A0"
      />
      <group ref={crown} position={[0, LOW_Y, 0.4]} scale={1.8}>
        {geo.strands.map((g, i) => (
          <mesh key={i} geometry={g} material={mats.crown} />
        ))}
        <instancedMesh
          args={[geo.thorn, mats.crown, THORNS]}
          frustumCulled={false}
          ref={(m) => {
            if (!m) return;
            thorns.forEach((mm, i) => m.setMatrixAt(i, mm));
            m.instanceMatrix.needsUpdate = true;
          }}
        />
        <instancedMesh
          ref={leavesMesh}
          args={[geo.leaf, mats.leaf, leaves.length]}
          frustumCulled={false}
        />
        <Glow
          size={2.4}
          color="#B7892C"
          inner="#FFF1D0"
          alpha={0}
          power={2}
          renderOrder={6}
          billboard
          onMaterial={(m) => {
            halo.current = m;
          }}
        />
      </group>
      <Embers
        count={mobile ? 14 : 28}
        box={EMBER_BOX}
        position={[0, LOW_Y, 0.4]}
        rise={0.05}
        size={1.8}
        alpha={0.5}
      />
      <Squall opacity={haze} color="#0A0E18" />
      {effects && <SceneEffects bloom={0.5} threshold={0.8} />}
    </>
  );
}
