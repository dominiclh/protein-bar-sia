"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BRAND_COLORS } from "@/lib/data";
import { BrandLogo } from "@/components/BrandLogo";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.50, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function AnimatedBrandGrid({ brands }: { brands: readonly string[] }) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4 sm:grid-cols-5"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {brands.map(brand => (
        <motion.div key={brand} variants={item}>
          <Link
            href={`/comparison?brand=${encodeURIComponent(brand)}`}
            className="group flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-[box-shadow,transform,background-color] duration-200 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97]"
            style={{
              border: "1px solid rgba(0,0,0,0.06)",
              background: "#fff",
              boxShadow: "var(--shadow-card)",
              display: "flex",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = `0 4px 20px ${BRAND_COLORS[brand]}22, 0 12px 40px rgba(13,12,34,0.10)`;
              el.style.borderColor = `${BRAND_COLORS[brand]}33`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "var(--shadow-card)";
              el.style.borderColor = "rgba(0,0,0,0.06)";
            }}
          >
            <BrandLogo brand={brand} size={48} />
            <span className="text-sm font-semibold" style={{ color: "#0d0c22" }}>
              {brand}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
