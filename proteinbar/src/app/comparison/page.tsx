"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  listings, BRANDS, BRAND_COLORS, FLAVORS_BY_BRAND, TOP_BESTSELLERS,
  CURRENCY_SYMBOL, type BarListing, type Market,
} from "@/lib/data";

type SortKey = keyof Pick<BarListing,
  "brand" | "flavor" | "retailer" | "priceBar" | "priceBox" | "qtyBox" |
  "protein" | "calories" | "ppg" | "rating" | "delivery"
>;

type SortDir = "asc" | "desc";

const COLUMNS: { key: SortKey; label: string; align?: "right" }[] = [
  { key: "brand",    label: "Brand / Flavor" },
  { key: "retailer", label: "Retailer" },
  { key: "qtyBox",   label: "Qty/Box",   align: "right" },
  { key: "protein",  label: "Protein",   align: "right" },
  { key: "calories", label: "Calories",  align: "right" },
  { key: "priceBar", label: "Price/Bar", align: "right" },
  { key: "priceBox", label: "Price/Box", align: "right" },
  { key: "delivery", label: "Delivery" },
  { key: "rating",   label: "Rating",    align: "right" },
  { key: "ppg",      label: "$/g Protein", align: "right" },
];

const DIETARY_FLAGS = [
  { key: "halal",      label: "Halal",       color: "#10B981" },
  { key: "vegan",      label: "Vegan",       color: "#22C55E" },
  { key: "keto",       label: "Keto",        color: "#F59E0B" },
  { key: "glutenFree", label: "Gluten-Free", color: "#A78BFA" },
  { key: "lowSugar",   label: "Low Sugar",   color: "#38BDF8" },
] as const;

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span className="ml-1 inline-flex flex-col gap-[2px] opacity-50" aria-hidden>
      <span className={`block h-0 w-0 border-x-[4px] border-b-[5px] border-x-transparent transition-opacity ${active && dir === "asc" ? "opacity-100 border-b-[#ffc62d]" : "border-b-current"}`} />
      <span className={`block h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent transition-opacity ${active && dir === "desc" ? "opacity-100 border-t-[#ffc62d]" : "border-t-current"}`} />
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const frac = rating - full;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 16 16" className="h-3.5 w-3.5" fill={
          i < full ? "#F59E0B" : i === full && frac >= 0.5 ? "url(#half)" : "#d1d5db"
        }>
          {i === full && frac >= 0.5 && (
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
          )}
          <path d="M8 1l1.854 3.756L14 5.516l-3 2.922.708 4.124L8 10.354l-3.708 2.208L5 8.438 2 5.516l4.146-.76L8 1z" />
        </svg>
      ))}
    </span>
  );
}

function DietBadge({ flag }: { flag: typeof DIETARY_FLAGS[number] }) {
  return (
    <span
      className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
      style={{ background: `${flag.color}22`, color: flag.color }}
    >
      {flag.label}
    </span>
  );
}

