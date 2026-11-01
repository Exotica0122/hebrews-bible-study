"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChapterContent, Setting } from "@/content/types";
import { keysOf } from "@/content/parse";
import { useLang } from "@/lib/lang";
import {
  MOBILE_QUERY,
  landOn,
  scrollToSection,
  scrollToTop,
  useEscape,
  useIsMobile,
  useReducedMotion,
  useScrollSpy,
} from "@/lib/hooks";
import { Header, type NavItem } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { Hero } from "@/components/hero/Hero";
import { ChapterMap } from "@/components/map/ChapterMap";
import { MovementLeaf } from "@/components/movement/MovementLeaf";
import { Appendix } from "@/components/appendix/Appendix";
import { Summary } from "@/components/summary/Summary";
import { BookIndex } from "@/components/book/BookIndex";
import { WordSheet } from "@/components/sheet/WordSheet";
import { BackToTop } from "@/components/chrome/BackToTop";
import { ChapterSteps } from "@/components/chrome/ChapterSteps";
import {
  parseThreadHash,
  parseWordHash,
  sectionOfHash,
  setHash,
  wordHash,
} from "@/lib/share";

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
  heavens:
    "3D · R3F — above a sea of cloud under the night heavens, the burning bush, Sinai, the pillar of cloud and the tablets drift in and gather into one light shining out over the clouds",
  earth:
    "3D · R3F — moonlit hills; lamp-carrying travellers wind up the road toward a walled town lit on its hill",
  wilderness:
    "3D · R3F — the camp of Israel in the dunes at dusk, tribe by tribe around the tabernacle under the pillar of fire",
  garden:
    "3D · R3F — the garden on the seventh day in full light: olive trees, still water and a high sun; the work is finished and nothing moves but the clouds",
  sanctuary:
    "3D · R3F — the Holy Place by lamplight: woven curtains of blue, purple and scarlet, the golden lampstand, the bread on its table, and incense rising before the veil",
  coast:
    "3D · R3F — ink wash on hanji: a bay between two headlands as the rain moves off, a boat riding at anchor, and a break of light left as bare paper",
  salem:
    "3D · R3F — shell and limestone inlay on small lapis tiles, in the manner of Abraham’s Ur: Salem on its terraces, and his company coming up the road toward it",
  pattern:
    "3D · R3F — a cyanotype sheet: the plan of the tent and its court drawn in white, Sinai in survey contours, and the true tent above in gold with its shadow printed pale below",
  gold: "3D · R3F — one sheet of beaten gold lit by a single moving lamp: the second curtain raised in relief between the lampstand and the table, with one scarlet line running down its seam",
  wall: "3D · R3F — a limewashed wall in hard sun where everything is a cast shadow: the curtain stands open and light pours through it, and people draw near from both sides",
  cloth:
    "3D · R3F — a long embroidered cloth under a raking lamp, with the people of faith stitched in wool along its length. It moves past the ark, the tents, the sea and Jericho to a line of witnesses and stops unfinished at bare linen, where a needle waits. Christ is shown only as the light at its far edge, with no human outline",
};

