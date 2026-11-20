"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, RotateCcw, ShieldCheck, Award, Building2, Users, CheckCircle2, Sparkles, ChevronRight, Leaf, HeartHandshake, Clock, Compass } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import HeroVideoBg from "../components/HeroVideoBg";
import HotspotPanorama from "../components/HotspotPanorama";
import TestimonialMarquee from "../components/TestimonialMarquee";
import CinematicReveal from "../components/CinematicReveal";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import WhyUsPillarsSection from "../components/WhyUsPillarsSection";
import FoundationShowcase from "../components/FoundationShowcase";
import LegacyTimelineStats from "../components/LegacyTimelineStats";
import SafetyTrustSection from "../components/SafetyTrustSection";
import DreamHomesBanner from "../components/DreamHomesBanner";
import AwardSpotlightSection from "../components/AwardSpotlightSection";
import LeadershipSpotlight from "../components/LeadershipSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);

  // Card 1 (Exterior Elevation) Drag State
  const [img1Pos, setImg1Pos] = useState({ x: 0, y: 0 });
  const [isDraggingImg1, setIsDraggingImg1] = useState(false);
  const [dragStart1, setDragStart1] = useState({ x: 0, y: 0 });

  // Card 2 (Day Elevation) Drag State
  const [img2Pos, setImg2Pos] = useState({ x: 0, y: 0 });
  const [isDraggingImg2, setIsDraggingImg2] = useState(false);
  const [dragStart2, setDragStart2] = useState({ x: 0, y: 0 });

  const handlePointerDownImg1 = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDraggingImg1(true);
    setDragStart1({
      x: e.clientX - img1Pos.x,
      y: e.clientY - img1Pos.y,
    });
  };

  const handlePointerMoveImg1 = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingImg1) return;
    setImg1Pos({
      x: e.clientX - dragStart1.x,
      y: e.clientY - dragStart1.y,
    });
  };

  const handlePointerUpImg1 = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingImg1(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handlePointerDownImg2 = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDraggingImg2(true);
    setDragStart2({
      x: e.clientX - img2Pos.x,
      y: e.clientY - img2Pos.y,
    });
  };

  const handlePointerMoveImg2 = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingImg2) return;
    setImg2Pos({
      x: e.clientX - dragStart2.x,
      y: e.clientY - dragStart2.y,
    });
  };

  const handlePointerUpImg2 = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingImg2(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const resetPositions = () => {
    setImg1Pos({ x: 0, y: 0 });
    setImg2Pos({ x: 0, y: 0 });
  };

  // Laptop interactive state
  const [isLaptopOn, setIsLaptopOn] = useState(true);
  const [laptopRotation, setLaptopRotation] = useState({ x: 6, y: -8 });

  const handleMouseMoveLaptop = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    setLaptopRotation({
      x: 6 - y * 24,
      y: -8 + x * 32,
    });
  };

  const handleMouseLeaveLaptop = () => {
    setLaptopRotation({ x: 6, y: -8 });
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // GSAP ScrollTrigger Animations
    const ctx = gsap.context(() => {
      // 1. Hero Exit Animation
      if (heroSectionRef.current && heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          y: -120,
          x: -60,
          opacity: 0,
          scale: 0.95,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // 2. About Section Reveal Animations (Top 3 Cards, Pillars Heading, 3 Pillar Cards)
      if (aboutSectionRef.current) {
        const topCards = aboutSectionRef.current.querySelectorAll(".about-top-card");
        const pillarsHeading = aboutSectionRef.current.querySelector(".pillars-heading");
        const pillarCards = aboutSectionRef.current.querySelectorAll(".pillar-card");

        if (topCards.length > 0) {
          gsap.fromTo(
            topCards,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.18,
              ease: "power2.out",
              scrollTrigger: {
                trigger: aboutSectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        }

        if (pillarsHeading) {
          gsap.fromTo(
            pillarsHeading,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: pillarsHeading,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        }

        if (pillarCards.length > 0) {
          gsap.fromTo(
            pillarCards,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.18,
              ease: "power2.out",
              scrollTrigger: {
                trigger: pillarCards[0],
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        }
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col selection:bg-[#D95D16] selection:text-white relative font-sans">

      {/* Right-edge scroll progress indicator */}
      <div
        className="fixed right-3 top-1/4 h-1/2 w-[3px] bg-gray-200 z-40 rounded-full pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <div
          className="w-full bg-[#D95D16] rounded-full transition-all duration-75"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Shared Header Navigation */}
      <Header />

      {/* Cookie & Privacy Consent Banner with Revisit Consent Floating Button */}
      <CookieConsent />

      {/* ─── 01 HERO SECTION WITH AI BACKGROUND VIDEO SHOWCASE ─── */}
      <section 
        ref={heroSectionRef}
        className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-white z-30 border-b border-gray-100"
      >
        {/* Ambient AI Background Video Component */}
        <HeroVideoBg />

        {/* Subtle background glow */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-[#D95D16]/[0.06] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 -z-10 w-[500px] h-[500px] bg-[#D95D16]/[0.04] blur-[160px] rounded-full pointer-events-none" />

        <div 
          ref={heroContentRef} 
          className="max-w-[1440px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full z-10 will-change-transform"
        >
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left relative z-20">
            
            {/* Eyebrow Badge */}
            <div className="flex h-8 items-center rounded-full border border-[#D95D16]/30 bg-[#D95D16]/10 px-4 py-1 font-mono text-[11px] font-bold uppercase text-[#D95D16] tracking-widest">
              MOTWANI CONSTRUCTIONS
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#D95D16] tracking-tight leading-[1.05] font-sans uppercase">
              The Tradition<br />of Trust
            </h1>

            {/* Tagline / Subtitle */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 font-normal leading-[1.25] tracking-tight">
              Bringing clarity, insight, and simplicity to{" "}
              <span className="text-[#D95D16] font-medium">your dream homes</span>
            </h2>

            {/* Action Link: View Ongoing Projects */}
            <div className="pt-2 flex flex-col gap-4">
              <Link
                href="/projects?filter=Ongoing"
                className="group flex items-center gap-3 text-base md:text-lg font-extrabold text-gray-900 hover:text-[#D95D16] tracking-wide transition-colors"
              >
                <span>View Ongoing Projects</span>
                <span className="w-12 md:w-16 h-[2px] bg-[#D95D16] inline-block transition-all duration-300 group-hover:w-24" />
              </Link>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <Link
                  href="/projects"
                  className="bg-[#D95D16] hover:bg-[#c2410c] text-white text-xs font-extrabold uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#D95D16]/20 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/contact"
                  className="border border-[#D95D16] text-[#D95D16] hover:bg-[#D95D16]/10 text-xs font-extrabold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* Drag instruction notice */}
            <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-[#D95D16] animate-pulse" />
              <span>Drag & move the elevation cards to interact</span>
            </div>
          </div>

          {/* Right Column: Movable Tilted Interactive Elevation Cards */}
          <div className="lg:col-span-7 relative flex items-center justify-center w-full h-[450px] md:h-[580px] lg:h-[620px]">
            
            {/* Draggable Main Card 1 (Dusk Elevation View) */}
            <div
              className="absolute w-[90%] h-[88%] md:w-[85%] md:h-[85%] lg:w-[92%] lg:h-[90%] select-none z-10 touch-none active:scale-[1.01]"
              style={{
                transform: `translate3d(${img1Pos.x}px, ${img1Pos.y}px, 0)`,
                cursor: isDraggingImg1 ? "grabbing" : "grab",
                transition: isDraggingImg1 ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onPointerDown={handlePointerDownImg1}
              onPointerMove={handlePointerMoveImg1}
              onPointerUp={handlePointerUpImg1}
              onPointerCancel={handlePointerUpImg1}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 transform rotate-[-4deg] transition-all duration-500 hover:rotate-[-2deg] hover:scale-[1.01] group bg-gray-900">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
                  alt="KORADAKANTA ELEVATION VIEW 005 DUSK 2023.03 1 scaled 1"
                  fill
                  sizes="(max-width: 768px) 100vw, 750px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  priority
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 z-20 pointer-events-none" />

                {/* Badge top left */}
                <div className="absolute top-4 left-4 z-30 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[10px] font-mono font-bold text-[#D95D16] uppercase tracking-wider">
                  KORADAKANTA ELEVATION VIEW 005 DUSK
                </div>

                {/* Card footer details */}
                <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col md:flex-row md:items-end justify-between gap-3 pointer-events-none">
                  <div>
                    <span className="text-[#D95D16] font-mono text-[10px] font-bold uppercase tracking-widest">
                      THE TRADITION OF TRUST
                    </span>
                    <h3 className="text-lg md:text-xl font-serif text-white tracking-wide font-normal leading-tight">
                      Bringing clarity, insight, and simplicity to your dream homes.
                    </h3>
                  </div>
                  <div className="text-[10px] tracking-widest text-gray-300 uppercase font-mono">
                    MOTWANI CONSTRUCTIONS
                  </div>
                </div>
              </div>
            </div>

            {/* Draggable Secondary Card 2 (Day Elevation View) */}
            <div
              className="absolute bottom-[-15px] right-[2%] md:bottom-[-25px] md:right-[4%] lg:bottom-[-30px] lg:right-[5%] w-[58%] h-[48%] md:w-[52%] md:h-[50%] select-none z-20 touch-none active:scale-[1.03]"
              style={{
                transform: `translate3d(${img2Pos.x}px, ${img2Pos.y}px, 0)`,
                cursor: isDraggingImg2 ? "grabbing" : "grab",
                transition: isDraggingImg2 ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onPointerDown={handlePointerDownImg2}
              onPointerMove={handlePointerMoveImg2}
              onPointerUp={handlePointerUpImg2}
              onPointerCancel={handlePointerUpImg2}
            >
              <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border-2 border-white bg-black p-1 transform rotate-[5deg] transition-all duration-500 hover:rotate-[3deg] hover:scale-[1.03] group/sec">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
                    alt="KORADAKANTA ELEVATION VIEW 003 DAY 2023.03 1 scaled 1"
                    fill
                    sizes="(max-width: 768px) 50vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover/sec:scale-105 pointer-events-none"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

                  <div className="absolute top-2.5 left-2.5 z-20 flex items-center rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1 text-[8px] font-mono font-bold uppercase text-[#D95D16] tracking-wider border border-white/10">
                    KORADAKANTA DAY VIEW
                  </div>

                  <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                    <span className="text-[11px] font-serif text-white tracking-wide font-light">
                      Architectural Brilliance
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Button (visible when cards are moved) */}
            {(img1Pos.x !== 0 || img1Pos.y !== 0 || img2Pos.x !== 0 || img2Pos.y !== 0) && (
              <button
                onClick={resetPositions}
                className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 z-30 px-4 py-2 text-xs font-mono font-bold tracking-widest uppercase bg-[#D95D16] text-white rounded-full transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                title="Reset card positions to default"
              >
                <RotateCcw size={12} />
                <span>Reset Positions</span>
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ─── 02 WHO WE ARE, OUR MISSION & CORE VALUES (INTERACTIVE SHOWCASE) ─── */}
      <FoundationShowcase />

      {/* ─── 03 WHY US & CORE PILLARS WITH UNIQUE BACKGROUND REVEAL ─── */}
      <WhyUsPillarsSection />

      {/* ─── 04 CINEMATIC LEADERSHIP SPOTLIGHT ─── */}
      <LeadershipSpotlight />

      {/* ─── 03 SUSTAINABILITY & SEO SECTION ─── */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image / Graphic Left */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 group">
              <Image
                src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80"
                alt="Motwani Constructions Sustainable Eco Architecture"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-xs font-mono font-bold text-[#D95D16] bg-black/80 px-3 py-1 rounded-full uppercase tracking-wider">
                  Eco Architecture
                </span>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            
            {/* SEO Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-[#D95D16] bg-[#D95D16]/10 px-3 py-1 rounded-full border border-[#D95D16]/20">
                top real estate company in bhubaneswar
              </span>
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-[#D95D16] bg-[#D95D16]/10 px-3 py-1 rounded-full border border-[#D95D16]/20">
                best real estate company in Bhubaneswar
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 font-bold leading-tight">
              Pioneering Sustainable & Modern Real Estate
            </h2>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-sans">
              In today’s rapidly evolving world, sustainability has emerged as a paramount concern for industries of all kinds. At Motwani Construction, we understand that the real estate and construction sector plays a pivotal role in shaping the future. Sustainability is more than just a buzzword; it’s a core value embedded in our company’s DNA. Our dedication to sustainability encompasses every facet of our operations, from the materials we use to the design of our projects. We prioritize energy efficiency, reduce waste, and minimize our carbon footprint at every step of the construction process.
            </p>

            <Link
              href="/about#sustainability"
              className="group inline-flex items-center gap-3 bg-[#D95D16] hover:bg-[#c2410c] text-white text-xs font-extrabold uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer mt-2"
            >
              <span>Learn more</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>

        </div>
      </section>

      {/* ─── 04 LEGACY & STAGGERED TIMELINE STATS WITH COUNTER ANIMATIONS ─── */}
      <LegacyTimelineStats />

      {/* ─── 05 SAFETY & VERIFICATION PROTOCOLS ─── */}
      <SafetyTrustSection />

      {/* ─── 06 BUILDING DREAM HOMES BANNER ─── */}
      <DreamHomesBanner />

      {/* ─── 07 PMAY AWARDS & NATIONAL RECOGNITION (PRESS SPOTLIGHT) ─── */}
      <AwardSpotlightSection />

      {/* ── INTERACTIVE HOTSPOT PANORAMA & BEFORE/AFTER SLIDER ── */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex flex-col gap-16">
          <HotspotPanorama />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D95D16]">
                STRUCTURAL EVOLUTION
              </span>
              <h3 className="text-3xl font-serif font-bold text-gray-900">
                Precision Framing to Luxury Living
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                Drag the interactive slider to examine Motwani Construction&apos;s rigorous engineering standard, transforming raw reinforced concrete framing into biophilic luxury sanctuaries.
              </p>
            </div>

            <BeforeAfterSlider
              beforeSrc="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
              afterSrc="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
              beforeAlt="Villa under construction"
              afterAlt="Finished Motwani luxury residence"
              beforeLabel="Raw Construction Framing"
              afterLabel="Completed Luxury Elevation"
            />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS MARQUEE ── */}
      <TestimonialMarquee />

      {/* ─── 07 BLOG & NEWS ARTICLES SECTION ─── */}
      <section id="news" className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D95D16]">
                LATEST UPDATES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900">
                News & Editorial Insights
              </h2>
            </div>

            <Link
              href="/#news"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#D95D16] hover:text-[#c2410c] transition-colors font-mono"
            >
              <span>View All News</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Blog Post 1 */}
            <article className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600585152220-90363fe7e116?auto=format&fit=crop&w=800&q=80"
                  alt="Motwani Constructions: Honored as Real Estate Goodwill Ambassador"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-[#D95D16] text-white px-2.5 py-0.5 rounded">
                    Awards
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-black/70 text-white px-2.5 py-0.5 rounded">
                    Blog
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#D95D16] transition-colors leading-snug">
                    Motwani Constructions: Honored as Real Estate Goodwill Ambassador
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans mt-2">
                    Recognized on a national platform for pioneering transparent, sustainable residential developments and affordable housing initiatives across Odisha.
                  </p>
                </div>

                <Link
                  href="/#news"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95D16] font-mono uppercase tracking-wider pt-4 border-t border-gray-200 mt-2"
                >
                  <span>Read full story</span>
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80"
                  alt="3 BHK Flats in Jharapada for Sale"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-[#D95D16] text-white px-2.5 py-0.5 rounded">
                    Architecture
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-black/70 text-white px-2.5 py-0.5 rounded">
                    Blog
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#D95D16] transition-colors leading-snug">
                    3 BHK Flats in Jharapada for Sale
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans mt-2">
                    Discover our newest residential offering featuring smart layout design, private balconies, and prime city connectivity in Jharapada, Bhubaneswar.
                  </p>
                </div>

                <Link
                  href="/#news"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95D16] font-mono uppercase tracking-wider pt-4 border-t border-gray-200 mt-2"
                >
                  <span>Read full story</span>
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="For Our 25th Year, Basant Villa Gets a Facelift"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-[#D95D16] text-white px-2.5 py-0.5 rounded">
                    Architecture
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-black/70 text-white px-2.5 py-0.5 rounded">
                    Blog
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#D95D16] transition-colors leading-snug">
                    For Our 25th Year, Basant Villa Gets a Facelift
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans mt-2">
                    Celebrating a quarter-century of structural craftsmanship with a modern biophilic elevation upgrade and energy-efficient retrofitting.
                  </p>
                </div>

                <Link
                  href="/#news"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D95D16] font-mono uppercase tracking-wider pt-4 border-t border-gray-200 mt-2"
                >
                  <span>Read full story</span>
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
