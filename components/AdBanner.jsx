'use client';

import { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdBanner({
  slot = '',
  format = 'auto',
  responsive = 'true',
  className = '',
  variant = 'horizontal', // 'horizontal' | 'sidebar' | 'inline'
}) {
  const adRef = useRef(null);
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (adsenseClientId && slot && typeof window !== 'undefined') {
      try {
        if ((window.adsbygoogle = window.adsbygoogle || [])) {
          window.adsbygoogle.push({});
        }
      } catch (err) {
        console.warn('AdSense load error:', err);
      }
    }
  }, [adsenseClientId, slot]);

  // If AdSense client ID & slot are present, render AdSense unit
  if (adsenseClientId && slot) {
    return (
      <div className={`my-8 overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-200/80 p-3 text-center ${className}`}>
        <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
          Sponsored / Advertisement
        </span>
        <ins
          ref={adRef}
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={adsenseClientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    );
  }

  // High-converting Dealer Promo Fallback / Local Jacksonville Spotlight
  if (variant === 'sidebar') {
    return (
      <div className={`p-6 rounded-[2rem] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white border border-zinc-800 shadow-xl relative overflow-hidden ${className}`}>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black tracking-widest uppercase border border-amber-500/30">
            Jacksonville Special
          </span>
        </div>
        <h4 className="text-base font-black tracking-tight uppercase leading-tight mb-2">
          $500 Top-Dollar Trade-In Voucher
        </h4>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          Upgrade your ride today. We pay top market value for any make or model in Jacksonville.
        </p>
        <Link
          href="/finance/trade-in"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          Value Your Trade <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className={`my-8 p-6 sm:p-8 rounded-[2rem] bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 text-white border border-zinc-800 shadow-2xl relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 w-64 h-full bg-radial from-amber-500/10 to-transparent pointer-events-none" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black tracking-widest uppercase border border-emerald-500/30 flex items-center gap-1">
              <Sparkles size={12} /> 100% Credit Approval Program
            </span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider hidden sm:inline">
              Duval &amp; North Florida
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
            Drive Home Today With Flexible Financing
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Good credit, bad credit, or first-time buyer? We partner with Credit Acceptance to get you approved on the spot in Jacksonville, FL.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
          <Link
            href="/finance/apply"
            className="px-6 py-3.5 bg-white text-zinc-950 hover:bg-zinc-100 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-all shadow-lg"
          >
            Apply Online Now
          </Link>
          <a
            href="tel:9045029709"
            className="px-5 py-3.5 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest text-center transition-all border border-zinc-700"
          >
            Call (904) 502-9709
          </a>
        </div>
      </div>
    </div>
  );
}
