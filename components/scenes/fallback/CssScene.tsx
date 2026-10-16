import type { SceneId } from "../types";
import { CssStarfield } from "./CssStarfield";
import { ExaltedTwin, FoldTwin } from "./HeavensTwins";
import s from "./css.module.css";

const A = `${s.abs}`;
const C = `${s.abs} ${s.centered}`;
const CR = `${s.abs} ${s.centered} ${s.round}`;

const ANGEL_DOTS: [number, number, number][] = [
  [18, 46, 0.55],
  [26, 54, 0.6],
  [37, 59, 0.65],
  [50, 61, 0.7],
  [63, 59, 0.65],
  [74, 54, 0.6],
  [82, 46, 0.55],
];
const EMBERS: [number, number, number, number][] = [
  [18, 38, 18, 26],
  [27, 50, 12, 18],
  [13, 57, 10, 15],
  [34, 32, 9, 13],
];
/** Robed figure, feet at 0, 18 units tall; the SVG twin of GatherScene's figure. */
const FIGURE =
  "M-3 0Q-2.7-6-2.2-9.5Q-2.5-12-2.7-13Q-2.5-14-0.7-14.4L-0.55-15Q-1.3-15.4-1.2-16.2Q-1.1-17.5 0-17.5Q1.1-17.5 1.2-16.2Q1.3-15.4 0.55-15L0.7-14.4Q2.5-14 2.7-13Q2.5-12 2.2-9.5Q2.7-6 3 0Z";
/** Seventh-day garden twin, placed on the CSS ridges: left %, foot top %, height px. */
const GARDEN_TREES: [number, number, number][] = [
  [12, 66.6, 54],
  [27, 66.4, 40],
  [71, 66.2, 48],
  [87, 68.4, 36],
];
const GARDEN_BIRDS: [number, number, number][] = [
  [55, 24, 18],
  [59, 20, 13],
  [62.5, 26, 15],
  [52, 29, 12],
];
const GARDEN_PEOPLE: [number, number, string][] = [
  [35.5, 67.4, "#EDE3CF"],
  [38.5, 67.8, "#B5694A"],
];
const GATHERED: [number, number][] = [
  [50, 1],
  [44, 0.66],
  [56.4, 0.62],
  [39, 0.74],
  [61.6, 0.7],
  [34, 0.6],
  [66.2, 0.76],
];
/** Hebrews 2 freed twin: where each captive stands, in the svg's units. */
const FREED = [26, 38, 62, 74];
const LEAVES = Array.from({ length: 22 }, (_, i) => {
  const side = i < 11 ? 1 : -1;
  const k = (i % 11) / 10;
  const a = -Math.PI / 2 + k * (Math.PI - 0.32);
  return [
    50 + side * Math.cos(a) * 9,
    44 - Math.sin(a) * 14,
    side * (k * 180 - 90) + (i % 2 ? 30 : -30),
  ] as const;
});
/** Rock twin: the crag's outline and its sandstone courses, top y and colour. */
const CRAG =
  "M33 46.6L33.6 41L32.4 37L34.6 31.5L36 26L39.5 21L41 16.5L44.5 13L48 12.4L50.6 14.6L53 15L55.4 19L57 24.5L59.6 28.4L60.4 33L62.6 37.5L63.4 42L65 46.6Z";
const CRAG_STRATA: [number, string][] = [
  [8, "#A8744E"],
  [13, "#B5805A"],
  [18, "#9E6A48"],
  [23, "#C29068"],
  [28, "#A8744E"],
  [33, "#8E5E40"],
  [38, "#B5805A"],
  [43, "#9E6A48"],
];
/** Coals twin: those kneeling round the far side of the fire (x, foot y, scale), the hearth stones and the glints in the bed. */
const KNEELER =
  "M-3 0Q-2.7-4.5-1.6-7.4Q-1.2-8.4 0-8.4Q1.2-8.4 1.6-7.4Q2.7-4.5 3 0Z";
