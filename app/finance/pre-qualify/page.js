"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ShieldCheck, CheckCircle } from "lucide-react";

export default function PreQualify() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    creditScore: "Excellent (720+)"
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
    const { error } = await supabase.from('finance_pre_qualifications').insert([{
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      estimated_credit_score: formData.creditScore,
      status: 'pending'
    }]);

    if (!error) {
      setSubmitted(true);
    } else {
      console.error('Error submitting pre-qualification:', error);
      alert('There was an error submitting your request. Please try again.');
    }
    setLoading(false);
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
                <input 
                  required 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Last Name *</label>
                <input 
                  required 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text" 
                  className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Email Address *</label>
                <input 
                  required 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Phone Number *</label>
                <input 
                  required 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel" 
                  className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-zinc-700">Estimated Credit Score</label>
                <select 
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleChange}
                  className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                >
                  <option>Excellent (720+)</option>
                  <option>Good (680-719)</option>
                  <option>Fair (640-679)</option>
                  <option>Needs Work (Under 640)</option>
                  <option>I&apos;m not sure</option>
                </select>
              </div>
            </div>

            <div className="pt-6">
              <button 
                disabled={loading}
                type="submit" 
                className="w-full py-4 bg-zinc-950 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors tracking-widest uppercase disabled:opacity-50"
              >
                {loading ? "PROCESSING..." : "See My Options"}
              </button>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
