"use client";

import { useMemo, useRef } from "react";
import { Cloud, Clouds, Line } from "@react-three/drei";
import { damp } from "maath/easing";
import { CatmullRomCurve3, MeshBasicMaterial, Vector3, type Group, type ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Embers, Hills, Sky, ridgeY, type HillLayer } from "../primitives/Earth";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const HILLS: HillLayer[] = [
  { y: -2.3, z: -14, amp: 0.55, freq: 0.32, seed: 1.3, color: "#2A2118" },
  { y: -2.55, z: -8, amp: 0.42, freq: 0.5, seed: 4.1, color: "#1D1812" },
  { y: -2.45, z: -3, amp: 0.3, freq: 0.75, seed: 2.2, color: "#110E0A" },
];
const FAR = HILLS[0];
/** The road, from the near foreground up through the valleys to the town on the far ridge: (x, depth-lift, z). */
const ROAD: [number, number, number][] = [
  [-3.6, -3.35, -1.2], [-2.2, -3.0, -2.6], [-0.4, -2.9, -4.4], [1.5, -2.85, -6.4],
  [3.0, -2.75, -9.2], [5.1, -2.6, -11.6], [7.2, -2.25, -13.9],
];
const TOWN = [[-0.9, 0.05], [-0.5, 0.18], [-0.2, 0.1], [0.15, 0.24], [0.4, 0.08], [0.7, 0.16], [1.0, 0.04], [0.05, 0.36]];
const TRAVELLERS = 6;
const WALK = 46;
const EMBER_BOX: [number, number, number] = [12, 3.2, 4];

/** Hebrews 2 opening: lamp-lit travellers on a road through the night hills toward a lit town, “bringing many sons to glory”. */
export function HeroRoadScene({ mobile, effects, pointer }: SceneProps) {
  useResetCameraOnUnmount();
  const walkers = useRef<Group>(null);
  const walkerMats = useRef<(ShaderMaterial | null)[]>([]);
  const squeeze = mobile ? 0.42 : 1;

  const road = useMemo(() => new CatmullRomCurve3(ROAD.map(([x, y, z]) => new Vector3(x * squeeze, y, z)), false, "catmullrom", 0.4), [squeeze]);
  const roadPoints = useMemo(() => road.getPoints(120), [road]);
  const town = useMemo(() => {
    const cx = ROAD[ROAD.length - 1][0] * squeeze + 0.4;
    const base = ridgeY(FAR, cx);
    return { cx, base, lights: TOWN.map(([dx, dy]) => [cx + dx, base + dy - 0.05] as const) };
  }, [squeeze]);
  const scratch = useMemo(() => new Vector3(), []);

  useSceneTime((t, dt, { camera }) => {
    const p = pointer?.current ?? { x: 0, y: 0 };
    damp(camera.position, "x", Math.sin(t * 0.08) * 0.15 + p.x * 0.4, 0.9, dt);
    damp(camera.position, "y", 0.1 - p.y * 0.2, 0.9, dt);
    camera.position.z = 8;
    camera.lookAt(0, -0.4, -6);

    walkers.current?.children.forEach((g, i) => {
      const u = ((t / WALK + i / TRAVELLERS) % 1 + 1) % 1;
      road.getPointAt(u, scratch);
      g.position.set(scratch.x, scratch.y + 0.07, scratch.z);
      const m = walkerMats.current[i];
      if (m) m.uniforms.uAlpha.value = smoothstep(0, 0.06, u) * (1 - smoothstep(0.9, 1, u)) * (0.85 + 0.15 * Math.sin(t * 7 + i * 3));
    });
  });

  return (
    <>
      <Sky horizonY={-2.1} glowStrength={0.85} />
      <Glow position={[town.cx, town.base + 0.4, -14.5]} size={mobile ? 5 : 8} color="#B7892C" alpha={0.3} power={2.2} renderOrder={-11} />
      <Hills layers={HILLS} />
      {town.lights.map(([x, y], i) => (
        <Glow key={i} position={[x, y, -13.9]} size={i === TOWN.length - 1 ? 0.3 : 0.2} color="#F3D38A" inner="#FFF8E8" alpha={1} power={1.1} renderOrder={5} depthTest />
      ))}
      <Line points={roadPoints} color="#6B5A45" lineWidth={mobile ? 1.2 : 1.6} transparent opacity={0.55} />
      <group ref={walkers}>
        {Array.from({ length: TRAVELLERS }, (_, i) => (
          <group key={i}>
            <Glow size={0.55} color="#B7892C" alpha={0.35} power={2.4} renderOrder={6} billboard depthTest />
            <Glow size={0.1} color="#F3D38A" inner="#FFF8E8" alpha={0} power={1} renderOrder={7} billboard depthTest onMaterial={(m) => { walkerMats.current[i] = m; }} />
          </group>
        ))}
      </group>
      <Clouds material={MeshBasicMaterial} texture="/textures/cloud.png" limit={mobile ? 12 : 24} renderOrder={8}>
        <Cloud position={[-3, -2.9, -6]} segments={mobile ? 5 : 8} bounds={[5, 0.3, 1]} volume={2.2} color="#6B5A45" opacity={0.14} fade={30} speed={0.08} growth={2} seed={2} />
        <Cloud position={[3.5, -2.7, -10]} segments={mobile ? 5 : 8} bounds={[6, 0.3, 1]} volume={2.4} color="#6B5A45" opacity={0.12} fade={30} speed={0.06} growth={2} seed={7} />
      </Clouds>
      <Embers count={mobile ? 24 : 55} box={EMBER_BOX} position={[0, -3, 0]} rise={0.04} size={mobile ? 2.2 : 2.6} alpha={0.6} />
      {effects && <SceneEffects bloom={0.45} />}
    </>
  );
}
