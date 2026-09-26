import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
const S = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 600 }, deviceScaleFactor: 1 });
async function shot(svgPath, out, size) {
  const svg = readFileSync(svgPath, "utf8");
  await page.setContent(`<body style="margin:0;background:transparent"><img id="i" src="data:image/svg+xml;utf8,${encodeURIComponent(svg)}" style="display:block;width:${size}px;height:auto"></body>`);
  await page.locator("#i").screenshot({ path: out, omitBackground: true });
}
await shot("public/logo-mark.svg", `${S}/mark-512.png`, 512);
await shot(`${S}/logo-mark-small.svg`, `${S}/mark-small-256.png`, 256);
await shot("public/logo.svg", `${S}/logo-preview.png`, 700);
await shot("public/logo-dark.svg", `${S}/logo-dark-preview.png`, 700);
await browser.close();
console.log("rasters done");
