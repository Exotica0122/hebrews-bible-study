"""Print 새번역 verses from the Korean Bible Society site.

Usage: saenew.py <book> <chapter> [verse | first-last], e.g. saenew.py heb 3 or saenew.py psa 95 7-11
"""
import re, sys, urllib.request
book, chap = sys.argv[1], sys.argv[2]
sel = sys.argv[3] if len(sys.argv) > 3 else None
url = f"https://www.bskorea.or.kr/bible/korbibReadpage.php?version=SAENEW&book={book}&chap={chap}&sec=1&cVersion=&fontSize=15px&fontWeight=normal"
html = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=20).read().decode("utf-8")
html = re.sub(r"<div[^>]*class=D2[^>]*>.*?</div>", "", html, flags=re.S)
html = re.sub(r"<a[^>]*class=\"comment\"[^>]*>.*?</a>", "", html, flags=re.S)
parts = re.split(r'<span class="number">(\d+)(?:&nbsp;)*</span>', html)
out = {}
for i in range(1, len(parts), 2):
    t = re.sub(r"<[^>]+>", "", parts[i + 1].split("<br")[0])
    t = re.sub(r"\s+", " ", t.replace("&nbsp;", " ")).strip()
    t = re.sub(r"(?<![\d:])\d+\)", "", t.split(" 성경 단어 검색")[0]).strip()
    out[int(parts[i])] = t
lo, hi = (map(int, sel.split("-")) if sel and "-" in sel else (int(sel), int(sel))) if sel else (min(out), max(out))
for v in range(lo, hi + 1):
    print(f"{v}: {out.get(v)}")
