# Protein Bar Finder — SG & MY

Compare protein bars across Shopee, Lazada, Amazon, iHerb, GNC, FairPrice and brand direct stores.
Prices refresh every 4 hours via affiliate APIs. Monetised via affiliate commissions.

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Hosting | Vercel (free tier to start) |
| Price refresh | Vercel Cron (every 4h) |
| Email (watchlist) | Resend |
| Affiliate programs | Amazon Associates · Shopee Affiliate · Lazada Open Platform · iHerb |

---

## Local setup

```bash
git clone <your-repo>
cd proteinbar
npm install
cp .env.example .env.local
# fill in your keys (see below)
npx prisma migrate dev
npm run dev
```

---

## Environment variables

Create `.env.local` with:

```env
# Database (Supabase free tier works)
DATABASE_URL=postgresql://user:password@host:5432/proteinbar

# Amazon Product Advertising API
AMAZON_ACCESS_KEY=
AMAZON_SECRET_KEY=
AMAZON_PARTNER_TAG=your-tag-20
AMAZON_MARKET=SG   # or US

# Shopee Affiliate
SHOPEE_APP_ID=
SHOPEE_SECRET=

# Lazada Open Platform
LAZADA_APP_KEY=
LAZADA_APP_SECRET=
LAZADA_AFFILIATE_ID=

# iHerb affiliate rcode
IHERB_RCODE=

# Cron security (random string, set same in Vercel env)
CRON_SECRET=

# Email (Resend)
RESEND_API_KEY=
```

---

## Affiliate sign-up links

| Platform | Sign-up URL | Commission |
|----------|------------|------------|
| Amazon Associates (SG) | https://affiliate-program.amazon.sg | 1–4% |
| Amazon Associates (US) | https://affiliate-program.amazon.com | 1–4% |
| Shopee Affiliate (SG) | https://affiliate.shopee.sg | 3–7% |
| Shopee Affiliate (MY) | https://affiliate.shopee.com.my | 3–7% |
| Lazada Open Platform | https://open.lazada.com | 3–7% |
| iHerb Affiliate | https://ca.iherb.com/info/affiliates | 5% |

---

## Price refresh flow

```
Vercel Cron (every 4h)
  → POST /api/refresh  (auth: Bearer CRON_SECRET)
    → for each bar: fetchLivePrice(retailerConfig)
      → Amazon PA-API / Shopee API / Lazada API / iHerb scrape
    → prisma.proteinBar.update({ priceBar, priceBox, status, rating })
    → if status changed to "available":
        → email all watchlist subscribers
        → mark watchlist.notified = true
```

---

## Adding new bars / brands

1. Add a row in `prisma/seed.ts` with all fields
2. Add retailer config in `src/app/api/route.ts` → `RETAILER_MAP`
3. Run `npx prisma db seed`

---

## Deploying to Vercel

```bash
vercel deploy
# Set all env vars in Vercel dashboard → Settings → Environment Variables
# Vercel Cron runs automatically from vercel.json
```

---

## Monetisation summary

Every retailer link in the UI is an affiliate link. Revenue model:
- **Per click that converts**: 3–7% of order value
- **Typical protein bar box**: SGD 40–120 → SGD 1.20–8.40 per conversion
- **Target**: 500 clicks/month → 50 conversions → ~SGD 150–250/month to start

Scale with: Google/Meta ads to the site, SEO-optimised brand/flavor pages, email newsletter for new products.
