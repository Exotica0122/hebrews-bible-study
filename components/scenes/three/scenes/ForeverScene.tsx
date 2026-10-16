"use client";

import { useRef } from "react";
import type { PointLight, ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { GodRay } from "../primitives/GodRay";
import { Squall } from "../primitives/Coast";
import {
  Carved,
  Ground,
  SALEM,
  SalemHills,
  SalemLights,
  SalemSky,
  StoneAltar,
  Terraces,
} from "../primitives/Salem";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 18;
const SPOT: [number, number, number] = [0.6, 0, 0.2];
const TURN = 2;
const FIRST = 1;
const LAST = FIRST + 4 * TURN + 0.2;

/** “The former priests were many in number, because they were prevented by death … but he holds his priesthood permanently”: before the altar high priests stand one after another, each fading; then one stands who does not fade, hands raised in intercession, and the light above him stays. */
export function ForeverScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const p1 = useRef(0);
  const p2 = useRef(0);
  const p3 = useRef(0);
  const p4 = useRef(0);
  const one = useRef(0);
  const halo = useRef<ShaderMaterial | null>(null);
  const lamp = useRef<PointLight>(null);
  const ray = useRef<ShaderMaterial | null>(null);

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    const out = smoothstep(16.4, 18, p);
    haze.current = 1 - smoothstep(0, 1.4, p) + out;
    camera.position.set(Math.sin(t * 0.05) * 0.2, 1.6, mobile ? 7.5 : 6.5);
    camera.lookAt(0, mobile ? -0.4 : 1.1, -0.4);
    [p1, p2, p3, p4].forEach((r, i) => {
      const at = FIRST + i * TURN;
      r.current =
        smoothstep(at - 0.3, at + 0.5, p) *
        (1 - smoothstep(at + TURN - 0.5, at + TURN + 0.3, p));
    });
    one.current = smoothstep(LAST, LAST + 0.8, p) * (1 - out);
    const light = smoothstep(LAST + 0.3, LAST + 3, p) * (1 - out);
    if (halo.current) setUniform(halo.current, "uAlpha", 0.5 * light);
    if (ray.current) setUniform(ray.current, "uAlpha", 0.2 * light);
    if (lamp.current) lamp.current.intensity = 3.5 * light;
  });

  return (
    <>
      <fog attach="fog" args={[SALEM.haze, 12, 45]} />
      <SalemSky horizonY={0} />
      <SalemHills />
      <SalemLights />
      <Ground />
      <Terraces
        position={[5, 0, -16]}
        levels={[
          [5, 0.6],
          [3.6, 0.5],
        ]}
        color={SALEM.deep}
      />
      <StoneAltar position={[-1, 0, -0.8]} />
      <Glow
        position={[-1, 1.05, -0.8]}
        size={0.7}
        scaleY={1.4}
        color="#E07A3A"
        inner="#FFE2B0"
        alpha={0.8}
        power={1.4}
        renderOrder={6}
      />
      <Carved
        position={[SPOT[0] + -0.45, SPOT[1], SPOT[2]]}
        robe={SALEM.linen}
        rotationY={-0.5}
        turban
        opacity={p1}
      />
      <Carved
        position={[SPOT[0] + -0.15, SPOT[1], SPOT[2]]}
        robe={SALEM.linen}
        rotationY={-0.5}
        turban
        opacity={p2}
      />
      <Carved
        position={[SPOT[0] + 0.15, SPOT[1], SPOT[2]]}
        robe={SALEM.linen}
        rotationY={-0.5}
        turban
        opacity={p3}
      />
      <Carved
        position={[SPOT[0] + 0.45, SPOT[1], SPOT[2]]}
        robe={SALEM.linen}
        rotationY={-0.5}
        turban
        opacity={p4}
      />
      <Carved
        position={SPOT}
        robe={SALEM.linen}
        rotationY={-0.3}
        crown
        arms
        opacity={one}
      />
      <GodRay
        from={[SPOT[0] + 0.4, 7, -0.6]}
        to={[SPOT[0], 0, SPOT[2]]}
        radiusStart={0.25}
        radiusEnd={1.2}
        color="#FFE6BE"
        alpha={0}
        onMaterial={(m) => {
          ray.current = m;
        }}
      />
      <Glow
        position={[SPOT[0], 2.4, SPOT[2] - 0.3]}
        size={3.4}
        scaleY={1.3}
        color={SALEM.blush}
        inner="#FFF6E6"
        alpha={0}
        power={1.5}
        renderOrder={6}
        onMaterial={(m) => {
          halo.current = m;
        }}
      />
      <pointLight
        ref={lamp}
        position={[SPOT[0], 2.2, 1.2]}
        color="#FFE0B4"
        intensity={0}
        distance={5}
        decay={1.4}
      />
      <Squall opacity={haze} color={SALEM.haze} />
      {effects && <SceneEffects bloom={0.35} threshold={0.88} vignette={0.3} />}
    </>
  );
}
