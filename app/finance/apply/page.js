'use client';

import { useState } from "react";
import { ShieldCheck, QrCode, Globe2, User, Mail, Phone, Car, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FinanceApply() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    vehiclePreference: "",
    language: "en"
  });
  const [loading, setLoading] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const englishUrl = "https://www.startyourcreditapproval.com/credit-application/DCX3C";
  const spanishUrl = "https://www.startyourcreditapproval.com/credit-application/DCX3C?lang=es";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLaunch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/financing/cta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourcePage: '/finance/apply',
          source: 'finance_apply_page',
          language: formData.language,
          customerName: formData.customerName.trim() || undefined,
          customerEmail: formData.customerEmail.trim() || undefined,
          customerPhone: formData.customerPhone.trim() || undefined
        })
      });

      const data = await res.json();
      const targetUrl = data?.redirectUrl || (
        formData.language === 'es' ? spanishUrl : englishUrl
      );

      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Error initiating application:', err);
      window.open(formData.language === 'es' ? spanishUrl : englishUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-44 pb-24 px-8 max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-black uppercase tracking-widest">
            <ShieldCheck size={14} /> Official Credit Acceptance Portal • Dealer Code: DCX3C
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 uppercase">
            Start Your Credit Approval
          </h1>
          <p className="text-zinc-600 font-medium max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Get approved online in minutes through our official Credit Acceptance system. Fast, confidential underwriting for all credit types in Jacksonville, FL.
          </p>
        </div>

        {/* Main Application Launcher Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl space-y-8">
          
          {/* Language Selection Bar */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Globe2 size={14} className="text-emerald-400" /> Select Application Language
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, language: 'en' })}
                className={`py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-wider border transition-all flex items-center justify-between ${
                  formData.language === 'en'
                    ? 'bg-white text-zinc-950 border-white shadow-xl'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span>🇺🇸 English Credit Application</span>
                {formData.language === 'en' && <CheckCircle2 size={16} className="text-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, language: 'es' })}
                className={`py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-wider border transition-all flex items-center justify-between ${
                  formData.language === 'es'
                    ? 'bg-white text-zinc-950 border-white shadow-xl'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span>🇪🇸 Solicitud de Crédito en Español</span>
                {formData.language === 'es' && <CheckCircle2 size={16} className="text-emerald-600" />}
              </button>
            </div>
          </div>

          {/* Optional Concierge Info Form */}
          <form onSubmit={handleLaunch} className="space-y-6 pt-4 border-t border-zinc-800/80">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 mb-1">
                Optional: Dealership Concierge Follow-Up
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                Provide your basic contact information so Bobby Ali and our finance team can assist your deal and reserve your vehicle upon approval.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full pl-9 pr-3 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="e.g. (904) 555-0199"
                    className="w-full pl-9 pr-3 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className="w-full pl-9 pr-3 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Vehicle of Interest</label>
                <div className="relative">
                  <Car size={14} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="text"
                    name="vehiclePreference"
                    value={formData.vehiclePreference}
                    onChange={handleChange}
                    placeholder="e.g. 2012 Hyundai Santa Fe"
                    className="w-full pl-9 pr-3 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              {loading ? (
                'Connecting to Credit Acceptance...'
              ) : formData.language === 'es' ? (
                <>Continuar a la Solicitud de Crédito <ArrowRight size={18} /></>
              ) : (
                <>Continue to Secure Credit Application <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          {/* Security and QR Controls */}
          <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
            >
              <QrCode size={16} className="text-emerald-400" />
              {showQr ? 'Hide Smartphone QR Code' : 'Scan & Apply on Your Mobile Phone'}
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <ShieldCheck size={16} className="text-emerald-400" />
              100% Confidential • Direct Credit Acceptance Processing
            </div>
          </div>

          {/* QR Code Expansion */}
          {showQr && (
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center gap-6 animate-in fade-in duration-200">
              <div className="w-28 h-28 bg-white rounded-xl p-2 flex items-center justify-center shrink-0 shadow-lg">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(formData.language === 'es' ? spanishUrl : englishUrl)}`}
                  alt="Credit Acceptance QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Scan to Open on Mobile Device
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Point your iPhone or Android camera at the QR code to open the Credit Acceptance application on your phone without typing the address.
                </p>
              </div>
            </div>
          )}

          {/* Compliance Notice */}
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-[11px] text-zinc-400 leading-relaxed space-y-1">
            <p className="font-bold text-zinc-300">Important Privacy &amp; Security Disclosure:</p>
            <p>
              When you click continue, you will be redirected to the secure Credit Acceptance platform (<code className="text-zinc-300">startyourcreditapproval.com</code>) under Dealership Code <code className="text-zinc-300">DCX3C</code>. Ahaaq Auto Exchange LLC does not collect, view, or store Social Security Numbers or bank account credentials on this website.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
