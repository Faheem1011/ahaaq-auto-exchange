-- Credit Acceptance Financing Leads & Integration Events Schema

-- 1. Create financing_leads table
CREATE TABLE IF NOT EXISTS public.financing_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Vehicle context (if started from vehicle page)
  vehicle_id text,
  vehicle_vin text,
  vehicle_title text,
  vehicle_price numeric,

  -- Customer info (if provided)
  customer_name text,
  customer_email text,
  customer_phone text,

  -- Application metadata
  preferred_language text DEFAULT 'en' NOT NULL,
  source text DEFAULT 'website' NOT NULL,
  source_page text,
  
  -- Internal Dealership Status
  status text DEFAULT 'new' NOT NULL,
  
  -- Credit Acceptance fields (provider references)
  credit_acceptance_reference text,
  credit_acceptance_status text,
  credit_acceptance_received_at timestamp with time zone,
  
  -- CRM / Follow-up
  notes text,
  assigned_admin_id text,
  last_contacted_at timestamp with time zone,
  next_follow_up_at timestamp with time zone,

  -- Marketing & Attribution
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  user_agent text
);

-- 2. Create integration_events table (Idempotency and provider audit log)
CREATE TABLE IF NOT EXISTS public.integration_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  provider text DEFAULT 'credit_acceptance' NOT NULL,
  event_id text,
  event_type text NOT NULL,
  received_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  processed_at timestamp with time zone,
  status text DEFAULT 'pending' NOT NULL,
  error_message text,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- 3. Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_financing_leads_created_at ON public.financing_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_financing_leads_status ON public.financing_leads(status);
CREATE INDEX IF NOT EXISTS idx_financing_leads_vehicle_id ON public.financing_leads(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_financing_leads_language ON public.financing_leads(preferred_language);
CREATE INDEX IF NOT EXISTS idx_integration_events_provider_event ON public.integration_events(provider, event_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.financing_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_events ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
DO $$ 
BEGIN
    -- Public / Anonymous can insert CTA leads
    DROP POLICY IF EXISTS "Public can insert financing leads" ON public.financing_leads;
    CREATE POLICY "Public can insert financing leads" ON public.financing_leads FOR INSERT TO public WITH CHECK (true);
    
    -- Authenticated users (admin) can read and update financing leads
    DROP POLICY IF EXISTS "Authenticated users can read financing leads" ON public.financing_leads;
    CREATE POLICY "Authenticated users can read financing leads" ON public.financing_leads FOR SELECT TO authenticated USING (true);
    
    DROP POLICY IF EXISTS "Authenticated users can update financing leads" ON public.financing_leads;
    CREATE POLICY "Authenticated users can update financing leads" ON public.financing_leads FOR UPDATE TO authenticated USING (true);

    DROP POLICY IF EXISTS "Authenticated users can delete financing leads" ON public.financing_leads;
    CREATE POLICY "Authenticated users can delete financing leads" ON public.financing_leads FOR DELETE TO authenticated USING (true);

    -- Integration events policies
    DROP POLICY IF EXISTS "Authenticated users can manage integration events" ON public.integration_events;
    CREATE POLICY "Authenticated users can manage integration events" ON public.integration_events FOR ALL TO authenticated USING (true);
END $$;
