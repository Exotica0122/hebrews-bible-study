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
import { fitFrame, type Frame } from "./Beaten";
import { SceneEffects } from "./SceneEffects";
import { smoothstep, STILL, useSceneTime } from "./Timeline";
import { bindArt, clearWall, FLOOR } from "./wallArt";
import { setUniform, touch } from "./mutate";

export const WALL = {
  shadow: "#3E3039",
  lime: "#F4DDA6",
  stone: "#352820",
  flame: "#B8240F",
  light: "#FFEDB8",
};

const DEFAULT_FRAME: Frame = [60, 40, 1480, FLOOR - 40];
const SAFE_WIDE = [0.05, 0.66] as const;
const SAFE_MOBILE = [0.05, 0.5] as const;
const PAINT_STEP = 1 / 30;
const MAX_ART = 1600;
const BASE_HEIGHT = 576;
const PLASTER_TILE = 0.9;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uArt, uPlaster;
  uniform vec2 uUnits;
  uniform float uFade, uLod, uFloor, uLean, uSun, uEdge;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * uUnits;
    float up = max(vUv.y - uFloor, 0.0);
    float below = 1.0 - smoothstep(uFloor - 0.0015, uFloor + 0.0015, vUv.y);
    float depth = max(uFloor - vUv.y, 0.0);

    // One low sun: a slight lean, crisp at the feet, softer with height.
    vec2 q = vec2(vUv.x - up * uLean, vUv.y);
    float lod = uLod + 0.25 + up * 3.4;
    vec4 a = textureLod(uArt, q, lod);
    float shade = smoothstep(0.04, 0.4, a.r) * uFade;

    vec3 relief = texture2D(uPlaster, p * ${PLASTER_TILE.toFixed(2)}).rgb;
    vec2 fine = texture2D(uPlaster, p * 3.7 + 0.31).rg - 0.5;
    float rake = 1.0 + (relief.r - 0.5) * 0.15 + (relief.g - 0.5) * 0.08 + fine.x * 0.07;

    vec3 sunlit = mix(vec3(0.95, 0.8, 0.55), vec3(0.98, 0.86, 0.62), relief.b) * rake;
    vec3 tint = vec3(0.33, 0.29, 0.39);

    // A hard edge of sunlight falls across the wall from the upper left.
    float edge = vUv.x * 1.1 + (1.0 - vUv.y) * 0.5 + 0.02 * sin(vUv.y * 9.0);
    float lit = 1.0 - smoothstep(uEdge, uEdge + 0.04, edge);
    vec3 wall = mix(sunlit * mix(vec3(1.0), tint, 0.62), sunlit, lit);
    wall = mix(wall * vec3(0.52, 0.5, 0.62), wall, uSun);

    vec3 c = wall * mix(vec3(1.0), tint, shade);

    float red = textureLod(uArt, q, uLod + 0.2 + up * 1.2).g * uFade;
    c = mix(c, c * vec3(0.93, 0.42, 0.18), smoothstep(0.06, 0.3, red));
    c = mix(c, vec3(0.44, 0.06, 0.04), smoothstep(0.5, 0.9, red));

    vec3 stone = vec3(0.21, 0.16, 0.13) * rake;
    stone *= 1.0 + 0.5 * (1.0 - smoothstep(0.0, 0.02, depth));
    stone *= 1.0 - 0.5 * textureLod(uArt, vec2(vUv.x, uFloor + 0.004), uLod + 2.2).r * uFade
      * (1.0 - smoothstep(0.0, 0.05, depth));
    c = mix(c, stone, below);
    c = mix(c, vec3(0.86, 0.72, 0.5) * rake * mix(0.6, 1.0, uSun),
      (1.0 - smoothstep(0.002, 0.007, depth)) * below);

    vec3 sharp = textureLod(uArt, q, uLod).rgb;
    vec3 soft = textureLod(uArt, q, uLod + 2.5).rgb;
    vec3 bloom = vec3(1.0, 0.8, 0.52) * soft.b * uFade * 0.7 * (1.0 - smoothstep(0.05, 0.3, soft.g));
    c = 1.0 - (1.0 - clamp(c, 0.0, 1.0)) * (1.0 - clamp(bloom, 0.0, 1.0));
    c += vec3(0.9, 0.3, 0.08) * soft.g * uFade * 0.5;
    c = mix(c, vec3(1.0, 0.93, 0.7), smoothstep(0.12, 0.8, sharp.b) * uFade * (1.0 - smoothstep(0.1, 0.3, sharp.g)));

    gl_FragColor = vec4(pow(c, vec3(2.2)), 1.0);
    #include <colorspace_fragment>
  }`;

let plaster: DataTexture | null = null;

/** Trowelled lime baked once into a tiling map (red and green relief, blue broad tone), so phones do not pay for noise per pixel. */
function plasterTexture() {
  if (plaster) return plaster;
  const size = 512;
  const hash = (x: number, y: number, k: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const value = (u: number, v: number, nx: number, ny: number, k: number) => {
    const x = u * nx;
    const y = v * ny;
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const at = (i: number, j: number) => hash((ix + i) % nx, (iy + j) % ny, k);
    const top = at(0, 0) + (at(1, 0) - at(0, 0)) * sx;
    const low = at(0, 1) + (at(1, 1) - at(0, 1)) * sx;
    return top + (low - top) * sy;
  };
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const strokes =
        value(u, v, 9, 20, 1) * 0.5 +
        value(u, v, 26, 38, 2) * 0.3 +
        value(u, v, 48, 48, 3) * 0.2;
      const pits = value(u, v, 160, 160, 4);
      const broad = value(u, v, 4, 4, 5) * 0.6 + value(u, v, 9, 9, 6) * 0.4;
      const i = (y * size + x) * 4;
      data[i] = strokes * 255;
      data[i + 1] = pits * 255;
      data[i + 2] = broad * 255;
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
  plaster = texture;
  return texture;
}

function wallMaterial(art: Texture) {
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
      uPlaster: { value: plasterTexture() },
      uUnits: { value: [1, 1] },
      uFade: { value: 0 },
      uLod: { value: 0 },
      uFloor: { value: 0.3 },
      uLean: { value: 0.03 },
      uSun: { value: 1 },
      uEdge: { value: 1.2 },
    },
  });
}

interface SunWallProps {
  /** Draws the shadows for time `t` in logical units; feet stand on FLOOR. */
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
  /** Sunlight on the wall from 0 to 1 over the loop. */
  sun?: (t: number) => number;
  pointer?: RefObject<PointerState>;
}

/** A limewashed wall in hard sun: red is what casts a shadow, green is fire and blue is true light. */
export function SunWall({
  paint,
  period,
  mobile,
  effects,
  hold,
  frame = DEFAULT_FRAME,
  safe = mobile ? SAFE_MOBILE : SAFE_WIDE,
  reserve,
  sun,
  pointer,
}: SunWallProps) {
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
  const material = useMemo(() => wallMaterial(art.texture), [art]);
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
  const leaning = useRef(0);

  useSceneTime((t) => {
    const p = hold === undefined ? t % period : Math.min(t, hold);
    const fade =
      hold === undefined
        ? smoothstep(0, 0.9, p) * (1 - smoothstep(period - 1.3, period, p))
        : smoothstep(0, 0.9, t);
    leaning.current +=
      ((pointer?.current?.x ?? 0) * 0.04 - leaning.current) * 0.06;

    const unit = 900 * fit.scale;
    setUniform(material, "uFade", fade);
    setUniform(material, "uLod", Math.log2(height / BASE_HEIGHT));
    setUniform(material, "uFloor", 1 - (fit.y + FLOOR * fit.scale) / height);
    setUniform(material, "uLean", (0.08 + leaning.current) * (height / width));
    setUniform(material, "uSun", sun ? sun(p) : 1);
    setUniform(material, "uEdge", 1.2 + 0.03 * Math.sin(t * 0.07));
    setVector(material, "uUnits", width / unit, height / unit);

    if (!STILL && painted.current >= 0 && t - painted.current < PAINT_STEP)
      return;
    painted.current = t;
    bindArt(art.ctx);
    clearWall(width, height);
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
        <SceneEffects bloom={0.22} threshold={0.96} vignette={0.28} />
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
