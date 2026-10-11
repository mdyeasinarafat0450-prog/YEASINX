"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, Volume2, VolumeX, Eye, Layers, Compass, Play } from "lucide-react";

export default function VantaDemoPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeWork, setActiveWork] = useState(0);

  const agencyWorks = [
    {
      title: "KRONOS CHRONOMETRY",
      tag: "Spatial 3D & E-Commerce",
      year: "2025",
      accent: "#B6FF3B",
      desc: "Revolutionary 3D luxury watch configurator with real-time raytraced reflections.",
    },
    {
      title: "CYBERDYNE SYSTEMS",
      tag: "Brutalist Brand Identity",
      year: "2025",
      accent: "#38BDF8",
      desc: "Kinetic design system and headless typography framework for autonomy hardware.",
    },
    {
      title: "NEO-TOKYO METRICS",
      tag: "Urban Kinetic Installation",
      year: "2024",
      accent: "#F43F5E",
      desc: "Interactive generative architectural projections mapping environmental audio.",
    },
    {
      title: "ZERO GRAVITY AUDIO",
      tag: "WebGL Spatial Experience",
      year: "2024",
      accent: "#A855F7",
      desc: "Immersive multi-sensory web experience reacting dynamically to binaural tracks.",
    },
  ];

  const clientManifesto = [
    { no: "01", title: "RADICAL CONTRAST", text: "We reject timid minimalism. Every pixel commands attention with intentional typographic tension." },
    { no: "02", title: "60FPS CRAFT", text: "Micro-interactions are not decorative fluff; they are kinetic feedback that brings interfaces alive." },
    { no: "03", title: "SUBVERSION OF NORMS", text: "Standard templates bore users. We engineer bespoke experiential architectures that convert." },
  ];

  return (
    <div className="min-h-screen bg-[#060807] text-[#FFFFFF] font-sans selection:bg-[#B6FF3B] selection:text-[#060807] pb-24">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-30 bg-[#060807]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-[#B6FF3B] rounded-full animate-ping" />
          <span className="font-extrabold text-xl tracking-tighter text-white font-mono">
            VANTA<span className="text-[#B6FF3B]">.</span>STUDIO
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#131A15] text-[#B6FF3B] font-mono border border-[#B6FF3B]/30 hidden sm:inline">
            CREATIVE AGENCY DEMO
          </span>
        </div>

        <nav className="flex items-center space-x-6 text-sm font-mono text-zinc-400">
          <a href="#work" className="hover:text-[#B6FF3B] transition-colors">WORK</a>
          <a href="#manifesto" className="hover:text-[#B6FF3B] transition-colors">MANIFESTO</a>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#B6FF3B] hover:text-[#B6FF3B] transition-all text-xs"
            title="Toggle Audio Feedback"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#B6FF3B]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? "AUDIO ON" : "AUDIO MUTED"}</span>
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 max-w-6xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#131A15] border border-[#B6FF3B]/30 text-[#B6FF3B] font-mono text-xs mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AVANT-GARDE DIGITAL EXPERIENCE STUDIO</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8 font-sans">
          WE SHAPE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B6FF3B] to-emerald-400">
            BRUTAL DIGITAL REALITIES
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
          Crafting fearless web platforms, visceral motion systems, and interactive digital artifacts for pioneering brands worldwide.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#work"
            className="px-6 py-3 rounded-full bg-[#B6FF3B] text-[#060807] font-semibold text-sm hover:bg-[#c9ff6a] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#B6FF3B]/20 inline-flex items-center space-x-2"
          >
            <span>EXPLORE COMMISSIONED WORK</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#manifesto"
            className="px-6 py-3 rounded-full border border-white/20 text-white font-mono text-sm hover:border-[#B6FF3B] hover:text-[#B6FF3B] transition-all inline-flex items-center space-x-2"
          >
            <Layers className="w-4 h-4" />
            <span>READ OUR MANIFESTO</span>
          </a>
        </div>
      </section>

      {/* Interactive Works Gallery */}
      <section id="work" className="px-6 py-16 max-w-6xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-[#B6FF3B] tracking-widest uppercase">SELECT ARCHIVE</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">FEATURED RELEASES</h2>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0 font-mono text-xs">
            {["all", "spatial 3d", "identity", "installation"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-full border transition-all uppercase ${
                  activeFilter === cat
                    ? "bg-[#B6FF3B] text-[#060807] border-[#B6FF3B] font-bold"
                    : "border-white/10 text-zinc-400 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agencyWorks.map((work, idx) => (
            <div
              key={work.title}
              onMouseEnter={() => setActiveWork(idx)}
              className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeWork === idx
                  ? "bg-[#111713] border-[#B6FF3B]/50 shadow-xl shadow-[#B6FF3B]/10 scale-[1.01]"
                  : "bg-[#0A0D0B] border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-mono text-zinc-500">{work.year} // 0{idx + 1}</span>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-mono"
                  style={{ backgroundColor: `${work.accent}15`, color: work.accent }}
                >
                  {work.tag}
                </span>
              </div>

              {/* Interactive simulated preview canvas */}
              <div
                className="h-44 rounded-xl border border-white/10 relative overflow-hidden flex flex-col justify-end p-5 transition-transform group-hover:scale-[1.02]"
                style={{
                  background: `radial-gradient(circle at top right, ${work.accent}20, transparent 70%), #0D120F`,
                }}
              >
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#B6FF3B] group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono text-zinc-400 mb-1">INTERACTIVE SHOWCASE</div>
                <h4 className="text-xl font-bold tracking-tight text-white">{work.title}</h4>
              </div>

              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{work.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agency Manifesto Section */}
      <section id="manifesto" className="px-6 py-16 max-w-6xl mx-auto border-t border-white/10">
        <span className="text-xs font-mono text-[#B6FF3B] tracking-widest uppercase">CORE ETHOS</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1 mb-10">THE VANTA CREED</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientManifesto.map((item) => (
            <div key={item.no} className="p-6 rounded-xl bg-[#0D120F] border border-white/10">
              <span className="text-2xl font-mono font-bold text-[#B6FF3B]">{item.no}</span>
              <h3 className="text-lg font-bold mt-3 mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simulated Footer */}
      <footer className="px-6 pt-12 border-t border-white/10 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-zinc-500">
        <p>© 2025 VANTA STUDIO. ALL SENSES RESERVED.</p>
        <p className="mt-2 sm:mt-0 text-[#B6FF3B]">DESIGNED FOR NEON//FRAME PORTFOLIO</p>
      </footer>
    </div>
  );
}
