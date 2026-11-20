"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CinematicReveal from "./CinematicReveal";

interface TabItem {
  id: string;
  eyebrow: string;
  tagline: string;
  paragraph: string;
  image: string;
  imageAlt: string;
  caption: string;
}

const tabsData: TabItem[] = [
  {
    id: "who-we-are",
    eyebrow: "OUR IDENTITY",
    tagline: "Architects of Vision, Builders of Legacy",
    paragraph:
      "We are a dedicated team of real estate professionals committed to crafting enduring landmarks. With 25 years of mastery, we transform aspirations into bespoke architectural homes.",
    image: "/foundation_who_we_are.png",
    imageAlt: "Motwani Constructions Architects and Blueprint Planning",
    caption: "WHO WE ARE • ARCHITECTURAL MASTERY",
  },
  {
    id: "our-mission",
    eyebrow: "OUR PURPOSE",
    tagline: "Redefining Living Spaces Across Odisha",
    paragraph:
      "Our mission transcends standard construction to elevate lifestyle standards and community living. We design residential sanctuaries that harmonize modern luxury with natural surroundings.",
    image: "/foundation_our_mission.jpg",
    imageAlt: "Motwani Constructions Modern Building Exterior at Dusk",
    caption: "OUR MISSION • ELEVATED LIVING",
  },
  {
    id: "our-values",
    eyebrow: "OUR PRINCIPLES",
    tagline: "Uncompromising Integrity & Lasting Trust",
    paragraph:
      "Integrity and transparency form the bedrock of everything we do. From verified safety protocols to ethical partnerships, we build relationships as strong as our foundations.",
    image: "/foundation_our_values.png",
    imageAlt: "Motwani Constructions Trust and Partnership Handshake",
    caption: "OUR CORE VALUES • UNWAVERING TRUST",
  },
];

export default function FoundationShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  // Auto-rotate tabs every 5 seconds unless user manually interacts
  useEffect(() => {
    if (userInteracted) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabsData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [userInteracted]);

  const handleTabChange = (index: number, isManual = true) => {
    if (isManual) {
      setUserInteracted(true);
    }
    setActiveIndex(index);
  };

  const activeTab = tabsData[activeIndex];

  return (
    <section id="about-us" className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex flex-col gap-14">
        
        {/* Header Block */}
        <CinematicReveal className="text-center max-w-3xl mx-auto flex flex-col gap-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.35em] text-[#D95D16]">
            OUR FOUNDATION & VISION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Connecting Hearts to Homes
          </h2>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans max-w-2xl mx-auto">
            With a passion for properties and a commitment to excellence from 25 years, we are your trusted partner in navigating the world of real estate.
          </p>
        </CinematicReveal>

        {/* Desktop & Tablet / Mobile Responsive Showcase Container */}
        <CinematicReveal delay={150} className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* ─── LEFT COLUMN: VERTICAL TAB STACK (Desktop >=1024px) / ACCORDION / PILL SELECTOR (Tablet & Mobile) ─── */}
            <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
              
              {/* Tablet Segmented Pill Switcher (768px - 1023px) */}
              <div className="hidden md:flex lg:hidden items-center gap-2 p-1.5 bg-gray-100 rounded-2xl mb-2 border border-gray-200">
                {tabsData.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(idx, true)}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeIndex === idx
                        ? "bg-[#D95D16] text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                    }`}
                  >
                    {tab.eyebrow}
                  </button>
                ))}
              </div>

              {/* Vertical Tab Stack for Desktop (lg) & Accordion List for Mobile/Tablet */}
              <div className="flex flex-col gap-6">
                {tabsData.map((tab, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div
                      key={tab.id}
                      onClick={() => handleTabChange(idx, true)}
                      className={`relative pl-6 py-2 cursor-pointer group transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-60 hover:opacity-90"
                      }`}
                    >
                      {/* Active Left Border Indicator Bar */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-[#D95D16] h-full opacity-100"
                            : "bg-transparent h-0 opacity-0 group-hover:bg-[#D95D16]/30 group-hover:h-1/2"
                        }`}
                      />

                      {/* Eyebrow Label (Emphasized when active) */}
                      <span
                        className={`text-xs font-mono font-bold uppercase tracking-[0.25em] block mb-1.5 transition-colors duration-300 ${
                          isActive ? "text-[#D95D16]" : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      >
                        {tab.eyebrow}
                      </span>

                      {/* Tagline Heading */}
                      <h3
                        className={`text-xl sm:text-2xl font-serif font-bold tracking-tight transition-colors duration-300 ${
                          isActive
                            ? "text-gray-900"
                            : "text-gray-600 group-hover:text-gray-900"
                        }`}
                      >
                        {tab.tagline}
                      </h3>

                      {/* Expandable Paragraph (Smooth height & opacity transition) */}
                      <div
                        className={`grid transition-all duration-400 ease-in-out ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100 mt-3"
                            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans font-normal pr-4">
                            {tab.paragraph}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* ─── RIGHT COLUMN: DYNAMIC IMAGE DISPLAY WITH CROSSFADE & CAPTION OVERLAY ─── */}
            <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
              
              {/* Main Image Container */}
              <div className="relative aspect-[4/3] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-900 group">
                
                {/* Images Stack with Distinct Unique Reveal Animations (Slide Up, Slide Down, Rotate) */}
                {tabsData.map((tab, idx) => {
                  const isActive = activeIndex === idx;

                  // Distinct animation styles per tab:
                  // Tab 0 (Who We Are): Slide Up
                  // Tab 1 (Our Mission): Slide Down
                  // Tab 2 (Our Core Values): Rotate & Scale Settle
                  let revealClass = "";
                  if (isActive) {
                    revealClass = "opacity-100 translate-y-0 scale-100 rotate-0 z-10 pointer-events-auto";
                  } else if (idx === 0) {
                    revealClass = "opacity-0 translate-y-20 scale-105 rotate-0 z-0 pointer-events-none";
                  } else if (idx === 1) {
                    revealClass = "opacity-0 -translate-y-20 scale-105 rotate-0 z-0 pointer-events-none";
                  } else {
                    revealClass = "opacity-0 translate-y-0 scale-90 rotate-[-8deg] z-0 pointer-events-none";
                  }

                  return (
                    <div
                      key={tab.id}
                      className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${revealClass}`}
                    >
                      <Image
                        src={tab.image}
                        alt={tab.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={idx === 0}
                      />
                    </div>
                  );
                })}

                {/* Dark Vignette Overlay for Crisp Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />

                {/* Bottom Left Overlay Caption Pill */}
                <div className="absolute bottom-6 left-6 z-30 flex items-center gap-2.5 bg-black/75 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white shadow-lg transition-all duration-500">
                  <span className="w-2 h-2 rounded-full bg-[#D95D16] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-[#D95D16] uppercase tracking-wider">
                    {activeTab.caption}
                  </span>
                </div>

                {/* Top Right Active Index Badge */}
                <div className="absolute top-6 right-6 z-30 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[10px] font-mono font-bold text-white/90 uppercase tracking-widest">
                  0{activeIndex + 1} / 0{tabsData.length}
                </div>

              </div>

              {/* 3 Clickable Dot / Line Indicators below image */}
              <div className="flex items-center justify-center gap-2.5 pt-2">
                {tabsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTabChange(idx, true)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? "w-8 bg-[#D95D16]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>
        </CinematicReveal>

      </div>
    </section>
  );
}
