-- ============================================================================
-- AHAQ AUTO EXCHANGE — COMPLETE WORKSHOP & AUTOMOTIVE PLATFORM SCHEMA
-- Covers: Service Bookings, Body Shop Estimates, Work Orders, Service Specials
-- ============================================================================

-- 1. SERVICE BOOKINGS (Online appointments for Repair, Maintenance, Tint, etc.)
CREATE TABLE IF NOT EXISTS public.service_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_number TEXT UNIQUE NOT NULL,
    service_type TEXT NOT NULL DEFAULT 'auto_repair', -- auto_repair, maintenance, diagnostics, body_shop, window_tinting, inspection, other
    service_sub_type TEXT, -- e.g. brake_repair, oil_change, ceramic_tint, etc.
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    preferred_contact TEXT DEFAULT 'phone', -- phone, email, whatsapp
    vehicle_year INTEGER,
    vehicle_make TEXT,
    vehicle_model TEXT,
    vehicle_vin TEXT,
    vehicle_mileage INTEGER,
    symptoms TEXT,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL, -- morning, afternoon, specific_time
    status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, in_progress, completed, cancelled
    assigned_technician TEXT,
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. BODY SHOP ESTIMATES (Collision & Bodywork appraisal requests with photos)
CREATE TABLE IF NOT EXISTS public.body_shop_estimates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    vehicle_year INTEGER,
    vehicle_make TEXT,
    vehicle_model TEXT,
    vehicle_vin TEXT,
    damage_description TEXT NOT NULL,
    accident_date DATE,
    is_drivable BOOLEAN DEFAULT TRUE,
    insurance_involved BOOLEAN DEFAULT FALSE,
    insurance_company TEXT,
    claim_number TEXT,
    photo_urls JSONB DEFAULT '[]'::jsonb,
    preferred_appointment_date DATE,
    status TEXT NOT NULL DEFAULT 'pending_review', -- pending_review, estimate_prepared, customer_approved, in_repair, completed, cancelled
    estimated_cost NUMERIC(10, 2),
    staff_notes TEXT,
    customer_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. WORK ORDERS / REPAIR JOBS (Live Job Cards for Customer Tracking & Shop Management)
CREATE TABLE IF NOT EXISTS public.work_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_order_number TEXT UNIQUE NOT NULL, -- e.g. AHAQ-2026-001001
    tracking_code TEXT UNIQUE NOT NULL, -- e.g. TRK-8F92A
    booking_id UUID REFERENCES public.service_bookings(id) ON DELETE SET NULL,
    estimate_id UUID REFERENCES public.body_shop_estimates(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    vehicle_title TEXT NOT NULL, -- e.g. 2018 Toyota Camry SE
    vehicle_vin TEXT,
    vehicle_mileage_in INTEGER,
    vehicle_mileage_out INTEGER,
    department TEXT NOT NULL DEFAULT 'mechanical', -- mechanical, body_shop, tinting, diagnostics
    primary_concern TEXT,
    status TEXT NOT NULL DEFAULT 'checked_in',
    -- Status progression:
    -- 'checked_in' -> 'inspection' -> 'estimate_pending' -> 'customer_approval_pending' 
    -- -> 'approved' -> 'parts_ordered' -> 'in_progress' -> 'quality_control' -> 'ready_for_pickup' -> 'completed' -> 'closed'
    progress_percentage INTEGER DEFAULT 10,
    technician_name TEXT,
    bay_number TEXT,
    labor_items JSONB DEFAULT '[]'::jsonb, -- [{ description, hours, rate, amount }]
    parts_items JSONB DEFAULT '[]'::jsonb, -- [{ partNumber, description, qty, price, amount }]
    subtotal_amount NUMERIC(10, 2) DEFAULT 0.00,
    tax_amount NUMERIC(10, 2) DEFAULT 0.00,
    total_amount NUMERIC(10, 2) DEFAULT 0.00,
    customer_approval_status TEXT DEFAULT 'pending', -- pending, approved, declined
    customer_approved_at TIMESTAMPTZ,
    estimated_completion TIMESTAMPTZ,
    actual_completion TIMESTAMPTZ,
    public_status_notes TEXT, -- Visible to customer in tracker
    internal_shop_notes TEXT, -- Private to technicians/staff
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SERVICE SPECIALS & PROMOTIONS (Coupons, discounts, oil change offers)
CREATE TABLE IF NOT EXISTS public.service_specials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    tag TEXT NOT NULL, -- e.g. 'BRAKES', 'OIL CHANGE', 'AC SERVICE', 'TINT'
    discount_headline TEXT NOT NULL, -- e.g. '$25 OFF', 'FREE INSPECTION'
    description TEXT NOT NULL,
    promo_code TEXT,
    terms TEXT,
    expires_at DATE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all workshop tables
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_shop_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_specials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can submit service bookings" ON public.service_bookings;
DROP POLICY IF EXISTS "Service role full access to bookings" ON public.service_bookings;
DROP POLICY IF EXISTS "Public can submit body shop estimates" ON public.body_shop_estimates;
DROP POLICY IF EXISTS "Service role full access to estimates" ON public.body_shop_estimates;
DROP POLICY IF EXISTS "Public can read work order by tracking code" ON public.work_orders;
DROP POLICY IF EXISTS "Service role full access to work orders" ON public.work_orders;
DROP POLICY IF EXISTS "Public read access to active specials" ON public.service_specials;
DROP POLICY IF EXISTS "Service role full access to specials" ON public.service_specials;

-- RLS Policies
-- 1. Service Bookings
CREATE POLICY "Public can submit service bookings"
ON public.service_bookings FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Service role full access to bookings"
ON public.service_bookings FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- 2. Body Shop Estimates
CREATE POLICY "Public can submit body shop estimates"
ON public.body_shop_estimates FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Service role full access to estimates"
ON public.body_shop_estimates FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- 3. Work Orders
CREATE POLICY "Public can read work order by tracking code"
ON public.work_orders FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Service role full access to work orders"
ON public.work_orders FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- 4. Service Specials
CREATE POLICY "Public read access to active specials"
ON public.service_specials FOR SELECT TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Service role full access to specials"
ON public.service_specials FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_service_bookings_status ON public.service_bookings(status);
CREATE INDEX IF NOT EXISTS idx_service_bookings_date ON public.service_bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_body_shop_estimates_status ON public.body_shop_estimates(status);
CREATE INDEX IF NOT EXISTS idx_work_orders_tracking ON public.work_orders(tracking_code);
CREATE INDEX IF NOT EXISTS idx_work_orders_number ON public.work_orders(work_order_number);
CREATE INDEX IF NOT EXISTS idx_work_orders_phone ON public.work_orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_work_orders_status ON public.work_orders(status);
