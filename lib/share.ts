export function wordHash(mid: string, key: string) {
  return `hb-${mid}-${key}`;
}

const WORD_HASH = /^#?hb-(m\d+)-(\w+)$/;

export function parseWordHash(
  hash: string,
): { mid: string; key: string } | null {
  const m = WORD_HASH.exec(hash);
  return m ? { mid: m[1], key: m[2] } : null;
}

export function threadHash(mid: string, id: string) {
  return `hb-t-${mid}-${id}`;
}

const THREAD_HASH = /^#?hb-t-(m\d+)-([\w-]+)$/;

export function parseThreadHash(
  hash: string,
): { mid: string; id: string } | null {
  const m = THREAD_HASH.exec(hash);
  return m ? { mid: m[1], id: m[2] } : null;
}

/** Which section holds a hash target, for when the exact spot doesn't exist in this language. */
export function sectionOfHash(hash: string): string | null {
  if (/^#?hb-s-/.test(hash)) return "hb-summary";
  const m = /^#?hb-(?:c-|title-|t-)?(m\d+)/.exec(hash);
  return m ? `hb-${m[1]}` : null;
}

export function setHash(hash: string | null) {
  const url = hash
    ? `#${hash}`
    : window.location.pathname + window.location.search;
  history.replaceState(null, "", url);
}

export async function copyCurrentUrl(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch {
    return false;
  }
}
