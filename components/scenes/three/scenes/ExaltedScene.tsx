"use client";

import { useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Group, type Mesh, type ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow, Light } from "../primitives/Glow";
import { GodRay } from "../primitives/GodRay";
import { Starfield } from "../primitives/Starfield";
import { easeOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const DUST: [number, number, number][] = [[0.36, 0.66, 0.4], [0.46, 0.68, 0.35], [0.56, 0.67, 0.4], [0.64, 0.69, 0.3]];

export function ExaltedScene({ mobile, effects }: SceneProps) {
  const { width, height } = useThree((s) => s.viewport);
  useResetCameraOnUnmount();
  const light = useRef<Group>(null);
  const horizon = useRef<Mesh>(null);
  const horizonMat = useRef<ShaderMaterial>(null);
  const hazeMat = useRef<ShaderMaterial>(null);
  const beamGroup = useRef<Group>(null);
  const dustMats = useRef<(ShaderMaterial | null)[]>([]);
  const dustMeshes = useRef<(Mesh | null)[]>([]);

  const top = 0.24 * height;
  const bottom = -0.35 * height;
  const horizonY = -0.08 * height;
  const beamFrom = useMemo<[number, number, number]>(() => [0, 0, 0], []);
  const beamTo = useMemo<[number, number, number]>(() => [0, -0.6 * height, 0.5], [height]);

  useSceneTime((t) => {
    const rise = easeOutCubic(t / 6);
    const y = lerp(bottom, top, rise) + Math.sin(t * 0.6) * 0.03;
    if (light.current) light.current.position.y = y;
    if (beamGroup.current) {
      beamGroup.current.position.y = y;
      beamGroup.current.visible = t < 9;
    }
    const settle = smoothstep(3, 6, t);
    if (horizon.current) {
      horizon.current.scale.x = lerp(0.6, 1, settle) * (mobile ? 5 : 9);
      horizon.current.position.y = lerp(horizonY - 0.15, horizonY, settle);
    }
    if (horizonMat.current) horizonMat.current.uniforms.uAlpha.value = 1.0 * settle;
    if (hazeMat.current) hazeMat.current.uniforms.uAlpha.value = 0.35 * settle;
    dustMats.current.forEach((m, i) => {
      if (m) m.uniforms.uAlpha.value = DUST[i][2] * (1 - 0.5 * settle);
      const d = dustMeshes.current[i];
      if (d) d.position.y = (0.5 - DUST[i][1]) * height - 0.2 * settle;
    });
  });

  return (
    <>
      <Starfield count={mobile ? 400 : 900} />
      <group ref={light} position={[0, bottom, 0]}>
        <Light size={mobile ? 0.6 : 0.8} coronaScale={8} intensity={1.15} renderOrder={12} />
      </group>
      <group ref={beamGroup} position={[0, bottom, 0]}>
        <GodRay from={beamFrom} to={beamTo} radiusStart={0.02} radiusEnd={0.12} alpha={0.35} renderOrder={6} />
      </group>
      <Glow position={[0, horizonY, 0]} size={1} scaleX={mobile ? 5 : 9} scaleY={0.045} color="#F3D38A" inner="#FFF8E8" alpha={0} power={1} renderOrder={8} onMesh={(m) => { horizon.current = m; }} onMaterial={(m) => { horizonMat.current = m; }} />
      <Glow position={[0, horizonY - 0.12, 0]} size={1} scaleX={mobile ? 2.6 : 4.2} scaleY={0.28} color="#B7892C" alpha={0} power={1.4} renderOrder={7} onMaterial={(m) => { hazeMat.current = m; }} />
      {DUST.map(([l, tp, a], i) => (
        <Glow
          key={i}
          position={[(l - 0.5) * width, (0.5 - tp) * height, 0]}
          size={0.14}
          color="#A89A82"
          alpha={a}
          power={1.2}
          renderOrder={5}
          onMesh={(m) => { dustMeshes.current[i] = m; }}
          onMaterial={(m) => { dustMats.current[i] = m; }}
        />
      ))}
      {effects && <SceneEffects bloom={0.9} />}
    </>
  );
}
