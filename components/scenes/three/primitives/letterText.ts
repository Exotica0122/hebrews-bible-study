/** Hebrews 1:1–2 as P46 has it (first hand, INTF NTVMR transcription, CC BY 4.0). "|" is the scribe's line break, braces an overlined nomen sacrum. */
export const SCROLL_TEXT =
  "ΠΟΛΥΜΕΡΩϹΚΑΙΠΟΛΥΤΡΟΠΩϹ|" +
  "ΠΑΛΑΙΟ{ΘϹ}ΛΑΛΗϹΑϹΤΟΙϹΠΑΤΡΑϹΙΝΕΝ|" +
  "ΤΟΙϹΠΡΟΦΗΤΑΙϹΕΠΕϹΧΑΤΟΥΤΩΝΗΜΕ|" +
  "ΡΩΝΤΟΥΤΩΝΕΛΑΛΗϹΕΝΗΜΕΙΝΕΝ|" +
  "ΥΙΩΟΝΕΘΗΚΕΝΚΛΗΡΟΝΟΜΟΝΠΑΝΤΩΝ|" +
  "ΔΙΟΥΕΠΟΙΗϹΕΝΤΟΥϹΑΙΩΝΑϹ";

export interface Glyph {
  ch: string;
  over: boolean;
}

function parse(line: string): Glyph[] {
  const out: Glyph[] = [];
  let over = false;
  for (const ch of line) {
    if (ch === "{") over = true;
    else if (ch === "}") over = false;
    else out.push({ ch, over });
  }
  return out;
}

export function lines(text: string): Glyph[][] {
  return text.split("|").map(parse);
}

export function glyphs(text: string): Glyph[] {
  return lines(text).flat();
}
