"use client";

import Link from "next/link";
import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { CHAPTER_COUNT, LATEST_LIVE, LIVE_COUNT } from "@/content/hebrews";
import {
  searchEntries,
  snippet,
  type SearchEntry,
  type SearchGroupKind,
} from "@/content/search";
import type { Lang, Segment } from "@/content/types";
import { chapterHref } from "@/lib/chapters";
import { useLang } from "@/lib/lang";
import s from "./search.module.css";

const GROUP_LIMIT = 4;

const indexes = new Map<Lang, Promise<SearchEntry[]>>();

function loadIndex(lang: Lang): Promise<SearchEntry[]> {
  let index = indexes.get(lang);
  if (!index) {
    index = fetch(`/search-index/${lang}`).then((res) => {
      if (!res.ok) throw new Error(`Search index: ${res.status}`);
      return res.json() as Promise<SearchEntry[]>;
    });
    index.catch(() => indexes.delete(lang));
    indexes.set(lang, index);
  }
  return index;
}

const noSubscribe = () => () => {};

function useShortcutLabel() {
  return useSyncExternalStore(
    noSubscribe,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K"),
    () => "",
  );
}

function Marked({ segments }: { segments: Segment[] }) {
  return segments.map((seg, i) =>
    seg.key ? <mark key={i}>{seg.text}</mark> : <span key={i}>{seg.text}</span>,
  );
}

