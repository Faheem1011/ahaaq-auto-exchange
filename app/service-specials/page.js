import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Tag, Scissors } from "lucide-react";

export const metadata = {
  title: "Auto Repair Coupons & Service Specials | Jacksonville, FL | AHAQ Auto Exchange",
  description: "Save on your next auto repair, synthetic oil change, brake job, and ceramic window tinting at AHAQ Auto Exchange in Jacksonville, FL.",
  keywords: "auto repair coupons Jacksonville, oil change coupon Jacksonville, brake service discount Jacksonville FL, window tint coupon",
};

export default async function ServiceSpecialsPage() {
  const supabase = await createClient();
  const { data: specials } = await supabase
    .from('service_specials')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  const fallbackSpecials = [
    {
      id: "1",
      title: "Synthetic Oil & Filter Service",
      tag: "OIL CHANGE",
      discount_headline: "$15 OFF",
      description: "Includes premium full synthetic oil up to 5 quarts, OEM oil filter replacement, and complimentary 21-point safety inspection.",
      promo_code: "SYNTH15",
      terms: "Most cars & light trucks. Taxes and disposal extra."
    },
    {
      id: "2",
      title: "Complete Brake System Service",
      tag: "BRAKES",
      discount_headline: "$30 OFF PER AXLE",
      description: "Pad replacement, rotor resurfacing or replacement, caliper inspection, and road test.",
      promo_code: "BRAKE30",
      terms: "Valid on front or rear brake service. Cannot combine with other offers."
    },
    {
      id: "3",
      title: "A/C System Performance Check & Recharge",
      tag: "A/C SERVICE",
      discount_headline: "$25 OFF",
      description: "Complete pressure check, leak detection inspection, and refrigerant recharge for maximum cooling.",
      promo_code: "COOL25",
      terms: "R134a systems. 1234yf systems may vary."
    },
    {
      id: "4",
      title: "Full Vehicle Ceramic Window Tinting",
      tag: "TINT SPECIAL",
      discount_headline: "$50 OFF FULL TINT",
      description: "High-heat ceramic film installation blocking 99% UV and up to 85% infrared solar heat.",
      promo_code: "CERAMIC50",
      terms: "Valid on complete 4-door vehicles. Rear window included."
    }
  ];

  const displayList = specials && specials.length > 0 ? specials : fallbackSpecials;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-8 bg-zinc-950 text-white text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-widest border border-amber-500/30">
            Exclusive Dealership &amp; Workshop Savings
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Auto Service Specials <br />
            <span className="text-amber-400">&amp; Repair Coupons</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Present these coupons on your smartphone or mention the promo code when scheduling your service appointment in Jacksonville, FL.
          </p>
        </div>
      </section>

      {/* Coupons Grid */}
      <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayList.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-3xl p-8 hover:border-amber-500 hover:bg-white hover:shadow-2xl transition-all relative flex flex-col justify-between space-y-6"
            >
              {/* Coupon Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-zinc-950 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                    <Tag size={11} /> {item.tag}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                    <Scissors size={13} /> Present At Check-in
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-3xl md:text-4xl font-black tracking-tight text-emerald-600 block">
                    {item.discount_headline}
                  </span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  {item.description}
                </p>

                {item.promo_code && (
                  <div className="p-3 bg-zinc-100 rounded-xl inline-block border border-zinc-200">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase block">Coupon Code</span>
                    <span className="text-sm font-mono font-black text-zinc-900">{item.promo_code}</span>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-zinc-200/60 space-y-2">
                <Link
                  href={`/book-service?promo=${item.promo_code || ''}`}
                  className="w-full py-3.5 bg-zinc-950 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest text-center transition-colors block"
                >
                  Schedule With This Coupon →
                </Link>
                {item.terms && (
                  <p className="text-[10px] text-zinc-400 text-center">{item.terms}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
