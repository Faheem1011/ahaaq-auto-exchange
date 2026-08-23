import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Calculator, FileText, CheckCircle, CarFront, ShieldCheck, QrCode, Globe2 } from "lucide-react";
import FinancingCtaModal from "@/components/FinancingCtaModal";

export const metadata = {
  title: "Credit Acceptance Car Financing in Jacksonville, FL | Ahaaq Auto Exchange",
  description: "Apply for car financing online through Credit Acceptance at Ahaaq Auto Exchange in Jacksonville, FL. All credit types welcome with fast online approval, English & Spanish support.",
  keywords: "credit acceptance car financing Jacksonville, bad credit car loans Jacksonville, auto loans Jacksonville FL, startyourcreditapproval DCX3C, no money down used cars Jacksonville",
};

export default function FinanceCentre() {
  const englishUrl = "https://www.startyourcreditapproval.com/credit-application/DCX3C";
  const spanishUrl = "https://www.startyourcreditapproval.com/credit-application/DCX3C?lang=es";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Credit Acceptance financing work at Ahaaq Auto Exchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Through our official Credit Acceptance partnership (Dealer Code: DCX3C), customers can complete an encrypted online credit application in English or Spanish and receive fast financing decisions for any vehicle in our Jacksonville inventory."
        }
      },
      {
        "@type": "Question",
        "name": "Can I finance a car with bad credit or no credit in Jacksonville?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Credit Acceptance specializes in enabling approvals for customers across all credit histories—whether rebuilding credit, first-time buyers, or excellent credit."
        }
      },
      {
        "@type": "Question",
        "name": "Can I finance a car with zero down payment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ahaaq Auto Exchange offers zero-down financing options for qualified buyers in the Jacksonville area, with opportunities to delay your first payment for up to 60 days."
        }
      },
      {
        "@type": "Question",
        "name": "Is my credit information secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. When you start your credit approval, you are securely transferred to Credit Acceptance's 256-bit SSL encrypted application portal. Your sensitive credit and underwriting data is processed strictly by Credit Acceptance."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-28 sm:pt-36 lg:pt-44 pb-20 bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-zinc-950/80 to-zinc-950 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full text-center space-y-6 sm:space-y-8">
          
          {/* Partnership Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] sm:text-[11px] font-black tracking-widest uppercase shadow-lg">
            <ShieldCheck size={14} className="text-zinc-300" /> Official Credit Acceptance Dealer • Code: DCX3C
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-tight max-w-5xl mx-auto">
            Online Car <span className="text-zinc-400">Financing Approval</span> in Jacksonville
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Get approved in minutes through our secure <strong>Credit Acceptance</strong> portal. We welcome all credit backgrounds with competitive terms, zero-down options, and bilingual English &amp; Spanish applications.
          </p>

          {/* Primary Action Launcher Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-2xl mx-auto">
            <FinancingCtaModal 
              buttonText="Apply Online (English)"
              buttonClassName="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 hover:bg-zinc-200 font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              source="financing_page_hero"
            />
            
            <a 
              href={spanishUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest rounded-full border border-zinc-700 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Globe2 size={16} className="text-zinc-400" />
              Solicitar en Español
            </a>
          </div>

          <p className="text-xs text-zinc-500 pt-2 flex items-center justify-center gap-2 font-medium">
            <ShieldCheck size={14} className="text-zinc-400" />
            256-Bit SSL Encrypted • Direct transfer to Credit Acceptance portal (<span className="text-zinc-400">startyourcreditapproval.com</span>)
          </p>
        </div>
      </section>

      {/* QR Code & Mobile Fast Track Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
              <QrCode size={12} /> Smartphone Fast-Track
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Apply on Your Mobile Device in Minutes
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              Scan our official Credit Acceptance QR code with your smartphone camera to open the instant credit approval portal directly on your phone.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
              <a 
                href={englishUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-white hover:underline flex items-center gap-1"
              >
                English Link: /credit-application/DCX3C <ArrowRight size={14} />
              </a>
              <a 
                href={spanishUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-zinc-400 hover:text-white hover:underline flex items-center gap-1"
              >
                Spanish Link: /credit-application/DCX3C?lang=es <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div className="text-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-xl p-2 shadow-xl mx-auto mb-2 flex items-center justify-center">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(englishUrl)}`}
                  alt="Credit Acceptance English QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">English App</span>
            </div>

            <div className="text-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-xl p-2 shadow-xl mx-auto mb-2 flex items-center justify-center">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(spanishUrl)}`}
                  alt="Credit Acceptance Spanish QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">En Español</span>
            </div>
          </div>
        </div>
      </section>

      {/* Finance Tools Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">Dealership Calculators &amp; Appraisals</h2>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 uppercase">Empower Your Purchase</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Tool 1 */}
          <Link href="/finance/calculator" className="group block p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-400 hover:shadow-xl transition-all">
            <Calculator className="w-10 h-10 text-zinc-900 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-zinc-900 mb-2">Payment Calculator</h4>
            <p className="text-zinc-600 mb-6 font-medium text-sm">Estimate your monthly payments, calculate your APR, and determine your loan terms instantly.</p>
            <span className="flex items-center gap-2 font-bold text-sm text-zinc-900 uppercase tracking-widest group-hover:underline">
              Calculate <ArrowRight size={16} />
            </span>
          </Link>

          {/* Tool 2 */}
          <Link href="/finance/trade-in" className="group block p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-400 hover:shadow-xl transition-all">
            <CarFront className="w-10 h-10 text-zinc-900 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-zinc-900 mb-2">Value Your Trade</h4>
            <p className="text-zinc-600 mb-6 font-medium text-sm">Get a fair, market-accurate appraisal for your current vehicle in minutes to apply towards your purchase.</p>
            <span className="flex items-center gap-2 font-bold text-sm text-zinc-900 uppercase tracking-widest group-hover:underline">
              Get Appraisal <ArrowRight size={16} />
            </span>
          </Link>

          {/* Tool 3 */}
          <Link href="/finance/lease-vs-buy" className="group block p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-400 hover:shadow-xl transition-all">
            <FileText className="w-10 h-10 text-zinc-900 mb-6 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-zinc-900 mb-2">Lease vs. Buy</h4>
            <p className="text-zinc-600 mb-6 font-medium text-sm">Not sure whether to finance or lease? Compare the benefits of both options to make an informed decision.</p>
            <span className="flex items-center gap-2 font-bold text-sm text-zinc-900 uppercase tracking-widest group-hover:underline">
              Compare Options <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>

      {/* Why Finance With Us */}
      <section className="py-16 sm:py-24 bg-zinc-950 text-white px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-400 uppercase">The Ahaaq Advantage</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase">Why Finance With Credit Acceptance?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center">
            <div className="flex flex-col items-center space-y-3 sm:space-y-4 p-6 bg-zinc-900/40 rounded-3xl border border-zinc-800">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              <h4 className="text-lg sm:text-xl font-bold">All Credit Types Welcome</h4>
              <p className="text-zinc-400 text-xs sm:text-sm font-medium">We specialize in approvals for rebuilding credit, first-time buyers, and established credit alike. Your past does not define your future at Ahaaq.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4 p-6 bg-zinc-900/40 rounded-3xl border border-zinc-800">
              <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              <h4 className="text-lg sm:text-xl font-bold">100% Confidential Underwriting</h4>
              <p className="text-zinc-400 text-xs sm:text-sm font-medium">Your credit application is processed directly through Credit Acceptance&apos;s encrypted system, guaranteeing complete privacy and peace of mind.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4 p-6 bg-zinc-900/40 rounded-3xl border border-zinc-800">
              <CarFront className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              <h4 className="text-lg sm:text-xl font-bold">Zero Down &amp; Deferred Payments</h4>
              <p className="text-zinc-400 text-xs sm:text-sm font-medium">Many programs allow zero-down financing with deferred first payments up to 60 days on eligible vehicles in our Jacksonville inventory.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase">Common Questions</h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900 uppercase">Credit Acceptance FAQ</h3>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
            <h4 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">How fast will I know my approval status?</h4>
            <p className="text-zinc-600 text-sm font-medium">Most Credit Acceptance applications provide an immediate decision online. Bobby Ali and our team will then contact you to finalize the deal and schedule your test drive.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
            <h4 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">Can I apply in Spanish?</h4>
            <p className="text-zinc-600 text-sm font-medium">Yes! Credit Acceptance provides a complete Spanish application portal. Simply select the Spanish option or visit <code className="text-zinc-800">/credit-application/DCX3C?lang=es</code>.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
            <h4 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">What documents should I bring to the dealership?</h4>
            <p className="text-zinc-600 text-sm font-medium">Bring your valid driver&apos;s license, proof of insurance, recent pay stubs or bank statements for income verification, and your trade-in&apos;s title or registration if applicable.</p>
          </div>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
            <h4 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">Will applying online guarantee my car?</h4>
            <p className="text-zinc-600 text-sm font-medium">Applying online pre-arranges your credit approval so you can lock in terms. We recommend contacting us at 904-502-9709 immediately after applying so we can hold your vehicle for your visit.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
