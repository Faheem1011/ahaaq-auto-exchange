import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, LayoutDashboard } from "lucide-react";
import AdminTabs from "@/components/admin/AdminTabs";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Safely fetch all core datasets with individual fallbacks so one missing table never breaks the dashboard
  let vehicles = [];
  let contactSubmissions = [];
  let financingLeads = [];
  let tradeIns = [];
  let preQuals = [];
  let serviceBookings = [];
  let bodyShopEstimates = [];
  let workOrders = [];
  let serviceSpecials = [];

  try {
    const results = await Promise.allSettled([
      supabase.from("vehicles").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("financing_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("trade_in_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("finance_pre_qualifications").select("*").order("created_at", { ascending: false }),
      supabase.from("service_bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("body_shop_estimates").select("*").order("created_at", { ascending: false }),
      supabase.from("work_orders").select("*").order("created_at", { ascending: false }),
      supabase.from("service_specials").select("*").order("display_order", { ascending: true })
    ]);

    if (results[0].status === "fulfilled" && results[0].value.data) vehicles = results[0].value.data;
    if (results[1].status === "fulfilled" && results[1].value.data) contactSubmissions = results[1].value.data;
    if (results[2].status === "fulfilled" && results[2].value.data) financingLeads = results[2].value.data;
    if (results[3].status === "fulfilled" && results[3].value.data) tradeIns = results[3].value.data;
    if (results[4].status === "fulfilled" && results[4].value.data) preQuals = results[4].value.data;
    if (results[5].status === "fulfilled" && results[5].value.data) serviceBookings = results[5].value.data;
    if (results[6].status === "fulfilled" && results[6].value.data) bodyShopEstimates = results[6].value.data;
    if (results[7].status === "fulfilled" && results[7].value.data) workOrders = results[7].value.data;
    if (results[8].status === "fulfilled" && results[8].value.data) serviceSpecials = results[8].value.data;
  } catch (err) {
    console.error("Admin dashboard data fetch error:", err);
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-3 border border-white/15">
              <LayoutDashboard size={12} /> Ultimate Dealership Command Center
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              AHAQ Auto Management
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mt-1">
              Live control over vehicles, service bookings, real-time repair tracking, Credit Acceptance financing leads, and social marketing.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/add"
              className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-xl font-black uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xl"
            >
              <Plus className="w-4 h-4" />
              Add Vehicle
            </Link>
            <AdminLogoutButton />
          </div>
        </div>

        {/* Tabbed Interface with Ultimate Control */}
        <AdminTabs 
          vehicles={vehicles} 
          contactSubmissions={contactSubmissions}
          financingLeads={financingLeads}
          tradeIns={tradeIns}
          preQuals={preQuals}
          serviceBookings={serviceBookings}
          bodyShopEstimates={bodyShopEstimates}
          workOrders={workOrders}
          serviceSpecials={serviceSpecials}
        />
      </div>
    </div>
  );
}
