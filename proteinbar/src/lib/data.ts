export type Market = "SG" | "MY";
export type Status = "available" | "coming_soon" | "out_of_stock";
export type Retailer =
  | "Shopee SG" | "Shopee MY" | "Lazada MY" | "Amazon SG" | "Amazon"
  | "iHerb" | "GNC SG" | "GNC MY" | "FairPrice" | "Guardian SG"
  | "MyProtein SG" | "MyProtein MY" | "Greendot Health";

export interface BarListing {
  id: string;
  brand: string;
  flavor: string;
  market: Market;
  retailer: Retailer;
  affiliateUrl: string;
  priceBar: number;
  priceBox: number;
  qtyBox: number;
  protein: number;
  calories: number;
  weight: number;
  ppg: number;
  rating: number;
  reviewCount: number;
  delivery: string;
  status: Status;
  halal: boolean;
  vegan: boolean;
  keto: boolean;
  glutenFree: boolean;
  lowSugar: boolean;
  bestseller: boolean;
}

const G = (
  id: string, brand: string, flavor: string, market: Market, retailer: Retailer,
  url: string, priceBar: number, priceBox: number, qtyBox: number,
  protein: number, calories: number, weight: number,
  rating: number, reviewCount: number, delivery: string, status: Status,
  halal: boolean, vegan: boolean, keto: boolean, glutenFree: boolean, lowSugar: boolean,
  bestseller: boolean
): BarListing => ({
  id, brand, flavor, market, retailer, affiliateUrl: url,
  priceBar, priceBox, qtyBox, protein, calories, weight,
  ppg: parseFloat((priceBar / protein).toFixed(3)),
  rating, reviewCount, delivery, status, halal, vegan, keto, glutenFree, lowSugar, bestseller,
});

// Affiliate tag placeholders — replace with real tags from each platform dashboard
const AMZ_TAG = "proteinbarsia-20";
const SHOPEE_REF = "?af=proteinbarsia";
const LAZADA_REF = "?cid=proteinbarsia";
const IHERB_REF = "?rcode=PBARSIA";
const MYPROTEIN_REF = "?affil=proteinbarsia";

