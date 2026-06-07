import Link from "next/link";
import { BRANDS, BRAND_COLORS, listings } from "@/lib/data";
import HeroRotator from "@/components/HeroRotator";

const stats = [
  { label: "Brands tracked",  value: BRANDS.length.toString() },
  { label: "Listings indexed", value: listings.length.toString() },
  { label: "Markets covered",  value: "SG & MY" },
  { label: "Updated every",    value: "4 hours" },
];

export default function HomePage() {
  return (
    <>
      {/* Rotating Hero — Panel 1: brand pitch / Panel 2: FeatureHighlight */}
      <HeroRotator />

      {/* Stats bar */}
      <section style={{ borderTop: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)", background: "#fff", boxShadow: "0 2px 12px rgba(255,140,0,0.04)" }}>
        <div className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-4">
          {stats.map(({ label, value }, i) => (
            <div
              key={label}
              className="px-8 py-7 text-center"
              style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}
            >
              <p
                className="text-3xl font-black"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: "#0d0c22", letterSpacing: "-0.03em", fontStyle: "italic" }}
              >
                {value}
              </p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-widest" style={{ color: "#aaa" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand grid */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2
          className="mb-10 text-center text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif", color: "#0d0c22" }}
        >
          Brands we cover
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {BRANDS.map(brand => (
            <Link
              key={brand}
              href={`/comparison?brand=${encodeURIComponent(brand)}`}
              className="group flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-[box-shadow,transform,background-color] duration-200 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97]"
              style={{
                border: "1px solid rgba(0,0,0,0.06)",
                background: "#fff",
                boxShadow: "var(--shadow-card)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 20px ${BRAND_COLORS[brand]}22, 0 12px 40px rgba(13,12,34,0.10)`;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${BRAND_COLORS[brand]}33`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-card)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,0,0,0.06)";
              }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-black transition-transform duration-200 group-hover:scale-110"
                style={{
                  fontFamily: "var(--font-nunito), Nunito, sans-serif",
                  background: `${BRAND_COLORS[brand]}20`,
                  color: BRAND_COLORS[brand],
                  boxShadow: `0 2px 8px ${BRAND_COLORS[brand]}22`,
                }}
              >
                {brand[0]}
              </span>
              <span className="text-sm font-semibold" style={{ color: "#0d0c22" }}>
                {brand}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Affiliate disclosure */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div
          className="rounded-2xl px-6 py-5 text-sm"
          style={{
            border: "1px solid rgba(255,140,0,0.20)",
            background: "rgba(255,140,0,0.05)",
            color: "#555467",
          }}
        >
          <strong style={{ color: "#FF8C00" }}>Affiliate disclosure:</strong>{" "}
          ProteinBarsia earns a small commission when you buy through our links — at no extra cost to you.
          Commissions help keep this comparison tool free and up-to-date.
        </div>
      </section>
    </>
  );
}
