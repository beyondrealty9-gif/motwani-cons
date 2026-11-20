"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronDown, User, LogOut, Grid } from "lucide-react";
import { useAuth } from "../app/context/AuthContext";
import AuthModal from "./AuthModal";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-gray-200/80 ${
          isScrolled ? "shadow-md py-2" : "py-3 md:py-4"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo - Motwani Constructions */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-14 w-52 md:h-18 md:w-64 lg:h-20 lg:w-72 transition-all duration-300">
              <Image
                src="/motwani-logo.png"
                alt="Motwani Constructions Logo"
                fill
                priority
                sizes="(max-width: 768px) 208px, (max-width: 1024px) 256px, 288px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-bold tracking-wider uppercase text-gray-800">
            <Link
              href="/about"
              className={`hover:text-[#D95D16] transition-colors py-1 ${
                pathname === "/about" ? "text-[#D95D16]" : "text-gray-800"
              }`}
            >
              ABOUT US
            </Link>

            <Link
              href="/why-us"
              className={`hover:text-[#D95D16] transition-colors py-1 ${
                pathname === "/why-us" ? "text-[#D95D16]" : "text-gray-800"
              }`}
            >
              WHY US
            </Link>

            {/* Projects Dropdown */}
            <div className="relative group py-1">
              <button
                className={`hover:text-[#D95D16] transition-colors flex items-center gap-1.5 cursor-pointer uppercase font-bold ${
                  pathname.startsWith("/projects") ? "text-[#D95D16]" : "text-gray-800"
                }`}
              >
                PROJECTS
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-[#D95D16]" />
              </button>

              <div className="absolute left-0 mt-2 w-44 bg-white rounded-md border border-gray-100 shadow-xl py-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link
                  href="/projects?filter=Ongoing"
                  className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#D95D16]/10 hover:text-[#D95D16] font-semibold tracking-wider transition-colors"
                >
                  ON GOING
                </Link>
                <Link
                  href="/projects?filter=Completed"
                  className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#D95D16]/10 hover:text-[#D95D16] font-semibold tracking-wider transition-colors"
                >
                  COMPLETED
                </Link>
              </div>
            </div>

            <Link
              href="/careers"
              className={`hover:text-[#D95D16] transition-colors py-1 ${
                pathname === "/careers" ? "text-[#D95D16]" : "text-gray-800"
              }`}
            >
              CAREERS
            </Link>

            <Link
              href="/news"
              className={`hover:text-[#D95D16] transition-colors py-1 ${
                pathname === "/news" ? "text-[#D95D16]" : "text-gray-800"
              }`}
            >
              NEWS
            </Link>

            {/* YouTube Link */}
            <a
              href="https://www.youtube.com/@MotwaniConstructionsOdisha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#D95D16] hover:text-[#ea580c] transition-colors py-1 font-bold text-xs"
              title="Motwani Constructions YouTube Channel (@MotwaniConstructionsOdisha)"
            >
              <svg className="w-5 h-4 fill-[#D95D16]" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="flex flex-col text-[10px] leading-tight">
                <span>Youtube</span>
                <span>Channel</span>
              </span>
            </a>
          </nav>

          {/* Right Action Elements */}
          <div className="hidden lg:flex items-center gap-5">
            {/* CALL US NOW Button */}
            <a
              href="tel:+919811086206"
              className="bg-[#D95D16] hover:bg-[#c2410c] text-white text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer rounded-xs"
            >
              CALL US NOW
            </a>

            {/* Search Icon */}
            <button
              className="p-1.5 text-gray-700 hover:text-[#D95D16] transition-colors cursor-pointer"
              title="Search"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Divider */}
            <div className="w-[1px] h-5 bg-gray-300"></div>

            {/* GET IN TOUCH */}
            <Link
              href="/contact"
              className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#D95D16] hover:text-[#c2410c] transition-colors"
            >
              <span className="text-[#D95D16] font-bold text-sm tracking-tighter">::</span>
              GET IN TOUCH
            </Link>

            {/* Auth Dropdown (if user is logged in) */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800 cursor-pointer"
                >
                  <User size={14} className="text-[#D95D16]" />
                  <span className="max-w-[70px] truncate">{user.name}</span>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-xl py-2">
                    <div className="px-4 py-2 border-b border-gray-100 text-xs">
                      <span className="text-gray-400 block">Signed in as</span>
                      <span className="font-semibold text-gray-800 truncate block">{user.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut size={13} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="tel:+919811086206"
              className="bg-[#D95D16] text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-xs"
            >
              CALL
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-800 hover:text-[#D95D16] cursor-pointer"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 py-6 px-6 flex flex-col gap-4 animate-fade-in-up shadow-xl">
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-[#D95D16]"
            >
              ABOUT US
            </Link>
            <Link
              href="/why-us"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-[#D95D16]"
            >
              WHY US
            </Link>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold uppercase tracking-wider text-gray-800">
                PROJECTS
              </span>
              <div className="pl-4 flex flex-col gap-2 border-l-2 border-[#D95D16]">
                <Link
                  href="/projects?filter=Ongoing"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-semibold text-gray-600 hover:text-[#D95D16]"
                >
                  ON GOING
                </Link>
                <Link
                  href="/projects?filter=Completed"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-semibold text-gray-600 hover:text-[#D95D16]"
                >
                  COMPLETED
                </Link>
              </div>
            </div>

            <Link
              href="/careers"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-[#D95D16]"
            >
              CAREERS
            </Link>
            <Link
              href="/news"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-[#D95D16]"
            >
              NEWS
            </Link>
            
            <a
              href="https://www.youtube.com/@MotwaniConstructionsOdisha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#D95D16] font-bold text-xs uppercase"
              title="Motwani Constructions YouTube Channel (@MotwaniConstructionsOdisha)"
            >
              <svg className="w-5 h-4 fill-[#D95D16]" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YOUTUBE CHANNEL
            </a>

            <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="tel:+919811086206"
                className="bg-[#D95D16] text-white text-center font-bold text-xs uppercase py-3 rounded-xs"
              >
                CALL US NOW
              </a>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-center text-[#D95D16] font-bold text-xs uppercase py-2 border border-[#D95D16]"
              >
                :: GET IN TOUCH
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