const KNEELERS = [200, 236, 270, 304, 340].map((d) => {
  const a = (d * Math.PI) / 180;
  return [50 + Math.cos(a) * 21, 36.5 + Math.sin(a) * 7, 0.95] as const;
});
const HEARTH = Array.from({ length: 15 }, (_, i) => {
  const a = 0.55 + (i / 14) * (Math.PI * 2 - 1.1);
  return [50 + Math.cos(a) * 12.6, 37 + Math.sin(a) * 4.4] as const;
});
const COAL_GLINTS = Array.from({ length: 18 }, (_, i) => {
  const a = i * 2.39996;
  const r = Math.sqrt((i + 0.5) / 18);
  return [50 + Math.cos(a) * r * 9.5, 37 + Math.sin(a) * r * 3] as const;
});
const EARTH_SCENES: SceneId[] = [
  "drift",
  "crowned",
  "gather",
  "freed",
  "heroEarth",
];
const WILDERNESS_SCENES: SceneId[] = [
  "tabernacle",
  "rock",
  "coals",
  "threshold",
  "heroCamp",
];
const GARDEN_SCENES: SceneId[] = [
  "seventh",
  "jordan",
  "sword",
  "mercy",
  "heroGarden",
];
const SANCTUARY_SCENES: SceneId[] = [
  "offering",
  "diadem",
  "cries",
  "bread",
  "heroSanctuary",
];
const COAST_SCENES: SceneId[] = [
  "foundation",
  "rain",
  "footsteps",
  "oath",
  "anchor",
  "heroCoast",
];
const SALEM_SCENES: SceneId[] = [
  "meeting",
  "tithe",
  "arise",
  "sworn",
  "forever",
  "heroSalem",
];
const STONE = "#E8DCC4";
const MANTLE = "#9C8466";
const GOLD = "#C99A3E";
/** Footprints running away up the beach: left %, top %, size px. */
const PRINTS: [number, number, number][] = Array.from({ length: 9 }, (_, i) => [
  62 + (i % 2 ? 1.6 : -1.6) * (1 - i / 10) - i * 0.9,
  94 - i * 4.4 - i * i * 0.05,
  20 - i * 1.7,
]);
const SAND_GLINTS: [number, number][] = Array.from({ length: 60 }, (_, i) => [
  (i * 37.1) % 100,
  70 + ((i * 13.7) % 28),
]);
const CROWD: [number, number][] = [
  [38, 0.5],
  [44, 0.55],
  [57, 0.53],
  [63, 0.48],
  [50.5, 0.58],
];
const STONES: [number, number, number][] = [
  [30, 70, 26],
  [35, 71, 24],
  [40, 70, 26],
  [32, 66, 22],
  [37, 66, 24],
  [34.5, 62, 20],
];

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
            <span
              key={l}
              className={`${A} ${s.round} ${s.a_dot}`}
              style={{ left: `${l}%`, top: `${t}%`, opacity: o }}
            />
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
            <span
              key={l}
              className={`${A} ${s.t_ember}`}
              style={{ left: `${l}%`, top: `${t}%`, width: w, height: h }}
            />
          ))}
          <div
            className={`${A} ${s.t_wind}`}
            style={{
              left: "8%",
              top: "46%",
              width: "34%",
              transform: "rotate(-8deg)",
            }}
          />
          <div
            className={`${A} ${s.t_wind}`}
            style={{
              left: "10%",
              top: "52%",
              width: "30%",
              transform: "rotate(-5deg)",
              opacity: 0.8,
            }}
          />
        </>
      );
    case "fold":
      return <FoldTwin />;
    case "exalted":
      return <ExaltedTwin />;
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
            <span
              key={i}
              className={`${A} ${s.cr_leaf}`}
              style={{
                left: `${l}%`,
                top: `${t}%`,
                transform: `translate(-50%, -50%) rotate(${r}deg)`,
              }}
            />
          ))}
        </>
      );
    case "gather":
      return (
        <>
          <div className={`${s.layer} ${s.ga_wall}`} />
          <svg
            className={`${A} ${s.ga_people}`}
            viewBox="30 25 40 18"
            preserveAspectRatio="xMidYMax meet"
          >
            {GATHERED.map(([x, h]) => (
              <path
                key={x}
                d={FIGURE}
                fill="#0B0907"
                transform={`translate(${x} 43) scale(${h * 1.05} ${h})`}
              />
            ))}
          </svg>
        </>
      );
    case "freed":
      return (
        <>
          <div className={`${s.layer} ${s.fr_back}`} />
          <svg
            className={s.layer}
            viewBox="0 0 100 56"
            preserveAspectRatio="xMidYMax meet"
          >
            {FREED.map((x) => (
              <g key={x} className={s.fr_iron}>
                <circle cx={x} cy={14} r={0.9} />
                <ellipse cx={x} cy={15.9} rx={0.4} ry={0.75} />
                <ellipse cx={x + 0.2} cy={17.3} rx={0.75} ry={0.4} />
                <ellipse cx={x + 2.6} cy={38.5} rx={0.75} ry={0.4} />
                <ellipse cx={x - 2.2} cy={39} rx={0.4} ry={0.75} />
              </g>
            ))}
            {FREED.map((x) => (
              <g
                key={x}
                transform={`translate(${x} 38) scale(0.8)`}
                className={s.fr_captive}
              >
                <path d="M-2.3-13L-4.2-19.2M2.3-13L4.2-19.2" />
                <path d={FIGURE} />
                <path
                  className={s.fr_shackle}
                  d="M-4.9-18.4h1.6M3.3-18.4h1.6M-4.7-17.6l-0.8 1.4M4.7-17.6l0.6 1.2"
                />
              </g>
            ))}
            <path
              d={FIGURE}
              className={s.fr_deliverer}
              transform="translate(50 38.4) scale(0.95)"
            />
          </svg>
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
          <svg
            className={`${A} ${s.ro_scene}`}
            viewBox="26 6 58 42"
            preserveAspectRatio="xMidYMax meet"
          >
            <defs>
              <radialGradient id="ro-pool">
                <stop offset="0" stopColor="#C9B8CF" stopOpacity="0.75" />
                <stop offset="0.55" stopColor="#6E5A6A" stopOpacity="0.5" />
                <stop offset="0.8" stopColor="#2A1A14" stopOpacity="0.45" />
                <stop offset="1" stopColor="#2A1A14" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ro-lit" x1="0" x2="1">
                <stop offset="0" stopColor="#D29A6C" stopOpacity="0.5" />
                <stop offset="0.6" stopColor="#D29A6C" stopOpacity="0" />
                <stop offset="1" stopColor="#1A100C" stopOpacity="0.5" />
              </linearGradient>
              <clipPath id="ro-clip">
                <path d={CRAG} />
              </clipPath>
            </defs>
            <ellipse cx="53" cy="46.2" rx="13" ry="2.6" fill="url(#ro-pool)" />
            <g clipPath="url(#ro-clip)">
              {CRAG_STRATA.map(([y, c], i) => (
                <rect key={i} x="30" y={y} width="40" height="5" fill={c} />
              ))}
              <rect x="30" y="8" width="40" height="40" fill="url(#ro-lit)" />
            </g>
            <path
              d="M49.6 21 L50.4 30 L49.8 37 L50.6 45"
              fill="none"
              stroke="rgba(243,211,138,0.35)"
              strokeWidth="3"
            />
            <path
              d="M49.6 21 L50.4 30 L49.8 37 L50.6 45"
              fill="none"
              stroke="#FFF2D0"
              strokeWidth="0.6"
            />
            <path
              d="M50.6 41 Q51.4 44 52 46.4"
              fill="none"
              stroke="rgba(220,232,230,0.8)"
              strokeWidth="0.9"
            />
            <path
              d={FIGURE}
              fill="#2E211B"
              transform="translate(60 46.4) scale(0.42)"
            />
            <path
              d="M58.3 46.4 L58.7 37.6"
              stroke="#2A1C14"
              strokeWidth="0.4"
            />
            {[
              [70, 0.4],
              [73.6, 0.42],
              [76.4, 0.38],
              [80, 0.41],
              [83.4, 0.39],
            ].map(([x, h]) => (
              <path
                key={x}
                d={FIGURE}
                fill="#24191A"
                transform={`translate(${x} 46.6) scale(${h})`}
              />
            ))}
          </svg>
        </>
      );
    case "coals":
      return (
        <>
          <div className={`${s.layer} ${s.co_ground}`} />
          <svg
            className={`${A} ${s.co_scene}`}
            viewBox="22 12 56 32"
            preserveAspectRatio="xMidYMax meet"
          >
            <defs>
              <radialGradient id="co-glow">
                <stop offset="0" stopColor="#F3B35A" stopOpacity="0.8" />
                <stop offset="1" stopColor="#C2531A" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="co-bed">
                <stop offset="0" stopColor="#FFD08A" />
                <stop offset="0.5" stopColor="#E2621B" />
                <stop offset="1" stopColor="#5A2410" />
              </radialGradient>
            </defs>
            {[18, 37, 63, 83].map((x, i) => (
              <g key={x} transform={`translate(${x} ${17 + (i % 2)})`}>
                <path d="M-4 0 L0 -3.4 L4 0Z" fill="#2C2230" />
                {i % 2 === 0 && (
                  <rect
                    x="-0.6"
                    y="-1.2"
                    width="1.2"
                    height="1.2"
                    fill="#C98A3E"
                  />
                )}
              </g>
            ))}
            <ellipse cx="50" cy="37" rx="30" ry="11" fill="url(#co-glow)" />
            {KNEELERS.map(([x, y, k], i) => (
              <g key={i} transform={`translate(${x} ${y}) scale(${k})`}>
                <path d={KNEELER} fill="#7A4A32" />
                <circle cy="-9.4" r="1.4" fill="#D08A58" />
              </g>
            ))}
            <ellipse cx="50" cy="37" rx="11" ry="3.6" fill="url(#co-bed)" />
            {COAL_GLINTS.map(([x, y], i) => (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="0.9"
                ry="0.45"
                fill="#FFE2A8"
              />
            ))}
            {HEARTH.map(([x, y], i) => (
              <ellipse key={i} cx={x} cy={y} rx="1.7" ry="1.1" fill="#2E2622" />
            ))}
            <ellipse cx="68" cy="40.2" rx="1.3" ry="0.9" fill="#6A625B" />
          </svg>
        </>
      );
    case "threshold":
      return (
        <>
          <div className={`${s.layer} ${s.wi_sky}`} />
          <div className={`${A} ${s.th_land}`} />
          <div className={`${A} ${s.th_river}`} />
          <svg
            className={`${A} ${s.th_people}`}
            viewBox="40 22 20 22"
            preserveAspectRatio="xMidYMax meet"
          >
            {[
              [48.6, 1],
              [51.4, 0.96],
            ].map(([x, h]) => (
              <path
                key={x}
                d={FIGURE}
                fill="#120D0C"
                transform={`translate(${x} 43) scale(${h * 0.5})`}
              />
            ))}
          </svg>
        </>
      );
    case "seventh":
      return (
        <>
          <CssGardenBackdrop />
          {GARDEN_TREES.map(([l, t, h]) => (
            <svg
              key={l}
              className={`${A} ${s.ga_thing}`}
              style={{ left: `${l}%`, top: `${t}%`, height: h }}
              viewBox="-10 -22 20 22"
            >
              <path d="M-0.8 0L0.9 0L1.4-10L-0.2-10Z" fill="#6B5640" />
              <ellipse cx="-3" cy="-12" rx="6" ry="4.4" fill="#56693F" />
              <ellipse cx="3.2" cy="-12.6" rx="6.2" ry="4.6" fill="#6E8550" />
              <ellipse cx="0" cy="-16.4" rx="5.4" ry="4" fill="#7E9660" />
              <ellipse cx="-1.4" cy="-17.6" rx="3" ry="1.8" fill="#97AD76" />
            </svg>
          ))}
          {GARDEN_BIRDS.map(([l, t, w]) => (
            <svg
              key={l}
              className={`${A} ${s.ga_bird}`}
              style={{ left: `${l}%`, top: `${t}%`, width: w }}
              viewBox="-11 -4 22 8"
            >
              <path
                d="M-11 2Q-5 2.5 0-1Q5 2.5 11 2Q5-0.5 0-3Q-5-0.5-11 2Z"
                fill="#3A4250"
              />
            </svg>
          ))}
          {GARDEN_PEOPLE.map(([l, t, fill]) => (
            <svg
              key={l}
              className={`${A} ${s.ga_thing}`}
              style={{ left: `${l}%`, top: `${t}%`, height: 34 }}
              viewBox="-3.5 -18 7 18"
            >
              <path d={FIGURE} fill={fill} />
            </svg>
          ))}
          <div className={`${A} ${s.ga_days}`}>
            {Array.from({ length: 7 }, (_, i) => (
              <span
                key={i}
                className={`${s.round} ${i === 6 ? s.ga_dayGold : s.ga_day}`}
              />
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
            <span
              key={i}
              className={`${A} ${s.jo_stone}`}
              style={{
                left: `${l}%`,
                top: `${t}%`,
                width: w,
                height: w * 0.62,
              }}
            />
          ))}
        </>
      );
    case "sword":
      return (
        <>
          <CssGardenBackdrop sun={false} water={false} />
          <div className={`${C} ${s.sw_halo}`} />
          <svg
            className={`${A} ${s.sw_figure}`}
            viewBox="40 22 20 22"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              d={FIGURE}
              fill="#B9A88C"
              transform="translate(50 43) scale(1)"
            />
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
          <div
            className={`${A} ${s.me_cloud}`}
            style={{ top: "26%", opacity: 0.7 }}
          />
          <div className={`${C} ${s.me_halo}`} />
          <div className={`${A} ${s.me_steps}`} />
          <div className={`${A} ${s.me_throne}`} />
          <svg
            className={`${A} ${s.me_figure}`}
            viewBox="40 22 20 22"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              d={FIGURE}
              fill="#2E3826"
              transform="translate(50 43) scale(0.6)"
            />
          </svg>
        </>
      );
    case "offering":
      return (
        <>
          <CssSanctuaryBackdrop lampstand={false} table={false} />
          <div className={`${A} ${s.sa_smoke} ${s.of_wide}`} />
          <svg
            className={`${A} ${s.sa_people}`}
            viewBox="30 22 40 22"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              d={FIGURE}
              fill="#2E4C7E"
              transform="translate(50 37) scale(0.42)"
            />
            {CROWD.map(([x, h]) => (
              <path
                key={x}
                d={FIGURE}
                fill="#3A2C22"
                transform={`translate(${x} 44) scale(${h})`}
              />
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
          <span
            className={`${A} ${s.round} ${s.sa_flame}`}
            style={{ left: "36%", top: "74%" }}
          />
          <svg
            className={`${A} ${s.sa_people}`}
            viewBox="40 22 20 22"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              d={FIGURE}
              fill="#B9A88C"
              transform="translate(50 37) scale(0.6)"
            />
          </svg>
        </>
      );
    case "bread":
      return (
        <>
          <CssSanctuaryBackdrop lampstand={false} table={false} altar={false} />
          <div className={`${A} ${s.br_table}`} />
          <div className={`${A} ${s.br_cup}`} />
          <div className={`${A} ${s.br_loaf}`} style={{ top: "53%" }} />
          <div
            className={`${A} ${s.br_loaf}`}
            style={{ top: "50.5%", transform: "scale(0.94)" }}
          />
          <div className={`${A} ${s.br_chain}`} />
          <div className={`${A} ${s.br_lamp}`} />
          <span
            className={`${A} ${s.round} ${s.sa_flame}`}
            style={{ left: "62%", top: "30%" }}
          />
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
          <div className={`${A} ${s.cs_ground} ${s.rn_ground}`} />
          <div className={`${A} ${s.rn_plot} ${s.rn_left}`} />
          <div className={`${A} ${s.rn_plot} ${s.rn_right}`} />
          <div className={`${A} ${s.rn_crop}`} />
          <div className={`${A} ${s.rn_thorns}`} />
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
            <span
              key={i}
              className={`${A} ${s.fs_print}`}
              style={{
                left: `${l}%`,
                top: `${t}%`,
                width: w * 0.55,
                height: w,
              }}
            />
          ))}
          <svg
            className={`${A} ${s.sa_people}`}
            viewBox="40 22 20 22"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              d={FIGURE}
              fill="#2E3A3E"
              transform="translate(52.4 31) scale(0.2)"
            />
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
            <span
              key={i}
              className={`${A} ${s.round} ${s.oa_glint}`}
              style={{ left: `${l}%`, top: `${t}%` }}
            />
          ))}
          <svg
            className={`${A} ${s.sa_people}`}
            viewBox="40 22 20 22"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              d={FIGURE}
              fill="#0A0D14"
              transform="translate(52 36) scale(0.42)"
            />
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
            <g
              fill="none"
              stroke="#1E2629"
              strokeWidth="7"
              strokeLinecap="round"
            >
              <circle cx="0" cy="0" r="8" />
              <path d="M0 8V100M-24 24H24M-40 72Q-36 104 0 104Q36 104 40 72" />
            </g>
          </svg>
          <div className={`${A} ${s.an_curtain}`} />
        </>
      );
    case "meeting":
      return (
        <>
          <CssSalemBackdrop />
          <svg
            className={`${A} ${s.sl_svg}`}
            viewBox="0 0 100 50"
            preserveAspectRatio="xMidYMax meet"
          >
            <Fig x={58} y={44} s={1.15} fill={STONE} />
            <rect x={56.3} y={22.6} width={3.4} height={1.2} fill={GOLD} />
            <path d="M53.6 31h2.4l-0.4 2.4h-1.6z" fill={GOLD} />
            <ellipse cx={53.4} cy={33.6} rx={1.4} ry={0.7} fill="#C08646" />
            <Fig x={47} y={44} s={1.1} fill={MANTLE} />
            {[
              [40, 43.4],
              [34, 44.4],
              [28, 43.6],
            ].map(([x, y]) => (
              <g key={x}>
                <Fig x={x} y={y} s={1.05} fill="#A58E70" />
                <line
                  x1={x + 2.4}
                  y1={y}
                  x2={x + 3.2}
                  y2={y - 24}
                  stroke="#6E5A44"
                  strokeWidth={0.35}
                />
              </g>
            ))}
          </svg>
        </>
      );
    case "tithe":
      return (
        <>
          <CssSalemBackdrop city={false} />
          <svg
            className={`${A} ${s.sl_svg}`}
            viewBox="0 0 100 50"
            preserveAspectRatio="xMidYMax meet"
          >
            {[
              [34, 41.5],
              [26, 40.5],
              [18, 39.5],
            ].map(([x, y], i) => (
              <Fig key={x} x={x} y={y} s={1 - i * 0.08} fill={STONE} o={0.5} />
            ))}
            <Fig x={42} y={44} s={1.15} fill={MANTLE} />
            <Fig x={62} y={44} s={1.15} fill={STONE} />
            <rect x={60.3} y={22.6} width={3.4} height={1.2} fill={GOLD} />
            {Array.from({ length: 9 }, (_, i) => (
              <ellipse
                key={i}
                cx={30 + i * 2.6}
                cy={47 + (i % 2) * 0.6}
                rx={1.3}
                ry={0.9}
                fill="#A07F58"
              />
            ))}
            <ellipse cx={58} cy={45} rx={1.3} ry={0.9} fill="#B08A5E" />
          </svg>
        </>
      );
    case "arise":
      return (
        <>
          <CssSalemBackdrop city={false} />
          <div className={`${A} ${s.sl_ray}`} />
          <svg
            className={`${A} ${s.sl_svg}`}
            viewBox="0 0 100 50"
            preserveAspectRatio="xMidYMax meet"
          >
            <rect x={36} y={34} width={9} height={8} fill="#B39A78" />
            <ellipse cx={40.5} cy={32.6} rx={1.4} ry={2} fill="#F0A060" />
            {[
              [31, 43],
              [25, 41.6],
              [19, 42.4],
            ].map(([x, y]) => (
              <g key={x}>
                <Fig x={x} y={y} s={1.05} fill={STONE} />
                <rect
                  x={x - 1.3}
                  y={y - 19.6}
                  width={2.6}
                  height={1.4}
                  rx={0.6}
                  fill="#FFF8EA"
                />
              </g>
            ))}
            <Fig x={56} y={44} s={1.2} fill="#FFF6E4" />
            <rect x={54.3} y={21.3} width={3.4} height={1.2} fill={GOLD} />
            <rect x={68} y={36} width={6} height={6} fill="#E4D4B6" />
            <rect x={70.7} y={25} width={0.7} height={11} fill={GOLD} />
            <circle cx={71} cy={24.4} r={1} fill={GOLD} />
          </svg>
        </>
      );
    case "sworn":
      return (
        <>
          <div className={`${s.layer} ${s.sl_sky}`} />
          <div className={`${A} ${s.sw_plinth}`} />
          <div className={`${A} ${s.sw_tablet}`} />
          <div className={`${A} ${s.sw_seal}`} />
        </>
      );
    case "forever":
      return (
        <>
          <CssSalemBackdrop city={false} />
          <div className={`${A} ${s.sl_ray}`} />
          <svg
            className={`${A} ${s.sl_svg}`}
            viewBox="0 0 100 50"
            preserveAspectRatio="xMidYMax meet"
          >
            <rect x={34} y={34} width={9} height={8} fill="#B39A78" />
            <ellipse cx={38.5} cy={32.6} rx={1.4} ry={2} fill="#F0A060" />
            {[0.12, 0.2, 0.3].map((o, i) => (
              <Fig
                key={i}
                x={62 + i * 5}
                y={42 + i * 0.4}
                s={1.05}
                fill={STONE}
                o={o}
              />
            ))}
            <path
              d="M53.4 26.5L51.4 20.5M58.6 26.5L60.6 20.5"
              stroke="#FFF6E4"
              strokeWidth={0.8}
              strokeLinecap="round"
            />
            <Fig x={56} y={44} s={1.2} fill="#FFF6E4" />
            <rect x={54.3} y={21.3} width={3.4} height={1.2} fill={GOLD} />
          </svg>
        </>
      );
    case "heroSalem":
      return <CssSalemBackdrop />;
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

