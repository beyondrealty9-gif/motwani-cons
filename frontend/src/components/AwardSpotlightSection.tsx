"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight, Trophy } from "lucide-react";

export default function AwardSpotlightSection() {
  const [imageVisible, setImageVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imgObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFooterVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (imageRef.current) imgObserver.observe(imageRef.current);
    if (footerRef.current) footerObserver.observe(footerRef.current);

    return () => {
      imgObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex flex-col gap-12 lg:gap-16">
        
        {/* ─── 1. FULL-WIDTH CINEMATIC WIDESCREEN IMAGE BLOCK (21:9) ─── */}
        <div
          ref={imageRef}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[380px] md:min-h-[460px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 group"
        >
          {/* Zoom Out Background Image Settle Effect (scale 1.22 -> 1.0) */}
          <div
            className="absolute inset-0 transition-all duration-1200"
            style={{
              transform: imageVisible ? "scale(1)" : "scale(1.22)",
              opacity: imageVisible ? 1 : 0,
              transitionProperty: "transform, opacity",
              transitionDuration: "1200ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80"
              alt="National Recognition for Affordable Housing - Motwani PMAY Award 2025"
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>

          {/* Dark Gradient Overlay for Crisp Overlaid Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

          {/* Overlaid Bottom-Left Text Content */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-10 lg:p-14 flex flex-col items-start gap-3 max-w-4xl transition-all duration-700"
            style={{
              transform: imageVisible ? "translateY(0)" : "translateY(30px)",
              opacity: imageVisible ? 1 : 0,
              transitionDelay: "200ms",
            }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#D95D16] bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 uppercase tracking-widest shadow-md">
              <Award size={14} />
              <span>AWARD SPOTLIGHT</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight tracking-tight drop-shadow-md">
              National Recognition for Affordable Housing
            </h2>
          </div>

          {/* ─── CIRCULAR MEDAL / SEAL BADGE (Floating Top-Right / Responsive) ─── */}
          <div
            className="absolute top-4 right-4 sm:-top-5 sm:-right-5 lg:-top-6 lg:-right-6 z-30 flex flex-col items-center pointer-events-none transition-all duration-700 ease-out"
            style={{
              transform: imageVisible ? "scale(1) rotate(0deg)" : "scale(0) rotate(-15deg)",
              opacity: imageVisible ? 1 : 0,
              transitionDelay: "350ms",
            }}
          >
            {/* Medal Outer Gold/Orange Circle */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#F59E0B] via-[#D95D16] to-[#B4480A] border-4 border-white shadow-2xl shadow-[#D95D16]/40 flex flex-col items-center justify-center text-center p-2 text-white relative z-10">
              <div className="absolute inset-1 rounded-full border border-dashed border-white/50 pointer-events-none" />
              <Trophy size={20} className="text-yellow-200 mb-0.5" strokeWidth={2.2} />
              <span className="text-[10px] sm:text-xs font-extrabold font-mono uppercase tracking-wider leading-none">
                2025
              </span>
              <span className="text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-yellow-100 mt-0.5">
                HONOREE
              </span>
            </div>

            {/* Medal Hanging Fabric Ribbon Tails */}
            <div className="flex gap-1.5 -mt-3 relative z-0">
              <svg width="18" height="28" viewBox="0 0 18 28" fill="none" className="transform -rotate-6 drop-shadow">
                <path d="M0 0H18V28L9 22L0 28V0Z" fill="url(#ribbonGrad1)" />
                <defs>
                  <linearGradient id="ribbonGrad1" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D95D16" />
                    <stop offset="1" stopColor="#9A3412" />
                  </linearGradient>
                </defs>
              </svg>
              <svg width="18" height="28" viewBox="0 0 18 28" fill="none" className="transform rotate-6 drop-shadow">
                <path d="M0 0H18V28L9 22L0 28V0Z" fill="url(#ribbonGrad2)" />
                <defs>
                  <linearGradient id="ribbonGrad2" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D95D16" />
                    <stop offset="1" stopColor="#9A3412" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>

        {/* ─── 2. BELOW-IMAGE EDITORIAL FOOTER (2-COLUMN) ─── */}
        <div
          ref={footerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-700 pt-4"
          style={{
            transform: footerVisible ? "translateY(0)" : "translateY(25px)",
            opacity: footerVisible ? 1 : 0,
          }}
        >
          {/* LEFT COLUMN (~45%): PULL QUOTE + ATTRIBUTION */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4 relative pl-2">
            <span className="text-6xl md:text-7xl font-serif text-[#D95D16]/25 leading-none select-none absolute -top-8 -left-3 pointer-events-none">
              “
            </span>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-gray-900 leading-snug font-normal relative z-10">
              &ldquo;Our people are dedicated to finding solutions to every challenge. That spirit makes for some great stories.&rdquo;
            </blockquote>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D95D16] mt-1 block">
              — Motwani Leadership Team
            </span>
          </div>

          {/* THIN VERTICAL DIVIDER (DESKTOP) / HORIZONTAL DIVIDER (MOBILE) */}
          <div className="hidden lg:block lg:col-span-1 flex justify-center">
            <div className="h-28 w-[1px] bg-gray-200" aria-hidden="true" />
          </div>
          <div className="block lg:hidden w-full h-[1px] bg-gray-200 my-2" aria-hidden="true" />

          {/* RIGHT COLUMN (~55%): CONDENSED PARAGRAPH + UNDERLINED CTA LINK */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans font-normal">
              Motwani Constructions was honored on a national platform as a PMAY Award Winner 2025. Our landmark project, MJ WOODS in Natwar Vatika near Chandaka forest, sets a new benchmark for affordable housing.
            </p>

            <Link
              href="/news"
              className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold text-[#D95D16] uppercase tracking-widest underline underline-offset-8 decoration-2 hover:text-[#b4480a] transition-all"
            >
              <span>Read Full Story</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
