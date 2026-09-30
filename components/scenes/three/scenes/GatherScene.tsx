"use client";

import { useEffect, useMemo, useRef } from "react";
import { Group, LatheGeometry, MeshStandardMaterial, Vector2, type ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers } from "../primitives/Earth";
import { easeInOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setOpacity } from "../primitives/mutate";

const PERIOD = 14;
const COUNT = 8;
/** Start position on the floor (x, z) and a stagger in seconds for each lamp brought in. */
const STARTS: [number, number, number][] = [
  [-4.6, -1.8, 0], [4.4, -2.4, 0.5], [-3.4, 2.4, 1.0], [3.6, 2.2, 0.3],
  [-5.2, 0.6, 1.4], [5.0, 0.2, 0.8], [-1.4, -3.8, 1.7], [1.8, -3.6, 1.2],
];
const EMBER_BOX: [number, number, number] = [3, 2.2, 3];

/** A round clay oil lamp: shallow body, filling hole, and a nozzle for the wick. */
function lampProfile() {
  const pts = [
    [0, 0], [0.16, 0.005], [0.26, 0.04], [0.3, 0.1], [0.28, 0.15], [0.2, 0.19], [0.1, 0.205], [0.06, 0.19], [0.045, 0.16], [0, 0.16],
  ];
  return new LatheGeometry(pts.map(([x, y]) => new Vector2(x, y)), 28);
}

function lerpAngle(a: number, b: number, k: number) {
  const d = Math.atan2(Math.sin(b - a), Math.cos(b - a));
  return a + d * k;
}

function flameFlicker(t: number, seed: number) {
  return 0.85 + 0.1 * Math.sin(t * 9 + seed * 7) + 0.05 * Math.sin(t * 23 + seed * 3);
}

export function GatherScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const lampsRef = useRef<Group>(null);
  const flames = useRef<(ShaderMaterial | null)[]>([]);
  const halos = useRef<(ShaderMaterial | null)[]>([]);
  const pools = useRef<(ShaderMaterial | null)[]>([]);
  const centreFlame = useRef<ShaderMaterial>(null);

  const body = useMemo(() => lampProfile(), []);
  const clay = useMemo(() => new MeshStandardMaterial({ color: "#6A4A30", roughness: 0.85, transparent: true }), []);
  useEffect(
    () => () => {
      body.dispose();
      clay.dispose();
    },
    [body, clay],
  );

  const ring = mobile ? 1.55 : 1.9;
  const targets = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => {
      const a = (i / COUNT) * Math.PI * 2 + 0.2;
      return { x: Math.cos(a) * ring, z: Math.sin(a) * ring, face: -a };
    }),
    [ring],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(0, mobile ? 5.2 : 4.3, mobile ? 7.8 : 6.4);
    camera.lookAt(0, 0, 0.1);
    const p = t % PERIOD;
    const vanish = 1 - smoothstep(12.6, 14, p);
    setOpacity(clay, smoothstep(0, 1, p) * vanish);
    if (centreFlame.current) centreFlame.current.uniforms.uAlpha.value = 1.3 * flameFlicker(t, 0);

    lampsRef.current?.children.forEach((g, i) => {
      const [sx, sz, delay] = STARTS[i];
      const k = easeInOutCubic((p - 1 - delay) / 3.8);
      const tg = targets[i];
      g.position.set(lerp(sx, tg.x, k), 0.35 * Math.sin(k * Math.PI), lerp(sz, tg.z, k));
      g.rotation.y = lerpAngle(-Math.atan2(-sz, -sx), tg.face, k);
      const lit = smoothstep(4.8 + delay, 5.6 + delay, p) * vanish;
      const f = flameFlicker(t, i + 1);
      const fl = flames.current[i];
      if (fl) fl.uniforms.uAlpha.value = 1.2 * lit * f;
      const h = halos.current[i];
      if (h) h.uniforms.uAlpha.value = 0.3 * lit * f;
      const pl = pools.current[i];
      if (pl) pl.uniforms.uAlpha.value = 0.22 * lit;
    });
  });

  return (
    <>
      <color attach="background" args={["#0D0B09"]} />
      <hemisphereLight args={["#3A2E22", "#0A0806", 0.35]} />
      <pointLight position={[0.4, 1.7, 0]} intensity={9} distance={10} decay={1.6} color="#F3C77A" />
      <fog attach="fog" args={["#0D0B09", 5, 14]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[40, 48]} />
        <meshStandardMaterial color="#2A221A" roughness={0.95} />
      </mesh>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <Glow size={mobile ? 6.5 : 8} color="#8A5A22" alpha={0.25} power={1.8} renderOrder={2} />
      </group>

      <group>
        <mesh geometry={body} material={clay} scale={1.35} />
        <mesh position={[0.46, 0.1, 0]} rotation={[0, 0, Math.PI / 2 - 0.25]} scale={1.35}>
          <cylinderGeometry args={[0.05, 0.07, 0.22, 10]} />
          <primitive object={clay} attach="material" />
        </mesh>
        <Glow position={[0.58, 0.42, 0]} size={mobile ? 2.4 : 3} color="#B7892C" alpha={0.35} power={2.2} renderOrder={10} billboard />
        <Glow position={[0.58, 0.32, 0]} size={0.34} scaleY={1.7} color="#F3C77A" inner="#FFF8E8" alpha={1.3} power={1.1} renderOrder={11} billboard onMaterial={(m) => { centreFlame.current = m; }} />
      </group>

      <group ref={lampsRef}>
        {STARTS.map(([x, z], i) => (
          <group key={i} position={[x, 0, z]}>
            <mesh geometry={body} material={clay} />
            <mesh position={[-0.3, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.06, 0.018, 6, 14]} />
              <primitive object={clay} attach="material" />
            </mesh>
            <mesh position={[0.34, 0.08, 0]} rotation={[0, 0, Math.PI / 2 - 0.25]}>
              <cylinderGeometry args={[0.04, 0.05, 0.16, 8]} />
              <primitive object={clay} attach="material" />
            </mesh>
            <group rotation={[-Math.PI / 2, 0, 0]} position={[0.3, 0.02, 0]}>
              <Glow size={1.8} color="#8A5A22" alpha={0} power={1.8} renderOrder={3} onMaterial={(m) => { pools.current[i] = m; }} />
            </group>
            <Glow position={[0.42, 0.3, 0]} size={1.3} color="#B7892C" alpha={0} power={2.2} renderOrder={10} billboard onMaterial={(m) => { halos.current[i] = m; }} />
            <Glow position={[0.42, 0.22, 0]} size={0.2} scaleY={1.7} color="#F3C77A" inner="#FFF8E8" alpha={0} power={1.1} renderOrder={11} billboard onMaterial={(m) => { flames.current[i] = m; }} />
          </group>
        ))}
      </group>
      <Embers count={mobile ? 14 : 26} box={EMBER_BOX} position={[0.6, 0.4, 0]} rise={0.06} size={1.6} alpha={0.5} />
      {effects && <SceneEffects bloom={0.55} />}
    </>
  );
}
