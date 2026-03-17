import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import VehicleCard from "@/components/VehicleCard";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { getVehicles } from "@/lib/graphql";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const vehicles = await getVehicles(6);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#FAFAFA]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center pt-20">
        <Hero3D />
        
        <div className="pointer-events-none relative z-10 max-w-7xl mx-auto px-8 w-full flex flex-col items-start justify-center">
          <div className="space-y-6 max-w-2xl bg-white/40 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-2xl shadow-zinc-200/50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/5 border border-zinc-900/10 text-xs font-semibold tracking-widest text-zinc-800 pointer-events-auto">
              PREMIUM CARS • BEST PRICE • PRE SALE SERVICES
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-zinc-900 leading-[1.1]">
              BUY ALL BEST <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-500">
                CARS
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-600 font-medium max-w-lg leading-relaxed mix-blend-multiply">
              Exceptional quality Toyota, Lexus, Mercedes, BMW, and more. Found at the best prices with start quotes from $0.
            </p>
            
            <div className="flex items-center gap-4 pt-4 pointer-events-auto">
              <Link href="/inventory" className="group flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white rounded-full font-semibold tracking-wide hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/20">
                BOOK NOW
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-full font-semibold tracking-wide hover:bg-zinc-50 transition-all shadow-sm">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Inventory Section */}
      <section className="relative w-full py-32 bg-white px-8 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">Featured Collection</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900">QUALITY CARS,<br/>UNBEATABLE PRICES</h3>
          </div>

          {vehicles?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle?.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center bg-zinc-50 rounded-3xl border border-zinc-200 border-dashed">
              <p className="text-zinc-500 font-medium">No vehicles currently available. Please check back later.</p>
            </div>
          )}

          <div className="mt-16">
            <Link href="/inventory" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-full font-bold tracking-wide transition-colors">
              VIEW ALL INVENTORY <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <AboutSection />
      <Footer />

    </main>
  );
}
