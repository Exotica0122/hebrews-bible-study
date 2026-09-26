import { chromium } from "@playwright/test";
const S = process.argv[2];
const PROTO = process.env.PROTO_URL;
const browser = await chromium.launch();
for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  for (const [label, url] of [["ours", process.env.BASE_URL ?? "http://localhost:3000/"], ["proto", PROTO]].filter(([, url]) => url)) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${S}/shots/${label}-${name}.png`, fullPage: true });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(label, name, "height", height);
    await page.close();
  }
}
await browser.close();
