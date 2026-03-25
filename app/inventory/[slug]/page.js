import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Calendar, Gauge, CreditCard, MapPin, ArrowLeft, Banknote, Clock } from 'lucide-react';
import Link from 'next/link';
import ImageGalleryClient from '@/components/ImageGalleryClient';
import { createClient } from '@/utils/supabase/server';

import VehicleContactForm from '@/components/VehicleContactForm';

async function getVehicleBySlug(slug) {
  const supabase = await createClient();
  const { data: v } = await supabase.from('vehicles').select('*').eq('id', slug).single();
  if (v) {
    return {
      id: v.id,
      title: `${v.year} ${v.make} ${v.model}`,
      content: v.description,
      featuredImage: { node: { sourceUrl: v.images?.[0] || null } },
      galleryImages: (v.images || []).map(url => ({ sourceUrl: url })),
      videoUrl: v.videoUrl,
      vehicleDetails: {
        make: v.make,
        model: v.model,
        year: v.year,
        price: v.price,
        mileage: v.mileage,
        vin: v.vin,
        bodyType: "Premium",
        fuelType: "Gasoline",
        transmission: "Automatic"
      }
    };
  }

  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: 'Vehicle Not Found' };

  const { year, make, model, price } = vehicle.vehicleDetails || {};
  const priceStr = price ? ` for ${new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)}` : "";

  return {
    title: `${year} ${make} ${model} for Sale in Jacksonville, FL${priceStr} | Ahaaq Auto Exchange`,
    description: `Check out this ${year} ${make} ${model} available now at Ahaaq Auto Exchange in Jacksonville. ${vehicle.vehicleDetails?.mileage?.toLocaleString()} miles, ${vehicle.vehicleDetails?.transmission || "Automatic"}. Best used car deals in Jacksonville!`,
  };
}

export default async function VehiclePage({ params }) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const { title, content, featuredImage, vehicleDetails, galleryImages } = vehicle;
  const { make, model, year, price, mileage, vin, bodyType, fuelType, transmission } = vehicleDetails || {};

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${year} ${make} ${model}`,
    "image": featuredImage?.node?.sourceUrl || "https://ahhaqautoexchange.net/placeholder-car.jpg",
    "description": `Premium ${year} ${make} ${model} with ${mileage?.toLocaleString()} miles. Available at Ahaaq Auto Exchange in Jacksonville, FL.`,
    "brand": {
      "@type": "Brand",
      "name": make
    },
    "offers": {
      "@type": "Offer",
      "url": `https://ahhaqautoexchange.net/inventory/${slug}`,
      "priceCurrency": "USD",
      "price": price || 0,
      "priceValidUntil": new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": "Ahaaq Auto Exchange"
      }
    }
  };

  const formatPrice = (amount) => {
    if (!amount) return "Call for Price";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Navbar />

      <div className="pt-40 lg:pt-48 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb / Back */}
          <Link href="/inventory" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 font-bold text-xs tracking-widest uppercase transition-colors mb-12">
            <ArrowLeft size={16} /> USED CAR INVENTORY JACKSONVILLE
          </Link>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Media */}
            <div className="lg:w-2/3 space-y-8">
              <div className="relative aspect-[16/9] bg-zinc-100 rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-100">
                <Image
                  src={featuredImage?.node?.sourceUrl || "/placeholder-car.jpg"}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <ImageGalleryClient 
                images={galleryImages} 
                title={title} 
                videoUrl={vehicle.videoUrl} 
              />

              <div className="prose prose-zinc max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-zinc-600 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Right: Details & Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-200">
                <div className="space-y-2 mb-8">
                  <h1 className="text-4xl font-black tracking-tighter text-zinc-900 leading-none uppercase">
                    {year} {make}<br />
                    <span className="text-zinc-400">{model}</span>
                  </h1>
                  <p className="text-sm font-bold text-zinc-500 tracking-[0.2em] uppercase">VIN: {vin || "Contact Dealer"}</p>
                </div>

                <div className="text-4xl font-black text-zinc-900 tracking-tighter mb-10">
                  {formatPrice(price)}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-1.5 line-clamp-1">
                      <Gauge size={12} /> Mileage
                    </span>
                    <p className="font-bold text-zinc-900">{mileage?.toLocaleString()} mi</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-1.5 line-clamp-1">
                      <Calendar size={12} /> Year
                    </span>
                    <p className="font-bold text-zinc-900">{year}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-1.5 line-clamp-1">
                      <ShieldCheck size={12} /> Status
                    </span>
                    <p className="font-bold text-zinc-900">Clean Title</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-1.5 line-clamp-1">
                      <CreditCard size={12} /> Type
                    </span>
                    <p className="font-bold text-zinc-900">{bodyType || "Premium"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-1.5 line-clamp-1">
                      <Banknote size={12} /> Transmission
                    </span>
                    <p className="font-bold text-zinc-900">{transmission || "Automatic"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-1.5 line-clamp-1">
                      <Clock size={12} /> Fuel Type
                    </span>
                    <p className="font-bold text-zinc-900">{fuelType || "Gasoline"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href="#contact" className="block w-full py-5 bg-zinc-900 hover:bg-zinc-800 text-white text-center rounded-2xl font-black tracking-widest text-xs transition-all border border-zinc-900">
                    INQUIRE NOW
                  </Link>
                  <button className="w-full py-5 bg-white hover:bg-zinc-50 text-zinc-900 text-center rounded-2xl font-black tracking-widest text-xs transition-all border border-zinc-200">
                    SCHEDULE TEST DRIVE
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center">
                    <MapPin size={18} className="text-zinc-600" />
                  </div>
                  <p className="text-xs font-bold text-zinc-500 leading-tight">
                    Visit us in Jacksonville at <br />
                    <span className="text-zinc-900">7749 Normandy Blvd</span>
                  </p>
                </div>
              </div>

              {/* Trust Card */}
              <div className="bg-zinc-950 p-8 rounded-[2rem] text-white">
                <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-zinc-400">Our Guarantee</h4>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-sm font-medium">
                    <ShieldCheck className="text-zinc-400 shrink-0" size={18} />
                    Multi-point inspection included
                  </li>
                  <li className="flex gap-2 text-sm font-medium">
                    <ShieldCheck className="text-zinc-400 shrink-0" size={18} />
                    Extended warranty available
                  </li>
                  <li className="flex gap-2 text-sm font-medium">
                    <ShieldCheck className="text-zinc-400 shrink-0" size={18} />
                    Free CARFAX Report
                  </li>
                </ul>
              </div>

              <VehicleContactForm vehicleTitle={title} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
