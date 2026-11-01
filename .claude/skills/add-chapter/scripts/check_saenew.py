"""Compare a chapter's Korean verses and cross-reference chips with bskorea.or.kr.

Usage: check_saenew.py <chapter>
Verses must match exactly. A chip may quote part of its verses, and is found from its reference
label, e.g. "Exod 24:8" or "Gen 12:2-3". Pieces split by an ellipsis are checked in order, spaces
and quote marks are ignored, and a chip may not end on an opening quote mark. Exits 1 on any difference.
"""
import os, re, sys

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(__file__))
from saenew import fetch

STR = r'"((?:[^"\\]|\\.)*)"'


BOOKS = {
    "Gen": "gen", "Exod": "exo", "Lev": "lev", "Num": "num", "Deut": "deu", "Josh": "jos",
    "1 Sam": "1sa", "2 Sam": "2sa", "1 Kgs": "1ki", "2 Kgs": "2ki", "1 Chr": "1ch", "2 Chr": "2ch",
    "Ps": "psa", "Isa": "isa", "Jer": "jer", "Hab": "hab", "Matt": "mat", "Luke": "luk",
    "John": "jhn", "Acts": "act", "Rom": "rom", "1 Cor": "1co", "2 Cor": "2co", "Gal": "gal",
    "Phil": "php", "Col": "col", "Heb": "heb", "1 Pet": "1pe", "Rev": "rev",
}


def norm(t):
    t = re.sub(r"\[\w+\|([^\]]*)\]", r"\1", t).replace('\\"', '"')
    for a, b in (("“", '"'), ("”", '"'), ("‘", "'"), ("’", "'")):
        t = t.replace(a, b)
    return re.sub(r"\s+", " ", t).strip().strip('"')


def bare(t):
    return re.sub(r"[\s\"']+", "", norm(t))


chapter = int(sys.argv[1])
src = open(f"content/hebrews/{chapter}.ts", encoding="utf8").read()
site = fetch("heb", chapter)
checked, bad = 0, 0


def compare(label, ours, theirs, partial=False):
    global checked, bad
    checked += 1
    if partial:
        site, at, same = bare(theirs or ""), 0, True
        for piece in filter(bare, re.split(r"…|\.\.\.", ours)):
            found = site.find(bare(piece), at)
            same, at = same and found >= 0, max(at, found)
    else:
        same = norm(ours) == norm(theirs or "")
    if not same:
        bad += 1
        print(f"DIFF {label}\n  ours: {norm(ours)}\n  site: {theirs}")


for block in re.split(r"\n    ko: \{", src)[1:]:
    body = block.split("com: [")[0]
    for n, text in re.findall(r"\[\s*(\d+),\s*" + STR + r"\s*,?\s*\]", body):
        compare(f"heb {chapter}:{n}", text, site.get(int(n)))

cache = {}


def site_chapter(book, chap):
    return cache.setdefault((book, chap), fetch(book, chap))


skipped = []
for label, tko in re.findall(r'\ben: ' + STR + r',\s*ko: "[^"]*",\s*ten:.*?tko:\s*' + STR, src, re.S):
    m = re.fullmatch(r"(.+?) (\d+):(\d+)(?:[–-](\d+))?", label)
    if not m or m.group(1) not in BOOKS:
        skipped.append(label)
        continue
    book, chap, first, last = BOOKS[m.group(1)], m.group(2), int(m.group(3)), int(m.group(4) or m.group(3))
    verses = site_chapter(book, chap)
    compare(label, tko, " ".join(verses.get(v) or "" for v in range(first, last + 1)), partial=True)
    if tko.rstrip().endswith("“"):
        bad += 1
        print(f"QUOTE {label} ends on an opening mark")

print(f"{checked} checked, {bad} different" + (f", skipped {skipped}" if skipped else ""))
sys.exit(1 if bad else 0)
