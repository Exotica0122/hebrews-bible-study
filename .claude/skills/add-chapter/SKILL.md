---
name: add-chapter
description: Build the next Hebrews chapter study from the teacher's research notes and the user's own notes, including its own visual theme, 3D scenes, rendered stills, bilingual content and tests. Use when asked to "make chapter N", add a chapter, or turn study notes into a chapter page.
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
- **Materials and post effects.**
- **New primitives.** Write new ones when the style needs them. Reuse the existing ones (`Sky`, `Hills`, `Glow`, `Embers`, ...) only where they genuinely fit.

Fixed, because the page depends on them:

- **Setting name.** Add it to `Setting` in `content/types.ts`.
- **Palette constants.** Export them from the chapter's own primitives file.
- **Hero scene.** Add a new `hero<Name>` scene id. Map the setting to it in `STAGES` (`components/hero/Hero.tsx`), and to an art note in `HERO_ART` (`components/ChapterPage.tsx`).
- **One scene per movement**, each a concrete image from that passage rather than an abstract metaphor the text doesn't use.
- **Legibility.** The hero title and the movement captions overlay the scene, so they must stay readable on it.

Tell the user the theme and the visual style you chose and why, in two or three lines. If the style breaks sharply from earlier chapters, check with the user before building all the scenes.

## 4. Content

Write `content/hebrews/<n>.ts` in the shape of the existing chapters: movements with en/ko copy, `[key|text]` word marks whose keys match across both languages, word studies with the Greek, chips, summary, `copy`, and `setting`. Register it in `content/hebrews/index.ts`.

## 5. Scenes and fallbacks

- R3F scene per movement in `components/scenes/three/scenes/`, registered in `registry.ts`, with ids in both `SceneId` unions.
- A still per scene, rendered from the scene itself. Add the id and the second of its loop to catch (the hold, after the event) to `MOMENTS` in `e2e/tools/scene-stills.mjs`, add the chapter to `CHAPTERS`, then run `node e2e/tools/scene-stills.mjs <ids>` on the real GPU. Reduced-motion, loading and no-WebGL users see only this, so pick a moment that reads on its own, and rerun it whenever the scene changes.
- Loops of 14–18 s: fade in, the event, a hold, then fade out. Mutate memoised three.js objects through `primitives/mutate.ts` (React Compiler lint).

## 6. Tests and docs

Update `content/hebrews/index.test.ts` (live count, latest chapter, verse coverage), `e2e/structure.spec.ts` (a render test for the new chapter), `e2e/interactions.spec.ts` (coming-soon routes shift to the next chapter) and the README's live-chapters line.

## 7. Verify

Reuse the user's dev server on :3000. Run `pnpm typecheck`, `pnpm lint`, `pnpm format` and `pnpm test`, then shoot the chapter:

```bash
node e2e/tools/chapter-shots.mjs 5 <scratch>/shots
```

It opens real Chrome on the GPU, so the post-processing stack is on as visitors see it, and it shoots the hero and every scene at several points in its loop, the reduced-motion stills and mobile. `--swiftshader` runs without a GPU, but that turns effects off and hides bugs in them (a missing depth buffer once erased every solid object), so never sign off on SwiftShader shots alone. Open every shot and check:

- **Each scene shows what its `art` note promises.** List the objects (the cup, the bread, the crown) and find each one in the shots. Something missing usually means draw order or depth, not the camera.
- **The event reads across the loop**: fade in, the event, the hold, the fade out.
- **Captions and the hero title stay legible**, on desktop and on mobile.
- **The stills read on their own** and don't clutter the hero title at mobile width.
- **The theme is new.** Put the shots next to the previous chapter's: if it reads like the old one with different colours, rework the style.

If you changed a shared primitive (`SceneEffects`, `Glow`, `Earth`, ...), shoot the earlier chapters again too. Finish with `pnpm exec playwright test`.
