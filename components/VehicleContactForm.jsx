"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { CheckCircle, Send } from "lucide-react";

export default function VehicleContactForm({ vehicleTitle }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I am interested in the ${vehicleTitle}. Please provide more information.`
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
    const { error } = await supabase.from('contact_submissions').insert([{
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `[Vehicle Inquiry: ${vehicleTitle}] ${formData.message}`
    }]);

    if (!error) {
      setSubmitted(true);
    } else {
      console.error('Error:', error);
      alert('Error sending message. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div id="contact" className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 text-center space-y-4">
        <CheckCircle size={48} className="mx-auto text-zinc-900" />
        <h3 className="text-xl font-bold text-zinc-900 uppercase">Inquiry Received</h3>
        <p className="text-sm text-zinc-500 font-medium tracking-tight">
          We&apos;ve received your inquiry for the {vehicleTitle}. A specialist will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div id="contact" className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-zinc-900 tracking-tighter uppercase mb-2">Inquire About This Vehicle</h3>
        <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase">{vehicleTitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-zinc-400 tracking-widest uppercase px-1">Full Name</label>
          <input 
            required 
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text" 
            className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-400 tracking-widest uppercase px-1">Email</label>
            <input 
              required 
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-400 tracking-widest uppercase px-1">Phone</label>
            <input 
              required 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel" 
              className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium" 
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-zinc-400 tracking-widest uppercase px-1">Message</label>
          <textarea 
            required 
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4} 
            className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-medium resize-none" 
          />
        </div>
        <button 
          disabled={loading}
          type="submit" 
          className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-black tracking-[0.2em] text-[10px] uppercase transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {loading ? "SENDING..." : (
            <>
              SEND INQUIRY
              <Send size={14} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
