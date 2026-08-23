import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles, Shield, Sun, Eye, CheckCircle2, Phone } from "lucide-react";

export const metadata = {
  title: "Ceramic Window Tinting in Jacksonville, FL | AHAQ Auto Exchange",
  description: "High-heat rejection ceramic & carbon window tinting in Jacksonville, FL. Blocks 99% UV rays and up to 85% infrared heat at 6615 N Main St.",
  keywords: "window tinting Jacksonville FL, ceramic tint Jacksonville, car tinting Jacksonville, auto tint Jacksonville FL",
};

const TINT_PACKAGES = [
  {
    name: "Carbon Series",
    tag: "Clean Dark Look",
    price: "From $149",
    features: [
      "Deep black matte finish that won't fade or turn purple",
      "99% Harmful UV Ray Rejection",
      "Up to 45% Solar Heat & Infrared Rejection",
      "Zero signal interference with GPS, radio, or 5G",
      "Lifetime Delamination & Peeling Warranty"
    ],
    popular: false
  },
  {
    name: "Nano-Ceramic Ultra",
    tag: "Maximum Heat Rejection",
    price: "From $249",
    features: [
      "Advanced multi-layer ceramic nanoparticle construction",
      "99% UV-A and UV-B Radiation Blocking",
      "Up to 85% Infrared Solar Heat Rejection",
      "Crystal clear optical clarity day & night",
      "Keeps interior cockpit significantly cooler in Florida sun",
      "Lifetime Color-Stable & Bubble Warranty"
    ],
    popular: true
  },
  {
    name: "Front Windshield & Brow",
    tag: "Glare Reduction",
    price: "From $99",
    features: [
      "Clear 70% or 80% Ceramic windshield film",
      "Blocks intense dashboard glare and blinding sunset heat",
      "Dark sunstrip brow installation available",
      "Preserves leather dash from Florida UV cracking",
      "Seamless optical heat barrier"
    ],
    popular: false
  }
];

export default function WindowTintingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-8 bg-zinc-950 text-white relative">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4 max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-black uppercase tracking-widest border border-teal-500/30">
              Precision Window Film Division • Jacksonville, FL
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
              High-Heat Ceramic <br />
              <span className="text-teal-400">Window Tinting</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed">
              Beat the intense Florida heat. We install premium computer-cut ceramic and carbon window films blocking 99% UV rays and up to 85% solar heat at <strong>6615 N Main St, Jacksonville, FL</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/book-service?service=window-tinting"
              className="px-8 py-4.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-zinc-950 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-teal-950/40 flex items-center gap-2"
            >
              <Sparkles size={16} /> Book Tinting Appointment
            </Link>
            <Link
              href="/service-specials"
              className="px-8 py-4.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              🏷️ $50 OFF Full Tint Coupon
            </Link>
            <a
              href="tel:+19045029709"
              className="px-8 py-4.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all border border-white/20 flex items-center gap-2"
            >
              <Phone size={16} /> (904) 502-9709
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Row */}
      <section className="py-16 bg-zinc-900 text-white px-6 md:px-8 border-t border-b border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Sun size={22} />
            </div>
            <h3 className="font-bold text-sm uppercase">85% Solar Heat Block</h3>
            <p className="text-xs text-zinc-400">Significantly reduces interior cabin temperature on hot summer days.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Shield size={22} />
            </div>
            <h3 className="font-bold text-sm uppercase">99% UV Ray Protection</h3>
            <p className="text-xs text-zinc-400">Protects passenger skin and prevents leather dashboard fading &amp; cracking.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Eye size={22} />
            </div>
            <h3 className="font-bold text-sm uppercase">Enhanced Privacy &amp; Style</h3>
            <p className="text-xs text-zinc-400">Keeps valuables hidden from view and gives your vehicle a sleek profile.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Sparkles size={22} />
            </div>
            <h3 className="font-bold text-sm uppercase">Precision Plotter Cut</h3>
            <p className="text-xs text-zinc-400">Computer-cut patterns for exact glass fitment with zero hand-blade glass scratching.</p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-teal-600">Automotive Tint Packages</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900">
            Choose Your Tint Protection
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Available in all legal darkness shades (5%, 15%, 20%, 35%, 50%, 70%) with lifetime nationwide warranty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TINT_PACKAGES.map((pkg, i) => (
            <div
              key={i}
              className={`rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all ${
                pkg.popular
                  ? "bg-zinc-950 text-white border-2 border-teal-500 shadow-2xl scale-105"
                  : "bg-zinc-50 text-zinc-900 border border-zinc-200"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                    pkg.popular ? "bg-teal-500 text-zinc-950" : "bg-zinc-200 text-zinc-700"
                  }`}>
                    {pkg.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight">
                  {pkg.name}
                </h3>

                <div className="text-3xl font-black tracking-tight">
                  {pkg.price}
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-zinc-200/40 text-xs font-medium">
                  {pkg.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className={`shrink-0 mt-0.5 ${pkg.popular ? "text-teal-400" : "text-teal-600"}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/book-service?service=window-tinting"
                className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest text-center transition-all block ${
                  pkg.popular
                    ? "bg-teal-500 hover:bg-teal-400 text-zinc-950 shadow-lg"
                    : "bg-zinc-900 hover:bg-zinc-800 text-white"
                }`}
              >
                Book This Package
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
