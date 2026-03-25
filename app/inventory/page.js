import { createClient } from '@/utils/supabase/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VehicleCard from '@/components/VehicleCard';
import { Filter, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Luxury Vehicle Inventory | Ahaaq Auto Exchange Jacksonville',
  description: 'Browse our exclusive collection of high-quality pre-owned luxury vehicles including Lexus, Toyota, BMW, and Mercedes-Benz in Jacksonville, FL.',
};

export default async function InventoryPage() {
  const supabase = await createClient();
  const { data: supabaseData, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching from Supabase:', error);
  }

  // Map supabase vehicles
  const mappedSupabaseVehicles = (supabaseData || []).map(v => ({
    id: v.id,
    slug: v.id, // URL slug is the UUID
    title: `${v.year} ${v.make} ${v.model}`,
    featuredImage: {
      node: {
        sourceUrl: v.images?.[0] || null
      }
    },
    vehicleDetails: {
      make: v.make,
      model: v.model,
      year: v.year,
      price: v.price,
      mileage: v.mileage,
      vin: v.vin
    }
  }));

  // Get vehicles from Supabase only
  const allVehicles = mappedSupabaseVehicles;

  // Optional: Remove duplicates by ID/slug if necessary
  const uniqueVehicles = Array.from(new Map(allVehicles.map(v => [v.id, v])).values());

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-40 lg:pt-48 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h1 className="text-sm font-bold tracking-[0.3em] text-zinc-500 uppercase">Our Collection</h1>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-none">
                PREMIUM <br/>
                <span className="text-zinc-400 uppercase">INVENTORY</span>
              </h2>
            </div>
            
            {/* Minimalist Search/Filter Placeholder */}
            <div className="flex gap-4">
              <div className="relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search vehicles..." 
                  className="pl-12 pr-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all text-sm font-medium w-64 uppercase tracking-widest"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-black tracking-widest text-zinc-900 hover:bg-zinc-100 transition-all uppercase">
                <Filter size={18} /> Filter
              </button>
            </div>
          </div>

          {/* Grid */}
          {uniqueVehicles?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {uniqueVehicles.map((vehicle) => (
                <VehicleCard key={vehicle?.id || vehicle?.slug} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="w-full h-96 flex flex-col items-center justify-center bg-zinc-50 rounded-[3rem] border border-zinc-200 border-dashed">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
                <Search size={32} className="text-zinc-300" />
              </div>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">No vehicles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
