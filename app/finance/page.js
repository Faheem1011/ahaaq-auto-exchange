import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Calculator, FileText, CheckCircle, CarFront, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Finance Centre | Ahaaq Auto Exchange",
  description: "Flexible car financing at Ahaaq Auto Exchange. Apply online, calculate your payments, value your trade-in, and learn about our protection plans.",
};

export default function FinanceCentre() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full py-40 bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-zinc-950 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-[0.3em] text-white uppercase">
            Ahaaq Auto Exchange
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            Flexible Car <span className="text-zinc-500">Financing</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium">
            Drive your dream car home today. We work with all credit profiles to secure the best rates and terms for our luxury inventory.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/finance/apply" className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-colors flex items-center justify-center w-full sm:w-auto">
              APPLY NOW
            </Link>
            <Link href="/finance/pre-qualify" className="px-8 py-4 bg-zinc-800 text-white font-bold rounded-full border border-zinc-700 hover:bg-zinc-700 transition-colors flex items-center justify-center w-full sm:w-auto">
              CHECK BUYING POWER
            </Link>
          </div>
        </div>
      </section>

      {/* Finance Tools Grid */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">Tools & Resources</h2>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 uppercase">Empower Your Purchase</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tool 1 */}
          <Link href="/finance/calculator" className="group block p-8 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-400 hover:shadow-xl transition-all">
            <Calculator className="w-10 h-10 text-zinc-900 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-zinc-900 mb-2">Payment Calculator</h4>
            <p className="text-zinc-600 mb-6 font-medium">Estimate your monthly payments, calculate your APR, and determine your loan terms instantly.</p>
            <span className="flex items-center gap-2 font-bold text-sm text-zinc-900 uppercase tracking-widest group-hover:underline">
              Calculate <ArrowRight size={16} />
            </span>
          </Link>

          {/* Tool 2 */}
          <Link href="/finance/trade-in" className="group block p-8 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-400 hover:shadow-xl transition-all">
            <CarFront className="w-10 h-10 text-zinc-900 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-zinc-900 mb-2">Value Your Trade</h4>
            <p className="text-zinc-600 mb-6 font-medium">Get a fair, market-accurate appraisal for your current vehicle in minutes to apply towards your purchase.</p>
            <span className="flex items-center gap-2 font-bold text-sm text-zinc-900 uppercase tracking-widest group-hover:underline">
              Get Appraisal <ArrowRight size={16} />
            </span>
          </Link>

          {/* Tool 3 */}
          <Link href="/finance/lease-vs-buy" className="group block p-8 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-400 hover:shadow-xl transition-all">
            <FileText className="w-10 h-10 text-zinc-900 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-zinc-900 mb-2">Lease vs. Buy</h4>
            <p className="text-zinc-600 mb-6 font-medium">Not sure whether to finance or lease? Compare the benefits of both options to make an informed decision.</p>
            <span className="flex items-center gap-2 font-bold text-sm text-zinc-900 uppercase tracking-widest group-hover:underline">
              Compare Options <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>

      {/* Why Finance With Us */}
      <section className="py-24 bg-zinc-950 text-white px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">The Ahaaq Advantage</h2>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Why Finance With Us?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="w-12 h-12 text-zinc-400" />
              <h4 className="text-xl font-bold">All Credit Types Welcome</h4>
              <p className="text-zinc-400 font-medium">We work with customers of all credit levels. Positive, zero, or negative credit score—your financial history is never an insurmountable hurdle.</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <ShieldCheck className="w-12 h-12 text-zinc-400" />
              <h4 className="text-xl font-bold">Secure Online Process</h4>
              <p className="text-zinc-400 font-medium">Our 100% online application is fast, simple, and strictly confidential. Get a decision in seconds without leaving your home.</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <CarFront className="w-12 h-12 text-zinc-400" />
              <h4 className="text-xl font-bold">Zero Down Options</h4>
              <p className="text-zinc-400 font-medium">Many of our lenders allow no down-payment financing. Drive away with no money out of pocket and delay your first payment up to 60 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">Common Questions</h2>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 uppercase">Financing FAQ</h3>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-bold text-zinc-900 mb-2">Can I finance a car with no money down?</h4>
            <p className="text-zinc-600 font-medium">Yes. Many lenders allow no down-payment financing. You can often delay your first payment for 30–60 days. We can offer similar deals or suggest manufacturer incentives if applicable.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-zinc-900 mb-2">Will applying for pre-qualification hurt my credit score?</h4>
            <p className="text-zinc-600 font-medium">No. We offer a soft-credit pre-qualification that does not affect your credit. This lets you see loan terms without a hard inquiry. Only the full finance application will perform a hard pull.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-zinc-900 mb-2">What documents do I need to bring?</h4>
            <p className="text-zinc-600 font-medium">Plan to bring proof of identity and income: a valid driving licence, proof of insurance, recent pay stubs or bank statements. If you have a trade-in, bring its title or registration and any loan payoff statements.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-zinc-900 mb-2">Can I add protection products with my financing?</h4>
            <p className="text-zinc-600 font-medium">Yes. We offer GAP insurance, extended warranties and maintenance plans. For example, GAP Insurance covers the difference between an insurance payout and your remaining loan balance if the car is totaled.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
