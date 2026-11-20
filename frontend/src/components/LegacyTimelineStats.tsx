"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Award, Building2, Users, Heart, Ruler, ChevronRight } from "lucide-react";

interface StatItem {
  targetValue: number;
  suffix: string;
  label: string;
  subLabel: string;
  icon: React.ElementType;
}

const statsData: StatItem[] = [
  {
    targetValue: 25,
    suffix: "",
    label: "Years of Trust",
    subLabel: "Since 2001",
    icon: Award,
  },
  {
    targetValue: 50,
    suffix: "+",
    label: "Delivered Projects",
    subLabel: "Landmarks Built",
    icon: Building2,
  },
  {
    targetValue: 1000,
    suffix: "+",
    label: "Happy Customers",
    subLabel: "Families Home",
    icon: Users,
  },
  {
    targetValue: 5000,
    suffix: "+",
    label: "Lives Touched",
    subLabel: "Community Impact",
    icon: Heart,
  },
  {
    targetValue: 15,
    suffix: " Lacs+",
    label: "Sq.Ft Completed",
    subLabel: "Developed Space",
    icon: Ruler,
  },
];

export default function LegacyTimelineStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const animationTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationTriggered.current) {
          animationTriggered.current = true;
          setIsVisible(true);
          startCountUp();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startCountUp = () => {
    const duration = 1600; // Total count-up duration ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;

      const newCounts = statsData.map((stat, idx) => {
        const delay = idx * 150; // Staggered start delay per stat
        const effectiveTime = Math.max(0, elapsedTime - delay);
        const progress = Math.min(1, effectiveTime / (duration - delay));

        // Cubic deceleration easing: 1 - Math.pow(1 - progress, 3)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        return Math.floor(easeProgress * stat.targetValue);
      });

      setCounts(newCounts);

      if (elapsedTime < duration + 4 * 150) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final exact target values at the end
        setCounts(statsData.map((s) => s.targetValue));
      }
    };

    requestAnimationFrame(animate);
  };

  const formatNumber = (val: number, stat: StatItem) => {
    if (stat.targetValue === 1000 || stat.targetValue === 5000) {
      return val.toLocaleString("en-IN") + stat.suffix;
    }
    return val + stat.suffix;
  };

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="py-24 bg-[#0B1120] text-white relative overflow-hidden border-b border-white/10"
    >
      {/* ─── SUBTLE BLUEPRINT GRID BACKGROUND PATTERN ─── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#D95D16 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: `24px 24px, 48px 48px, 48px 48px`,
        }}
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D95D16]/[0.08] blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 relative z-10 flex flex-col gap-16">
        
        {/* ─── TOP TEXT BLOCK ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-white/10 pb-12">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-xs font-mono font-bold text-[#D95D16] uppercase tracking-[0.35em]">
              A LEGACY OF TRUST
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Our Legacy in Real Estate
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-sans font-normal">
              For over 25 years, Motwani Constructions has shaped Odisha&apos;s skylines through an enduring commitment to integrity, innovation, and craftsmanship. We build sanctuaries founded on trust—where every detail is crafted to help dreams find their forever home.
            </p>

            <Link
              href="/about#legacy"
              className="group inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#D95D16] hover:text-white transition-colors font-mono"
            >
              <span>Know More</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ─── DESKTOP STAGGERED TIMELINE STATS (≥1024px) ─── */}
        <div className="hidden lg:block relative py-12">
          {/* Thread Line across section */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D95D16] via-[#D95D16] to-[#D95D16] transition-all duration-1000 ease-out"
              style={{ width: isVisible ? "100%" : "0%" }}
            />
          </div>

          {/* 5 Stats Nodes & Staggered Cards Grid */}
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {statsData.map((stat, idx) => {
              const IconComp = stat.icon;
              const isEven = idx % 2 === 1; // 0,2,4 Above (Odd stats 1,3,5), 1,3 Below (Even stats 2,4)
              const countVal = counts[idx];

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center relative group"
                  style={{
                    transitionDelay: `${idx * 150}ms`,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  {/* Content ABOVE line for items 0, 2, 4 */}
                  {!isEven && (
                    <div className="flex flex-col items-center text-center mb-8 h-36 justify-end transition-transform duration-300 group-hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-full bg-[#D95D16]/10 border border-[#D95D16]/30 text-[#D95D16] flex items-center justify-center mb-3 group-hover:bg-[#D95D16] group-hover:text-white transition-all duration-300 shadow-md shadow-[#D95D16]/20">
                        <IconComp size={22} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight leading-none mb-2">
                        {formatNumber(countVal, stat)}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#D95D16] uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 tracking-wider font-normal mt-0.5">
                        {stat.subLabel}
                      </span>
                    </div>
                  )}

                  {/* Circular Node Marker on the Thread Line */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#D95D16] border-4 border-[#0B1120] shadow-md shadow-[#D95D16]/40 transition-transform duration-300 group-hover:scale-150 z-10" />
                    <div className="absolute w-8 h-8 rounded-full bg-[#D95D16]/20 animate-ping pointer-events-none" />
                  </div>

                  {/* Content BELOW line for items 1, 3 */}
                  {isEven && (
                    <div className="flex flex-col items-center text-center mt-8 h-36 justify-start transition-transform duration-300 group-hover:translate-y-1">
                      <div className="w-12 h-12 rounded-full bg-[#D95D16]/10 border border-[#D95D16]/30 text-[#D95D16] flex items-center justify-center mb-3 group-hover:bg-[#D95D16] group-hover:text-white transition-all duration-300 shadow-md shadow-[#D95D16]/20">
                        <IconComp size={22} strokeWidth={1.5} />
                      </div>
                      <span className="text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight leading-none mb-2">
                        {formatNumber(countVal, stat)}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#D95D16] uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 tracking-wider font-normal mt-0.5">
                        {stat.subLabel}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── TABLET & MOBILE VERTICAL TIMELINE STACK (<1024px) ─── */}
        <div className="block lg:hidden relative py-4">
          {/* Vertical Thread Line */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-1/2 w-[2px] bg-white/10 -translate-x-1/2 z-0 overflow-hidden">
            <div
              className="w-full bg-[#D95D16] transition-all duration-1000 ease-out"
              style={{ height: isVisible ? "100%" : "0%" }}
            />
          </div>

          <div className="flex flex-col gap-10 relative z-10">
            {statsData.map((stat, idx) => {
              const IconComp = stat.icon;
              const countVal = counts[idx];
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-6 ${
                    isEven ? "sm:flex-row-reverse sm:text-right" : "sm:flex-row sm:text-left"
                  }`}
                  style={{
                    transitionDelay: `${idx * 150}ms`,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  {/* Node Marker */}
                  <div className="w-12 h-12 rounded-full bg-[#0B1120] border-2 border-[#D95D16] flex items-center justify-center text-[#D95D16] shadow-lg shrink-0 z-10 ml-0 sm:mx-auto">
                    <IconComp size={20} strokeWidth={1.5} />
                  </div>

                  {/* Content Block */}
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                      {formatNumber(countVal, stat)}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#D95D16] uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 tracking-wider">
                      {stat.subLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
