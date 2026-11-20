"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, UserCheck, Lock, Check, ArrowRight } from "lucide-react";

export default function SafetyTrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const animationTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationTriggered.current) {
          animationTriggered.current = true;
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const checklistItems = [
    "Rigorous safety protocols across every project",
    "Comprehensive background checks on all partners",
    "Thorough verification for every transaction",
  ];

  return (
    <section
      ref={sectionRef}
      id="safety"
      className="py-24 bg-gray-50 border-b border-gray-200 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* ─── LEFT COLUMN: TRUST STRIP, HEADING, INTRO, CHECKLIST, CTA ─── */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          
          {/* 1. Compact Horizontal Trust-Icon Certification Strip */}
          <div
            className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono font-bold text-gray-700 tracking-wider transition-all duration-700"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            <div className="flex items-center gap-1.5 text-gray-800">
              <ShieldCheck size={17} className="text-[#D95D16]" strokeWidth={2} />
              <span>Verified Agents</span>
            </div>

            <span className="h-3.5 w-[1px] bg-gray-300 hidden sm:inline-block" aria-hidden="true" />

            <div className="flex items-center gap-1.5 text-gray-800">
              <UserCheck size={17} className="text-[#D95D16]" strokeWidth={2} />
              <span>Background Checked</span>
            </div>

            <span className="h-3.5 w-[1px] bg-gray-300 hidden sm:inline-block" aria-hidden="true" />

            <div className="flex items-center gap-1.5 text-gray-800">
              <Lock size={17} className="text-[#D95D16]" strokeWidth={2} />
              <span>Secure Transactions</span>
            </div>
          </div>

          {/* 2. Heading with Self-Drawing Shield SVG Icon */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-700"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "150ms",
            }}
          >
            {/* Self-drawing Animated Shield SVG Icon */}
            <div className="w-10 h-10 rounded-full bg-[#D95D16]/10 border border-[#D95D16]/30 flex items-center justify-center shrink-0 shadow-sm">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D95D16"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  className="transition-all duration-800 ease-out"
                  style={{
                    strokeDasharray: 80,
                    strokeDashoffset: isVisible ? 0 : 80,
                  }}
                />
                <path
                  d="M9 12l2 2 4-4"
                  className="transition-all duration-500 ease-out"
                  style={{
                    strokeDasharray: 20,
                    strokeDashoffset: isVisible ? 0 : 20,
                    transitionDelay: "400ms",
                  }}
                />
              </svg>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 font-bold leading-tight tracking-tight">
              Unwavering Commitment to Safety & Trust
            </h2>
          </div>

          {/* 3. Short Intro Line (1 sentence) */}
          <p
            className="text-sm md:text-base text-gray-600 leading-relaxed font-sans font-medium transition-all duration-700"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "300ms",
            }}
          >
            Our commitment to building trust through safety is unwavering across every real estate dealing, partner relationship, and client journey.
          </p>

          {/* 4. 3-Item Animated Checklist */}
          <div className="flex flex-col gap-3 py-1 w-full">
            {checklistItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 text-sm md:text-base text-gray-800 font-sans font-semibold transition-all duration-500"
                style={{
                  transform: isVisible ? "translateY(0)" : "translateY(15px)",
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${450 + idx * 150}ms`,
                }}
              >
                <div
                  className="w-6 h-6 rounded-full bg-[#D95D16] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#D95D16]/20 transition-transform duration-300"
                  style={{
                    transform: isVisible ? "scale(1)" : "scale(0)",
                    transitionDelay: `${450 + idx * 150}ms`,
                  }}
                >
                  <Check size={14} strokeWidth={3} />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* 5. "LEARN MORE" Button */}
          <div
            className="pt-2 transition-all duration-700"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "950ms",
            }}
          >
            <Link
              href="/about#safety"
              className="group inline-flex items-center gap-3 bg-[#D95D16] hover:bg-[#c2410c] text-white text-xs font-extrabold uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Learn more</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

        {/* ─── RIGHT COLUMN: ARCHITECTURAL IMAGE & CIRCULAR SEAL BADGE ─── */}
        <div
          className="lg:col-span-5 relative mt-6 lg:mt-0 transition-all duration-800"
          style={{
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)",
            opacity: isVisible ? 1 : 0,
          }}
        >
          {/* Main Architectural Image Container */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 group bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80"
              alt="Motwani Safety and Quality Verification"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
          </div>

          {/* Verification Seal Badge overlapping corner */}
          <div
            className="absolute -bottom-5 right-4 lg:right-auto lg:-left-6 sm:-bottom-7 z-30 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#faf8f5] border-2 border-[#D95D16] shadow-xl flex flex-col items-center justify-center text-center p-2 transition-all duration-700 ease-out"
            style={{
              transform: isVisible ? "scale(1)" : "scale(0.8)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "200ms",
            }}
          >
            {/* Inner dashed ring */}
            <div className="absolute inset-1.5 rounded-full border border-dashed border-[#D95D16]/40 pointer-events-none" />

            <ShieldCheck size={22} className="text-[#D95D16] mb-0.5" strokeWidth={2.2} />
            <span className="text-xs sm:text-sm font-extrabold font-serif text-gray-900 leading-tight">
              100% Verified
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#D95D16] uppercase tracking-wider mt-0.5">
              TRUSTED & SECURE
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
