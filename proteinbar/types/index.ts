export type Market = "SG" | "MY";
export type Status = "available" | "coming_soon" | "out_of_stock";
export type Retailer =
  | "Shopee SG" | "Shopee MY" | "Lazada MY" | "Amazon"
  | "iHerb" | "GNC SG" | "FairPrice" | "Greendot Health"
  | "MyProtein SG" | "MyProtein MY";

export interface ProteinBar {
  id: string;
  brand: string;
  flavor: string;
  market: Market;
  retailer: Retailer;
  affiliateUrl: string;

  // Pricing
  priceBar: number;   // price per single bar (local currency)
  priceBox: number;   // price per box (local currency)
  qtyBox: number;     // bars per box

  // Nutrition (per bar)
  protein: number;    // grams
  calories: number;   // kcal
  weight: number;     // grams per bar
  ppg: number;        // price per gram of protein

  // Retailer metadata
  rating: number;     // avg from Amazon / Shopee reviews
  reviewCount: number;
  delivery: string;   // human-readable delivery estimate
  status: Status;

  // Dietary flags
  halal: boolean;
  vegan: boolean;
  keto: boolean;
  glutenFree: boolean;
  lowSugar: boolean;

  bestseller: boolean;
  lastUpdated: string; // ISO timestamp
}

export interface WatchlistItem {
  barId: string;
  email: string;
  createdAt: string;
}

export interface FilterState {
  brand: string;
  flavor: string;
  market: Market | "";
  dietary: string[];
  sortKey: keyof ProteinBar | "";
  sortDir: "asc" | "desc";
}