export function ChapterPage({
  chapter,
  ruledLines = true,
  showArtNotes = false,
  reduceMotion = false,
}: ChapterPageProps) {
  const { lang, t } = useLang();
  const isMobile = useIsMobile();
  const reduced = useReducedMotion(reduceMotion);
  const [word, setWord] = useState<OpenWord | null>(null);
  const [chips, setChips] = useState<Record<string, string | null>>(() => ({
    [chapter.movements[0].id]: chapter.movements[0].chips[0]?.id ?? null,
  }));
  const [alt, setAlt] = useState(false);

  const movements = chapter.movements;
  const summary = chapter.summary[lang];
  const copy = chapter.copy[lang];
  const appendix = chapter.appendix;
  const sectionIds = useMemo(
    () => [
      "hb-top",
      "hb-map",
      ...movements.map((m) => `hb-${m.id}`),
      ...(appendix ? ["hb-appendix"] : []),
      "hb-summary",
    ],
    [movements, appendix],
  );
  const progressRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const active = useScrollSpy(sectionIds, progressRef);

  const closeWord = useCallback(() => {
    setWord((w) => {
      if (w) {
        const trigger = document.querySelector<HTMLElement>(
          `[data-word="${w.mid}:${w.key}"]`,
        );
        requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
      }
      return null;
    });
  }, []);
  useEscape(closeWord, word !== null);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const target = parseWordHash(hash);
      if (target && movements.some((m) => m.id === target.mid)) {
        const wordEl = document.querySelector(
          `[data-word="${target.mid}:${target.key}"]`,
        );
        const spot = window.matchMedia(MOBILE_QUERY).matches
          ? wordEl
          : wordEl?.closest(".hb-anchor");
        const el = spot ?? document.getElementById(`hb-${target.mid}`);
        el?.scrollIntoView({ behavior: "auto", block: "start" });
        setWord({ mid: target.mid, key: target.key });
        return;
      }
      setWord(null);
      const thread = parseThreadHash(hash);
      if (thread) setChips((c) => ({ ...c, [thread.mid]: thread.id }));
      const exact = document.getElementById(hash.slice(1));
      if (exact) landOn(exact);
      else {
        const section = sectionOfHash(hash);
        const el = section && document.getElementById(section);
        if (el) landOn(el, false);
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [movements]);

  useEffect(() => {
    if (word) setHash(wordHash(word.mid, word.key));
    else if (parseWordHash(window.location.hash)) setHash(null);
  }, [word]);

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
    ...(appendix ? [{ id: "appendix", label: appendix.copy[lang].nav }] : []),
    { id: "summary", label: t.summary },
  ];
  const activeId = active.replace(/^hb-/, "");
  const activeMovement = movements.find((m) => m.id === activeId);
  const activeLabel = activeMovement
    ? `${activeMovement.num} · ${activeMovement[lang].title}`
    : activeId === "map"
      ? t.map
      : activeId === "summary"
        ? t.summary
        : activeId === "appendix" && appendix
          ? appendix.copy[lang].nav
          : "";

  const sheetMovement = word
    ? movements.find((m) => m.id === word.mid)
    : undefined;
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
      <main ref={mainRef}>
        <Hero
          copy={copy}
          setting={chapter.setting}
          onBegin={() => go(movements[0].id)}
          onMap={() => go("map")}
          artNote={
            showArtNotes && !isMobile ? HERO_ART[chapter.setting] : undefined
          }
          reduceMotion={reduceMotion}
        />
        <ChapterMap
          copy={copy}
          movements={movements}
          summary={summary}
          onGo={go}
        />
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
        {appendix && (
          <Appendix appendix={appendix} reduceMotion={reduceMotion} />
        )}
        <Summary summary={summary} title={copy.summaryTitle} />
        <BookIndex current={chapter.number} />
      </main>
      <Footer quote={copy.footQuote} />
      <ChapterSteps chapter={chapter.number} visible={!sheetOpen} />
      <BackToTop
        visible={activeId !== "top" && !sheetOpen}
        onClick={() => scrollToTop(reduced)}
      />
      {sheetOpen && word && sheetMovement && sheetWord && sheetWords && (
        <WordSheet
          word={sheetWord}
          prev={
            sheetIndex > 0 ? sheetWords[sheetKeys[sheetIndex - 1]] : undefined
          }
          next={
            sheetIndex >= 0 && sheetIndex < sheetKeys.length - 1
              ? sheetWords[sheetKeys[sheetIndex + 1]]
              : undefined
          }
          onPrev={() =>
            setWord({ mid: sheetMovement.id, key: sheetKeys[sheetIndex - 1] })
          }
          onNext={() =>
            setWord({ mid: sheetMovement.id, key: sheetKeys[sheetIndex + 1] })
          }
          onClose={closeWord}
        />
      )}
    </>
  );
}
