import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const css = await (await fetch("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600", { headers: { "User-Agent": "Mozilla/4.0" } })).text();
const ttf = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
if (!ttf) throw new Error("no ttf url in\n" + css);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("about:blank");
await page.addScriptTag({ url: "https://cdnjs.cloudflare.com/ajax/libs/opentype.js/1.3.4/opentype.min.js" });
const glyphs = await page.evaluate(async (ttf) => {
  const buf = await (await fetch(ttf)).arrayBuffer();
  const font = opentype.parse(buf);
  const out = {};
  for (const [name, text, size] of [["H", "H", 100], ["word", "Hebrews", 100], ["wordKo", "히브리서", 100]]) {
    const p = font.getPath(text, 0, 0, size);
    const b = p.getBoundingBox();
    out[name] = { d: p.toPathData(3), x1: b.x1, y1: b.y1, x2: b.x2, y2: b.y2, adv: font.getAdvanceWidth(text, size) };
  }
  return out;
}, ttf);
await browser.close();
writeFileSync(process.argv[2] + "/glyphs.json", JSON.stringify(glyphs, null, 1));
console.log(Object.fromEntries(Object.entries(glyphs).map(([k, v]) => [k, [v.x1, v.y1, v.x2, v.y2, v.adv].map((n) => +n.toFixed(1))])));
