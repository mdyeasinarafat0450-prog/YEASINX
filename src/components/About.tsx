"use client";

import React from "react";
import { Sparkles, Terminal, Cpu, Layers, CheckCircle2, ArrowUpRight, Shield, Award } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export default function About() {
  const philosophies = [
    {
      title: "INTENTIONAL CRAFT",
      text: "Every transition, easing curve, and typographic hierarchy is calculated to convey visceral clarity without visual bloat.",
    },
    {
      title: "PERFORMANCE AS A FEATURE",
      text: "Visual aesthetics must never compromise 60FPS fluid execution. I engineer responsive web architectures that load instantly.",
    },
    {
      title: "BRIDGING DESIGN & CODE",
      text: "Speaking fluent design systems and robust TypeScript. Turning high-concept ideas into pixel-perfect production reality.",
    },
  ];

  return (
    <section id="about" className="relative py-28 px-6 sm:px-10 lg:px-14 xl:px-16 max-w-[1780px] 2xl:max-w-[1920px] mx-auto scroll-mt-20 border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#B6FF3B]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Tag & Main Heading */}
      <ScrollReveal direction="up" delay={0.05}>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121A15] border border-[#B6FF3B]/30 text-[#B6FF3B] font-mono text-xs mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EDITORIAL MANIFESTO</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] max-w-4xl">
          DESIGN WITH PURPOSE. <br />
          <span className="text-[#B6FF3B]">BUILD WITH PRECISION.</span>
        </h2>
      </ScrollReveal>

      {/* Two-Column Editorial Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        {/* Left Column: Mission & Identity */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="right" delay={0.1}>
            <div className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-sans">
              <p>
                I am the creative developer behind <span className="text-white font-bold">NEXORA</span>, focused on modern web experiences, creative interfaces, and interactive digital products that live at the intersection of graphic design, modern typography, and robust software engineering.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base">
                Rather than relying on generic boilerplate templates or shallow animations, every digital experience is built with intentional visual language, bespoke micro-interactions, and high-performance Web standards. From brutalist creative agency websites to complex data dashboards, my focus is always on engineering interfaces that genuinely captivate visitors while delivering rock-solid production reliability.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base">
                I believe modern web design should invite hands-on exploration. That is why NEXORA features embedded in-browser previews where visitors can directly interact with living codebases instead of passive flat mockups.
              </p>

              {/* Quick Credo Box */}
              <div className="p-4 rounded-xl bg-[#0D120F] border border-white/10 flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-[#141C16] border border-[#B6FF3B]/30 flex items-center justify-center text-[#B6FF3B] shrink-0 font-mono font-bold">
                  NX
                </div>
                <div>
                  <div className="text-xs font-mono text-[#B6FF3B]">CORE CREED</div>
                  <div className="text-xs sm:text-sm text-zinc-300 font-sans">
                    “I DESIGN, I CREATE, I DEVELOP — WHERE CREATIVE VISION MEETS CLEAN ARCHITECTURE.”
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Key Principles */}
        <div className="lg:col-span-5 space-y-4">
          {philosophies.map((item, idx) => (
            <ScrollReveal key={item.title} direction="left" delay={0.1 + idx * 0.08}>
              <div className="p-6 rounded-2xl bg-[#0D120F] border border-white/10 hover:border-[#B6FF3B]/40 transition-all duration-300 group">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xs font-mono font-bold text-[#B6FF3B]">0{idx + 1} //</span>
                  <h4 className="text-sm font-mono font-bold text-white group-hover:text-[#B6FF3B] transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans pl-8">
                  {item.text}
                </p>
              </div>
            </ScrollReveal>
          ))}

          {/* Performance Guarantee Pill */}
          <ScrollReveal direction="left" delay={0.35}>
            <div className="p-4 rounded-xl bg-[#0A0E0C] border border-[#B6FF3B]/20 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Shield className="w-4 h-4 text-[#B6FF3B]" />
                <span>STANDARDS COMPLIANCE</span>
              </div>
              <span className="text-[#B6FF3B] font-bold">W3C · WCAG 2.1 AA</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
