"use client";

import { useRef } from "react";
import type { Group } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Squall } from "../primitives/Coast";
import { Bundle, Carved, Ground, SALEM, SalemHills, SalemLights, SalemSky, Terraces } from "../primitives/Salem";
import { easeInOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const PERIOD = 16;
const FROM: [number, number] = [-0.3, 1.1];
const TO: [number, number] = [1.15, 0.55];
/** Abraham’s line behind him, not yet born: Isaac, Jacob, Levi. */
const LINE: [number, number, number][] = [[-2.5, -1.3, 7], [-3.2, -2.6, 8.3], [-3.9, -3.9, 9.6]];

/** “See how great this man was to whom Abraham the patriarch gave a tenth of the spoils”: ten bundles lie on the road; one is carried to Melchizedek’s feet, and behind Abraham his line appears, Levi among them, still in his loins. */
export function TitheScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const tenth = useRef<Group>(null);
  const isaac = useRef(0);
  const jacob = useRef(0);
  const levi = useRef(0);

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    const out = 1 - smoothstep(14.4, 16, p);
    haze.current = 1 - smoothstep(0, 1.4, p) + smoothstep(14.4, 16, p);
    camera.position.set(Math.sin(t * 0.05) * 0.2, 1.8, mobile ? 9.5 : 7);
    camera.lookAt(-0.6, 0.8, -0.8);
    const k = easeInOutCubic((p - 2.5) / 3.5);
    if (tenth.current) tenth.current.position.set(lerp(FROM[0], TO[0], k), Math.sin(k * Math.PI) * 0.5, lerp(FROM[1], TO[1], k));
    LINE.forEach(([, , at], i) => {
      [isaac, jacob, levi][i].current = 0.55 * smoothstep(at, at + 1.4, p) * out;
    });
  });

  return (
    <>
      <fog attach="fog" args={[SALEM.haze, 12, 45]} />
      <SalemSky horizonY={0} />
      <SalemHills />
      <SalemLights />
      <Ground />
      <Terraces position={[-6, 0, -14]} levels={[[5, 0.5], [3.6, 0.5]]} color={SALEM.deep} />
      <Carved position={[-1.2, 0, 0]} robe={SALEM.mantle} rotationY={1.1} />
      <Carved position={[1.7, 0, 0]} rotationY={-1.2} crown />
      {Array.from({ length: 9 }, (_, i) => (
        <Bundle key={i} position={[-3.1 + i * 0.33, 0, 1.1 + (i % 2) * 0.12]} rotationY={i * 0.7} scale={0.9} />
      ))}
      <group ref={tenth}>
        <Bundle position={[0, 0, 0]} color="#B08A5E" scale={0.9} />
      </group>
      <Carved position={[LINE[0][0], 0, LINE[0][1]]} robe={SALEM.stone} rotationY={1} scale={0.96} opacity={isaac} />
      <Carved position={[LINE[1][0], 0, LINE[1][1]]} robe={SALEM.stone} rotationY={1} scale={0.96} opacity={jacob} />
      <Carved position={[LINE[2][0], 0, LINE[2][1]]} robe={SALEM.stone} rotationY={1} scale={0.96} turban opacity={levi} />
      <Squall opacity={haze} color={SALEM.haze} />
      {effects && <SceneEffects bloom={0.25} threshold={0.92} vignette={0.3} />}
    </>
  );
}
