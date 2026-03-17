import { fetchGraphQL } from '@/lib/graphql';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Calendar, Gauge, CreditCard, MapPin, ArrowLeft, Banknote, Clock } from 'lucide-react';
import Link from 'next/link';

async function getVehicleBySlug(slug) {
  const query = `
    query GetVehicle($id: ID!) {
      vehicle(id: $id, idType: SLUG) {
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        vehicleDetails {
          make
          model
          year
          price
          mileage
          vin
          bodyType
          fuelType
          transmission
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL(query, { id: slug });
    return data.vehicle;
  } catch (err) {
    console.error('Error fetching vehicle:', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const vehicle = await getVehicleBySlug(params.slug);
  if (!vehicle) return { title: 'Vehicle Not Found' };
  
  return {
    title: `${vehicle.vehicleDetails?.year} ${vehicle.vehicleDetails?.make} ${vehicle.vehicleDetails?.model} | Ahaaq Auto Exchange`,
    description: `View details for the ${vehicle.vehicleDetails?.year} ${vehicle.vehicleDetails?.make} ${vehicle.vehicleDetails?.model} at Ahaaq Auto Exchange in Jacksonville, FL.`,
  };
}

export default async function VehiclePage({ params }) {
  const vehicle = await getVehicleBySlug(params.slug);

  if (!vehicle) {
    notFound();
  }

  const { title, content, featuredImage, vehicleDetails } = vehicle;
  const { make, model, year, price, mileage, vin, bodyType, fuelType, transmission } = vehicleDetails || {};

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
      <Navbar />
      
      <div className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb / Back */}
          <Link href="/inventory" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 font-bold text-xs tracking-widest uppercase transition-colors mb-12">
            <ArrowLeft size={16} /> BACK TO INVENTORY
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
              
              <div className="prose prose-zinc max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-zinc-600 prose-p:leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            </div>

            {/* Right: Details & Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-200">
                <div className="space-y-2 mb-8">
                  <h1 className="text-4xl font-black tracking-tighter text-zinc-900 leading-none uppercase">
                    {year} {make}<br/>
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
                    Visit us in Jacksonville at <br/>
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
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
