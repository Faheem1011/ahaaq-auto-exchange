import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Calendar, Gauge, CreditCard, MapPin, ArrowLeft, Banknote, Clock, CheckCircle2, Tag } from 'lucide-react';
import Link from 'next/link';
import ImageGalleryClient from '@/components/ImageGalleryClient';
import { createClient } from '@/utils/supabase/server';
import VehicleContactForm from '@/components/VehicleContactForm';
import { localVehicles } from '@/lib/localVehicles';

async function getVehicleBySlug(slug) {
  try {
    const supabase = await createClient();
    
    // 1. Try querying Supabase by custom slug first or UUID id
    const { data: vList } = await supabase
      .from('vehicles')
      .select('*')
      .or(`slug.eq."${slug}",id.eq."${slug}"`)
      .limit(1);
    
    const v = vList?.[0];
    
    if (v) {
      return {
        id: v.id,
        title: `${v.year} ${v.make} ${v.model}`,
        slug: v.slug || v.id,
        status: v.status || 'available',
        tags: v.tags || [],
        content: v.description ? `<p>${v.description}</p>` : '<p>Clean title, fully inspected vehicle ready for immediate delivery.</p>',
        featuredImage: { node: { sourceUrl: v.images?.[0] || null } },
        galleryImages: v.images || [],
        videoUrl: v.videoUrl,
        vehicleDetails: {
          make: v.make,
          model: v.model,
          year: v.year,
          price: v.price,
          mileage: v.mileage,
          vin: v.vin || 'Contact Dealer',
          bodyType: v.body_type || 'Sedan',
          fuelType: v.fuel_type || 'Gasoline',
          transmission: v.transmission || 'Automatic',
          status: v.status || 'available',
          tags: v.tags || [],
          seo_title: v.seo_title,
          seo_description: v.seo_description
        }
      };
    }
  } catch (err) {
    console.error('Error in getVehicleBySlug:', err);
  }

  // 2. Fallback to localVehicles (matching slug or id)
  const local = localVehicles.find(item => item.slug === slug || item.id === slug);
  if (local) {
    return {
      ...local,
      galleryImages: local.galleryImages || []
    };
  }

  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: 'Vehicle Not Found | Ahaaq Auto Exchange' };

  const { year, make, model, price, seo_title, seo_description } = vehicle.vehicleDetails || {};
  const priceStr = price ? ` for ${new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)}` : "";

  return {
    title: seo_title || `${year} ${make} ${model} for Sale in Jacksonville, FL${priceStr} | Ahaaq Auto Exchange`,
    description: seo_description || `Check out this ${year} ${make} ${model} available at Ahaaq Auto Exchange in Jacksonville. ${vehicle.vehicleDetails?.mileage?.toLocaleString()} miles, ${vehicle.vehicleDetails?.transmission || "Automatic"}. Top deals in Jacksonville!`,
  };
}

