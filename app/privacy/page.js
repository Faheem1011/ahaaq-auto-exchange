import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Ahaaq Auto Exchange",
  description: "Our commitment to protecting your privacy and personal data at Ahaaq Auto Exchange in Jacksonville, FL.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-40 pb-24 px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-zinc-900 uppercase tracking-tight mb-8">
          Privacy <span className="text-zinc-400">Policy</span>
        </h1>
        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600 font-medium leading-relaxed">
          <p>Effective Date: March 15, 2026</p>
          <p>
            At Ahaaq Auto Exchange, we value your privacy. This Privacy Policy describes how we collect, use, and share your personal information when you visit our website or use our services in Jacksonville, FL.
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 uppercase mt-12 mb-4">Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you request a trade-in value, apply for financing, or contact us. This may include your name, email address, phone number, vehicle information (VIN, mileage), and financial details.
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 uppercase mt-12 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and improve our automotive services.</li>
            <li>To process your financing applications.</li>
            <li>To communicate with you about vehicle availability and offers.</li>
            <li>To comply with legal obligations in the state of Florida.</li>
          </ul>
          <h2 className="text-2xl font-bold text-zinc-900 uppercase mt-12 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:<br />
            <strong>Ahaaq Auto Exchange</strong><br />
            8310 Beach Blvd Suite 2, Jacksonville FL 32216<br />
            Email: Ahaaqautoexchange@yahoo.com
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
