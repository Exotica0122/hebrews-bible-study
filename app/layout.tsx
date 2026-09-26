import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Cormorant_Garamond, EB_Garamond, Noto_Serif_KR } from "next/font/google";
import { LangProvider } from "@/lib/lang";
import { INTRO_COOKIE, LANG_COOKIE } from "@/lib/cookies";
import { IntroVeil } from "@/components/intro/IntroVeil";
import "./globals.css";
import "./print.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hebrews 1 · A verse-by-verse study",
  description:
    "A bilingual (English / 한국어) small-group study of Hebrews 1: five movements, word studies, commentary and cross-references.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#14110D",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const jar = await cookies();
  const lang = jar.get(LANG_COOKIE)?.value === "ko" ? "ko" : "en";
  const showIntro = jar.get(INTRO_COOKIE)?.value !== "1";
  return (
    <html
      lang={lang}
      className={`${ebGaramond.variable} ${cormorant.variable} ${notoSerifKr.variable}`}
    >
      <body>
        <LangProvider initial={lang}>
          {showIntro && <IntroVeil />}
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
