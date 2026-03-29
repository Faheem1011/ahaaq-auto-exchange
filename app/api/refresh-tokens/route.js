/**
 * /api/refresh-tokens — Daily token refresh
 * Called by Supabase pg_cron (FREE) at 3 AM daily.
 * Refreshes Facebook (60-day) and TikTok (24-hour) tokens.
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  // Verify the cron secret
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {};

  // ── Refresh Facebook token ──────────────────────────────────────────
  try {
    const fbRes = await fetch(
      `https://graph.facebook.com/oauth/access_token` +
        `?grant_type=fb_exchange_token` +
        `&client_id=${process.env.FB_APP_ID}` +
        `&client_secret=${process.env.FB_APP_SECRET}` +
        `&fb_exchange_token=${process.env.FB_PAGE_ACCESS_TOKEN}`
    );
    const fbData = await fbRes.json();

    if (fbData.access_token) {
      await supabase.from("social_tokens").upsert(
        {
          platform: "facebook",
          access_token: fbData.access_token,
          expires_at: new Date(
            Date.now() + fbData.expires_in * 1000
          ).toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "platform" }
      );
      results.facebook = "refreshed";
    } else {
      results.facebook = `error: ${JSON.stringify(fbData.error)}`;
    }
  } catch (err) {
    results.facebook = `exception: ${err.message}`;
  }

  // ── Refresh TikTok token ────────────────────────────────────────────
  try {
    const { data: ttRow } = await supabase
      .from("social_tokens")
      .select("refresh_token")
      .eq("platform", "tiktok")
      .single();

    if (!ttRow?.refresh_token) {
      results.tiktok = "no refresh_token stored — skipped";
    } else {
      const ttRes = await fetch(
        "https://open.tiktokapis.com/v2/oauth/token/",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_key: process.env.TIKTOK_CLIENT_KEY,
            client_secret: process.env.TIKTOK_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: ttRow.refresh_token,
          }),
        }
      );
      const ttData = await ttRes.json();

      if (ttData.data?.access_token) {
        await supabase.from("social_tokens").upsert(
          {
            platform: "tiktok",
            access_token: ttData.data.access_token,
            refresh_token: ttData.data.refresh_token,
            expires_at: new Date(
              Date.now() + ttData.data.expires_in * 1000
            ).toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "platform" }
        );
        results.tiktok = "refreshed";
      } else {
        results.tiktok = `error: ${JSON.stringify(ttData)}`;
      }
    }
  } catch (err) {
    results.tiktok = `exception: ${err.message}`;
  }

  console.log("[Token Refresh]", results);
  return Response.json(results);
}
