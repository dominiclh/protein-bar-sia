"use client";

import { useState } from "react";
import { BRAND_COLORS, BRAND_LOGO_URLS } from "@/lib/data";

export function BrandLogo({ brand, size = 48 }: { brand: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const color = BRAND_COLORS[brand] ?? "#888";
  const imgSize = Math.round(size * 0.67);

  return (
    <span
      className="flex items-center justify-center rounded-full overflow-hidden transition-transform duration-200 group-hover:scale-110"
      style={{
        width: size,
        height: size,
        background: `${color}10`,
        boxShadow: `0 2px 8px ${color}22`,
        flexShrink: 0,
      }}
    >
      {!failed ? (
        <img
          src={BRAND_LOGO_URLS[brand]}
          alt={brand}
          width={imgSize}
          height={imgSize}
          style={{ width: imgSize, height: imgSize, objectFit: "contain" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          style={{
            fontFamily: "var(--font-nunito), Nunito, sans-serif",
            fontSize: size * 0.38,
            fontWeight: 900,
            color,
          }}
        >
          {brand[0]}
        </span>
      )}
    </span>
  );
}
