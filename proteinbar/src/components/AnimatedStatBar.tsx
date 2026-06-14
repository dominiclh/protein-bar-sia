"use client";

import { motion, animate, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(value, 10);
  const isNumeric = !isNaN(num) && String(num) === value;
  const [display, setDisplay] = useState(isNumeric ? "0" : value);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(0, num, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) { setDisplay(String(Math.round(v))); },
      onComplete() { setDisplay(value); },
    });
    return controls.stop;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{display}</span>;
}

type Stat = { label: string; value: string };

export function AnimatedStatBar({ stats }: { stats: Stat[] }) {
  return (
    <section
      style={{
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        background: "#fff",
        boxShadow: "0 2px 12px rgba(255,140,0,0.04)",
      }}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-4">
        {stats.map(({ label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="px-8 py-7 text-center"
            style={{
              borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
            }}
          >
            <p
              className="text-3xl font-black"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                color: "#0d0c22",
                letterSpacing: "-0.03em",
                fontStyle: "italic",
              }}
            >
              <Counter value={value} />
            </p>
            <p
              className="mt-1.5 text-xs font-medium uppercase tracking-widest"
              style={{ color: "#aaa" }}
            >
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
