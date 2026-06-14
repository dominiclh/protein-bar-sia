import { BRANDS, listings } from "@/lib/data";
import HeroRotator from "@/components/HeroRotator";
import { AnimatedStatBar } from "@/components/AnimatedStatBar";
import { AnimatedBrandGrid } from "@/components/AnimatedBrandGrid";

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

      {/* Stats bar — animated count-up + stagger */}
      <AnimatedStatBar stats={stats} />

      {/* Brand grid — stagger reveal */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2
          className="mb-10 text-center text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif", color: "#0d0c22" }}
        >
          Brands we cover
        </h2>
        <AnimatedBrandGrid brands={BRANDS} />
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