export const listings: BarListing[] = [
  // ── GRENADE ──────────────────────────────────────────────────────────────────
  // SG
  G("gr-cc-sg-shopee","Grenade","Chocolate Chip Cookie Dough","SG","Shopee SG",
    `https://shope.ee/grenade-choc-cookie${SHOPEE_REF}`,4.20,48.00,12,21,211,60,4.7,2340,"3-5 days","available",false,false,false,false,false,true),
  G("gr-cc-sg-amzsg","Grenade","Chocolate Chip Cookie Dough","SG","Amazon SG",
    `https://www.amazon.sg/dp/B00GRND001?tag=${AMZ_TAG}`,4.50,52.00,12,21,211,60,4.6,890,"2-4 days","available",false,false,false,false,false,true),
  G("gr-cc-sg-iherb","Grenade","Chocolate Chip Cookie Dough","SG","iHerb",
    `https://www.iherb.com/pr/grenade-choc-cookie-dough${IHERB_REF}`,4.80,54.00,12,21,211,60,4.5,670,"5-8 days","available",false,false,false,false,false,false),
  G("gr-cc-sg-gnc","Grenade","Chocolate Chip Cookie Dough","SG","GNC SG",
    `https://www.gnc.com.sg/grenade-choc-cookie`,4.90,56.00,12,21,211,60,4.5,210,"Same day","available",false,false,false,false,false,false),
  G("gr-pn-sg-shopee","Grenade","Peanut Nutter","SG","Shopee SG",
    `https://shope.ee/grenade-peanut${SHOPEE_REF}`,4.20,48.00,12,21,201,60,4.6,1820,"3-5 days","available",false,false,false,false,false,false),
  G("gr-cm-sg-shopee","Grenade","Caramel Chaos","SG","Shopee SG",
    `https://shope.ee/grenade-caramel${SHOPEE_REF}`,4.20,48.00,12,21,206,60,4.5,1450,"3-5 days","available",false,false,false,false,false,false),

  // MY
  G("gr-cc-my-shopee","Grenade","Chocolate Chip Cookie Dough","MY","Shopee MY",
    `https://shopee.com.my/grenade-choc-cookie${SHOPEE_REF}`,16.00,175.00,12,21,211,60,4.7,3120,"3-5 days","available",false,false,false,false,false,true),
  G("gr-cc-my-lazada","Grenade","Chocolate Chip Cookie Dough","MY","Lazada MY",
    `https://www.lazada.com.my/products/grenade-choc${LAZADA_REF}`,15.50,170.00,12,21,211,60,4.5,890,"4-6 days","available",false,false,false,false,false,false),
  G("gr-cc-my-iherb","Grenade","Chocolate Chip Cookie Dough","MY","iHerb",
    `https://www.iherb.com/pr/grenade-choc-cookie-dough${IHERB_REF}`,17.20,198.00,12,21,211,60,4.5,670,"7-10 days","available",false,false,false,false,false,false),
  G("gr-pn-my-shopee","Grenade","Peanut Nutter","MY","Shopee MY",
    `https://shopee.com.my/grenade-peanut${SHOPEE_REF}`,16.00,175.00,12,21,201,60,4.6,2100,"3-5 days","available",false,false,false,false,false,false),
  G("gr-wc-my-shopee","Grenade","White Choc Cookie","MY","Shopee MY",
    `https://shopee.com.my/grenade-white-choc${SHOPEE_REF}`,16.00,175.00,12,21,208,60,4.4,980,"3-5 days","available",false,false,false,false,false,false),

  // ── BAREBELLS ────────────────────────────────────────────────────────────────
  // SG
  G("bb-cc-sg-shopee","Barebells","Cookies & Cream","SG","Shopee SG",
    `https://shope.ee/barebells-cookies${SHOPEE_REF}`,4.50,50.00,12,20,199,55,4.8,3210,"3-5 days","available",false,false,false,false,false,true),
  G("bb-cc-sg-amzsg","Barebells","Cookies & Cream","SG","Amazon SG",
    `https://www.amazon.sg/dp/B00BRBLS01?tag=${AMZ_TAG}`,4.80,54.00,12,20,199,55,4.7,1240,"2-4 days","available",false,false,false,false,false,true),
  G("bb-cc-sg-iherb","Barebells","Cookies & Cream","SG","iHerb",
    `https://www.iherb.com/pr/barebells-cookies-cream${IHERB_REF}`,5.10,58.00,12,20,199,55,4.6,980,"5-8 days","available",false,false,false,false,false,false),
  G("bb-ca-sg-shopee","Barebells","Caramel Cashew","SG","Shopee SG",
    `https://shope.ee/barebells-caramel${SHOPEE_REF}`,4.50,50.00,12,20,217,55,4.7,1870,"3-5 days","available",false,false,false,false,false,false),
  G("bb-sp-sg-shopee","Barebells","Salty Peanut","SG","Shopee SG",
    `https://shope.ee/barebells-salty${SHOPEE_REF}`,4.50,50.00,12,20,211,55,4.6,1340,"3-5 days","available",false,false,false,false,false,false),
  G("bb-wc-sg-gnc","Barebells","White Choc Almond","SG","GNC SG",
    `https://www.gnc.com.sg/barebells-white-choc`,5.20,60.00,12,20,205,55,4.5,430,"Same day","available",false,false,false,false,false,false),

  // MY
  G("bb-cc-my-shopee","Barebells","Cookies & Cream","MY","Shopee MY",
    `https://shopee.com.my/barebells-cookies${SHOPEE_REF}`,17.50,192.00,12,20,199,55,4.8,4320,"3-5 days","available",false,false,false,false,false,true),
  G("bb-cc-my-lazada","Barebells","Cookies & Cream","MY","Lazada MY",
    `https://www.lazada.com.my/products/barebells-cookies${LAZADA_REF}`,16.90,185.00,12,20,199,55,4.6,1560,"4-6 days","available",false,false,false,false,false,false),
  G("bb-ca-my-shopee","Barebells","Caramel Cashew","MY","Shopee MY",
    `https://shopee.com.my/barebells-caramel${SHOPEE_REF}`,17.50,192.00,12,20,217,55,4.7,2100,"3-5 days","available",false,false,false,false,false,false),
  G("bb-sp-my-shopee","Barebells","Salty Peanut","MY","Shopee MY",
    `https://shopee.com.my/barebells-salty${SHOPEE_REF}`,17.50,192.00,12,20,211,55,4.5,1240,"3-5 days","available",false,false,false,false,false,false),

  // ── QUEST ────────────────────────────────────────────────────────────────────
  // SG
  G("qu-cc-sg-amzsg","Quest","Chocolate Chip Cookie Dough","SG","Amazon SG",
    `https://www.amazon.sg/dp/B00QUEST01?tag=${AMZ_TAG}`,4.20,48.00,12,21,190,60,4.7,4560,"2-4 days","available",false,false,true,false,true,true),
  G("qu-cc-sg-iherb","Quest","Chocolate Chip Cookie Dough","SG","iHerb",
    `https://www.iherb.com/pr/quest-choc-cookie${IHERB_REF}`,4.50,51.00,12,21,190,60,4.6,2340,"5-8 days","available",false,false,true,false,true,false),
  G("qu-cc-sg-shopee","Quest","Chocolate Chip Cookie Dough","SG","Shopee SG",
    `https://shope.ee/quest-choc-cookie${SHOPEE_REF}`,4.30,49.00,12,21,190,60,4.5,1890,"3-5 days","available",false,false,true,false,true,false),
  G("qu-dc-sg-amzsg","Quest","Double Chocolate Chunk","SG","Amazon SG",
    `https://www.amazon.sg/dp/B00QUEST02?tag=${AMZ_TAG}`,4.20,48.00,12,21,180,60,4.8,3210,"2-4 days","available",false,false,true,false,true,true),
  G("qu-bc-sg-iherb","Quest","Birthday Cake","SG","iHerb",
    `https://www.iherb.com/pr/quest-birthday-cake${IHERB_REF}`,4.50,51.00,12,21,185,60,4.5,1230,"5-8 days","available",false,false,true,false,true,false),
  G("qu-pb-sg-gnc","Quest","Peanut Butter Choc","SG","GNC SG",
    `https://www.gnc.com.sg/quest-peanut-butter`,4.80,55.00,12,21,195,60,4.6,670,"Same day","available",false,false,true,false,true,false),

  // MY
  G("qu-cc-my-shopee","Quest","Chocolate Chip Cookie Dough","MY","Shopee MY",
    `https://shopee.com.my/quest-choc-cookie${SHOPEE_REF}`,15.90,175.00,12,21,190,60,4.7,3450,"3-5 days","available",false,false,true,false,true,true),
  G("qu-cc-my-lazada","Quest","Chocolate Chip Cookie Dough","MY","Lazada MY",
    `https://www.lazada.com.my/products/quest-choc${LAZADA_REF}`,15.50,170.00,12,21,190,60,4.5,1230,"4-6 days","available",false,false,true,false,true,false),
  G("qu-cc-my-iherb","Quest","Chocolate Chip Cookie Dough","MY","iHerb",
    `https://www.iherb.com/pr/quest-choc-cookie${IHERB_REF}`,17.20,196.00,12,21,190,60,4.6,2340,"7-10 days","available",false,false,true,false,true,false),
  G("qu-dc-my-shopee","Quest","Double Chocolate Chunk","MY","Shopee MY",
    `https://shopee.com.my/quest-double-choc${SHOPEE_REF}`,15.90,175.00,12,21,180,60,4.8,2890,"3-5 days","available",false,false,true,false,true,true),
  G("qu-pb-my-lazada","Quest","Peanut Butter Choc","MY","Lazada MY",
    `https://www.lazada.com.my/products/quest-pb${LAZADA_REF}`,15.50,170.00,12,21,195,60,4.5,1100,"4-6 days","available",false,false,true,false,true,false),

  // ── PURE PROTEIN ─────────────────────────────────────────────────────────────
  // SG
  G("pp-cpb-sg-amzsg","Pure Protein","Chocolate Peanut Butter","SG","Amazon SG",
    `https://www.amazon.sg/dp/B00PURP001?tag=${AMZ_TAG}`,3.80,43.00,12,20,200,50,4.4,1890,"2-4 days","available",false,false,false,false,false,false),
  G("pp-cpb-sg-iherb","Pure Protein","Chocolate Peanut Butter","SG","iHerb",
    `https://www.iherb.com/pr/pure-protein-choc-pb${IHERB_REF}`,4.10,46.00,12,20,200,50,4.3,1120,"5-8 days","available",false,false,false,false,false,false),
  G("pp-cc-sg-amzsg","Pure Protein","Chewy Chocolate Chip","SG","Amazon SG",
    `https://www.amazon.sg/dp/B00PURP002?tag=${AMZ_TAG}`,3.80,43.00,12,20,190,50,4.4,1340,"2-4 days","available",false,false,false,false,false,false),
  G("pp-pb-sg-shopee","Pure Protein","Peanut Butter","SG","Shopee SG",
    `https://shope.ee/pure-protein-pb${SHOPEE_REF}`,3.90,44.00,12,21,200,50,4.3,870,"3-5 days","available",false,false,false,false,false,false),

  // MY
  G("pp-cpb-my-shopee","Pure Protein","Chocolate Peanut Butter","MY","Shopee MY",
    `https://shopee.com.my/pure-protein-choc-pb${SHOPEE_REF}`,13.90,155.00,12,20,200,50,4.4,1560,"3-5 days","available",false,false,false,false,false,false),
  G("pp-cpb-my-lazada","Pure Protein","Chocolate Peanut Butter","MY","Lazada MY",
    `https://www.lazada.com.my/products/pure-protein-cpb${LAZADA_REF}`,13.50,150.00,12,20,200,50,4.3,890,"4-6 days","available",false,false,false,false,false,false),
  G("pp-cpb-my-iherb","Pure Protein","Chocolate Peanut Butter","MY","iHerb",
    `https://www.iherb.com/pr/pure-protein-choc-pb${IHERB_REF}`,15.20,172.00,12,20,200,50,4.3,1120,"7-10 days","available",false,false,false,false,false,false),
  G("pp-cc-my-shopee","Pure Protein","Chewy Chocolate Chip","MY","Shopee MY",
    `https://shopee.com.my/pure-protein-choc-chip${SHOPEE_REF}`,13.90,155.00,12,20,190,50,4.4,1120,"3-5 days","available",false,false,false,false,false,false),

  // ── MYPROTEIN ────────────────────────────────────────────────────────────────
  // SG
  G("mp-cb-sg-mp","MyProtein","Chocolate Brownie","SG","MyProtein SG",
    `https://www.myprotein.com/sg/protein-bars/layer-bar-chocolate-brownie${MYPROTEIN_REF}`,4.00,45.00,12,25,240,65,4.6,2890,"3-5 days","available",true,false,false,false,false,true),
  G("mp-cb-sg-shopee","MyProtein","Chocolate Brownie","SG","Shopee SG",
    `https://shope.ee/myprotein-choc-brownie${SHOPEE_REF}`,4.20,48.00,12,25,240,65,4.5,1670,"3-5 days","available",true,false,false,false,false,false),
  G("mp-sc-sg-mp","MyProtein","Salted Caramel","SG","MyProtein SG",
    `https://www.myprotein.com/sg/protein-bars/layer-bar-salted-caramel${MYPROTEIN_REF}`,4.00,45.00,12,24,235,65,4.7,3120,"3-5 days","available",true,false,false,false,false,true),
  G("mp-ccd-sg-mp","MyProtein","Choc Chip Cookie Dough","SG","MyProtein SG",
    `https://www.myprotein.com/sg/protein-bars/layer-bar-cookie-dough${MYPROTEIN_REF}`,4.00,45.00,12,25,238,65,4.5,1980,"3-5 days","available",true,false,false,false,false,false),
  G("mp-bc-sg-shopee","MyProtein","Biscuit & Cream","SG","Shopee SG",
    `https://shope.ee/myprotein-biscuit${SHOPEE_REF}`,4.20,48.00,12,24,232,65,4.4,1230,"3-5 days","available",true,false,false,false,false,false),
  G("mp-cb-sg-amazon","MyProtein","Chocolate Brownie","SG","Amazon",
    `https://www.amazon.com/dp/B00MYPR001?tag=${AMZ_TAG}`,4.60,52.00,12,25,240,65,4.6,2100,"7-14 days","available",true,false,false,false,false,false),

  // MY
  G("mp-cb-my-mp","MyProtein","Chocolate Brownie","MY","MyProtein MY",
    `https://www.myprotein.com/my/protein-bars/layer-bar-chocolate-brownie${MYPROTEIN_REF}`,14.50,160.00,12,25,240,65,4.6,4230,"3-5 days","available",true,false,false,false,false,true),
  G("mp-cb-my-shopee","MyProtein","Chocolate Brownie","MY","Shopee MY",
    `https://shopee.com.my/myprotein-choc-brownie${SHOPEE_REF}`,15.50,172.00,12,25,240,65,4.5,2340,"3-5 days","available",true,false,false,false,false,false),
  G("mp-sc-my-mp","MyProtein","Salted Caramel","MY","MyProtein MY",
    `https://www.myprotein.com/my/protein-bars/layer-bar-salted-caramel${MYPROTEIN_REF}`,14.50,160.00,12,24,235,65,4.7,3560,"3-5 days","available",true,false,false,false,false,true),
  G("mp-ccd-my-shopee","MyProtein","Choc Chip Cookie Dough","MY","Shopee MY",
    `https://shopee.com.my/myprotein-cookie-dough${SHOPEE_REF}`,15.50,172.00,12,25,238,65,4.5,1890,"3-5 days","available",true,false,false,false,false,false),
  G("mp-bc-my-lazada","MyProtein","Biscuit & Cream","MY","Lazada MY",
    `https://www.lazada.com.my/products/myprotein-biscuit${LAZADA_REF}`,14.90,165.00,12,24,232,65,4.4,1340,"4-6 days","available",true,false,false,false,false,false),
];

