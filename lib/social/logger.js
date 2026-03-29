/**
 * lib/social/logger.js
 * Logs every post result to Supabase (FREE — included in free tier).
 */

export async function logPost(supabase, entry) {
  const { error } = await supabase.from("social_post_logs").insert([
    {
      vehicle_id: entry.vehicle_id || null,
      event_type: entry.event_type,
      caption: entry.caption,
      image_url: entry.image_url,
      facebook_post_id: entry.facebook_post_id,
      facebook_status: entry.facebook_post_id ? "success" : "failed",
      facebook_error: entry.facebook_error,
      instagram_post_id: entry.instagram_post_id,
      instagram_status: entry.instagram_post_id ? "success" : "failed",
      instagram_error: entry.instagram_error,
      tiktok_post_id: entry.tiktok_post_id,
      tiktok_status: entry.tiktok_post_id ? "success" : "failed",
      tiktok_error: entry.tiktok_error,
      posted_at: new Date().toISOString(),
    },
  ]);

  if (error) console.error("[Logger] Failed:", error.message);
}
