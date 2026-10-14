"use client";

import React, { useState } from "react";
import { Code2, Cpu, Sparkles, Layers, GitBranch, Terminal, Globe, Box } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export interface SkillItem {
  name: string;
  category: "Core Languages" | "Frameworks & UI" | "3D & Motion" | "Tooling & Cloud";
  level: string;
  description: string;
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Strictly displaying real, verifiable technologies used in this codebase
  const skillsList: SkillItem[] = [
    { name: "HTML5", category: "Core Languages", level: "Semantic Markup", description: "Accessible HTML5 elements, microdata schemas, SEO metadata, and DOM standards." },
    { name: "CSS3 / Vanilla CSS", category: "Core Languages", level: "Advanced Layouts", description: "Modern CSS Grid, Flexbox, custom properties, glassmorphism, and fluid typography math." },
    { name: "JavaScript", category: "Core Languages", level: "ESNext Modern", description: "Modern ECMAScript, asynchronous programming, Web APIs, and 2D canvas physics." },
    { name: "TypeScript", category: "Core Languages", level: "Strict Typing", description: "Type safety, generic interfaces, utility types, and clean codebase architecture." },
    
    { name: "React 19", category: "Frameworks & UI", level: "Component Architecture", description: "Modern React 19 component model, hooks, state patterns, and memoization." },
    { name: "Next.js 15 / 16", category: "Frameworks & UI", level: "App Router / SSR", description: "Server components, streaming rendering, Turbopack, and dynamic routing." },
    { name: "Tailwind CSS", category: "Frameworks & UI", level: "Design Tokens", description: "Utility-first styling, responsive tokens, custom theme plugins, and dark palettes." },
    
    { name: "Three.js / WebGL", category: "3D & Motion", level: "Spatial 3D Engine", description: "Real-time 3D geometry, shaders, dynamic canvas textures, cameras, and lighting." },
    { name: "GSAP", category: "3D & Motion", level: "Timeline Orchestration", description: "High-performance JavaScript animation timelines and kinetic physics." },
    { name: "ScrollTrigger", category: "3D & Motion", level: "Scroll Dynamics", description: "Smooth scroll choreography, pin transitions, and viewport-driven reveals." },
    { name: "Framer Motion", category: "3D & Motion", level: "Declarative Motion", description: "Layout animations, exit transitions, physics springs, and gestural UI." },
    
    { name: "Git", category: "Tooling & Cloud", level: "Version Control", description: "Branching workflows, rebase hygiene, and collaborative versioning." },
    { name: "GitHub", category: "Tooling & Cloud", level: "CI/CD & Collaboration", description: "GitHub actions, pull request reviews, repository management, and releases." },
    { name: "Vercel", category: "Tooling & Cloud", level: "Edge Cloud", description: "Global edge deployments, serverless functions, and production analytics." },
  ];

  const categories = ["All", "Core Languages", "Frameworks & UI", "3D & Motion", "Tooling & Cloud"];

  const filteredSkills = skillsList.filter(
    (s) => activeFilter === "All" || s.category === activeFilter
  );

  return (
    <section id="skills" className="relative py-28 px-6 sm:px-10 lg:px-14 xl:px-16 max-w-[1780px] 2xl:max-w-[1920px] mx-auto scroll-mt-20 border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#B6FF3B]/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <ScrollReveal direction="up" delay={0.05}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121A15] border border-[#B6FF3B]/30 text-[#B6FF3B] font-mono text-xs mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>TECHNICAL PROFICIENCY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans uppercase">
              DEVELOPMENT <span className="text-[#B6FF3B]">STACK</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3 font-sans leading-relaxed">
              The core technologies and creative toolsets used to architect responsive, resilient, and expressive digital products.
            </p>
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-[#B6FF3B] text-black font-bold shadow-md shadow-[#B6FF3B]/20 scale-105"
                    : "bg-[#0D120F] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSkills.map((skill, idx) => (
          <ScrollReveal key={skill.name} direction="up" delay={idx * 0.04}>
            <div className="p-5 rounded-xl bg-[#0D120F] border border-white/10 hover:border-[#B6FF3B]/50 hover:shadow-[0_0_20px_rgba(182,255,59,0.12)] transition-all duration-300 group flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141C16] text-[#B6FF3B] border border-[#B6FF3B]/20">
                    {skill.category}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">{skill.level}</span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-[#B6FF3B] transition-colors font-mono">
                  {skill.name}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2 font-sans">
                  {skill.description}
                </p>
              </div>

              {/* Glowing Accent Indicator */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>MASTERY STATUS</span>
                <span className="text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>ACTIVE IN STACK</span>
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
