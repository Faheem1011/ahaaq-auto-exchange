"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function BodyShopEstimatePage() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleVin: "",
    damageDescription: "",
    accidentDate: "",
    isDrivable: "true",
    insuranceInvolved: "false",
    insuranceCompany: "",
    claimNumber: "",
    preferredAppointmentDate: "",
    customerNotes: ""
  });

  const [loading, setLoading] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/body-shop/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          isDrivable: formData.isDrivable === "true",
          insuranceInvolved: formData.insuranceInvolved === "true"
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedResult(data);
      } else {
        setErrorMsg(data.error || "Failed to submit estimate. Please check your information.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/15">
            Free Collision &amp; Body Appraisal
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Request A Body Shop <br />
            <span className="text-zinc-400">Damage Estimate</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Fill out your vehicle and damage details below. Our certified estimators will review your submission and provide an itemized repair appraisal.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="py-20 px-6 md:px-8 max-w-4xl mx-auto">
        {submittedResult ? (
          <div className="bg-[#FAFAFA] border border-zinc-200 rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center mx-auto border border-zinc-200">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Estimate Request Received</span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950">
                Thank You, {formData.customerName}!
              </h2>
              <p className="text-zinc-600 text-sm max-w-lg mx-auto font-normal">
                Your body shop estimate request has been submitted to our collision specialists at <strong>6615 N Main St, Jacksonville</strong>.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-zinc-200 inline-block text-left space-y-2 min-w-[280px]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">Estimate Reference Number</span>
              <span className="text-2xl font-mono font-black text-zinc-950 block">{submittedResult.estimateNumber}</span>
              <span className="text-xs text-zinc-500 block">Save this number to reference your appraisal when speaking with our team.</span>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/19045029709"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg"
              >
                Send Photos via WhatsApp
              </a>
              <Link
                href="/body-shop"
                className="px-8 py-4 bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 rounded-full font-black text-xs uppercase tracking-widest transition-all"
              >
                Back to Body Shop
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#FAFAFA] border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-10">
            
            {errorMsg && (
              <div className="p-4 bg-zinc-100 border border-zinc-300 rounded-2xl text-xs text-zinc-900 font-bold flex items-center gap-2">
                <AlertCircle size={16} /> {errorMsg}
              </div>
            )}

            {/* Step 1: Customer Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-200">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white text-xs font-black flex items-center justify-center">1</span>
                <h3 className="text-base font-black uppercase tracking-wider text-zinc-950">Your Contact Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700">Full Name *</label>
                  <input
                    required
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
                    className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Vehicle Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-200">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white text-xs font-black flex items-center justify-center">2</span>
                <h3 className="text-base font-black uppercase tracking-wider text-zinc-950">Vehicle Information</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700">Year</label>
                  <input
                    type="number"
                    name="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={handleChange}
                    placeholder="2018"
                    className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700">Make</label>
                  <input
                    type="text"
                    name="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={handleChange}
                    placeholder="Toyota"
                    className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700">Model</label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    placeholder="Camry SE"
                    className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700">VIN (Optional)</label>
                  <input
                    type="text"
                    name="vehicleVin"
                    value={formData.vehicleVin}
                    onChange={handleChange}
                    placeholder="17-Digit VIN"
                    className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950 uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Damage & Insurance */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-200">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white text-xs font-black flex items-center justify-center">3</span>
                <h3 className="text-base font-black uppercase tracking-wider text-zinc-950">Damage &amp; Insurance Details</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700">Describe the Damage &amp; Collision Areas *</label>
                  <textarea
                    required
                    rows={4}
                    name="damageDescription"
                    value={formData.damageDescription}
                    onChange={handleChange}
                    placeholder="E.g., Front bumper cracked, left fender dented, headlight broken from minor parking collision..."
                    className="w-full p-3.5 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Is the Vehicle Drivable?</label>
                    <select
                      name="isDrivable"
                      value={formData.isDrivable}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 font-bold focus:outline-none"
                    >
                      <option value="true">Yes — Vehicle Drives</option>
                      <option value="false">No — Needs Towing / Parked</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700">Insurance Claim?</label>
                    <select
                      name="insuranceInvolved"
                      value={formData.insuranceInvolved}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 font-bold focus:outline-none"
                    >
                      <option value="false">No (Customer Pay / Out of Pocket)</option>
                      <option value="true">Yes (Insurance Claim Involved)</option>
                    </select>
                  </div>

                  {formData.insuranceInvolved === "true" && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700">Insurance Carrier</label>
                      <input
                        type="text"
                        name="insuranceCompany"
                        value={formData.insuranceCompany}
                        onChange={handleChange}
                        placeholder="State Farm, GEICO, Progressive..."
                        className="w-full p-3 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Photo Tips Banner */}
            <div className="p-4 bg-zinc-100 rounded-2xl border border-zinc-200 text-xs text-zinc-700 space-y-1">
              <strong className="block font-black uppercase text-[11px] text-zinc-950">Photo Tip For Faster Estimates:</strong>
              <p>
                You can attach damage photos directly via WhatsApp to <strong>(904) 502-9709</strong> after submitting this form. Include wide angles and close-up views of scratches and dents.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? "Submitting Request..." : "Submit Body Shop Estimate Request"}
            </button>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
