import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1 border-r border-zinc-800 pr-8">
          <Logo className="w-32 brightness-0 invert opacity-80 mb-6" />
          <p className="text-zinc-500 text-sm leading-relaxed mb-8">
            The most trusted <strong>used car dealership in Jacksonville</strong>. We provide premium luxury vehicles and reliable daily drivers to North Florida and beyond with a commitment to excellence.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"><Facebook size={18} /></Link>
            <Link href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"><Instagram size={18} /></Link>
            <Link href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"><Twitter size={18} /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm tracking-widest uppercase mb-6 text-zinc-400">Quick Links</h4>
          <ul className="space-y-4 text-sm font-medium text-zinc-500">
            <li><Link href="/inventory" className="hover:text-white transition-colors">Current Inventory</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Our Services</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/finance" className="hover:text-white transition-colors">Financing</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold text-sm tracking-widest uppercase mb-6 text-zinc-400">Visit Us</h4>
          <ul className="space-y-4 text-sm font-medium text-zinc-500">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-zinc-400 shrink-0" />
              <span>8310 Beach Blvd Suite 2, <br/>Jacksonville FL 32216</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-zinc-400" />
              <span>+1 904 502 9709</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-zinc-400" />
              <span className="break-all">Ahaaqautoexchange@yahoo.com</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-bold text-sm tracking-widest uppercase mb-6 text-zinc-400">Business Hours</h4>
          <ul className="space-y-4 text-sm font-medium text-zinc-500">
            <li className="flex justify-between"><span>Mon - Fri:</span> <span>9:00 AM - 6:00 PM</span></li>
            <li className="flex justify-between"><span>Saturday:</span> <span>10:00 AM - 4:00 PM</span></li>
            <li className="flex justify-between text-zinc-300"><span>Sunday:</span> <span className="font-bold">By Appointment</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-zinc-900 flex flex-col md:row justify-between items-center gap-6">
        <p className="text-zinc-600 text-xs">
          © {new Date().getFullYear()} Ahaaq Auto Exchange LLC. All rights reserved. 
        </p>
        <div className="flex gap-6 text-zinc-600 text-xs">
          <Link href="/privacy" className="hover:text-zinc-400">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-zinc-400">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
