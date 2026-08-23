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
      <section className="pt-40 pb-20 px-6 md:px-8 bg-black text-white relative">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4 max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/15">
              Collision &amp; Body Shop Division • Jacksonville, FL
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
              Expert Collision Repair <br />
              <span className="text-zinc-400">&amp; Auto Body Refinishing</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
              Restoring your vehicle to pre-accident factory condition. From minor bumper scuffs and parking lot dings to full collision frame repair and computerized paint matching.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/body-shop/estimate"
              className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2"
            >
              <Camera size={16} /> Request Free Photo Estimate
            </Link>
            <Link
              href="/service/track"
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Clock size={16} /> Track Active Body Job
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
          <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Full Collision Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-950">
            Our Body Shop Services
          </h2>
          <p className="text-zinc-600 text-sm font-normal">
            Professional collision restoration and refinishing using OEM-certified components and computer-guided laser frame alignment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BODY_SHOP_SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={i}
                className="bg-[#FAFAFA] border border-zinc-200 rounded-3xl p-8 hover:border-black hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                    {svc.desc}
                  </p>
                </div>

                <Link
                  href="/body-shop/estimate"
                  className="text-xs font-black uppercase tracking-wider text-zinc-950 hover:underline flex items-center gap-1"
                >
                  Request Estimate <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4-Step Collision Process */}
      <section className="py-24 bg-black text-white px-6 md:px-8 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Streamlined Workflow</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              The 4-Step Repair Journey
            </h2>
            <p className="text-zinc-400 text-sm font-normal">
              How we take your vehicle from damaged to factory flawless at 6615 N Main St.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-8 space-y-4">
              <span className="text-2xl font-mono font-black text-zinc-600">01</span>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">Digital Appraisal</h3>
              <p className="text-xs text-zinc-400 font-normal">Submit photos or drop off vehicle for an itemized digital damage estimate.</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-8 space-y-4">
              <span className="text-2xl font-mono font-black text-zinc-600">02</span>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">Insurance Approval</h3>
              <p className="text-xs text-zinc-400 font-normal">We coordinate directly with your insurance adjuster to approve all repair items.</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-8 space-y-4">
              <span className="text-2xl font-mono font-black text-zinc-600">03</span>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">Precision Body &amp; Paint</h3>
              <p className="text-xs text-zinc-400 font-normal">Laser frame alignment, OEM panel fitting, and multi-layer clearcoat bake.</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-8 space-y-4">
              <span className="text-2xl font-mono font-black text-zinc-600">04</span>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">QC &amp; Delivery</h3>
              <p className="text-xs text-zinc-400 font-normal">Comprehensive safety road test, hand detail, and lifetime workmanship warranty.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
