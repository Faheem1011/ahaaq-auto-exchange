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
import FinancingCtaModal from '@/components/FinancingCtaModal';
import VehicleShareBar from '@/components/VehicleShareBar';
import AdBanner from '@/components/AdBanner';

async function getVehicleBySlug(slug) {
  if (!slug) return null;
  const rawSlug = decodeURIComponent(slug).trim();
  const normalizedSlug = rawSlug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(rawSlug);

  try {
    const supabase = await createClient();
    
    // 1. Try querying Supabase with appropriate condition based on format
    let query = supabase.from('vehicles').select('*');
    if (isUuid) {
      query = query.or(`id.eq.${rawSlug},slug.eq.${rawSlug}`);
    } else {
      query = query.or(`slug.eq.${normalizedSlug},slug.eq.${rawSlug},slug.ilike.${normalizedSlug}`);
    }

    const { data: vList, error } = await query.limit(1);

    if (error) {
      console.warn('Supabase getVehicleBySlug query warning:', error.message);
    }

    let v = vList?.[0];

    // Fallback: check all supabase vehicles if direct query didn't match (e.g. legacy spaced slug)
    if (!v) {
      const { data: allV } = await supabase.from('vehicles').select('*');
      if (allV && allV.length > 0) {
        v = allV.find(item => {
          const itemSlug = (item.slug || '').toLowerCase().replace(/\s+/g, '-');
          return (
            item.id === rawSlug ||
            item.slug === rawSlug ||
            itemSlug === normalizedSlug ||
            itemSlug.includes(normalizedSlug) ||
            normalizedSlug.includes(itemSlug)
          );
        });
      }
    }
    
    if (v) {
      return {
        id: v.id,
        title: `${v.year} ${v.make} ${v.model}`,
        slug: (v.slug || v.id || '').replace(/\s+/g, '-'),
        status: v.status || 'available',
        tags: v.tags || [],
        content: v.description ? `<p>${v.description}</p>` : '<p>Clean title, fully inspected vehicle ready for immediate delivery in Jacksonville, FL.</p>',
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

  // 2. Fallback to localVehicles (matching slug, id, or normalized variations)
  const local = localVehicles.find(item => {
    const itemSlug = (item.slug || '').toLowerCase().replace(/\s+/g, '-');
    return (
      item.id === rawSlug ||
      item.slug === rawSlug ||
      itemSlug === normalizedSlug ||
      itemSlug.includes(normalizedSlug) ||
      normalizedSlug.includes(itemSlug)
    );
  });

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

  const { year, make, model, price, mileage, seo_title, seo_description } = vehicle.vehicleDetails || {};
  const priceFormatted = price ? `$${Number(price).toLocaleString()}` : 'Great Price';
  const featuredImg = vehicle.featuredImage?.node?.sourceUrl || 'https://ahhaqautoexchange.net/images/Jacksonville-ahaaq-hero-banner.webp';
  const pageUrl = `https://ahhaqautoexchange.net/inventory/${vehicle.slug}`;

  const title = seo_title || `${year} ${make} ${model} for Sale in Jacksonville, FL (${priceFormatted}) | Ahaaq Auto Exchange`;
  const description = seo_description || `Check out this clean ${year} ${make} ${model} available at Ahaaq Auto Exchange in Jacksonville, FL. ${mileage ? `${Number(mileage).toLocaleString()} miles` : 'Clean title'}, cold AC, automatic. Easy financing available at 6615 N Main St!`;

  return {
    title,
    description,
    keywords: [
      `${year} ${make} ${model}`,
      `${year} ${make} ${model} Jacksonville FL`,
      `used ${make} ${model} for sale`,
      `used cars Jacksonville FL 32208`,
      `Ahaaq Auto Exchange inventory`,
      `cheap cars Jacksonville FL under 5000`
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Ahaaq Auto Exchange',
      images: [
        {
          url: featuredImg,
          width: 1200,
          height: 630,
          alt: `${year} ${make} ${model} For Sale Jacksonville FL`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featuredImg],
    },
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

  // Comprehensive Schema.org Car & Local Business JSON-LD
  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Car", "Product", "Vehicle"],
        "@id": `https://ahhaqautoexchange.net/inventory/${slug}#vehicle`,
        "name": `${year} ${make} ${model}`,
        "description": `${year} ${make} ${model} for sale in Jacksonville, FL at Ahaaq Auto Exchange. Features ${mileage ? `${Number(mileage).toLocaleString()} miles` : 'low miles'}, ${transmission || 'Automatic'} transmission, and clean title.`,
        "image": galleryImages?.length > 0 ? galleryImages : [featuredImage?.node?.sourceUrl || "https://ahhaqautoexchange.net/placeholder-car.jpg"],
        "brand": {
          "@type": "Brand",
          "name": make
        },
        "model": model,
        "vehicleModelDate": `${year}`,
        "bodyType": bodyType || "SUV",
        "vehicleTransmission": transmission || "Automatic",
        "fuelType": fuelType || "Gasoline",
        "mileageFromOdometer": {
          "@type": "QuantitativeValue",
          "value": mileage || 0,
          "unitCode": "SMI"
        },
        "vehicleIdentificationNumber": vin && vin !== 'Contact Dealer' ? vin : undefined,
        "itemCondition": "https://schema.org/UsedCondition",
        "offers": {
          "@type": "Offer",
          "url": `https://ahhaqautoexchange.net/inventory/${slug}`,
          "priceCurrency": "USD",
          "price": price || 0,
          "priceValidUntil": new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
          "availability": isSold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
          "seller": {
            "@type": "AutoDealer",
            "@id": "https://ahhaqautoexchange.net/#dealer",
            "name": "Ahaaq Auto Exchange",
            "telephone": "+19045029709",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "6615 N Main St",
              "addressLocality": "Jacksonville",
              "addressRegion": "FL",
              "postalCode": "32208",
              "addressCountry": "US"
            }
          }
        }
      },
      {
        "@type": "AutoDealer",
        "@id": "https://ahhaqautoexchange.net/#dealer",
        "name": "Ahaaq Auto Exchange",
        "url": "https://ahhaqautoexchange.net",
        "logo": "https://ahhaqautoexchange.net/logo.png",
        "telephone": "+19045029709",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "6615 N Main St",
          "addressLocality": "Jacksonville",
          "addressRegion": "FL",
          "postalCode": "32208",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 30.3879,
          "longitude": -81.6528
        },
        "areaServed": [
          "Jacksonville, FL",
          "Duval County, FL",
          "Orange Park, FL",
          "St. Augustine, FL",
          "Yulee, FL",
          "North Florida"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://ahhaqautoexchange.net"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Used Car Inventory",
            "item": "https://ahhaqautoexchange.net/inventory"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${year} ${make} ${model}`,
            "item": `https://ahhaqautoexchange.net/inventory/${slug}`
          }
        ]
      }
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />
      <Navbar />

      <div className="pt-28 sm:pt-36 lg:pt-44 pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb / Back */}
          <Link href="/inventory" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 font-bold text-xs tracking-widest uppercase transition-colors mb-6 sm:mb-8">
            <ArrowLeft size={16} /> USED CAR INVENTORY JACKSONVILLE
          </Link>

          {/* FANCY SOLD BANNER (IF SOLD) */}
          {isSold && (
            <div className="mb-8 sm:mb-10 bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-2 border-red-500/40 rounded-3xl p-5 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-600/30 border border-red-400/50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-red-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] sm:text-[11px] font-black tracking-widest uppercase">
                      SOLD OUT
                    </span>
                    <span className="text-xs text-red-200 font-bold uppercase tracking-wider">
                      Delivered to Jacksonville Driver
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight mt-1 text-white uppercase">
                    This {year} {make} {model} has been sold
                  </h2>
                </div>
              </div>
              <Link 
                href="/inventory"
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white text-zinc-950 hover:bg-zinc-100 rounded-full font-black text-xs uppercase tracking-widest transition-all shrink-0 shadow-lg text-center"
              >
                Browse Available Cars
              </Link>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
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

              {/* Social Share Bar for Local Reach */}
              <VehicleShareBar 
                vehicleTitle={title} 
                price={price} 
                slug={slug} 
              />

              {/* Description */}
              <div className="prose prose-zinc max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-zinc-600 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* AdSense / Local Dealer Spotlight Banner */}
              <AdBanner 
                variant="horizontal"
                slot="1234567890" 
              />

              {/* Local Jacksonville Neighborhood Service Block */}
              <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-200/80 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-zinc-900" />
                  <h3 className="text-xs font-black tracking-widest uppercase text-zinc-900">
                    Serving Drivers Across Jacksonville &amp; North Florida
                  </h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Ahaaq Auto Exchange proudly serves used car buyers throughout Duval County, Clay County, Nassau County, and St. Johns County including Northside, Arlington, Riverside, Avondale, San Marco, Southside, Oceanway, Mandarin, Orange Park, Middleburg, and Yulee.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Link href="/inventory" className="text-[11px] font-bold text-zinc-700 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-400 transition-colors">
                    Used SUVs Jacksonville
                  </Link>
                  <Link href="/finance/apply" className="text-[11px] font-bold text-zinc-700 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-400 transition-colors">
                    Bad Credit Car Loans FL
                  </Link>
                  <Link href="/auto-repair" className="text-[11px] font-bold text-zinc-700 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-400 transition-colors">
                    Auto Repair 32208
                  </Link>
                  <Link href="/window-tinting" className="text-[11px] font-bold text-zinc-700 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-400 transition-colors">
                    Window Tinting Jax
                  </Link>
                </div>
              </div>
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
                      <FinancingCtaModal 
                        vehicle={vehicle} 
                        buttonText="APPLY FOR FINANCING" 
                        buttonClassName="block w-full py-5 bg-white hover:bg-zinc-100 text-zinc-900 text-center rounded-2xl font-black tracking-widest text-xs transition-all border border-zinc-200 cursor-pointer"
                        source="vehicle_detail"
                      />
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
