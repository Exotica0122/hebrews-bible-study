"use client";

import { useEffect, useMemo, useRef } from "react";
import { MeshStandardMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Sky } from "../primitives/Earth";
import { Figure } from "../primitives/Sanctuary";
import { Countless, hash, Sea } from "../primitives/Coast";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const PERIOD = 17;
const GROUND = -1.2;
const SHORE = -2.6;
const NIGHT_SEA = {
  deep: "#050B12",
  sea: "#13233A",
  sky: "#2A3D5C",
  mist: "#0E1A2C",
};

/** Stars across the sky, scattered so the first to appear are spread out and the rest fill between. */
function stars(n: number) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const az = (hash(i) - 0.5) * 2.4;
    const el = Math.pow(hash(i + 0.5), 0.8) * 1.1 + 0.02;
    a[i * 3] = Math.sin(az) * 40;
    a[i * 3 + 1] = GROUND + Math.sin(el) * 34 + 0.6;
    a[i * 3 + 2] = -Math.cos(az) * 40 * Math.cos(el);
  }
  return a;
}

/** Grains catching the starlight on the sand between the figure and the water. */
function grains(n: number) {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    a[i * 3] = (hash(i + 0.3) - 0.5) * 9;
    a[i * 3 + 1] = GROUND + 0.01;
    a[i * 3 + 2] = SHORE + 0.1 + Math.pow(hash(i + 0.9), 0.6) * 5.6;
  }
  return a;
}

/** “Surely I will bless you and multiply you”: night on the seashore. Abraham stands at the water’s edge while the stars come out until they cannot be counted, and the sand at his feet glints with as many grains. */
export function OathScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const sky = useRef(0);
  const sand = useRef(0);
  const starPoints = useMemo(() => stars(mobile ? 1600 : 3200), [mobile]);
  const grainPoints = useMemo(() => grains(mobile ? 900 : 1800), [mobile]);
  const beach = useMemo(
    () => new MeshStandardMaterial({ color: "#77787E", roughness: 1 }),
    [],
  );
  useEffect(() => () => beach.dispose(), [beach]);

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    const out = smoothstep(15, 16.8, p);
    sky.current = (0.03 + 0.97 * smoothstep(1, 10, p)) * (1 - out);
    sand.current = smoothstep(4, 11.5, p) * (1 - out);
    const up = smoothstep(1, 9, p);
    camera.position.set(
      Math.sin(t * 0.04) * 0.2,
      GROUND + 0.9,
      mobile ? 5.2 : 4.2,
    );
    camera.lookAt(0, GROUND + 0.9 + up * 1.6, -6);
  });

  return (
    <>
      <Sky
        top="#03060D"
        horizon="#1A2A44"
        glow="#2E4466"
        horizonY={GROUND - 0.2}
        glowStrength={0.35}
        z={-45}
      />
      <Countless points={starPoints} reveal={sky} size={mobile ? 2.2 : 2.6} />
      <Sea
        y={GROUND - 0.08}
        near={SHORE}
        far={-44}
        amp={0.35}
        breakAt={[0, -30]}
        breakStrength={0}
        tint={NIGHT_SEA}
        fog={[8, 40]}
      />
      <hemisphereLight args={["#3A4E78", "#0A0E16", 0.9]} />
      <directionalLight position={[2, 6, -6]} intensity={0.5} color="#AFC2E6" />
      <mesh
        position={[0, GROUND, SHORE + 4]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={beach}
      >
        <planeGeometry args={[60, 8]} />
      </mesh>
      <Countless
        points={grainPoints}
        reveal={sand}
        size={mobile ? 2.2 : 2.8}
        color="#E4E9F2"
      />
      <Figure
        position={[0.35, GROUND, SHORE + 0.6]}
        robe="#2A2430"
        rotationY={Math.PI}
      />
      {effects && <SceneEffects bloom={0.7} threshold={0.5} vignette={0.5} />}
    </>
  );
}
