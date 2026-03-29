-- ============================================================================
-- Ahaaq Auto Exchange — Social Media Automation Tables
-- Run this in Supabase SQL Editor (FREE tier).
-- ============================================================================

-- 1. Social Post Logs — tracks every automated and manual post
CREATE TABLE IF NOT EXISTS social_post_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ DEFAULT now(),
  vehicle_id    UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  event_type    TEXT NOT NULL,           -- INSERT, UPDATE, DELETE, MANUAL, MANUAL_COMPOSE
  caption       TEXT,
  image_url     TEXT,
  facebook_post_id  TEXT,
  facebook_error    TEXT,
  instagram_post_id TEXT,
  instagram_error   TEXT,
  tiktok_post_id    TEXT,
  tiktok_error      TEXT
);

-- Index for fast queries by vehicle and date
CREATE INDEX IF NOT EXISTS idx_social_logs_created
  ON social_post_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_logs_vehicle
  ON social_post_logs (vehicle_id);

-- Enable Realtime for the admin dashboard live feed
ALTER PUBLICATION supabase_realtime ADD TABLE social_post_logs;


-- 2. Social Tokens — stores access/refresh tokens per platform
CREATE TABLE IF NOT EXISTS social_tokens (
  platform      TEXT PRIMARY KEY,        -- 'facebook', 'instagram', 'tiktok'
  access_token  TEXT,
  refresh_token TEXT,
  expires_at    TIMESTAMPTZ,
  updated_at    TIMESTAMPTZ DEFAULT now()
);


-- 3. Row Level Security (FREE)
ALTER TABLE social_post_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_tokens    ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (admin) to read logs
CREATE POLICY "Authenticated users can read social logs"
  ON social_post_logs FOR SELECT
  TO authenticated USING (true);

-- Allow service role (API) to insert logs
CREATE POLICY "Service role can insert social logs"
  ON social_post_logs FOR INSERT
  TO service_role WITH CHECK (true);

-- Allow service role to manage tokens
CREATE POLICY "Service role can manage tokens"
  ON social_tokens FOR ALL
  TO service_role USING (true);

-- Allow authenticated users to view tokens (masked in UI)
CREATE POLICY "Authenticated users can read tokens"
  ON social_tokens FOR SELECT
  TO authenticated USING (true);


-- 4. pg_cron for daily token refresh (requires pg_cron extension enabled)
-- Uncomment and adjust URL once deployed:
--
-- SELECT cron.schedule(
--   'daily-token-refresh',
--   '0 3 * * *',
--   $$
--   SELECT net.http_post(
--     url := 'https://YOUR-DOMAIN.vercel.app/api/refresh-tokens',
--     headers := '{"x-cron-secret": "YOUR_CRON_SECRET"}'::jsonb,
--     body := '{}'::jsonb,
--     timeout_milliseconds := 10000
--   );
--   $$
-- );


-- ============================================================================
-- SETUP COMPLETE
-- ============================================================================
