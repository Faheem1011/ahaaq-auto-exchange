'use client';

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ShieldCheck, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FinanceApply() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ssn: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    yearsAtAddress: "",
    employer: "",
    jobTitle: "",
    monthlyIncome: ""
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
    const { error } = await supabase.from('finance_applications').insert([{
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      ssn: formData.ssn,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zipCode,
      years_at_address: parseInt(formData.yearsAtAddress) || 0,
      employer: formData.employer,
      job_title: formData.jobTitle,
      monthly_income: parseFloat(formData.monthlyIncome) || 0,
      status: 'pending'
    }]);

    if (!error) {
      setSubmitted(true);
    } else {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-40 pb-24 px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 uppercase">
            Finance Application
          </h1>
          <p className="text-zinc-500 font-medium">
            Fill out our secure online form. It takes less than 5 minutes to get approved for your next luxury vehicle.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-green-700 bg-green-50 px-4 py-2 rounded-full w-fit mx-auto border border-green-200">
            <ShieldCheck size={16} /> 100% Secure & Confidential
          </div>
        </div>

        {submitted ? (
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-12 text-center space-y-6">
            <CheckCircle className="w-16 h-16 text-zinc-900 mx-auto" />
            <h2 className="text-3xl font-black text-zinc-900 uppercase">Application Received</h2>
            <p className="text-zinc-600 font-medium">Thank you for applying. Our finance team is reviewing your application and will contact you shortly with your approval options.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-50 border border-zinc-200 p-8 md:p-12 rounded-3xl">
            {/* Personal Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2 uppercase tracking-wide">Personal Information</h2>
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
                  <label className="text-sm font-bold text-zinc-700">Social Security Number *</label>
                  <input 
                    required 
                    name="ssn"
                    value={formData.ssn}
                    onChange={handleChange}
                    type="password" 
                    placeholder="XXX-XX-XXXX" 
                    className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2 uppercase tracking-wide">Residential Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-zinc-700">Street Address *</label>
                  <input 
                    required 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700">City *</label>
                  <input 
                    required 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700">State *</label>
                  <input 
                    required 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700">Zip Code *</label>
                  <input 
                    required 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700">Years at Address</label>
                  <input 
                    name="yearsAtAddress"
                    value={formData.yearsAtAddress}
                    onChange={handleChange}
                    type="number" 
                    className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                  />
                </div>
              </div>
            </div>

            {/* Employment */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2 uppercase tracking-wide">Employment & Income</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700">Employer Name</label>
                  <input 
                    name="employer"
                    value={formData.employer}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700">Job Title</label>
                  <input 
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-zinc-700">Gross Monthly Income *</label>
                  <input 
                    required 
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    type="number" 
                    className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flex items-start gap-3 mb-8">
                <input required type="checkbox" className="mt-1 w-5 h-5 accent-zinc-900" />
                <p className="text-xs text-zinc-600 leading-relaxed">
                  By submitting this application, I authorize Ahaaq Auto Exchange to investigate my credit history and obtain credit reports. I also consent to receive communications regarding my application via SMS, email, or phone. (Privacy Notice & Terms)
                </p>
              </div>
              <button 
                disabled={loading}
                type="submit" 
                className="w-full py-4 bg-zinc-950 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors tracking-widest uppercase disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
