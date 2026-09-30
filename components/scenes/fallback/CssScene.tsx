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
/** Robed figure, feet at 0, 18 units tall; the SVG twin of GatherScene's figure. */
const FIGURE = "M-3 0Q-2.7-6-2.2-9.5Q-2.5-12-2.7-13Q-2.5-14-0.7-14.4L-0.55-15Q-1.3-15.4-1.2-16.2Q-1.1-17.5 0-17.5Q1.1-17.5 1.2-16.2Q1.3-15.4 0.55-15L0.7-14.4Q2.5-14 2.7-13Q2.5-12 2.2-9.5Q2.7-6 3 0Z";
const GATHERED: [number, number][] = [[50, 1], [44, 0.66], [56.4, 0.62], [39, 0.74], [61.6, 0.7], [34, 0.6], [66.2, 0.76]];
const LEAVES = Array.from({ length: 22 }, (_, i) => {
  const side = i < 11 ? 1 : -1;
  const k = (i % 11) / 10;
  const a = -Math.PI / 2 + k * (Math.PI - 0.32);
  return [50 + side * Math.cos(a) * 9, 44 - Math.sin(a) * 14, side * (k * 180 - 90) + (i % 2 ? 30 : -30)] as const;
});
const EARTH_SCENES: SceneId[] = ["drift", "crowned", "gather", "freed", "heroEarth"];

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
    case "drift":
      return (
        <>
          <div className={`${s.layer} ${s.dr_sky}`} />
          <div className={`${s.layer} ${s.dr_sea}`} />
          <div className={`${A} ${s.dr_post}`} />
          <div className={`${C} ${s.dr_lampHalo}`} />
          <div className={`${CR} ${s.dr_lamp}`} />
          <div className={`${A} ${s.dr_glint}`} />
          <div className={`${A} ${s.dr_rope}`} />
          <div className={`${A} ${s.dr_hull}`} />
          <div className={`${A} ${s.dr_mast}`} />
        </>
      );
    case "crowned":
      return (
        <>
          <div className={`${s.layer} ${s.cr_sky}`} />
          <div className={`${C} ${s.cr_halo}`} />
          {LEAVES.map(([l, t, r], i) => (
            <span key={i} className={`${A} ${s.cr_leaf}`} style={{ left: `${l}%`, top: `${t}%`, transform: `translate(-50%, -50%) rotate(${r}deg)` }} />
          ))}
        </>
      );
    case "gather":
      return (
        <>
          <div className={`${s.layer} ${s.ga_wall}`} />
          <svg className={`${A} ${s.ga_people}`} viewBox="30 25 40 18" preserveAspectRatio="xMidYMax meet">
            {GATHERED.map(([x, h]) => (
              <path key={x} d={FIGURE} fill="#0B0907" transform={`translate(${x} 43) scale(${h * 1.05} ${h})`} />
            ))}
          </svg>
        </>
      );
    case "freed":
      return (
        <>
          <div className={`${s.layer} ${s.fr_back}`} />
          <div className={`${A} ${s.fr_veil} ${s.fr_left}`} />
          <div className={`${A} ${s.fr_veil} ${s.fr_right}`} />
          <div className={`${A} ${s.fr_chain} ${s.fr_chainL}`} />
          <div className={`${A} ${s.fr_chain} ${s.fr_chainR}`} />
        </>
      );
    case "heroEarth":
      return <CssEarthBackdrop />;
    default:
      return null;
  }
}

export function CssScene({ scene, className = "" }: { scene: SceneId; className?: string }) {
  return (
    <div aria-hidden="true" className={`${s.layer} ${className}`}>
      {!EARTH_SCENES.includes(scene) && <CssStarfield opacity={0.75} second={false} />}
      <Scene scene={scene} />
    </div>
  );
}

export function CssEarthBackdrop() {
  return (
    <div aria-hidden="true" className={s.layer}>
      <div className={`${s.layer} ${s.he_sky}`} />
      <div className={`${s.layer} ${s.he_far}`} />
      <div className={`${s.layer} ${s.he_mid}`} />
      <div className={`${s.layer} ${s.he_near}`} />
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
