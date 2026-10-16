---
name: add-chapter
description: Build the next Hebrews chapter study from the teacher's research notes and the user's own notes, including its own visual theme, 3D scenes, CSS fallbacks, bilingual content and tests. Use when asked to "make chapter N", add a chapter, or turn study notes into a chapter page.
---

# Adding a Hebrews chapter

Each chapter is its own visual world. Chapter 1 is set in the heavens, chapter 2 on a night road through the hills, and chapter 3 in the wilderness camp at dusk. **Never reuse an earlier chapter's setting.** Choose a new one that comes from the chapter's own imagery.

The setting is only the start. The whole look of the chapter (style, mood, palette, lighting, rendering approach) should come from what the chapter says, and it can be redesigned from scratch. Earlier chapters show how scenes are wired in, not a look to copy.

## 1. Read both sets of notes

The user supplies two `.docx` files: the teacher's research and their own notes. Convert them with `textutil -convert txt -output <scratch>/x.txt <file>` (pandoc is not installed). Use **both** in the commentary, word studies, cross-references and summary. The research gives definitions and background; the user's notes add emphases the class discussed (e.g. 공동체, "Paul vs Hebrews"). Keep the notes' interpretation and don't invent theology.

## 2. Source every 새번역 quotation from bskorea.or.kr

```bash
python3 .claude/skills/add-chapter/scripts/saenew.py heb 4        # whole chapter
python3 .claude/skills/add-chapter/scripts/saenew.py psa 95 7-11  # a range
```

Book codes follow the site (heb, psa, num, exo, 1pe, 1co, ...). This covers the chapter's verses, cross-reference chips (`tko`) and quotations inside commentary. Never write 새번역 from memory. ESV comes from the user's notes or the known ESV text.

## 3. Design the chapter's theme

Start from the chapter's own description: its summary, its key images and the mood of the text (warning, comfort, awe, rest, judgement). Let that drive every visual choice. Ask what this chapter should feel like, not how the last chapter looked.

Open to redesign each chapter:

- **Visual style.** The earlier chapters share one language: dark skies, layered hill silhouettes, additive glows and embers, bloom. A chapter can drop it for something that suits its text better, such as daylight, lit 3D forms, line work, an illuminated-manuscript look, stained glass or paper cut-outs.
- **Palette and lighting.** Pick these fresh. Don't default to a dark sky with a warm horizon band.
- **Composition, camera and motion.** Framing, camera moves, pacing, how the event unfolds.
- **Materials, post effects and the CSS fallback look.**
- **New primitives.** Write new ones when the style needs them. Reuse the existing ones (`Sky`, `Hills`, `Glow`, `Embers`, ...) only where they genuinely fit.

Fixed, because the page depends on them:

- **Setting name.** Add it to `Setting` in `content/types.ts`.
- **Palette constants.** Export them from the chapter's own primitives file.
- **Hero scene.** Add a new `hero<Name>` scene id. Map the setting to it and its CSS backdrop in `STAGES` (`components/hero/Hero.tsx`), and to an art note in `HERO_ART` (`components/ChapterPage.tsx`).
- **One scene per movement**, each a concrete image from that passage rather than an abstract metaphor the text doesn't use.
- **Legibility.** The hero title and the movement captions overlay the scene, so they must stay readable on it.

Tell the user the theme and the visual style you chose and why, in two or three lines. If the style breaks sharply from earlier chapters, check with the user before building all the scenes.

## 4. Content

Write `content/hebrews/<n>.ts` in the shape of the existing chapters: movements with en/ko copy, `[key|text]` word marks whose keys match across both languages, word studies with the Greek, chips, summary, `copy`, and `setting`. Register it in `content/hebrews/index.ts`.

## 5. Scenes and fallbacks

- R3F scene per movement in `components/scenes/three/scenes/`, registered in `registry.ts`, with ids in both `SceneId` unions.
- A static CSS twin per scene in `components/scenes/fallback/CssScene.tsx` + `css.module.css`. Reduced motion and no-WebGL users see only this, so it must read on its own. Group the chapter's scene ids in their own list so the heavens starfield isn't drawn behind them.
- Loops of 14–18 s: fade in, the event, a hold, then fade out. Mutate memoised three.js objects through `primitives/mutate.ts` (React Compiler lint).

## 6. Tests and docs

Update `content/hebrews/index.test.ts` (live count, latest chapter, verse coverage), `e2e/structure.spec.ts` (a render test for the new chapter), `e2e/interactions.spec.ts` (coming-soon routes shift to the next chapter) and the README's live-chapters line.

## 7. Verify

Reuse the user's dev server on :3000. Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, then screenshot each scene at several points in its loop under SwiftShader (`e2e/tools/scene-shots.mjs` is the pattern) and look at them. Put them next to the previous chapter's shots: if the new chapter reads like the old one with different colours, rework the style. Finish with `pnpm exec playwright test`.
