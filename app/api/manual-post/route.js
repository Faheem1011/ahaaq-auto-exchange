/**
 * /api/manual-post — Custom post composer endpoint
 * Allows admin to compose and publish custom posts to selected platforms.
 * Images uploaded to Supabase Storage (FREE).
 * Protected by Supabase Auth JWT.
 */

import { createClient } from "@supabase/supabase-js";
import { postToFacebook } from "@/lib/social/facebook";
import { postToInstagram } from "@/lib/social/instagram";
import { postToTikTok } from "@/lib/social/tiktok";
import { logPost } from "@/lib/social/logger";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  // Auth check
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
  const { caption, imageUrl, platforms } = body;

  if (!caption || !imageUrl) {
    return Response.json(
      { error: "caption and imageUrl required" },
      { status: 400 }
    );
  }

  const selectedPlatforms = platforms || {
    facebook: true,
    instagram: true,
    tiktok: true,
  };

  // Only post to selected platforms
  const promises = [];
  if (selectedPlatforms.facebook) {
    promises.push(
      postToFacebook({ caption, imageUrl }).catch((e) => {
        throw e;
      })
    );
  } else {
    promises.push(Promise.resolve({ id: null, skipped: true }));
  }

  if (selectedPlatforms.instagram) {
    promises.push(
      postToInstagram({ caption, imageUrl }).catch((e) => {
        throw e;
      })
    );
  } else {
    promises.push(Promise.resolve({ id: null, skipped: true }));
  }

  if (selectedPlatforms.tiktok) {
    promises.push(
      postToTikTok({ caption, imageUrl }).catch((e) => {
        throw e;
      })
    );
  } else {
    promises.push(Promise.resolve({ id: null, skipped: true }));
  }

  const [fb, ig, tt] = await Promise.allSettled(promises);

  await logPost(supabase, {
    vehicle_id: null,
    event_type: "MANUAL_COMPOSE",
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
    facebook:
      fb.status === "fulfilled"
        ? fb.value?.skipped
          ? "skipped"
          : "success"
        : "failed",
    instagram:
      ig.status === "fulfilled"
        ? ig.value?.skipped
          ? "skipped"
          : "success"
        : "failed",
    tiktok:
      tt.status === "fulfilled"
        ? tt.value?.skipped
          ? "skipped"
          : "success"
        : "failed",
  });
}
