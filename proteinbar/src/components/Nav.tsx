"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/comparison", label: "Comparison" },
  { href: "/value-vs-content.html", label: "Value vs Content" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header style={{ background: "#0a4635", position: "sticky", top: 0, zIndex: 50 }}>
      {/* Main bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 44px",
          height: "76px",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
        className="max-sm:!px-4 max-sm:!h-[60px]"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff" }}
        >
          <img
            src="/brand_assets/proteinbarsia_logo.jpg"
            alt="Proteinbarsia logo"
            style={{ height: "50px", width: "auto", borderRadius: "8px" }}
            className="max-sm:!h-[38px]"
          />
          <span
            style={{
              fontFamily: "var(--font-barlow), 'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "22px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#fff",
            }}
            className="max-sm:!text-[17px]"
          >
            Proteinbarsia
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden sm:flex" style={{ gap: "36px" }}>
          {links.map(({ href, label }) => {
            const active = path === href;
            return (
              <Link
                key={label}
                href={href}
                style={{
                  fontSize: "14.5px",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#fff" : "rgba(255,255,255,0.68)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                  borderBottom: active ? "2px solid #ffc62d" : "2px solid transparent",
                  paddingBottom: "2px",
                }}
                className="hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc62d] focus-visible:rounded-sm"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger (mobile only) */}
        <button
          className="flex sm:hidden flex-col cursor-pointer bg-transparent border-0 rounded p-[6px] transition-[background] duration-[180ms] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffc62d]"
          style={{ gap: "5px" }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span
            style={{
              display: "block", width: "22px", height: "2px",
              background: "rgba(255,255,255,0.85)", borderRadius: "2px",
              transition: "transform 0.25s ease, opacity 0.2s ease",
              transform: open ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block", width: "22px", height: "2px",
              background: "rgba(255,255,255,0.85)", borderRadius: "2px",
              transition: "opacity 0.2s ease",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block", width: "22px", height: "2px",
              background: "rgba(255,255,255,0.85)", borderRadius: "2px",
              transition: "transform 0.25s ease, opacity 0.2s ease",
              transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="sm:hidden"
          style={{
            background: "#0a4635",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            padding: "12px 20px 20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.20)",
          }}
        >
          {links.map(({ href, label }) => {
            const active = path === href;
            return (
              <div
                key={label}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 0",
                    fontSize: "15px",
                    fontWeight: active ? 700 : 500,
                    color: active ? "#fff" : "rgba(255,255,255,0.68)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
