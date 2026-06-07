"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/comparison", label: "Comparison" },
  { href: "http://localhost:3000/value-vs-content.html", label: "Value vs Content" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 44px",
        height: "76px",
        background: "#0a4635",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <Link
          href="http://localhost:3000"
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff" }}
        >
          <img
            src="http://localhost:3000/brand_assets/proteinbarsia_logo.jpg"
            alt="Proteinbarsia logo"
            style={{ height: "50px", width: "auto", borderRadius: "8px" }}
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
          >
            Proteinbarsia
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: "36px", listStyle: "none" }}>
          {links.map(({ href, label }) => {
            const active = href !== "#" && path === href;
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
                  borderRadius: 0,
                  outline: "none",
                }}
                className="hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc62d] focus-visible:ring-offset-2 focus-visible:rounded-sm"
              >
                {label}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
