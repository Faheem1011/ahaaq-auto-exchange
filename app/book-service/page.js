"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Shield, Sparkles, Car, Clock, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import Link from "next/link";

const SERVICE_CATEGORIES = [
  { id: "auto_repair", label: "Mechanical Auto Repair", icon: Wrench, desc: "Diagnostics, brakes, engine, AC, suspension, electrical" },
  { id: "maintenance", label: "Routine Maintenance", icon: Car, desc: "Synthetic oil change, fluid flushes, filters, safety inspection" },
  { id: "diagnostics", label: "Check Engine Light & Diagnostics", icon: Wrench, desc: "Computer OBD-II scan, misfire & sensor troubleshooting" },
  { id: "body_shop", label: "Body Shop & Collision Appraisal", icon: Shield, desc: "Accident damage, bumpers, panel repair, paint matching" },
  { id: "window_tinting", label: "Ceramic Window Tinting", icon: Sparkles, desc: "High-heat rejection ceramic/carbon film installation" }
];

export default function BookServicePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: "auto_repair",
    serviceSubType: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    preferredContact: "phone",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleVin: "",
    vehicleMileage: "",
    symptoms: "",
    preferredDate: "",
    preferredTime: "morning"
  });

  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (id) => {
    setFormData({ ...formData, serviceType: id });
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/service/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        setBookingResult(data);
      } else {
        setErrorMsg(data.error || "Failed to schedule appointment. Please check your information.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please try again or call us directly at (904) 502-9709.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-12 px-6 md:px-8 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/15">
            Certified Service Department • Jacksonville, FL
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Schedule Your Service <br />
            <span className="text-zinc-400">&amp; Repair Online</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto font-normal">
            Book certified mechanical repairs, scheduled maintenance, body shop appraisals, or window tinting at <strong>6615 N Main St, Jacksonville, FL</strong>.
          </p>
        </div>
      </section>

      {/* Booking Wizard */}
      <section className="py-16 px-6 md:px-8 max-w-4xl mx-auto">
        {bookingResult ? (
          /* Confirmation Screen */
          <div className="bg-[#FAFAFA] border border-zinc-200 rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center mx-auto border border-zinc-200">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Appointment Request Received</span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950">
                You&apos;re All Set, {formData.customerName}!
              </h2>
              <p className="text-zinc-600 text-sm max-w-lg mx-auto font-normal leading-relaxed">
                Your service appointment request has been scheduled for <strong>{formData.preferredDate} ({formData.preferredTime})</strong>. Our service concierge will contact you to confirm your arrival window.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-zinc-200 inline-block text-left space-y-2 min-w-[280px]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">Booking Reference Number</span>
              <span className="text-2xl font-mono font-black text-zinc-950 block">{bookingResult.bookingNumber}</span>
              <span className="text-xs text-zinc-500 block">Location: 6615 N Main St, Jacksonville, FL 32208</span>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/service/track"
                className="px-8 py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
              >
                <Clock size={15} /> Track Repair Job
              </Link>
              <a
                href="https://wa.me/19045029709"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
              >
                <MessageSquare size={15} /> WhatsApp Service Concierge
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-[#FAFAFA] border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <div className={`flex items-center gap-2 text-xs font-bold ${step === 1 ? 'text-zinc-950' : 'text-zinc-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step === 1 ? 'bg-zinc-950 text-white' : 'bg-zinc-200 text-zinc-700'}`}>1</span>
                <span>Department</span>
              </div>
              <div className={`flex items-center gap-2 text-xs font-bold ${step === 2 ? 'text-zinc-950' : 'text-zinc-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step === 2 ? 'bg-zinc-950 text-white' : 'bg-zinc-200 text-zinc-700'}`}>2</span>
                <span>Vehicle &amp; Issues</span>
              </div>
              <div className={`flex items-center gap-2 text-xs font-bold ${step === 3 ? 'text-zinc-950' : 'text-zinc-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step === 3 ? 'bg-zinc-950 text-white' : 'bg-zinc-200 text-zinc-700'}`}>3</span>
                <span>Date &amp; Contact</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 bg-zinc-100 border border-zinc-300 rounded-2xl text-xs text-zinc-900 font-bold flex items-center gap-2">
                <AlertCircle size={16} /> {errorMsg}
              </div>
            )}

            {/* Step 1: Select Service Category */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-black uppercase tracking-tight text-zinc-950">
                    Select The Service You Need
                  </h2>
                  <p className="text-xs text-zinc-500 font-normal">Choose a department to proceed with your booking.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICE_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleServiceSelect(cat.id)}
                        className={`p-6 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-4 cursor-pointer hover:border-zinc-950 hover:bg-white hover:shadow-lg ${
                          formData.serviceType === cat.id
                            ? "bg-white border-zinc-950 ring-2 ring-zinc-950/20"
                            : "bg-white/80 border-zinc-200"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-zinc-950 uppercase">{cat.label}</h3>
                          <p className="text-xs text-zinc-500 mt-1 font-normal">{cat.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Vehicle & Symptoms */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-black uppercase tracking-tight text-zinc-950">
                    Vehicle Information &amp; Symptoms
                  </h2>
                  <p className="text-xs text-zinc-500 font-normal">Tell us about the vehicle and what symptoms you are experiencing.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Year *</label>
                    <input
                      required
                      type="number"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleChange}
                      placeholder="2019"
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Make *</label>
                    <input
                      required
                      type="text"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      placeholder="Toyota"
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Model *</label>
                    <input
                      required
                      type="text"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      placeholder="RAV4"
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Mileage (Approx)</label>
                    <input
                      type="number"
                      name="vehicleMileage"
                      value={formData.vehicleMileage}
                      onChange={handleChange}
                      placeholder="65,000"
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700">Describe Symptoms or Specific Repairs Needed</label>
                  <textarea
                    rows={4}
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    placeholder="E.g., Squeaking noise when braking, check engine light on, need synthetic oil change..."
                    className="w-full p-3.5 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.vehicleYear || !formData.vehicleMake || !formData.vehicleModel) {
                        setErrorMsg("Please enter the vehicle year, make, and model.");
                        return;
                      }
                      setErrorMsg("");
                      setStep(3);
                    }}
                    className="px-8 py-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Date & Customer Details */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-black uppercase tracking-tight text-zinc-950">
                    Preferred Date &amp; Your Contact Details
                  </h2>
                  <p className="text-xs text-zinc-500 font-normal">Select your desired appointment slot and where we should send confirmation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Preferred Appointment Date *</label>
                    <input
                      required
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 font-bold focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Preferred Time of Day *</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 font-bold focus:outline-none"
                    >
                      <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                      <option value="drop_off">Early Drop-Off (Keys in Drop Box)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-zinc-200">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Your Full Name *</label>
                    <input
                      required
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="Bobby Smith"
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      placeholder="(904) 502-9709"
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Email Address</label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      placeholder="bobby@example.com"
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-4 bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer"
                  >
                    {loading ? "Scheduling..." : "Confirm & Schedule Appointment"}
                  </button>
                </div>
              </form>
            )}

          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
