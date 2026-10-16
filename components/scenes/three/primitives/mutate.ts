import type {
  Color,
  Material,
  MeshStandardMaterial,
  ShaderMaterial,
} from "three";

// Frame-loop writes to memoised three.js objects go through these so the React Compiler lint allows them.

export function setOpacity(material: Material, opacity: number) {
  material.opacity = opacity;
}

export function setUniform(
  material: ShaderMaterial,
  name: string,
  value: number,
) {
  material.uniforms[name].value = value;
}

export function setEmissive(material: MeshStandardMaterial, intensity: number) {
  material.emissiveIntensity = intensity;
}

export function lerpColor(
  material: MeshStandardMaterial,
  from: Color,
  to: Color,
  t: number,
) {
  material.color.lerpColors(from, to, t);
}
