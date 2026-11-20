"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, X, Cookie, Check } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem("motwani_cookie_consent");
    if (!consent) {
      // Small delay before showing banner
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setConsentGiven(consent === "accepted");
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("motwani_cookie_consent", "accepted");
    setConsentGiven(true);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem("motwani_cookie_consent", "rejected");
    setConsentGiven(false);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleRevisitConsent = () => {
    setShowBanner(true);
  };

  return (
    <>
      {/* Floating "Revisit Consent" Button */}
      {!showBanner && (
        <button
          onClick={handleRevisitConsent}
          className="fixed bottom-5 left-5 z-40 bg-white/90 hover:bg-white text-gray-800 hover:text-[#D95D16] border border-gray-300 shadow-xl px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer backdrop-blur-md"
          title="Revisit Privacy & Cookie Consent Settings"
          aria-label="Revisit Cookie Consent"
        >
          <Cookie size={14} className="text-[#D95D16] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-sans font-medium text-[11px]">Revisit Consent</span>
        </button>
      )}

      {/* Cookie Banner Drawer */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white/98 backdrop-blur-md border-t-2 border-[#D95D16] shadow-[0_-10px_30px_rgba(0,0,0,0.15)] transition-all duration-300">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left Content */}
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-10 h-10 rounded-full bg-[#D95D16]/10 text-[#D95D16] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck size={20} />
              </div>
              <div className="flex flex-col gap-1 text-gray-800">
                <h4 className="text-sm md:text-base font-bold font-sans flex items-center gap-2">
                  <span>Privacy & Cookie Preferences</span>
                  <span className="text-[10px] font-mono text-[#D95D16] bg-[#D95D16]/10 px-2 py-0.5 rounded-full uppercase">Motwani Constructions</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and deliver personalized content. You can manage your preferences or revisit this consent setting at any time using the floating consent button.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end shrink-0">
              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-gray-900 border border-gray-300 hover:bg-gray-100 rounded-md transition-all uppercase tracking-wider cursor-pointer"
              >
                Reject Optional
              </button>

              <button
                onClick={handleAcceptAll}
                className="px-5 py-2 text-xs font-extrabold text-white bg-[#D95D16] hover:bg-[#c2410c] rounded-md transition-all shadow-md hover:shadow-lg uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
              >
                <Check size={14} />
                <span>Accept All Cookies</span>
              </button>

              <button
                onClick={() => setShowBanner(false)}
                className="p-2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                title="Close Banner"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
