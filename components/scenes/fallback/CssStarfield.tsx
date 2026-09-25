import s from "./css.module.css";

export function CssStarfield({ opacity = 1, second = true }: { opacity?: number; second?: boolean }) {
  return (
    <>
      <div aria-hidden="true" className={`${s.layer} ${s.stars1}`} style={{ opacity }} />
      {second && <div aria-hidden="true" className={`${s.layer} ${s.stars2}`} />}
    </>
  );
}