export function SearchDialog({ chapter }: { chapter: number }) {
  const { lang, t } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const shortcut = useShortcutLabel();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState<{
    lang: Lang;
    entries: SearchEntry[];
  } | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<SearchGroupKind | null>(null);

  const deferred = useDeferredValue(query);
  const entries = loaded?.lang === lang ? loaded.entries : null;
  const results = useMemo(
    () => (entries ? searchEntries(entries, deferred) : null),
    [entries, deferred],
  );
  const groups = useMemo(
    () =>
      (results?.groups ?? []).map((g) => ({
        ...g,
        shown:
          expanded === g.kind || g.kind === "passage"
            ? g.hits
            : g.hits.slice(0, GROUP_LIMIT),
      })),
    [results, expanded],
  );
  const shownCount = groups.reduce((n, g) => n + g.shown.length, 0);
  const totalCount = groups.reduce((n, g) => n + g.hits.length, 0);

  useEffect(() => {
    if (!open || entries) return;
    let stale = false;
    loadIndex(lang).then(
      (next) => {
        if (stale) return;
        setFailed(false);
        setLoaded({ lang, entries: next });
      },
      () => {
        if (!stale) setFailed(true);
      },
    );
    return () => {
      stale = true;
    };
  }, [open, lang, entries, attempt]);

  const show = () => {
    setActive(0);
    setOpen(true);
    dialogRef.current?.showModal();
    inputRef.current?.select();
  };
  const hide = () => dialogRef.current?.close();

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key.toLowerCase() !== "k" || !(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      if (dialogRef.current?.open) hide();
      else show();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const optionId = (i: number) => `${baseId}-option-${i}`;

  const moveTo = (i: number) => {
    setActive(i);
    document.getElementById(optionId(i))?.scrollIntoView({ block: "nearest" });
  };

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (shownCount === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveTo((active + 1) % shownCount);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveTo((active - 1 + shownCount) % shownCount);
    } else if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById(optionId(active))?.click();
    }
  };

  const onPick = (e: MouseEvent<HTMLAnchorElement>, entry: SearchEntry) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    hide();
    if (entry.chapter !== chapter) return;
    e.preventDefault();
    if (!entry.target) {
      window.scrollTo({ top: 0, behavior: "auto" });
      history.pushState(null, "", window.location.pathname);
      return;
    }
    if (window.location.hash !== `#${entry.target}`)
      history.pushState(null, "", `#${entry.target}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const typed = deferred.trim();
  const terms = results?.terms ?? [];
  const soon = results?.soon ?? null;
  const later =
    LATEST_LIVE < CHAPTER_COUNT
      ? t.searchLater(LATEST_LIVE + 1, CHAPTER_COUNT)
      : null;
  const isEmpty = entries !== null && totalCount === 0 && typed.length > 1;
  let optionIndex = 0;

  return (
    <>
      <button
        type="button"
        className={s.trigger}
        aria-label={t.search}
        aria-keyshortcuts="Meta+K Control+K"
        onClick={show}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" className={s.icon}>
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="M12.8 12.8 17.5 17.5" />
        </svg>
        <span className={s.triggerLabel}>{t.search}</span>
        {shortcut && <kbd className={s.triggerKey}>{shortcut}</kbd>}
      </button>

      <dialog
        ref={dialogRef}
        aria-label={t.search}
        className={s.dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) hide();
        }}
      >
        <div className={s.panel}>
          <div className={s.field}>
            <svg viewBox="0 0 20 20" aria-hidden="true" className={s.icon}>
              <circle cx="8.5" cy="8.5" r="5.5" />
              <path d="M12.8 12.8 17.5 17.5" />
            </svg>
            <input
              ref={inputRef}
              className={s.input}
              role="combobox"
              aria-expanded={shownCount > 0}
              aria-controls={`${baseId}-list`}
              aria-activedescendant={
                shownCount > 0 ? optionId(active) : undefined
              }
              aria-label={t.search}
              placeholder={t.searchPlaceholder}
              value={query}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="search"
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
                setExpanded(null);
                listRef.current?.scrollTo({ top: 0 });
              }}
              onKeyDown={onInputKey}
            />
            <kbd className={s.esc}>Esc</kbd>
            <button type="button" className={s.cancel} onClick={hide}>
              {t.searchCancel}
            </button>
          </div>

          <div ref={listRef} className={s.results}>
            <div id={`${baseId}-list`} role="listbox" aria-label={t.search}>
              {open &&
                groups.map((g) => (
                  <div
                    key={g.kind}
                    role="group"
                    aria-label={t.searchGroups[g.kind]}
                  >
                    <div className={`hb-eyebrow ${s.group}`} aria-hidden="true">
                      {t.searchGroups[g.kind]}
                    </div>
                    {g.shown.map((entry) => {
                      const i = optionIndex++;
                      const href = entry.target
                        ? `${chapterHref(entry.chapter)}#${entry.target}`
                        : chapterHref(entry.chapter);
                      return (
                        <Link
                          key={`${entry.chapter}-${entry.kind}-${entry.target}`}
                          id={optionId(i)}
                          role="option"
                          aria-selected={i === active}
                          tabIndex={-1}
                          href={href}
                          prefetch={false}
                          className={s.result}
                          onClick={(e) => onPick(e, entry)}
                          onMouseMove={() => {
                            if (i !== active) setActive(i);
                          }}
                        >
                          <span className={s.ref}>{entry.ref}</span>
                          {entry.title && (
                            <span className={s.title}>
                              <Marked
                                segments={snippet(entry.title, terms, 200)}
                              />
                            </span>
                          )}
                          {entry.text && (
                            <span className={s.text}>
                              <Marked segments={snippet(entry.text, terms)} />
                            </span>
                          )}
                        </Link>
                      );
                    })}
                    {g.hits.length > g.shown.length && (
                      <button
                        type="button"
                        className={s.more}
                        onClick={() => {
                          setExpanded(g.kind);
                          inputRef.current?.focus();
                        }}
                      >
                        {t.searchMore(g.hits.length - g.shown.length)}
                      </button>
                    )}
                  </div>
                ))}
            </div>

            {open && failed && (
              <div className={s.notice} role="alert">
                <p>{t.searchFailed}</p>
                <button
                  type="button"
                  className={s.retry}
                  onClick={() => {
                    setFailed(false);
                    setAttempt((n) => n + 1);
                  }}
                >
                  {t.searchRetry}
                </button>
              </div>
            )}
            {open && !failed && !entries && (
              <p className={s.notice}>{t.searchLoading}</p>
            )}
            {open && entries && soon !== null && (
              <p className={s.notice}>{t.searchSoon(soon)}</p>
            )}
            {open && isEmpty && soon === null && (
              <div className={s.notice}>
                <p>{t.searchNone(typed, LIVE_COUNT)}</p>
                {later && <p>{later}</p>}
              </div>
            )}
            {open && entries && typed.length === 0 && (
              <div className={s.notice}>
                <p>{t.searchScope(LIVE_COUNT)}</p>
                <ul className={s.examples}>
                  {t.searchExamples.map(([label, example]) => (
                    <li key={label}>
                      <button
                        type="button"
                        className={s.example}
                        onClick={() => {
                          setQuery(example);
                          inputRef.current?.focus();
                        }}
                      >
                        {label}: {example}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={s.foot}>
            <span aria-live="polite">
              {totalCount > 0 ? t.searchCount(totalCount) : ""}
            </span>
            <span className={s.keys}>
              ↑↓ {t.searchKeys.move} · ↵ {t.searchKeys.go} · Esc{" "}
              {t.searchKeys.close}
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
