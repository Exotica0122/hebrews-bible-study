"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  CylinderGeometry,
  DoubleSide,
  MeshStandardMaterial,
  Vector3,
  type Group,
  type Mesh,
  type PointLight,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Sky } from "../primitives/Earth";
import { Glow } from "../primitives/Glow";
import { GodRay } from "../primitives/GodRay";
import { Cloth } from "../primitives/Sanctuary";
import { Anchor, Boat, Sea, Squall, swell } from "../primitives/Coast";
import { lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 16;
const SURFACE = 2.4;
const BOAT_X = -2.6;
const BOAT_Z = -3.5;
const STORM = 2.4;
const HOLD: [number, number, number] = [3.5, 0.1, -3.1];
/** The veil's near edge, its plane and its top, kept below the swell's lowest trough. */
const VEIL: [number, number, number] = [2.05, -1.7, 1.5];
const VEIL_W = 4.4;
const DEEP = "#2C5560";
const WATER = { deep: "#0B1D24", sea: "#7FA6A4", sky: "#B9D6CF", mist: DEEP };
const bow = new Vector3();
const hold = new Vector3(...HOLD);

/** “A sure and steadfast anchor of the soul, a hope that enters into the inner place behind the curtain”: beneath a storm swell the boat pitches, but its line runs down taut through the water to an anchor gone in behind a curtain, where the light is. */
export function AnchorScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const squall = useRef(1);
  const boat = useRef<Group>(null);
  const bowRef = useRef<Group>(null);
  const rope = useRef<Mesh>(null);
  const light = useRef<ShaderMaterial | null>(null);
  const spill = useRef<ShaderMaterial | null>(null);
  const lamp = useRef<PointLight>(null);
  const line = useMemo(() => new CylinderGeometry(0.014, 0.014, 1, 6), []);
  const hemp = useMemo(
    () => new MeshStandardMaterial({ color: "#8A7A5E", roughness: 1 }),
    [],
  );
  useEffect(
    () => () => {
      line.dispose();
      hemp.dispose();
    },
    [line, hemp],
  );

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    squall.current = 1 - smoothstep(0, 1.4, p) + smoothstep(14.4, 16, p);
    const glow = smoothstep(3.5, 9, p) * (1 - smoothstep(14, 16, p));
    camera.position.set(
      Math.sin(t * 0.07) * 0.15 + (mobile ? 0.5 : 0),
      Math.sin(t * 0.3) * 0.05,
      mobile ? 8.5 : 6,
    );
    camera.lookAt(mobile ? 0.7 : 0, 0.4, -2);
    if (boat.current) {
      const h = (x: number) => swell(x, BOAT_Z, t * 1.4, STORM);
      boat.current.position.y = SURFACE + h(BOAT_X);
      boat.current.rotation.z = (h(BOAT_X + 0.6) - h(BOAT_X - 0.6)) * 0.9;
    }
    if (bowRef.current && rope.current) {
      bowRef.current.getWorldPosition(bow);
      rope.current.position.copy(bow).lerp(hold, 0.5);
      rope.current.scale.set(1, bow.distanceTo(hold), 1);
      rope.current.quaternion.setFromUnitVectors(UP, bow.sub(hold).normalize());
    }
    if (light.current)
      setUniform(light.current, "uAlpha", lerp(0.35, 0.9, glow));
    if (spill.current)
      setUniform(spill.current, "uAlpha", lerp(0.2, 0.95, glow));
    if (lamp.current) lamp.current.intensity = lerp(1, 5, glow);
  });

  return (
    <>
      <fog attach="fog" args={[DEEP, 4, 18]} />
      <Sky
        top={DEEP}
        horizon="#06141A"
        glow="#0E2A32"
        horizonY={-7}
        glowStrength={0.2}
        z={-14}
      />
      <Sea
        y={SURFACE}
        near={9}
        far={-14}
        width={60}
        amp={STORM}
        breakAt={[0, -4]}
        breakStrength={0.3}
        tint={WATER}
        fog={[5, 15]}
        segments={[120, 80]}
        side={DoubleSide}
        speed={1.4}
      />
      {[-3.4, -0.4, 1.6].map((x, i) => (
        <GodRay
          key={x}
          from={[x + 0.6, SURFACE + 0.7, -2 - i]}
          to={[x - 0.9, -3.5, -2.5 - i]}
          radiusStart={0.35}
          radiusEnd={1.2}
          color="#CFE6DC"
          alpha={0.1}
          tipFade={0.35}
        />
      ))}
      <hemisphereLight args={["#8FC0BC", "#0B1D24", 1]} />
      <directionalLight position={[-2, 6, 3]} intensity={1.1} color="#D8ECE4" />
      <group ref={boat} position={[BOAT_X, SURFACE, BOAT_Z]}>
        <Boat scale={1.3} hull="#2E241D" />
        <group ref={bowRef} position={[1.05, 0.05, 0]} />
      </group>
      <mesh ref={rope} geometry={line} material={hemp} />
      <group position={HOLD} rotation={[0, 0, -0.5]}>
        <Anchor />
      </group>
      <Glow
        position={[HOLD[0] - 0.4, HOLD[1] - 0.2, HOLD[2] - 0.6]}
        size={5}
        scaleY={1.5}
        color="#E2A14E"
        inner="#FFF4D6"
        alpha={0.35}
        power={1.4}
        renderOrder={6}
        depthTest
        onMaterial={(m) => {
          light.current = m;
        }}
      />
      <Glow
        position={[VEIL[0] + 0.05, VEIL[2] - 2.4, VEIL[1] + 0.05]}
        size={4.6}
        scaleX={0.22}
        color="#E2A14E"
        inner="#FFE7B0"
        alpha={0.15}
        power={1.6}
        renderOrder={7}
        onMaterial={(m) => {
          spill.current = m;
        }}
      />
      <pointLight
        ref={lamp}
        position={[VEIL[0] - 0.2, 0.2, VEIL[1] - 0.2]}
        color="#FFD49A"
        intensity={1}
        distance={4}
        decay={1.4}
      />
      <Cloth
        kind="veil"
        width={VEIL_W}
        height={VEIL[2] + 3.8}
        position={[VEIL[0] + VEIL_W / 2, -3.8, VEIL[1]]}
        folds={7}
        depth={0.12}
        repeat={1}
      />
      <Squall opacity={squall} color="#2C5560" />
      {effects && <SceneEffects bloom={0.6} threshold={0.7} vignette={0.45} />}
    </>
  );
}

const UP = new Vector3(0, 1, 0);
