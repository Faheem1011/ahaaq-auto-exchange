process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import pg from 'pg';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const lines = env.split('\n');
const envVars = {};
for (const line of lines) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    envVars[match[1].trim()] = val;
  }
}

const pool = new pg.Pool({
  connectionString: envVars.POSTGRES_URL_NON_POOLING || envVars.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

const supabase = createClient(envVars.SUPABASE_URL, envVars.SUPABASE_SERVICE_ROLE_KEY);

async function runMigration() {
  const client = await pool.connect();
  console.log('Connected to PostgreSQL for database migration...');

  try {
    // 1. Alter vehicles table to add status, slug, tags, seo_title, seo_description, body_type, transmission, fuel_type
    console.log('Upgrading vehicles table schema...');
    await client.query(`
      ALTER TABLE public.vehicles 
        ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'available',
        ADD COLUMN IF NOT EXISTS slug TEXT,
        ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
        ADD COLUMN IF NOT EXISTS seo_title TEXT,
        ADD COLUMN IF NOT EXISTS seo_description TEXT,
        ADD COLUMN IF NOT EXISTS body_type TEXT DEFAULT 'Sedan',
        ADD COLUMN IF NOT EXISTS transmission TEXT DEFAULT 'Automatic',
        ADD COLUMN IF NOT EXISTS fuel_type TEXT DEFAULT 'Gasoline';

      -- Set default status for existing rows
      UPDATE public.vehicles SET status = 'available' WHERE status IS NULL;
      
      -- Create index on slug and status
      CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON public.vehicles(slug);
      CREATE INDEX IF NOT EXISTS idx_vehicles_status ON public.vehicles(status);
    `);
    console.log('✓ vehicles table upgraded successfully.');

    // 2. Ensure contact_submissions table exists and has all columns
    console.log('Ensuring contact_submissions table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.contact_submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'new'
      );
      ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Public can insert contact submissions" ON public.contact_submissions;
      CREATE POLICY "Public can insert contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Authenticated can manage contact submissions" ON public.contact_submissions;
      CREATE POLICY "Authenticated can manage contact submissions" ON public.contact_submissions TO authenticated USING (true);
    `);
    console.log('✓ contact_submissions ready.');

    // 3. Ensure finance_applications table has all required columns
    console.log('Ensuring finance_applications table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.finance_applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        ssn TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zip_code TEXT,
        zip TEXT,
        years_at_address INTEGER DEFAULT 0,
        monthly_income NUMERIC,
        income NUMERIC,
        employer TEXT,
        job_title TEXT,
        status TEXT DEFAULT 'pending'
      );
      
      ALTER TABLE public.finance_applications 
        ADD COLUMN IF NOT EXISTS zip_code TEXT,
        ADD COLUMN IF NOT EXISTS zip TEXT,
        ADD COLUMN IF NOT EXISTS years_at_address INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS monthly_income NUMERIC,
        ADD COLUMN IF NOT EXISTS income NUMERIC;

      ALTER TABLE public.finance_applications ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Public can insert finance applications" ON public.finance_applications;
      CREATE POLICY "Public can insert finance applications" ON public.finance_applications FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Authenticated can manage finance applications" ON public.finance_applications;
      CREATE POLICY "Authenticated can manage finance applications" ON public.finance_applications TO authenticated USING (true);
    `);
    console.log('✓ finance_applications ready.');

    // 4. Ensure finance_pre_qualifications table exists
    console.log('Ensuring finance_pre_qualifications table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.finance_pre_qualifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        estimated_credit_score TEXT NOT NULL,
        status TEXT DEFAULT 'pending'
      );
      ALTER TABLE public.finance_pre_qualifications ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Public can insert pre-qualification" ON public.finance_pre_qualifications;
      CREATE POLICY "Public can insert pre-qualification" ON public.finance_pre_qualifications FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Authenticated can manage pre-qualification" ON public.finance_pre_qualifications;
      CREATE POLICY "Authenticated can manage pre-qualification" ON public.finance_pre_qualifications TO authenticated USING (true);
    `);
    console.log('✓ finance_pre_qualifications ready.');

    // 5. Ensure trade_in_submissions table exists
    console.log('Ensuring trade_in_submissions table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.trade_in_submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
        vin TEXT,
        mileage INTEGER,
        condition TEXT,
        vehicle_year INTEGER,
        vehicle_make TEXT,
        vehicle_model TEXT,
        name TEXT,
        email TEXT,
        phone TEXT,
        status TEXT DEFAULT 'pending'
      );
      ALTER TABLE public.trade_in_submissions ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Public can insert trade-ins" ON public.trade_in_submissions;
      CREATE POLICY "Public can insert trade-ins" ON public.trade_in_submissions FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Authenticated can manage trade-ins" ON public.trade_in_submissions;
      CREATE POLICY "Authenticated can manage trade-ins" ON public.trade_in_submissions TO authenticated USING (true);
    `);
    console.log('✓ trade_in_submissions ready.');

    // 6. Ensure social_post_logs and social_tokens tables
    console.log('Ensuring social tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.social_post_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        vehicle_id UUID,
        event_type TEXT NOT NULL,
        caption TEXT,
        image_url TEXT,
        facebook_post_id TEXT,
        facebook_status TEXT DEFAULT 'pending',
        facebook_error TEXT,
        instagram_post_id TEXT,
        instagram_status TEXT DEFAULT 'pending',
        instagram_error TEXT,
        tiktok_post_id TEXT,
        tiktok_status TEXT DEFAULT 'pending',
        tiktok_error TEXT,
        posted_at TIMESTAMPTZ DEFAULT now(),
        created_at TIMESTAMPTZ DEFAULT now()
      );
      ALTER TABLE public.social_post_logs ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Authenticated can read social logs" ON public.social_post_logs;
      CREATE POLICY "Authenticated can read social logs" ON public.social_post_logs FOR SELECT TO authenticated USING (true);

      CREATE TABLE IF NOT EXISTS public.social_tokens (
        id SERIAL PRIMARY KEY,
        platform TEXT UNIQUE NOT NULL,
        access_token TEXT NOT NULL,
        refresh_token TEXT,
        expires_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ DEFAULT now()
      );
      ALTER TABLE public.social_tokens ENABLE ROW LEVEL SECURITY;
    `);
    console.log('✓ Social tables ready.');

    // 7. Update Admin user password
    console.log('Updating admin user password to AhaaqJax#2026 ...');
    const { data: usersData, error: listErr } = await supabase.auth.admin.listUsers();
    if (listErr) {
      console.error('Error listing users:', listErr);
    } else {
      const adminUser = usersData.users.find(u => u.email === 'admin@ahaaq.com');
      if (adminUser) {
        const { error: updateErr } = await supabase.auth.admin.updateUserById(adminUser.id, {
          password: 'AhaaqJax#2026',
          email_confirm: true
        });
        if (updateErr) {
          console.error('Error updating password:', updateErr);
        } else {
          console.log('✓ Admin user password successfully updated to: AhaaqJax#2026');
        }
      } else {
        console.log('Admin user not found, creating admin@ahaaq.com...');
        const { error: createErr } = await supabase.auth.admin.createUser({
          email: 'admin@ahaaq.com',
          password: 'AhaaqJax#2026',
          email_confirm: true
        });
        if (createErr) console.error('Error creating user:', createErr);
        else console.log('✓ Admin user created with password: AhaaqJax#2026');
      }
    }

    console.log('\n=======================================');
    console.log('ALL DATABASE MIGRATIONS COMPLETED 100%!');
    console.log('=======================================');
  } catch (err) {
    console.error('Migration failed with error:', err);
  } finally {
    client.release();
    pool.end();
  }
}

runMigration();
