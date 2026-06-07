import type { Metadata } from "next";
import { Nunito, DM_Sans, Fraunces, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

// Organic editorial serif — for display headlines
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProteinBarsia — Compare Protein Bars in SG & MY",
  description: "Compare protein bars from Grenade, Barebells, Quest, Pure Protein and MyProtein across Singapore and Malaysia retailers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${dmSans.variable} ${fraunces.variable} ${barlowCondensed.variable} h-full`}>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{
          background: "#f4f3e6",
          color: "#0a4635",
          fontFamily: "var(--font-dm-sans), 'DM Sans', 'Helvetica Neue', sans-serif",
        }}
      >
        <Nav />
        <main className="flex-1">{children}</main>
        <footer
          className="py-8 text-center text-sm"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)", color: "#888" }}
        >
          <p>
            ProteinBarsia &copy; {new Date().getFullYear()} &mdash; Prices are approximate and updated regularly.
            Links may earn us a commission at no cost to you.
          </p>
        </footer>
      </body>
    </html>
  );
}
