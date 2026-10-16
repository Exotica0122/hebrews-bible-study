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
const BED: [number, number, number][] = Array.from({ length: 16 }, (_, i) => {
  const a = i * 2.39996;
  const r = Math.sqrt((i + 0.5) / 16) * 12;
  return [44 + Math.cos(a) * r, 62 + Math.sin(a) * r * 0.45, 0.6 + ((i * 7) % 5) * 0.1];
});
const EARTH_SCENES: SceneId[] = ["drift", "crowned", "gather", "freed", "heroEarth"];
const WILDERNESS_SCENES: SceneId[] = ["tabernacle", "rock", "coals", "threshold", "heroCamp"];
const GARDEN_SCENES: SceneId[] = ["seventh", "jordan", "sword", "mercy", "heroGarden"];
const SANCTUARY_SCENES: SceneId[] = ["offering", "diadem", "cries", "bread", "heroSanctuary"];
const COAST_SCENES: SceneId[] = ["foundation", "rain", "footsteps", "oath", "anchor", "heroCoast"];
/** Footprints running away up the beach: left %, top %, size px. */
const PRINTS: [number, number, number][] = Array.from({ length: 9 }, (_, i) => [62 + (i % 2 ? 1.6 : -1.6) * (1 - i / 10) - i * 0.9, 94 - i * 4.4 - i * i * 0.05, 20 - i * 1.7]);
const SAND_GLINTS: [number, number][] = Array.from({ length: 60 }, (_, i) => [(i * 37.1) % 100, 70 + ((i * 13.7) % 28)]);
const CROWD: [number, number][] = [[38, 0.5], [44, 0.55], [57, 0.53], [63, 0.48], [50.5, 0.58]];
const STONES: [number, number, number][] = [[30, 70, 26], [35, 71, 24], [40, 70, 26], [32, 66, 22], [37, 66, 24], [34.5, 62, 20]];

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
    case "tabernacle":
      return (
        <>
          <CssWildernessBackdrop pillar={false} />
          <div className={`${C} ${s.ta_glory}`} />
          <div className={`${A} ${s.ta_back}`} />
          <div className={`${A} ${s.ta_tent}`} />
          <div className={`${A} ${s.ta_door}`} />
          <div className={`${A} ${s.ta_altar}`} />
          <div className={`${A} ${s.ta_front}`} />
        </>
      );
    case "rock":
      return (
        <>
          <CssWildernessBackdrop pillar={false} />
          <div className={`${A} ${s.ro_pool}`} />
          <div className={`${A} ${s.ro_rock}`} />
          <div className={`${A} ${s.ro_cleft}`} />
          <div className={`${A} ${s.ro_water}`} />
        </>
      );
    case "coals":
      return (
        <>
          <div className={`${s.layer} ${s.co_ground}`} />
          {BED.map(([l, t, o], i) => (
            <span key={i} className={`${A} ${s.co_coal}`} style={{ left: `${l}%`, top: `${t}%`, opacity: o }} />
          ))}
          <span className={`${A} ${s.co_coal} ${s.co_lone}`} />
        </>
      );
    case "threshold":
      return (
        <>
          <div className={`${s.layer} ${s.wi_sky}`} />
          <div className={`${A} ${s.th_land}`} />
          <div className={`${A} ${s.th_river}`} />
          <svg className={`${A} ${s.th_people}`} viewBox="40 22 20 22" preserveAspectRatio="xMidYMax meet">
            {[[48.6, 1], [51.4, 0.96]].map(([x, h]) => (
              <path key={x} d={FIGURE} fill="#120D0C" transform={`translate(${x} 43) scale(${h * 0.5})`} />
            ))}
          </svg>
        </>
      );
    case "seventh":
      return (
        <>
          <CssGardenBackdrop />
          <div className={`${A} ${s.ga_days}`}>
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} className={`${s.round} ${i === 6 ? s.ga_dayGold : s.ga_day}`} />
            ))}
          </div>
        </>
      );
    case "jordan":
      return (
        <>
          <CssGardenBackdrop water={false} />
          <div className={`${A} ${s.jo_river}`} />
          <div className={`${A} ${s.jo_path}`} />
          {STONES.map(([l, t, w], i) => (
            <span key={i} className={`${A} ${s.jo_stone}`} style={{ left: `${l}%`, top: `${t}%`, width: w, height: w * 0.62 }} />
          ))}
        </>
      );
    case "sword":
      return (
        <>
          <CssGardenBackdrop sun={false} water={false} />
          <div className={`${C} ${s.sw_halo}`} />
          <svg className={`${A} ${s.sw_figure}`} viewBox="40 22 20 22" preserveAspectRatio="xMidYMax meet">
            <path d={FIGURE} fill="#B9A88C" transform="translate(50 43) scale(1)" />
          </svg>
          <div className={`${A} ${s.sw_mist} ${s.sw_left}`} />
          <div className={`${A} ${s.sw_mist} ${s.sw_right}`} />
          <div className={`${A} ${s.sw_seam}`} />
        </>
      );
    case "mercy":
      return (
        <>
          <CssGardenBackdrop sun={false} water={false} />
          <div className={`${A} ${s.me_cloud}`} style={{ top: "14%" }} />
          <div className={`${A} ${s.me_cloud}`} style={{ top: "26%", opacity: 0.7 }} />
          <div className={`${C} ${s.me_halo}`} />
          <div className={`${A} ${s.me_steps}`} />
          <div className={`${A} ${s.me_throne}`} />
          <svg className={`${A} ${s.me_figure}`} viewBox="40 22 20 22" preserveAspectRatio="xMidYMax meet">
            <path d={FIGURE} fill="#2E3826" transform="translate(50 43) scale(0.6)" />
          </svg>
        </>
      );
    case "offering":
      return (
        <>
          <CssSanctuaryBackdrop lampstand={false} table={false} />
          <div className={`${A} ${s.sa_smoke} ${s.of_wide}`} />
          <svg className={`${A} ${s.sa_people}`} viewBox="30 22 40 22" preserveAspectRatio="xMidYMax meet">
            <path d={FIGURE} fill="#2E4C7E" transform="translate(50 37) scale(0.42)" />
            {CROWD.map(([x, h]) => (
              <path key={x} d={FIGURE} fill="#3A2C22" transform={`translate(${x} 44) scale(${h})`} />
            ))}
          </svg>
        </>
      );
    case "diadem":
      return (
        <>
          <CssSanctuaryBackdrop lampstand={false} table={false} altar={false} />
          <div className={`${C} ${s.di_halo}`} />
          <div className={`${A} ${s.di_stand}`} />
          <div className={`${A} ${s.di_turban}`} />
          <div className={`${A} ${s.di_crown}`} />
        </>
      );
    case "cries":
      return (
        <>
          <div className={`${s.layer} ${s.cr_dark}`} />
          <div className={`${A} ${s.cr_shaft}`} />
          <div className={`${A} ${s.cr_pool}`} />
          <span className={`${A} ${s.round} ${s.sa_flame}`} style={{ left: "36%", top: "74%" }} />
          <svg className={`${A} ${s.sa_people}`} viewBox="40 22 20 22" preserveAspectRatio="xMidYMax meet">
            <path d={FIGURE} fill="#B9A88C" transform="translate(50 37) scale(0.6)" />
          </svg>
        </>
      );
    case "bread":
      return (
        <>
          <CssSanctuaryBackdrop lampstand={false} table={false} altar={false} />
          <div className={`${A} ${s.br_table}`} />
          <div className={`${A} ${s.br_cup}`} />
          <div className={`${A} ${s.br_loaf}`} style={{ top: "54%" }} />
          <div className={`${A} ${s.br_loaf}`} style={{ top: "51%", transform: "scale(0.94)" }} />
          <span className={`${A} ${s.round} ${s.sa_flame}`} style={{ left: "62%", top: "30%" }} />
        </>
      );
    case "foundation":
      return (
        <>
          <CssCoastBackdrop field={false} boat={false} />
          <div className={`${A} ${s.cs_ground}`} />
          <div className={`${A} ${s.fd_wall}`} />
          <div className={`${A} ${s.fd_stones}`}>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className={s.fd_stone} />
            ))}
          </div>
        </>
      );
    case "rain":
      return (
        <>
          <CssCoastBackdrop field={false} boat={false} />
          <div className={`${A} ${s.cs_ground}`} />
          <div className={`${A} ${s.rn_plot} ${s.rn_crop}`} />
          <div className={`${A} ${s.rn_plot} ${s.rn_thorns}`} />
          <div className={`${A} ${s.rn_fire}`} />
          <div className={`${s.layer} ${s.cs_rain}`} />
        </>
      );
    case "footsteps":
      return (
        <>
          <CssCoastBackdrop field={false} boat={false} cliff={false} />
          <div className={`${A} ${s.fs_sand}`} />
          {PRINTS.map(([l, t, w], i) => (
            <span key={i} className={`${A} ${s.fs_print}`} style={{ left: `${l}%`, top: `${t}%`, width: w * 0.55, height: w }} />
          ))}
          <svg className={`${A} ${s.sa_people}`} viewBox="40 22 20 22" preserveAspectRatio="xMidYMax meet">
            <path d={FIGURE} fill="#2E3A3E" transform="translate(52.4 31) scale(0.2)" />
          </svg>
        </>
      );
    case "oath":
      return (
        <>
          <div className={`${s.layer} ${s.oa_night}`} />
          <div className={`${s.layer} ${s.oa_stars}`} />
          <div className={`${A} ${s.oa_sea}`} />
          <div className={`${A} ${s.oa_sand}`} />
          {SAND_GLINTS.map(([l, t], i) => (
            <span key={i} className={`${A} ${s.round} ${s.oa_glint}`} style={{ left: `${l}%`, top: `${t}%` }} />
          ))}
          <svg className={`${A} ${s.sa_people}`} viewBox="40 22 20 22" preserveAspectRatio="xMidYMax meet">
            <path d={FIGURE} fill="#0A0D14" transform="translate(52 36) scale(0.42)" />
          </svg>
        </>
      );
    case "anchor":
      return (
        <>
          <div className={`${s.layer} ${s.an_water}`} />
          <div className={`${A} ${s.an_light}`} />
          <div className={`${A} ${s.an_hull}`} />
          <div className={`${A} ${s.an_rope}`} />
          <svg className={`${A} ${s.an_anchor}`} viewBox="-50 -10 100 120">
            <g fill="none" stroke="#1E2629" strokeWidth="7" strokeLinecap="round">
              <circle cx="0" cy="0" r="8" />
              <path d="M0 8V100M-24 24H24M-40 72Q-36 104 0 104Q36 104 40 72" />
            </g>
          </svg>
          <div className={`${A} ${s.an_curtain}`} />
        </>
      );
    case "heroCoast":
      return <CssCoastBackdrop />;
    case "heroSanctuary":
      return <CssSanctuaryBackdrop />;
    case "heroGarden":
      return <CssGardenBackdrop />;
    case "heroEarth":
      return <CssEarthBackdrop />;
    case "heroCamp":
      return <CssWildernessBackdrop />;
    default:
      return null;
  }
}