export function CssScene({
  scene,
  className = "",
}: {
  scene: SceneId;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`${s.layer} ${className}`}>
      {!EARTH_SCENES.includes(scene) &&
        !WILDERNESS_SCENES.includes(scene) &&
        !GARDEN_SCENES.includes(scene) &&
        !SANCTUARY_SCENES.includes(scene) &&
        !COAST_SCENES.includes(scene) &&
        !SALEM_SCENES.includes(scene) && (
          <CssStarfield opacity={0.75} second={false} />
        )}
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
export function CssGardenBackdrop({
  sun = true,
  water = true,
  sunTop = 20,
}: {
  sun?: boolean;
  water?: boolean;
  sunTop?: number;
}) {
  return (
    <div aria-hidden="true" className={s.layer}>
      <div className={`${s.layer} ${s.gd_sky}`} />
      {sun && (
        <div
          className={`${A} ${s.round} ${s.gd_sun}`}
          style={{ top: `${sunTop}%` }}
        />
      )}
      <div className={`${s.layer} ${s.gd_far}`} />
      <div className={`${s.layer} ${s.gd_near}`} />
      {water && <div className={`${A} ${s.gd_water}`} />}
    </div>
  );
}

/** The Holy Place by lamplight: the woven veil at the back, curtains down both sides, the lampstand, the incense altar and the table. */
export function CssSanctuaryBackdrop({
  lampstand = true,
  altar = true,
  table = true,
}: {
  lampstand?: boolean;
  altar?: boolean;
  table?: boolean;
}) {
  // Only the hero shows all three; its altar moves off the text column.
  const hero = lampstand && table;
  return (
    <div aria-hidden="true" className={s.layer}>
      <div className={`${s.layer} ${s.sa_veil}`} />
      <div className={`${A} ${s.sa_side} ${s.sa_left}`} />
      <div className={`${A} ${s.sa_side} ${s.sa_right}`} />
      <div className={`${A} ${s.sa_floor}`} />
      {altar && (
        <div className={`${A} ${s.sa_altar} ${hero ? s.sa_low : ""}`} />
      )}
      {altar && (
        <div className={`${A} ${s.sa_smoke} ${hero ? s.sa_lowSmoke : ""}`} />
      )}
      {lampstand && (
        <svg className={`${A} ${s.sa_lampstand}`} viewBox="0 0 70 120">
          <g fill="none" stroke="#c9a24a" strokeWidth="3">
            <path d="M35 30V112" />
            {[10, 20, 30].map((r) => (
              <path key={r} d={`M${35 - r} 30A${r} ${r} 0 0 0 ${35 + r} 30`} />
            ))}
          </g>
          <path d="M27 110h16l6 10H21z" fill="#c9a24a" />
          {[5, 15, 25, 35, 45, 55, 65].map((x) => (
            <ellipse key={x} cx={x} cy={25} rx={2.2} ry={4} fill="#fff4d6" />
          ))}
        </svg>
      )}
      {lampstand && (
        <div
          className={`${C} ${s.sa_glow}`}
          style={{ left: "18%", top: "calc(77% - 127px)" }}
        />
      )}
      {table && (
        <svg className={`${A} ${s.sa_table}`} viewBox="0 0 90 60">
          {[18, 64].map((x) => (
            <g key={x} fill="#d9a56a">
              <ellipse cx={x} cy={19} rx={13} ry={3.5} />
              <ellipse cx={x} cy={14} rx={12} ry={3.5} />
            </g>
          ))}
          <rect y="22" width="90" height="7" fill="#c9a24a" />
          <rect x="5" y="29" width="5" height="31" fill="#a07c34" />
          <rect x="80" y="29" width="5" height="31" fill="#a07c34" />
          <rect x="10" y="38" width="70" height="3" fill="#8a6a2c" />
        </svg>
      )}
      <div className={`${s.layer} ${s.sa_shade}`} />
    </div>
  );
}

export function HeroHalo() {
  return (
    <div
      aria-hidden="true"
      className={s.abs}
      style={{
        position: "relative",
        width: 18,
        height: 18,
        marginBottom: "clamp(48px,14vh,160px)",
        flex: "none",
      }}
    >
      <div className={`${C} ${s.h_halo}`} />
      <div className={`${s.abs} ${s.round} ${s.core} ${s.h_core}`} />
    </div>
  );
}

/** A headland above the sea as the rain moves off: slate cloud, misty headlands, sea-green swell with a break of light, a cliff and a ploughed field. */
export function CssCoastBackdrop({
  field = true,
  boat = true,
  cliff = true,
}: {
  field?: boolean;
  boat?: boolean;
  cliff?: boolean;
}) {
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

function Fig({
  x,
  y,
  s: k,
  fill,
  o = 1,
}: {
  x: number;
  y: number;
  s: number;
  fill: string;
  o?: number;
}) {
  return (
    <path
      d={FIGURE}
      fill={fill}
      opacity={o}
      transform={`translate(${x} ${y}) scale(${k})`}
    />
  );
}

/** Salem on its terraced hill at first light: peach dawn under pale lapis, the walled city on the tell, a road down across the valley floor. */
export function CssSalemBackdrop({ city = true }: { city?: boolean }) {
  return (
    <div aria-hidden="true" className={s.layer}>
      <div className={`${s.layer} ${s.sl_sky}`} />
      <div className={`${A} ${s.sl_far}`} />
      {city && <div className={`${A} ${s.sl_tell}`} />}
      {city && <div className={`${A} ${s.sl_city}`} />}
      <div className={`${A} ${s.sl_ground}`} />
      {city && <div className={`${A} ${s.sl_road}`} />}
    </div>
  );
}
