"use client";

import { useEffect, useRef } from "react";
import { Cloud, Clouds } from "@react-three/drei";
import { damp } from "maath/easing";
import { MeshBasicMaterial } from "three";
import { useThree } from "@react-three/fiber";
import { Group, type ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Glow, Light } from "../primitives/Glow";
import { Starfield } from "../primitives/Starfield";
import { easeInSine, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { HERO_FRAGMENTS } from "@/components/hero/fragments";

const CYCLE = 14;
const HERO_SPREAD: [number, number] = [28, 16];
const LOOKS = [
  { phase: 0.0, color: "#C8553D", inner: "#F3D38A", size: 0.34, sx: 1, sy: 1 },
  { phase: 0.28, color: "#F3D38A", inner: "#FFF8E8", size: 0.3, sx: 1, sy: 1 },
  { phase: 0.55, color: "#EEE4CF", inner: "#EEE4CF", size: 0.5, sx: 2.2, sy: 1 },
  { phase: 0.8, color: "#D8D1C2", inner: "#FFFFFF", size: 0.26, sx: 0.8, sy: 1.1 },
];
const FRAGMENTS = HERO_FRAGMENTS.map((f, i) => ({ ...LOOKS[i], left: f.left / 100, top: f.top / 100, leftMobile: f.leftMobile / 100, topMobile: f.topMobile / 100 }));

export function HeroScene({ mobile, effects, captions, pointer }: SceneProps) {
  const { width, height } = useThree((s) => s.viewport);
  const size = useThree((s) => s.size);
  const gl = useThree((s) => s.gl);
  useResetCameraOnUnmount();

  const groups = useRef<(Group | null)[]>([]);
  const mats = useRef<(ShaderMaterial | null)[]>([]);
  const trailMats = useRef<(ShaderMaterial | null)[]>([]);
  const centreMat = useRef<ShaderMaterial>(null);
  const centre = useRef({ x: 0, y: 0.24 * height });
  const centreGroup = useRef<Group>(null);
  const cloud = useRef<Group>(null);
  const frame = useRef(0);

  useEffect(
    () => () => {
      captions?.current.forEach((el) => {
        if (!el) return;
        el.style.transform = "";
        const cap = el.lastElementChild as HTMLElement | null;
        if (cap) cap.style.opacity = "";
      });
    },
    [captions],
  );

  useSceneTime((t, dt, { camera }) => {
    frame.current++;
    if (frame.current % 30 === 1) {
      const target = document.getElementById("hb-hero-centre");
      const host = gl.domElement.getBoundingClientRect();
      if (target && host.width > 0) {
        const r = target.getBoundingClientRect();
        const cx = (r.left + r.width / 2 - host.left) / host.width;
        const cy = (r.top + r.height / 2 - host.top) / host.height;
        centre.current = { x: (cx - 0.5) * width, y: (0.5 - cy) * height };
      }
    }
    if (centreGroup.current) centreGroup.current.position.set(centre.current.x, centre.current.y, 0);
    const p = pointer?.current ?? { x: 0, y: 0 };
    damp(camera.position, "x", Math.sin(t * 0.11) * 0.12 + p.x * 0.35, 0.8, dt);
    damp(camera.position, "y", Math.cos(t * 0.09) * 0.08 - p.y * 0.25, 0.8, dt);
    camera.position.z = 8;
    camera.lookAt(0, 0, 0);

    let pulse = 0;
    FRAGMENTS.forEach((f, i) => {
      const p = ((t / CYCLE + f.phase) % 1 + 1) % 1;
      const hx = ((mobile ? f.leftMobile : f.left) - 0.5) * width;
      const hy = (0.5 - (mobile ? f.topMobile : f.top)) * height;
      const k = easeInSine(p);
      const x = lerp(hx, centre.current.x, k);
      const y = lerp(hy, centre.current.y, k);
      const alpha = smoothstep(0, 0.08, p) * (1 - smoothstep(0.9, 1, p));
      pulse = Math.max(pulse, smoothstep(0.92, 1, p));
      const g = groups.current[i];
      if (g) g.position.set(x, y, 0);
      const m = mats.current[i];
      if (m) m.uniforms.uAlpha.value = alpha;
      const tm = trailMats.current[i];
      if (tm) tm.uniforms.uAlpha.value = alpha * 0.35 * (1 - k);
      const c = i === 2 ? cloud.current : null;
      if (c) {
        c.visible = alpha > 0.12;
        c.scale.setScalar(0.35 + 0.65 * (1 - k));
      }
      const el = captions?.current[i];
      if (el && size.width > 0) {
        const dx = ((x - hx) / width) * size.width;
        const dy = -((y - hy) / height) * size.height;
        el.style.transform = `translate(calc(-50% + ${dx.toFixed(1)}px), ${dy.toFixed(1)}px)`;
        const cap = el.lastElementChild as HTMLElement | null;
        if (cap) cap.style.opacity = (alpha * (1 - smoothstep(0.12, 0.4, k))).toFixed(2);
      }
    });
    if (centreMat.current) centreMat.current.uniforms.uAlpha.value = 1 + pulse * 0.3;
  });

  return (
    <>
      <Starfield count={mobile ? 500 : 1100} spread={HERO_SPREAD} />
      <group ref={centreGroup} position={[0, 0.24 * height, 0]}>
        <Glow size={mobile ? 10 : 16} color="#B7892C" alpha={0.24} power={2.4} renderOrder={2} />
        <Light size={mobile ? 0.4 : 0.5} coronaScale={6} intensity={1.2} renderOrder={10} />
        <Glow size={0.3} color="#FFF8E8" inner="#FFFFFF" alpha={1} power={1} renderOrder={14} onMaterial={(m) => { centreMat.current = m; }} />
      </group>
      {FRAGMENTS.map((f, i) => (
        <group key={i} ref={(g) => { groups.current[i] = g; }}>
          <Glow size={f.size * (mobile ? 2.2 : 3)} scaleX={f.sx} scaleY={f.sy} color={f.color} alpha={0.22} power={2.2} renderOrder={6} onMaterial={(m) => { trailMats.current[i] = m; }} />
          <Glow size={f.size * (mobile ? 0.8 : 1) * (i === 2 ? 0.5 : 1)} scaleX={f.sx} scaleY={f.sy} color={f.color} inner={f.inner} alpha={1} power={1.2} renderOrder={8} onMaterial={(m) => { mats.current[i] = m; }} />
          {i === 2 && (
            <Clouds material={MeshBasicMaterial} texture="/textures/cloud.png" limit={24} renderOrder={7}>
              <Cloud ref={cloud} segments={mobile ? 6 : 10} bounds={[1.5, 0.45, 0.4]} volume={1.1} color="#EEE4CF" opacity={0.4} fade={40} speed={0.12} growth={1.5} seed={3} concentrate="inside" />
            </Clouds>
          )}
        </group>
      ))}
      {effects && <SceneEffects bloom={0.35} />}
    </>
  );
}
