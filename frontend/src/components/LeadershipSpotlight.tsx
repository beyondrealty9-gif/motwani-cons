"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  tagline: string;
  powerQuote: string;
  bio: string;
  image: string;
  storyLink: string;
}

const leadershipTeam: LeaderProfile[] = [
  {
    id: "dilip-motwani",
    name: "Mr. Dilip Motwani",
    role: "Chairman, Motwani Constructions",
    tagline: "40 Years of Real Estate Mastery | Founder of Laxmi Builders (1997)",
    powerQuote: "Four decades of vision, shaping Odisha's skyline from foundation to legacy.",
    bio: "Founder of Laxmi Builders in 1997, Mr. Dilip Motwani brings 40 years of unmatched real estate expertise. Known for his disciplined, dedicated approach and warm leadership, he continues to guide Motwani Constructions into the future.",
    image: "/dilip_motwani.jpg",
    storyLink: "/about#leadership",
  },
  {
    id: "manas-motwani",
    name: "Mr. Manas Motwani",
    role: "Managing Director, Motwani Constructions",
    tagline: "Driving Operational Excellence & Strategic Expansion",
    powerQuote: "Building iconic spaces through modern engineering and steadfast integrity.",
    bio: "As Managing Director, Mr. Manas Motwani plays a pivotal role in expanding Motwani Constructions' strategic footprint. He focuses on operational efficiency, quality delivery, and fostering enduring trust with every homeowner.",
    image: "/manas_motwani.jpg",
    storyLink: "/about#leadership",
  },
  {
    id: "pankaj-motwani",
    name: "Mr. Pankaj Motwani",
    role: "Managing Director, Motwani Constructions",
    tagline: "Pioneering Sustainable Growth & Strategic Innovation",
    powerQuote: "Transforming urban living by blending modern architecture with client-first dedication.",
    bio: "As Managing Director, Mr. Pankaj Motwani spearheads key project developments and customer experience initiatives. His forward-thinking approach drives project execution and sustainable community growth.",
    image: "/pankaj_motwani.jpg",
    storyLink: "/about#leadership",
  },
];

export default function LeadershipSpotlight() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeLeader = leadershipTeam[activeIdx];

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

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="bg-[#0a0a0a] text-white relative overflow-hidden border-b border-white/10"
    >
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-10" />

      {/* Subtle Blueprint Grid Accent */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: `40px 40px`,
        }}
      />

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[720px] relative z-20 items-stretch">
        
        {/* ─── LEFT/CENTER (~55%): PORTRAIT WITH OVERLAPPING NAME ─── */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[480px] sm:min-h-[560px] lg:min-h-[720px] overflow-hidden group">
          
          {/* Portrait Image */}
          <div className="relative w-full h-full min-h-[480px] sm:min-h-[560px] lg:min-h-[720px]">
            <Image
              key={activeLeader.id}
              src={activeLeader.image}
              alt={activeLeader.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top transition-all duration-700 ease-out"
              style={{
                filter: isVisible
                  ? "contrast(105%) brightness(98%)"
                  : "grayscale(30%) contrast(105%)",
                transform: isVisible ? "scale(1)" : "scale(1.03)",
              }}
            />
          </div>

          {/* Portrait Gradient Vignette (blends into #0a0a0a) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40 z-10 pointer-events-none" />
          <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          {/* OVERSIZED NAME TYPOGRAPHY OVERLAPPING IMAGE BOUNDARY */}
          <div
            className="absolute bottom-6 left-6 lg:bottom-12 lg:left-8 lg:-right-40 z-20 pointer-events-none transition-all duration-700 ease-out"
            style={{
              letterSpacing: isVisible ? "-0.03em" : "0.1em",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-extrabold text-white uppercase tracking-tight leading-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] opacity-95">
              {activeLeader.name}
            </h2>
          </div>

        </div>

        {/* ─── RIGHT (~40%): EDITORIAL CONTENT BLOCK ─── */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-6 p-6 sm:p-10 lg:py-16 lg:pr-4 relative z-20">
          
          {/* Eyebrow Label */}
          <div
            className="transition-all duration-700"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "200ms",
            }}
          >
            <span className="text-xs font-mono font-bold text-[#D95D16] uppercase tracking-[0.35em]">
              LEADERSHIP FEATURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mt-1">
              The Vision Behind Us
            </h3>
          </div>

          {/* Bold Power-Statement Pull-Quote */}
          <blockquote
            className="text-lg sm:text-xl lg:text-2xl font-serif italic text-gray-100 leading-snug font-normal border-l-2 border-[#D95D16] pl-4 transition-all duration-700"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "350ms",
            }}
          >
            &ldquo;{activeLeader.powerQuote}&rdquo;
          </blockquote>

          {/* Role & Tagline Label */}
          <div
            className="flex flex-col gap-0.5 pt-1 transition-all duration-700"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "450ms",
            }}
          >
            <span className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              {activeLeader.role}
            </span>
            <span className="text-xs font-mono text-[#D95D16] uppercase tracking-wider font-semibold">
              {activeLeader.tagline}
            </span>
          </div>

          {/* Condensed Supporting Bio */}
          <p
            className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans font-normal transition-all duration-700"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "550ms",
            }}
          >
            {activeLeader.bio}
          </p>

          {/* Editorial Text-Link CTA */}
          <div
            className="pt-2 transition-all duration-700"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(15px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "650ms",
            }}
          >
            <Link
              href={activeLeader.storyLink}
              className="group inline-flex items-center gap-2.5 text-xs font-mono font-bold text-[#D95D16] uppercase tracking-widest hover:text-white transition-colors"
            >
              <span>Read Full Story</span>
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>

        {/* ─── FAR RIGHT (~5%): VERTICAL THUMBNAIL NAVIGATION RAIL ─── */}
        <div className="lg:col-span-1 flex lg:flex-col flex-row items-center justify-center gap-4 py-6 px-4 z-20 border-t lg:border-t-0 lg:border-l border-white/10">
          {leadershipTeam.map((leader, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={leader.id}
                onClick={() => setActiveIdx(idx)}
                title={leader.name}
                className={`relative w-14 h-14 rounded-full overflow-hidden transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "ring-2 ring-[#D95D16] ring-offset-2 ring-offset-[#0a0a0a] scale-110 shadow-lg shadow-[#D95D16]/40"
                    : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
                }`}
              >
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
