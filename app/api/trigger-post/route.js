/**
 * /api/trigger-post — Manual re-post endpoint
 * Protected by Supabase Auth JWT (FREE).
 * Call from admin panel to manually post any vehicle to all platforms.
 */

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

export async function POST(request) {
  // Auth check using Supabase JWT (FREE)
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json({ error: "Missing auth token" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const anonClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const {
    data: { user },
    error: authError,
  } = await anonClient.auth.getUser(token);

  if (authError || !user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { vehicleId } = body;
  if (!vehicleId) {
    return Response.json({ error: "vehicleId required" }, { status: 400 });
  }

  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single();

  if (error || !vehicle) {
    return Response.json({ error: "Vehicle not found" }, { status: 404 });
  }

  const caption = generateCaption(vehicle, "new");
  const imageUrl = buildImageUrl(vehicle);

  const [fb, ig, tt] = await Promise.allSettled([
    postToFacebook({ vehicle, caption, imageUrl }),
    postToInstagram({ vehicle, caption, imageUrl }),
    postToTikTok({ vehicle, caption, imageUrl }),
  ]);

  await logPost(supabase, {
    vehicle_id: vehicle.id,
    event_type: "MANUAL",
    caption,
    image_url: imageUrl,
    facebook_post_id: fb.status === "fulfilled" ? fb.value?.id : null,
    facebook_error: fb.status === "rejected" ? String(fb.reason) : null,
    instagram_post_id: ig.status === "fulfilled" ? ig.value?.id : null,
    instagram_error: ig.status === "rejected" ? String(ig.reason) : null,
    tiktok_post_id: tt.status === "fulfilled" ? tt.value?.id : null,
    tiktok_error: tt.status === "rejected" ? String(tt.reason) : null,
  });

  return Response.json({
    facebook: fb.status,
    instagram: ig.status,
    tiktok: tt.status,
  });
}
