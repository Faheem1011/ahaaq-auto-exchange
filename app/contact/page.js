"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <div className="relative pt-40 pb-24 bg-zinc-50 px-8 border-b border-zinc-100">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter uppercase mb-6">
            Get in <span className="text-zinc-400">Touch</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Schedule a test drive, inquire about financing, or just drop by. We&apos;re here to help you find your next vehicle.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-xs mb-2">Location</h4>
                    <p className="text-zinc-600 text-lg">8310 Beach Blvd<br />Suite 2<br />Jacksonville, FL 32216</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-xs mb-2">Phone</h4>
                    <p className="text-zinc-600 text-lg">+1 904 502 9709<br /><span className="text-sm text-zinc-400">Ask for Bobby Ali</span></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-xs mb-2">Email</h4>
                    <p className="text-zinc-600 text-lg">Ahaaqautoexchange@yahoo.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-xs mb-2">Hours</h4>
                    <p className="text-zinc-600 text-lg">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM<br />Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-zinc-200 shadow-2xl shadow-zinc-200/50">
            <h3 className="text-2xl font-black text-zinc-900 tracking-tighter uppercase mb-8">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">First Name</label>
                  <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-zinc-900 transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Last Name</label>
                  <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-zinc-900 transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                <input type="email" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-zinc-900 transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Phone Number (Optional)</label>
                <input type="tel" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-zinc-900 transition-colors" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea rows="4" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-zinc-900 transition-colors resize-none" placeholder="I'm interested in the 2012 Hyundai Santa Fe..." />
              </div>
              <button type="submit" className="w-full bg-zinc-900 text-white rounded-xl py-4 font-bold tracking-widest uppercase text-sm hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
