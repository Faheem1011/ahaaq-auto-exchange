"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Phone, MapPin, Wrench, Shield, Sparkles, Menu, X, Clock, ChevronDown, Tag } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm top-0 left-0 right-0">
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* TOP UTILITY BANNER — MOBILE COMPACT & DESKTOP FULL             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="bg-black text-zinc-400 text-[10px] sm:text-[11px] font-medium tracking-wide py-1.5 px-3 sm:px-6 md:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          {/* Location / Status */}
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-bold uppercase tracking-wider text-[8px] sm:text-[9px] border border-white/15 shrink-0">
              Moving Soon
            </span>
            <span className="flex items-center gap-1 text-zinc-300 truncate text-[10px] sm:text-[11px]">
              <MapPin size={10} className="text-zinc-400 shrink-0" />
              <span className="truncate">6615 N Main St, Jacksonville FL</span>
            </span>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 text-[10px] sm:text-[11px]">
            <Link 
              href="/service/track" 
              className="text-zinc-300 hover:text-white flex items-center gap-1 font-bold underline underline-offset-2 sm:underline-offset-4 transition-colors"
            >
              <Clock size={10} className="text-zinc-400" />
              <span className="hidden xs:inline">Track Repair</span>
              <span className="xs:hidden">Track</span>
            </Link>
            <span className="text-zinc-700">|</span>
            <a 
              href="tel:+19045029709" 
              className="text-white hover:text-zinc-300 flex items-center gap-1 font-bold transition-colors"
            >
              <Phone size={10} /> (904) 502-9709
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MAIN NAVIGATION BAR                                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2.5 sm:py-3.5 px-4 sm:px-6 md:px-8">
        <Link href="/" className="shrink-0" onClick={() => setMobileMenuOpen(false)}>
          <Logo className="w-36 sm:w-44 md:w-52 h-9 sm:h-11 md:h-13" />
        </Link>

        {/* Desktop Menu — Uncrowded & Structured */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-bold tracking-wider uppercase text-zinc-700">
          <Link href="/inventory" className="hover:text-black transition-colors">
            Inventory
          </Link>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className="flex items-center gap-1 hover:text-black transition-colors focus:outline-none cursor-pointer py-2"
            >
              <span>Services</span>
              <ChevronDown size={13} className={`text-zinc-400 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-black' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute top-full left-0 mt-1 w-64 bg-zinc-950 text-white rounded-2xl border border-zinc-800 shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
              >
                <Link
                  href="/auto-repair"
                  onClick={() => setServicesDropdownOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-zinc-900 transition-colors block text-left group"
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-white group-hover:text-white uppercase">
                    <Wrench size={13} className="text-zinc-400" /> Auto Repair &amp; Service
                  </div>
                  <p className="text-[10px] text-zinc-400 normal-case font-normal pl-5 mt-0.5">Diagnostics, brakes, engines &amp; A/C</p>
                </Link>

                <Link
                  href="/body-shop"
                  onClick={() => setServicesDropdownOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-zinc-900 transition-colors block text-left group"
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-white group-hover:text-white uppercase">
                    <Shield size={13} className="text-zinc-400" /> Body Shop &amp; Collision
                  </div>
                  <p className="text-[10px] text-zinc-400 normal-case font-normal pl-5 mt-0.5">Accident repairs &amp; paint matching</p>
                </Link>

                <Link
                  href="/window-tinting"
                  onClick={() => setServicesDropdownOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-zinc-900 transition-colors block text-left group"
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-white group-hover:text-white uppercase">
                    <Sparkles size={13} className="text-zinc-400" /> Ceramic Window Tinting
                  </div>
                  <p className="text-[10px] text-zinc-400 normal-case font-normal pl-5 mt-0.5">99% UV &amp; solar heat rejection</p>
                </Link>

                <div className="h-px bg-zinc-800 my-1" />

                <Link
                  href="/service-specials"
                  onClick={() => setServicesDropdownOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-zinc-900 transition-colors block text-left group"
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-zinc-200 group-hover:text-white uppercase">
                    <Tag size={13} className="text-zinc-400" /> Service Coupons &amp; Specials
                  </div>
                  <p className="text-[10px] text-zinc-400 normal-case font-normal pl-5 mt-0.5">Active discount promotions</p>
                </Link>

                <Link
                  href="/service/track"
                  onClick={() => setServicesDropdownOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-zinc-900 transition-colors block text-left group"
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-zinc-200 group-hover:text-white uppercase">
                    <Clock size={13} className="text-zinc-400" /> Track My Repair Job
                  </div>
                  <p className="text-[10px] text-zinc-400 normal-case font-normal pl-5 mt-0.5">Real-time status by tracking code</p>
                </Link>
              </div>
            )}
          </div>

          <Link href="/finance" className="hover:text-black transition-colors">
            Financing
          </Link>
          <Link href="/sell-your-car" className="hover:text-black transition-colors font-black text-zinc-900">
            Sell / Trade
          </Link>
          <Link href="/about" className="hover:text-black transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-black transition-colors">
            Contact
          </Link>
        </div>

        {/* Desktop Header Actions & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/book-service"
            className="hidden sm:flex px-5 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all shadow-md items-center gap-1.5"
          >
            <Wrench size={13} /> Book Service
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-800 hover:text-black focus:outline-none rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MOBILE DRAWER MENU                                             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 text-white border-t border-zinc-800 px-5 py-6 space-y-6 animate-in slide-in-from-top duration-300 max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain">
          
          <div className="space-y-2.5 border-b border-zinc-800 pb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Dealership</span>
            <Link
              href="/inventory"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white py-1.5 active:text-white"
            >
              Browse Inventory
            </Link>
            <Link
              href="/finance"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white py-1.5 active:text-white"
            >
              Credit Acceptance Financing
            </Link>
            <Link
              href="/sell-your-car"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white py-1.5 active:text-white"
            >
              Sell / Trade Your Car
            </Link>
          </div>

          <div className="space-y-2.5 border-b border-zinc-800 pb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Workshop &amp; Service</span>
            <Link
              href="/auto-repair"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white py-1.5 active:text-white"
            >
              Auto Repair &amp; Diagnostics
            </Link>
            <Link
              href="/body-shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white py-1.5 active:text-white"
            >
              Collision &amp; Body Shop
            </Link>
            <Link
              href="/window-tinting"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white py-1.5 active:text-white"
            >
              Ceramic Window Tinting
            </Link>
            <Link
              href="/service-specials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white py-1.5 active:text-white"
            >
              Service Specials &amp; Coupons
            </Link>
            <Link
              href="/service/track"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white py-1.5 active:text-white"
            >
              Track Repair Job
            </Link>
          </div>

          <div className="space-y-2.5 border-b border-zinc-800 pb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">Company</span>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white py-1.5 active:text-white"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white py-1.5 active:text-white"
            >
              Contact &amp; Hours
            </Link>
          </div>

          <div className="pt-2 space-y-2.5 pb-6">
            <Link
              href="/book-service"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl text-center block shadow-lg active:scale-98 transition-transform"
            >
              Book Service Appointment
            </Link>
            <a
              href="tel:+19045029709"
              className="w-full py-3 bg-zinc-900 border border-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl text-center flex items-center justify-center gap-2 active:scale-98 transition-transform"
            >
              <Phone size={14} /> Call (904) 502-9709
            </a>
          </div>

        </div>
      )}
    </nav>
  );
}
