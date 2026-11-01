"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  BoxGeometry,
  Color,
  Euler,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  TorusGeometry,
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
import { Carved } from "../primitives/Salem";
import { NIGHT } from "../primitives/Road";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 16;
const WALL_Z = -1.4;
const DESCEND = 1.4;
const LAND = 5;
const BREAK = 5.3;
const RISE = 6.2;
const RISE_TIME = 1.2;
const LINKS = 11;
const CAPTIVES: [number, string][] = [
  [-2.2, "#6B5442"],
  [-1.1, "#5E4A3A"],
  [1.1, "#7A6248"],
  [2.2, "#5A4636"],
];
const EMBER_BOX: [number, number, number] = [5, 3, 2];

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Where each link hangs on its chain from the wall ring down to the captive's wrists, and where it flies when the chain breaks. */
const LINK_REST = CAPTIVES.flatMap(([cx], c) =>
  Array.from({ length: LINKS }, (_, i) => {
    const k = (i + 0.5) / LINKS;
    const a = new Vector3(cx, 1.55, WALL_Z + 0.08);
    const b = new Vector3(cx, 0.5, 0.42);
    const p = a.clone().lerp(b, k);
    p.y -= 0.22 * Math.sin(k * Math.PI);
    const tangent = b.clone().sub(a).normalize();
    const n = c * LINKS + i;
    return {
      p,
      q: new Quaternion()
        .setFromUnitVectors(new Vector3(1, 0, 0), tangent)
        .multiply(
          new Quaternion().setFromAxisAngle(
            new Vector3(1, 0, 0),
            i % 2 ? Math.PI / 2 : 0,
          ),
        ),
      v: new Vector3(
        (hash(n) - 0.5) * 2.4 + Math.sign(cx) * 0.6,
        1 + hash(n + 1) * 1.6,
        hash(n + 2) * 1.6,
      ),
      spin: new Vector3(hash(n + 3), hash(n + 4), hash(n + 5)).multiplyScalar(
        9,
      ),
    };
  }),
);

const BLOCKS = (() => {
  const out: [number, number, number][] = [];
  for (let row = 0; row < 11; row++) {
    const off = row % 2 ? 0.3 : 0;
    for (let i = -13; i <= 13; i++)
      out.push([i * 0.6 + off, 0.15 + row * 0.3, hash(row * 19 + i)]);
  }
  return out;
})();