export default async function VehiclePage({ params }) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const { title, content, featuredImage, vehicleDetails, galleryImages, status: rootStatus, tags } = vehicle;
  const { make, model, year, price, mileage, vin, bodyType, fuelType, transmission, status: detailStatus } = vehicleDetails || {};

  const status = (rootStatus || detailStatus || "available").toLowerCase();
  const isSold = status === "sold";
  const isPending = status === "pending";
  const isPriceDrop = status === "price_drop";

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
      "availability": isSold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
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
          <Link href="/inventory" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 font-bold text-xs tracking-widest uppercase transition-colors mb-8">
            <ArrowLeft size={16} /> USED CAR INVENTORY JACKSONVILLE
          </Link>

          {/* FANCY SOLD BANNER (IF SOLD) */}
          {isSold && (
            <div className="mb-10 bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-2 border-red-500/40 rounded-3xl p-6 md:p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-600/30 border border-red-400/50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-red-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-black tracking-widest uppercase">
                      SOLD OUT
                    </span>
                    <span className="text-xs text-red-200 font-bold uppercase tracking-wider">
                      Delivered to Jacksonville Driver
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight mt-1 text-white uppercase">
                    This {year} {make} {model} has been sold
                  </h2>
                </div>
              </div>
              <Link 
                href="/inventory"
                className="px-8 py-4 bg-white text-zinc-950 hover:bg-zinc-100 rounded-full font-black text-xs uppercase tracking-widest transition-all shrink-0 shadow-lg"
              >
                Browse Available Cars
              </Link>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Media & Gallery */}
            <div className="lg:w-2/3 space-y-8">
              <div className="relative aspect-[16/9] bg-zinc-100 rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-100">
                <Image
                  src={featuredImage?.node?.sourceUrl || "/placeholder-car.jpg"}
                  alt={title}
                  fill
                  className={`object-cover ${isSold ? "grayscale-[20%]" : ""}`}
                  priority
                />
                
                {/* Overlay Badge */}
                {isSold && (
                  <div className="absolute top-6 right-6">
                    <div className="px-6 py-2 rounded-full bg-red-600 text-white text-sm font-black uppercase tracking-[0.25em] shadow-2xl border border-red-300">
                      SOLD
                    </div>
                  </div>
                )}
              </div>

              <ImageGalleryClient 
                images={galleryImages} 
                title={title} 
                videoUrl={vehicle.videoUrl} 
              />

              {/* Tags Section */}
              {tags && tags.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-zinc-100">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Tag size={14} /> Vehicle Highlights &amp; Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <span key={idx} className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="prose prose-zinc max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-zinc-600 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Right: Details & Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-200">
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2">
                    {isSold && (
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
                        SOLD
                      </span>
                    )}
                    {isPending && (
                      <span className="px-3 py-1 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-widest">
                        SALE PENDING
                      </span>
                    )}
                    {isPriceDrop && (
                      <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest">
                        PRICE DROP
                      </span>
                    )}
                  </div>
                  <h1 className="text-4xl font-black tracking-tighter text-zinc-900 leading-none uppercase">
                    {year} {make}<br />
                    <span className="text-zinc-400">{model}</span>
                  </h1>
                  <p className="text-sm font-bold text-zinc-500 tracking-[0.2em] uppercase">VIN: {vin || "Contact Dealer"}</p>
                </div>

                {/* Price Display */}
                <div className="mb-10">
                  {isSold ? (
                    <div className="space-y-1">
                      <span className="text-3xl font-black text-red-600 tracking-tight block">
                        SOLD OUT
                      </span>
                      <span className="text-sm font-bold text-zinc-400 line-through">
                        Original Price: {formatPrice(price)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-4xl font-black text-zinc-900 tracking-tighter">
                      {formatPrice(price)}
                    </div>
                  )}
                </div>

                {/* Specs Grid */}
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
                    <p className={`font-bold uppercase text-xs ${isSold ? "text-red-600" : "text-emerald-600"}`}>
                      {isSold ? "Sold" : "Available"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-1.5 line-clamp-1">
                      <CreditCard size={12} /> Type
                    </span>
                    <p className="font-bold text-zinc-900">{bodyType || "Sedan"}</p>
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
                  {isSold ? (
                    <Link 
                      href="/inventory" 
                      className="block w-full py-5 bg-zinc-900 hover:bg-zinc-800 text-white text-center rounded-2xl font-black tracking-widest text-xs transition-all border border-zinc-900"
                    >
                      VIEW SIMILAR VEHICLES
                    </Link>
                  ) : (
                    <>
                      <Link href="#contact" className="block w-full py-5 bg-zinc-900 hover:bg-zinc-800 text-white text-center rounded-2xl font-black tracking-widest text-xs transition-all border border-zinc-900">
                        INQUIRE NOW
                      </Link>
                      <Link href="/finance/apply" className="block w-full py-5 bg-white hover:bg-zinc-100 text-zinc-900 text-center rounded-2xl font-black tracking-widest text-xs transition-all border border-zinc-200">
                        APPLY FOR FINANCING
                      </Link>
                    </>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-zinc-600" />
                  </div>
                  <p className="text-xs font-bold text-zinc-500 leading-tight">
                    Visit us in Jacksonville at <br />
                    <span className="text-zinc-900">6615 N Main St, Jacksonville, FL 32208</span>
                  </p>
                </div>
              </div>

              {/* Trust Card */}
              <div className="bg-zinc-950 p-8 rounded-[2rem] text-white">
                <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-zinc-400">Dealership Assurance</h4>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-sm font-medium">
                    <ShieldCheck className="text-zinc-400 shrink-0" size={18} />
                    Multi-point safety inspection completed
                  </li>
                  <li className="flex gap-2 text-sm font-medium">
                    <ShieldCheck className="text-zinc-400 shrink-0" size={18} />
                    Extended warranty &amp; GAP protection available
                  </li>
                  <li className="flex gap-2 text-sm font-medium">
                    <ShieldCheck className="text-zinc-400 shrink-0" size={18} />
                    Clean title guarantee &amp; vehicle history
                  </li>
                </ul>
              </div>

              {/* Contact Lead Form */}
              <VehicleContactForm 
                vehicleTitle={isSold ? `${title} (Sold - Inquire Similar)` : title} 
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
