"""Compare a chapter's Korean verses and cross-reference chips with bskorea.or.kr.

Usage: check_saenew.py <chapter>
Verses must match exactly. A chip may quote part of its verse, and is checked when its id is
<book><chapter>-<verse>, e.g. exo24-8. Exits 1 on any difference.
"""
import os, re, sys

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(__file__))
from saenew import fetch

STR = r'"((?:[^"\\]|\\.)*)"'


def norm(t):
    t = re.sub(r"\[\w+\|([^\]]*)\]", r"\1", t).replace('\\"', '"')
    for a, b in (("“", '"'), ("”", '"'), ("‘", "'"), ("’", "'")):
        t = t.replace(a, b)
    return re.sub(r"\s+", " ", t).strip().strip('"')


chapter = int(sys.argv[1])
src = open(f"content/hebrews/{chapter}.ts", encoding="utf8").read()
site = fetch("heb", chapter)
checked, bad = 0, 0


def compare(label, ours, theirs, partial=False):
    global checked, bad
    checked += 1
    same = norm(ours) in norm(theirs or "") if partial else norm(ours) == norm(theirs or "")
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
for cid, tko in re.findall(r'id: "([\w-]+)",\s*tag:.*?tko:\s*' + STR, src, re.S):
    m = re.fullmatch(r"([a-z0-9]*?[a-z]+)(\d+)-(\d+)", cid)
    if not m:
        skipped.append(cid)
        continue
    book, chap, verse = m.group(1), m.group(2), int(m.group(3))
    compare(cid, tko, site_chapter(book, chap).get(verse), partial=True)

print(f"{checked} checked, {bad} different" + (f", skipped {skipped}" if skipped else ""))
sys.exit(1 if bad else 0)
