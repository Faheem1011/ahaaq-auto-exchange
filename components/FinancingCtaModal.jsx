'use client';

import { useState } from 'react';
import { ShieldCheck, ExternalLink, QrCode, X, Phone, User, Globe2 } from 'lucide-react';

export default function FinancingCtaModal({ 
  vehicle = null, 
  buttonText = "Apply for Financing",
  buttonClassName = "",
  source = "vehicle_detail"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleLaunch = async (selectedLang = language) => {
    setLoading(true);
    try {
      const res = await fetch('/api/financing/cta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: vehicle?.id || vehicle?.slug || null,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/inventory',
          source: source,
          language: selectedLang,
          customerName: customerName.trim() || undefined,
          customerPhone: customerPhone.trim() || undefined
        })
      });

      const data = await res.json();
      const targetUrl = data?.redirectUrl || (
        selectedLang === 'es' 
          ? 'https://www.startyourcreditapproval.com/credit-application/DCX3C?lang=es'
          : 'https://www.startyourcreditapproval.com/credit-application/DCX3C'
      );

      // Open in new tab securely
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    } catch (err) {
      console.error('Error initiating financing:', err);
      window.open('https://www.startyourcreditapproval.com/credit-application/DCX3C', '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const englishUrl = "https://www.startyourcreditapproval.com/credit-application/DCX3C";
  const spanishUrl = "https://www.startyourcreditapproval.com/credit-application/DCX3C?lang=es";

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={buttonClassName || "w-full py-5 bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl hover:shadow-2xl border border-zinc-800 flex items-center justify-center gap-2"}
      >
        <ShieldCheck size={18} className="text-emerald-400" />
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck size={12} /> Credit Acceptance • Dealer Code: DCX3C
              </span>
            </div>

            <h3 className="text-2xl font-black tracking-tight uppercase text-white mb-2">
              Online Credit Application
            </h3>

            {vehicle ? (
              <div className="mb-6 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Selected Vehicle</span>
                  <span className="text-sm font-black text-white">{vehicle.title || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}</span>
                </div>
                {vehicle.price && (
                  <span className="text-sm font-black text-emerald-400">
                    ${Number(vehicle.price).toLocaleString()}
                  </span>
                )}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 mb-6">
                Fast, secure online auto financing approval in minutes for all credit types in Jacksonville, FL.
              </p>
            )}

            {/* Language Selection */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                <Globe2 size={14} /> Choose Application Language:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all ${
                    language === 'en'
                      ? 'bg-white text-zinc-950 border-white shadow-lg'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  🇺🇸 English Application
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all ${
                    language === 'es'
                      ? 'bg-white text-zinc-950 border-white shadow-lg'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  🇪🇸 En Español
                </button>
              </div>
            </div>

            {/* Optional Concierge Info */}
            <div className="space-y-3 mb-6">
              <span className="text-[11px] font-semibold text-zinc-400 block">
                Optional: Let Bobby Ali and our team assist your approval:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div className="relative">
                  <Phone size={14} className="absolute left-3.5 top-3.5 text-zinc-500" />
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleLaunch(language)}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-950/40 transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Launching Portal...' : (
                  language === 'es' ? 'Abrir Solicitud de Crédito' : 'Launch Credit Application'
                )}
                <ExternalLink size={16} />
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowQr(!showQr)}
                  className="text-[11px] font-bold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <QrCode size={14} /> {showQr ? 'Hide Mobile QR Code' : 'Scan on Mobile Phone'}
                </button>

                <span className="text-[10px] text-zinc-500 font-semibold flex items-center gap-1">
                  <ShieldCheck size={12} className="text-zinc-400" /> 256-Bit SSL Encrypted
                </span>
              </div>

              {/* QR Code Expansion */}
              {showQr && (
                <div className="mt-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left animate-in fade-in duration-200">
                  <div className="w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center shrink-0">
                    {/* Embedded scannable QR svg pointing to official Credit Acceptance portal */}
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(language === 'es' ? spanishUrl : englishUrl)}`}
                      alt="Credit Acceptance QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                      Scan with your smartphone camera
                    </h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Complete your Credit Acceptance application directly on your phone in under 5 minutes.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-zinc-500 mt-6 leading-relaxed text-center">
              You will be securely redirected to our official Credit Acceptance dealer portal (<code className="text-zinc-400">DCX3C</code>). Your credit details are handled directly by Credit Acceptance.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
