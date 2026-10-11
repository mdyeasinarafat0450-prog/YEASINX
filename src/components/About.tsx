"use client";

import React from "react";
import { Sparkles, Terminal, Cpu, Layers, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function About() {
  const philosophies = [
    {
      title: "INTENTIONAL CRAFT",
      text: "Every interface transition, easing curve, and typographic hierarchy is calculated to convey clarity and visceral weight.",
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
    <section id="about" className="relative py-28 px-6 max-w-7xl mx-auto scroll-mt-20 border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#B6FF3B]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Tag */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121A15] border border-[#B6FF3B]/30 text-[#B6FF3B] font-mono text-xs mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        <span>EDITORIAL MANIFESTO</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] max-w-4xl">
        DESIGN WITH PURPOSE. <br />
        <span className="text-[#B6FF3B]">BUILD WITH PRECISION.</span>
      </h2>

      {/* Two-Column Editorial Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        {/* Left Column: Mission & Identity */}
        <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-sans">
          <p>
            I am a creative developer, web designer, and motion designer obsessed with creating memorable, immersive digital experiences that live at the intersection of graphic design, modern typography, and robust software engineering.
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            Rather than relying on generic boilerplate templates, every digital experience is built with intentional visual language, bespoke micro-interactions, and high-performance Web standards. From brutalist creative agency websites to complex data dashboards, my focus is always on engineering interfaces that genuinely captivate visitors while delivering rock-solid production reliability.
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            I believe modern web design should invite hands-on exploration. That is why NEON//FRAME provides embedded in-browser previews where visitors can directly interact with living codebases instead of passive flat mockups.
          </p>
        </div>

        {/* Right Column: Key Principles */}
        <div className="lg:col-span-5 space-y-4">
          {philosophies.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-[#0D120F] border border-white/10 hover:border-[#B6FF3B]/40 transition-all duration-300 group"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
