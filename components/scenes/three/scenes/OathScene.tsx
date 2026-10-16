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
const SHORE = -5.5;
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
    a[i * 3] = (hash(i + 0.3) - 0.5) * 14;
    a[i * 3 + 1] = GROUND + 0.01;
    a[i * 3 + 2] = SHORE + 0.1 + Math.pow(hash(i + 0.9), 1.5) * 8;
  }
  return a;
}

/** “Surely I will bless you and multiply you”: night on the seashore. Abraham stands at the water’s edge while the stars come out until they cannot be counted, and the sand at his feet glints with as many grains. */
export function OathScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const sky = useRef(0);
  const sand = useRef(0);
  const starPoints = useMemo(() => stars(mobile ? 3000 : 5200), [mobile]);
  const grainPoints = useMemo(() => grains(mobile ? 1800 : 3000), [mobile]);
  const beach = useMemo(
    () => new MeshStandardMaterial({ color: "#77787E", roughness: 1 }),
    [],
  );
  useEffect(() => () => beach.dispose(), [beach]);

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    const out = smoothstep(15, 16.8, p);
    sky.current = (0.03 + 0.97 * smoothstep(1, 11, p)) * (1 - out);
    sand.current = smoothstep(5.5, 12.5, p) * (1 - out);
    camera.position.set(
      Math.sin(t * 0.04) * 0.2,
      GROUND + (mobile ? 2.4 : 1.7),
      mobile ? 5.4 : 4.2,
    );
    camera.lookAt(mobile ? 0.4 : 0.6, GROUND + (mobile ? 0.4 : 0.9), -6);
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
      <Countless points={starPoints} reveal={sky} size={mobile ? 3 : 2.8} />
      <Sea
        y={GROUND - 0.08}
        near={SHORE}
        far={-44}
        amp={0.22}
        breakAt={[0, -30]}
        breakStrength={0}
        tint={NIGHT_SEA}
        fog={[8, 40]}
      />
      <hemisphereLight args={["#3A4E78", "#0A0E16", 0.9]} />
      <directionalLight position={[2, 6, -6]} intensity={0.5} color="#AFC2E6" />
      <directionalLight position={[1, 3, 6]} intensity={1.1} color="#8FA6D0" />
      <mesh
        position={[0, GROUND, SHORE + 7]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={beach}
      >
        <planeGeometry args={[60, 14]} />
      </mesh>
      <Countless
        points={grainPoints}
        reveal={sand}
        size={mobile ? 3.2 : 3.4}
        color="#F2F4FA"
      />
      <Figure
        position={[mobile ? 0.9 : 2.6, GROUND, SHORE + 0.6]}
        robe="#4A4056"
        rotationY={Math.PI}
      />
      {effects && <SceneEffects bloom={0.7} threshold={0.5} vignette={0.5} />}
    </>
  );
}
