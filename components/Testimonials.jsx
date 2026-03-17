import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Michael R.",
    role: "Jacksonville Resident",
    content: "Found my dream Lexus at Ahaaq. The process was transparent, professional, and the car was in pristine condition. Highly recommend for luxury pre-owned cars in North Florida.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Business Owner",
    content: "Excellent service and unbeatable prices. They really understand the needs of luxury car buyers. The team went above and beyond to ensure I was satisfied with my purchase.",
    rating: 5
  },
  {
    name: "David L.",
    role: "Car Enthusiast",
    content: "Ahaaq Auto Exchange is the best-kept secret in Jacksonville. Their selection of premium European imports is top-notch. I wouldn't go anywhere else for a luxury vehicle.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-[0.3em] text-zinc-500 uppercase">Trust & Excellence</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
              WHAT OUR <br/>
              <span className="text-zinc-600 uppercase">CLIENTS SAY</span>
            </h3>
          </div>
          <div className="flex items-center gap-2 pb-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-zinc-800" />
              ))}
            </div>
            <p className="text-sm font-bold text-zinc-400 ml-2">4.9/5 from 200+ Reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-800 relative group hover:bg-zinc-900 transition-colors">
              <Quote className="absolute top-8 right-8 text-zinc-800 group-hover:text-zinc-700 transition-colors" size={40} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-white text-white" />
                ))}
              </div>

              <p className="text-zinc-300 font-medium leading-relaxed mb-8 italic">
                &quot;{t.content}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800" />
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-zinc-500 font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
