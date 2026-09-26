"use client";

import { useLang } from "@/lib/lang";
import s from "./backtotop.module.css";

interface BackToTopProps {
  visible: boolean;
  onClick: () => void;
}

export function BackToTop({ visible, onClick }: BackToTopProps) {
  const { t } = useLang();
  return (
    <button
      type="button"
      className={s.button}
      aria-label={t.backToTop}
      title={t.backToTop}
      data-visible={visible}
      tabIndex={visible ? 0 : -1}
      onClick={onClick}
    >
      <span aria-hidden="true" className={s.arrow}>↑</span>
    </button>
  );
}
