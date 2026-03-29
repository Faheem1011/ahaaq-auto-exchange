/**
 * /api/vehicle-webhook — Supabase Webhook Handler
 * Auto-posts to Facebook + Instagram + TikTok when vehicles are added/updated/deleted.
 * Next.js App Router format.
 */

import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { postToFacebook } from "@/lib/social/facebook";
import { postToInstagram } from "@/lib/social/instagram";
import { postToTikTok } from "@/lib/social/tiktok";
import { generateCaption, buildImageUrl } from "@/lib/social/content";
import { logPost } from "@/lib/social/logger";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

function verifySignature(rawBody, signature) {
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-supabase-signature");

  if (!verifySignature(rawBody, signature)) {
    console.error("[Webhook] Invalid signature — rejected");
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Respond immediately — Supabase webhook has a short timeout
  const response = Response.json({ received: true });

  // Run automation async after responding
  const { type, record, old_record } = payload;
  const vehicle = type === "DELETE" ? old_record : record;

  if (!vehicle) return response;
  if (vehicle.status === "draft" || vehicle.status === "reserved") return response;

  try {
    const eventType =
      type === "INSERT" ? "new" : type === "DELETE" ? "sold" : "updated";

    const caption = generateCaption(vehicle, eventType);
    const imageUrl = buildImageUrl(vehicle);

    const [fb, ig, tt] = await Promise.allSettled([
      postToFacebook({ vehicle, caption, imageUrl }),
      postToInstagram({ vehicle, caption, imageUrl }),
      postToTikTok({ vehicle, caption, imageUrl }),
    ]);

    await logPost(supabase, {
      vehicle_id: vehicle.id,
      event_type: type,
      caption,
      image_url: imageUrl,
      facebook_post_id: fb.status === "fulfilled" ? fb.value?.id : null,
      facebook_error: fb.status === "rejected" ? String(fb.reason) : null,
      instagram_post_id: ig.status === "fulfilled" ? ig.value?.id : null,
      instagram_error: ig.status === "rejected" ? String(ig.reason) : null,
      tiktok_post_id: tt.status === "fulfilled" ? tt.value?.id : null,
      tiktok_error: tt.status === "rejected" ? String(tt.reason) : null,
    });

    console.log(
      `[Automation] Done — FB:${fb.status} IG:${ig.status} TT:${tt.status}`
    );
  } catch (err) {
    console.error("[Automation] Unexpected error:", err);
  }

  return response;
}