export const BRANDS = ["Grenade","Barebells","Quest","Pure Protein","MyProtein"] as const;
export const MARKETS: Market[] = ["SG","MY"];

export const FLAVORS_BY_BRAND: Record<string, string[]> = {
  "Grenade":      ["Chocolate Chip Cookie Dough","Peanut Nutter","Caramel Chaos","White Choc Cookie"],
  "Barebells":    ["Cookies & Cream","Caramel Cashew","Salty Peanut","White Choc Almond"],
  "Quest":        ["Chocolate Chip Cookie Dough","Double Chocolate Chunk","Peanut Butter Choc","Birthday Cake"],
  "Pure Protein": ["Chocolate Peanut Butter","Chewy Chocolate Chip","Peanut Butter"],
  "MyProtein":    ["Chocolate Brownie","Salted Caramel","Choc Chip Cookie Dough","Biscuit & Cream"],
};

export const BRAND_COLORS: Record<string, string> = {
  "Grenade":      "#E84D3D",
  "Barebells":    "#FF6B35",
  "Quest":        "#1A6EBF",
  "Pure Protein": "#8B5CF6",
  "MyProtein":    "#16A34A",
};

export const BRAND_LOGO_URLS: Record<string, string> = {
  "Grenade":      "https://www.google.com/s2/favicons?domain=grenade.com&sz=128",
  "Barebells":    "https://www.google.com/s2/favicons?domain=barebells.com&sz=128",
  "Quest":        "https://www.google.com/s2/favicons?domain=questnutrition.com&sz=128",
  "Pure Protein": "https://www.google.com/s2/favicons?domain=pureprotein.com&sz=128",
  "MyProtein":    "https://www.google.com/s2/favicons?domain=myprotein.com&sz=128",
};

export const CURRENCY: Record<Market, string> = {
  SG: "SGD",
  MY: "MYR",
};

export const CURRENCY_SYMBOL: Record<Market, string> = {
  SG: "S$",
  MY: "RM",
};

export const TOP_BESTSELLERS = listings
  .filter(l => l.bestseller)
  .reduce<BarListing[]>((acc, l) => {
    const key = `${l.brand}|${l.flavor}|${l.market}`;
    if (!acc.find(x => `${x.brand}|${x.flavor}|${x.market}` === key)) acc.push(l);
    return acc;
  }, [])
  .slice(0, 5);
