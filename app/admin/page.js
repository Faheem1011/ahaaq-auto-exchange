import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdminTabs from "@/components/admin/AdminTabs";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch all core datasets concurrently
  const [
    { data: vehicles },
    { data: contactSubmissions },
    { data: financingLeads },
    { data: tradeIns },
    { data: preQuals }
  ] = await Promise.all([
    supabase.from("vehicles").select("*").order("created_at", { ascending: false }),
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
    supabase.from("financing_leads").select("*").order("created_at", { ascending: false }),
    supabase.from("trade_in_submissions").select("*").order("created_at", { ascending: false }),
    supabase.from("finance_pre_qualifications").select("*").order("created_at", { ascending: false })
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest mb-2 border border-white/10">
              Dealership Command Center
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Ahaaq Auto Management
            </h1>
            <p className="text-zinc-400 text-sm">
              Live inventory control, customer inquiries, finance applications, and social automation.
            </p>
          </div>
          
          <Link
            href="/admin/add"
            className="bg-white text-black hover:bg-zinc-200 px-6 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-2xl text-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Vehicle
          </Link>
        </div>

        {/* Tabbed Interface */}
        <AdminTabs 
          vehicles={vehicles || []} 
          contactSubmissions={contactSubmissions || []}
          financingLeads={financingLeads || []}
          tradeIns={tradeIns || []}
          preQuals={preQuals || []}
        />
      </div>
    </div>
  );
}
