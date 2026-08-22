import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame } from "lucide-react";

export default function VehicleCard({ vehicle }) {
  const { title, slug, featuredImage, vehicleDetails, status: rootStatus, tags: rootTags } = vehicle;
  const { make, model, year, price, mileage, status: detailStatus, tags: detailTags } = vehicleDetails || {};

  const status = (rootStatus || detailStatus || "available").toLowerCase();
  const tags = rootTags || detailTags || [];

  // Formatter for Currency and Mileage
  const formatPrice = (amount) => {
    if (!amount) return "Call for Price";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatMileage = (miles) => {
    if (!miles) return "N/A";
    return new Intl.NumberFormat("en-US").format(miles) + " mi";
  };

  const imageUrl = featuredImage?.node?.sourceUrl || "/placeholder-car.jpg";
  const isSold = status === "sold";
  const isPending = status === "pending";
  const isPriceDrop = status === "price_drop";

  return (
    <Link 
      href={`/inventory/${slug}`} 
      className={`group relative flex flex-col bg-white border rounded-3xl overflow-hidden transition-all duration-300 ${
        isSold 
          ? "border-red-900/30 hover:border-red-600/50 shadow-lg shadow-red-950/5 hover:shadow-red-900/15" 
          : "border-zinc-200 hover:border-zinc-400 hover:shadow-2xl hover:shadow-zinc-300/50"
      }`}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-zinc-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title || "Vehicle Image"}
          fill
          className={`object-cover transition-transform duration-500 ease-out ${
            isSold ? "grayscale-[30%] opacity-90 group-hover:scale-105" : "group-hover:scale-105"
          }`}
        />

        {/* Brand pill */}
        <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase shadow-md border border-white/10">
          {make || "Premium"}
        </div>

        {/* FANCY LUXURY SOLD BADGE */}
        {isSold && (
          <div className="absolute top-4 right-4 z-10">
            <div className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-red-950/60 border border-red-400/40 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white inline-block animate-ping"></span>
              SOLD
            </div>
          </div>
        )}

        {/* SALE PENDING BADGE */}
        {isPending && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-amber-500/90 backdrop-blur-md text-zinc-950 text-[11px] font-black uppercase tracking-wider shadow-lg border border-amber-300/50">
              SALE PENDING
            </div>
          </div>
        )}

        {/* PRICE DROP BADGE */}
        {isPriceDrop && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider shadow-lg border border-emerald-400/40">
              <Flame size={12} className="text-amber-300 fill-amber-300" /> PRICE DROP
            </div>
          </div>
        )}

        {/* Semi dark sold overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none flex items-end p-6">
            <div className="bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase">
              Vehicle Delivered
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        <div className="flex justify-between items-start mb-1.5">
          <h3 className="text-xl font-black tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1">
            {year} {make} {model}
          </h3>
          <ArrowUpRight className="text-zinc-300 group-hover:text-zinc-900 transition-colors shrink-0" size={24} />
        </div>
        
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-4">
          {formatMileage(mileage)} • Clean Title
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200 tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex flex-col">
            {isSold ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-red-600 tracking-tight">
                  SOLD
                </span>
                <span className="text-sm font-semibold text-zinc-400 line-through">
                  {formatPrice(price)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-black text-zinc-900 tracking-tight">
                {formatPrice(price)}
              </span>
            )}
          </div>
          
          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
            isSold 
              ? "bg-red-50 text-red-700 border border-red-200" 
              : "bg-zinc-100 text-zinc-800"
          }`}>
            {isSold ? "View Details" : "Finance Available"}
          </span>
        </div>
      </div>
    </Link>
  );
}
