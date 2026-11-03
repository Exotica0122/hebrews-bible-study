# Home Scene: The Letter by Lamplight — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Jerusalem home hero (`heroHome`) with a lit 3D scene of a papyrus scroll of Hebrews 1:1–2 beside a Herodian oil lamp on a dark table, at the quality of the chapter heroes.

**Architecture:** Pure, unit-tested modules hold the scroll text and its line layout, and the motion curves (flame flicker, line-by-line ink reveal). Procedural canvas textures (papyrus colour and relief, ink, table wood, clay) feed R3F primitives in one `Letter.tsx` file. `HeroHomeScene.tsx` composes them with one flickering point light and drives the timeline. Everything plugs into the existing `heroHome` slot, so the home page, stills and fallbacks stay wired.

**Tech Stack:** Next 16, React 19, three 0.186, @react-three/fiber 9, drei 10, @react-three/postprocessing via `SceneEffects`, Vitest, Playwright tooling in `e2e/tools`.

**Spec:** `docs/superpowers/specs/2026-11-03-home-letter-scene-design.md`

## Global Constraints

- Keep scene id `heroHome`. No changes to `SceneId`, the registry key, `HomeStage` wiring or `SceneStill`.
- No figures, hands or silhouettes. Nothing stands for Christ. No pen, inkpot or other objects: papyrus, rolls, lamp and table only.
- Greek follows P46:
  - text taken from a published P46 transcription (Münster NTVMR) and checked against SBLGNT/NA28, never typed from memory;
  - capitals with no spaces, accents or breathings;
  - lunate sigma `Ϲ` (U+03F9), never `Σ` or `ς`;
  - nomina sacra overlined as P46 has them (at least ΘϹ for θεός in 1:1), with none invented;
  - lines break mid-word with no hyphen, and there's no heading.
- The flame is the only real light, plus one faint cool fill. No sky, haze or daylight.
- The lower part of the frame is dark table: the title's ground. The home scrim gets only as strong as contrast needs.
- Shadows: real shadow maps when `effects` is true (tier 3). Otherwise contact-shadow textures under the rolls and lamp.
- The still is taken at the hold. All lines are inked by `WRITE_END` = 8 s, and the still moment stays 10 s.
- Code comments follow the user's rule: minimal, one terse line, only for a non-obvious why.
- Read `node_modules/next/dist/docs/` before touching any Next API (AGENTS.md). This plan touches none beyond CSS and client components.
- One dev server on port 3000. Real-GPU shots for sign-off, never SwiftShader alone.

## Review Focus

1. **The webfont isn't loaded when the canvas draws the Greek.** Expected: the scroll is never drawn in a fallback serif. Pinned in Task 3 by awaiting `document.fonts.load` for the Greek face before drawing, and in Task 6 by checking the still visually.
2. **The font lacks `Ϲ` or a usable overline.** Expected: the glyph still reads as a lunate sigma and the line over ΘϹ sits correctly. Pinned in Task 3 by drawing the overline as a stroke, and drawing `Ϲ` as an arc if `measureText` shows the font has no glyph.
3. **Low tier or phone: no shadow maps, smaller textures.** Expected: rolls and lamp still sit on the table, and the title ground stays dark. Pinned in Task 5 by contact-shadow meshes rendered when `!effects`, and in Task 6 by stills and shots at tier 1 and on mobile.
4. **Portrait/landscape change or resize mid-scene.** Expected: the framing switches between the desktop and phone cameras without the writing restarting. Pinned in Task 5: the camera reads `mobile` each frame, and the reveal is driven only by scene time.
5. **Reduced motion or no WebGL.** Expected: the new still with all the writing in, not the old Jerusalem still. Pinned in Task 6 by regenerating both stills and the existing `stills.test.ts`.

---

### Task 1: Scroll text and line layout

**Files:**
- Create: `components/scenes/three/primitives/letterText.ts`
- Test: `components/scenes/three/primitives/letterText.test.ts`

**Interfaces:**
- Produces:
  - `type Glyph = { ch: string; over: boolean }`
  - `const SCROLL_TEXT: string`: P46's 1:1–2 in scriptio continua, with overlined nomina sacra marked in braces, e.g. `…Ο{ΘϹ}ΛΑΛΗϹΑϹ…`.
  - `function glyphs(text: string): Glyph[]`: strips the braces and marks the glyphs inside as `over: true`.
  - `function layoutLines(text: string, perLine: number): Glyph[][]`: greedy fill to exactly `perLine` glyphs per line (the last line shorter), breaking anywhere.

