import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield, Sparkles, Paintbrush, Car, Camera, Phone, Clock, FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Collision Repair & Body Shop in Jacksonville, FL | AHAQ Auto Exchange",
  description: "Certified automotive body shop in Jacksonville, FL: collision repair, precision frame alignment, color-matched paint, dent & scratch removal at 6615 N Main St.",
  keywords: "body shop Jacksonville FL, collision repair Jacksonville, car paint Jacksonville, dent repair Jacksonville, auto body Jacksonville FL",
};

const BODY_SHOP_SERVICES = [
  {
    title: "Collision & Frame Repair",
    desc: "Complete structural rebuilding and computerized unibody laser alignment to factory safety specifications.",
    icon: Shield
  },
  {
    title: "Computerized Paint Matching",
    desc: "OEM paint formula matching with premium clear coats in our controlled downdraft spray and bake booth.",
    icon: Paintbrush
  },
  {
    title: "Bumper, Fender & Panel Replacement",
    desc: "Expert repair or replacement of damaged plastic bumpers, metal fenders, hoods, door skins, and quarter panels.",
    icon: Car
  },
  {
    title: "Dent & Scratch Removal",
    desc: "Precision paintless dent repair (PDR) for hail and door dings, plus deep scratch buffing and spot refinishing.",
    icon: Sparkles
  },
  {
    title: "Insurance Claim Coordination",
    desc: "We work directly with all major automotive insurance providers, managing adjusters, supplemental appraisals, and paperwork.",
    icon: FileText
  },
  {
    title: "Digital Damage Photo Estimates",
    desc: "Upload photos of your vehicle's damage from your smartphone and receive a fast preliminary repair estimate.",
    icon: Camera
  }
];

export default function BodyShopHub() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-8 bg-zinc-950 text-white relative">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4 max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-widest border border-amber-500/30">
              Collision &amp; Body Shop Division • Jacksonville, FL
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
              Expert Collision Repair <br />
              <span className="text-amber-400">&amp; Auto Body Refinishing</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed">
              Restoring your vehicle to pre-accident factory condition. From minor bumper scuffs and parking lot dings to full collision frame repair and computerized paint matching.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/body-shop/estimate"
              className="px-8 py-4.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-950/40 flex items-center gap-2"
            >
              <Camera size={16} /> Request Free Photo Estimate
            </Link>
            <Link
              href="/service/track"
              className="px-8 py-4.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Clock size={16} /> Track Active Body Job
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

      {/* Services Grid */}
      <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600">Full Collision Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900">
            Our Body Shop Services
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Professional collision restoration and refinishing using OEM-certified components and computer-guided laser frame alignment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BODY_SHOP_SERVICES.map((srv, i) => {
            const Icon = srv.icon;
            return (
              <div
                key={i}
                className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 hover:border-amber-500/50 hover:bg-white hover:shadow-xl transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                  {srv.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  {srv.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Step Repair Process */}
      <section className="py-20 bg-zinc-950 text-white px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">Hassle-Free Restoration</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              How Our Body Shop Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
              <span className="text-2xl font-black text-amber-400">01</span>
              <h3 className="font-bold text-white text-base">Photo / On-Site Estimate</h3>
              <p className="text-xs text-zinc-400">Upload damage photos online or bring your car to our Jacksonville workshop for a thorough appraisal.</p>
            </div>
            <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
              <span className="text-2xl font-black text-amber-400">02</span>
              <h3 className="font-bold text-white text-base">Insurance Approval</h3>
              <p className="text-xs text-zinc-400">We work directly with your insurance company to authorize OEM parts and coordinate claim paperwork.</p>
            </div>
            <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
              <span className="text-2xl font-black text-amber-400">03</span>
              <h3 className="font-bold text-white text-base">Precision Body &amp; Paint</h3>
              <p className="text-xs text-zinc-400">Frame alignment, panel replacement, and computerized color-matched paint in our spray booth.</p>
            </div>
            <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
              <span className="text-2xl font-black text-amber-400">04</span>
              <h3 className="font-bold text-white text-base">Quality Check &amp; Delivery</h3>
              <p className="text-xs text-zinc-400">Final alignment, detailing, and safety inspection before handing your keys back ready for the road.</p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/body-shop/estimate"
              className="inline-flex items-center gap-2 px-10 py-4.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-xl shadow-amber-950/50"
            >
              Start Free Online Estimate <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
