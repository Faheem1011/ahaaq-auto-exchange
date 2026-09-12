import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Car, Wrench, ArrowRight, Compass } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found (404) | Ahaaq Auto Exchange',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center pt-40 pb-24 px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold tracking-widest text-zinc-600 uppercase">
            <Compass className="w-4 h-4 text-zinc-800" />
            404 Error • Page Not Found
          </div>

          <div className="space-y-3">
            <h1 className="text-6xl sm:text-7xl font-black tracking-tighter text-zinc-900 uppercase">
              Lost Your Way?
            </h1>
            <p className="text-zinc-500 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              The page you are looking for may have been moved, renamed, or is no longer available. Explore our live inventory and certified services below:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Link
              href="/inventory"
              className="flex items-center justify-between p-5 rounded-2xl bg-zinc-950 text-white font-bold hover:bg-zinc-800 transition-all group"
            >
              <span className="flex items-center gap-3">
                <Car className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                Browse Inventory
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/auto-repair"
              className="flex items-center justify-between p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-900 font-bold hover:bg-zinc-100 transition-all group"
            >
              <span className="flex items-center gap-3">
                <Wrench className="w-5 h-5 text-zinc-600" />
                Auto Repair Services
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors underline underline-offset-4"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
