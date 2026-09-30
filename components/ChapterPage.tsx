"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChapterContent, Setting } from "@/content/types";
import { keysOf } from "@/content/parse";
import { useLang } from "@/lib/lang";
import { scrollToSection, scrollToTop, useEscape, useIsMobile, useReducedMotion, useScrollSpy } from "@/lib/hooks";
import { Header, type NavItem } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { Hero } from "@/components/hero/Hero";
import { ChapterMap } from "@/components/map/ChapterMap";
import { MovementLeaf } from "@/components/movement/MovementLeaf";
import { Summary } from "@/components/summary/Summary";
import { BookIndex } from "@/components/book/BookIndex";
import { WordSheet } from "@/components/sheet/WordSheet";
import { ResumePill } from "@/components/chrome/ResumePill";
import { BackToTop } from "@/components/chrome/BackToTop";
import { parseWordHash, resumeKey, setHash, wordHash } from "@/lib/share";

interface ChapterPageProps {
  chapter: ChapterContent;
  ruledLines?: boolean;
  showArtNotes?: boolean;
  reduceMotion?: boolean;
}

interface OpenWord {
  mid: string;
  key: string;
}

const HERO_ART: Record<Setting, string> = {
  heavens: "3D · R3F — fragments drift inward, trails dim as they merge into one light",
  earth: "3D · R3F — lamp-lit travellers on a road through the night hills toward a lit town",
  wilderness: "3D · R3F — the camp of Israel at dusk, tents around the tabernacle under the pillar of fire",
};

export function ChapterPage({ chapter, ruledLines = true, showArtNotes = false, reduceMotion = false }: ChapterPageProps) {
  const { lang, t } = useLang();
  const isMobile = useIsMobile();
  const reduced = useReducedMotion(reduceMotion);
  const [word, setWord] = useState<OpenWord | null>(null);
  const [chips, setChips] = useState<Record<string, string | null>>(() => ({ [chapter.movements[0].id]: chapter.movements[0].chips[0]?.id ?? null }));
  const [alt, setAlt] = useState(false);

  const movements = chapter.movements;
  const summary = chapter.summary[lang];
  const copy = chapter.copy[lang];
  const sectionIds = useMemo(() => ["hb-top", "hb-map", ...movements.map((m) => `hb-${m.id}`), "hb-summary"], [movements]);
  const progressRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const active = useScrollSpy(sectionIds, progressRef);

  const closeWord = useCallback(() => {
    setWord((w) => {
      if (w) {
        const trigger = document.querySelector<HTMLElement>(`[data-word="${w.mid}:${w.key}"]`);
        requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
      }
      return null;
    });
  }, []);
  useEscape(closeWord, word !== null);

  useEffect(() => {
    const openFromHash = () => {
      const target = parseWordHash(window.location.hash);
      if (!target || !movements.some((m) => m.id === target.mid)) return;
      const el = document.getElementById(`hb-${target.mid}`);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 63, behavior: "auto" });
      setWord({ mid: target.mid, key: target.key });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [movements]);

  useEffect(() => {
    if (word) setHash(wordHash(word.mid, word.key));
    else if (parseWordHash(window.location.hash)) setHash(null);
  }, [word]);

  useEffect(() => {
    if (!active.startsWith("hb-m")) return;
    try {
      window.localStorage.setItem(resumeKey(chapter.number), active.slice(3));
    } catch {}
  }, [active, chapter.number]);

  const sheetOpen = isMobile && word !== null;
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    main.inert = sheetOpen;
    return () => {
      main.inert = false;
    };
  }, [sheetOpen]);

  const go = useCallback(
    (id: string) => {
      scrollToSection(`hb-${id}`, reduced);
      setWord(null);
    },
    [reduced],
  );

  const toggleWord = (mid: string) => (key: string) =>
    setWord((w) => (w && w.mid === mid && w.key === key ? null : { mid, key }));
  const toggleChip = (mid: string) => (id: string) =>
    setChips((c) => ({ ...c, [mid]: c[mid] === id ? null : id }));

  const navItems: NavItem[] = [
    { id: "map", label: t.map },
    ...movements.map((m) => ({ id: m.id, label: m.num })),
    { id: "summary", label: t.summary },
  ];
  const activeId = active.replace(/^hb-/, "");
  const activeMovement = movements.find((m) => m.id === activeId);
  const activeLabel = activeMovement
    ? `${activeMovement.num} · ${activeMovement[lang].title}`
    : activeId === "map" ? t.map : activeId === "summary" ? t.summary : "";

  const sheetMovement = word ? movements.find((m) => m.id === word.mid) : undefined;
  const sheetKeys = sheetMovement ? keysOf(sheetMovement[lang].verses) : [];
  const sheetIndex = word ? sheetKeys.indexOf(word.key) : -1;
  const sheetWords = sheetMovement?.words[lang];
  const sheetWord = word && sheetWords ? sheetWords[word.key] : undefined;

  return (
    <>
      <Header
        chapter={chapter.number}
        navItems={navItems}
        activeId={activeId}
        activeLabel={activeLabel}
        progressRef={progressRef}
        onGo={go}
        onTop={() => scrollToTop(reduced)}
      />
      <ResumePill chapter={chapter.number} movements={movements} onGo={go} />
      <main ref={mainRef}>
        <Hero copy={copy} setting={chapter.setting} onBegin={() => go(movements[0].id)} onMap={() => go("map")} artNote={showArtNotes && !isMobile ? HERO_ART[chapter.setting] : undefined} reduceMotion={reduceMotion} />
        <ChapterMap copy={copy} movements={movements} summary={summary} onGo={go} />
        {movements.map((m, i) => (
          <MovementLeaf
            key={m.id}
            movement={m}
            index={i}
            chapter={chapter.number}
            version={copy.version}
            openKey={word?.mid === m.id ? word.key : null}
            showPopover={!isMobile}
            onToggleWord={toggleWord(m.id)}
            onCloseWord={closeWord}
            openChip={chips[m.id] ?? null}
            onToggleChip={toggleChip(m.id)}
            alt={alt}
            onAlt={setAlt}
            ruled={ruledLines}
            artNote={showArtNotes && !isMobile ? m.art : undefined}
            reduceMotion={reduceMotion}
          />
        ))}
        <Summary summary={summary} title={copy.summaryTitle} />
        <BookIndex current={chapter.number} />
      </main>
      <Footer quote={copy.footQuote} />
      <BackToTop visible={activeId !== "top" && !sheetOpen} onClick={() => scrollToTop(reduced)} />
      {sheetOpen && word && sheetMovement && sheetWord && sheetWords && (
        <WordSheet
          word={sheetWord}
          prev={sheetIndex > 0 ? sheetWords[sheetKeys[sheetIndex - 1]] : undefined}
          next={sheetIndex >= 0 && sheetIndex < sheetKeys.length - 1 ? sheetWords[sheetKeys[sheetIndex + 1]] : undefined}
          onPrev={() => setWord({ mid: sheetMovement.id, key: sheetKeys[sheetIndex - 1] })}
          onNext={() => setWord({ mid: sheetMovement.id, key: sheetKeys[sheetIndex + 1] })}
          onClose={closeWord}
        />
      )}
    </>
  );
}
