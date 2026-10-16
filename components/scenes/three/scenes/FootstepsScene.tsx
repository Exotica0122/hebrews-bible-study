"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  BufferAttribute,
  Color,
  IcosahedronGeometry,
  MeshStandardMaterial,
  PlaneGeometry,
  type Group,
  type MeshBasicMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Soft } from "../primitives/Garden";
import { Figure } from "../primitives/Sanctuary";
import {
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
const AHEAD_Z = -14.5;

/** The waterline's x along the beach, wandering in and out. */
const shore = (z: number) =>
  0.2 + Math.sin(z * 0.35) * 0.3 + Math.sin(z * 0.9 + 1) * 0.1;

/** Sand that shelves down under the sea at a wandering waterline: wet and dark near the water, dry further up. */
function beach() {
  const g = new PlaneGeometry(16, 48, 80, 120);
  g.rotateX(-Math.PI / 2);
  g.translate(4, 0, -16);
  const p = g.attributes.position;
  const colors = new Float32Array(p.count * 3);
  const wet = new Color("#6F6450");
  const damp = new Color("#A8987A");
  const dry = new Color(COAST.sand);
  const foam = new Color("#C9CCC4");
  const c = new Color();
  for (let i = 0; i < p.count; i++) {
    const d = p.getX(i) - shore(p.getZ(i));
    const k = Math.min(Math.max((d + 1.2) / 2.2, 0), 1);
    p.setY(i, GROUND - 0.45 * (1 - k * k * (3 - 2 * k)));
    c.lerpColors(wet, damp, Math.min(Math.max(d / 1.5, 0), 1));
    c.lerp(dry, Math.min(Math.max((d - 2.5) / 2.5, 0), 1));
    c.lerp(foam, 0.5 * Math.max(0, 1 - Math.abs(d + 0.45) / 0.25));
    c.toArray(colors, i * 3);
  }
  g.setAttribute("color", new BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

/** A weathered headland of rock with turf on its crown, flat-bottomed where it meets the sand. */
function outcrop() {
  const g = new IcosahedronGeometry(1, 4);
  const p = g.attributes.position;
  const colors = new Float32Array(p.count * 3);
  const rock = new Color("#5E5A50");
  const turf = new Color(COAST.turf);
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const r =
      1 +
      0.16 * Math.sin(x * 3.1 + 1) * Math.sin(y * 2.3) * Math.sin(z * 2.7 + 2) +
      0.07 * Math.sin(x * 7.3 + z * 5.1) +
      0.04 * Math.sin(y * 11 + x * 4);
    p.setXYZ(i, x * r, Math.max(y * r, -0.15), z * r);
    (y > 0.62 ? turf : rock).toArray(colors, i * 3);
  }
  g.setAttribute("color", new BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

/** “Imitators of those who through faith and patience inherit the promises”: prints run up the wet sand toward those walking on ahead, and one by one new steps are pressed into the old. */
export function FootstepsScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const squall = useRef(1);
  const fresh = useRef<(MeshBasicMaterial | null)[]>([]);
  const ahead = useRef<Group>(null);
  const shape = useMemo(() => ({ beach: beach(), rock: outcrop() }), []);
  const sand = useMemo(
    () => new MeshStandardMaterial({ vertexColors: true, roughness: 0.6 }),
    [],
  );
  const stone = useMemo(
    () =>
      new MeshStandardMaterial({
        vertexColors: true,
        roughness: 1,
        flatShading: true,
      }),
    [],
  );
  useEffect(
    () => () => {
      shape.beach.dispose();
      shape.rock.dispose();
      sand.dispose();
      stone.dispose();
    },
    [shape, sand, stone],
  );

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    squall.current = 1 - smoothstep(0, 1.4, p) + smoothstep(14.4, 16, p);
    const walked = smoothstep(FIRST, FIRST + NEW.length * PACE + 1, p);
    camera.position.set(
      1.2 + Math.sin(t * 0.05) * 0.1,
      GROUND + (mobile ? 2.4 : 1.25),
      lerp(mobile ? 7 : 5, mobile ? 4 : 2, walked),
    );
    camera.lookAt(1.5, GROUND + (mobile ? -0.7 : 0.25), -8);
    if (ahead.current) {
      const step = p * Math.PI * 1.7;
      ahead.current.position.set(
        1.9 + Math.sin(step) * 0.03,
        Math.abs(Math.sin(step)) * 0.035,
        AHEAD_Z - p * 0.22,
      );
      ahead.current.rotation.z = Math.sin(step) * 0.035;
    }
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
      <mesh geometry={shape.beach} material={sand} />
      <mesh
        geometry={shape.rock}
        material={stone}
        position={[12.5, GROUND - 0.1, -25]}
        scale={[5.5, 2.8, 3.6]}
        rotation={[0, 0.5, 0]}
      />
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
        <Figure
          position={[0, GROUND, 0]}
          robe="#4C4038"
          rotationY={Math.PI}
          scale={0.95}
        />
      </group>
      <Squall opacity={squall} />
      {effects && <SceneEffects bloom={0.3} threshold={0.9} vignette={0.3} />}
    </>
  );
}
