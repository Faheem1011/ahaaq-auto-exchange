import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TradeInForm from "@/components/TradeInForm";
import { Banknote, Clock } from "lucide-react";

export const metadata = {
  title: "Sell Your Car in Jacksonville, FL | Fast Cash Offer | AHAQ Auto Exchange",
  description: "Sell or trade your vehicle in Jacksonville, FL. We buy all makes and models with competitive cash offers and 15-minute appraisals at 6615 N Main St.",
  keywords: "sell my car Jacksonville, sell used car Jacksonville FL, trade in car Jacksonville, cash for cars Jacksonville FL",
};

export default function SellYourCarPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero & Form Grid */}
      <section className="pt-40 pb-24 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Selling Benefits */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-black/5 text-zinc-800 text-[10px] font-black uppercase tracking-widest border border-zinc-300 inline-block">
                Top Cash Paid • Jacksonville, FL
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-zinc-950 leading-tight">
                Sell Or Trade <br />
                <span className="text-zinc-500">Your Car Today</span>
              </h1>
              <p className="text-zinc-600 font-normal text-base sm:text-lg leading-relaxed">
                Skip the hassle of private party selling. Get a competitive, market-backed appraisal in minutes. Trade in towards any vehicle in our inventory or walk away with a check.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 p-5 bg-[#FAFAFA] rounded-2xl border border-zinc-200">
                <div className="w-12 h-12 rounded-xl bg-zinc-950 text-white flex items-center justify-center shrink-0">
                  <Banknote size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-zinc-950 uppercase">Competitive Market Value</h3>
                  <p className="text-xs text-zinc-500 font-normal">We utilize real-time Manheim and Black Book auction data to ensure you receive top dollar for your vehicle in North Florida.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-[#FAFAFA] rounded-2xl border border-zinc-200">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-zinc-950 uppercase">Fast 15-Minute Appraisals</h3>
                  <p className="text-xs text-zinc-500 font-normal">Submit your vehicle details online, receive your preliminary offer, and finalize in person with instant payment.</p>
                </div>
              </div>
            </div>

            {/* Location Address */}
            <div className="p-6 bg-zinc-950 text-white rounded-2xl border border-zinc-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">Appraisal Location</span>
              <p className="text-sm font-bold">6615 N Main St, Jacksonville, FL 32208</p>
              <p className="text-xs text-zinc-400 font-normal">Direct Contact: Bobby Ali • (904) 502-9709</p>
            </div>
          </div>

          {/* Right Column: Appraisal Form */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-black uppercase tracking-tight text-zinc-950 mb-6">
              Get Your Instant Cash Offer
            </h2>
            <TradeInForm />
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
