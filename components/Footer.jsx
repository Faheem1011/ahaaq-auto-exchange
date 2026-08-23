"use client";

import { MapPin, Phone, Facebook, Instagram, Twitter, Wrench, Shield, Car, Clock, MessageSquare, Cookie } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

export default function Footer() {
  const handleOpenCookies = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-preferences"));
    }
  };

  return (
    <footer className="bg-black text-white pt-20 pb-12 px-6 md:px-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Workshop Moving Notice & Fast Actions Banner */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
              Jacksonville Automotive Hub
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
              Cars, Repairs &amp; Body Shop Services Under One Roof
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl font-normal">
              Convenient automotive sales, certified mechanical repairs, collision restoration, and ceramic window tinting for Jacksonville, Orange Park, and North Florida drivers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/book-service"
              className="px-6 py-3 bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-lg"
            >
              <Wrench size={13} /> Book Service Online
            </Link>
            <Link
              href="/body-shop/estimate"
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 border border-zinc-800"
            >
              <Shield size={13} /> Free Body Estimate
            </Link>
            <Link
              href="/service/track"
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 border border-zinc-800"
            >
              <Clock size={13} /> Track Job
            </Link>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Col 1: Brand & Socials */}
          <div className="space-y-6">
            <Logo className="w-44 brightness-0 invert opacity-90" />
            <p className="text-zinc-400 text-xs leading-relaxed font-normal">
              <strong>AHAQ Auto Exchange</strong> is Jacksonville&apos;s full-service automotive destination. We combine quality pre-owned vehicle sales with a certified mechanical workshop, collision body shop, and professional window tinting center.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2.5 bg-zinc-900 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors" aria-label="Facebook"><Facebook size={16} /></a>
              <a href="#" className="p-2.5 bg-zinc-900 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="#" className="p-2.5 bg-zinc-900 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors" aria-label="Twitter"><Twitter size={16} /></a>
            </div>
          </div>

          {/* Col 2: Auto Repair & Services */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs tracking-widest uppercase text-white flex items-center gap-1.5">
              <Wrench size={13} className="text-zinc-400" /> Auto Repair &amp; Service
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li><Link href="/auto-repair" className="hover:text-white transition-colors">Mechanical Repair Overview</Link></li>
              <li><Link href="/auto-repair/brake-repair" className="hover:text-white transition-colors">Brake Service &amp; Rotors</Link></li>
              <li><Link href="/auto-repair/oil-change" className="hover:text-white transition-colors">Synthetic Oil &amp; Filter Change</Link></li>
              <li><Link href="/auto-repair/engine-diagnostics" className="hover:text-white transition-colors">Engine Diagnostics &amp; Check Engine</Link></li>
              <li><Link href="/auto-repair/transmission-service" className="hover:text-white transition-colors">Transmission Service &amp; Flush</Link></li>
              <li><Link href="/auto-repair/ac-repair" className="hover:text-white transition-colors">A/C Recharge &amp; Heating Repair</Link></li>
              <li><Link href="/auto-repair/suspension-repair" className="hover:text-white transition-colors">Steering &amp; Suspension Repair</Link></li>
              <li><Link href="/service-specials" className="text-zinc-300 font-bold hover:text-white transition-colors">Service Coupons &amp; Specials</Link></li>
            </ul>
          </div>

          {/* Col 3: Dealership, Body Shop & Tint */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs tracking-widest uppercase text-white flex items-center gap-1.5">
              <Car size={13} className="text-zinc-400" /> Dealership &amp; Body Shop
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li><Link href="/inventory" className="hover:text-white transition-colors">Browse Quality Used Cars</Link></li>
              <li><Link href="/finance" className="hover:text-white transition-colors">Credit Acceptance Financing (DCX3C)</Link></li>
              <li><Link href="/sell-your-car" className="hover:text-white transition-colors">Sell Your Car / Instant Cash Offer</Link></li>
              <li><Link href="/body-shop" className="hover:text-white transition-colors">Collision &amp; Body Shop Repair</Link></li>
              <li><Link href="/body-shop/estimate" className="hover:text-white transition-colors">Digital Damage Photo Estimate</Link></li>
              <li><Link href="/window-tinting" className="hover:text-white transition-colors">Ceramic &amp; Carbon Window Tinting</Link></li>
              <li><Link href="/service/track" className="hover:text-white transition-colors">Track Repair Work Order</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About AHAQ Auto Exchange</Link></li>
            </ul>
          </div>

          {/* Col 4: Location & Operating Hours */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs tracking-widest uppercase text-white flex items-center gap-1.5">
              <MapPin size={13} className="text-zinc-400" /> Locations &amp; Hours
            </h4>
            
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="p-3.5 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-zinc-400 block">Upcoming Workshop</span>
                <p className="text-white font-medium">6615 N Main St<br/>Jacksonville, FL 32208</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone size={14} className="text-zinc-400" />
                <a href="tel:+19045029709" className="text-white font-bold hover:text-zinc-300 transition-colors">+1 (904) 502-9709</a>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-zinc-400" />
                <a href="https://wa.me/19045029709" target="_blank" rel="noopener noreferrer" className="text-zinc-300 font-bold hover:text-white underline">WhatsApp Us Directly</a>
              </div>

              <div className="pt-2 border-t border-zinc-800 text-[11px] space-y-1">
                <div className="flex justify-between"><span>Mon - Fri:</span> <span className="text-zinc-200">8:00 AM - 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday:</span> <span className="text-zinc-200">9:00 AM - 4:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday:</span> <span className="text-zinc-400">By Appointment</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Cookie Preferences Link */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} AHAQ Auto Exchange LLC. All rights reserved. Jacksonville, Florida.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <button
              type="button"
              onClick={handleOpenCookies}
              className="hover:text-zinc-300 transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-zinc-500"
            >
              <Cookie size={13} /> Cookie Preferences
            </button>
            <Link href="/contact" className="hover:text-zinc-300 transition-colors">Contact Support</Link>
            <Link href="/admin/login" className="hover:text-zinc-300 transition-colors">Staff Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
