"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, Group, Line, LineBasicMaterial, type ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow, Light } from "../primitives/Glow";
import { Starfield } from "../primitives/Starfield";
import { smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";

const DOTS: [number, number][] = [[0.18, 0.46], [0.26, 0.54], [0.37, 0.59], [0.5, 0.61], [0.63, 0.59], [0.74, 0.54], [0.82, 0.46]];
const PERIOD = 9;
const ARC_POINTS = 64;

function bowAt(t: number) {
  const p = t % PERIOD;
  return smoothstep(0, 3, p) * (1 - smoothstep(6, 8, p));
}

export function AngelsScene({ mobile, effects }: SceneProps) {
  const { width, height } = useThree((s) => s.viewport);
  useResetCameraOnUnmount();
  const group = useRef<Group>(null);
  const mats = useRef<(ShaderMaterial | null)[]>([]);
  const halos = useRef<(ShaderMaterial | null)[]>([]);

  const centre: [number, number, number] = [0, 0.18 * height, 0];
  const dots = useMemo(
    () => DOTS.map(([l, t]) => ({ x: (l - 0.5) * width, y: (0.5 - t) * height, w: 1 - Math.abs(l - 0.5) / 0.32 })),
    [width, height],
  );

  const line = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(new Float32Array(ARC_POINTS * 3), 3));
    const m = new LineBasicMaterial({ color: "#F3D38A", transparent: true, opacity: 0.18, depthTest: false });
    return new Line(g, m);
  }, []);
  useEffect(
    () => () => {
      line.geometry.dispose();
      (line.material as LineBasicMaterial).dispose();
    },
    [line],
  );

  useSceneTime((t) => {
    const bow = bowAt(t);
    const g = group.current;
    if (g) {
      g.children.forEach((child, i) => {
        const d = dots[i];
        child.position.set(d.x, d.y - 0.55 * bow * Math.max(0, d.w), 0);
      });
    }
    mats.current.forEach((m, i) => {
      const base = 0.55 + 0.15 * (1 - Math.abs(i - 3) / 3);
      if (m) m.uniforms.uAlpha.value = 1.1 * (1 - 0.35 * bow);
      const h = halos.current[i];
      if (h) h.uniforms.uAlpha.value = base * 0.5 * (1 - 0.5 * bow);
    });
    const pos = line.geometry.getAttribute("position") as BufferAttribute;
    const rx = 0.36 * width;
    const ry = 0.14 * height;
    for (let i = 0; i < ARC_POINTS; i++) {
      const a = (i / (ARC_POINTS - 1)) * Math.PI;
      const x = -rx * Math.cos(a);
      const w = 1 - Math.abs(x) / rx;
      pos.setXYZ(i, x, centre[1] - 0.22 * height - ry * Math.sin(a) * 0.6 - 0.55 * bow * w, 0);
    }
    pos.needsUpdate = true;
  });

  return (
    <>
      <Starfield count={mobile ? 400 : 900} />
      <Light position={centre} size={mobile ? 0.7 : 0.95} coronaScale={7} intensity={1.2} renderOrder={10} />
      <primitive object={line} renderOrder={4} />
      <group ref={group}>
        {dots.map((d, i) => (
          <group key={i} position={[d.x, d.y, 0]}>
            <Glow size={0.8} color="#EEE4CF" inner="#FFFFFF" alpha={0.35} power={2.6} renderOrder={6} onMaterial={(m) => { halos.current[i] = m; }} />
            <Glow size={0.13} color="#FFFFFF" inner="#FFFFFF" alpha={1.6} power={0.28} renderOrder={7} onMaterial={(m) => { mats.current[i] = m; }} />
          </group>
        ))}
      </group>
      {effects && <SceneEffects bloom={0.9} />}
    </>
  );
}
