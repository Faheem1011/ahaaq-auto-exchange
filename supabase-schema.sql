-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create the Vehicles table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price integer NOT NULL,
  mileage integer NOT NULL,
  vin text NOT NULL,
  description text,
  "videoUrl" text,
  images text[] DEFAULT '{}'::text[]
);

-- Ensure VIN is unique if table already existed without it
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'vehicles_vin_key'
  ) THEN
    ALTER TABLE public.vehicles ADD CONSTRAINT vehicles_vin_key UNIQUE (vin);
  END IF;
END $$;

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies for Vehicles
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public read access to vehicles" ON public.vehicles;
    CREATE POLICY "Public read access to vehicles" ON public.vehicles FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "Authenticated users can manage vehicles" ON public.vehicles;
    CREATE POLICY "Authenticated users can manage vehicles" ON public.vehicles TO authenticated USING (true);
END $$;

-- 4. Create bucket for vehicle images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vehicle-images', 'vehicle-images', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Set up storage policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public access to vehicle images" ON storage.objects;
    CREATE POLICY "Public access to vehicle images" ON storage.objects FOR SELECT TO public USING ( bucket_id = 'vehicle-images' );
    
    DROP POLICY IF EXISTS "Authenticated users can upload vehicle images" ON storage.objects;
    CREATE POLICY "Authenticated users can upload vehicle images" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'vehicle-images' );
    
    DROP POLICY IF EXISTS "Authenticated users can delete vehicle images" ON storage.objects;
    CREATE POLICY "Authenticated users can delete vehicle images" ON storage.objects FOR DELETE TO authenticated USING ( bucket_id = 'vehicle-images' );
END $$;

-- 6. Create Contact Messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new'
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
    CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK ( true );
    
    DROP POLICY IF EXISTS "Authenticated users can read contact messages" ON public.contact_messages;
    CREATE POLICY "Authenticated users can read contact messages" ON public.contact_messages FOR SELECT TO authenticated USING ( true );
END $$;

-- 7. Create Finance Applications table
CREATE TABLE IF NOT EXISTS public.finance_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  ssn text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL,
  income numeric NOT NULL,
  employer text,
  job_title text,
  status text DEFAULT 'pending'
);

ALTER TABLE public.finance_applications ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Anyone can submit finance applications" ON public.finance_applications;
    CREATE POLICY "Anyone can submit finance applications" ON public.finance_applications FOR INSERT WITH CHECK ( true );
    
    DROP POLICY IF EXISTS "Authenticated users can read finance applications" ON public.finance_applications;
    CREATE POLICY "Authenticated users can read finance applications" ON public.finance_applications FOR SELECT TO authenticated USING ( true );
END $$;
