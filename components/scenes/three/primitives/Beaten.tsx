"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useThree } from "@react-three/fiber";
import {
  CanvasTexture,
  DataTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  NoColorSpace,
  RepeatWrapping,
  RGBAFormat,
  ShaderMaterial,
  type Texture,
} from "three";
import type { PointerState } from "../registry";
import { SceneEffects } from "./SceneEffects";
import { smoothstep, STILL, useSceneTime } from "./Timeline";
import { bindArt, clearPlate } from "./beatenArt";
import { setUniform, touch } from "./mutate";

export const BEATEN = {
  shadow: "#0E0803",
  bronze: "#8F6019",
  gold: "#FFC75C",
  flare: "#FFF2C2",
  scarlet: "#75080D",
};

/** Logical drawing rectangle: x, y, width, height, with the floor on its lower edge. */
export type Frame = readonly [number, number, number, number];

const DEFAULT_FRAME: Frame = [60, 30, 1480, 600];
const SAFE_WIDE = [0.04, 0.7] as const;
const SAFE_MOBILE = [0.04, 0.5] as const;
const PAINT_STEP = 1 / 30;
const MAX_ART = 1600;
const TEXEL_UNIT = 0.64;
const DIMPLES_PER_UNIT = 62;
const DIMPLE_TILE = 32;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uArt, uDimple;
  uniform vec2 uUnits, uStep, uLamp;
  uniform float uFade, uLod;
  varying vec2 vUv;

  float lift(vec2 u) {
    return (0.5 * textureLod(uArt, u, uLod + 1.0).r
      + 0.32 * textureLod(uArt, u, uLod + 2.0).r
      + 0.18 * textureLod(uArt, u, uLod + 3.2).r) * uFade;
  }

  void main() {
    vec2 p = vUv * uUnits;
    vec2 d = vec2(
      lift(vUv + vec2(uStep.x, 0.0)) - lift(vUv - vec2(uStep.x, 0.0)),
      lift(vUv + vec2(0.0, uStep.y)) - lift(vUv - vec2(0.0, uStep.y))
    ) * 13.0;

    float raised = textureLod(uArt, vUv, uLod + 1.0).r * uFade;
    vec2 beat = texture2D(uDimple, p * ${(DIMPLES_PER_UNIT / DIMPLE_TILE).toFixed(3)}).rg - 0.5;
    vec2 beat2 = texture2D(uDimple, p.yx * 1.417 + 0.31).rg - 0.5;
    vec2 grain = texture2D(uDimple, p * 11.3 + 0.17).rg - 0.5;
    d += (beat * 0.3 + beat2 * 0.1) * mix(1.0, 0.36, smoothstep(0.1, 0.6, raised)) + grain * 0.07;

    vec3 n = normalize(vec3(-d, 1.0));
    vec3 l = normalize(vec3(uLamp - p, 0.62));
    vec3 h = normalize(l + vec3(0.0, 0.0, 1.0));
    float dist = length(uLamp - p);
    float fall = 1.15 / (1.0 + 1.5 * dist * dist);
    float dif = max(dot(n, l), 0.0);
    float spec = pow(max(dot(n, h), 0.0), 80.0);
    float env = 0.5 + 0.5 * sin(n.x * 5.0 + n.y * 7.0 + 1.1);
    float k = (0.15 * dif + 0.2 * env * env) * fall + 0.85 * spec * fall
      + smoothstep(0.1, 0.85, raised) * (0.2 + 0.34 * dif);

    vec3 c = mix(vec3(0.055, 0.03, 0.012), vec3(0.56, 0.36, 0.1), smoothstep(0.0, 0.42, k));
    c = mix(c, vec3(1.0, 0.78, 0.36), smoothstep(0.34, 0.8, k));
    c = mix(c, vec3(1.0, 0.95, 0.76), smoothstep(0.75, 1.25, k));

    vec3 sharp = textureLod(uArt, vUv, uLod).rgb;
    vec3 soft = textureLod(uArt, vUv, uLod + 2.0).rgb;
    vec3 enamel = vec3(0.46, 0.03, 0.05) * (0.55 + 0.9 * dif * fall) + vec3(1.0, 0.55, 0.5) * spec * 0.9;
    c = mix(c, enamel, smoothstep(0.2, 0.6, sharp.g * uFade));
    c = mix(c, vec3(1.0, 0.94, 0.74), smoothstep(0.1, 0.8, sharp.b) * uFade);
    c += vec3(1.0, 0.72, 0.34) * soft.b * uFade * 0.85;

    gl_FragColor = vec4(pow(c, vec3(2.03)), 1.0);
    #include <colorspace_fragment>
  }`;

let dimples: DataTexture | null = null;

/** Hammer marks baked once into a tiling slope map, so phones do not pay for cell noise per pixel. */
function dimpleTexture() {
  if (dimples) return dimples;
  const size = 512;
  const cell = size / DIMPLE_TILE;
  const hash = (x: number, y: number, k: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const height = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const gx = Math.floor(x / cell);
      const gy = Math.floor(y / cell);
      const fx = x / cell - gx;
      const fy = y / cell - gy;
      let best = 1;
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const wx = (gx + i + DIMPLE_TILE) % DIMPLE_TILE;
          const wy = (gy + j + DIMPLE_TILE) % DIMPLE_TILE;
          const cx = i + hash(wx, wy, 1) - fx;
          const cy = j + hash(wx, wy, 2) - fy;
          best = Math.min(best, cx * cx + cy * cy);
        }
      }
      height[y * size + x] = best;
    }
  }
  const data = new Uint8Array(size * size * 4);
  const at = (x: number, y: number) =>
    height[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * 4;
      const dy = (at(x, y + 1) - at(x, y - 1)) * 4;
      const i = (y * size + x) * 4;
      data[i] = Math.max(0, Math.min(255, 127.5 + dx * 127.5));
      data[i + 1] = Math.max(0, Math.min(255, 127.5 + dy * 127.5));
      data[i + 3] = 255;
    }
  }
  const texture = new DataTexture(data, size, size, RGBAFormat);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = true;
  texture.colorSpace = NoColorSpace;
  texture.needsUpdate = true;
  dimples = texture;
  return texture;
}

function fitFrame(
  width: number,
  height: number,
  frame: Frame,
  safe: readonly [number, number],
) {
  const [fx, fy, fw, fh] = frame;
  const top = safe[0] * height;
  const bottom = safe[1] * height;
  const scale = Math.min(width / fw, (bottom - top) / fh);
  return {
    scale,
    x: width / 2 - (fx + fw / 2) * scale,
    y: bottom - (fy + fh) * scale,
  };
}

function plateMaterial(art: Texture) {
  return new ShaderMaterial({
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 1.0, 1.0);
      }`,
    fragmentShader: FRAG,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      uArt: { value: art },
      uDimple: { value: dimpleTexture() },
      uUnits: { value: [1, 1] },
      uStep: { value: [0.002, 0.002] },
      uLamp: { value: [0.9, 0.6] },
      uFade: { value: 0 },
      uLod: { value: 0 },
    },
  });
}