/** “That through death he might destroy the one who has the power of death, and deliver all those who through fear of death were subject to lifelong slavery”: captives kneel chained to a prison wall; light comes down among them, the chains break and scatter, and the captives rise. */
export function FreedScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const deliverer = useRef<Group>(null);
  const links = useRef<InstancedMesh>(null);
  const wall = useRef<InstancedMesh>(null);
  const kneel = useRef(1);
  const captives = useRef<(Group | null)[]>([]);
  const key = useRef<PointLight>(null);
  const shaft = useRef<ShaderMaterial | null>(null);
  const halo = useRef<ShaderMaterial | null>(null);
  const flash = useRef<ShaderMaterial | null>(null);
  const geo = useMemo(
    () => ({
      link: new TorusGeometry(0.06, 0.018, 6, 14).scale(1.5, 1, 1),
      ring: new TorusGeometry(0.1, 0.025, 8, 18),
      block: new BoxGeometry(0.58, 0.28, 0.3),
    }),
    [],
  );
  const mats = useMemo(
    () => ({
      iron: new MeshStandardMaterial({
        color: "#6E655A",
        metalness: 0.6,
        roughness: 0.45,
      }),
      stone: new MeshStandardMaterial({
        color: "#FFFFFF",
        roughness: 1,
        flatShading: true,
      }),
      floor: new MeshStandardMaterial({ color: "#3A342E", roughness: 1 }),
    }),
    [],
  );
  const scratch = useMemo(
    () => ({
      m: new Matrix4(),
      p: new Vector3(),
      q: new Quaternion(),
      e: new Euler(),
      one: new Vector3(1, 1, 1),
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
    const m = wall.current;
    if (!m) return;
    const c = new Color();
    BLOCKS.forEach(([x, y, h], i) => {
      scratch.m.compose(
        scratch.p.set(x, y, WALL_Z - 0.15 + h * 0.03),
        scratch.q.identity(),
        scratch.one,
      );
      m.setMatrixAt(i, scratch.m);
      m.setColorAt(i, c.set("#5A534A").multiplyScalar(0.75 + h * 0.4));
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [scratch]);

  const spread = mobile ? 0.72 : 1;

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.07) * 0.2, 1.5, mobile ? 8.6 : 6.4);
    camera.lookAt(0, mobile ? 0.8 : 1.05, 0);
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 0.9, p) + smoothstep(14.8, 16, p);
    const down = easeInOutCubic((p - DESCEND) / (LAND - DESCEND));
    const lit = smoothstep(DESCEND, LAND, p);
    const freed = smoothstep(BREAK, BREAK + 1.5, p);
    const burst =
      smoothstep(BREAK - 0.15, BREAK, p) *
      (1 - smoothstep(BREAK, BREAK + 1, p));

    if (deliverer.current) {
      deliverer.current.position.y = lerp(mobile ? 5.4 : 3.6, 0, down);
      deliverer.current.visible = p > DESCEND - 0.2;
    }
    const rise = smoothstep(RISE, RISE + RISE_TIME, p);
    kneel.current = 1 - rise;
    captives.current.forEach((g, i) => {
      if (!g) return;
      g.position.z = lerp(0.2, 0.3, rise);
      g.rotation.y = -Math.sign(CAPTIVES[i][0]) * lerp(0.2, 0.35, rise);
    });

    const m = links.current;
    if (m) {
      const s = Math.max(0, p - BREAK);
      const gone = smoothstep(BREAK + 4, BREAK + 6, p);
      LINK_REST.forEach((l, i) => {
        if (s === 0) {
          scratch.p.copy(l.p);
          scratch.p.x *= spread;
          scratch.p.y += Math.sin(t * 1.2 + i * 0.3) * 0.004;
          scratch.q.copy(l.q);
        } else {
          scratch.p.set(
            l.p.x * spread + l.v.x * s,
            Math.max(0.03, l.p.y + l.v.y * s - 4.9 * s * s),
            l.p.z + l.v.z * s,
          );
          const k = Math.min(s, 1.2);
          scratch.e.set(l.spin.x * k, l.spin.y * k, l.spin.z * k);
          scratch.q.setFromEuler(scratch.e).multiply(l.q);
        }
        scratch.m.compose(
          scratch.p,
          scratch.q,
          scratch.one.setScalar(Math.max(0.001, 1 - gone)),
        );
        m.setMatrixAt(i, scratch.m);
      });
      scratch.one.setScalar(1);
      m.instanceMatrix.needsUpdate = true;
    }

    if (key.current)
      key.current.intensity =
        smoothstep(DESCEND - 0.2, DESCEND + 0.8, p) +
        2.5 * lit +
        3.5 * freed +
        5 * burst;
    if (shaft.current)
      setUniform(shaft.current, "uAlpha", 0.35 * lit + 0.25 * freed);
    if (halo.current) setUniform(halo.current, "uAlpha", 0.45 * lit);
    if (flash.current) setUniform(flash.current, "uAlpha", 0.8 * burst);
  });

  return (
    <>
      <color attach="background" args={["#0A0908"]} />
      <fog
        attach="fog"
        args={["#0A0908", mobile ? 8.5 : 6, mobile ? 19 : 16]}
      />
      <hemisphereLight args={["#5A6A8E", "#1A1410", 1.8]} />
      {mobile && (
        <pointLight
          position={[0, 2.4, 3.2]}
          intensity={8}
          distance={9}
          decay={1.2}
          color={NIGHT.moonLight}
        />
      )}
      <directionalLight
        position={[3, 6, 2]}
        intensity={mobile ? 1.4 : 0.9}
        color={NIGHT.moonLight}
      />
      <instancedMesh
        ref={wall}
        args={[geo.block, mats.stone, BLOCKS.length]}
        frustumCulled={false}
      />
      <mesh
        material={mats.floor}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 1]}
      >
        <planeGeometry args={[20, 6]} />
      </mesh>
      <Glow
        position={[0, 2.4, WALL_Z + 0.3]}
        size={1}
        scaleX={mobile ? 1.6 : 2}
        scaleY={6}
        color="#8A6A3A"
        inner="#FFF1D0"
        alpha={0}
        power={1.5}
        renderOrder={2}
        onMaterial={(m) => {
          shaft.current = m;
        }}
      />
      {CAPTIVES.map(([x]) => (
        <mesh
          key={x}
          geometry={geo.ring}
          material={mats.iron}
          position={[x * spread, 1.58, WALL_Z + 0.05]}
        />
      ))}
      <instancedMesh
        ref={links}
        args={[geo.link, mats.iron, LINK_REST.length]}
        frustumCulled={false}
      />
      {CAPTIVES.map(([x, robe], i) => (
        <group
          key={x}
          ref={(g) => {
            captives.current[i] = g;
          }}
          position={[x * spread, 0, 0.2]}
        >
          <Carved
            position={[0, 0, 0]}
            robe={robe}
            scale={0.85}
            arms
            kneel={kneel}
          />
        </group>
      ))}
      <group ref={deliverer} position={[0, 3.6, 0.4]} visible={false}>
        <Glow
          position={[0, 1.1, 0]}
          size={1}
          scaleX={1}
          scaleY={3}
          color="#D9B060"
          inner="#FFF6E0"
          alpha={0.9}
          power={1.5}
          renderOrder={7}
        />
        <Glow
          position={[0, 1.1, -0.1]}
          size={2.6}
          color="#B7892C"
          inner="#FFE9C0"
          alpha={0}
          power={2}
          renderOrder={6}
          onMaterial={(m) => {
            halo.current = m;
          }}
        />
        <pointLight
          ref={key}
          position={[0, 1.2, 1.8]}
          intensity={1}
          distance={8}
          decay={1.5}
          color="#FFD9A0"
        />
      </group>
      <Glow
        position={[0, 0.9, 0.6]}
        size={mobile ? 5 : 6}
        color="#FFF8E8"
        inner="#FFFFFF"
        alpha={0}
        power={1.6}
        renderOrder={12}
        onMaterial={(m) => {
          flash.current = m;
        }}
      />
      <Embers
        count={mobile ? 14 : 28}
        box={EMBER_BOX}
        position={[0, 0.1, 0]}
        rise={0.05}
        size={1.6}
        alpha={0.45}
      />
      <Squall opacity={haze} color="#0A0908" />
      {effects && <SceneEffects bloom={0.5} threshold={0.8} />}
    </>
  );
}
