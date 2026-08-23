"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Phone, MapPin, Wrench, Shield, Sparkles, Car, Menu, X, Clock, MessageSquare } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm">
      {/* Top Banner & Quick Contacts */}
      <div className="bg-zinc-950 text-zinc-300 text-[11px] font-medium tracking-wide py-1.5 px-4 md:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Location Transition Notice */}
          <div className="flex items-center gap-3 text-center md:text-left flex-wrap justify-center">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider text-[9px] border border-emerald-500/30">
              Moving Soon
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <MapPin size={11} className="text-emerald-400" /> New Workshop: <strong>6615 N Main St, Jacksonville FL 32208</strong>
            </span>
          </div>

          {/* Utility Quick Links */}
          <div className="flex items-center gap-4 text-[11px]">
            <Link 
              href="/service/track" 
              className="text-zinc-300 hover:text-white flex items-center gap-1 font-bold underline decoration-emerald-500 underline-offset-2"
            >
              <Clock size={11} className="text-emerald-400" /> Track My Repair
            </Link>
            <span className="text-zinc-700">|</span>
            <a 
              href="https://wa.me/19045029709" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold transition-colors"
            >
              <MessageSquare size={11} /> WhatsApp
            </a>
            <span className="text-zinc-700">|</span>
            <a 
              href="tel:+19045029709" 
              className="text-white hover:text-emerald-400 flex items-center gap-1 font-bold transition-colors"
            >
              <Phone size={11} /> (904) 502-9709
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3.5 px-4 md:px-8">
        <Link href="/" className="shrink-0">
          <Logo className="w-48 md:w-56 h-12 md:h-14" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-6 text-xs font-black tracking-wider uppercase text-zinc-700">
          <Link href="/inventory" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
            <Car size={13} className="text-zinc-400" /> Inventory
          </Link>
          <Link href="/auto-repair" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
            <Wrench size={13} className="text-zinc-400" /> Auto Repair
          </Link>
          <Link href="/body-shop" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
            <Shield size={13} className="text-zinc-400" /> Body Shop
          </Link>
          <Link href="/window-tinting" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
            <Sparkles size={13} className="text-zinc-400" /> Tinting
          </Link>
          <Link href="/finance" className="hover:text-zinc-950 transition-colors">
            Financing
          </Link>
          <Link href="/sell-your-car" className="hover:text-zinc-950 transition-colors text-emerald-600 font-black">
            Sell / Trade
          </Link>
          <Link href="/service-specials" className="hover:text-zinc-950 transition-colors text-amber-600">
            Specials
          </Link>
          <Link href="/about" className="hover:text-zinc-950 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-zinc-950 transition-colors">
            Contact
          </Link>
        </div>

        {/* Desktop Header CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/book-service"
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all shadow-md shadow-emerald-950/20 flex items-center gap-1.5"
          >
            <Wrench size={13} /> Book Service
          </Link>
          <Link
            href="/inventory"
            className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all shadow-md shadow-zinc-900/20"
          >
            Shop Cars
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl text-zinc-800 hover:bg-zinc-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-zinc-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-zinc-100">
            <Link
              href="/book-service"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Wrench size={14} /> Book Service
            </Link>
            <Link
              href="/inventory"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 bg-zinc-950 text-white text-xs font-black uppercase tracking-wider rounded-xl text-center shadow-sm"
            >
              Shop Cars
            </Link>
          </div>

          <div className="space-y-3 font-bold text-sm text-zinc-800">
            <Link href="/inventory" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
              🚗 Vehicle Inventory
            </Link>
            <Link href="/auto-repair" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
              🔧 Mechanical Auto Repair
            </Link>
            <Link href="/body-shop" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
              🛡️ Body Shop &amp; Collision Center
            </Link>
            <Link href="/body-shop/estimate" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-emerald-600">
              📸 Request Body Shop Estimate
            </Link>
            <Link href="/window-tinting" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
              ✨ Window Tinting
            </Link>
            <Link href="/finance" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
              💳 Credit Acceptance Financing (DCX3C)
            </Link>
            <Link href="/sell-your-car" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
              💵 Sell / Trade Your Car
            </Link>
            <Link href="/service-specials" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-amber-600 font-black">
              🏷️ Service Specials &amp; Coupons
            </Link>
            <Link href="/service/track" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-blue-600">
              ⏱️ Track Repair Work Order
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
              🏢 About Us
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-emerald-600">
              📞 Contact Us
            </Link>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-600">
            <a href="tel:+19045029709" className="flex items-center gap-1 text-zinc-900">
              <Phone size={14} className="text-emerald-600" /> +1 (904) 502-9709
            </a>
            <a href="https://wa.me/19045029709" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-emerald-600">
              <MessageSquare size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
