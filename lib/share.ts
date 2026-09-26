export function wordHash(mid: string, key: string) {
  return `hb-${mid}-${key}`;
}

const WORD_HASH = /^#?hb-(m\d+)-(\w+)$/;

export function parseWordHash(hash: string): { mid: string; key: string } | null {
  const m = WORD_HASH.exec(hash);
  return m ? { mid: m[1], key: m[2] } : null;
}

export function setHash(hash: string | null) {
  const url = hash ? `#${hash}` : window.location.pathname + window.location.search;
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

export const resumeKey = (chapter: number) => `hb-resume-${chapter}`;
