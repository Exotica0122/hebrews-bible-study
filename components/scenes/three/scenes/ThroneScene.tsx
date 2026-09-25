"use client";

import { useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import type { Mesh, ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { Glow } from "../primitives/Glow";
import { Flames } from "../primitives/Flames";
import { Starfield } from "../primitives/Starfield";
import { useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const EMBERS: [number, number][] = [[0.18, 0.62], [0.27, 0.5], [0.13, 0.43], [0.34, 0.68]];

export function ThroneScene({ mobile }: SceneProps) {
  const { width, height } = useThree((s) => s.viewport);
  useResetCameraOnUnmount();
  const gust = useRef(0);
  const windA = useRef<ShaderMaterial>(null);
  const windB = useRef<ShaderMaterial>(null);
  const windMeshA = useRef<Mesh>(null);
  const windMeshB = useRef<Mesh>(null);

  const px = 0.16 * width;
  const emitters = useMemo(
    () => EMBERS.map(([l, t]) => [(l - 0.5) * width, (0.5 - t) * height - 0.3, 0] as [number, number, number]),
    [width, height],
  );

  useSceneTime((t) => {
    const g = (0.5 + 0.5 * Math.sin(t * 0.7)) * (0.6 + 0.4 * Math.sin(t * 1.9 + 1.3));
    gust.current = g * g * 0.9;
    const a = 0.05 + gust.current * 0.3;
    if (windA.current) windA.current.uniforms.uAlpha.value = a;
    if (windB.current) windB.current.uniforms.uAlpha.value = a * 0.7;
    const drift = ((t * 0.6) % 2) - 1;
    if (windMeshA.current) windMeshA.current.position.x = -0.3 * width - drift * 0.6;
    if (windMeshB.current) windMeshB.current.position.x = -0.28 * width - drift * 0.4;
  });

  return (
    <>
      <Starfield count={mobile ? 400 : 900} />
      <Glow position={[px, 0.08 * height, -0.5]} size={mobile ? 6 : 9} color="#B7892C" alpha={0.15} power={2.4} renderOrder={2} />
      <Glow position={[px, 0.12 * height, 0]} size={1} scaleX={mobile ? 0.9 : 1.3} scaleY={mobile ? 3.6 : 5.2} color="#F3D38A" alpha={0.25} power={2.2} renderOrder={5} />
      <Glow position={[px, 0.12 * height, 0]} size={1} scaleX={0.28} scaleY={mobile ? 3.4 : 5} color="#F3D38A" inner="#FFF8E8" alpha={0.95} power={1.1} renderOrder={6} />
      <Glow position={[px, -0.1 * height, 0]} size={1} scaleX={mobile ? 2.6 : 3.6} scaleY={0.06} color="#F3D38A" alpha={0.8} power={1} renderOrder={7} />
      <Flames emitters={emitters} count={mobile ? 60 : 120} rise={mobile ? 1.1 : 1.5} size={mobile ? 7 : 9} gust={gust} />
      <Glow position={[-0.3 * width, 0.05 * height, 0]} size={1} scaleX={mobile ? 2.2 : 3.4} scaleY={0.02} color="#EEE4CF" alpha={0.1} power={1} rotation={0.14} renderOrder={4} onMesh={(m) => { windMeshA.current = m; }} onMaterial={(m) => { windA.current = m; }} />
      <Glow position={[-0.28 * width, -0.04 * height, 0]} size={1} scaleX={mobile ? 2 : 3} scaleY={0.02} color="#EEE4CF" alpha={0.08} power={1} rotation={0.09} renderOrder={4} onMesh={(m) => { windMeshB.current = m; }} onMaterial={(m) => { windB.current = m; }} />
    </>
  );
}
