"use client";

import React, { useState } from "react";
import { Sparkles, Compass, Palette, Code2, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  shortDesc: string;
  details: string;
  icon: React.ElementType;
  deliverables: string[];
  techFocus: string;
}

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: ProcessStep[] = [
    {
      step: "01",
      phase: "PHASE 01 // ARCHITECTURAL SCOPING",
      title: "Discover & Strategy",
      shortDesc: "Deconstructing project requirements, defining visual narratives, and establishing rigorous performance benchmarks.",
      details:
        "Every exceptional product starts with deep structural analysis. I map out user interaction patterns, evaluate rendering strategies (SSR, static generation, client sandboxes), and establish 60FPS latency targets before writing a single line of code.",
      icon: Compass,
      deliverables: ["Product Architecture Blueprint", "Technical Feasibility Spec", "User Journey & Flow Diagrams", "Performance Budget Targets"],
      techFocus: "System Design · Flow Architecture",
    },
    {
      step: "02",
      phase: "PHASE 02 // ART DIRECTION",
      title: "Design & Prototyping",
      shortDesc: "Crafting bespoke design systems, editorial typography, dark cinematic aesthetics, and kinetic motion curves.",
      details:
        "Rejecting cookie-cutter templates in favor of a distinctive visual identity. I engineer custom glassmorphism layers, dark room palettes with neon accents, fluid typography scales, and tactile micro-interactions that give interfaces visceral weight.",
      icon: Palette,
      deliverables: ["Bespoke Design Token System", "Editorial Typographic Scale", "Micro-Interaction Motion Curves", "3D / Canvas Spatial Assets"],
      techFocus: "Figma Tokens · Motion Physics · 3D Mockups",
    },
    {
      step: "03",
      phase: "PHASE 03 // FULL-STACK ENGINEERING",
      title: "Develop & Integrate",
      shortDesc: "Writing clean, type-safe Next.js codebases with WebGL 3D scenes, smooth animations, and sandbox renderers.",
      details:
        "Turning concepts into production-grade software. Built on modern React 19, TypeScript, and Next.js with App Router. I integrate Three.js procedural scenes, GSAP scroll choreography, and responsive components with zero layout shift.",
      icon: Code2,
      deliverables: ["Modular TypeScript Components", "Real-Time 3D WebGL Scenes", "In-Browser Live Sandbox Engine", "Cross-Device Responsive Shell"],
      techFocus: "Next.js · React 19 · Three.js · Tailwind CSS",
    },
    {
      step: "04",
      phase: "PHASE 04 // PRODUCTION RELEASE",
      title: "Launch & Optimization",
      shortDesc: "Automated CI/CD deployment to Vercel Edge, 99+ Lighthouse performance audits, and rigorous cross-browser testing.",
      details:
        "Shipping with speed and precision. Every deployment is benchmarked for instant First Contentful Paint, zero cumulative layout shifts, strict security headers, microdata SEO, and comprehensive mobile/touch accessibility.",
      icon: Rocket,
      deliverables: ["Vercel Global Edge Deployment", "Lighthouse 99+ Audit Report", "Automated GitHub CI/CD Pipeline", "Production Telemetry Monitoring"],
      techFocus: "Vercel Edge · CI/CD · SEO & Accessibility",
    },
  ];

  return (
    <section id="process" className="relative py-28 px-6 sm:px-10 lg:px-14 xl:px-16 max-w-[1780px] 2xl:max-w-[1920px] mx-auto scroll-mt-20 border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#B6FF3B]/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Top Tag & Header */}
      <ScrollReveal direction="up" delay={0.05}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121A15] border border-[#B6FF3B]/30 text-[#B6FF3B] font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXECUTION METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans uppercase">
              EXPERIENCE &amp; <span className="text-[#B6FF3B]">PROCESS</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3 font-sans leading-relaxed">
              A battle-tested 4-stage engineering workflow designed to turn ambitious concepts into high-performance digital reality.
            </p>
          </div>

          {/* Step Counter Strip */}
          <div className="hidden sm:flex items-center space-x-2 p-2 rounded-xl bg-[#0D120F] border border-white/10 font-mono text-xs text-zinc-400">
            <span className="text-white font-bold px-2 py-1 bg-[#152018] rounded text-[#B6FF3B]">04 STAGES</span>
            <span className="text-zinc-600">|</span>
            <span className="px-2">DISCOVER &rarr; DESIGN &rarr; DEVELOP &rarr; LAUNCH</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Process Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = activeStep === idx;

          return (
            <ScrollReveal key={item.step} direction="up" delay={idx * 0.1}>
              <div
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group border relative overflow-hidden h-full ${
                  isSelected
                    ? "bg-[#0E1611] border-[#B6FF3B] shadow-[0_0_30px_rgba(182,255,59,0.18)] -translate-y-2"
                    : "bg-[#0D120F] border-white/10 hover:border-[#B6FF3B]/40 hover:-translate-y-1"
                }`}
              >
                {/* Giant Background Numeral Watermark */}
                <div className="absolute top-2 right-4 text-6xl font-extrabold font-mono text-white/5 pointer-events-none select-none group-hover:text-[#B6FF3B]/10 transition-colors">
                  {item.step}
                </div>

                <div>
                  {/* Header: Icon & Step Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#B6FF3B] text-black shadow-lg shadow-[#B6FF3B]/30"
                          : "bg-[#141B16] text-[#B6FF3B] group-hover:bg-[#1B271F]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#B6FF3B] tracking-wider">
                      {item.step} //
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                    {item.phase}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#B6FF3B] transition-colors font-sans mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Bottom Deliverables & Status */}
                <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                  <div className="text-[11px] font-mono text-zinc-400">
                    <span className="text-zinc-500">KEY FOCUS: </span>
                    <span className="text-[#B6FF3B]">{item.techFocus}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Selected Stage Expanded Dossier Panel */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#0B100D] border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#B6FF3B]">
                <span>STAGE {steps[activeStep].step} DEEP DIVE</span>
                <span>&bull;</span>
                <span className="text-white">{steps[activeStep].title}</span>
              </div>
              <h4 className="text-2xl font-bold text-white font-sans">
                How I execute the <span className="text-[#B6FF3B]">{steps[activeStep].title}</span> phase
              </h4>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                {steps[activeStep].details}
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#070A08] p-5 rounded-xl border border-white/5 space-y-3">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                VERIFIED DELIVERABLES
              </span>
              <div className="space-y-2">
                {steps[activeStep].deliverables.map((del) => (
                  <div key={del} className="flex items-center space-x-2 text-xs font-mono text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B6FF3B] shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
