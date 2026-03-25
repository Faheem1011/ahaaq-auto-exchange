import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TradeInForm from "@/components/TradeInForm";
import { Banknote, ShieldCheck, Clock } from "lucide-react";

export const metadata = {
  title: "Sell Your Car in Jacksonville, FL | Cash Offer Today | Ahaaq Auto Exchange",
  description: "Get a certified cash offer for your car in Jacksonville. We buy all makes and models at Ahaaq Auto Exchange. Enter your VIN and get an appraisal in minutes.",
  keywords: "sell my car Jacksonville, trade in car Jacksonville FL, car appraisal Jacksonville, cash for cars Jacksonville",
};

export default function ValueTrade() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-40 pb-24 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Info */}
          <div>
            <div className="space-y-6 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-bold tracking-[0.3em] text-zinc-600 uppercase">
                Sell Your Car • Jacksonville, FL
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 uppercase leading-tight">
                Get Cash For <br />
                <span className="text-zinc-400">Your Car Today</span>
              </h1>
              <p className="text-zinc-600 font-medium text-lg max-w-lg leading-relaxed">
                Appraising vehicles across Jacksonville. We give you a competitive, market-backed offer in minutes. Trade-in or walk away with cash.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center shrink-0">
                  <Banknote className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 uppercase text-sm">Best Prices in Jax</h3>
                  <p className="text-zinc-500 text-sm font-medium">We use real-time market data to ensure you get top dollar for your vehicle in North Florida.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center shrink-0">
                  <Clock className="text-zinc-900" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 uppercase text-sm">Fast 15-Min Appraisal</h3>
                  <p className="text-zinc-500 text-sm font-medium">Submit your info, get your preliminary offer, and finalize in person in under 15 minutes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-zinc-900" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 uppercase text-sm">Certified Local Offer</h3>
                  <p className="text-zinc-500 text-sm font-medium">Your offer is valid for 7 days. No pressure, no obligations, just honest business in Jacksonville.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div>
            <TradeInForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
