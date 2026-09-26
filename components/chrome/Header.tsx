"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { CHAPTER_COUNT, isLive } from "@/content/hebrews";
import { useLang } from "@/lib/lang";
import { useEscape } from "@/lib/hooks";
import s from "./header.module.css";

export interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  chapter: number;
  navItems?: NavItem[];
  activeId?: string;
  activeLabel?: string;
  progressRef?: RefObject<HTMLDivElement | null>;
  onGo?: (id: string) => void;
  onTop?: () => void;
}

export function chapterHref(n: number) {
  return n === 1 ? "/" : `/${n}`;
}

export function Header({ chapter, navItems = [], activeId, activeLabel = "", progressRef, onGo, onTop }: HeaderProps) {
  const { lang, t, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEscape(() => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    items?.[chapter - 1]?.focus();
  }, [open, chapter]);

  const onMenuKey = (e: KeyboardEvent) => {
    const items = [...(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])];
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (items.length === 0) return;
    const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | null = null;
    if (e.key in step) next = (i + step[e.key] + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next === null) return;
    e.preventDefault();
    items[next].focus();
  };

  const chLabel = lang === "ko" ? `${chapter}장` : `Chapter ${chapter}`;
  const bookName = (n: number) => (lang === "ko" ? `히브리서 ${n}장` : `Hebrews ${n}`);

  return (
    <header className={s.header}>
      <div className={`hb-container ${s.inner}`}>
        <div className={s.left}>
          {onTop ? (
            <button type="button" className={s.brand} onClick={onTop}>{t.brand}</button>
          ) : (
            <Link href="/" className={s.brand}>{t.brand}</Link>
          )}
          <button
            type="button"
            className={`hb-eyebrow ${s.chapterBtn}`}
            aria-expanded={open}
            aria-haspopup="true"
            onClick={() => setOpen((o) => !o)}
          >
            {chLabel}
            <span aria-hidden="true" className={s.caret}>▼</span>
          </button>
        </div>

        {open && (
          <>
            <div className={s.backdrop} onClick={() => setOpen(false)} />
            <div ref={menuRef} role="menu" aria-label={t.chapters} className={s.menu} onKeyDown={onMenuKey}>
              <div className={s.menuHead}>
                <span className="hb-eyebrow">{t.chapters}</span>
                <span className={s.legend}>{t.chLegend}</span>
              </div>
              <div className={s.grid}>
                {Array.from({ length: CHAPTER_COUNT }, (_, i) => i + 1).map((n) => {
                  const cls = isLive(n) ? s.chipLive : n === chapter ? s.chipViewing : s.chipSoon;
                  return (
                    <Link
                      key={n}
                      role="menuitem"
                      tabIndex={n === chapter ? 0 : -1}
                      href={chapterHref(n)}
                      className={`${s.chip} ${cls}`}
                      aria-label={isLive(n) ? undefined : `${bookName(n)} · ${t.comingSoon}`}
                      onClick={() => setOpen(false)}
                    >
                      {n}
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {navItems.length > 0 && (
          <nav aria-label="Sections" className={s.nav}>
            {navItems.map((n) => (
              <button
                key={n.id}
                type="button"
                className={s.navItem}
                aria-current={activeId === n.id ? "true" : undefined}
                onClick={() => onGo?.(n.id)}
              >
                {n.label}
              </button>
            ))}
          </nav>
        )}
        <span className={s.activeLabel}>{activeLabel}</span>

        <div role="group" aria-label="Language" className={s.lang}>
          <button type="button" className={s.langBtn} aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            EN
          </button>
          <button type="button" className={`${s.langBtn} ${s.langKo}`} aria-pressed={lang === "ko"} onClick={() => setLang("ko")}>
            한국어
          </button>
        </div>
      </div>
      <div ref={progressRef} className={s.progress} style={{ width: 0 }} />
    </header>
  );
}
