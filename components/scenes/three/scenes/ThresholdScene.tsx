"use client";

import { useEffect, useMemo, useRef } from "react";
import { MeshBasicMaterial, type Group, type ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers, Hills, figureGeometry, type HillLayer } from "../primitives/Earth";
import { DuskSky, Sand } from "../primitives/Wilderness";
import { easeInOutCubic, easeOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setOpacity } from "../primitives/mutate";

const PERIOD = 18;
const GROUND = -1.2;
const START_Z = -1.2;
const STOP_Z = -5.6;
const RIVER_Z = -7;
const LAND_Z = -9.5;
const MARCH = 11;
const CROSS = 3;
const SCALE = 0.34;
/** Formation offsets (x, z) and when each one falls (s); the first two are Joshua and Caleb, who never do. */
const PEOPLE: [number, number, number][] = [
  [-0.22, -0.3, Infinity], [0.24, -0.4, Infinity],
  [-0.6, 0.3, 3.2], [0.05, 0.2, 8.2], [0.62, 0.35, 5.1], [-0.3, 0.8, 9.8],
  [0.35, 0.9, 4.1], [-0.85, 1.0, 7.0], [0.9, 1.1, 9.1], [-0.05, 1.4, 6.1], [0.5, 1.6, 10.4], [-0.5, 1.7, 3.8],
];
const LAND: HillLayer[] = [
  { y: -0.95, z: -16, amp: 0.45, freq: 0.3, seed: 1.9, color: "#7A6236" },
  { y: -1.08, z: -12, amp: 0.22, freq: 0.45, seed: 4.6, color: "#5E4A2C" },
];
const EMBER_BOX: [number, number, number] = [8, 2.4, 3];

const marchZ = (p: number) => lerp(START_Z, STOP_Z, easeInOutCubic(p / MARCH));

/** “They were unable to enter because of unbelief”: a people walks toward the lit land; one by one they fall in the sand, and two cross over. */
export function ThresholdScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const people = useRef<Group>(null);
  const halos = useRef<(ShaderMaterial | null)[]>([]);
  const landGlow = useRef<ShaderMaterial>(null);
  const figure = useMemo(() => figureGeometry(), []);
  const inks = useMemo(() => PEOPLE.map(() => new MeshBasicMaterial({ color: "#120D0C", transparent: true })), []);
  useEffect(
    () => () => {
      figure.dispose();
      inks.forEach((m) => m.dispose());
    },
    [figure, inks],
  );
  const spread = mobile ? 0.7 : 1;

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.07) * 0.2, -0.35, mobile ? 5.2 : 4);
    camera.lookAt(0, -0.75, -8);
    const p = t % PERIOD;
    const fade = smoothstep(0, 1, p) * (1 - smoothstep(16.4, 18, p));
    const cross = easeInOutCubic((p - MARCH) / CROSS);

    people.current?.children.forEach((g, i) => {
      const [dx, dz, falls] = PEOPLE[i];
      const faithful = falls === Infinity;
      const at = Math.min(p, falls);
      const z = (faithful ? lerp(marchZ(at), LAND_Z, cross) : marchZ(at)) + dz;
      const walking = p < falls && p < MARCH + (faithful ? CROSS : 0);
      const step = walking ? Math.sin(t * 5 + i * 1.7) : 0;
      const down = faithful ? 0 : easeOutCubic((p - falls) / 0.9);
      g.position.set(dx * spread, GROUND + Math.abs(step) * 0.012, z);
      g.rotation.set(-down * Math.PI * 0.5, 0, step * 0.03);
      setOpacity(inks[i], faithful ? fade : fade * (1 - smoothstep(falls + 1.2, falls + 3, p)));
      const h = halos.current[i];
      if (h) h.uniforms.uAlpha.value = faithful ? 0.85 * smoothstep(MARCH + 0.8, MARCH + CROSS, p) * fade : 0;
    });
    if (landGlow.current) landGlow.current.uniforms.uAlpha.value = (0.45 + 0.25 * smoothstep(MARCH + 1, MARCH + CROSS, p)) * fade;
  });

  return (
    <>
      <DuskSky horizonY={-1.1} glowStrength={0.9} stars={mobile ? 90 : 180} />
      <Glow position={[0, -0.7, -16.5]} size={mobile ? 12 : 16} scaleY={0.5} color="#D9A24A" inner="#FFE3B0" alpha={0} power={1.8} renderOrder={-11} onMaterial={(m) => { landGlow.current = m; }} />
      <Hills layers={LAND} />
      <Sand y={GROUND} far={RIVER_Z} color="#231A1C" />
      <Sand y={GROUND} far={-13} near={RIVER_Z} color="#4E3E26" />
      <Glow position={[0, GROUND + 0.01, RIVER_Z]} size={1} scaleX={34} scaleY={0.3} color="#5E7A80" inner="#C9D9DA" alpha={0.55} power={1.2} renderOrder={3} />
      <group ref={people}>
        {PEOPLE.map((_, i) => (
          <group key={i} scale={SCALE}>
            <Glow position={[0, 0.9, -0.1]} size={3.4} color="#F3D38A" inner="#FFF8E8" alpha={0} power={1.8} renderOrder={4} onMaterial={(m) => { halos.current[i] = m; }} />
            <mesh geometry={figure} material={inks[i]} renderOrder={5} />
          </group>
        ))}
      </group>
      <Embers count={mobile ? 16 : 30} box={EMBER_BOX} position={[0, GROUND, -4]} rise={0.03} size={1.8} alpha={0.4} />
      {effects && <SceneEffects bloom={0.5} />}
    </>
  );
}