- [ ] **Step 1: Fetch the source text.** Open the NTVMR transcription of P46 (GA 0046) at Hebrews 1:1–2 (`https://ntvmr.uni-muenster.de/manuscript-workspace`, document 10046). Copy its letters for 1:1 through the end of 1:2, as far as P46 preserves them. Compare word by word with SBLGNT Heb 1:1–2. Record the URL and any P46-vs-critical-text differences for the commit message. If NTVMR is unreachable, stop and report: don't substitute a remembered text.

- [ ] **Step 2: Write the failing tests** in `letterText.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { SCROLL_TEXT, glyphs, layoutLines } from "./letterText";

describe("scroll text", () => {
  const all = glyphs(SCROLL_TEXT);
  const plain = all.map((g) => g.ch).join("");
  it("is capitals with no spaces, accents or final sigma", () => {
    expect(plain).toMatch(/^[Α-ΩϹ]+$/);
  });
  it("uses the lunate sigma only", () => {
    expect(plain).not.toMatch(/[Σσς]/);
    expect(plain).toContain("Ϲ");
  });
  it("opens Hebrews 1:1", () => {
    expect(plain.startsWith("ΠΟΛΥΜΕΡΩϹ")).toBe(true);
  });
  it("contracts θεός as an overlined ΘϹ", () => {
    const i = plain.indexOf("ΘϹ");
    expect(i).toBeGreaterThan(0);
    expect(all[i].over && all[i + 1].over).toBe(true);
  });
  it("only overlines nomina sacra", () => {
    expect(all.filter((g) => g.over).length).toBeLessThanOrEqual(6);
  });
});

describe("layoutLines", () => {
  it("fills each line to the width and keeps the text in order", () => {
    const lines = layoutLines(SCROLL_TEXT, 18);
    lines.slice(0, -1).forEach((l) => expect(l).toHaveLength(18));
    expect(lines.flat()).toEqual(glyphs(SCROLL_TEXT));
  });
});
```

- [ ] **Step 3: Run it to make sure it fails**

Run: `pnpm vitest run components/scenes/three/primitives/letterText.test.ts`
Expected: FAIL, with the module not found.

- [ ] **Step 4: Implement `letterText.ts`** with the exports above. `SCROLL_TEXT` is the Step 1 text: uppercased, accents and breathings removed, every sigma replaced with `Ϲ`, P46's nomina sacra wrapped in `{}`.

- [ ] **Step 5: Run the tests and make sure they pass**

Run: `pnpm vitest run components/scenes/three/primitives/letterText.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 6: Commit**

```bash
git add docs/superpowers components/scenes/three/primitives/letterText*
git commit   # message: the P46 source URL and any differences from SBLGNT
```

---

### Task 2: Motion curves

**Files:**
- Create: `components/scenes/three/primitives/letterMotion.ts`
- Test: `components/scenes/three/primitives/letterMotion.test.ts`

**Interfaces:**
- Produces:
  - `const WRITE_START = 1.6`, `const WRITE_END = 8` (seconds)
  - `function lineReveal(t: number, line: number, count: number): number`: 0–1 progress of one line's ink. Lines run in sequence between `WRITE_START` and `WRITE_END`, each easing (`easeInOutCubic` from `Timeline.ts`).
  - `function flicker(t: number): { power: number; dx: number; dy: number }`: summed value noise (at least 3 octaves) for the flame. `power` is within [0.78, 1.12], and `dx` and `dy` are within ±0.012 (scene units).
  - `function cameraSettle(t: number): number`: 0→1 over 0–3.2 s with `easeOutCubic`.

- [ ] **Step 1: Write the failing tests**

```ts
import { describe, expect, it } from "vitest";
import { WRITE_END, flicker, lineReveal, cameraSettle } from "./letterMotion";

describe("lineReveal", () => {
  it("is blank before writing and complete at the hold", () => {
    expect(lineReveal(0, 0, 5)).toBe(0);
    for (let i = 0; i < 5; i++) expect(lineReveal(WRITE_END, i, 5)).toBe(1);
    expect(lineReveal(10, 4, 5)).toBe(1);
  });
  it("writes lines in order", () => {
    const t = 4;
    expect(lineReveal(t, 0, 5)).toBeGreaterThanOrEqual(lineReveal(t, 1, 5));
    expect(lineReveal(t, 1, 5)).toBeGreaterThanOrEqual(lineReveal(t, 4, 5));
  });
  it("never moves backwards", () => {
    let last = 0;
    for (let t = 0; t <= 9; t += 0.05) {
      const v = lineReveal(t, 2, 5);
      expect(v).toBeGreaterThanOrEqual(last);
      last = v;
    }
  });
});

