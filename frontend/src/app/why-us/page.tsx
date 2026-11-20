"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, HeartHandshake, Award, Compass, ShieldCheck, ArrowRight, Building2, Clock } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CinematicReveal from "../../components/CinematicReveal";
import WhyUsPillarsSection from "../../components/WhyUsPillarsSection";

export default function WhyUs() {
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#D95D16] selection:text-white relative font-sans">
      
      {/* Shared Header Navigation */}
      <Header />

      {/* Top Spacer */}
      <div className="h-28" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        
        {/* Intro Section / Why Us Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Headlines & Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <CinematicReveal className="flex flex-col gap-3">
              <span className="text-[#D95D16] text-xs font-mono font-bold uppercase tracking-[0.4em] block">
                WHY CHOOSE MOTWANI CONSTRUCTIONS
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif tracking-tight font-bold text-gray-900 leading-tight uppercase">
                Why Us
              </h1>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#D95D16] font-normal leading-snug">
                Experience, Expertise, and Excellence, That&apos;s Us
              </h2>
            </CinematicReveal>

            <CinematicReveal className="flex flex-col gap-6" delay={150}>
              <p className="text-gray-700 text-base leading-relaxed font-sans font-medium">
                We proudly celebrate 25 years of excellence, trust, and innovation in the real estate industry. As we look back on our remarkable journey, we’re excited about the future and remain dedicated to providing the highest quality of service, innovative solutions, and unwavering commitment to our clients and partners.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/projects"
                  className="bg-[#D95D16] hover:bg-[#c2410c] text-white text-xs font-extrabold uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/contact"
                  className="border border-[#D95D16] text-[#D95D16] hover:bg-[#D95D16]/10 text-xs font-extrabold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
                >
                  Get In Touch
                </Link>
              </div>
            </CinematicReveal>
          </div>

          {/* Right Column: Hero Image Frame */}
          <div className="lg:col-span-5 relative">
            <CinematicReveal className="w-full">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group">
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
                  alt="Motwani Constructions Why Us Architecture"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <span className="text-xs font-mono font-bold text-[#D95D16] bg-black/80 px-3 py-1 rounded-full uppercase tracking-wider">
                    The Tradition of Trust
                  </span>
                  <h3 className="text-lg font-serif text-white font-normal mt-2">
                    25 Years of Building Dream Homes Across Odisha
                  </h3>
                </div>
              </div>
            </CinematicReveal>
          </div>

        </section>

        {/* 4 Pillars Grid Section */}
        <WhyUsPillarsSection
          headingSubtitle="THE PILLARS OF OUR ETHOS"
          headingTitle="Core Pillars of Motwani Constructions"
          headingDesc="Our unwavering values of transparency, service, delivery, and personalized attention guide every project we design and construct across Odisha."
        />

        {/* Stats Counter Row */}
        <section className="mb-24 bg-gray-900 text-white rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D95D16]/10 blur-[160px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-[#D95D16] font-mono">25</span>
              <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold">Years of Trust</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-[#D95D16] font-mono">50+</span>
              <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold">Delivered Projects</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-[#D95D16] font-mono">1000+</span>
              <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold">Happy Customers</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-[#D95D16] font-mono">15 Lacs+</span>
              <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold">Sq.ft Completed</span>
            </div>
          </div>
        </section>

      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
