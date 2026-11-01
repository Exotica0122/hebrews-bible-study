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
import { bindArt, clearCloth, FLOOR } from "./clothArt";
import { setUniform, touch } from "./mutate";
import { SceneEffects } from "./SceneEffects";
import { smoothstep, STILL, useSceneTime } from "./Timeline";

export const CLOTH = {
  linen: "#CDB78F",
  indigo: "#2A3350",
  sage: "#55664F",
  ochre: "#A16E30",
  madder: "#9E4029",
  scarlet: "#BD2119",
  gold: "#E6B04C",
};

const DEFAULT_FRAME: Frame = [0, 130, 1600, FLOOR - 130];
const SAFE_WIDE = [0.1, 0.66] as const;
const SAFE_MOBILE = [0.1, 0.56] as const;
const PAINT_STEP = 1 / 30;
const MAX_ART = 1600;
const BASE_HEIGHT = 576;
const ROWS_WIDE = 150;
const ROWS_MOBILE = 104;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uArt, uWeave;
  uniform vec2 uUnits, uLamp, uEdge;
  uniform float uFade, uLod, uFloor, uPan, uRows, uFine;
  varying vec2 vUv;

  const float PI = 3.14159265;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  vec3 wool(float h) {
    vec3 c = vec3(0.17, 0.2, 0.32);
    c = mix(c, vec3(0.3, 0.38, 0.29), smoothstep(0.34, 0.4, h));
    c = mix(c, vec3(0.63, 0.43, 0.19), smoothstep(0.54, 0.6, h));
    c = mix(c, vec3(0.62, 0.25, 0.16), smoothstep(0.69, 0.75, h));
    return mix(c, vec3(0.88, 0.8, 0.62), smoothstep(0.84, 0.9, h));
  }

  void main() {
    vec2 p = vUv * uUnits + vec2(uPan, 0.0);
    vec2 toLamp = normalize(uLamp - vUv + vec2(0.001));
    float pool = 1.0 - 0.34 * smoothstep(0.1, 1.15, length((vUv - uLamp) * vec2(1.0, 0.6)));
    float folds = 1.0 + 0.045 * sin(p.x * 3.1 + 0.8 * sin(p.x * 1.3)) * (0.7 + 0.3 * sin(vUv.y * 2.4));

    vec4 cloth = texture2D(uWeave, p * 2.2);
    vec3 c = vec3(0.8, 0.7, 0.53) * (0.78 + 0.3 * cloth.r) * (0.84 + 0.24 * cloth.g);

    vec4 a = textureLod(uArt, vUv, uLod);
    float wide = textureLod(uArt, vUv, uLod + 3.2).r;
    float fine = step(hash(floor(p * 420.0)), uFade * 1.05);

    float nearDrop = max(textureLod(uArt, vUv - toLamp * uEdge * 1.6, uLod + 1.0).r,
      textureLod(uArt, vUv - toLamp * uEdge * 1.6, uLod + 1.0).g);
    c *= 1.0 - 0.26 * smoothstep(0.1, 0.24, nearDrop) * uFade;

    float h = a.r;
    float angle = 0.5 + floor(h * 7.0) * 1.13;
    vec2 along = vec2(cos(angle), sin(angle));
    vec2 across = vec2(-along.y, along.x);
    float sy = dot(p, across) * uRows;
    float row = fract(sy);
    float seg = fract(dot(p, along) * 15.0 + hash(vec2(floor(sy), 3.0)) * 7.0);
    float tie = smoothstep(0.0, 0.03, seg) * smoothstep(0.0, 0.03, 1.0 - seg);
    float stitch = floor(dot(p, along) * 15.0 + hash(vec2(floor(sy), 3.0)) * 7.0);
    float gate = step(hash(vec2(floor(sy), stitch)), uFade * 1.05);
    float hair = texture2D(uWeave, vec2(dot(p, along) * 0.7, dot(p, across) * 7.0)).a;
    float rake = dot(across, toLamp) * cos(row * PI) * uFine;
    vec3 thread = wool(h)
      * mix(0.84, 0.5 + 0.62 * sin(row * PI), uFine)
      * mix(1.0, 0.72 + 0.28 * tie, uFine)
      * (0.86 + 0.28 * hair)
      * (1.0 + 0.42 * rake);
    c = mix(c, thread, smoothstep(0.14, 0.19, h) * gate);

    float dx = textureLod(uArt, vUv + vec2(uEdge.x, 0.0), uLod).r - textureLod(uArt, vUv - vec2(uEdge.x, 0.0), uLod).r;
    float dy = textureLod(uArt, vUv + vec2(0.0, uEdge.y), uLod).r - textureLod(uArt, vUv - vec2(0.0, uEdge.y), uLod).r;
    float edge = smoothstep(0.06, 0.2, length(vec2(dx, dy))) * smoothstep(0.1, 0.24, wide);
    float dash = smoothstep(0.12, 0.3, abs(fract((p.x + p.y * 1.4) * 120.0) - 0.5));
    vec3 line = vec3(0.1, 0.1, 0.15) * (0.8 + 0.5 * dash);
    c = mix(c, line, edge * mix(1.0, 0.55 + 0.45 * dash, uFine) * fine);

    float red = smoothstep(0.25, 0.55, a.g) * fine;
    float twist = sin((p.x * 5.2 + p.y * 7.0) * 100.0) * 0.5 + 0.5;
    c = mix(c, vec3(0.74, 0.11, 0.08) * mix(0.92, 0.74 + 0.42 * twist, uFine), red);

    float light = smoothstep(0.3, 0.6, textureLod(uArt, vUv, uLod).b) * fine;
    float couch = sin((p.x + p.y) * 680.0) * 0.5 + 0.5;
    float bare = 1.0 - smoothstep(0.14, 0.19, h) * gate;
    c = mix(c, vec3(0.92, 0.68, 0.26) * mix(0.96, 0.76 + 0.36 * couch, uFine), light * bare);

    // The indigo border below the ground line carries the page's pale type.
    float depth = uFloor - vUv.y;
    float below = smoothstep(-0.001, 0.001, depth);
    float laid = sin(fract(p.y * uRows * 0.8) * PI);
    vec3 border = vec3(0.095, 0.105, 0.17) * mix(0.9, 0.62 + 0.62 * laid, uFine) * (0.86 + 0.28 * cloth.b);
    float at = depth * uUnits.y;
    float band = (1.0 - smoothstep(0.03, 0.032, at)) * below;
    float zig = step(0.5, fract(p.x * 19.0 + abs(fract(at * 16.0) - 0.5)));
    c = mix(c, border, below);
    c = mix(c, mix(vec3(0.63, 0.43, 0.19), vec3(0.62, 0.2, 0.13), zig) * mix(0.9, 0.7 + 0.5 * laid, uFine), band);

    float top = (1.0 - vUv.y) * uUnits.y;
    float rim = (1.0 - smoothstep(0.066, 0.068, top)) * smoothstep(0.026, 0.028, top);
    float slant = step(0.5, fract((p.x + top) * 11.0));
    c = mix(c, mix(vec3(0.17, 0.2, 0.32), vec3(0.63, 0.43, 0.19), slant * 0.82), rim * 0.92);

    c *= pool * folds;
    gl_FragColor = vec4(pow(clamp(c, 0.0, 1.0), vec3(2.2)), 1.0);
    #include <colorspace_fragment>
  }`;

let weave: DataTexture | null = null;

/** Linen baked once into a tiling map (red weave, green slubs, blue broad tone, alpha wool fibre), so phones do not pay for noise per pixel. */
function weaveTexture() {
  if (weave) return weave;
  const size = 512;
  const threads = 200;
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
      const warp = Math.sin(u * threads * Math.PI * 2) * 0.5 + 0.5;
      const weft = Math.sin(v * threads * Math.PI * 2) * 0.5 + 0.5;
      const over = (Math.floor(u * threads) + Math.floor(v * threads)) % 2;
      const i = (y * size + x) * 4;
      data[i] = (over ? warp : weft) * 255;
      data[i + 1] =
        (value(u, v, 8, 90, 1) * 0.5 + value(u, v, 90, 8, 2) * 0.5) * 255;
      data[i + 2] =
        (value(u, v, 5, 5, 3) * 0.6 + value(u, v, 11, 11, 4) * 0.4) * 255;
      data[i + 3] = value(u, v, 40, 300, 5) * 255;
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
  weave = texture;
  return texture;
}

function clothMaterial(art: Texture) {
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
      uWeave: { value: weaveTexture() },
      uUnits: { value: [1, 1] },
      uLamp: { value: [0.2, 0.9] },
      uEdge: { value: [0.001, 0.002] },
      uFade: { value: 0 },
      uLod: { value: 0 },
      uFloor: { value: 0.4 },
      uPan: { value: 0 },
      uRows: { value: ROWS_WIDE },
      uFine: { value: 1 },
    },
  });
}

interface EmbroideryProps {
  /** Draws the stitches for time `t` in logical units; feet stand on FLOOR. */
  paint: (t: number) => void;
  period: number;
  mobile: boolean;
  effects: boolean;
  /** Stops the loop here and stays, for the hero. */
  hold?: number;
  frame?: Frame;
  safe?: readonly [number, number];
  /** CSS pixels kept clear below the ground line for the hero's title block. */
  reserve?: number;
  /** How far the cloth has moved to the left, in logical units. */
  pan?: (t: number) => number;
  pointer?: RefObject<PointerState>;
}

/** Wool on linen under a raking lamp: red is the shade of wool, green scarlet thread and blue couched gold. */
export function Embroidery({
  paint,
  period,
  mobile,
  effects,
  hold,
  frame = DEFAULT_FRAME,
  safe = mobile ? SAFE_MOBILE : SAFE_WIDE,
  reserve,
  pan,
  pointer,
}: EmbroideryProps) {
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
  const material = useMemo(() => clothMaterial(art.texture), [art]);
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
  const lamp = useRef(0);

  useSceneTime((t) => {
    const p = hold === undefined ? t % period : Math.min(t, hold);
    const fade =
      hold === undefined
        ? smoothstep(0, 1.6, p) * (1 - smoothstep(period - 1.8, period, p))
        : smoothstep(0, 1.2, t);
    lamp.current += ((pointer?.current?.x ?? 0) * 0.14 - lamp.current) * 0.06;

    const unit = 900 * fit.scale;
    const rows = mobile ? ROWS_MOBILE : ROWS_WIDE;
    const moved = pan ? pan(p) : 0;
    setUniform(material, "uFade", fade);
    setUniform(material, "uLod", Math.log2(height / BASE_HEIGHT));
    setUniform(
      material,
      "uFloor",
      1 - (fit.y + (FLOOR + 12) * fit.scale) / height,
    );
    setUniform(material, "uPan", moved / 900);
    setUniform(material, "uRows", rows);
    setUniform(material, "uFine", smoothstep(1.3, 2.6, unit / rows));
    setVector(material, "uUnits", width / unit, height / unit);
    setVector(
      material,
      "uLamp",
      0.22 + lamp.current + 0.09 * Math.sin(t * 0.21),
      0.96,
    );
    setVector(
      material,
      "uEdge",
      (2.1 * fit.scale) / width,
      (2.1 * fit.scale) / height,
    );

    if (!STILL && painted.current >= 0 && t - painted.current < PAINT_STEP)
      return;
    painted.current = t;
    bindArt(art.ctx);
    clearCloth(width, height);
    art.ctx.setTransform(
      fit.scale,
      0,
      0,
      fit.scale,
      fit.x - moved * fit.scale,
      fit.y,
    );
    paint(p);
    touch(art.texture);
  });

  return (
    <>
      <mesh material={material} frustumCulled={false} renderOrder={-10}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      {effects && (
        <SceneEffects bloom={0.14} threshold={0.96} vignette={0.24} />
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
