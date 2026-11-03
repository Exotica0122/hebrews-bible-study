# Home scene: the letter by lamplight

**Date:** 2026-11-03
**Branch:** `claude/adoring-cori-qj5jem`, which already holds the home page, the quiz and the scene this one replaces

## Why

The home page at `/` is the front door to both the chapters and the quiz. Its current hero, Jerusalem at dawn (`heroHome`, built from `primitives/Jerusalem.tsx`), doesn't match the chapter heroes:

- It's made of plain 3D boxes in a sandy haze, with no material and no single idea.
- It has no dark ground for the pale title, so it needs a heavy scrim.
- It uses Zion and city imagery that chapters 12–13 will want.

The owner chose to replace it with **the letter by lamplight**. Hebrews was a letter read aloud to a house church, so the front door shows the very thing the visitor is about to study. The owner's one condition: **the finished scene must match the quality of the existing chapter heroes.** The flat vector sketch used to pick the direction is not the bar.

## The scene

A dark olive-wood table at night, seen from a low camera.

- **The papyrus.** An open scroll lies across the upper part of the frame. It's a real curved sheet, not a flat card: slight sag, a gentle lift where it leaves each roll, ragged and slightly darker edges. You can see the crossed fibres, horizontal on the writing side with the vertical layer faintly showing through. Colour varies along the sheet. Lamplight grazes the fibres, so the surface needs relief (a normal or bump map from the same procedural source), not just a coloured texture.
- **The rolls.** Each end is rolled up, and the spiral of the roll shows on the end faces.
- **The writing.** The Greek of Hebrews 1:1–2, in capitals with no spaces between words and no accents, as the early copies were written. It reads as reed-pen ink on fibre: uneven darkness and slight irregularity from letter to letter, not crisp type. It's set in columns or lines like a real roll, not centred.
- **The lamp.** A small clay Herodian oil lamp sits to the right. This is the common 1st-century type, contemporary with the letter (the builder's call, settled at review). It has a wheel-made round body, a wide filling hole, and a separately attached nozzle pared with a knife into a flared, spatula-like shape, with soot at its tip, where the flame sits. It's fired clay, matte with slight variation.
- **The light.** The flame is the scene's only real light, apart from a faint cool fill so the shadows aren't pure black. It warms the papyrus, casts soft shadows from the rolls, and lets the table fall off into darkness toward the edges and bottom of the frame. That darkness is the ground for the title. No sky, haze or daylight.
- **No other objects.** No pen, inkpot or hand, and no figures of any kind (see the owner's imagery rules below).

**Treatment.** Semi-realistic lit 3D: real materials, a real light and soft shadows, kept restrained and warm like `heroSanctuary`. It is not a painterly or palette-mapped canvas treatment like `heroCoast` or `heroCloth`. The owner approved a scene "built and lit in 3D". No current scene casts shadows, so shadow casting is new. Use it on high tiers. On low tiers, fake the shadows (contact-shadow textures under the rolls and lamp) rather than lose them.

## Motion

1. **Arrival.** The camera eases down and settles over a few seconds.
2. **Writing.** The lines of Greek ink themselves in one at a time, left to right, as if being written. This is a reveal mask moving along each line, not a fade of the whole line.
3. **Hold.** Everything holds. The flame keeps breathing: the flicker is noise-driven, not a regular sine wave, and the light's intensity and position move with it, so the shadows and the warm pool on the papyrus sway slightly.

There's a small pointer parallax, as in the other heroes. The scene follows the existing timeline helpers (`useSceneTime`, `STILL`), so the still lands on the hold with all the writing in.

## Framing

- **Desktop.** The scroll spans most of the width in the upper half, with the lamp to its right. The lower part of the frame is dark table under the title, eyebrow and verse.
- **Phone.** A taller, closer framing: the right part of the scroll and the lamp, so the flame and at least two or three lines of writing are in view above the title. Lighter geometry and texture sizes, using the scene budget and GPU tier hooks the other scenes use.

## Fallbacks

These stay as they are. Reduced motion, loading and no-WebGL all show the pre-rendered still (`public/scenes/heroHome.webp` and `public/scenes/mobile/heroHome.webp`), regenerated from the new scene at its hold.

## Fitting into the code

- Keep the scene id `heroHome`, so `HomeStage`, `SceneStill`, the registry entry and the stills tooling stay wired.
- Replace `HeroHomeScene.tsx`. Delete `primitives/Jerusalem.tsx` once nothing uses it.
- Retune or remove the home hero scrim in `home.module.css`. Its comment and gradient exist because the old scene was daylit. The new scene supplies its own dark ground, so the scrim should only be as strong as the title's contrast needs.
- Update the docblocks and comments that describe Jerusalem: `HomeStage`, and the commit trail and README if they mention it.

## Text sources

The Greek is Hebrews 1:1–2 written the way the early scribes wrote it. The owner chose this on 2026-11-03.

- **Model.** Follow P46, the earliest surviving copy of Hebrews (about AD 200), which begins Hebrews at 1:1.
- **Source.** Take the text from a published transcription of P46, such as the Münster NTVMR transcription, and check it against SBLGNT or NA28 for 1:1–2. Don't write it from memory. Where P46's wording differs from the critical text, follow P46 and note the difference in the commit message.
- **Conventions:**
  - capitals with no spaces, accents or breathing marks;
  - the C-shaped (lunate) sigma Ϲ;
  - sacred names contracted with a line over them, as P46 has them (at least ΘϹ for θεός in 1:1), with no other contractions invented;
  - lines that break mid-word with no hyphen.
- **Drawing it.** The font has to render Ϲ and the overline cleanly. If it can't, draw them.
- **No heading.** There's no title such as ΠΡΟϹ ΕΒΡΑΙΟΥϹ: the scroll is shown mid-roll at 1:1.
- **Amount.** Show as much of 1:1–2 as fits legibly. It's fine if the text runs off a roll edge, as long as what shows is in order and correct.
- **Reveal.** The ink-in runs line by line along these real line breaks.

## Owner's rules that apply (from earlier sessions)

- **Imagery.** No figures or human outlines of any kind, and no stained-glass or icon styles. Christ is shown only as light, and this scene doesn't show him at all.
- **Text ground.** The site's hero type is pale parchment, so the title must sit on a dark ground. Check this in real renders, not just in a sketch.
- **Checking the hold.** Check the scene at its hold with `e2e/tools/scene-stills.mjs`. `chapter-shots.mjs` beats can land mid-motion.
- **Real GPU.** Sign off on real-GPU shots with the post-processing on, never SwiftShader shots alone.

## Quality bar and sign-off

The scene is done when:

1. Stills on the real GPU, desktop and mobile, sit comfortably beside `heroSanctuary`, `heroCoast` and `heroCloth`: considered material, controlled light, one clear subject, no default-looking geometry or lighting.
2. The title and verse read clearly at desktop and phone widths with the live scene running.
3. The owner has seen the desktop and mobile stills, and a short clip or the live page, and approved them before the PR goes up. Expect at least one round of look-and-adjust. Build in a point to show stills before the final polish.
4. The flame flicker and writing animation run smoothly on a mid-range phone. Use `e2e/tools/sim-check.mjs` and the iOS Simulator where useful, but a real phone check stays on the owner's list.
5. Existing tests pass, and the home e2e spec still passes.

## Goals

- A home hero that's clearly the same family as the chapter heroes, and as good.
- One clear image: the letter itself.

## Non-goals

- Quiz changes. The owner wants the quiz refined too, but that's a separate piece after this.
- Home page layout or copy changes beyond the scrim.

## Anti-goals (a failure even if it works)

- Anything that looks like the sketch: flat shapes, a rectangle for the papyrus, a blob for a lamp, CSS-style gradients.
- Daylight, haze or a pale scene that needs a heavy scrim.
- Decorative or faux-Greek lettering, or text with errors.
- Any figure, hand or silhouette.

## Left to the builder

Mesh construction, how the procedural textures are made (canvas, as in `inkArt.ts`/`clothArt.ts`, or shaders), the ink-reveal technique, the flicker model, shadow approach per GPU tier, exact camera numbers, post-processing values through `SceneEffects`, and the still timestamp in `scene-stills.mjs`.
