import Link from "next/link";

export default function NotFound() {
  return (
    <main className="hb-container" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="hb-eyebrow">Not found</div>
      <h1 className="hb-h2" style={{ marginTop: 10 }}>There is no such page</h1>
      <p style={{ font: "400 19px/30px var(--font-text)", marginTop: 16 }}>
        <Link href="/">Back to Hebrews 1</Link>
      </p>
    </main>
  );
}
