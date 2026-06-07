/**
 * src/app/api/bars/route.ts
 * GET /api/bars  — returns all bars with optional filtering
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const brand  = searchParams.get("brand")  || undefined;
  const market = searchParams.get("market") || undefined;
  const halal  = searchParams.get("halal")  === "true" ? true : undefined;
  const vegan  = searchParams.get("vegan")  === "true" ? true : undefined;
  const keto   = searchParams.get("keto")   === "true" ? true : undefined;

  const bars = await prisma.proteinBar.findMany({
    where: {
      ...(brand  && { brand }),
      ...(market && { market }),
      ...(halal  && { halal: true }),
      ...(vegan  && { vegan: true }),
      ...(keto   && { keto: true }),
    },
    orderBy: { brand: "asc" },
  });

  return NextResponse.json(bars);
}

/**
 * src/app/api/watchlist/route.ts
 * POST /api/watchlist  — subscribe to stock notification
 */
// import { prisma } from "@/lib/prisma";
export async function POST_watchlist(req: NextRequest) {
  const { barId, email } = await req.json();
  if (!barId || !email) {
    return NextResponse.json({ error: "barId and email required" }, { status: 400 });
  }

  await prisma.watchlist.upsert({
    where: { barId_email: { barId, email } },
    update: {},
    create: { barId, email },
  });

  return NextResponse.json({ ok: true });
}

/**
 * src/app/api/refresh/route.ts
 * POST /api/refresh  — triggered by Vercel Cron every 4h
 * Authorization: Bearer $CRON_SECRET
 */
export async function POST_refresh(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fetchLivePrice } = await import("@/lib/fetchers");

  // Retailer config map — populate with real IDs from each platform's affiliate dashboard
  const RETAILER_MAP: Record<string, Parameters<typeof fetchLivePrice>[0]> = {
    "bar_grenade_sg_shopee":    { type: "shopee", itemId: "SHOPEE_ITEM_ID", shopId: "SHOP_ID", market: "SG" },
    "bar_grenade_sg_amazon":    { type: "amazon", asin: "B00GRENADE1" },
    "bar_barebells_sg_shopee":  { type: "shopee", itemId: "SHOPEE_ITEM_ID_2", shopId: "SHOP_ID_2", market: "SG" },
    "bar_quest_sg_iherb":       { type: "iherb", sku: "que-19348" },
    "bar_quest_my_lazada":      { type: "lazada", itemId: "LAZADA_ITEM_ID" },
    // add all bar IDs here...
  };

  const results: { id: string; ok: boolean; error?: string }[] = [];

  for (const [barId, config] of Object.entries(RETAILER_MAP)) {
    try {
      const patch = await fetchLivePrice(config);
      await prisma.proteinBar.update({
        where: { id: barId },
        data: { ...patch, lastUpdated: new Date() },
      });
      results.push({ id: barId, ok: true });

      // Notify watchlist subscribers if item came back in stock
      if (patch.status === "available") {
        await notifyWatchlist(barId);
      }
    } catch (err) {
      results.push({ id: barId, ok: false, error: String(err) });
    }
  }

  return NextResponse.json({ refreshed: results.length, results });
}

async function notifyWatchlist(barId: string) {
  const subs = await prisma.watchlist.findMany({
    where: { barId, notified: false },
    include: { bar: true },
  });

  for (const sub of subs) {
    // Send email via Resend / SendGrid / SES
    // await sendEmail(sub.email, sub.bar.brand, sub.bar.flavor, sub.bar.affiliateUrl);
    await prisma.watchlist.update({
      where: { id: sub.id },
      data: { notified: true },
    });
  }
}
