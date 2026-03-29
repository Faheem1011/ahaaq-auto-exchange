import { createClient } from "@supabase/supabase-js";

// Uses service role to ensure it can always read the tokens
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function getPlatformToken(platform) {
  const { data, error } = await supabase
    .from("social_tokens")
    .select("*")
    .eq("platform", platform)
    .single();

  if (error || !data) return null;

  let config = {};
  if (data.refresh_token && data.refresh_token.startsWith("{")) {
    try {
      config = JSON.parse(data.refresh_token);
    } catch (e) {}
  }

  return {
    access_token: data.access_token,
    ...config,
  };
}
