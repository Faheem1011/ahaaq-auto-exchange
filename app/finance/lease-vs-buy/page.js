import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X } from "lucide-react";
import Link from "next/link";

export default function LeaseVsBuy() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-40 pb-24 px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 uppercase">
            Lease vs. Buy
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            Not sure which path is right for you? Compare the benefits of leasing versus financing your next luxury vehicle to make an informed decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Buying Card */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-black text-zinc-900 uppercase mb-4">Financing (Buying)</h2>
            <p className="text-zinc-600 font-medium mb-8 pb-8 border-b border-zinc-200">
              When you finance a vehicle, you are paying for the entire cost of the car. Once the loan is paid off, you own the vehicle outright.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 p-1 rounded-full text-green-700">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">Ownership Equity</h3>
                  <p className="text-sm text-zinc-600">You build equity with each payment. Once paid off, the car is yours to keep, sell, or trade.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 p-1 rounded-full text-green-700">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">No Mileage Limits</h3>
                  <p className="text-sm text-zinc-600">Drive as much as you want without worrying about excess mileage penalties.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 p-1 rounded-full text-green-700">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">Customization</h3>
                  <p className="text-sm text-zinc-600">Modify your vehicle however you like (wheels, tint, performance upgrades) without breaking lease terms.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-red-100 p-1 rounded-full text-red-700">
                  <X size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">Higher Variable Costs</h3>
                  <p className="text-sm text-zinc-600">Monthly payments are generally higher than a lease, and out-of-warranty repairs are your responsibility.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Leasing Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-2xl font-black text-white uppercase mb-4">Leasing</h2>
            <p className="text-zinc-400 font-medium mb-8 pb-8 border-b border-zinc-800">
              When you lease, you are only paying for the depreciation of the car during the term of the lease (usually 2-3 years), plus rent charges.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-green-900/50 p-1 rounded-full text-green-400">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Lower Payments</h3>
                  <p className="text-sm text-zinc-400">Monthly payments and initial out-of-pocket costs are typically significantly lower than financing.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-green-900/50 p-1 rounded-full text-green-400">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Always Under Warranty</h3>
                  <p className="text-sm text-zinc-400">You rarely worry about major repair bills since most leases don&apos;t exceed the bumper-to-bumper warranty.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-green-900/50 p-1 rounded-full text-green-400">
                  <Check size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Latest Technology</h3>
                  <p className="text-sm text-zinc-400">Upgrade to a brand new luxury vehicle every few years, always enjoying the newest safety and tech features.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-red-900/50 p-1 rounded-full text-red-400">
                  <X size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Mileage & Wear Restrictions</h3>
                  <p className="text-sm text-zinc-400">You must stick to a pre-agreed mileage limit (often 10k-12k/year) and maintain the car&apos;s condition to avoid fees.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 text-center space-y-6">
          <h3 className="text-2xl font-bold text-zinc-900 uppercase">Still Undecided?</h3>
          <p className="text-zinc-600 font-medium max-w-xl mx-auto">
            Our finance specialists can run side-by-side scenarios on the specific vehicle you&apos;re interested in, showing exactly how the numbers compare.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/finance/apply" className="px-8 py-4 bg-zinc-950 text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors tracking-widest uppercase w-full sm:w-auto flex justify-center">
              Apply Now
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-transparent border border-zinc-900 text-zinc-900 font-bold rounded-lg hover:bg-zinc-100 transition-colors tracking-widest uppercase w-full sm:w-auto flex justify-center">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
