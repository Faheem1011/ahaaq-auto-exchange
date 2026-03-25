-- Create finance_pre_qualifications table
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

-- Enable RLS
ALTER TABLE public.finance_pre_qualifications ENABLE ROW LEVEL SECURITY;

-- Allow public to insert (anyone can fill out the form)
CREATE POLICY "Enable insert for all users" ON public.finance_pre_qualifications FOR INSERT WITH CHECK (true);

-- Allow authenticated users to select (only dealership can see applications)
CREATE POLICY "Enable select for authenticated users only" ON public.finance_pre_qualifications FOR SELECT USING (auth.role() = 'authenticated');