describe("flicker", () => {
  it("stays in range", () => {
    for (let t = 0; t < 60; t += 0.037) {
      const f = flicker(t);
      expect(f.power).toBeGreaterThanOrEqual(0.78);
      expect(f.power).toBeLessThanOrEqual(1.12);
      expect(Math.abs(f.dx)).toBeLessThanOrEqual(0.012);
      expect(Math.abs(f.dy)).toBeLessThanOrEqual(0.012);
    }
  });
  it("is deterministic and not a simple period", () => {
    expect(flicker(3.3)).toEqual(flicker(3.3));
    const a = [1, 2, 3].map((k) => flicker(k * 1.0).power);
    expect(new Set(a.map((v) => v.toFixed(4))).size).toBe(3);
  });
});

describe("cameraSettle", () => {
  it("settles by 3.2 s", () => {
    expect(cameraSettle(0)).toBe(0);
    expect(cameraSettle(3.2)).toBe(1);
  });
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `pnpm vitest run components/scenes/three/primitives/letterMotion.test.ts`
Expected: FAIL, with the module not found.

- [ ] **Step 3: Implement `letterMotion.ts`.** For the flicker, use smooth 1D value noise (hash the integer lattice, smoothstep between points) at about 1.3, 3.1 and 7.7 Hz with falling weights, then map to the ranges above. No `Math.random`.

- [ ] **Step 4: Run the tests and make sure they pass**

Run: `pnpm vitest run components/scenes/three/primitives/letterMotion.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

---

### Task 3: Procedural textures

**Files:**
- Create: `components/scenes/three/primitives/letterArt.ts`

**Interfaces:**
- Consumes: `Glyph`, `layoutLines`, `SCROLL_TEXT` (Task 1).
- Produces:
  - `function papyrusMaps(w: number, h: number, seed: number): { color: HTMLCanvasElement; bump: HTMLCanvasElement }`
  - `async function inkMap(w: number, h: number, lines: Glyph[][]): Promise<{ canvas: HTMLCanvasElement; bands: [number, number][] }>`. `bands` is each line's `[vTop, vBottom]` in UV space, for the reveal.
  - `function woodMaps(w: number, h: number): { color: HTMLCanvasElement; rough: HTMLCanvasElement }`
  - `function clayMap(w: number, h: number): HTMLCanvasElement`
  - `function contactShadow(size: number): HTMLCanvasElement`: a radial soft dark falloff.
  - Texture sizes are fixed by the caller: papyrus 2048×1024 on desktop, 1024×512 on mobile.

These are visual. Their test is the stills in Task 6, so this task has no unit test. Keep them pure canvas 2D, in the style of `inkArt.ts` and `clothArt.ts`.

- [ ] **Step 1: Papyrus.**
  - Colour: a base of warm ochre (`#d4bb8a` to `#c7a96f`), with dense horizontal fibre strokes (long and thin, 1–3 px, varied lightness).
  - Under that, a fainter vertical fibre layer, where the strip joins show.
  - Edges about 8% darker, with a ragged alpha on the top and bottom edges.
  - A few darker age spots.
  - The bump map is the same strokes drawn in greyscale, so grazing light picks out the fibres.

- [ ] **Step 2: Ink.**
  - Wait for the face: `await document.fonts.load('48px "EB Garamond"', "ΠΟΛΥϹ")`, then read the family from the computed `--font-eb-garamond`.
  - Draw each glyph separately in dark iron-gall brown (`#2a1a0e`) with:
    - per-glyph jitter of ±1.5 % size and ±0.6° rotation;
    - opacity 0.82–0.95;
    - a 0.6 px blur pass under it for bleed.
  - Overlined glyphs get a stroke above the cap height, spanning the contracted pair.
  - If `measureText("Ϲ").width` is 0 or equals the width of the notdef glyph, draw `Ϲ` as an open arc instead.
  - Line height is 1.45 em. Return the `bands`.

- [ ] **Step 3: Wood, clay and contact shadow.**
  - Wood: olive wood, dark (`#2a1d12` to `#3b2a1a`), with wavy grain from stretched noise and a roughness map from the same noise.
  - Clay: fired orange-buff (`#a7623a` to `#8d4f2d`) with mottling. The nozzle-tip soot is drawn by the mesh, not here.

- [ ] **Step 4: Typecheck and lint**

Run: `pnpm typecheck && pnpm lint:check`
Expected: no errors.

- [ ] **Step 5: Commit**

---

### Task 4: Scene primitives

**Files:**
- Create: `components/scenes/three/primitives/Letter.tsx`

**Interfaces:**
- Consumes:
  - `papyrusMaps`, `inkMap`, `woodMaps`, `clayMap`, `contactShadow` (Task 3);
  - `layoutLines`, `SCROLL_TEXT` (Task 1);
  - `touch` and `setUniform` from `mutate.ts`.
- Produces:
  - `const LETTER` (layout constants):
    - `TABLE_Y = 0`
    - `SCROLL = { width: 3.2, height: 1.15, z: -0.4 }`
    - `ROLL_RADIUS = 0.11`
    - `LAMP = { x: 2.15, z: -0.1 }`
    - `PER_LINE = 22`
    - `FLAME_TIP: [number, number, number]` (the world position of the nozzle flame)
  - `function Papyrus(props: { mobile: boolean; revealRef: RefObject<number[]>; shadows: boolean }): JSX.Element`
    - A `PlaneGeometry` with at least 96×32 segments, displaced into a slight sag plus a lift into each roll.
    - `MeshStandardMaterial` using map, bumpMap (bumpScale about 0.6), roughness 0.85 and metalness 0.
    - Ink is blended in through `onBeforeCompile`: a sampler `uInk` and a `uniform float uReveal[12]` (1:1–2 is about 170 letters, so up to 8 lines at 22 per line). A texel in line `i`'s band shows when its `u` is below `uReveal[i]`, with a 0.004 soft edge. This is a mask, not an opacity fade.
  - `function ScrollRoll(props: { side: -1 | 1; shadows: boolean }): JSX.Element`: a cylinder of papyrus material, with end caps carrying a spiral drawn on a small canvas.
  - `function HerodianLamp(props: { shadows: boolean }): JSX.Element`
    - The body is a `LatheGeometry`: a round, slightly squat bowl with a wide shallow filling hole.
    - The nozzle is a separate mesh: a short tube flaring to a spatula tip with knife-pared flat sides, and soot on the tip (vertex colour or a small decal).
  - `function Flame(props: { flickerRef: RefObject<{ power: number; dx: number; dy: number }> }): JSX.Element`
    - A camera-facing quad with a teardrop shader: noise-wobbled edge, white-gold core shading to ember red, emissive above the bloom threshold.
    - A small additive halo sprite.
  - `function Table(props: { mobile: boolean }): JSX.Element`: a large plane in wood maps that receives shadows.
  - `function ContactShadows(): JSX.Element`: multiply-blended planes under each roll and the lamp, used when shadows are off.

- [ ] **Step 1: Implement `Table` and `HerodianLamp`, and view them in isolation.** Temporarily point `HeroHomeScene` at them with a plain point light, run `pnpm dev`, and open `http://localhost:3000/?scenetest&gpu=3`. Check the lamp reads as a Herodian lamp from the scene camera angle: round body, flared spatula nozzle.
- [ ] **Step 2: Implement `Papyrus`, `ScrollRoll` and `ContactShadows`, and view them.** Drive `revealRef` to all-ones and check the fibres catch the light, the Greek reads, and the overline and `Ϲ` render.
- [ ] **Step 3: Implement `Flame`, and view it** with bloom on (`gpu=3`).
- [ ] **Step 4: Typecheck and lint**

Run: `pnpm typecheck && pnpm lint:check`
Expected: no errors.

- [ ] **Step 5: Commit**

---

### Task 5: Compose the scene and retire Jerusalem

**Files:**
- Modify: `components/scenes/three/scenes/HeroHomeScene.tsx` (full rewrite)
- Delete: `components/scenes/three/primitives/Jerusalem.tsx`
- Modify:
  - `components/home/HomeStage.tsx` (docblock)
  - `components/home/home.module.css` (`.scrim`)
  - `e2e/tools/scene-stills.mjs` (the `heroHome` comment)
- Test: `e2e/home-quiz.spec.ts` (existing, unchanged)

**Interfaces:**
- Consumes:
  - all of Task 4;
  - `lineReveal`, `flicker`, `cameraSettle`, `WRITE_END` (Task 2);
  - `useSceneTime` and `STILL` (`Timeline.ts`);
  - `setLens` and `useResetCameraOnUnmount`;
  - `SceneEffects`.
- Produces: `HeroHomeScene({ mobile, effects, pointer }: SceneProps)`, still registered as `heroHome`.

- [ ] **Step 1: Write `HeroHomeScene`.**
  - **Time.** With `STILL`, use `t = time + 10` so the still is the hold.
  - **Writing.** Fill `revealRef.current[i] = lineReveal(t, i, lines)`.
  - **Light:**
    - Apply `flicker(t)` to the flame and to one `pointLight` at `FLAME_TIP` (warm `#ffb766`, base intensity tuned so the papyrus is lit and the table falls dark by the frame edges, decay 2).
    - Add a faint `hemisphereLight` (sky `#1b2233`, ground `#120c07`, intensity about 0.08).
  - **Shadows.**
    - When `effects`, enable `gl.shadowMap` (PCFSoft) in an effect and restore it on unmount. The point light, rolls, lamp and papyrus cast; the table and papyrus receive. Map size is 1024.
    - Otherwise render `ContactShadows`.
  - **Camera:**
    - Low and looking slightly down, easing from about 0.35 units higher by `cameraSettle(t)`.
    - Pointer parallax ±0.15.
    - Desktop: the scroll spans about 70% of the width in the upper half, the lamp at right, and the lower 45% of the frame dark table.
    - Mobile (`setLens` with a taller FOV): the right part of the scroll and the lamp, at least 3 lines visible above the title.
    - Read `mobile` every frame.
  - **Effects:** `effects && <SceneEffects bloom={0.55} threshold={0.7} vignette={0.55} />`, tuned visually.

- [ ] **Step 2: Delete `Jerusalem.tsx`**, then confirm nothing imports it.

Run: `grep -rn "Jerusalem" components app e2e lib content`
Expected: no matches.

- [ ] **Step 3: Retune `.scrim`.** Replace the comment and gradient with a light bottom-only darkening. Keep it only if the live scene needs it for parchment-on-dark contrast at 375 px and 1440 px. Update the `HomeStage` docblock to "the letter by lamplight", and change the `scene-stills.mjs` comment to match.

- [ ] **Step 4: Verify**

Run: `pnpm typecheck && pnpm lint:check && pnpm test`
Expected: all pass. `stills.test.ts` still passes, since the files exist.

Run: `pnpm build && pnpm test:e2e:prod e2e/home-quiz.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

---

### Task 6: Stills, visual QA and the owner checkpoint

**Files:**
- Modify: `public/scenes/heroHome.webp`, `public/scenes/mobile/heroHome.webp` (regenerated)

- [ ] **Step 1: Render the stills on the real GPU**

Run: `pnpm dev` (port 3000, one server), then `node e2e/tools/scene-stills.mjs heroHome`
Expected: both webp files rewritten. Rerun if the scene times out.

- [ ] **Step 2: Compare.**
  - Convert to PNG and view the new stills beside `heroSanctuary`, `heroCoast` and `heroCloth`.
  - Check against the spec's anti-goals:
    - no flat-looking geometry;
    - the Greek is legible and correct against Task 1's text;
    - the overline and `Ϲ` are right;
    - the lamp reads as Herodian;
    - the bottom of the frame is dark;
    - there's no figure.
  - Fix and rerun until all pass.

- [ ] **Step 3: Live checks.**
  - Run `node e2e/tools/mobile-shots.mjs` and `node e2e/tools/sim-check.mjs 5 <scratch>/sim` for the phone and the simulator.
  - Shoot the home page at 375 px and 1440 px with the live scene, and at `gpu=1` (no shadow maps).
  - Check that the title and verse read clearly, and that the flicker isn't a visible loop.

- [ ] **Step 4: Owner checkpoint.** Show the owner the desktop and mobile stills plus a short clip (`e2e/tools/clips.mjs` or a screen recording), and ask for approval. Apply their feedback, then repeat Steps 1–3. Don't continue until they approve.

- [ ] **Step 5: Full regression**

Run: `pnpm test && pnpm typecheck && pnpm lint:check && pnpm build && pnpm test:e2e:prod`
Expected: all pass. Report any flaky 3D spec failures with their output rather than skipping them.

- [ ] **Step 6: Commit and push the branch**

```bash
git add public/scenes/heroHome.webp public/scenes/mobile/heroHome.webp
git commit
git push
```
