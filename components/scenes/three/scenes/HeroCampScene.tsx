"use client";

import { useEffect, useMemo } from "react";
import { damp } from "maath/easing";
import { BoxGeometry, ConeGeometry, Matrix4, MeshStandardMaterial, Quaternion, Vector3 } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers } from "../primitives/Earth";
import { DUSK, DuskSky, Dunes, PillarOfFire, Sand } from "../primitives/Wilderness";
import { useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const GROUND = -1.62;
const CAMP: [number, number, number] = [4.3, GROUND, -9];
const TENTS = 90;
const COURT: [number, number] = [1.4, 0.7];
const EMBER_BOX: [number, number, number] = [12, 3, 4];

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Tents camped in rings around the tabernacle court, tribe by tribe (Num 2). */
const TENT_SPOTS = Array.from({ length: TENTS }, (_, i) => {
  const ring = 1.9 + (i % 3) * 0.75 + hash(i) * 0.35;
  const a = (i / TENTS) * Math.PI * 2 + hash(i + 9) * 0.12;
  return { x: Math.cos(a) * ring * 1.9, z: Math.sin(a) * ring * 0.8, s: 0.2 + hash(i + 3) * 0.08, r: hash(i + 5) * 6.28, lit: hash(i + 11) > 0.55 };
});

/** Hebrews 3 opening: the camp of Israel at dusk in the wilderness, the pillar of fire standing over the tabernacle. */
export function HeroCampScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  const shift = mobile ? -2.6 : 0;
  const cone = useMemo(() => new ConeGeometry(1, 1.1, 4, 1), []);
  const cloth = useMemo(() => new MeshStandardMaterial({ color: "#5A4034", roughness: 1, metalness: 0 }), []);
  const linen = useMemo(() => new MeshStandardMaterial({ color: DUSK.linen, roughness: 0.9, emissive: "#F09A3E", emissiveIntensity: 0.12 }), []);
  const fence = useMemo(() => new BoxGeometry(1, 1, 1), []);
  const tentMatrices = useMemo(() => {
    const m = new Matrix4();
    const q = new Quaternion();
    return TENT_SPOTS.map((t) => m.compose(new Vector3(CAMP[0] + shift + t.x, CAMP[1] + t.s * 0.5, CAMP[2] + t.z), q.setFromAxisAngle(new Vector3(0, 1, 0), t.r), new Vector3(t.s * 1.3, t.s, t.s)).clone());
  }, [shift]);
  useEffect(
    () => () => {
      cone.dispose();
      cloth.dispose();
      linen.dispose();
      fence.dispose();
    },
    [cone, cloth, linen, fence],
  );

  useSceneTime((t, dt, { camera }) => {
    const p = pointer?.current ?? { x: 0, y: 0 };
    damp(camera.position, "x", Math.sin(t * 0.08) * 0.15 + p.x * 0.4, 0.9, dt);
    damp(camera.position, "y", 0.2 - p.y * 0.2, 0.9, dt);
    camera.position.z = mobile ? 9.5 : 8;
    camera.lookAt(0, -0.2, -8);
  });

  const [cx, cy, cz] = [CAMP[0] + shift, CAMP[1], CAMP[2]];
  return (
    <>
      <DuskSky horizonY={-1.9} glowStrength={0.75} stars={mobile ? 110 : 220} />
      <Dunes />
      <hemisphereLight args={["#3A3F6E", "#1B1413", 0.45]} />
      <pointLight position={[cx, cy + 2.2, cz + 0.4]} intensity={14} distance={9} decay={1.6} color={DUSK.fire} />
      <Sand y={GROUND} far={-13} />
      <group>
        {tentMatrices.map((m, i) => (
          <mesh key={i} geometry={cone} material={cloth} matrixAutoUpdate={false} matrix={m} />
        ))}
      </group>
      {TENT_SPOTS.filter((t) => t.lit).map((t, i) => (
        <Glow key={i} position={[cx + t.x, cy + t.s * 0.25, cz + t.z + t.s * 0.6]} size={0.14} color="#F3D38A" inner="#FFF8E8" alpha={0.8} power={1.2} renderOrder={5} billboard depthTest />
      ))}
      <group position={[cx, cy, cz]}>
        <mesh geometry={fence} material={linen} position={[0, 0.12, -COURT[1]]} scale={[COURT[0] * 2, 0.24, 0.03]} />
        <mesh geometry={fence} material={linen} position={[0, 0.12, COURT[1]]} scale={[COURT[0] * 2, 0.24, 0.03]} />
        <mesh geometry={fence} material={linen} position={[-COURT[0], 0.12, 0]} scale={[0.03, 0.24, COURT[1] * 2]} />
        <mesh geometry={fence} material={linen} position={[COURT[0], 0.12, 0]} scale={[0.03, 0.24, COURT[1] * 2]} />
        <mesh position={[0.4, 0.22, 0]}>
          <boxGeometry args={[0.9, 0.44, 0.5]} />
          <meshStandardMaterial color={DUSK.skins} roughness={0.9} />
        </mesh>
      </group>
      <PillarOfFire position={[cx + 0.4, cy + 0.45, cz]} height={mobile ? 3.4 : 4.2} mobile={mobile} />
      <Embers count={mobile ? 20 : 44} box={EMBER_BOX} position={[0, GROUND, -3]} rise={0.03} size={2} alpha={0.45} />
      {effects && <SceneEffects bloom={0.5} />}
    </>
  );
}
