import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Wrench, Gauge, Disc, Zap, Flame, Wind, Battery, Activity, ShieldCheck, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "Certified Auto Repair & Mechanic in Jacksonville, FL | AHAQ Auto Exchange",
  description: "Complete auto repair services in Jacksonville, FL: engine diagnostics, brakes, transmission, A/C recharge, suspension, and maintenance at 6615 N Main St.",
  keywords: "auto repair Jacksonville FL, mechanic Jacksonville, brake repair Jacksonville, check engine light Jacksonville, car AC repair Jacksonville",
};

const SERVICES = [
  {
    slug: "engine-diagnostics",
    icon: Gauge,
    title: "Engine Diagnostics & Check Engine",
    desc: "Computerized OBD-II scans, sensor testing, misfire troubleshooting, and complete performance diagnostics.",
    popular: true
  },
  {
    slug: "brake-repair",
    icon: Disc,
    title: "Brake Repair & Rotor Service",
    desc: "Ceramic pad replacement, precision rotor resurfacing or replacement, caliper service, and fluid flushes.",
    popular: true
  },
  {
    slug: "oil-change",
    icon: Flame,
    title: "Full Synthetic Oil & Filter Service",
    desc: "High-performance motor oil up to 5 quarts, OEM filter replacement, and multi-point vehicle safety inspection.",
    popular: true
  },
  {
    slug: "ac-repair",
    icon: Wind,
    title: "A/C Recharge & Climate Control",
    desc: "Freon pressure test, leak detection with UV dye, compressor replacement, and cabin air filter servicing.",
    popular: true
  },
  {
    slug: "transmission-service",
    icon: Activity,
    title: "Transmission Service & Fluid Flush",
    desc: "Transmission fluid exchange, filter replacement, shift diagnostic, and clutch/torque converter inspection."
  },
  {
    slug: "suspension-repair",
    icon: Wrench,
    title: "Steering & Suspension Repair",
    desc: "Struts, shocks, control arms, ball joints, tie rods, wheel bearings, and precision 4-wheel alignment."
  },
  {
    slug: "battery-service",
    icon: Battery,
    title: "Battery & Alternator Service",
    desc: "Battery load testing, terminal cleaning, alternator output testing, and starter motor replacement."
  },
  {
    slug: "electrical-diagnostics",
    icon: Zap,
    title: "Electrical System Diagnostics",
    desc: "Wiring troubleshooting, power window/lock repairs, lighting systems, and computer module calibration."
  }
];

export default function AutoRepairHub() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-8 bg-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/15">
              Certified Mechanical Division • Jacksonville, FL
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
              Professional Auto Repair <br />
              <span className="text-zinc-400">&amp; Diagnostics</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              From check-engine light troubleshooting to complete brake overhauls, transmission flushes, and routine maintenance, trust our experienced technicians at <strong>6615 N Main St, Jacksonville, FL</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/book-service"
              className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl flex items-center gap-2"
            >
              <Wrench size={16} /> Schedule Repair Online
            </Link>
            <Link
              href="/service-specials"
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              View Repair Coupons
            </Link>
            <a
              href="tel:+19045029709"
              className="px-8 py-4 bg-transparent text-white border border-white/20 hover:bg-white/10 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Phone size={16} /> (904) 502-9709
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Full Workshop Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-950">
            Comprehensive Mechanical Services
          </h2>
          <p className="text-zinc-600 text-sm font-normal">
            Click any service below to view common symptoms, inspection process details, and schedule service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <Link
                key={svc.slug}
                href={`/auto-repair/${svc.slug}`}
                className="bg-[#FAFAFA] border border-zinc-200 rounded-3xl p-7 hover:border-black hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between group space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-zinc-950">
                      {svc.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    {svc.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200 text-xs font-black uppercase tracking-wider text-zinc-950 flex items-center justify-between">
                  <span>Learn More</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-black text-white px-6 md:px-8 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">ASE Certified Technicians</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Our mechanics undergo continuous training on modern domestic and foreign OBD-II diagnostic equipment.
            </p>
          </div>

          <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">Transparent Work Orders</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Track your vehicle&apos;s repair stages online in real-time. No surprise fees — you authorize all work before we proceed.
            </p>
          </div>

          <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center">
              <Wrench size={24} />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight">OEM &amp; Premium Parts</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              We install high-grade OEM or exact-fit warranty-backed replacement parts built for lasting durability.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
