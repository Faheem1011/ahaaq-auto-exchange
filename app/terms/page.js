import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Ahaaq Auto Exchange",
  description: "The terms and conditions for using the Ahaaq Auto Exchange website and services in Jacksonville, FL.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-40 pb-24 px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-zinc-900 uppercase tracking-tight mb-8">
          Terms of <span className="text-zinc-400">Service</span>
        </h1>
        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600 font-medium leading-relaxed">
          <p>Last Updated: March 15, 2026</p>
          <p>
            Welcome to Ahaaq Auto Exchange. By accessing our website, you agree to comply with these Terms of Service.
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 uppercase mt-12 mb-4">Accuracy of Information</h2>
          <p>
            While we strive to keep our inventory and pricing up to date, all vehicle information is subject to change without notice. Please contact us to verify availability and final pricing.
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 uppercase mt-12 mb-4">Financing and Trade-Ins</h2>
          <p>
            All financing offers are subject to credit approval. Trade-in offers are preliminary until a physical inspection is performed at our Jacksonville dealership.
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 uppercase mt-12 mb-4">Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Florida.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
