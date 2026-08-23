"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Settings, X, Check, Cookie, Lock, Eye } from "lucide-react";
import Link from "next/link";

const COOKIE_STORAGE_KEY = "ahaaq_cookie_consent_v1";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    functional: true
  });

  useEffect(() => {
    const isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) {
        setMounted(true);
        try {
          const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
          if (!saved) {
            setShowBanner(true);
          } else {
            const parsed = JSON.parse(saved);
            setPreferences(parsed);
          }
        } catch {
          setShowBanner(true);
        }
      }
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Listen for custom event to open preferences from Footer or any link
  useEffect(() => {
    const handleOpenPreferences = () => {
      setShowPreferences(true);
      setShowBanner(false);
    };

    window.addEventListener("open-cookie-preferences", handleOpenPreferences);
    return () => window.removeEventListener("open-cookie-preferences", handleOpenPreferences);
  }, []);

  const saveConsent = (consentSettings) => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(consentSettings));
      // Also write cookie for SSR / middleware
      document.cookie = `ahaaq_consent=${JSON.stringify(consentSettings)}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (e) {
      console.error(e);
    }
    setPreferences(consentSettings);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    };
    saveConsent(allAccepted);
  };

  const handleRejectNonEssential = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    };
    saveConsent(onlyEssential);
  };

  const handleSavePreferences = () => {
    saveConsent({
      ...preferences,
      essential: true,
      timestamp: new Date().toISOString()
    });
  };

  if (!mounted) return null;

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 1. FLOATING MINIMALIST COOKIE BANNER                             */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {showBanner && !showPreferences && (
        <aside 
          aria-label="Cookie Consent Banner"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500"
        >
          <div className="bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 text-white rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie size={16} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Privacy &amp; Cookie Settings
                </h3>
                <p className="text-xs text-zinc-400 font-normal leading-relaxed">
                  We use cookies to ensure optimal performance, personalized inventory suggestions, and real-time repair tracking. Read our{" "}
                  <Link href="/privacy" className="text-white underline underline-offset-2 hover:text-zinc-300">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:flex-1 py-2.5 px-4 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:flex-1 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider rounded-xl border border-zinc-800 transition-all cursor-pointer"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="p-2.5 text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-900 rounded-xl border border-zinc-800/80 transition-colors"
                title="Customize Preferences"
                aria-label="Customize Cookie Preferences"
              >
                <Settings size={15} />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 2. INTERACTIVE COOKIE PREFERENCES MODAL                         */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {showPreferences && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Cookie Preferences"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">
                    Cookie Preferences
                  </h3>
                  <p className="text-[11px] text-zinc-400">Manage how cookies are stored on your device.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-4 text-xs">
              
              {/* Strictly Necessary */}
              <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white uppercase text-[11px]">
                    <Lock size={12} className="text-zinc-400" />
                    Strictly Necessary Cookies
                  </div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md">
                    Always Active
                  </span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Required for site security, session maintenance, inventory loading, and work order tracking. Cannot be deactivated.
                </p>
              </div>

              {/* Analytics */}
              <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white uppercase text-[11px]">
                    <Eye size={12} className="text-zinc-400" />
                    Analytics &amp; Performance
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
                  </label>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Helps us understand how visitors interact with our dealership inventory and service booking tools to improve page speed and user experience.
                </p>
              </div>

              {/* Functional */}
              <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white uppercase text-[11px]">
                    <Settings size={12} className="text-zinc-400" />
                    Functional Preferences
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
                  </label>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Stores your vehicle filters, preferred appointment times, and language preferences across sessions.
                </p>
              </div>

              {/* Marketing */}
              <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white uppercase text-[11px]">
                    <Cookie size={12} className="text-zinc-400" />
                    Marketing &amp; Targeting
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
                  </label>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Used to deliver relevant special offers and vehicle promotions based on your browsing interests.
                </p>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full sm:flex-1 py-3 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check size={14} /> Save Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:flex-1 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-zinc-800 transition-all cursor-pointer"
              >
                Allow All Cookies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
