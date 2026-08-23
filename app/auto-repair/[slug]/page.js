import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Wrench, CheckCircle2, ShieldCheck, Phone, AlertCircle } from "lucide-react";

const SERVICE_DATA = {
  "brake-repair": {
    title: "Brake Repair & Rotor Service in Jacksonville, FL",
    headline: "Precision Brake Pad Replacement & Rotor Resurfacing",
    desc: "Ensure maximum stopping power and safety on Florida roads. From ceramic brake pads and precision rotor resurfacing to brake fluid flushes and ABS diagnostics.",
    symptoms: [
      "Squeaking, grinding, or high-pitched squealing when pressing the brake pedal",
      "Spongy or soft brake pedal feel that sinks to the floor",
      "Vehicle pulling to one side when braking",
      "Vibration or pulsation through the steering wheel during braking",
      "Brake warning light or ABS light illuminated on dashboard"
    ],
    checklist: [
      "Brake pad thickness and friction material measurement",
      "Rotor runout, thickness, and surface scoring inspection",
      "Brake caliper piston movement and slide pin lubrication",
      "Brake fluid moisture content and boiling point test",
      "Brake lines, hoses, and master cylinder leak check",
      "Complete road test and brake bedding procedure"
    ],
    couponTag: "BRAKES",
    couponText: "$30 OFF Complete Brake Service (Per Axle)"
  },
  "oil-change": {
    title: "Synthetic Oil Change Service in Jacksonville, FL",
    headline: "Premium Motor Oil & OEM Filter Replacement",
    desc: "Protect your engine against extreme Florida heat. Our certified oil service includes up to 5 quarts of full synthetic oil, genuine OEM filter replacement, and a 21-point safety inspection.",
    symptoms: [
      "Oil change reminder or maintenance light on dashboard",
      "Dark, gritty, or low engine oil level on dipstick",
      "Engine knocking, ticking, or louder-than-normal engine noise",
      "More than 5,000 to 7,500 miles since your last synthetic oil service",
      "Burnt oil smell inside vehicle cabin"
    ],
    checklist: [
      "Engine oil drain and full synthetic oil refill up to 5 quarts",
      "Genuine OEM engine oil filter replacement",
      "Engine air filter and cabin air filter inspection",
      "Fluid level check (coolant, brake fluid, power steering, washer fluid)",
      "Tire pressure check and tire tread depth measurement",
      "Underbody inspection for fluid leaks"
    ],
    couponTag: "OIL CHANGE",
    couponText: "$15 OFF Full Synthetic Oil Service"
  },
  "engine-diagnostics": {
    title: "Check Engine Light & Diagnostics in Jacksonville, FL",
    headline: "Advanced Computerized Engine & Sensor Diagnostics",
    desc: "Don't guess what's wrong with your vehicle. Our certified diagnostic technicians use professional scan tools to read live engine telemetry, test sensors, and isolate the exact root cause.",
    symptoms: [
      "Check engine light flashing or steady on dashboard",
      "Engine misfiring, stumbling, rough idling, or stalling",
      "Loss of engine power, sluggish acceleration, or limp mode",
      "Poor fuel economy and high gas consumption",
      "Failed Florida emissions or OBD readiness monitor tests"
    ],
    checklist: [
      "Complete OBD-II computer fault code extraction",
      "Live engine data stream analysis (fuel trim, O2 sensors, MAF)",
      "Ignition system testing (spark plugs, ignition coils)",
      "Fuel delivery system and fuel injector pressure test",
      "Smoke test for intake or vacuum system leaks",
      "Clear codes and road verification test"
    ],
    couponTag: "DIAGNOSTICS",
    couponText: "Complimentary Scan with Authorized Repair"
  },
  "ac-repair": {
    title: "Auto A/C Repair & Recharge in Jacksonville, FL",
    headline: "Stay Cool with Complete Climate Control Servicing",
    desc: "Florida summers demand ice-cold air conditioning. We diagnose compressor failures, condenser leaks, blend doors, and provide precision R134a and 1234yf refrigerant recharges.",
    symptoms: [
      "A/C blowing warm or room-temperature air instead of cold",
      "Weak airflow coming out of dashboard vents",
      "Loud clicking or grinding noises when turning on the A/C",
      "Musty or moldy odors coming from air vents",
      "Puddle of water inside passenger cabin floorboard"
    ],
    checklist: [
      "High and low side refrigerant pressure testing",
      "Electronic leak detection and UV dye inspection",
      "A/C compressor clutch engagement and relay test",
      "Condenser and cooling fan operation verification",
      "Cabin air filter inspection and evaporator coil check",
      "Vacuum evacuation and precision weight refrigerant recharge"
    ],
    couponTag: "A/C SERVICE",
    couponText: "$25 OFF Complete A/C Recharge & Inspection"
  },
  "transmission-service": {
    title: "Transmission Service & Repair in Jacksonville, FL",
    headline: "Smooth Shifting & Transmission Fluid Exchanges",
    desc: "Prevent costly transmission replacements with timely fluid exchanges, filter replacements, and electronic shift diagnostics.",
    symptoms: [
      "Hard shifting, delayed engagement, or slipping between gears",
      "Dark brown or burnt-smelling transmission fluid",
      "Transmission warning light or AT light illuminated",
      "Red fluid leaking underneath vehicle",
      "Whining, clunking, or humming noises in gear"
    ],
    checklist: [
      "Transmission fluid condition and level check",
      "Pan drop and internal transmission filter replacement",
      "Pan gasket cleaning and magnetic debris inspection",
      "Transmission cooler line inspection",
      "Computerized transmission control module scan",
      "Road test to verify shift points and converter lockup"
    ],
    couponTag: "TRANSMISSION",
    couponText: "$20 OFF Transmission Fluid Exchange"
  },
  "suspension-repair": {
    title: "Suspension & Steering Repair in Jacksonville, FL",
    headline: "Restoring Comfort, Stability, and Road Control",
    desc: "Replace worn struts, shocks, control arms, and ball joints for a smooth, stable, and safe ride across Jacksonville.",
    symptoms: [
      "Bumpy, harsh ride or vehicle bouncing excessively over bumps",
      "Clunking or knocking noises when driving over bumps or turning",
      "Uneven tire wear or premature tread wear on inner/outer edges",
      "Loose or wandering steering wheel on highway",
      "Vehicle nose-diving when braking hard"
    ],
    checklist: [
      "Front and rear shock absorber and strut dampening inspection",
      "Upper and lower ball joints and control arm bushing check",
      "Tie rod ends, steering rack, and sway bar links inspection",
      "Wheel bearing play and hub assembly check",
      "Chassis lubrication and hardware torque verification",
      "4-wheel computer alignment check"
    ],
    couponTag: "SUSPENSION",
    couponText: "$35 OFF Struts or Shocks Replacement"
  },
  "battery-service": {
    title: "Battery, Starter & Alternator Repair in Jacksonville, FL",
    headline: "Reliable Starting Power & Charging System Tests",
    desc: "Extreme Florida heat drains automotive batteries quickly. We provide fast load testing, terminal corrosion cleaning, and battery/alternator replacements.",
    symptoms: [
      "Slow engine cranking or clicking noise when turning the key",
      "Battery warning light or charge light on dashboard",
      "Dim headlights or flickering interior lights",
      "Corrosion or white powdery buildup on battery terminals",
      "Battery over 3 to 4 years old"
    ],
    checklist: [
      "Digital battery conductance and cold cranking amps (CCA) test",
      "Alternator output voltage and amperage charging test",
      "Starter motor current draw test",
      "Terminal cleaning and anti-corrosion protective treatment",
      "Serpentine belt tension and condition inspection",
      "Parasitic battery drain testing"
    ],
    couponTag: "BATTERY",
    couponText: "Free Battery & Charging System Test"
  },
  "electrical-diagnostics": {
    title: "Automotive Electrical System Diagnostics in Jacksonville, FL",
    headline: "Expert Wiring, Sensor & Module Troubleshooting",
    desc: "From power windows and door locks to complex body control modules and lighting, our technicians resolve difficult electrical faults.",
    symptoms: [
      "Power windows, door locks, or mirrors not operating",
      "Headlights, taillights, or turn signals not illuminating",
      "Blown fuses that repeatedly short out",
      "Radio, navigation, or dashboard display going blank",
      "Vehicle battery dying overnight due to electrical draw"
    ],
    checklist: [
      "Systematic circuit diagram analysis and voltage drop testing",
      "Fuse box and relay block inspection",
      "Body Control Module (BCM) and ECU communication scan",
      "Ground point inspection and wiring harness testing",
      "Switch, actuator, and motor functional verification",
      "Parasitic draw isolation with amp clamp"
    ],
    couponTag: "ELECTRICAL",
    couponText: "$20 OFF Diagnostic Services"
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const data = SERVICE_DATA[resolvedParams?.slug];
  if (!data) return {};
  return {
    title: `${data.title} | AHAQ Auto Exchange`,
    description: data.desc,
  };
}

export default async function AutoRepairServicePage({ params }) {
  const resolvedParams = await params;
  const service = SERVICE_DATA[resolvedParams?.slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-8 bg-zinc-950 text-white relative">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-3 max-w-3xl">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/30">
              Jacksonville Mechanical Service • 6615 N Main St
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-zinc-300 font-medium leading-relaxed">
              {service.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={`/book-service?service=${resolvedParams.slug}`}
              className="px-8 py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-950/40 flex items-center gap-2"
            >
              <Wrench size={16} /> Book This Service Online
            </Link>
            <a
              href="tel:+19045029709"
              className="px-8 py-4.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all border border-white/20 flex items-center gap-2"
            >
              <Phone size={16} /> Call (904) 502-9709
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Symptoms Checklist */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 flex items-center gap-1.5">
                <AlertCircle size={14} /> Warning Signs
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                Common Symptoms You Need This Service
              </h2>
            </div>

            <ul className="space-y-3">
              {service.symptoms.map((sym, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-zinc-700">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    !
                  </div>
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Inspection Procedure */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1.5">
                <ShieldCheck size={14} /> Certified Inspection
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                What Our Technicians Check
              </h2>
            </div>

            <ul className="space-y-3">
              {service.checklist.map((chk, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-zinc-700">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{chk}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Special Coupon Card */}
        <div className="p-8 bg-gradient-to-r from-zinc-950 to-zinc-900 text-white rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-widest border border-amber-500/30">
              Special Discount
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">
              {service.couponText}
            </h3>
            <p className="text-xs text-zinc-400">
              Mention this offer when booking or checking in your vehicle at our Jacksonville workshop.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/book-service?service=${resolvedParams.slug}`}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg"
            >
              Claim &amp; Schedule
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
