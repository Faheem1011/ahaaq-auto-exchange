'use client';

import { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Facebook, Twitter } from 'lucide-react';

export default function VehicleShareBar({ vehicleTitle, price, slug }) {
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://ahhaqautoexchange.net/inventory/${slug}`;

  const shareText = `Check out this ${vehicleTitle} for ${price ? `$${price}` : 'sale'} at Ahaaq Auto Exchange in Jacksonville, FL!`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const input = document.createElement('input');
        input.value = currentUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  const shareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
    window.open(url, '_blank');
  };

  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
  };

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-6 pb-2 border-t border-zinc-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Share2 size={13} className="text-zinc-600" /> Share This Jacksonville Deal
          </span>
          <p className="text-xs text-zinc-600 font-medium">
            Know someone looking for a clean car in North Florida? Send them this listing!
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* WhatsApp */}
          <button
            onClick={shareWhatsApp}
            title="Share on WhatsApp"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-all border border-emerald-200 cursor-pointer"
          >
            <MessageCircle size={15} />
            <span className="text-[11px]">WhatsApp</span>
          </button>

          {/* Facebook */}
          <button
            onClick={shareFacebook}
            title="Share on Facebook"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all border border-blue-200 cursor-pointer"
          >
            <Facebook size={15} />
            <span className="text-[11px]">Facebook</span>
          </button>

          {/* X / Twitter */}
          <button
            onClick={shareTwitter}
            title="Share on X"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-all border border-zinc-200 cursor-pointer"
          >
            <Twitter size={14} />
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            title="Copy Direct Link"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all border border-zinc-900 cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span className="text-[11px]">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
