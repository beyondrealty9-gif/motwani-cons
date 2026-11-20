"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShieldCheck, HeartHandshake, Clock, Compass } from "lucide-react";

interface WhyUsPillarsSectionProps {
  headingTitle?: string;
  headingSubtitle?: string;
  headingDesc?: string;
  className?: string;
}

export default function WhyUsPillarsSection({
  headingSubtitle = "EXPERIENCE, EXPERTISE, AND EXCELLENCE",
  headingTitle = "Why Us – Experience, Expertise, and Excellence, That's Us",
  headingDesc = "We proudly celebrate 25 years of excellence, trust, and innovation in the real estate industry. As we look back on our remarkable journey, we’re excited about the future and remain dedicated to providing the highest quality of service, innovative solutions, and unwavering commitment to our clients and partners.",
  className = "",
}: WhyUsPillarsSectionProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const pillars = [
    {
      number: "01",
      title: "Transparency & Integrity",
      desc: "We uphold the highest standards of transparency and integrity in all our transactions, ensuring that clients can trust us to provide honest and accurate information throughout their real estate journey.",
      icon: ShieldCheck,
    },
    {
      number: "02",
      title: "Exceptional Customer Service",
      desc: "We prioritize our clients, offering responsive communication, personalized attention, and a commitment to ensuring a smooth and satisfying real estate experience.",
      icon: HeartHandshake,
    },
    {
      number: "03",
      title: "On-Time Delivery",
      desc: "We are dedicated to delivering properties and services on time, meeting and exceeding our clients' expectations for timely results.",
      icon: Clock,
    },
    {
      number: "04",
      title: "Personalized Guidance",
      desc: "We understand that every real estate journey is unique. Expect personalized attention and tailored solutions to meet your specific needs.",
      icon: Compass,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
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
      id="why-us"
      className={`relative py-20 px-4 md:px-8 overflow-hidden rounded-3xl my-12 border border-amber-900/10 shadow-2xl transition-all duration-1000 ${className}`}
    >
      {/* ─── UNIQUE BACKGROUND IMAGE REVEAL CONTAINER ─── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          clipPath: isRevealed
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        }}
      >
        {/* Background Image with Smooth Parallax Zoom */}
        <div
          className={`relative w-full h-full transition-transform duration-[2000ms] ease-out ${
            isRevealed ? "scale-100" : "scale-110"
          }`}
        >
          <Image
            src="/why_us_bg.png"
            alt="Motwani Constructions Luxury Living Background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            quality={100}
          />

          {/* Light, ultra-clear warm vignette for high contrast without blur */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/75 pointer-events-none" />
        </div>
      </div>

      {/* ─── CONTENT WRAPPER WITH GLASSMORPHIC EDITORIAL CARD ─── */}
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-12">
        
        {/* Header Block */}
        <div
          className={`text-center max-w-3xl mx-auto flex flex-col gap-4 transition-all duration-1000 delay-200 ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#D95D16] text-xs font-mono font-bold uppercase tracking-[0.38em] block">
            {headingSubtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.65rem] font-serif font-bold text-gray-900 tracking-tight leading-[1.2]">
            {headingTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto font-sans font-normal">
            {headingDesc}
          </p>
        </div>

        {/* 4 Pillars Grid (Glass Panel + Editorial Numbering & Thin Line Icons) */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
            {pillars.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className={`pillar-card group flex flex-col items-center text-center px-6 py-6 md:px-8 md:py-6 lg:px-8 lg:py-6 transition-all duration-700 ${
                    idx < 3 ? "lg:border-r lg:border-gray-200/80" : ""
                  }`}
                  style={{
                    transitionDelay: `${300 + idx * 150}ms`,
                    transform: isRevealed ? "translateY(0)" : "translateY(30px)",
                    opacity: isRevealed ? 1 : 0,
                  }}
                >
                  {/* Subtle Numbering Label */}
                  <span className="text-[#D95D16] text-xs font-mono font-bold uppercase tracking-[0.3em] mb-4 opacity-90">
                    {item.number}
                  </span>

                  {/* Thin Line-Art Icon emblem */}
                  <div className="w-16 h-16 rounded-full bg-[#D95D16]/[0.08] border border-[#D95D16]/20 text-[#D95D16] flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#D95D16] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#D95D16]/25">
                    <IconComponent size={34} strokeWidth={1.35} />
                  </div>

                  {/* Column Heading */}
                  <h3 className="text-lg md:text-xl font-bold font-serif text-gray-900 mb-3 tracking-tight leading-snug group-hover:text-[#D95D16] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description Paragraph */}
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans max-w-xs mx-auto font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
