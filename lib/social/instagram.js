/**
 * lib/social/instagram.js — Meta Graph API (100% FREE)
 * Two-step: create media container → wait for processing → publish
 */

import { getPlatformToken } from "./db";

const GRAPH = "https://graph.facebook.com/v19.0";

export async function postToInstagram({ caption, imageUrl }) {
  const igData = await getPlatformToken("instagram");
  const userId = igData?.user_id || process.env.IG_USER_ID;
  const token = igData?.access_token || process.env.IG_ACCESS_TOKEN;

  if (!userId || !token) throw new Error("Instagram credentials missing (check Settings tab or env vars)");

  // Step 1: create media container
  const cRes = await fetch(`${GRAPH}/${userId}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_url: imageUrl, caption, access_token: token }),
  });
  const cData = await cRes.json();
  if (!cRes.ok || cData.error) {
    throw new Error(`IG container: ${JSON.stringify(cData.error || cData)}`);
  }

  // Step 2: wait for container to finish processing
  await waitForContainer(cData.id, token);

  // Step 3: publish
  const pRes = await fetch(`${GRAPH}/${userId}/media_publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ creation_id: cData.id, access_token: token }),
  });
  const pData = await pRes.json();
  if (!pRes.ok || pData.error) {
    throw new Error(`IG publish: ${JSON.stringify(pData.error || pData)}`);
  }

  console.log("[Instagram] Published:", pData.id);
  return { id: pData.id };
}

async function waitForContainer(containerId, token, attempts = 10) {
  for (let i = 0; i < attempts; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const res = await fetch(
      `${GRAPH}/${containerId}?fields=status_code&access_token=${token}`
    );
    const data = await res.json();
    if (data.status_code === "FINISHED") return;
    if (data.status_code === "ERROR" || data.status_code === "EXPIRED") {
      throw new Error(`IG container status: ${data.status_code}`);
    }
  }
  throw new Error("IG container timed out");
}
