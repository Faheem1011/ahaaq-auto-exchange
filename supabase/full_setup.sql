-- COMDENSED SUPABASE SETUP FOR AHAAQ AUTO EXCHANGE

-- 1. TRADE-INS TABLE
CREATE TABLE IF NOT EXISTS public.trade_ins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    vehicle_year INTEGER,
    vehicle_make TEXT,
    vehicle_model TEXT,
    mileage INTEGER,
    condition TEXT,
    vin TEXT,
    client_name TEXT,
    client_email TEXT,
    client_phone TEXT,
    status TEXT DEFAULT 'pending'::text
);
ALTER TABLE public.trade_ins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON public.trade_ins FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only" ON public.trade_ins FOR SELECT USING (auth.role() = 'authenticated');

-- 2. FINANCE APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.finance_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    ssn TEXT, -- Should be encrypted in a real production environment
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    years_at_address INTEGER,
    employer TEXT,
    job_title TEXT,
    monthly_income NUMERIC,
    status TEXT DEFAULT 'pending'::text
);
ALTER TABLE public.finance_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON public.finance_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only" ON public.finance_applications FOR SELECT USING (auth.role() = 'authenticated');

-- 3. FINANCE PRE-QUALIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.finance_pre_qualifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    estimated_credit_score TEXT NOT NULL,
    status TEXT DEFAULT 'pending'::text NOT NULL
);
ALTER TABLE public.finance_pre_qualifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON public.finance_pre_qualifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only" ON public.finance_pre_qualifications FOR SELECT USING (auth.role() = 'authenticated');

-- 4. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new'::text
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only" ON public.contact_submissions FOR SELECT USING (auth.role() = 'authenticated');

-- 5. VEHICLES TABLE (LATEST SCHEMA)
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price INTEGER NOT NULL,
    mileage INTEGER NOT NULL,
    vin TEXT,
    description TEXT,
    videoUrl TEXT,
    images TEXT[] DEFAULT '{}'::TEXT[]
);
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read for all" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users" 
  ON public.vehicles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
