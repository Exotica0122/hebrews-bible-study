import { chromium } from "@playwright/test";
const S = process.argv[2];
const w = Number(process.argv[3] || 1440), h = Number(process.argv[4] || 900);
const name = process.argv[5] || "desktop";
const offsets = (process.argv[6] || "0,900,1800,2700,3600").split(",").map(Number);
const PROTO = "file:///Users/peteran/Downloads/design_handoff_hebrews_study/Hebrews%201%20Prototype%20v2.dc.html";
const browser = await chromium.launch();
for (const [label, url] of [["ours", process.env.BASE_URL ?? "http://localhost:3000/"], ["proto", PROTO]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  for (const y of offsets) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${S}/shots/${label}-${name}-${y}.png` });
  }
  await page.close();
}
await browser.close();
console.log("done");
