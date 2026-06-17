"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Zap, ShoppingCart, BarChart2, Package, Heart, Star } from "lucide-react";
import Link from "next/link";
import { FeatureHighlight } from "@/components/ui/feature-highlight";

// Small inline icon helper — uses lucide or img
const InlineIcon = ({ icon }: { icon: React.ReactNode }) => (
  <span className="mx-1.5 inline-flex h-7 w-7 items-center justify-center align-middle">
    {icon}
  </span>
);

const features = [
  <>
    Fuel up with
    <InlineIcon icon={<Zap className="h-6 w-6 text-yellow-500" />} />
    25g of protein per bar.
  </>,
  <>
    Shop
    <InlineIcon icon={<ShoppingCart className="h-6 w-6 text-green-600" />} />
    across SG &amp; MY retailers.
  </>,
  <>
    Compare
    <InlineIcon icon={<BarChart2 className="h-6 w-6 text-blue-500" />} />
    prices in seconds.
  </>,
  <>
    Order a
    <InlineIcon icon={<Package className="h-6 w-6 text-orange-500" />} />
    box — delivered to your door.
  </>,
  <>
    Share
    <InlineIcon icon={<Heart className="h-6 w-6 text-red-500" />} />
    favorites with your gym crew.
  </>,
  <>
    Rated
    <InlineIcon icon={<Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />} />
    4.8 by thousands of athletes.
  </>,
];

const footer = (
  <p className="pt-2 text-xl" style={{ color: "#555467" }}>
    Just head to{" "}
    <Link
      href="/comparison"
      className="font-semibold underline underline-offset-2"
      style={{ color: "#FF8C00" }}
    >
      our comparison tool
    </Link>{" "}
    to find your perfect bar.
  </p>
);

// Rotation variants — 3-D Y-axis flip
const flipIn = {
  initial: { rotateY: 90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  exit:    { rotateY: -90, opacity: 0, transition: { duration: 0.7, ease: [0.55, 0.06, 0.68, 0.19] as [number, number, number, number] } },
};

export default function HeroRotator() {
  const [panel, setPanel] = useState<0 | 1>(0);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const id = setInterval(() => setPanel(p => (p === 0 ? 1 : 0)), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ perspective: "1400px" }}>
      {/* Layered atmospheric gradient — warm amber bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% -15%, rgba(255,212,59,0.22) 0%, transparent 60%), " +
            "radial-gradient(ellipse 70% 60% at 85% 65%, rgba(255,140,0,0.13) 0%, transparent 55%), " +
            "radial-gradient(ellipse 55% 45% at 5% 85%, rgba(255,107,0,0.08) 0%, transparent 50%), " +
            "radial-gradient(ellipse 35% 30% at 92% 8%, rgba(255,212,59,0.10) 0%, transparent 40%)",
        }}
      />

      <AnimatePresence mode="wait">
        {panel === 0 ? (
          <motion.div
            key="hero-1"
            {...flipIn}
            style={{ transformStyle: "preserve-3d" }}
            className="mx-auto max-w-5xl px-6 py-28 text-center"
          >
            {/* Panel 1 — brand hero */}
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{ border: "1px solid rgba(255,140,0,0.30)", background: "rgba(255,140,0,0.10)", color: "#FF8C00" }}
            >
              Singapore &amp; Malaysia
            </span>
            <h1
              className="mt-6 text-5xl font-black leading-[1.05] md:text-[4.5rem]"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                letterSpacing: "-0.04em",
                color: "#0d0c22",
              }}
            >
              Find the best deal on
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #FF6B00 0%, #FF8C00 45%, #FFD43B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                protein bars
              </span>{" "}
              near you
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#555467" }}>
              Compare prices, macros, and availability for Grenade, Barebells, Quest, Pure&nbsp;Protein &amp;
              MyProtein across Shopee, Lazada, Amazon, iHerb, and direct-brand stores — all in one place.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/comparison"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl px-8 text-sm font-semibold transition-[transform,box-shadow] duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: "#0d0c22",
                  color: "#FFD43B",
                  boxShadow: "0 4px 24px rgba(13,12,34,0.22), 0 1px 3px rgba(13,12,34,0.30)",
                  fontFamily: "var(--font-nunito), Nunito, sans-serif",
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                }}
              >
                Compare now
                <svg className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Dot indicator */}
            <div className="mt-10 flex justify-center gap-2">
              <span className="h-2 w-6 rounded-full" style={{ background: "#0d0c22" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "rgba(0,0,0,0.18)" }} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hero-2"
            {...flipIn}
            style={{ transformStyle: "preserve-3d" }}
            className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20"
          >
            {/* Panel 2 — FeatureHighlight */}
            <div
              className="w-full max-w-2xl rounded-3xl"
              style={{
                background: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <FeatureHighlight
                icon={
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "#FFD43B" }}
                  >
                    <Dumbbell className="h-6 w-6" style={{ color: "#0d0c22" }} />
                  </span>
                }
                title="Easy. Does it all."
                features={features}
                footer={footer}
                className="max-w-full"
                style={{ color: "#0d0c22" }}
              />
            </div>

            {/* Dot indicator */}
            <div className="mt-8 flex justify-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: "rgba(0,0,0,0.18)" }} />
              <span className="h-2 w-6 rounded-full" style={{ background: "#0d0c22" }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
