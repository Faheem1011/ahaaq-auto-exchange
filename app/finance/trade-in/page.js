"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { CarFront, CheckCircle } from "lucide-react";

export default function ValueTrade() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-40 pb-24 px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 uppercase">
            Value Your Trade
          </h1>
          <p className="text-zinc-500 font-medium">
            Get top dollar for your current vehicle. Tell us about your car and we'll provide a certified offer valid for 7 days or 250 miles.
          </p>
        </div>

        {submitted ? (
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-12 text-center space-y-6">
            <CheckCircle className="w-16 h-16 text-zinc-900 mx-auto" />
            <h2 className="text-3xl font-black text-zinc-900 uppercase">Appraisal Request Sent</h2>
            <p className="text-zinc-600 font-medium">Our appraisal experts are analyzing the market data for your vehicle. We will contact you via email shortly with your offer.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-50 border border-zinc-200 p-8 md:p-12 rounded-3xl">
            {/* Vehicle Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2 uppercase tracking-wide">Vehicle Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-zinc-700">VIN (17 Characters) *</label>
                  <input required type="text" maxLength={17} className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 font-mono uppercase" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700">Exact Mileage *</label>
                  <input required type="number" className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700">Condition</label>
                  <select className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900">
                    <option>Excellent (Like New)</option>
                    <option>Good (Minor wear)</option>
                    <option>Fair (Noticeable defects)</option>
                    <option>Rough (Requires repairs)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2 uppercase tracking-wide">Contact Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700">Name *</label>
                  <input required type="text" className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700">Email *</label>
                  <input required type="email" className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-950 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors tracking-widest uppercase">
                <CarFront size={20} /> Get My Offer
              </button>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
