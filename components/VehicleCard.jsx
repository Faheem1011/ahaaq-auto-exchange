import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function VehicleCard({ vehicle }) {
  const { title, slug, featuredImage, vehicleDetails } = vehicle;
  const { make, model, year, price, mileage } = vehicleDetails || {};

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

  return (
    <Link href={`/inventory/${slug}`} className="group flex flex-col bg-white border border-zinc-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-zinc-300/50 transition-all duration-300">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-zinc-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title || "Vehicle Image"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Placeholder label if needed */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-zinc-900 text-xs font-bold px-3 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
          {make || "Premium"}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1">
            {year} {make} {model}
          </h3>
          <ArrowUpRight className="text-zinc-300 group-hover:text-zinc-900 transition-colors shrink-0" size={24} />
        </div>
        
        <p className="text-sm text-zinc-500 font-medium mb-6">
          {formatMileage(mileage)} • Clean Title
        </p>

        <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-2xl font-black text-zinc-900 tracking-tight">
            {formatPrice(price)}
          </span>
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
            Finance
          </span>
        </div>
      </div>
    </Link>
  );
}
