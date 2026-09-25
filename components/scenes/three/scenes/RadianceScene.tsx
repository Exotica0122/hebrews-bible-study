"use client";

import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import type { ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { Glow, Light } from "../primitives/Glow";
import { GodRay } from "../primitives/GodRay";
import { Starfield } from "../primitives/Starfield";
import { easeOutCubic, lerp, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

export function RadianceScene({ mobile }: SceneProps) {
  const { width, height } = useThree((s) => s.viewport);
  const camera = useThree((s) => s.camera);
  const coreMat = useRef<ShaderMaterial>(null);
  useResetCameraOnUnmount();

  const sun: [number, number, number] = [0.14 * width, 0.16 * height, 0];
  const rayEnd: [number, number, number] = [sun[0] - 0.08 * width, -1.2 * height, 2.5];

  useSceneTime((t) => {
    const dolly = lerp(9, 7.2, easeOutCubic(t / 20));
    const breath = Math.sin(t * 0.5) * 0.12;
    camera.position.set(0, 0, dolly + breath);
    camera.lookAt(0, 0, 0);
    if (coreMat.current) coreMat.current.uniforms.uAlpha.value = 1 + Math.sin(t * 0.8) * 0.05;
  });

  return (
    <>
      <Starfield count={mobile ? 400 : 900} />
      <Glow position={[sun[0], sun[1], -0.5]} size={mobile ? 9 : 16} color="#B7892C" alpha={0.26} power={2.4} renderOrder={2} />
      <GodRay from={sun} to={rayEnd} radiusStart={0.4} radiusEnd={0.42 * width} alpha={0.22} renderOrder={4} />
      <GodRay from={sun} to={rayEnd} radiusStart={0.12} radiusEnd={0.12 * width} color="#FFF4D6" alpha={0.32} renderOrder={5} />
      <Light position={sun} size={mobile ? 1.5 : 2.1} intensity={1.1} coronaScale={4} renderOrder={10} />
      <Glow position={sun} size={mobile ? 1.0 : 1.4} color="#FFF8E8" inner="#FFFFFF" alpha={1} power={0.9} renderOrder={14} onMaterial={(m) => { coreMat.current = m; }} />
    </>
  );
}
