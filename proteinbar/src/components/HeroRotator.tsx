"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const C = {
  verde:    "#0a4635",
  amarillo: "#ffc62d",
  rojo:     "#e54d3a",
  azul:     "#28306c",
};

function Stars({ fill }: { fill: string }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[0,1,2,3,4].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" style={{ fill }}>
          <path d="M10 1l2.39 6.26H19l-5.31 3.77 2.08 6.51L10 13.51l-5.77 4.03 2.08-6.51L1 7.26h6.61z" />
        </svg>
      ))}
    </div>
  );
}

function RatingRow({ starFill, numColor, labelColor }: { starFill: string; numColor: string; labelColor: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginTop: "20px" }}>
      <Stars fill={starFill} />
      <span style={{ fontFamily: "var(--font-barlow)", fontWeight: 800, fontSize: "16px", color: numColor }}>4.8</span>
      <span style={{ fontSize: "13px", color: labelColor }}>· Proteinbarsia</span>
    </div>
  );
}

function Headline({ children, color = C.verde, style }: { children: React.ReactNode; color?: string; style?: React.CSSProperties }) {
  return (
    <h1 style={{
      fontFamily: "var(--font-barlow)",
      fontWeight: 900,
      fontSize: "clamp(64px, 7.4vw, 112px)",
      lineHeight: 0.86,
      letterSpacing: "0.02em",
      color,
      marginBottom: "22px",
      textTransform: "uppercase",
      ...style,
    }}>
      {children}
    </h1>
  );
}

function CtaLink({ href, bg, color, shadow, children }: { href: string; bg: string; color: string; shadow?: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      display: "inline-flex",
      alignItems: "center",
      marginTop: "24px",
      background: bg,
      color,
      textDecoration: "none",
      borderRadius: "3px",
      padding: "13px 28px",
      fontFamily: "var(--font-barlow)",
      fontSize: "15px",
      fontWeight: 900,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      boxShadow: shadow || "0 4px 20px rgba(10,70,53,0.22)",
    }}>
      {children}
    </Link>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      background: "#fff",
      borderRadius: "3px",
      padding: "5px 12px",
      fontSize: "11.5px",
      fontWeight: 600,
      color: C.verde,
      boxShadow: "0 2px 10px rgba(10,70,53,0.10)",
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
    }}>
      {children}
    </span>
  );
}

function ProductCircle({
  src, alt, ringBg = "#fff", ringStyle, circleBg = "#e8d5b0", size = 420,
  priceTag, priceTagStyle, badges,
}: {
  src: string; alt: string; ringBg?: string; ringStyle?: React.CSSProperties;
  circleBg?: string; size?: number;
  priceTag?: string; priceTagStyle?: React.CSSProperties;
  badges?: React.ReactNode[];
}) {
  return (
    <div style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-44%, -50%)",
      zIndex: 4,
    }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        padding: "9px",
        background: ringBg,
        boxShadow: "0 0 0 1px rgba(10,70,53,0.06), 0 8px 24px rgba(10,70,53,0.10), 0 24px 56px rgba(10,70,53,0.10)",
        ...ringStyle,
      }}>
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: circleBg }}>
          <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </div>
      {priceTag && (
        <div style={{
          position: "absolute",
          top: "22px",
          right: "-4px",
          borderRadius: "3px",
          padding: "8px 18px",
          fontSize: "18px",
          fontFamily: "var(--font-barlow)",
          fontWeight: 900,
          letterSpacing: "0.05em",
          boxShadow: "0 4px 16px rgba(0,0,0,0.22)",
          whiteSpace: "nowrap",
          ...priceTagStyle,
        }}>
          {priceTag}
        </div>
      )}
      {badges && badges.length > 0 && (
        <div style={{
          position: "absolute",
          bottom: "-16px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "6px",
          whiteSpace: "nowrap",
        }}>
          {badges.map((b, i) => <span key={i}>{b}</span>)}
        </div>
      )}
    </div>
  );
}

function ArrowButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous slide" : "Next slide"}
      style={{
        position: "absolute",
        top: "50%",
        [side]: "16px",
        transform: "translateY(-50%)",
        zIndex: 10,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.40)",
        background: "rgba(0,0,0,0.18)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        color: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" style={{ stroke: "#fff", fill: "none", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }}>
        {side === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

const DOT_COLORS: [string, string][] = [
  [C.verde, "rgba(0,0,0,0.20)"],    // slide 0 yellow — active verde, rest dark
  [C.amarillo, "rgba(255,255,255,0.35)"], // slide 1 dark — active amarillo, rest white-ish
  ["#fff", "rgba(255,255,255,0.40)"],     // slide 2 red — active white
  [C.amarillo, "rgba(255,255,255,0.35)"], // slide 3 navy — active amarillo
];

export default function HeroRotator() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % 4), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        .hero-carousel { position: relative; overflow: hidden; border-radius: 10px; min-height: 440px; margin: 20px 24px 0; }
        .hero-track { display: flex; width: 400%; min-height: 440px; }
        .hero-slide { width: calc(100% / 4); flex-shrink: 0; min-height: 440px; position: relative; padding: 50px 44px 72px 80px; display: flex; align-items: center; overflow: hidden; }
        .hero-arrow:hover { background: rgba(0,0,0,0.40) !important; border-color: rgba(255,255,255,0.80) !important; }
        @media (max-width: 767px) {
          .hero-carousel { margin: 10px 10px 0; }
          .hero-slide { flex-direction: column; align-items: flex-start; padding: 22px 18px 28px; min-height: 0; }
          .hero-text-inner { max-width: 100% !important; }
          .hero-headline-el { font-size: clamp(42px, 12vw, 68px) !important; }
          .hero-product-el { position: static !important; transform: none !important; display: flex; justify-content: center; width: 100%; margin-top: 16px; }
          .hero-product-el > div:first-child { width: 170px !important; height: 170px !important; padding: 5px !important; }
          .hero-price-tag, .hero-badges { display: none !important; }
          .hero-nav-slide4 .hero-product-el { display: none !important; }
          .hero-dots { left: 18px !important; }
        }
        @media (max-width: 480px) {
          .hero-slide { padding: 20px 14px 48px !important; }
          .hero-headline-el { font-size: clamp(38px, 13.5vw, 56px) !important; }
        }
      `}</style>

      <div className="hero-carousel">
        <motion.div
          className="hero-track"
          animate={{ x: `${-current * 25}%` }}
          transition={{ duration: 1.65, ease: [0.25, 1, 0.5, 1] }}
        >

          {/* Slide 1 — Yellow */}
          <div className="hero-slide" style={{ background: C.amarillo }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.22) 0%, transparent 65%), radial-gradient(circle at 15% 80%, rgba(255,200,0,0.3) 0%, transparent 50%)", pointerEvents: "none" }} />
            <div className="hero-text-inner" style={{ position: "relative", zIndex: 2, maxWidth: "42%" }}>
              <h1 className="hero-headline-el" style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "clamp(64px, 7.4vw, 112px)", lineHeight: 0.86, letterSpacing: "0.02em", color: C.verde, marginBottom: "22px", textTransform: "uppercase" }}>
                PROOO<br />TEIN!
              </h1>
              <p style={{ fontSize: "13.5px", fontStyle: "italic", color: "rgba(10,70,53,0.55)", lineHeight: 1.55, maxWidth: "200px", marginBottom: "22px" }}>
                Premium protein fuel,<br />made just for you.
              </p>
              <CtaLink href="/comparison" bg={C.verde} color={C.amarillo}>SHOP NOW ↓</CtaLink>
              <RatingRow starFill={C.verde} numColor={C.verde} labelColor="rgba(10,70,53,0.48)" />
            </div>

            <div className="hero-product-el" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-44%, -50%)", zIndex: 4 }}>
              <div style={{ width: "420px", height: "420px", borderRadius: "50%", padding: "9px", background: "#fff", boxShadow: "0 0 0 1px rgba(10,70,53,0.06), 0 8px 24px rgba(10,70,53,0.10), 0 24px 56px rgba(10,70,53,0.10)" }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: "#e8d5b0" }}>
                  <img src="/musclecrisp.png" alt="Protein Bar" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
              <div className="hero-price-tag" style={{ position: "absolute", top: "22px", right: "-4px", background: C.verde, color: C.amarillo, fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "18px", padding: "8px 18px", borderRadius: "3px", boxShadow: "0 4px 16px rgba(0,0,0,0.22)", whiteSpace: "nowrap", letterSpacing: "0.05em" }}>
                Fuel on the Go
              </div>
              <div className="hero-badges" style={{ position: "absolute", bottom: "-16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", whiteSpace: "nowrap" }}>
                <Badge>🏋️ 25g protein</Badge>
                <Badge>🌿 vegan</Badge>
                <Badge>⚡ keto</Badge>
              </div>
            </div>
          </div>

          {/* Slide 2 — Dark Green */}
          <div className="hero-slide" style={{ background: C.verde }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 75% 40%, rgba(255,198,45,0.10) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(255,255,255,0.04) 0%, transparent 50%)", pointerEvents: "none" }} />
            <div className="hero-text-inner" style={{ position: "relative", zIndex: 2, maxWidth: "42%" }}>
              <h1 className="hero-headline-el" style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "clamp(64px, 7.4vw, 112px)", lineHeight: 0.86, letterSpacing: "0.02em", color: C.amarillo, marginBottom: "22px", textTransform: "uppercase" }}>
                DAILY<br />FUEL
              </h1>
              <p style={{ fontSize: "13.5px", fontStyle: "italic", color: "rgba(255,255,255,0.58)", lineHeight: 1.55, maxWidth: "200px", marginBottom: "22px" }}>
                Power through every day with bars built for real life.
              </p>
              <CtaLink href="/comparison" bg={C.amarillo} color={C.verde} shadow="0 4px 20px rgba(255,198,45,0.30)">SHOP ALL ↓</CtaLink>
              <RatingRow starFill={C.amarillo} numColor="#fff" labelColor="rgba(255,255,255,0.42)" />
            </div>

            <div className="hero-product-el" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-44%, -50%)", zIndex: 4 }}>
              <div style={{ width: "420px", height: "420px", borderRadius: "50%", padding: "9px", background: "#0a3028", boxShadow: "0 0 0 1px rgba(255,198,45,0.15), 0 8px 24px rgba(0,0,0,0.35), 0 24px 56px rgba(0,0,0,0.28)" }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: "#0d3e2e" }}>
                  <img src="/circular_unwrapped.png" alt="Daily Fuel Bar" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
              <div className="hero-price-tag" style={{ position: "absolute", top: "22px", right: "-4px", background: C.amarillo, color: C.verde, fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "18px", padding: "8px 18px", borderRadius: "3px", boxShadow: "0 4px 16px rgba(0,0,0,0.22)", whiteSpace: "nowrap", letterSpacing: "0.05em" }}>
                Flavour Bombs
              </div>
              <div className="hero-badges" style={{ position: "absolute", bottom: "-16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", whiteSpace: "nowrap" }}>
                <Badge>🔥 20g protein</Badge>
                <Badge>☕ caffeine</Badge>
                <Badge>⚡ energy</Badge>
              </div>
            </div>
          </div>

          {/* Slide 3 — Red */}
          <div className="hero-slide" style={{ background: C.rojo }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.18) 0%, transparent 65%), radial-gradient(circle at 10% 90%, rgba(0,0,0,0.08) 0%, transparent 50%)", pointerEvents: "none" }} />
            <div className="hero-text-inner" style={{ position: "relative", zIndex: 2, maxWidth: "46%" }}>
              <h1 className="hero-headline-el" style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "clamp(64px, 7.4vw, 112px)", lineHeight: 0.86, letterSpacing: "0.02em", color: "#fff", marginBottom: "22px", textTransform: "uppercase" }}>
                TOP-5<br />PICKS
              </h1>
              <p style={{ fontSize: "13.5px", fontStyle: "italic", color: "rgba(255,255,255,0.82)", lineHeight: 1.55, maxWidth: "200px", marginBottom: "22px" }}>
                Our curated ranking of premium protein bars this month.
              </p>
              <CtaLink href="/comparison" bg="#fff" color={C.rojo} shadow="0 4px 20px rgba(0,0,0,0.15)">SEE RANKINGS ↓</CtaLink>

              <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginTop: "18px" }}>
                {[
                  ["#1", "Grenade · Choc Chip Salted Caramel", "★4.9"],
                  ["#2", "Barebells · Salted Peanut Caramel",  "★4.8"],
                  ["#3", "Quest · Cookies & Cream",            "★4.8"],
                ].map(([num, name, rating]) => (
                  <div key={num} style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.22)", borderRadius: "4px", padding: "8px 12px", backdropFilter: "blur(4px)" }}>
                    <span style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "12px", color: "rgba(255,255,255,0.65)", width: "18px", flexShrink: 0 }}>{num}</span>
                    <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#fff", flex: 1 }}>{name}</span>
                    <span style={{ fontFamily: "var(--font-barlow)", fontWeight: 800, fontSize: "12.5px", color: "rgba(255,255,255,0.85)" }}>{rating}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-product-el" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-44%, -50%)", zIndex: 4 }}>
              <div style={{ width: "420px", height: "420px", borderRadius: "50%", padding: "9px", background: "#fff", boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.12), 0 24px 56px rgba(0,0,0,0.10)" }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: "#fde8e5" }}>
                  <img src="/circular_flavours.png" alt="Top Protein Bar Flavours" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
              <div className="hero-price-tag" style={{ position: "absolute", top: "22px", right: "-4px", background: "#fff", color: C.rojo, fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "18px", padding: "8px 18px", borderRadius: "3px", boxShadow: "0 4px 16px rgba(0,0,0,0.22)", whiteSpace: "nowrap", letterSpacing: "0.05em" }}>
                Top Rated
              </div>
              <div className="hero-badges" style={{ position: "absolute", bottom: "-16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", whiteSpace: "nowrap" }}>
                <Badge>🥇 #1 Rated</Badge>
                <Badge>🔬 Lab Tested</Badge>
              </div>
            </div>
          </div>

          {/* Slide 4 — Navy */}
          <div className="hero-slide hero-nav-slide4" style={{ background: C.azul }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 75% 40%, rgba(255,198,45,0.10) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(68,100,204,0.14) 0%, transparent 50%)", pointerEvents: "none" }} />
            <div className="hero-text-inner" style={{ position: "relative", zIndex: 2, maxWidth: "44%" }}>
              <h1 className="hero-headline-el" style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "clamp(48px, 5.6vw, 82px)", lineHeight: 0.86, letterSpacing: "0.02em", color: C.amarillo, marginBottom: "22px", textTransform: "uppercase" }}>
                VALUE vs<br />CONTENT
              </h1>
              <p style={{ fontSize: "13.5px", fontStyle: "italic", color: "rgba(255,255,255,0.60)", lineHeight: 1.55, maxWidth: "200px", marginBottom: "22px" }}>
                Plot every bar on two dimensions: price per gram of protein vs. protein density.
              </p>
              <CtaLink href="/comparison" bg={C.amarillo} color={C.azul} shadow="0 4px 20px rgba(255,198,45,0.30)">EXPLORE CHART →</CtaLink>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "18px" }}>
                {["25 bars tracked", "5 brands", "SGD pricing"].map(t => (
                  <span key={t} style={{ background: "rgba(255,255,255,0.10)", borderRadius: "3px", padding: "5px 12px", fontSize: "11.5px", fontWeight: 600, color: "rgba(255,255,255,0.70)" }}>{t}</span>
                ))}
              </div>
            </div>

            <div className="hero-product-el" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-15%, -50%)", zIndex: 4 }}>
              <div style={{ width: "460px", height: "330px", borderRadius: "10px", overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,198,45,0.22), 0 10px 36px rgba(0,0,0,0.48), 0 28px 64px rgba(0,0,0,0.35)", position: "relative" }}>
                <iframe src="/chart-embed.html" style={{ width: "100%", height: "100%", border: "none", display: "block" }} scrolling="no" />
                <div style={{ position: "absolute", inset: 0, borderRadius: "10px", border: "1px solid rgba(255,198,45,0.18)", pointerEvents: "none" }} />
              </div>
              <div className="hero-price-tag" style={{ position: "absolute", top: "14px", right: "-8px", background: C.amarillo, color: C.azul, fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: "18px", padding: "8px 18px", borderRadius: "3px", boxShadow: "0 4px 16px rgba(0,0,0,0.22)", whiteSpace: "nowrap", letterSpacing: "0.05em" }}>
                SG &amp; MY
              </div>
              <div className="hero-badges" style={{ position: "absolute", bottom: "-14px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", whiteSpace: "nowrap" }}>
                <Badge>→ $/g protein</Badge>
                <Badge>↑ g/100 kcal</Badge>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Arrows */}
        <button
          className="hero-arrow"
          onClick={() => setCurrent(c => (c - 1 + 4) % 4)}
          aria-label="Previous slide"
          style={{ position: "absolute", top: "50%", left: "16px", transform: "translateY(-50%)", zIndex: 10, width: "44px", height: "44px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.40)", background: "rgba(0,0,0,0.18)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" style={{ stroke: "#fff", fill: "none", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="hero-arrow"
          onClick={() => setCurrent(c => (c + 1) % 4)}
          aria-label="Next slide"
          style={{ position: "absolute", top: "50%", right: "16px", transform: "translateY(-50%)", zIndex: 10, width: "44px", height: "44px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.40)", background: "rgba(0,0,0,0.18)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" style={{ stroke: "#fff", fill: "none", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="hero-dots" style={{ position: "absolute", bottom: "24px", left: "80px", display: "flex", gap: "7px", zIndex: 10 }}>
          {[0,1,2,3].map(i => {
            const [activeColor, restColor] = DOT_COLORS[current];
            return (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? "22px" : "8px",
                  height: "8px",
                  borderRadius: i === current ? "4px" : "50%",
                  background: i === current ? activeColor : restColor,
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: i === current ? "scale(1.2)" : "scale(1)",
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
