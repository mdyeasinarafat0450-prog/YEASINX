"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Sparkles, Terminal } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "WORK", href: "#portfolio" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#080A09]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/80"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center space-x-2 text-white font-mono tracking-tight font-extrabold text-lg sm:text-xl"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-[#B6FF3B] group-hover:rotate-45 transition-transform duration-300 shadow-[0_0_12px_#B6FF3B]" />
          <span>NEON<span className="text-[#B6FF3B] group-hover:animate-pulse">//</span>FRAME</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#B6FF3B] transition-colors relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B6FF3B] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right CTA & Availability Status */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#0E1410] border border-[#B6FF3B]/30 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#B6FF3B] animate-ping" />
            <span className="text-[11px] text-zinc-400">OPEN FOR WORK</span>
          </div>

          <a
            href="#contact"
            id="nav-lets-talk-btn"
            className="px-4 py-2 rounded-full bg-[#B6FF3B] text-black font-semibold text-xs font-mono hover:bg-[#c6fb69] hover:shadow-[0_0_25px_rgba(182,255,59,0.4)] transition-all flex items-center space-x-1.5"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090D0A] border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-300 hover:text-[#B6FF3B] transition-colors flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#B6FF3B]" />
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#B6FF3B] text-black font-bold text-center text-xs font-mono block shadow-lg shadow-[#B6FF3B]/20"
            >
              LET&apos;S TALK
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
