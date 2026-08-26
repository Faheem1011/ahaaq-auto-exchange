import Navbar from "@/components/Navbar";
import VehicleCard from "@/components/VehicleCard";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { getVehicles } from "@/lib/graphql";
import { ArrowRight, MapPin, Wrench, Sparkles, Car, Clock, CheckCircle2, Banknote } from "lucide-react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

export const metadata = {
  title: "AHAQ Auto Exchange | Used Cars, Auto Repair & Window Tinting | Jacksonville, FL",
  description: "Jacksonville's premier all-in-one automotive center: quality pre-owned vehicles, certified mechanical auto repair, and window tinting at 6615 N Main St.",
  keywords: "used cars Jacksonville FL, auto repair Jacksonville, mechanic Jacksonville FL, window tint Jacksonville",
};

export default async function Home() {
  const vehicles = await getVehicles(6);
  
  // JSON-LD Local Business & Auto Repair Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "AHAQ Auto Exchange",
    "image": "https://ahhaqautoexchange.net/images/Jacksonville-ahaaq-hero-banner.webp",
    "@id": "https://ahhaqautoexchange.net",
    "url": "https://ahhaqautoexchange.net",
    "telephone": "+19045029709",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6615 N Main St",
      "addressLocality": "Jacksonville",
      "addressRegion": "FL",
      "postalCode": "32208",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.3879,
      "longitude": -81.6528
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "16:00"
      }
    ],
    "areaServed": "Jacksonville, FL",
    "description": "Complete automotive center in Jacksonville, FL offering quality used car sales, certified mechanical repairs, and window tinting."
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-white font-['Inter']">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION — LUXURY MINIMALIST MONOCHROME                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden pt-28 pb-16">
        {/* Background Image with Deep Contrast Dark Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
          style={{ backgroundImage: `url('/images/Jacksonville-ahaaq-hero-banner.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full flex flex-col items-start pt-12">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-black tracking-[0.25em] text-zinc-300 uppercase">
              <MapPin size={12} className="text-zinc-400" /> One-Stop Auto Powerhouse • Jacksonville, FL
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[0.95] uppercase">
              YOUR CAR. <br/>
              <span className="text-zinc-300">YOUR SERVICE.</span> <br/>
              <span className="text-zinc-400 text-4xl sm:text-6xl md:text-7xl">YOUR DEALER.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal max-w-2xl leading-relaxed">
              Quality pre-owned vehicles, certified mechanical auto repair, and professional window tinting — all under one roof in Jacksonville.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                href="/inventory" 
                className="group px-8 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl flex items-center gap-2"
              >
                <Car size={16} /> Shop Vehicles
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/book-service" 
                className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all border border-zinc-700 shadow-xl flex items-center gap-2"
              >
                <Wrench size={16} /> Book Service
              </Link>
            </div>

            {/* Live Repair Tracking Widget */}
            <div className="pt-6 w-full max-w-xl">
              <div className="p-4 bg-zinc-950/90 backdrop-blur-md rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center gap-3 shadow-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 shrink-0">
                  <Clock size={15} className="text-zinc-400" /> Track Your Repair:
                </div>
                <form action="/service/track" method="GET" className="flex-1 flex gap-2 w-full">
                  <input
                    type="text"
                    name="code"
                    placeholder="Enter Tracking Code (e.g. TRK-XXXXX) or Phone"
                    className="w-full px-3.5 py-2 rounded-xl bg-black border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider rounded-xl shrink-0 transition-colors cursor-pointer"
                  >
                    Track
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. THREE CORE DIVISIONS GRID                                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-black text-white px-6 md:px-8 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Complete Automotive Solutions</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Everything Your Vehicle Needs In Jacksonville
            </h2>
            <p className="text-zinc-400 text-sm font-normal">
              From purchasing your next reliable car to factory-spec mechanical maintenance and premium ceramic tinting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Division 1: Dealership */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-8 hover:border-white/30 transition-all flex flex-col justify-between group space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center">
                  <Car size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Division 01</span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mt-1">Vehicle Dealership</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  Carefully inspected pre-owned cars, SUVs, and trucks. Guaranteed credit approval with Credit Acceptance (DCX3C).
                </p>
                <ul className="space-y-1.5 text-xs text-zinc-300 font-medium">
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-400" /> Quality Checked Inventory</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-400" /> 100% Credit Approval Flow</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-400" /> Instant Cash Trade-In Appraisals</li>
                </ul>
              </div>
              <Link 
                href="/inventory" 
                className="w-full py-3 bg-zinc-900 group-hover:bg-white group-hover:text-black text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-colors block border border-zinc-800"
              >
                View Inventory →
              </Link>
            </div>

            {/* Division 2: Auto Repair */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-8 hover:border-white/30 transition-all flex flex-col justify-between group space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center">
                  <Wrench size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Division 02</span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mt-1">Mechanical Repair</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  Certified technicians handling engine diagnostics, brakes, transmission, air conditioning, suspension, and routine maintenance.
                </p>
                <ul className="space-y-1.5 text-xs text-zinc-300 font-medium">
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-400" /> Computerized Engine Diagnostics</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-400" /> Brake Service &amp; Rotors</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-400" /> A/C Recharges &amp; Climate Control</li>
                </ul>
              </div>
              <Link 
                href="/auto-repair" 
                className="w-full py-3 bg-zinc-900 group-hover:bg-white group-hover:text-black text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-colors block border border-zinc-800"
              >
                Explore Repair Services →
              </Link>
            </div>

            {/* Division 3: Window Tinting */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-8 hover:border-white/30 transition-all flex flex-col justify-between group space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center">
                  <Sparkles size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Division 03</span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mt-1">Window Tinting</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  Premium ceramic and carbon automotive window film blocking 99% of harmful UV rays and reducing extreme Florida heat.
                </p>
                <ul className="space-y-1.5 text-xs text-zinc-300 font-medium">
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-400" /> 99% UV Ray Protection</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-400" /> Up to 85% Infrared Heat Block</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-zinc-400" /> Clean Computer-Cut Installation</li>
                </ul>
              </div>
              <Link 
                href="/window-tinting" 
                className="w-full py-3 bg-zinc-900 group-hover:bg-white group-hover:text-black text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-colors block border border-zinc-800"
              >
                Tinting Options →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3. FEATURED INVENTORY SECTION                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FAFAFA] px-6 md:px-8 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">Hand-Selected Inventory</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-950 uppercase">
              Quality Cars In Jacksonville, FL
            </h2>
            <p className="text-zinc-600 text-sm max-w-xl mx-auto font-normal">
              Explore our current vehicle lineup. Every vehicle includes complete inspection records and Credit Acceptance financing.
            </p>
          </div>

          {vehicles?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle?.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center bg-white rounded-3xl border border-zinc-200 border-dashed">
              <p className="text-zinc-500 font-medium">No vehicles currently available. Please check back shortly.</p>
            </div>
          )}

          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/inventory" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-lg"
            >
              Browse All Inventory <ArrowRight size={15} />
            </Link>
            <Link 
              href="/sell-your-car" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-zinc-100 text-zinc-900 rounded-full font-black text-xs uppercase tracking-widest transition-colors border border-zinc-300"
            >
              <Banknote size={15} /> Value Your Trade
            </Link>
          </div>

          {/* Strategic AdSense / Dealer Spotlight Banner */}
          <div className="w-full mt-12">
            <AdBanner variant="horizontal" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 4. SERVICE SPECIALS & PROMOTIONS STRIP                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-black text-white px-6 md:px-8 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/15">
              Service Specials
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              Save On Your Next Auto Repair &amp; Maintenance
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl font-normal">
              Take advantage of our current oil change discounts, brake specials, and ceramic tint coupons in Jacksonville.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/service-specials"
              className="px-8 py-4 bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-xl"
            >
              View Service Coupons
            </Link>
            <Link
              href="/book-service"
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest rounded-full transition-all border border-zinc-700"
            >
              Schedule Service
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 5. JACKSONVILLE LOCAL SEO CONTENT SECTION                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white px-6 md:px-8 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Jacksonville, Florida Automotive Hub</span>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 uppercase">
              Your Trusted Automotive Partner In North Florida
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-600 text-sm font-normal leading-relaxed">
            <div className="p-7 bg-[#FAFAFA] rounded-2xl border border-zinc-200 space-y-3">
              <h3 className="text-base font-bold text-zinc-900 uppercase">Dealership &amp; Financing</h3>
              <p>
                Looking for a dependable vehicle in Jacksonville? AHAQ Auto Exchange provides an extensive inventory of inspected used vehicles with transparent pricing. Partnered with <strong>Credit Acceptance Corporation (Dealer ID: DCX3C)</strong>, we offer guaranteed credit approval programs for all credit backgrounds.
              </p>
            </div>
            <div className="p-7 bg-[#FAFAFA] rounded-2xl border border-zinc-200 space-y-3">
              <h3 className="text-base font-bold text-zinc-900 uppercase">Mechanical Repair &amp; Service Center</h3>
              <p>
                Whether you need a routine synthetic oil change, complete brake replacement, engine check light diagnosis, or scheduled automotive maintenance, our certified Jacksonville workshop is equipped with modern diagnostic scan tools and expert repair technicians.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </main>
  );
}
