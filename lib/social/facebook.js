/**
 * lib/social/facebook.js — Meta Graph API (100% FREE)
 * Posts photos to your Facebook Page using the Graph API.
 * No cost for organic posting — you only pay if you run paid ads.
 */

import { getPlatformToken } from "./db";

const GRAPH = "https://graph.facebook.com/v19.0";

export async function postToFacebook({ caption, imageUrl }) {
  const fbData = await getPlatformToken("facebook");
  const pageId = fbData?.page_id || process.env.FB_PAGE_ID;
  const token = fbData?.access_token || process.env.FB_PAGE_ACCESS_TOKEN;

  if (!pageId || !token) throw new Error("Facebook credentials missing (check Settings tab or env vars)");

  const res = await fetch(`${GRAPH}/${pageId}/photos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: imageUrl,
      caption,
      access_token: token,
      published: true,
    }),
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(`Facebook: ${JSON.stringify(data.error || data)}`);
  }

  console.log("[Facebook] Posted:", data.id);
  return { id: data.id };
}
