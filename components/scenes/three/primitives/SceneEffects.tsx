"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, GodRays, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import { Color, type Mesh } from "three";
import { useTune } from "../tune";

const NIGHT = new Color("#14110D");

interface SceneEffectsProps {
  sun?: Mesh | null;
  bloom?: number;
}

/** Tier-3 post stack: bloom for the lights, filmic grain and a vignette, plus screen-space god rays when a sun mesh is given. */
export function SceneEffects({ sun, bloom = 0.6 }: SceneEffectsProps) {
  const gl = useThree((s) => s.gl);
  const tune = useTune("Post", {
    bloomIntensity: { value: bloom, min: 0, max: 3, step: 0.05 },
    bloomThreshold: { value: 0.72, min: 0, max: 1, step: 0.01 },
    noise: { value: 0.05, min: 0, max: 0.3, step: 0.01 },
    vignette: { value: 0.45, min: 0, max: 1, step: 0.05 },
    godRayWeight: { value: 0.3, min: 0, max: 1, step: 0.05 },
  });

  useEffect(() => {
    gl.setClearColor(NIGHT, 1);
    return () => gl.setClearColor(0x000000, 0);
  }, [gl]);

  return (
    <EffectComposer multisampling={0} depthBuffer={false}>
      <Bloom intensity={tune.bloomIntensity} luminanceThreshold={tune.bloomThreshold} luminanceSmoothing={0.15} mipmapBlur radius={0.55} />
      {sun ? (
        <GodRays sun={sun} density={0.8} decay={0.92} weight={tune.godRayWeight} exposure={0.14} clampMax={0.9} samples={36} kernelSize={KernelSize.SMALL} blur />
      ) : (
        <></>
      )}
      <Noise opacity={tune.noise} blendFunction={BlendFunction.SOFT_LIGHT} />
      <Vignette offset={0.25} darkness={tune.vignette} eskil={false} />
    </EffectComposer>
  );
}
