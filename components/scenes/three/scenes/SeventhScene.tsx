"use client";

import { useEffect, useMemo, useRef } from "react";
import { MeshBasicMaterial, Shape, ShapeGeometry, type Group, type ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow } from "../primitives/Glow";
import { figureGeometry, ridgeY } from "../primitives/Earth";
import { Clouds, DAY, DayLights, DaySky, GARDEN_HILLS, GardenHills, OliveTree, Soft, Sun } from "../primitives/Garden";
import { easeOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setOpacity, setUniform } from "../primitives/mutate";

const PERIOD = 18;
const START = 0.8;
const DAY_S = 1.5;
const SEVENTH = START + DAY_S * 6;
const UNDO = 16.3;
const CLOUDS: [number, number, number][] = [[-8, 4, 6], [0, 5.2, 8], [8, 3.8, 6]];
const TREES: [number, number][] = [[-6.4, 1.2], [-3.1, 0.9], [3.8, 1.3], [6.1, 0.9]];
/** Birds: start x, height, speed. */
const BIRDS: [number, number, number][] = [[-7, 2.2, 0.9], [-6.2, 2.6, 0.8], [-7.6, 2.9, 1], [-5.6, 1.9, 0.85], [-8.2, 2.4, 0.95]];
const PEOPLE: [number, number][] = [[-0.5, 1], [0.1, 0.95]];

function birdGeometry() {
  const s = new Shape();
  s.moveTo(-0.22, 0.06);
  s.quadraticCurveTo(-0.1, 0.07, 0, -0.02);
  s.quadraticCurveTo(0.1, 0.07, 0.22, 0.06);
  s.quadraticCurveTo(0.1, 0.03, 0, -0.05);
  s.quadraticCurveTo(-0.1, 0.03, -0.22, 0.06);
  return new ShapeGeometry(s, 6);
}

/** Time `p` into day `k` (0–5) as 0→1 over the first part of that day. */
const dayIn = (p: number, k: number) => easeOutCubic((p - START - k * DAY_S) / (DAY_S * 0.8));

/** “His works were finished from the foundation of the world”: the garden is made, day by day, and on the seventh it stands complete and still. */
export function SeventhScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const land = useRef<Group>(null);
  const birds = useRef<Group>(null);
  const core = useRef<ShaderMaterial | null>(null);
  const halo = useRef<ShaderMaterial | null>(null);
  const water = useRef<ShaderMaterial>(null);
  const clouds = useRef<MeshBasicMaterial[]>([]);
  const moon = useRef<MeshBasicMaterial>(null);
  const warmth = useRef<ShaderMaterial>(null);
  const marks = useRef<(ShaderMaterial | null)[]>([]);
  const bird = useMemo(() => birdGeometry(), []);
  const figure = useMemo(() => figureGeometry(), []);
  const ink = useMemo(() => new MeshBasicMaterial({ color: DAY.ink, transparent: true, opacity: 0 }), []);
  const birdInk = useMemo(() => new MeshBasicMaterial({ color: "#3A4250", transparent: true, opacity: 0 }), []);
  useEffect(
    () => () => {
      bird.dispose();
      figure.dispose();
      ink.dispose();
      birdInk.dispose();
    },
    [bird, figure, ink, birdInk],
  );

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(Math.sin(t * 0.05) * 0.12, 0.1, mobile ? 9.5 : 8);
    camera.lookAt(0, -0.2, -8);
    const p = t % PERIOD;
    const keep = 1 - smoothstep(UNDO, UNDO + 1.3, p);
    const made = (k: number) => dayIn(p, k) * keep;

    if (core.current) setUniform(core.current, "uAlpha", made(0));
    if (halo.current) setUniform(halo.current, "uAlpha", 0.45 * made(0));
    if (water.current) setUniform(water.current, "uAlpha", 0.6 * made(1));
    clouds.current.forEach((m) => setOpacity(m, 0.8 * made(1)));
    land.current?.position.setY(lerp(-1.6, 0, made(2)));
    if (moon.current) setOpacity(moon.current, 0.7 * made(3));

    const flying = made(4);
    setOpacity(birdInk, flying);
    const rest = smoothstep(SEVENTH, SEVENTH + 2, p);
    birds.current?.children.forEach((b, i) => {
      const [x0, y, v] = BIRDS[i];
      const run = Math.max(0, p - START - 4 * DAY_S) * v * (1 - 0.6 * rest);
      b.position.set(x0 + run * 1.6, y + Math.sin(run * 1.3 + i) * 0.15, -9);
      b.scale.set(1, 0.6 + 0.4 * Math.abs(Math.sin(t * 7 + i * 1.3)) * (1 - 0.5 * rest), 1);
    });
    setOpacity(ink, made(5));

    if (warmth.current) setUniform(warmth.current, "uAlpha", 0.22 * rest * keep);
    marks.current.forEach((m, i) => {
      if (!m) return;
      const done = i < 6 ? dayIn(p, i) : smoothstep(SEVENTH, SEVENTH + 1.2, p);
      setUniform(m, "uAlpha", (0.25 + 0.75 * done * keep) * smoothstep(0, 0.6, p) * (1 - smoothstep(17.4, 18, p)));
    });
  });

  const [far, mid, near] = GARDEN_HILLS;
  return (
    <>
      <DaySky />
      <Sun position={[-5, 4.6, -17.6]} size={1} onMaterials={(c, h) => { core.current = c; halo.current = h; }} />
      <Soft position={[6.5, 5.2, -17.8]} size={0.9} color="#F4F1EA" opacity={0} renderOrder={-7} onMaterial={(m) => { moon.current = m; }} />
      <Clouds clouds={CLOUDS} opacity={0} onMaterial={(m) => { if (!clouds.current.includes(m)) clouds.current.push(m); }} />
      <group ref={birds}>
        {BIRDS.map((_, i) => (
          <mesh key={i} geometry={bird} material={birdInk} renderOrder={-6} />
        ))}
      </group>
      <DayLights sun={[-5, 6, 2]} />
      <group ref={land} position={[0, -1.6, 0]}>
        <GardenHills layers={[far, mid]} />
        {TREES.map(([x, s]) => (
          <OliveTree key={x} position={[x, ridgeY(mid, x) - 0.05, mid.z + 0.2]} scale={s} />
        ))}
      </group>
      <GardenHills layers={[near]} />
      <Glow position={[0, -1.66, -4.6]} size={1} scaleX={40} scaleY={0.32} color="#7FA0AA" inner={DAY.water} alpha={0} power={1.1} renderOrder={-5} onMaterial={(m) => { water.current = m; }} />
      {PEOPLE.map(([x, s]) => (
        <mesh key={x} geometry={figure} material={ink} position={[x, ridgeY(near, x) - 0.02, near.z + 0.4]} scale={0.34 * s} renderOrder={4} />
      ))}
      <Glow position={[0, -0.6, -6]} size={1} scaleX={30} scaleY={4} color="#E9B982" inner="#FFF1D6" alpha={0} power={1.4} renderOrder={6} onMaterial={(m) => { warmth.current = m; }} />
      {Array.from({ length: 7 }, (_, i) => (
        <Glow key={i} position={[(i - 3) * (mobile ? 0.24 : 0.32), -0.82, 3]} size={i === 6 ? 0.3 : 0.18} color={i === 6 ? "#F3C77A" : "#E8E2D2"} inner="#FFF8E8" alpha={0} power={1.4} renderOrder={70} onMaterial={(m) => { marks.current[i] = m; }} />
      ))}
      {effects && <SceneEffects bloom={0.25} threshold={0.95} vignette={0.25} />}
    </>
  );
}
