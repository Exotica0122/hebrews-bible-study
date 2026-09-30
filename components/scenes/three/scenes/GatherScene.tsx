"use client";

import { useEffect, useMemo, useRef } from "react";
import { Color, Group, MeshBasicMaterial, PlaneGeometry, Shape, ShapeGeometry, ShaderMaterial } from "three";
import type { SceneProps } from "../registry";
import { SceneEffects } from "../primitives/SceneEffects";
import { Embers } from "../primitives/Earth";
import { easeInOutCubic, lerp, smoothstep, useSceneTime } from "../primitives/Timeline";
import { useResetCameraOnUnmount } from "../primitives/useSceneCamera";
import { setUniform } from "../primitives/mutate";

const PERIOD = 15;
const FLOOR_Y = -1.25;
/** The children: final x beside him, height scale, and when they set out (s). */
const CHILDREN: [number, number, number][] = [
  [-0.62, 0.66, 1.2], [0.64, 0.62, 1.8], [-1.12, 0.74, 2.6], [1.16, 0.7, 3.1], [-1.6, 0.6, 3.9], [1.62, 0.76, 4.4],
];
const WALK = 4.2;
const EMBER_BOX: [number, number, number] = [3, 2.6, 1];

const WALL_VERT = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

const WALL_FRAG = /* glsl */ `
uniform float uLight;
uniform float uFloorY;
uniform vec3 uDark;
uniform vec3 uWarm;
uniform vec3 uHot;
varying vec3 vWorld;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
void main() {
  vec2 p = vWorld.xy - vec2(0.0, -0.2);
  float r = length(p * vec2(0.4, 0.6));
  float pool = exp(-r * r * 0.7) * uLight;
  float plaster = 0.9 + 0.1 * noise(vWorld.xy * 6.0) + 0.05 * noise(vWorld.xy * 23.0);
  vec3 c = mix(uDark, uWarm, pool) * plaster;
  c += uHot * pow(pool, 2.5) * 0.45;
  if (vWorld.y < uFloorY) {
    float d = uFloorY - vWorld.y;
    c = mix(uDark, uWarm * 0.55, exp(-abs(vWorld.x) * 0.5) * uLight) * (1.0 - smoothstep(0.0, 1.6, d) * 0.6);
  }
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  c += (grain - 0.5) * (2.0 / 255.0);
  gl_FragColor = vec4(c, 1.0);
}`;

/** A robed standing figure facing us, feet at y = 0, about 1.75 units tall. */
function figureGeometry() {
  const s = new Shape();
  s.moveTo(-0.3, 0);
  s.quadraticCurveTo(-0.27, 0.6, -0.22, 0.95);
  s.quadraticCurveTo(-0.25, 1.2, -0.27, 1.3);
  s.quadraticCurveTo(-0.25, 1.4, -0.07, 1.44);
  s.lineTo(-0.055, 1.5);
  s.quadraticCurveTo(-0.13, 1.54, -0.12, 1.62);
  s.quadraticCurveTo(-0.11, 1.75, 0, 1.75);
  s.quadraticCurveTo(0.11, 1.75, 0.12, 1.62);
  s.quadraticCurveTo(0.13, 1.54, 0.055, 1.5);
  s.lineTo(0.07, 1.44);
  s.quadraticCurveTo(0.25, 1.4, 0.27, 1.3);
  s.quadraticCurveTo(0.25, 1.2, 0.22, 0.95);
  s.quadraticCurveTo(0.27, 0.6, 0.3, 0);
  s.closePath();
  return new ShapeGeometry(s, 16);
}

/** “Behold, I and the children God has given me”: one figure in the lamplight, the children coming out of the dark to stand beside him. */
export function GatherScene({ mobile, effects }: SceneProps) {
  useResetCameraOnUnmount();
  const children = useRef<Group>(null);
  const figure = useMemo(() => figureGeometry(), []);
  const ink = useMemo(() => new MeshBasicMaterial({ color: "#0B0907" }), []);
  const wall = useMemo(() => {
    const g = new PlaneGeometry(40, 20);
    const m = new ShaderMaterial({
      vertexShader: WALL_VERT,
      fragmentShader: WALL_FRAG,
      uniforms: {
        uLight: { value: 0 },
        uFloorY: { value: FLOOR_Y },
        uDark: { value: new Color("#0D0B09") },
        uWarm: { value: new Color("#B07A42") },
        uHot: { value: new Color("#F3D38A") },
      },
    });
    return { g, m };
  }, []);
  useEffect(
    () => () => {
      figure.dispose();
      ink.dispose();
      wall.g.dispose();
      wall.m.dispose();
    },
    [figure, ink, wall],
  );

  const spread = mobile ? 0.8 : 1;
  const edge = mobile ? 3.4 : 5.6;

  useSceneTime((t, _dt, { camera }) => {
    camera.position.set(0, 0.1, mobile ? 9.5 : 7.4);
    camera.lookAt(0, -0.05, 0);
    const p = t % PERIOD;
    const arrived = CHILDREN.reduce((n, [, , start]) => n + smoothstep(start + WALK - 0.8, start + WALK, p), 0) / CHILDREN.length;
    const light = (0.55 + 0.45 * arrived) * smoothstep(0, 1.4, p) * (1 - smoothstep(13.2, 15, p));
    setUniform(wall.m, "uLight", light + Math.sin(t * 7) * 0.012 + Math.sin(t * 11.3) * 0.008);

    children.current?.children.forEach((g, i) => {
      const [x, , start] = CHILDREN[i];
      const k = easeInOutCubic((p - start) / WALK);
      g.position.x = lerp(Math.sign(x) * edge, x * spread, k);
      const walking = k > 0 && k < 1 ? 1 : 0;
      const step = Math.sin((p - start) * 5.5);
      g.position.y = FLOOR_Y + walking * Math.abs(step) * 0.025;
      g.rotation.z = walking * step * 0.015;
    });
  });

  return (
    <>
      <mesh geometry={wall.g} material={wall.m} position={[0, 0, -1.2]} renderOrder={-10} />
      <mesh geometry={figure} material={ink} position={[0, FLOOR_Y, 0]} />
      <group ref={children}>
        {CHILDREN.map(([x, h]) => (
          <mesh key={x} geometry={figure} material={ink} position={[Math.sign(x) * edge, FLOOR_Y, 0.05]} scale={[h * 1.05, h, 1]} />
        ))}
      </group>
      <Embers count={mobile ? 12 : 22} box={EMBER_BOX} position={[0, -0.9, -0.6]} rise={0.05} size={1.6} alpha={0.45} />
      {effects && <SceneEffects bloom={0.4} />}
    </>
  );
}
