import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy & Financing Disclosures | Ahaaq Auto Exchange",
  description: "Our commitment to protecting your privacy and automotive financing disclosures at Ahaaq Auto Exchange in Jacksonville, FL.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-44 pb-24 px-8 max-w-4xl mx-auto">
        <div className="space-y-2 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Consumer Privacy &amp; Disclosures
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 uppercase tracking-tight">
            Privacy <span className="text-zinc-400">Policy</span>
          </h1>
          <p className="text-xs text-zinc-500 font-medium">Effective Date: March 15, 2026 • Last Updated: August 2026</p>
        </div>

        <div className="prose prose-zinc max-w-none space-y-8 text-zinc-600 font-medium leading-relaxed">
          <p>
            At <strong>Ahaaq Auto Exchange LLC</strong> (&quot;Ahaaq,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to respecting your privacy and protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and protect your information when you visit our website (<a href="https://ahhaqautoexchange.net" className="text-zinc-900 font-bold underline">ahhaqautoexchange.net</a>) or interact with our automotive dealership services in Jacksonville, Florida.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 uppercase pt-4 border-t border-zinc-200">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us through our website contact forms, vehicle inquiry forms, pre-qualification submissions, trade-in valuations, and financing links. This information may include:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li><strong>Contact Details:</strong> Full name, telephone number, email address, and physical address.</li>
            <li><strong>Vehicle Preference:</strong> Vehicle of interest, VIN, requested terms, and trade-in vehicle details.</li>
            <li><strong>Communication Data:</strong> Message inquiries, appointment requests, and follow-up notes.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-900 uppercase pt-4 border-t border-zinc-200">2. Automotive Financing &amp; Third-Party Lending Disclosures</h2>
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wider">
              Credit Acceptance Hosted Application (Dealer Code: DCX3C)
            </h3>
            <p className="text-sm">
              When you choose to apply for auto financing or start your credit approval on our website, you are securely transferred to the official hosted application platform operated by <strong>Credit Acceptance Corporation</strong> (<code className="text-zinc-800">startyourcreditapproval.com/credit-application/DCX3C</code>).
            </p>
            <p className="text-sm">
              <strong>Zero Local SSN Storage:</strong> Ahaaq Auto Exchange LLC does not collect, process, or store sensitive credit identifiers (such as Social Security Numbers, full credit bureau files, or bank account credentials) on this website. All sensitive credit underwriting is performed strictly and securely by Credit Acceptance on their 256-bit SSL encrypted servers.
            </p>
            <p className="text-sm">
              We receive customer contact details and application reference updates from Credit Acceptance in accordance with our dealer agreement to assist you with vehicle selection, deal structuring, and vehicle delivery.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 uppercase pt-4 border-t border-zinc-200">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To assist with test drives, vehicle reservations, trade-in valuations, and financing assistance.</li>
            <li>To provide customer service via phone, email, or WhatsApp regarding your vehicle inquiries.</li>
            <li>To manage dealership inventory and sales records in compliance with Florida Department of Highway Safety and Motor Vehicles (FLHSMV) regulations.</li>
            <li>To prevent fraud and maintain the security of our website and dealership services.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-900 uppercase pt-4 border-t border-zinc-200">4. Information Sharing &amp; Security</h2>
          <p>
            We do not sell, rent, or trade your personal information to unaffiliated third parties for their independent marketing purposes. We share information only with our authorized lending partners (such as Credit Acceptance), trusted service providers, or when required by law enforcement or regulatory authorities.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 uppercase pt-4 border-t border-zinc-200">5. Contact Us</h2>
          <p>
            If you have questions about our privacy practices, please contact us directly:<br />
            <strong>Ahaaq Auto Exchange LLC</strong><br />
            6615 N Main St, Jacksonville, FL 32208<br />
            Phone: <a href="tel:+19045029709" className="text-zinc-900 font-bold underline">+1 (904) 502-9709</a><br />
            Email: <a href="mailto:Ahaaqautoexchange@yahoo.com" className="text-zinc-900 font-bold underline">Ahaaqautoexchange@yahoo.com</a>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
