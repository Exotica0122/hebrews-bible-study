"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  BoxGeometry,
  Color,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
  type Group,
  type InstancedMesh,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers } from "../primitives/Earth";
import { Squall } from "../primitives/Coast";
import { Carved } from "../primitives/Salem";
import { Flame } from "../primitives/Sanctuary";
import { MoonLights, NIGHT, NightSky } from "../primitives/Road";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const PERIOD = 16;
const WALL_Z = -2.2;
const DOOR = 1.1;
const WALK = 4.2;
/** The children: where they come to stand (x, z), their height, robe, and when they set out (s). */
const CHILDREN: [number, number, number, string, number][] = [
  [-0.75, 0.25, 0.7, "#7A5E48", 1.4],
  [0.8, 0.3, 0.64, "#5E6A7A", 2],
  [-1.4, 0.55, 0.78, "#8A6A50", 2.8],
  [1.45, 0.6, 0.72, "#6B5442", 3.3],
  [-2.05, 0.95, 0.62, "#7E7A5A", 4.1],
  [2.1, 1, 0.8, "#6A4A4A", 4.6],
];
const EMBER_BOX: [number, number, number] = [1, 2.2, 1];

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Courses of cut stone across the back of the court, leaving a doorway in the middle. */
const BLOCKS = (() => {
  const out: [number, number, number, number][] = [];
  for (let row = 0; row < 9; row++) {
    const y = 0.17 + row * 0.34;
    const off = row % 2 ? 0.35 : 0;
    for (let i = -10; i <= 10; i++) {
      const x = i * 0.7 + off;
      if (Math.abs(x) < DOOR / 2 + 0.3 && y < 2.2) continue;
      out.push([x, y, 0.62 + hash(row * 31 + i) * 0.06, hash(row * 7 + i * 3)]);
    }
  }
  return out;
})();

/** “Behold, I and the children God has given me”: in a courtyard at night one figure stands in the lamplight by the door, and the children come out of the dark to stand with him. */
export function GatherScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const children = useRef<Group>(null);
  const wall = useRef<InstancedMesh>(null);
  const block = useMemo(() => new BoxGeometry(1, 0.32, 0.4), []);
  const stone = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#FFFFFF",
        roughness: 0.95,
        flatShading: true,
      }),
    [],
  );
  const paving = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#6E665C",
        roughness: 1,
        flatShading: true,
      }),
    [],
  );
  useEffect(
    () => () => {
      block.dispose();
      stone.dispose();
      paving.dispose();
    },
    [block, stone, paving],
  );
  useEffect(() => {
    const m = wall.current;
    if (!m) return;
    const mat = new Matrix4();
    const c = new Color();
    BLOCKS.forEach(([x, y, w, h], i) => {
      mat.compose(
        new Vector3(x, y, WALL_Z + (h - 0.5) * 0.03),
        new Quaternion(),
        new Vector3(w, 1, 1),
      );
      m.setMatrixAt(i, mat);
      m.setColorAt(i, c.set(NIGHT.stone).multiplyScalar(0.8 + h * 0.35));
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, []);

  const edge = mobile ? 3.6 : 5.6;
  const spread = mobile ? 0.75 : 1;

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.07) * 0.2, 1.3, mobile ? 8.4 : 6.4);
    camera.lookAt(0, 0.75, 0);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 0.9, p) + smoothstep(14.8, 16, p);
    children.current?.children.forEach((g, i) => {
      const [x, z, , , start] = CHILDREN[i];
      const k = easeInOutCubic((p - start) / WALK);
      g.position.x = lerp(Math.sign(x) * edge, x * spread, k);
      g.position.z = lerp(z + 0.8, z, k);
      const walking = k > 0 && k < 1 ? 1 : 0;
      g.position.y = walking * Math.abs(Math.sin((p - start) * 5.5)) * 0.02;
      g.rotation.y = walking
        ? -Math.sign(x) * Math.PI * 0.45
        : lerp(
            -Math.sign(x) * Math.PI * 0.45,
            -Math.sign(x) * 0.25,
            smoothstep(start + WALK - 0.4, start + WALK + 0.6, p),
          );
    });
  });

  return (
    <>
      <fog attach="fog" args={[NIGHT.haze, 7, 22]} />
      <NightSky
        horizonY={2.5}
        glow={0.2}
        stars={mobile ? 90 : 160}
        moon={null}
      />
      <MoonLights moon={[4, 8, 3]} intensity={0.5} fill={0.35} />
      <instancedMesh
        ref={wall}
        args={[block, stone, BLOCKS.length]}
        frustumCulled={false}
      />
      <mesh material={stone} position={[0, 2.25, WALL_Z + 0.05]}>
        <boxGeometry args={[DOOR + 0.5, 0.18, 0.5]} />
      </mesh>
      <mesh position={[0, 1.05, WALL_Z - 0.3]}>
        <planeGeometry args={[DOOR, 2.1]} />
        <meshBasicMaterial color="#C98A40" />
      </mesh>
      <Glow
        position={[0, 1.05, WALL_Z + 0.05]}
        size={1}
        scaleX={2.4}
        scaleY={3.2}
        color="#8A5A26"
        inner="#F3C77A"
        alpha={0.45}
        power={1.8}
        renderOrder={4}
      />
      <mesh
        material={paving}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 1]}
      >
        <planeGeometry args={[30, 7]} />
      </mesh>
      <pointLight
        position={[0, 1.2, WALL_Z + 0.6]}
        intensity={5}
        distance={6}
        decay={1.5}
        color="#FFC27A"
      />
      <group position={[0.55, 0, 0.05]}>
        <mesh material={stone} position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.06, 0.12, 0.9, 8]} />
        </mesh>
        <mesh material={stone} position={[0, 0.93, 0]}>
          <cylinderGeometry args={[0.13, 0.07, 0.06, 10]} />
        </mesh>
        <Flame position={[0, 1.0, 0]} size={0.07} light={7} distance={7} />
        <Embers
          count={mobile ? 6 : 10}
          box={EMBER_BOX}
          position={[0, 1, 0]}
          rise={0.08}
          size={1.2}
          alpha={0.5}
        />
      </group>
      <Carved position={[0, 0, -0.1]} robe="#E6DCC6" scale={1.02} />
      <group ref={children}>
        {CHILDREN.map(([x, , h, robe]) => (
          <group key={x} position={[Math.sign(x) * edge, 0, 0]}>
            <Carved position={[0, 0, 0]} robe={robe} scale={h} />
          </group>
        ))}
      </group>
      <Squall opacity={haze} color="#0A0E18" />
      {effects && <SceneEffects bloom={0.45} threshold={0.8} />}
    </>
  );
}
