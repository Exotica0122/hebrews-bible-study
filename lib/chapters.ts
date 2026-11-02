export function chapterHref(n: number) {
  return `/${n}`;
}

export const QUIZ_HREF = "/quiz";

export function quizHref(n?: number) {
  return n === undefined ? QUIZ_HREF : `${QUIZ_HREF}/${n}`;
}
