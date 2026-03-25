import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Plus, Trash2, Edit } from 'lucide-react';

import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching vehicles:', error);
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">Inventory Control Center</h1>
            <p className="text-zinc-400">Manage your dealership listings</p>
          </div>
          <Link 
            href="/admin/add" 
            className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Vehicle
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="py-4 px-6 text-sm font-medium text-zinc-400">Vehicle</th>
                <th className="py-4 px-6 text-sm font-medium text-zinc-400">Price</th>
                <th className="py-4 px-6 text-sm font-medium text-zinc-400">Mileage</th>
                <th className="py-4 px-6 text-sm font-medium text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-zinc-500">
                    No vehicles listed yet. Click &quot;Add Vehicle&quot; to get started!
                  </td>
                </tr>
              ) : null}
              {vehicles?.map(vehicle => (
                <tr key={vehicle.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      {vehicle.images?.[0] ? (
                        <div className="relative w-16 h-12 overflow-hidden rounded-lg">
                          <Image 
                            src={vehicle.images[0]} 
                            alt="Thumbnail" 
                            fill
                            className="object-cover" 
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs text-center border-2 border-dashed border-zinc-700">No Img</div>
                      )}
                      <div>
                        <div className="font-semibold text-white">{vehicle.year} {vehicle.make} {vehicle.model}</div>
                        <div className="text-sm text-zinc-500 font-mono">VIN: {vehicle.vin || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-zinc-300">${vehicle.price.toLocaleString()}</td>
                  <td className="py-4 px-6 text-zinc-400">{vehicle.mileage.toLocaleString()} mi</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <form action={async () => {
                        'use server';
                        const supabase = await createClient();
                        await supabase.from('vehicles').delete().eq('id', vehicle.id);
                      }}>
                        <button type="submit" className="text-red-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
