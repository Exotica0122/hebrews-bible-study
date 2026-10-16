"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  MeshStandardMaterial,
  type Group,
  type MeshBasicMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Soft } from "../primitives/Garden";
import { Figure } from "../primitives/Sanctuary";
import {
  Cliff,
  COAST,
  CoastLights,
  Headlands,
  Sea,
  Squall,
  StormSky,
} from "../primitives/Coast";
import { lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setOpacity } from "../primitives/mutate";

const PERIOD = 16;
const GROUND = -1.2;
const STRIDE = 0.55;
const FIRST = 2.2;
const PACE = 0.55;
/** The prints of those who went ahead, left and right in turn, from near to far up the beach. */
const PRINTS = Array.from({ length: 30 }, (_, i) => ({
  x: 1.9 + (i % 2 ? 0.13 : -0.13) + Math.sin(i * 0.3) * 0.15,
  z: 2 - i * STRIDE,
}));
const NEW = PRINTS.slice(0, 16);
/** Those walking on ahead: x, z, robe. */
const AHEAD: [number, number, string][] = [
  [1.7, -13.5, "#4C4038"],
  [2.9, -15.5, "#3E4A52"],
  [1.1, -17.5, "#5A4A3A"],
];

/** “Imitators of those who through faith and patience inherit the promises”: prints run up the wet sand toward those walking on ahead, and one by one new steps are pressed into the old. */
export function FootstepsScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const squall = useRef(1);
  const fresh = useRef<(MeshBasicMaterial | null)[]>([]);
  const ahead = useRef<Group>(null);
  const sand = useMemo(
    () => new MeshStandardMaterial({ color: "#A8987A", roughness: 0.55 }),
    [],
  );
  const dry = useMemo(
    () => new MeshStandardMaterial({ color: COAST.sand, roughness: 1 }),
    [],
  );
  useEffect(
    () => () => {
      sand.dispose();
      dry.dispose();
    },
    [sand, dry],
  );

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    squall.current = 1 - smoothstep(0, 1.4, p) + smoothstep(14.4, 16, p);
    const walked = smoothstep(FIRST, FIRST + NEW.length * PACE + 1, p);
    camera.position.set(
      1.2 + Math.sin(t * 0.05) * 0.1,
      GROUND + 1.25,
      lerp(mobile ? 6.5 : 5, mobile ? 3.5 : 2, walked),
    );
    camera.lookAt(1.5, GROUND + 0.25, -8);
    ahead.current?.position.setZ(-p * 0.18);
    fresh.current.forEach(
      (m, i) =>
        m &&
        setOpacity(
          m,
          0.9 * smoothstep(FIRST + i * PACE, FIRST + i * PACE + 0.25, p),
        ),
    );
  });

  return (
    <>
      <fog attach="fog" args={[COAST.mist, 10, 44]} />
      <StormSky horizonY={-1.5} warmth={0.35} />
      <Glow
        position={[2, 0.2, -44]}
        size={22}
        scaleY={0.45}
        color="#C9B27E"
        inner={COAST.break}
        alpha={0.5}
        power={1.5}
        renderOrder={-9}
      />
      <Headlands />
      <Sea
        y={GROUND - 0.3}
        near={8}
        breakAt={[-2, -30]}
        breakStrength={1.2}
        amp={0.5}
      />
      <CoastLights sun={[-3, 3, -10]} intensity={1.4} />
      <mesh
        position={[4, GROUND, -16]}
        rotation={[-Math.PI / 2, 0, 0.05]}
        material={sand}
      >
        <planeGeometry args={[8, 48]} />
      </mesh>
      <mesh
        position={[9, GROUND + 0.01, -16]}
        rotation={[-Math.PI / 2, 0, 0.05]}
        material={dry}
      >
        <planeGeometry args={[4, 48]} />
      </mesh>
      <Soft
        position={[0.05, GROUND + 0.01, -16]}
        rotation={[-Math.PI / 2, 0, 0.05]}
        size={1}
        scaleX={0.5}
        scaleY={48}
        color={COAST.foam}
        opacity={0.7}
        renderOrder={2}
      />
      <Cliff position={[13, GROUND, -22]} width={9} height={2.6} flip />
      {PRINTS.map(({ x, z }, i) => (
        <Soft
          key={i}
          position={[x, GROUND + 0.012, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          size={0.42}
          scaleX={0.42}
          color="#4E4434"
          opacity={0.6}
          renderOrder={2}
        />
      ))}
      {NEW.map(({ x, z }, i) => (
        <Soft
          key={i}
          position={[x, GROUND + 0.014, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          size={0.38}
          scaleX={0.4}
          color="#241F18"
          opacity={0}
          renderOrder={3}
          onMaterial={(m) => {
            fresh.current[i] = m;
          }}
        />
      ))}
      <group ref={ahead}>
        {AHEAD.map(([x, z, robe]) => (
          <Figure
            key={z}
            position={[x, GROUND, z]}
            robe={robe}
            rotationY={Math.PI}
            scale={0.95}
          />
        ))}
      </group>
      <Squall opacity={squall} />
      {effects && <SceneEffects bloom={0.3} threshold={0.9} vignette={0.3} />}
    </>
  );
}
