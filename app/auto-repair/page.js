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
      <section className="pt-40 pb-20 px-6 md:px-8 bg-zinc-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/30">
              Certified Mechanical Division • Jacksonville, FL
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
              Professional Auto Repair <br />
              <span className="text-blue-400">&amp; Diagnostics</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed">
              From check-engine light troubleshooting to complete brake overhauls, transmission flushes, and routine maintenance, trust our experienced technicians at <strong>6615 N Main St, Jacksonville, FL</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/book-service"
              className="px-8 py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-950/40 flex items-center gap-2"
            >
              <Wrench size={16} /> Schedule Repair Online
            </Link>
            <Link
              href="/service-specials"
              className="px-8 py-4.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              🏷️ View Repair Coupons
            </Link>
            <Link
              href="/service/track"
              className="px-8 py-4.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Clock size={16} /> Track My Repair
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600">Full Mechanical Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900">
            Our Mechanical Services
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Click on any service below to explore symptoms, diagnostic procedures, and schedule your appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.slug}
                className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 hover:border-blue-500/50 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    {srv.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-200/60">
                  <Link
                    href={`/auto-repair/${srv.slug}`}
                    className="w-full py-2.5 bg-white group-hover:bg-blue-600 group-hover:text-white text-zinc-900 border border-zinc-200 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-colors block"
                  >
                    Service Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose AHAQ Auto Repair */}
      <section className="py-20 bg-zinc-50 px-6 md:px-8 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-zinc-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 uppercase">Transparent Estimates</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              We provide itemized digital estimates with labor and parts breakdown before starting any work. No surprise fees.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-zinc-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 uppercase">Real-Time Job Tracking</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              Track your vehicle&apos;s repair progress from checked-in to ready for pickup using our online Work Order tracker.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-zinc-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 uppercase">Direct WhatsApp Updates</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              Receive photos of inspected parts and quick repair status updates directly on your smartphone.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
