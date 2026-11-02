import s from "./mastery.module.css";

interface MasteryBarProps {
  known: number;
  total: number;
  label: string;
  tone?: "vellum" | "night";
  showLabel?: boolean;
}

/** One tick per quiz question in a chapter; filled ticks were answered right last time. */
export function MasteryBar({
  known,
  total,
  label,
  tone = "vellum",
  showLabel = false,
}: MasteryBarProps) {
  return (
    <span className={`${s.wrap} ${tone === "night" ? s.night : ""}`}>
      <span
        className={s.bar}
        role="img"
        aria-label={label}
        style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}
      >
        {Array.from({ length: total }, (_, i) => (
          <i key={i} className={i < known ? s.on : undefined} />
        ))}
      </span>
      {showLabel && (
        <span className={s.label} aria-hidden="true">
          {label}
        </span>
      )}
    </span>
  );
}
