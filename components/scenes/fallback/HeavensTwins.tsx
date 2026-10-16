import type { CSSProperties } from "react";

const FILL: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};
const GOLD = "#C99A3E";
const PALE = "#E9D6A4";
const LIGHT = "#FFF3D6";

/** Deterministic star field inside a rectangle: x, y, radius. */
function stars(n: number, x: number, y: number, w: number, h: number) {
  return Array.from({ length: n }, (_, i) => [
    x + ((i * 37.3) % w),
    y + ((i * 13.7 + (i % 3) * 5.1) % h),
    0.12 + (i % 4) * 0.05,
  ]);
}

/** Heaps of the cloud sea along the bottom: cx, cy, rx, ry. */
const CLOUDS: [number, number, number, number][] = [
  [8, 44, 16, 6],
  [30, 46, 18, 6.5],
  [52, 45, 17, 6],
  [74, 46, 18, 6.5],
  [95, 44, 15, 6],
  [18, 52, 22, 7],
  [62, 53, 24, 7],
];

function Sky({ id, horizon }: { id: string; horizon: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#090B22" />
          <stop offset={horizon * 0.85} stopColor="#1A1E4A" />
          <stop offset={horizon} stopColor="#B7892C" />
          <stop offset="1" stopColor="#3A3248" />
        </linearGradient>
        <linearGradient id={`${id}-cloud`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B9A9B4" />
          <stop offset="1" stopColor="#4A3E5E" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor={LIGHT} stopOpacity="0.9" />
          <stop offset="0.25" stopColor="#F3D38A" stopOpacity="0.4" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="-60" y="-20" width="220" height="96" fill={`url(#${id}-sky)`} />
      {stars(70, -40, -10, 180, 34).map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={LIGHT} opacity="0.6" />
      ))}
    </>
  );
}

function CloudSea({ id }: { id: string }) {
  return (
    <>
      <rect x="-60" y="44" width="220" height="40" fill="#3A3248" />
      {[-80, 0, 80].map((dx) =>
        CLOUDS.map(([cx, cy, rx, ry]) => (
          <ellipse
            key={`${dx}-${cx}`}
            cx={cx + dx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill={`url(#${id}-cloud)`}
            opacity="0.85"
          />
        )),
      )}
    </>
  );
}

/** Arched back of the throne with the light in it, base at (cx, base). */
function Arch({
  cx,
  base,
  w,
  h,
}: {
  cx: number;
  base: number;
  w: number;
  h: number;
}) {
  const l = cx - w / 2;
  const r = cx + w / 2;
  const top = base - h;
  const d = `M${l} ${base}V${top + w * 0.6}Q${l} ${top} ${cx} ${top}Q${r} ${top} ${r} ${top + w * 0.6}V${base}Z`;
  return (
    <>
      <path d={d} fill={LIGHT} stroke={GOLD} strokeWidth={w * 0.12} />
    </>
  );
}

/** Reduced-motion twin of FoldScene: the starry heavens half rolled up like a robe over the clouds, the throne’s light shining beneath. */
export function FoldTwin() {
  const id = "h1fold";
  return (
    <svg
      style={FILL}
      viewBox="0 0 100 56"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <Sky id={id} horizon={0.66} />
      <defs>
        <linearGradient id={`${id}-cloth`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1A1E4A" />
          <stop offset="1" stopColor="#0C0E28" />
        </linearGradient>
        <linearGradient id={`${id}-roll`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8A5A6A" />
          <stop offset="0.35" stopColor="#5A2E4A" />
          <stop offset="1" stopColor="#2A1428" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="34" rx="24" ry="14" fill={`url(#${id}-glow)`} />
      <rect x="44.5" y="35" width="11" height="1.6" fill={PALE} />
      <rect x="46" y="33.6" width="8" height="1.6" fill={GOLD} />
      <rect x="47.2" y="31.6" width="5.6" height="2.2" fill={GOLD} />
      <Arch cx={50} base={31.8} w={4.2} h={6.5} />
      <CloudSea id={id} />
      <rect
        x="27"
        y="7.5"
        width="46"
        height="16.5"
        fill={`url(#${id}-cloth)`}
        stroke={GOLD}
        strokeWidth="0.5"
      />
      <rect
        x="28.4"
        y="8.9"
        width="43.2"
        height="13.7"
        fill="none"
        stroke={GOLD}
        strokeWidth="0.2"
      />
      {stars(40, 29, 9.5, 42, 12.5).map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r * 1.2} fill={LIGHT} />
      ))}
      <rect
        x="26.2"
        y="22.6"
        width="47.6"
        height="4"
        rx="2"
        fill={`url(#${id}-roll)`}
      />
      <rect
        x="26.2"
        y="23.4"
        width="47.6"
        height="0.35"
        fill={GOLD}
        opacity="0.7"
      />
      <ellipse cx="26.4" cy="24.6" rx="0.9" ry="2" fill={GOLD} />
      <ellipse cx="73.6" cy="24.6" rx="0.9" ry="2" fill={GOLD} />
    </svg>
  );
}

