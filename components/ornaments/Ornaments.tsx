import s from "./ornaments.module.css";

export function Fleuron({ variant = "hero" }: { variant?: "hero" | "rule" }) {
  return (
    <div aria-hidden="true" className={`${s.fleuron} ${variant === "rule" ? s.rule : s.hero}`}>
      <span className={s.lineL} />
      <span className={s.glyph}>❧</span>
      <span className={s.lineR} />
    </div>
  );
}

export function DoubleFrame() {
  return (
    <>
      <div aria-hidden="true" className={s.frameOuter} />
      <div aria-hidden="true" className={s.frameInner} />
    </>
  );
}

export function LabelBar({ label, aside, className = "" }: { label: string; aside?: string; className?: string }) {
  return (
    <div className={`hb-eyebrow ${s.labelBar} ${className}`}>
      <span>{label}</span>
      {aside && <span className={s.aside}>{aside}</span>}
    </div>
  );
}
