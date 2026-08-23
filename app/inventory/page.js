import { createClient } from '@/utils/supabase/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VehicleCard from '@/components/VehicleCard';
import { localVehicles } from '@/lib/localVehicles';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Quality Used Cars & Luxury Vehicles for Sale | Jacksonville, FL | Ahaaq Auto Exchange',
  description: 'Browse our complete inventory of quality used cars, sedans, SUVs, and luxury imports in Jacksonville, FL. Guaranteed financing, clean titles, and certified inspection.',
};

export default async function InventoryPage() {
  let vehicles = [];

  try {
    const supabase = await createClient();
    const { data: supabaseData, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && supabaseData && supabaseData.length > 0) {
      vehicles = supabaseData.map(v => ({
        id: v.id,
        slug: (v.slug || v.id || '').trim().replace(/\s+/g, '-'),
        title: `${v.year} ${v.make} ${v.model}`,
        status: v.status || 'available',
        tags: v.tags || [],
        featuredImage: {
          node: {
            sourceUrl: v.images?.[0] || '/placeholder-car.jpg',
            altText: `${v.year} ${v.make} ${v.model}`
          }
        },
        vehicleDetails: {
          make: v.make,
          model: v.model,
          year: v.year,
          price: v.price,
          mileage: v.mileage,
          vin: v.vin,
          status: v.status || 'available',
          tags: v.tags || [],
          bodyType: v.body_type || 'Sedan',
          transmission: v.transmission || 'Automatic',
          fuelType: v.fuel_type || 'Gasoline'
        }
      }));
    } else {
      vehicles = localVehicles;
    }
  } catch (err) {
    console.error('Error loading inventory:', err);
    vehicles = localVehicles;
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-28 sm:pt-36 lg:pt-44 pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-bold tracking-[0.25em] text-zinc-600 uppercase">
                Jacksonville, FL • Live Inventory
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-none">
                PREMIUM <br/>
                <span className="text-zinc-400 uppercase">COLLECTION</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 bg-zinc-50 px-4 py-2.5 sm:py-3 rounded-2xl border border-zinc-200">
                {vehicles.length} Vehicles in Stock
              </span>
            </div>
          </div>

          {/* Grid */}
          {vehicles?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {vehicles.map((vehicle) => (
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