/** A small winged angel in flight, centred on its body. */
function Flyer({
  x,
  y,
  s,
  o,
  flip,
}: {
  x: number;
  y: number;
  s: number;
  o: number;
  flip?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      opacity={o}
    >
      <circle cx="0" cy="0" r="6" fill={`url(#h1exalted-glow)`} opacity="0.5" />
      <path d="M0 -0.6Q-3.4 -3.6 -4.6 -5Q-3.2 -1 -0.4 0.6Z" fill={PALE} />
      <path
        d="M0 -0.6Q2.6 -3.8 3.4 -5.4Q2.6 -1.2 0.4 0.6Z"
        fill={PALE}
        opacity="0.85"
      />
      <path d="M-0.9 -0.4L0.9 -0.4L1.6 3.4L-1.4 3.6Z" fill="#F4ECDC" />
      <circle cx="0" cy="-1.2" r="0.7" fill="#E2C9A0" />
    </g>
  );
}

/** Reduced-motion twin of ExaltedScene: the throne raised high on its steps above the clouds with the footstool before it, and angels sent out from it down toward the clouds. */
export function ExaltedTwin() {
  const id = "h1exalted";
  const steps = Array.from({ length: 6 }, (_, i) => i);
  return (
    <svg
      style={FILL}
      viewBox="0 0 100 56"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <Sky id={id} horizon={0.62} />
      <ellipse
        cx="50"
        cy="18"
        rx="38"
        ry="22"
        fill={`url(#${id}-glow)`}
        opacity="0.7"
      />
      <CloudSea id={id} />
      <ellipse cx="50" cy="38.5" rx="15" ry="4" fill={`url(#${id}-cloud)`} />
      {steps.map((i) => (
        <rect
          key={i}
          x={50 - (11 - i * 1.3)}
          y={37 - i * 1.6}
          width={(11 - i * 1.3) * 2}
          height="1.6"
          fill={i % 2 ? GOLD : PALE}
          stroke="#8A6A2A"
          strokeWidth="0.1"
        />
      ))}
      <rect x="46.2" y="25.4" width="7.6" height="3" fill={GOLD} />
      <rect x="47.4" y="27.4" width="5.2" height="1" fill={PALE} />
      <Arch cx={50} base={25.6} w={5.6} h={11} />
      <ellipse cx="50" cy="19" rx="9" ry="9" fill={`url(#${id}-glow)`} />
      <Flyer x={38} y={22} s={0.8} o={0.95} />
      <Flyer x={63} y={25} s={0.75} o={0.85} flip />
      <Flyer x={27} y={31} s={0.68} o={0.65} />
      <Flyer x={75} y={35} s={0.6} o={0.45} flip />
    </svg>
  );
}
