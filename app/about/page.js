import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ShieldCheck, Users } from "lucide-react";

export const metadata = {
  title: "About Us | Ahaaq Auto Exchange | Jacksonville's Trusted Used Car Dealer",
  description: "Learn about Ahaaq Auto Exchange in Jacksonville, FL. Led by Bobby Ali, we provide premium pre-owned luxury vehicles and exceptional auto financing since our founding.",
  keywords: "Bobby Ali Jacksonville, Ahaaq Auto Exchange history, about used car dealer Jacksonville, best luxury dealer Jax",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <div className="relative pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-24 bg-zinc-950 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/jacksonville-luxury-cars-hero.jpg')] bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            Our Legacy of <span className="text-zinc-500">Excellence</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Providing Jacksonville with premium pre-owned vehicles, exceptional financing, and a white-glove buying experience.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div className="relative aspect-square md:aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden shadow-xl">
            <Image 
              src="/images/jacksonville-luxury-cars-hero.jpg" 
              alt="Dealership Showroom" 
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-xs sm:text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">Who We Are</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter uppercase leading-[1.1]">
              Redefining the <br className="hidden sm:inline" />Dealership Experience
            </h3>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
              At Ahaaq Auto Exchange, we believe buying a car should be as thrilling as driving it. Located in the heart of Jacksonville, FL, our dealership curates a selection of the finest imports and domestic vehicles. We don&apos;t just sell cars; we pair drivers with their perfect match.
            </p>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
              Led by Bobby Ali, our team is dedicated to transparency, quality, and community. Every vehicle on our lot undergoes a rigorous multi-point inspection to ensure you drive away with confidence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 sm:pt-8 border-t border-zinc-100">
              <div className="space-y-2 sm:space-y-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-bold text-zinc-900 text-base">Guaranteed Quality</h4>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">Rigorous inspections on every vehicle before delivery.</p>
              </div>
              <div className="space-y-2 sm:space-y-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center">
                  <Users size={20} />
                </div>
                <h4 className="font-bold text-zinc-900 text-base">Expert Team</h4>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">Decades of automotive experience and white-glove care.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
