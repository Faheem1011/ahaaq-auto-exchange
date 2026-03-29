/**
 * lib/social/tiktok.js — TikTok Content Posting API (FREE)
 * Uses PULL_FROM_URL — TikTok fetches your image directly from Supabase Storage.
 */

import { getPlatformToken } from "./db";

const TIKTOK = "https://open.tiktokapis.com/v2";

export async function postToTikTok({ caption, imageUrl }) {
  const ttData = await getPlatformToken("tiktok");
  const token = ttData?.access_token || process.env.TIKTOK_ACCESS_TOKEN;
  if (!token) throw new Error("TikTok credentials missing (check Settings tab or env vars)");

  const res = await fetch(`${TIKTOK}/post/publish/content/init/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      post_info: {
        title: caption.substring(0, 2200),
        privacy_level: "PUBLIC_TO_EVERYONE",
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
      },
      source_info: {
        source: "PULL_FROM_URL",
        photo_cover_index: 0,
        photo_images: [imageUrl],
      },
      media_type: "PHOTO",
      post_mode: "DIRECT_POST",
    }),
  });

  const data = await res.json();
  if (!res.ok || data.error?.code !== "ok") {
    throw new Error(`TikTok: ${JSON.stringify(data.error || data)}`);
  }

  const publishId = data.data?.publish_id;
  const result = await pollTikTok(publishId, token);

  console.log("[TikTok] Published:", publishId);
  return { id: result.publicaly_available_post_id || publishId };
}

async function pollTikTok(publishId, token, attempts = 15) {
  for (let i = 0; i < attempts; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const res = await fetch(`${TIKTOK}/post/publish/status/fetch/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ publish_id: publishId }),
    });
    const data = await res.json();
    if (data.data?.status === "PUBLISH_COMPLETE") return data.data;
    if (data.data?.status === "FAILED") {
      throw new Error(`TikTok failed: ${JSON.stringify(data.data.fail_reason)}`);
    }
  }
  throw new Error("TikTok timed out");
}
