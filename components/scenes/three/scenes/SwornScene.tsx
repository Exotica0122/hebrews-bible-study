"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  CanvasTexture,
  Color,
  CylinderGeometry,
  MeshStandardMaterial,
  SRGBColorSpace,
  type Group,
  type Mesh,
  type ShaderMaterial,
} from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { Squall } from "../primitives/Coast";
import {
  Ground,
  SALEM,
  SalemLights,
  SalemSky,
  useStone,
} from "../primitives/Salem";
import {
  easeInOutCubic,
  lerp,
  smoothstep,
  useSceneTime,
} from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { lerpColor, setUniform } from "../primitives/mutate";

const PERIOD = 16;
const W = 2.4;
const D = 1.5;
const TOP = 0.95;
const SEAL_R = 0.17;
const WET = new Color(SALEM.clay);
const BAKED = new Color(SALEM.baked);

/** The rolled impression: two registers of a seated king and a standing figure between rows of wedge marks. */
function impression() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 320;
  const g = c.getContext("2d")!;
  g.fillStyle = "#6a4128";
  for (let row = 0; row < 2; row++) {
    const y0 = 30 + row * 150;
    for (let x = 12; x < 500; x += 64) {
      g.beginPath();
      g.ellipse(x + 14, y0 + 24, 6, 6, 0, 0, Math.PI * 2);
      g.fill();
      g.fillRect(x + 8, y0 + 32, 12, 52);
      g.fillRect(x + 4, y0 + 84, 20, 8);
      g.beginPath();
      g.ellipse(x + 44, y0 + 30, 5, 5, 0, 0, Math.PI * 2);
      g.fill();
      g.fillRect(x + 39, y0 + 37, 10, 55);
      g.fillRect(x + 30, y0 + 46, 9, 4);
    }
    for (let x = 6; x < 506; x += 12) {
      g.beginPath();
      g.moveTo(x, y0 + 104);
      g.lineTo(x + 8, y0 + 108);
      g.lineTo(x, y0 + 112);
      g.fill();
    }
  }
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** “The Lord has sworn and will not change his mind”: a cylinder seal rolls across soft clay and leaves the oath pressed in; the clay hardens in the light and the seal is set. */
export function SwornScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const haze = useRef(1);
  const seal = useRef<Group>(null);
  const cover = useRef<Mesh>(null);
  const glow = useRef<ShaderMaterial | null>(null);
  const plinth = useStone(SALEM.stone);
  const clay = useMemo(
    () =>
      new MeshStandardMaterial({
        color: SALEM.clay,
        roughness: 0.85,
        flatShading: true,
      }),
    [],
  );
  const stone = useStone("#3E3340", { roughness: 0.4 });
  const pressed = useMemo(() => {
    const map = impression();
    return {
      map,
      material: new MeshStandardMaterial({
        map,
        transparent: true,
        roughness: 0.9,
        depthWrite: false,
      }),
    };
  }, []);
  const roller = useMemo(
    () => new CylinderGeometry(SEAL_R, SEAL_R, D * 0.9, 16),
    [],
  );
  useEffect(
    () => () => {
      clay.dispose();
      pressed.map.dispose();
      pressed.material.dispose();
      roller.dispose();
    },
    [clay, pressed, roller],
  );

  useSceneTime((t, _dt, { camera }) => {
    const p = t % PERIOD;
    haze.current = 1 - smoothstep(0, 1.4, p) + smoothstep(14.4, 16, p);
    camera.position.set(Math.sin(t * 0.06) * 0.25, 3.4, mobile ? 6.4 : 4.6);
    camera.lookAt(0, TOP, 0);
    const roll = easeInOutCubic((p - 2.5) / 5.5);
    const x = lerp(-W / 2, W / 2, roll);
    if (seal.current) {
      seal.current.position.x = x;
      seal.current.rotation.z = -x / SEAL_R;
      seal.current.position.y = TOP + SEAL_R + smoothstep(8.2, 9.4, p) * 0.5;
    }
    if (cover.current) {
      const left = W / 2 - x;
      cover.current.scale.x = Math.max(left, 0.0001);
      cover.current.position.x = W / 2 - left / 2;
      cover.current.visible = left > 0.001;
    }
    lerpColor(clay, WET, BAKED, smoothstep(9, 12, p));
    if (glow.current)
      setUniform(
        glow.current,
        "uAlpha",
        0.35 * smoothstep(9, 11.5, p) * (1 - smoothstep(14, 15.6, p)),
      );
  });

  return (
    <>
      <fog attach="fog" args={[SALEM.haze, 8, 30]} />
      <SalemSky horizonY={-2} />
      <SalemLights sun={[-6, 3, 2]} />
      <Ground />
      <mesh material={plinth} position={[0, 0.35, 0]}>
        <boxGeometry args={[W + 1.4, 0.7, D + 1]} />
      </mesh>
      <mesh material={clay} position={[0, TOP - 0.12, 0]}>
        <boxGeometry args={[W, 0.24, D]} />
      </mesh>
      <mesh
        material={pressed.material}
        position={[0, TOP + 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[W * 0.98, D * 0.92]} />
      </mesh>
      <mesh
        ref={cover}
        material={clay}
        position={[0, TOP + 0.004, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1, D * 0.94]} />
      </mesh>
      <group ref={seal} position={[-W / 2, TOP + SEAL_R, 0]}>
        <mesh
          geometry={roller}
          material={stone}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
      <Glow
        position={[0, TOP + 0.3, 0]}
        size={4}
        scaleY={0.6}
        color={SALEM.blush}
        inner="#FFF2DC"
        alpha={0}
        power={1.5}
        renderOrder={6}
        onMaterial={(m) => {
          glow.current = m;
        }}
      />
      <Squall opacity={haze} color={SALEM.haze} />
      {effects && <SceneEffects bloom={0.3} threshold={0.9} vignette={0.35} />}
    </>
  );
}
