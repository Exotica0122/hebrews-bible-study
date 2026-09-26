export const LANG_COOKIE = "hb-lang";
export const INTRO_COOKIE = "hb-intro";

const ONE_YEAR = 60 * 60 * 24 * 365;

export function setCookie(name: string, value: string) {
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
  } catch {}
}
