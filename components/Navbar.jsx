import Link from "next/link";
import Logo from "./Logo";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-zinc-200/50">
      {/* Top Bar for Contact Info */}
      <div className="hidden md:flex justify-between items-center py-2 px-8 bg-zinc-900 text-zinc-300 text-xs tracking-wide">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><MapPin size={12} /> 8310 Beach Blvd Suite 2, Jacksonville FL 32216</span>
          <span className="flex items-center gap-2"><Mail size={12} /> Ahaaqautoexchange@yahoo.com</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Bobby Ali</span>
          <span className="flex items-center gap-2 font-bold text-white"><Phone size={12} /> +1 904 502 9709</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex justify-between items-center py-4 px-8">
        <Link href="/">
          <Logo className="w-56 h-14" />
        </Link>
        <div className="hidden md:flex gap-8 font-medium text-sm tracking-wide text-zinc-600">
          <Link href="/" className="hover:text-zinc-900 transition-colors">HOME</Link>
          <Link href="/inventory" className="hover:text-zinc-900 transition-colors">INVENTORY</Link>
          <Link href="/finance" className="hover:text-zinc-900 transition-colors">FINANCE</Link>
          <Link href="/about" className="hover:text-zinc-900 transition-colors">ABOUT</Link>
          <Link href="/contact" className="hover:text-zinc-900 transition-colors">CONTACT</Link>
        </div>
        <Link href="/inventory" className="px-6 py-2.5 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20">
          START QUOTE FROM $0
        </Link>
      </div>
    </nav>
  );
}
