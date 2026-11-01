---
name: add-chapter
description: Build the next Hebrews chapter study from the teacher's research notes and the user's own notes, including its own visual theme, 3D scenes, rendered stills, bilingual content and tests. Use when asked to "make chapter N", add a chapter, or turn study notes into a chapter page.
---

# Adding a Hebrews chapter

Each chapter is its own visual world. Chapter 1 is set in the heavens, chapter 2 on a night road through the hills, and chapter 3 in the wilderness camp at dusk. **Never reuse an earlier chapter's setting.** Choose a new one that comes from the chapter's own imagery.

The setting is only the start. The whole look of the chapter (style, mood, palette, lighting, rendering approach) should come from what the chapter says, and it can be redesigned from scratch. Earlier chapters show how scenes are wired in, not a look to copy.

## 1. Read both sets of notes

The user supplies two `.docx` files: the teacher's research and their own notes. Convert them with `textutil -convert txt -output <scratch>/x.txt <file>` (pandoc is not installed). Use **both** in the commentary, word studies, cross-references and summary. The research gives definitions and background; the user's notes add emphases the class discussed (e.g. 공동체, "Paul vs Hebrews"). Keep the notes' interpretation and don't invent theology. That applies to word studies too: if a sentence links two verses and the notes don't, restate the verse instead.

If the session supplied images or an appendix, unzip the `.docx` and look at every picture. They are reference for our own scenes, not assets. The site is public and open source, so before embedding anything read each image's licence page, and treat an image with no listed source as unusable. The default is to model the piece ourselves and link to the original with credit, using the chapter's `appendix` field (see chapter 9).

## 2. Source every 새번역 quotation from bskorea.or.kr

```bash
python3 .claude/skills/add-chapter/scripts/saenew.py heb 4        # whole chapter
python3 .claude/skills/add-chapter/scripts/saenew.py psa 95 7-11  # a range
```

Book codes follow the site (heb, psa, num, exo, 1pe, 1co, ...). This covers the chapter's verses, cross-reference chips (`tko`) and quotations inside commentary. Never write 새번역 from memory. Give each chip an id of `<book><chapter>-<verse>` (e.g. `exo24-8`) so it can be checked, then run this once the chapter is written:

```bash
python3 .claude/skills/add-chapter/scripts/check_saenew.py 4
```

The chapter's ESV comes from the user's notes. Fetch cross-reference ESV and the word-study Greek from a source (biblegateway.com, biblehub.com/interlinear) and compare them, because the notes usually give neither. Never write either from memory.

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
- **Legibility.** The hero title and the movement captions overlay the scene, so they must stay readable on it. Panels are about 2:1 with the quote over the lower half, and the hero's title block is about 530 px tall. A quote can reach three lines on a phone, so compose for that instead of cropping the sketch to fit.

### Choose the direction with the user

Don't pick the style alone. Before writing any scene:

1. **Look at the earlier chapters first.** Convert their stills from `public/scenes` to PNG and look at them, including the movement scenes, not just the heroes. Each chapter's setting is only a word in `content/types.ts`, and that word doesn't tell you what's already been drawn.
2. **Publish a live artifact** with three directions that are different worlds, not palettes of one idea. Show them side by side on one clock: one sample large, two beside it, with a label to enlarge any of them. Give it a tab for the hero and each movement, a scrubber, and an EN/한국어 toggle with real titles and quotes from `saenew.py`. Add a tab for any appendix objects. Use the Hebrews 8 and 9 option artifacts as the starting point.
3. **Say which one you recommend and why**, with the real trade-off of each, then stop and wait for the user's choice.

Check the rendered page before publishing, then give the user the link.

## 4. Content

Write `content/hebrews/<n>.ts` in the shape of the existing chapters: movements with en/ko copy, `[key|text]` word marks whose keys match across both languages, word studies with the Greek, chips, summary, `copy`, and `setting`. Give `snips` one line per verse. Register it in `content/hebrews/index.ts`.

## 5. Scenes and fallbacks

- R3F scene per movement in `components/scenes/three/scenes/`, registered in `registry.ts`, with ids in both `SceneId` unions.
- A still per scene, rendered from the scene itself. Add the id and the second of its loop to catch (the hold, after the event) to `MOMENTS` in `e2e/tools/scene-stills.mjs`, add the chapter to `CHAPTERS`, then run `node e2e/tools/scene-stills.mjs <ids>` on the real GPU. Reduced-motion, loading and no-WebGL users see only this, so pick a moment that reads on its own, and rerun it whenever the scene changes.
- A scene can time out while rendering a still under load. Rerun only the ids that failed.
- Loops of 14–18 s: fade in, the event, a hold, then fade out. Mutate memoised three.js objects through `primitives/mutate.ts` (React Compiler lint).

## 6. Tests and docs

Update everything that names the latest chapter:

- `content/hebrews/index.test.ts`: live count, latest chapter, verse coverage, and the "not live" chapter.
- `content/search.test.ts` and `e2e/search.spec.ts`: both search for a verse in an unwritten chapter, and the spec also has the "Search Hebrews 1–N" label.
- `e2e/search-landing.spec.ts`: `CHAPTERS`.
- `e2e/structure.spec.ts`: a render test for the new chapter.
- `e2e/interactions.spec.ts`: coming-soon routes shift to the next chapter.
- The README's live-chapters line.

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

If you changed a shared primitive (`SceneEffects`, `Glow`, `Earth`, ...), shoot the earlier chapters again too.

### Check on iOS

Boot the iPhone simulator and run this against the dev server. It shoots the hero and every scene in real Safari, then checks real touch taps and sideways scrolling in Playwright WebKit:

```bash
node e2e/tools/sim-check.mjs 5 <scratch>/sim
```

Open every shot. This is the only check on WebKit's text wrapping and WebGL, and it found a caption sitting on the art that Chrome's phone emulation had not shown. Don't use `safaridriver` clicks or touch actions to test taps: they don't land on iOS 26.5, even on controls that work. Nothing here measures a real phone's heat, battery or GPU speed, so say so in the PR.

### Finish

Run `pnpm exec playwright test` last. Read its pass and fail counts from a file instead of piping it to `tail`, because a pipe reports `tail`'s exit code and hides failures:

```bash
pnpm exec playwright test --reporter=line > <scratch>/pw.txt 2>&1; echo "exit $?"; tail -5 <scratch>/pw.txt
```

Judge a failure on a production build before calling it a site bug: dev-server load causes timing failures. List anything you couldn't verify in the PR's "Needs review" checklist.
