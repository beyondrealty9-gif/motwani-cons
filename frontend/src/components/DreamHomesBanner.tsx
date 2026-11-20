"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

const bannerImages = [
  {
    src: "/dream_homes_family.jpg",
    alt: "Building Dream Homes For Every Family - Motwani Constructions",
    effectLabel: "Zoom In Reveal",
  },
  {
    src: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80",
    alt: "Koradakanta Luxury Residential Elevation",
    effectLabel: "Slide Up Reveal",
  },
  {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    alt: "Biophilic Architectural Interior & Elevation",
    effectLabel: "Pan Right Reveal",
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    alt: "Pioneering Sustainable & Modern Real Estate",
    effectLabel: "Rotate & Scale Reveal",
  },
];

export default function DreamHomesBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer to trigger text reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

  // Automatic 4-image slideshow every 2 seconds (2000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % bannerImages.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Distinct animation styles per image index
  const getSlideStyle = (idx: number, isActive: boolean) => {
    switch (idx) {
      case 0:
        // Slide 1: Smooth Zoom / Scale In + Fade (scale 1.12 -> 1.0)
        return {
          transform: isActive ? "scale(1)" : "scale(1.12)",
          opacity: isActive ? 1 : 0,
          transition: "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms ease-in-out",
        };
      case 1:
        // Slide 2: Cinematic Slide Up + Fade (translateY 50px -> 0)
        return {
          transform: isActive ? "translateY(0)" : "translateY(50px)",
          opacity: isActive ? 1 : 0,
          transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms ease-in-out",
        };
      case 2:
        // Slide 3: Architectural Pan Right to Left + Fade (translateX 60px -> 0)
        return {
          transform: isActive ? "translateX(0)" : "translateX(60px)",
          opacity: isActive ? 1 : 0,
          transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms ease-in-out",
        };
      case 3:
        // Slide 4: Dynamic Subtle Rotate (-1.8deg) + Scale Up + Fade
        return {
          transform: isActive ? "scale(1) rotate(0deg)" : "scale(0.92) rotate(-1.8deg)",
          opacity: isActive ? 1 : 0,
          transition: "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms ease-in-out",
        };
      default:
        return {
          opacity: isActive ? 1 : 0,
          transition: "opacity 800ms ease-in-out",
        };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[480px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] flex items-center justify-center overflow-hidden z-10 border-b border-gray-200"
    >
      {/* ─── 4-IMAGE SLIDESHOW WITH DISTINCT ANIMATIONS PER SLIDE ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {bannerImages.map((img, idx) => {
          const isActive = idx === currentIdx;
          return (
            <div
              key={idx}
              className="absolute inset-0 will-change-transform"
              style={getSlideStyle(idx, isActive)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      {/* ─── REDUCED LIGHT GRADIENT OVERLAY FOR BRIGHT VIVID IMAGES ─── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10 z-10" />

      {/* Subtle vignette border accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)] z-10" />

      {/* ─── CONTENT BLOCK ─── */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center gap-6 py-12">
        
        {/* Eyebrow Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#D95D16] text-xs font-mono font-bold uppercase tracking-widest transition-all duration-700 shadow-md"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
          }}
        >
          <Home size={14} />
          <span>MOTWANI RESIDENTIAL SANCTUARIES</span>
        </div>

        {/* Main Heading */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white font-bold leading-[1.1] tracking-tight text-center drop-shadow-2xl transition-all duration-700"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(25px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: "150ms",
          }}
        >
          Building Dream Homes <br />
          <span className="text-white font-serif italic font-normal drop-shadow-lg">For Every Family</span>
        </h2>

        {/* Subtext */}
        <p
          className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-100 font-sans leading-relaxed drop-shadow-md transition-all duration-700 font-medium"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: "300ms",
          }}
        >
          Crafting architectural excellence and vibrant communities where every detail is designed for comfort, warmth, and lifelong memories.
        </p>

        {/* Action Link */}
        <div
          className="pt-2 transition-all duration-700"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: "450ms",
          }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 bg-[#D95D16] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore Family Residences</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ─── 4-SLIDE INTERACTIVE INDICATOR DOTS WITH EFFECT LABELS ─── */}
        <div className="flex items-center gap-2.5 mt-4 z-20">
          {bannerImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              title={img.effectLabel}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentIdx
                  ? "w-8 bg-[#D95D16] shadow-lg shadow-[#D95D16]/50"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}: ${img.effectLabel}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
