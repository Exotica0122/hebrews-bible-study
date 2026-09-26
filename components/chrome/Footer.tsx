"use client";

import { useLang } from "@/lib/lang";
import s from "./footer.module.css";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className={s.footer}>
      <div className={`hb-container ${s.inner}`}>
        <span className={s.quote}>{t.footQuote}</span>
        <span>{t.footCredit}</span>
        <small className={s.legal}>{t.footLegal}</small>
      </div>
    </footer>
  );
}