interface PlateProps {
  /** Draws the relief for time `t` in logical units; the floor sits at the frame's lower edge. */
  paint: (t: number) => void;
  period: number;
  mobile: boolean;
  effects: boolean;
  /** Stops the loop here and stays, for the hero. */
  hold?: number;
  frame?: Frame;
  safe?: readonly [number, number];
  /** CSS pixels kept clear below the floor for the hero's title block. */
  reserve?: number;
  /** Lamp position in logical units; defaults to a slow sweep across the frame. */
  lamp?: (t: number) => readonly [number, number];
  pointer?: RefObject<PointerState>;
  bloom?: number;
}

/** One sheet of beaten gold, raised from a canvas drawing and lit by a single moving lamp. Red raises the metal, green is scarlet enamel and blue is light. */
export function Plate({
  paint,
  period,
  mobile,
  effects,
  hold,
  frame = DEFAULT_FRAME,
  safe = mobile ? SAFE_MOBILE : SAFE_WIDE,
  reserve,
  lamp,
  pointer,
  bloom = 0.32,
}: PlateProps) {
  const size = useThree((s) => s.size);
  const dpr = useThree((s) => s.viewport.dpr);
  const limit = mobile ? 1024 : MAX_ART;
  const ratio = Math.min(limit / Math.max(size.width * dpr, 1), 1) * dpr;
  const width = Math.max(2, Math.round(size.width * ratio));
  const height = Math.max(2, Math.round(size.height * ratio));

  const art = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = NoColorSpace;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.magFilter = LinearFilter;
    texture.generateMipmaps = true;
    return { ctx, texture };
  }, [width, height]);
  const material = useMemo(() => plateMaterial(art.texture), [art]);
  const floorAt = reserve
    ? Math.max(0.3, 1 - reserve / Math.max(size.height, 1))
    : safe[1];
  const top = safe[0];
  const fit = useMemo(
    () => fitFrame(width, height, frame, [top, floorAt]),
    [width, height, frame, top, floorAt],
  );

  useEffect(
    () => () => {
      art.texture.dispose();
      material.dispose();
    },
    [art, material],
  );

  const painted = useRef(-1);
  const pointed = useRef({ x: 0, y: 0 });

  useSceneTime((t) => {
    const p = hold === undefined ? t % period : Math.min(t, hold);
    const fade =
      hold === undefined
        ? smoothstep(0, 0.9, p) * (1 - smoothstep(period - 1.3, period, p))
        : smoothstep(0, 0.9, t);
    const [fx, fy, fw, fh] = frame;
    const sweep: readonly [number, number] = [
      fx + fw * (0.5 + 0.44 * Math.sin(t * 0.31)),
      fy + fh * (0.34 + 0.2 * Math.cos(t * 0.23)),
    ];
    const [lx, ly] = lamp ? lamp(p) : sweep;
    const aim = pointer?.current;
    pointed.current.x += ((aim?.x ?? 0) * 260 - pointed.current.x) * 0.06;
    pointed.current.y += ((aim?.y ?? 0) * 160 - pointed.current.y) * 0.06;

    const unit = 900 * fit.scale;
    setUniform(material, "uFade", fade);
    setUniform(material, "uLod", Math.log2(fit.scale / TEXEL_UNIT));
    setVector(material, "uUnits", width / unit, height / unit);
    setVector(
      material,
      "uStep",
      (2.4 * fit.scale) / TEXEL_UNIT / width,
      (2.4 * fit.scale) / TEXEL_UNIT / height,
    );
    setVector(
      material,
      "uLamp",
      ((lx + pointed.current.x) * fit.scale + fit.x) / unit,
      (height - ((ly + pointed.current.y) * fit.scale + fit.y)) / unit,
    );

    if (!STILL && painted.current >= 0 && t - painted.current < PAINT_STEP)
      return;
    painted.current = t;
    bindArt(art.ctx);
    clearPlate(width, height);
    art.ctx.setTransform(fit.scale, 0, 0, fit.scale, fit.x, fit.y);
    paint(p);
    touch(art.texture);
  });

  return (
    <>
      <mesh material={material} frustumCulled={false} renderOrder={-10}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      {effects && (
        <SceneEffects bloom={bloom} threshold={0.84} vignette={0.35} />
      )}
    </>
  );
}

function setVector(
  material: ShaderMaterial,
  name: string,
  x: number,
  y: number,
) {
  const value = material.uniforms[name].value as number[];
  value[0] = x;
  value[1] = y;
}
