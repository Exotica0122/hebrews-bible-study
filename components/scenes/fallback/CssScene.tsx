import type { SceneId } from "../types";
import { CssStarfield } from "./CssStarfield";
import s from "./css.module.css";

const A = `${s.abs}`;
const C = `${s.abs} ${s.centered}`;
const CR = `${s.abs} ${s.centered} ${s.round}`;

const ANGEL_DOTS: [number, number, number][] = [
  [18, 46, 0.55], [26, 54, 0.6], [37, 59, 0.65], [50, 61, 0.7], [63, 59, 0.65], [74, 54, 0.6], [82, 46, 0.55],
];
const EMBERS: [number, number, number, number][] = [
  [18, 38, 18, 26], [27, 50, 12, 18], [13, 57, 10, 15], [34, 32, 9, 13],
];
const DUST: [number, number, number][] = [[36, 66, 0.4], [46, 68, 0.35], [56, 67, 0.4], [64, 69, 0.3]];

function Scene({ scene }: { scene: SceneId }) {
  switch (scene) {
    case "radiance":
      return (
        <>
          <div className={`${C} ${s.r_halo}`} />
          <div className={`${s.layer} ${s.r_beam}`} />
          <div className={`${s.layer} ${s.r_beamCore}`} />
          <div className={`${CR} ${s.r_sun}`} />
        </>
      );
    case "seal":
      return (
        <>
          <div className={`${C} ${s.s_halo}`} />
          <div className={`${CR} ${s.s_wax}`} />
          <div className={`${CR} ${s.s_ring}`} />
          <div className={`${CR} ${s.s_ringInner}`} />
          <div className={`${A} ${s.s_handle}`} />
          <div className={`${CR} ${s.s_head}`} />
        </>
      );
    case "angels":
      return (
        <>
          <div className={`${C} ${s.a_halo}`} />
          <div className={`${CR} ${s.core} ${s.a_core}`} />
          <div className={`${A} ${s.a_arc}`} />
          {ANGEL_DOTS.map(([l, t, o]) => (
            <span key={l} className={`${A} ${s.round} ${s.a_dot}`} style={{ left: `${l}%`, top: `${t}%`, opacity: o }} />
          ))}
        </>
      );
    case "throne":
      return (
        <>
          <div className={`${C} ${s.t_halo}`} />
          <div className={`${A} ${s.t_pillar}`} />
          <div className={`${A} ${s.t_base}`} />
          {EMBERS.map(([l, t, w, h]) => (
            <span key={l} className={`${A} ${s.t_ember}`} style={{ left: `${l}%`, top: `${t}%`, width: w, height: h }} />
          ))}
          <div className={`${A} ${s.t_wind}`} style={{ left: "8%", top: "46%", width: "34%", transform: "rotate(-8deg)" }} />
          <div className={`${A} ${s.t_wind}`} style={{ left: "10%", top: "52%", width: "30%", transform: "rotate(-5deg)", opacity: 0.8 }} />
        </>
      );
    case "fold":
      return (
        <>
          <div className={`${A} ${s.f_cloth}`}>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={s.f_panel} />
            ))}
          </div>
          <div className={`${s.layer} ${s.f_vignette}`} />
          <div className={`${C} ${s.f_halo}`} />
          <div className={`${CR} ${s.core} ${s.f_core}`} />
        </>
      );
    case "exalted":
      return (
        <>
          <div className={`${C} ${s.e_halo}`} />
          <div className={`${CR} ${s.core} ${s.e_core}`} />
          <div className={`${A} ${s.e_beam}`} />
          <div className={`${A} ${s.e_horizon}`} />
          <div className={`${A} ${s.e_haze}`} />
          {DUST.map(([l, t, o]) => (
            <span key={l} className={`${A} ${s.round} ${s.e_dust}`} style={{ left: `${l}%`, top: `${t}%`, opacity: o }} />
          ))}
        </>
      );
    default:
      return null;
  }
}

export function CssScene({ scene, className = "" }: { scene: SceneId; className?: string }) {
  return (
    <div aria-hidden="true" className={`${s.layer} ${className}`}>
      <CssStarfield opacity={0.75} second={false} />
      <Scene scene={scene} />
    </div>
  );
}

export function HeroHalo() {
  return (
    <div aria-hidden="true" className={s.abs} style={{ position: "relative", width: 18, height: 18, marginBottom: "clamp(48px,14vh,160px)", flex: "none" }}>
      <div className={`${C} ${s.h_halo}`} />
      <div className={`${s.abs} ${s.round} ${s.core} ${s.h_core}`} />
    </div>
  );
}
