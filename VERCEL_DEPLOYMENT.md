# Ahaaq Auto Exchange — Vercel Deployment & Live Setup Guide

## 1. Vercel Project Setup

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** $\rightarrow$ **Project**.
3. Import your GitHub repository: `Faheem1011/ahaaq-auto-exchange`.
4. **Framework Preset**: Next.js (automatically detected).
5. **Root Directory**: `./` (or `ahaaq-site` if importing from root).

---

## 2. Required Environment Variables for Vercel

In **Vercel Settings $\rightarrow$ Environment Variables**, configure your keys (from your local `.env.local`):

| Variable Name | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL (`https://duzuzlbvjaxbidrblwbh.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Public Key |
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_ANON_KEY` | Supabase Anonymous Public Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Secret Key (for server admin operations) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase Publishable Key |
| `SUPABASE_SECRET_KEY` | Supabase Secret Key |
| `POSTGRES_URL` | Pooled Connection String (Port 6543) |
| `POSTGRES_URL_NON_POOLING` | Direct Connection String (Port 5432) |
| `NEXT_PUBLIC_WORDPRESS_URL` | `https://backend.ahhaqautoexchange.net` |
| `FAUST_SECRET_KEY` | Faust Secret Key |

---

## 3. Global IP Access & Accessibility (Zero Restriction Policy)

Your website is fully configured to open **from every IP address worldwide with zero restrictions**:
- **No IP geoblocking or IP filtering**: Open and accessible to every mobile user, desktop user, and carrier network.
- **Supabase Row-Level Security (RLS)**:
  - `vehicles` table: Public `SELECT` allowed from any IP address.
  - `contact_submissions`: Public `INSERT` allowed so anyone can submit inquiries.
  - `finance_applications`: Public `INSERT` allowed for credit applications.
  - `trade_in_submissions`: Public `INSERT` allowed for trade-in appraisals.
  - `finance_pre_qualifications`: Public `INSERT` allowed for pre-qualifications.
- **Supabase Storage Bucket (`vehicle-images`)**: Set to **Public** with CDN edge distribution so vehicle photos load instantly in any country.
- **Next.js Image Domain Allowlist**: Configured in `next.config.ts` to support all Supabase subdomains and CDN sources.

---

## 4. Admin Access & Management

- **Admin Login Page**: `https://your-domain.vercel.app/admin/login`
- **Email**: `admin@ahaaq.com`
- **Password**: `AhaaqJax#2026`
