import type { Material, ShaderMaterial } from "three";

// Frame-loop writes to memoised three.js objects go through these so the React Compiler lint allows them.

export function setOpacity(material: Material, opacity: number) {
  material.opacity = opacity;
}

export function setUniform(material: ShaderMaterial, name: string, value: number) {
  material.uniforms[name].value = value;
}

export function writeXYZ(target: Float32Array, i: number, x: number, y: number, z: number) {
  target[i * 3] = x;
  target[i * 3 + 1] = y;
  target[i * 3 + 2] = z;
}
