import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdminTabs from "@/components/admin/AdminTabs";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: vehicles, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching vehicles:", error);
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">
              Command Center
            </h1>
            <p className="text-zinc-400">
              Manage inventory &amp; social media — all in one place
            </p>
          </div>
          <Link
            href="/admin/add"
            className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Vehicle
          </Link>
        </div>

        {/* Tabbed Interface */}
        <AdminTabs vehicles={vehicles || []} />
      </div>
    </div>
  );
}
