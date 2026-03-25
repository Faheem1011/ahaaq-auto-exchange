"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { CarFront, CheckCircle } from "lucide-react";

export default function TradeInForm() {
  const [formData, setFormData] = useState({
    vin: "",
    mileage: "",
    condition: "Excellent (Like New)",
    name: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const supabase = createClient();
    const { error } = await supabase.from('trade_in_submissions').insert([{
      vin: formData.vin,
      mileage: parseInt(formData.mileage) || 0,
      condition: formData.condition,
      name: formData.name,
      email: formData.email,
      status: 'pending'
    }]);

    if (!error) {
      setSubmitted(true);
    } else {
      console.error('Error submitting trade-in:', error);
      alert('There was an error submitting your request. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-12 text-center space-y-6">
        <CheckCircle className="w-16 h-16 text-zinc-900 mx-auto" />
        <h2 className="text-3xl font-black text-zinc-900 uppercase">Appraisal Request Sent</h2>
        <p className="text-zinc-600 font-medium">Our appraisal experts in Jacksonville are analyzing the market data for your vehicle. We will contact you shortly with your certified offer.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-50 border border-zinc-200 p-8 md:p-12 rounded-3xl">
      {/* Vehicle Info */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2 uppercase tracking-wide">Vehicle Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-zinc-700">VIN (17 Characters) *</label>
            <input 
              required 
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              type="text" 
              maxLength={17} 
              className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 font-mono uppercase" 
              placeholder="ENTER YOUR VIN" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">Exact Mileage *</label>
            <input 
              required 
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              type="number" 
              className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
              placeholder="E.G. 45000" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">Condition</label>
            <select 
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
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
            <input 
              required 
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text" 
              className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
              placeholder="YOUR FULL NAME" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">Email *</label>
            <input 
              required 
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
              placeholder="EMAIL ADDRESS" 
            />
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button 
          disabled={loading}
          type="submit" 
          className="flex items-center justify-center gap-2 w-full py-4 bg-zinc-950 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors tracking-widest uppercase text-xs disabled:opacity-50"
        >
          {loading ? "PROCESSING..." : (
            <>
              <CarFront size={18} /> Get My Offer
            </>
          )}
        </button>
      </div>
    </form>
  );
}
