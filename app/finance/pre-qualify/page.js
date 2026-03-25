"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ShieldCheck, CheckCircle } from "lucide-react";

export default function PreQualify() {
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
            Get Pre-Qualified
          </h1>
          <p className="text-zinc-500 font-medium">
            See your financing options with a soft credit pull that will not affect your credit score. No SSN required.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full w-fit mx-auto border border-blue-200">
            <ShieldCheck size={16} /> No Impact on Credit Score
          </div>
        </div>

        {submitted ? (
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-12 text-center space-y-6">
            <CheckCircle className="w-16 h-16 text-zinc-900 mx-auto" />
            <h2 className="text-3xl font-black text-zinc-900 uppercase">Pre-Qualification Complete!</h2>
            <p className="text-zinc-600 font-medium">Great news! You pre-qualify for financing. A member of our concierge team will reach out with your specific rates and terms.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-50 border border-zinc-200 p-8 md:p-12 rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">First Name *</label>
                <input required type="text" className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Last Name *</label>
                <input required type="text" className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Email Address *</label>
                <input required type="email" className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Phone Number *</label>
                <input required type="tel" className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-zinc-700">Estimated Credit Score</label>
                <select className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900">
                  <option>Excellent (720+)</option>
                  <option>Good (680-719)</option>
                  <option>Fair (640-679)</option>
                  <option>Needs Work (Under 640)</option>
                  <option>I'm not sure</option>
                </select>
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full py-4 bg-zinc-950 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors tracking-widest uppercase">
                See My Options
              </button>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