function StatusBadge({ status }: { status: BarListing["status"] }) {
  const map = {
    available:    { bg: "#10B98122", color: "#10B981", label: "In stock" },
    coming_soon:  { bg: "#F59E0B22", color: "#F59E0B", label: "Soon" },
    out_of_stock: { bg: "#EF444422", color: "#EF4444", label: "OOS" },
  };
  const s = map[status];
  return (
    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

export default function ComparisonPage() {
  const [market,   setMarket]   = useState<Market | "">("");
  const [brand,    setBrand]    = useState<string>("");
  const [flavor,   setFlavor]   = useState<string>("");
  const [dietary,  setDietary]  = useState<string[]>([]);
  const [sortKey,  setSortKey]  = useState<SortKey>("brand");
  const [sortDir,  setSortDir]  = useState<SortDir>("asc");
  const [showAll,  setShowAll]  = useState(false);

  const flavorsForBrand = brand ? FLAVORS_BY_BRAND[brand] ?? [] : [];

  const toggleDietary = (key: string) =>
    setDietary(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  const sort = (key: SortKey) => {
    if (key === sortKey) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    let rows = listings;
    if (market)  rows = rows.filter(r => r.market === market);
    if (brand)   rows = rows.filter(r => r.brand  === brand);
    if (flavor)  rows = rows.filter(r => r.flavor === flavor);
    dietary.forEach(key => {
      rows = rows.filter(r => r[key as keyof BarListing] === true);
    });
    return rows.slice().sort((a, b) => {
      const av = a[sortKey] as string | number;
      const bv = b[sortKey] as string | number;
      const cmp = typeof av === "number" ? av - (bv as number) : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [market, brand, flavor, dietary, sortKey, sortDir]);

  const displayed = showAll ? filtered : filtered.slice(0, 20);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6">

      {/* Page header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-black"
          style={{ fontFamily: "var(--font-barlow), 'Barlow Condensed', sans-serif", color: "#0a4635", letterSpacing: "0.04em", textTransform: "uppercase" }}
        >
          Protein Bar Comparison
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#888" }}>
          Compare prices, macros &amp; availability across SG &amp; MY retailers. Click any column header to sort.
        </p>
      </div>

      {/* ── TOP 5 BESTSELLERS ── */}
      <section className="mb-10">
        <h2
          className="mb-4 text-lg font-bold"
          style={{ fontFamily: "var(--font-barlow), 'Barlow Condensed', sans-serif", color: "#0a4635", letterSpacing: "0.04em", textTransform: "uppercase" }}
        >
          <span className="mr-2" style={{ color: "#ffc62d" }}>★</span>Top 5 Bestsellers
        </h2>
        <motion.div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {TOP_BESTSELLERS.map((bar, idx) => (
            <motion.a
              key={bar.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
              }}
              href={bar.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group relative flex flex-col gap-2 rounded-2xl p-4 transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffc62d]"
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "var(--shadow-card)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-raised)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,140,0,0.20)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-card)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,0,0,0.07)";
              }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="text-xs font-black"
                  style={{ fontFamily: "var(--font-barlow), 'Barlow Condensed', sans-serif", color: "#ffc62d" }}
                >
                  #{idx + 1}
                </span>
                <StatusBadge status={bar.status} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: BRAND_COLORS[bar.brand] }}>
                  {bar.brand}
                </p>
                <p className="mt-0.5 text-sm font-semibold leading-snug" style={{ color: "#0a4635" }}>
                  {bar.flavor}
                </p>
              </div>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="text-lg font-black" style={{ fontFamily: "var(--font-barlow), 'Barlow Condensed', sans-serif", color: "#0a4635" }}>
                    {CURRENCY_SYMBOL[bar.market]}{bar.priceBar.toFixed(2)}
                    <span className="ml-1 text-xs font-normal" style={{ color: "#888" }}>/bar</span>
                  </p>
                  <p className="text-xs" style={{ color: "#888" }}>{bar.retailer}</p>
                </div>
                <div className="flex flex-col items-end">
                  <Stars rating={bar.rating} />
                  <span className="text-[10px]" style={{ color: "#888" }}>{bar.reviewCount.toLocaleString()} reviews</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {DIETARY_FLAGS.filter(f => bar[f.key]).map(f => <DietBadge key={f.key} flag={f} />)}
              </div>
              <div className="mt-1 flex items-center justify-between text-xs" style={{ color: "#888" }}>
                <span>{bar.protein}g protein · {bar.calories} kcal</span>
                <span className="font-medium group-hover:underline" style={{ color: "#ffc62d" }}>Buy →</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* ── FILTERS ── */}
      <section
        className="mb-6 rounded-2xl p-5"
        style={{
          border: "1px solid rgba(0,0,0,0.06)",
          background: "#fff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          className="mb-4 text-sm font-semibold uppercase tracking-widest"
          style={{ color: "#888" }}
        >
          Filters
        </h2>
        <div className="flex flex-wrap items-end gap-4">
          {/* Market */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color: "#888" }}>Market</label>
            <div className="flex overflow-hidden rounded-lg" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
              {(["", "SG", "MY"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMarket(m)}
                  className="px-4 py-2 text-sm font-medium transition-[background-color,color] duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc62d] focus-visible:ring-inset"
                  style={
                    market === m
                      ? { background: "#ffc62d", color: "#0a4635", fontWeight: 700 }
                      : { background: "#f4f3e6", color: "#555467" }
                  }
                >
                  {m === "" ? "All" : m}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color: "#888" }}>Brand</label>
            <select
              value={brand}
              onChange={e => { setBrand(e.target.value); setFlavor(""); }}
              className="rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#fff",
                color: "#0a4635",
              }}
            >
              <option value="">All brands</option>
              {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Flavor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color: "#888" }}>Flavor</label>
            <select
              value={flavor}
              onChange={e => setFlavor(e.target.value)}
              disabled={!brand}
              className="rounded-lg px-3 py-2 text-sm disabled:opacity-40 focus:outline-none"
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#fff",
                color: "#0a4635",
              }}
            >
              <option value="">All flavors</option>
              {flavorsForBrand.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          {/* Dietary */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color: "#888" }}>Dietary</label>
            <div className="flex flex-wrap gap-2">
              {DIETARY_FLAGS.map(f => (
                <button
                  key={f.key}
                  onClick={() => toggleDietary(f.key)}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold transition-[background-color,color,border-color,box-shadow] duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc62d] focus-visible:ring-offset-1 active:scale-95"
                  style={
                    dietary.includes(f.key)
                      ? { background: f.color, borderColor: f.color, border: "1px solid", color: "#fff", boxShadow: `0 2px 8px ${f.color}44` }
                      : { border: "1px solid rgba(0,0,0,0.10)", color: "#555467", background: "transparent" }
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear */}
          {(market || brand || dietary.length > 0) && (
            <button
              onClick={() => { setMarket(""); setBrand(""); setFlavor(""); setDietary([]); }}
              className="ml-auto rounded-lg px-4 py-2 text-xs transition-[border-color,color] duration-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc62d]"
              style={{ border: "1px solid rgba(0,0,0,0.08)", color: "#888" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.20)";
                (e.currentTarget as HTMLButtonElement).style.color = "#0a4635";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.08)";
                (e.currentTarget as HTMLButtonElement).style.color = "#888";
              }}
            >
              Clear all
            </button>
          )}
        </div>
      </section>

      {/* Result count */}
      <p className="mb-3 text-xs" style={{ color: "#888" }}>
        {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found
        {!showAll && filtered.length > 20 && ` — showing first 20`}
      </p>

      {/* ── TABLE ── */}
      <div
        className="overflow-x-auto rounded-2xl"
        style={{
          border: "1px solid rgba(0,0,0,0.06)",
          background: "#fff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.05)",
        }}
      >
        <table className="w-full min-w-[960px] border-collapse text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#f4f3e6" }}>
              {COLUMNS.map(col => (
                <th
                  key={col.key}
                  className={[
                    "px-4 py-3 text-xs font-semibold uppercase tracking-wide select-none cursor-pointer transition-colors",
                    col.align === "right" ? "text-right" : "text-left",
                  ].join(" ")}
                  style={{ color: sortKey === col.key ? "#0a4635" : "#888" }}
                  onClick={() => sort(col.key)}
                >
                  {col.label}
                  <SortIcon active={sortKey === col.key} dir={sortDir} />
                </th>
              ))}
              <th
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-center"
                style={{ color: "#888" }}
              >
                Buy
              </th>
            </tr>
          </thead>
          <tbody>
            {displayed.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length + 1} className="px-4 py-16 text-center" style={{ color: "#888" }}>
                  No results match your filters.
                </td>
              </tr>
            ) : displayed.map((row, i) => (
              <tr
                key={row.id}
                className="transition-colors duration-100"
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.04)",
                  background: i % 2 === 0 ? "#fff" : "#fafaf9",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = "#f6f5f1"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? "#fff" : "#fafaf9"; }}
              >
                {/* Brand / Flavor */}
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: BRAND_COLORS[row.brand] }}>
                      {row.brand}
                    </span>
                    <span className="font-medium" style={{ color: "#0a4635" }}>{row.flavor}</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {DIETARY_FLAGS.filter(f => row[f.key]).map(f => <DietBadge key={f.key} flag={f} />)}
                    </div>
                  </div>
                </td>

                {/* Retailer */}
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium" style={{ color: "#0a4635" }}>{row.retailer}</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                        style={{ border: "1px solid rgba(0,0,0,0.10)", color: "#888" }}
                      >
                        {row.market}
                      </span>
                      <StatusBadge status={row.status} />
                    </div>
                  </div>
                </td>

                {/* Qty/Box */}
                <td className="px-4 py-3 text-right font-medium" style={{ color: "#0a4635" }}>{row.qtyBox}</td>

                {/* Protein */}
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold" style={{ color: "#27AE60" }}>{row.protein}g</span>
                </td>

                {/* Calories */}
                <td className="px-4 py-3 text-right" style={{ color: "#0a4635" }}>{row.calories}</td>

                {/* Price/Bar */}
                <td className="px-4 py-3 text-right font-semibold" style={{ color: "#0a4635" }}>
                  {CURRENCY_SYMBOL[row.market]}{row.priceBar.toFixed(2)}
                </td>

                {/* Price/Box */}
                <td className="px-4 py-3 text-right" style={{ color: "#0a4635" }}>
                  {CURRENCY_SYMBOL[row.market]}{row.priceBox.toFixed(2)}
                </td>

                {/* Delivery */}
                <td className="px-4 py-3" style={{ color: "#888" }}>{row.delivery}</td>

                {/* Rating */}
                <td className="px-4 py-3 text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <Stars rating={row.rating} />
                    <span className="text-[10px]" style={{ color: "#888" }}>{row.reviewCount.toLocaleString()}</span>
                  </div>
                </td>

                {/* PPG */}
                <td className="px-4 py-3 text-right font-mono text-xs" style={{ color: "#ffc62d" }}>
                  {CURRENCY_SYMBOL[row.market]}{row.ppg.toFixed(3)}
                </td>

                {/* Buy */}
                <td className="px-4 py-3 text-center">
                  <a
                    href={row.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex h-8 items-center gap-1 rounded-lg px-3 text-xs font-semibold transition-[background-color,color,box-shadow] duration-100 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ffc62d]"
                    style={{ background: "rgba(255,198,45,0.25)", color: "#0a4635" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "#0a4635";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#ffc62d";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(13,12,34,0.20)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,198,45,0.25)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#0a4635";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                    }}
                  >
                    Buy
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show more */}
      {!showAll && filtered.length > 20 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="rounded-xl px-8 py-3 text-sm font-medium transition-[border-color,color,box-shadow] duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc62d]"
            style={{ border: "1px solid rgba(0,0,0,0.10)", color: "#888" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.20)";
              (e.currentTarget as HTMLButtonElement).style.color = "#0a4635";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(13,12,34,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.10)";
              (e.currentTarget as HTMLButtonElement).style.color = "#888";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            Show all {filtered.length} results
          </button>
        </div>
      )}

      {/* Live data notice */}
      <div
        className="mt-10 rounded-2xl px-6 py-5 text-sm"
        style={{ border: "1px solid rgba(39,174,96,0.20)", background: "rgba(39,174,96,0.05)" }}
      >
        <p className="font-semibold" style={{ color: "#27AE60" }}>Live price scraping — setup required</p>
        <p className="mt-1" style={{ color: "#555467" }}>
          Prices above are curated seed data. To enable live refresh every 4 hours, configure the following
          affiliate API credentials in your <code className="font-mono" style={{ color: "#0a4635" }}>.env</code> file:
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-1 font-mono text-xs sm:grid-cols-2" style={{ color: "#555467" }}>
          <li><span style={{ color: "#27AE60" }}>Amazon PA-API 5.0</span> — AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, AMAZON_PARTNER_TAG</li>
          <li><span style={{ color: "#27AE60" }}>Shopee Affiliate</span> — SHOPEE_APP_ID, SHOPEE_SECRET</li>
          <li><span style={{ color: "#27AE60" }}>Lazada Open Platform</span> — LAZADA_APP_KEY, LAZADA_APP_SECRET</li>
          <li><span style={{ color: "#27AE60" }}>iHerb</span> — IHERB_RCODE (link-based, no price API)</li>
          <li><span style={{ color: "#27AE60" }}>MyProtein</span> — MYPROTEIN_AFFIL (link parameter)</li>
          <li><span style={{ color: "#27AE60" }}>Vercel Cron</span> — CRON_SECRET (POST /api/refresh every 4h)</li>
        </ul>
        <p className="mt-3 text-xs" style={{ color: "#555467" }}>
          See <code className="font-mono" style={{ color: "#0a4635" }}>lib/fetchers.ts</code> for the integration scaffold.
          Once credentials are in place, the cron job at <code className="font-mono" style={{ color: "#0a4635" }}>vercel.json</code> will
          keep prices fresh automatically.
        </p>
      </div>
    </div>
  );
}
