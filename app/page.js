import Navbar from "@/components/Navbar";
// import Hero3D from "@/components/Hero3D";
// import ScrollSequence from "@/components/ScrollSequence";
import VehicleCard from "@/components/VehicleCard";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { getVehicles } from "@/lib/graphql";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Quality Used Cars for Sale in Jacksonville, FL | Ahaaq Auto Exchange",
  description: "Browse our premium collection of used cars, SUVs, and luxury vehicles in Jacksonville, FL. Expert financing, trade-ins, and unbeatable service at Ahaaq Auto Exchange.",
  keywords: "used cars Jacksonville, luxury cars Jacksonville, car dealership Jacksonville FL, auto exchange Jacksonville, pre-owned vehicles Jacksonville",
};

export default async function Home() {
  const vehicles = await getVehicles(6);
  
  // JSON-LD for Local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Ahaaq Auto Exchange",
    "image": "https://ahhaqautoexchange.net/images/Jacksonville-ahaaq-hero-banner.png",
    "@id": "https://ahhaqautoexchange.net",
    "url": "https://ahhaqautoexchange.net",
    "telephone": "+19045029709",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8310 Beach Blvd Suite 2",
      "addressLocality": "Jacksonville",
      "addressRegion": "FL",
      "postalCode": "32216",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.2869,
      "longitude": -81.5658
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "areaServed": {
      "@type": "City",
      "name": "Jacksonville",
      "sameAs": "https://en.wikipedia.org/wiki/Jacksonville,_Florida"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Luxury Car Inventory in Jacksonville",
      "itemListElement": vehicles.map((v, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Product",
          "name": v.title,
          "description": `${v.vehicleDetails?.year} ${v.vehicleDetails?.make} ${v.vehicleDetails?.model} available at Ahaaq Auto Exchange Jacksonville`,
          "url": `https://ahhaqautoexchange.net/inventory/${v.slug}`,
          "offers": {
            "@type": "Offer",
            "price": v.vehicleDetails?.price || 0,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    }
  };


  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      
      {/* Professional Luxury Hero Section */}
      <section className="relative w-full h-[95vh] flex items-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-110"
          style={{ backgroundImage: `url('/images/Jacksonville-ahaaq-hero-banner.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full flex flex-col items-start pt-20">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-[0.3em] text-white uppercase animate-fade-in">
              <MapPin size={12} className="text-white" /> High-End Auto Exchange • Jacksonville, FL
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase">
              QUALITY USED CARS <br/>
              <span className="text-zinc-400 text-5xl md:text-7xl">JACKSONVILLE, FL</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-300 font-medium max-w-xl leading-relaxed">
              Experience the pinnacle of pre-owned luxury. We curate only the finest Toyota, Lexus, and European imports for the Jacksonville driver who demands excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link href="/inventory" className="group w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 bg-white text-zinc-950 rounded-full font-bold tracking-wide hover:bg-zinc-200 transition-all shadow-2xl shadow-white/10">
                VIEW COLLECTION
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-transparent text-white border border-white/30 backdrop-blur-sm rounded-full font-bold tracking-wide hover:bg-white/10 transition-all">
                BOOK CONSULTATION
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Inventory Section */}
      <section className="relative w-full py-32 bg-white px-8 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">Featured Collection</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900">QUALITY CARS IN JACKSONVILLE,<br/>UNBEATABLE PRICES</h3>
          </div>

          {vehicles?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle?.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center bg-zinc-50 rounded-3xl border border-zinc-200 border-dashed">
              <p className="text-zinc-500 font-medium">No vehicles currently available. Please check back later.</p>
            </div>
          )}

          <div className="mt-16">
            <Link href="/inventory" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-full font-bold tracking-wide transition-colors">
              VIEW ALL INVENTORY <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <AboutSection />
      
      {/* Search Engine Optimization Content Section */}
      <section className="py-24 bg-zinc-50 px-8">
        <div className="max-w-4xl mx-auto prose prose-zinc prose-lg">
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 uppercase mb-8">Your Trusted Used Car Dealer in Jacksonville, Florida</h2>
          <p className="text-zinc-700 leading-relaxed font-medium">
            Looking for a reliable <Link href="/inventory" className="text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900 font-bold transition-all">used car in Jacksonville</Link>? Ahaaq Auto Exchange is your premier destination for high-quality pre-owned vehicles. Located conveniently on Beach Blvd, we serve our local Jacksonville community with a curated selection of luxury cars, SUVs, and efficient imports.
          </p>
          <p className="text-zinc-700 leading-relaxed font-medium mt-6">
            Our commitment to quality means every vehicle in our inventory undergoes a rigorous inspection. Whether you&apos;re searching for a Lexus SUV to navigate the Florida coast or a reliable Toyota for your daily commute, our expert team is here to help you find the perfect match. We offer <Link href="/finance" className="text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900 font-bold transition-all">flexible financing solutions</Link> tailored to your needs, including zero-down options and competitive rates for all credit profiles.
          </p>
        </div>
      </section>

      <Testimonials />
      <Footer />

    </main>
  );
}
