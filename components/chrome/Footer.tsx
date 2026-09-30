"use client";

import { useLang } from "@/lib/lang";
import s from "./footer.module.css";

export function Footer({ quote }: { quote?: string }) {
  const { t } = useLang();
  return (
    <footer className={s.footer}>
      <div className={`hb-container ${s.inner}`}>
        {quote && <span className={s.quote}>{quote}</span>}
        <span>{t.footCredit}</span>
        <small className={s.legal}>{t.footLegal}</small>
      </div>
    </footer>
  );
}
