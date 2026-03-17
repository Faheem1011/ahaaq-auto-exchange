import { ShieldCheck, Truck, Clock, Banknote } from "lucide-react";

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
              At Ahaaq Auto Exchange, we don&apos;t just sell cars. We build relationships based on trust, quality, and the best prices in Jacksonville. From $0 start quotes to premium pre-sale services, we&apos;ve got you covered.
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

          {/* Graphical Side - Premium Abstract Mesh Placeholder */}
          <div className="flex-1 w-full max-w-xl aspect-square relative bg-white rounded-[4rem] border border-zinc-200 shadow-2xl shadow-zinc-200/50 flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#fff_0%,#f4f4f5_100%)]" />
            
            {/* Minimalist Design Elements */}
            <div className="relative z-10 text-center space-y-4 px-12">
              <div className="text-9xl font-black text-zinc-900/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">AHAAQ</div>
              <div className="space-y-2">
                <span className="block text-4xl font-black text-zinc-900">100%</span>
                <span className="block text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">Quality Inspected</span>
              </div>
            </div>

            {/* Subtle animated border effect */}
            <div className="absolute inset-4 rounded-[3.5rem] border border-dashed border-zinc-200 opacity-50 group-hover:rotate-6 transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}
