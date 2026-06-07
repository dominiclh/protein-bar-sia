/**
 * lib/fetchers.ts
 * Fetches live price + stock data via affiliate / open APIs.
 * Each function returns a partial ProteinBar to be merged with seed data.
 *
 * SETUP REQUIRED:
 *  - Amazon:  https://affiliate-program.amazon.com  →  AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, AMAZON_PARTNER_TAG
 *  - Shopee:  https://affiliate.shopee.sg           →  SHOPEE_APP_ID, SHOPEE_SECRET
 *  - Lazada:  https://open.lazada.com               →  LAZADA_APP_KEY, LAZADA_APP_SECRET
 *  - iHerb:   https://ca.iherb.com/info/affiliates  →  (link-based, no price API — use scrape fallback)
 */

type PricePatch = {
  priceBar?: number;
  priceBox?: number;
  rating?: number;
  reviewCount?: number;
  status?: "available" | "coming_soon" | "out_of_stock";
  affiliateUrl?: string;
};

// ─── Amazon Product Advertising API 5.0 ──────────────────────────────────────
export async function fetchAmazonPrice(asin: string): Promise<PricePatch> {
  const endpoint =
    process.env.AMAZON_MARKET === "SG"
      ? "https://webservices.amazon.sg/paapi5/getitems"
      : "https://webservices.amazon.com/paapi5/getitems";

  const payload = {
    ItemIds: [asin],
    Resources: [
      "Offers.Listings.Price",
      "Offers.Listings.Availability.Type",
      "CustomerReviews.StarRating",
      "CustomerReviews.Count",
    ],
    PartnerTag: process.env.AMAZON_PARTNER_TAG!,
    PartnerType: "Associates",
    Marketplace: process.env.AMAZON_MARKET === "SG" ? "www.amazon.sg" : "www.amazon.com",
  };

  // NOTE: PA-API requires AWS SigV4 signing. Use the official SDK:
  // npm install @amazon/paapi5-nodejs-sdk
  // Replace below stub with real signed request.
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Amazon API error: ${res.status}`);
  const data = await res.json();

  const item = data?.ItemsResult?.Items?.[0];
  const price = item?.Offers?.Listings?.[0]?.Price?.Amount;
  const avail = item?.Offers?.Listings?.[0]?.Availability?.Type;
  const rating = item?.CustomerReviews?.StarRating?.DisplayValue;
  const count = item?.CustomerReviews?.Count;

  return {
    priceBar: price ? parseFloat(price) : undefined,
    status: avail === "Now" ? "available" : "out_of_stock",
    rating: rating ? parseFloat(rating) : undefined,
    reviewCount: count,
    affiliateUrl: `https://www.amazon.com/dp/${asin}?tag=${process.env.AMAZON_PARTNER_TAG}`,
  };
}

// ─── Shopee Affiliate API ─────────────────────────────────────────────────────
export async function fetchShopeePrice(itemId: string, shopId: string, market: "SG" | "MY"): Promise<PricePatch> {
  const base = market === "SG" ? "https://open-api.affiliate.shopee.sg" : "https://open-api.affiliate.shopee.com.my";

  const ts = Math.floor(Date.now() / 1000);
  const appId = process.env.SHOPEE_APP_ID!;
  const secret = process.env.SHOPEE_SECRET!;

  // Shopee uses HMAC-SHA256 signature: appId + timestamp + payload + secret
  const { createHmac } = await import("crypto");
  const payload = JSON.stringify({ item_id: itemId, shop_id: shopId });
  const sig = createHmac("sha256", secret)
    .update(`${appId}${ts}${payload}${secret}`)
    .digest("hex");

  const res = await fetch(`${base}/graphql/affiliate/api/v1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `SHA256 appid=${appId},timestamp=${ts},nonce=${sig}`,
    },
    body: JSON.stringify({
      query: `{ getItemInfo(shopId:"${shopId}", itemId:"${itemId}") { price ratingStar totalSoldCount } }`,
    }),
  });

  if (!res.ok) throw new Error(`Shopee API error: ${res.status}`);
  const data = await res.json();
  const info = data?.data?.getItemInfo;

  return {
    priceBar: info?.price ? info.price / 100000 : undefined, // Shopee prices are in units * 100000
    rating: info?.ratingStar ? info.ratingStar / 10 : undefined,
    affiliateUrl: `https://shope.ee/affiliate/${itemId}`,
  };
}

// ─── Lazada Open Platform API ─────────────────────────────────────────────────
export async function fetchLazadaPrice(itemId: string): Promise<PricePatch> {
  const appKey = process.env.LAZADA_APP_KEY!;
  const appSecret = process.env.LAZADA_APP_SECRET!;
  const ts = Date.now();

  const params: Record<string, string> = {
    app_key: appKey,
    timestamp: ts.toString(),
    sign_method: "sha256",
    item_id: itemId,
  };

  // Lazada sign: sorted param string HMAC-SHA256 with appSecret
  const { createHmac } = await import("crypto");
  const paramStr = Object.keys(params).sort().map(k => `${k}${params[k]}`).join("");
  params.sign = createHmac("sha256", appSecret).update(`/product/item/get${paramStr}`).digest("hex").toUpperCase();

  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`https://api.lazada.com.my/rest/product/item/get?${qs}`);
  if (!res.ok) throw new Error(`Lazada API error: ${res.status}`);
  const data = await res.json();

  const skus = data?.data?.skus?.[0];
  const price = skus?.price ?? skus?.special_price;

  return {
    priceBar: price ? parseFloat(price) : undefined,
    status: skus?.quantity > 0 ? "available" : "out_of_stock",
    affiliateUrl: `https://www.lazada.com.my/products/${itemId}.html?cid=${process.env.LAZADA_AFFILIATE_ID}`,
  };
}

// ─── iHerb (link-based affiliate, no price API — cheerio scrape fallback) ────
export async function fetchIHerbPrice(sku: string): Promise<PricePatch> {
  // iHerb has no public price API. Use their affiliate link structure.
  // For price, scrape the product page (respect robots.txt / rate limits).
  const url = `https://www.iherb.com/pr/${sku}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ProteinBarBot/1.0)" },
  });
  if (!res.ok) throw new Error(`iHerb fetch error: ${res.status}`);
  const html = await res.text();

  // Extract price from JSON-LD
  const match = html.match(/"price"\s*:\s*"?([\d.]+)"?/);
  const price = match ? parseFloat(match[1]) : undefined;

  return {
    priceBar: price,
    affiliateUrl: `${url}?rcode=${process.env.IHERB_RCODE}`,
  };
}

// ─── Unified refresh for a single bar ────────────────────────────────────────
export type RetailerConfig =
  | { type: "amazon"; asin: string }
  | { type: "shopee"; itemId: string; shopId: string; market: "SG" | "MY" }
  | { type: "lazada"; itemId: string }
  | { type: "iherb"; sku: string };

export async function fetchLivePrice(config: RetailerConfig): Promise<PricePatch> {
  switch (config.type) {
    case "amazon":  return fetchAmazonPrice(config.asin);
    case "shopee":  return fetchShopeePrice(config.itemId, config.shopId, config.market);
    case "lazada":  return fetchLazadaPrice(config.itemId);
    case "iherb":   return fetchIHerbPrice(config.sku);
    default:        throw new Error("Unknown retailer type");
  }
}