export function CssScene({ scene, className = "" }: { scene: SceneId; className?: string }) {
  return (
    <div aria-hidden="true" className={`${s.layer} ${className}`}>
      {!EARTH_SCENES.includes(scene) && !WILDERNESS_SCENES.includes(scene) && !GARDEN_SCENES.includes(scene) && !SANCTUARY_SCENES.includes(scene) && !COAST_SCENES.includes(scene) && <CssStarfield opacity={0.75} second={false} />}
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

/** Dusk wilderness: indigo sky with a terracotta horizon, dunes, and the pillar of fire over the camp. */
export function CssWildernessBackdrop({ pillar = true }: { pillar?: boolean }) {
  return (
    <div aria-hidden="true" className={s.layer}>
      <div className={`${s.layer} ${s.wi_sky}`} />
      <div className={`${s.layer} ${s.wi_stars}`} />
      {pillar && <div className={`${A} ${s.wi_pillar}`} />}
      <div className={`${s.layer} ${s.wi_far}`} />
      <div className={`${s.layer} ${s.wi_near}`} />
    </div>
  );
}

/** The garden on the seventh day in full light: clear sky, a high sun, sage hills and still water. */
export function CssGardenBackdrop({ sun = true, water = true, sunTop = 20 }: { sun?: boolean; water?: boolean; sunTop?: number }) {
  return (
    <div aria-hidden="true" className={s.layer}>
      <div className={`${s.layer} ${s.gd_sky}`} />
      {sun && <div className={`${A} ${s.round} ${s.gd_sun}`} style={{ top: `${sunTop}%` }} />}
      <div className={`${s.layer} ${s.gd_far}`} />
      <div className={`${s.layer} ${s.gd_near}`} />
      {water && <div className={`${A} ${s.gd_water}`} />}
    </div>
  );
}

/** The Holy Place by lamplight: the woven veil at the back, curtains down both sides, the lampstand, the incense altar and the table. */
export function CssSanctuaryBackdrop({ lampstand = true, altar = true, table = true }: { lampstand?: boolean; altar?: boolean; table?: boolean }) {
  return (
    <div aria-hidden="true" className={s.layer}>
      <div className={`${s.layer} ${s.sa_veil}`} />
      <div className={`${A} ${s.sa_side} ${s.sa_left}`} />
      <div className={`${A} ${s.sa_side} ${s.sa_right}`} />
      <div className={`${A} ${s.sa_floor}`} />
      {altar && <div className={`${A} ${s.sa_altar}`} />}
      {altar && <div className={`${A} ${s.sa_smoke}`} />}
      {lampstand && <div className={`${A} ${s.sa_lampstand}`} />}
      {lampstand && <div className={`${C} ${s.sa_glow}`} style={{ left: "24%", top: "40%" }} />}
      {table && <div className={`${A} ${s.sa_table}`} />}
      <div className={`${s.layer} ${s.sa_shade}`} />
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

/** A headland above the sea as the rain moves off: slate cloud, misty headlands, sea-green swell with a break of light, a cliff and a ploughed field. */
export function CssCoastBackdrop({ field = true, boat = true, cliff = true }: { field?: boolean; boat?: boolean; cliff?: boolean }) {
  return (
    <div aria-hidden="true" className={s.layer}>
      <div className={`${s.layer} ${s.cs_sky}`} />
      <div className={`${s.layer} ${s.cs_far}`} />
      <div className={`${A} ${s.cs_sea}`} />
      <div className={`${A} ${s.cs_glint}`} />
      <div className={`${A} ${s.cs_shower}`} />
      {cliff && <div className={`${A} ${s.cs_cliff}`} />}
      {cliff && <div className={`${A} ${s.cs_cliffL}`} />}
      {boat && <div className={`${A} ${s.cs_boat}`} />}
      {field && <div className={`${A} ${s.cs_turf}`} />}
      {field && <div className={`${A} ${s.cs_field}`} />}
    </div>
  );
}
