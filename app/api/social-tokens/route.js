import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { platform, access_token, config } = await req.json();

    // The refresh_token column is used to store unstructured JSON config
    const refresh_token = config ? JSON.stringify(config) : null;

    const { error } = await supabase
      .from("social_tokens")
      .upsert(
        {
          platform,
          access_token,
          refresh_token,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "platform" }
      );

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
