"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';

const faqs = [
  {
    question: "Where is Ahaaq Auto Exchange located in Jacksonville?",
    answer: "We are conveniently located at 7749 Normandy Blvd, Jacksonville, FL 32221. Our dealership is easily accessible for residents across Jacksonville, Orange Park, and the surrounding areas."
  },
  {
    question: "Do you offer financing for bad credit in Jacksonville?",
    answer: "Yes, we specialize in helping Jacksonville drivers with all credit types. Our finance team works with multiple lenders to secure competitive rates for buyers with good, bad, or no credit history."
  },
  {
    question: "Can I sell my car to you even if I don't buy from you?",
    answer: "Absolutely! We are always looking to grow our inventory with quality local vehicles. We provide free, no-obligation appraisals and will give you a cash offer for your vehicle even if you aren't purchasing one from us."
  },
  {
    question: "What makes Ahaaq Auto Exchange different from other Jacksonville dealers?",
    answer: "We focus on transparency, quality, and a pressure-free experience. Every vehicle in our inventory is hand-selected and undergoes a rigorous inspection. We pride ourselves on serving the Jacksonville community with integrity and the best prices in the region."
  },
  {
    question: "Do you offer zero-down payment options?",
    answer: "Yes, we have many zero-down payment programs available for qualified buyers. We also offer flexible terms and can help you defer your first payment in many cases."
  },
  {
    question: "Do your vehicles come with a warranty?",
    answer: "Many of our vehicles are still under original manufacturer warranty, and for those that aren't, we offer a variety of extended service contracts and protection plans to give you peace of mind on the Jacksonville roads."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <section className="pt-40 pb-24 px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 uppercase">
            Frequently Asked <span className="text-zinc-400">Questions</span>
          </h1>
          <p className="text-zinc-500 font-medium">
            Find answers to common questions about car buying, financing, and our services in Jacksonville, FL.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-zinc-200 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 transition-colors"
              >
                <span className="text-lg font-bold text-zinc-900 leading-tight">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="text-zinc-400 shrink-0" size={20} />
                ) : (
                  <Plus className="text-zinc-900 shrink-0" size={20} />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-zinc-600 font-medium leading-relaxed border-t border-zinc-100 bg-white">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-zinc-950 rounded-3xl p-12 text-center text-white space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">Still have questions?</h2>
          <p className="text-zinc-400 font-medium max-w-xl mx-auto">
            Our expert team is here to help you with every step of the car buying process in Jacksonville.
          </p>
          <div className="flex justify-center pt-4">
            <Link href="/contact" className="px-10 py-4 bg-white text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-colors uppercase tracking-widest text-xs">
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
