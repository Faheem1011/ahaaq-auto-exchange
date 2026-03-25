"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";

export default function PaymentCalculator() {
  const [price, setPrice] = useState(50000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeValue, setTradeValue] = useState(0);
  const [tradePayoff, setTradePayoff] = useState(0);
  const [taxRate, setTaxRate] = useState(7.0);
  const [apr, setApr] = useState(4.99);
  const [term, setTerm] = useState(60);

  // Derived state (calculated on every render)
  const calculatePayments = () => {
    const p0 = Number(price) - Number(downPayment) - (Number(tradeValue) - Number(tradePayoff));
    const tax = (Number(taxRate) / 100) * Number(price);
    const principal = p0 + tax;
    const totalFinancedValue = principal > 0 ? principal : 0;

    let monthlyValue = 0;
    let biweeklyValue = 0;
    let weeklyValue = 0;

    if (principal > 0 && term > 0) {
      if (apr > 0) {
        const r = (Number(apr) / 100) / 12;
        const n = Number(term);
        const m = (r * principal) / (1 - Math.pow(1 + r, -n));
        monthlyValue = m;
        biweeklyValue = m / 2;
        weeklyValue = m / 4;
      } else {
        const m = principal / Number(term);
        monthlyValue = m;
        biweeklyValue = m / 2;
        weeklyValue = m / 4;
      }
    }

    return {
      monthly: monthlyValue,
      biweekly: biweeklyValue,
      weekly: weeklyValue,
      totalFinanced: totalFinancedValue
    };
  };

  const { monthly, biweekly, weekly, totalFinanced } = calculatePayments();

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-40 pb-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center mb-4">
            <CalcIcon className="w-12 h-12 text-zinc-900" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 uppercase">
            Payment Calculator
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            Estimate your monthly payments. Adjust the variables below to find the perfect financing terms for your purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-6 bg-zinc-50 p-8 rounded-3xl border border-zinc-200">
            <h2 className="text-xl font-bold text-zinc-900 mb-6 uppercase tracking-wider">Variables</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Vehicle Price ($)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Down Payment ($)</label>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Trade-in Value ($)</label>
                <input type="number" value={tradeValue} onChange={(e) => setTradeValue(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Estimated Trade Payoff ($)</label>
                <input type="number" value={tradePayoff} onChange={(e) => setTradePayoff(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Interest Rate (APR %)</label>
                <input type="number" step="0.01" value={apr} onChange={(e) => setApr(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Tax Rate (%)</label>
                <input type="number" step="0.01" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-zinc-700">Loan Term (Months): {term}</label>
                <input type="range" min="12" max="84" step="12" value={term} onChange={(e) => setTerm(e.target.value)} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
                <div className="flex justify-between text-xs text-zinc-500 font-medium mt-2">
                  <span>12m</span>
                  <span>24m</span>
                  <span>36m</span>
                  <span>48m</span>
                  <span>60m</span>
                  <span>72m</span>
                  <span>84m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="space-y-8 bg-zinc-950 p-8 rounded-3xl border border-zinc-900 text-white flex flex-col justify-center">
            <h2 className="text-xl font-bold text-zinc-400 mb-2 uppercase tracking-wider">Estimated Payments</h2>
            
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <p className="text-sm text-zinc-400 font-bold mb-1 uppercase tracking-widest">Monthly</p>
              <p className="text-5xl font-black tracking-tighter text-white">{formatCurrency(monthly)}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <p className="text-sm text-zinc-400 font-bold mb-1 uppercase tracking-widest">Bi-Weekly</p>
                <p className="text-3xl font-bold tracking-tighter text-zinc-200">{formatCurrency(biweekly)}</p>
              </div>
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <p className="text-sm text-zinc-400 font-bold mb-1 uppercase tracking-widest">Weekly</p>
                <p className="text-3xl font-bold tracking-tighter text-zinc-200">{formatCurrency(weekly)}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-500 font-bold uppercase tracking-wider text-sm">Amount Financed</span>
              <span className="font-bold text-zinc-300">{formatCurrency(totalFinanced)}</span>
            </div>

            <p className="text-[11px] text-zinc-600 leading-relaxed pt-4">
              *Calculated payments are estimates and do not represent a financing offer. Final rates, terms, and payments are subject to credit approval, vehicle qualification, and lender requirements.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
