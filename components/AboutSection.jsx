import { ShieldCheck, Truck, Clock, Banknote } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const services = [
    {
      title: "PRE-SALE INSPECTION",
      desc: "Every vehicle undergoes a rigorous multi-point mechanical and safety inspection.",
      icon: ShieldCheck
    },
    {
      title: "EXTENDED WARRANTY",
      desc: "Drive with peace of mind with our flexible extended powertrain coverage options.",
      icon: Clock
    },
    {
      title: "FAST FINANCING",
      desc: "Get approved in minutes. We work with all credit types to find your best rate.",
      icon: Banknote
    },
    {
      title: "NATIONWIDE DELIVERY",
      desc: "Located outside Jacksonville? We can arrange secure shipping to your doorstep.",
      icon: Truck
    }
  ];

  return (
    <section className="py-32 bg-[#FAFAFA] px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <h2 className="text-sm font-bold tracking-[0.3em] text-zinc-500 uppercase">Our Difference</h2>
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-[1.05]">
              WE REDEFINE THE <br/>
              <span className="text-zinc-400">CAR BUYING</span><br/>
              EXPERIENCE
            </h3>
            <p className="text-lg text-zinc-600 font-medium leading-relaxed max-w-xl">
              As the leading <strong>auto exchange in Jacksonville, FL</strong>, we specialize in high-quality pre-owned vehicles from Toyota, Lexus, Mercedes-Benz, and BMW. Our <strong>Jacksonville car dealership</strong> is built on a foundation of transparency, offering the best market-driven prices and comprehensive pre-sale inspections.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 pt-8">
              {services.map((service, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-zinc-200 flex items-center justify-center text-zinc-900">
                    <service.icon size={22} />
                  </div>
                  <h4 className="font-bold text-zinc-900 text-sm tracking-widest uppercase">{service.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Graphical Side - Premium Image */}
          <div className="flex-1 w-full max-w-xl aspect-square relative rounded-[4rem] overflow-hidden group shadow-2xl shadow-zinc-200/50 border border-zinc-100">
            <Image 
              src="/images/porsche-hero.png" 
              alt="Luxury Performance" 
              fill
              className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
            
            {/* Minimalist Design Elements */}
            <div className="absolute bottom-12 left-12 z-10 space-y-2">
              <div className="text-4xl font-black text-white">100%</div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-zinc-100 uppercase">Quality Inspected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
