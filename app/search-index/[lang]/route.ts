import { allChapters } from "@/content/hebrews";
import { buildEntries } from "@/content/search";
import type { Lang } from "@/content/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/search-index/[lang]">,
) {
  const { lang } = await params;
  const chapters = await allChapters();
  return Response.json(chapters.flatMap((c) => buildEntries(c, lang as Lang)));
}
