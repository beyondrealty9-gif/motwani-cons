"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const importantLinks = [
    { name: "About Us", href: "/about" },
    { name: "Leadership", href: "/about#leadership" },
    { name: "Careers", href: "/careers" },
    { name: "Vision", href: "/about#vision" },
    { name: "Awards", href: "/news" },
    { name: "Contact Us", href: "/contact" },
  ];

  const ongoingProjects = [
    { name: "Anantam", href: "/projects?name=Anantam" },
    { name: "Bliss", href: "/projects?name=Bliss" },
    { name: "GM Terrace", href: "/projects?name=GM%20Terrace" },
    { name: "Lords Way Laxmi", href: "/projects?name=Lords%20Way%20Laxmi" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com/MotwaniConstructions" },
    { name: "Instagram", href: "https://instagram.com/MotwaniConstructions" },
    { name: "Twitter", href: "https://twitter.com/MotwaniConst" },
    { name: "LinkedIn", href: "https://linkedin.com/company/MotwaniConstructions" },
    { name: "Youtube", href: "https://www.youtube.com/@MotwaniConstructionsOdisha" },
  ];

  return (
    <footer className="mt-auto bg-white dark:bg-gray-950 relative z-30 w-full font-sans text-gray-800 dark:text-gray-200">
      {/* Top Full-Width Solid Orange Accent Band */}
      <div className="w-full h-10 md:h-11 bg-[#D95D16]" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-10 pb-8 relative">
        
        {/* Vertical Back To Top Indicator on Right Margin */}
        <div className="hidden xl:flex absolute right-4 bottom-24 items-center gap-2 -rotate-90 origin-bottom-right z-20">
          <button
            onClick={scrollToTop}
            className="text-[11px] font-mono tracking-widest text-gray-500 hover:text-[#D95D16] transition-colors uppercase flex items-center gap-2 cursor-pointer group"
            title="Back to top"
          >
            <span className="w-6 h-[1px] bg-gray-400 group-hover:bg-[#D95D16] transition-colors" />
            <span>Back to top</span>
          </button>
        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-14">
          
          {/* Column 1: Logo & Brand Tagline */}
          <div className="flex flex-col items-start justify-center pt-1">
            <Link href="/" className="inline-block mb-3">
              <div className="relative h-20 w-64 md:h-24 md:w-72">
                <Image
                  src="/motwani-logo.png"
                  alt="Motwani Constructions Logo"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <h3 className="text-xl md:text-2xl font-serif text-gray-900 dark:text-white font-medium tracking-wide">
              The Tradition of Trust
            </h3>
          </div>

          {/* Column 2: IMPORTANT LINKS */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
              IMPORTANT LINKS
            </h4>
            <ul className="flex flex-col space-y-2.5 text-xs font-medium text-gray-700 dark:text-gray-300">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 hover:text-[#D95D16] transition-colors duration-200"
                  >
                    <ChevronRight size={12} className="text-gray-900 dark:text-gray-100 group-hover:text-[#D95D16] group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: ONGOING PROJECTS */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
              ONGOING PROJECTS
            </h4>
            <ul className="flex flex-col space-y-2.5 text-xs font-medium text-gray-700 dark:text-gray-300">
              {ongoingProjects.map((proj) => (
                <li key={proj.name}>
                  <Link
                    href={proj.href}
                    className="group inline-flex items-center gap-1.5 hover:text-[#D95D16] transition-colors duration-200"
                  >
                    <ChevronRight size={12} className="text-gray-900 dark:text-gray-100 group-hover:text-[#D95D16] group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{proj.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: REACH OUT TO US */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
              REACH OUT TO US
            </h4>
            <div className="flex flex-col space-y-4 text-xs">
              <div>
                <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider block mb-1">
                  EXPERIENCE CENTRE
                </span>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Office Number: 744 – 746, Nexus Esplanade Mall, Rasulgarh Industrial Estate, Bhubaneswar, Odisha 751010
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1.5 font-medium">
                  <a href="tel:+919090102626" className="hover:text-[#D95D16] transition-colors">+91 9090102626</a>, <a href="tel:+916742915131" className="hover:text-[#D95D16] transition-colors">+91-674-2915131</a>
                </p>
              </div>

              <div>
                <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wider block mb-1">
                  HEAD OFFICE
                </span>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Plot-N4/229, IRC Village, Bhubaneswar – 751015
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Social Links & Terms */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>©2026 Motwani Constructions Pvt. Ltd</p>

          {/* Center Inline Social Links */}
          <div className="flex items-center gap-5 sm:gap-6 flex-wrap justify-center">
            {socialLinks.map((soc) => (
              <a
                key={soc.name}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D95D16] transition-colors"
              >
                {soc.name}
              </a>
            ))}
          </div>

          {/* Right Legal Links */}
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#D95D16] transition-colors">
              Terms and Conditions
            </Link>
            <Link href="/about" className="hover:text-[#D95D16] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
