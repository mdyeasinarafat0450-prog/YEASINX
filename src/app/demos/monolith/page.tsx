"use client";

import React, { useState } from "react";
import { Compass, Maximize2, Layers, Grid, ChevronRight, Eye } from "lucide-react";

export default function MonolithDemoPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("raw-concrete");
  const [showBlueprints, setShowBlueprints] = useState(false);

  const architecturalWorks = [
    {
      title: "PAVILION DER STILLE",
      location: "ENGADIN, SWITZERLAND",
      year: "2024",
      typology: "cultural",
      area: "1,240 m²",
      elevation: "1,820m AMSL",
      description: "Cast-in-place board-formed concrete sanctuary carved into the alpine bedrock with solitary light apertures.",
    },
    {
      title: "OBSERVATORY VIII",
      location: "ATACAMA DESERT, CHILE",
      year: "2025",
      typology: "public",
      area: "3,800 m²",
      elevation: "2,400m AMSL",
      description: "Monolithic rammed-earth astronomical research pavilion framed by dark oxidized steel cantilevers.",
    },
    {
      title: "KYOTO RESIDENCE // NIKKO",
      location: "KYOTO, JAPAN",
      year: "2024",
      typology: "residential",
      area: "460 m²",
      elevation: "65m AMSL",
      description: "Charred shou sugi ban timber and volcanic basalt stone courtyard residence organized along a water axis.",
    },
    {
      title: "VALLEY QUARRY GALLERY",
      location: "VALS, SWITZERLAND",
      year: "2023",
      typology: "cultural",
      area: "2,100 m²",
      elevation: "1,250m AMSL",
      description: "Subterranean exhibition chambers created within a decommissioned quartz quarry.",
    },
  ];

  const materials = [
    { id: "raw-concrete", name: "C40/50 BOARD-FORMED CONCRETE", texture: "Fine grain timber aggregate, matte mineral sealer", tone: "#2B2E2C" },
    { id: "oxidized-steel", name: "BLACKENED STRUCTURAL CORTEN", texture: "Natural acid patina, hot-rolled steel flange", tone: "#1F1B18" },
    { id: "charred-timber", name: "YAKISUGI CHARRED CYPRESS", texture: "Heavy carbon alligator flake, fire-hardened", tone: "#141514" },
  ];

  const filtered = architecturalWorks.filter(
    (w) => activeCategory === "all" || w.typology === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#0A0C0B] text-[#EDEDED] font-sans selection:bg-white selection:text-black pb-20">
      {/* Top Editorial Bar */}
      <header className="sticky top-0 z-30 bg-[#0A0C0B]/90 backdrop-blur-md border-b border-white/10 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-serif text-2xl tracking-[0.25em] text-white">MONOLITH</span>
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest hidden md:inline">
            ARCHITECTURAL MONOGRAPHS · ZÜRICH / KYOTO
          </span>
        </div>

        <div className="flex items-center space-x-6 text-xs font-mono">
          <button
            onClick={() => setShowBlueprints(!showBlueprints)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 border transition-all ${
              showBlueprints ? "border-white bg-white text-black font-bold" : "border-white/20 text-zinc-400 hover:text-white"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{showBlueprints ? "BLUEPRINT MODE ON" : "TOGGLE BLUEPRINT"}</span>
          </button>
        </div>
      </header>

      {/* Hero Quote */}
      <section className="px-8 pt-16 pb-12 max-w-6xl mx-auto border-b border-white/10">
        <div className="text-xs font-mono text-zinc-500 mb-4 tracking-widest">PHILOSOPHY // NO. 04</div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-[1.1] max-w-4xl text-zinc-100">
          “SPACE DOES NOT EXIST UNTIL LIGHT CARVES IT OUT OF SOLID MATTER.”
        </h1>
        <div className="mt-8 flex flex-wrap gap-8 text-xs font-mono text-zinc-400">
          <div><span className="text-zinc-600">FOUNDED:</span> 2018</div>
          <div><span className="text-zinc-600">PRACTICE:</span> STRUCTURAL REDUCTIONISM</div>
          <div><span className="text-zinc-600">PROJECTS BUILT:</span> 42 COMMISSIONS</div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-8 py-8 max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 text-xs font-mono">
          {["all", "cultural", "public", "residential"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 uppercase transition-all border ${
                activeCategory === cat
                  ? "border-white text-white bg-white/10"
                  : "border-white/10 text-zinc-500 hover:border-white/30 hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-xs font-mono text-zinc-500">
          SHOWING {filtered.length} OF {architecturalWorks.length} STRUCTURES
        </div>
      </section>

      {/* Project Grid */}
      <section className="px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((work, idx) => (
          <div
            key={work.title}
            className={`p-6 border transition-all duration-300 group ${
              showBlueprints
                ? "bg-[#070908] border-cyan-500/30 font-mono shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]"
                : "bg-[#0E110F] border-white/10 hover:border-white/30"
            }`}
          >
            <div className="flex justify-between items-start text-xs font-mono text-zinc-500 mb-6">
              <span>REF // 0{idx + 1}</span>
              <span className="text-zinc-400 uppercase tracking-widest">{work.typology}</span>
            </div>

            {/* Architectural Frame Illustration */}
            <div className="h-52 bg-[#121614] border border-white/10 mb-6 relative overflow-hidden flex flex-col justify-end p-6">
              {showBlueprints && (
                <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
              )}
              <div className="text-[10px] font-mono text-zinc-400 mb-1">{work.location}</div>
              <h3 className="text-2xl font-serif text-white tracking-wide">{work.title}</h3>
              <div className="text-[11px] font-mono text-zinc-500 mt-2">
                {work.area} · {work.elevation} · {work.year}
              </div>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed font-sans">{work.description}</p>
          </div>
        ))}
      </section>

      {/* Material Inspector Section */}
      <section className="px-8 pt-16 max-w-6xl mx-auto border-t border-white/10 mt-16">
        <div className="text-xs font-mono text-zinc-500 mb-2 tracking-widest">TACTILE ARCHIVE</div>
        <h2 className="text-2xl font-serif mb-6">MATERIAL HONESTY</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {materials.map((mat) => (
            <div
              key={mat.id}
              onClick={() => setSelectedMaterial(mat.id)}
              className={`p-4 border cursor-pointer transition-all ${
                selectedMaterial === mat.id ? "border-white bg-white/10" : "border-white/10 bg-[#0E110F] hover:border-white/30"
              }`}
            >
              <div className="w-full h-12 mb-3 rounded-none" style={{ backgroundColor: mat.tone }} />
              <div className="text-xs font-mono font-bold text-white mb-1">{mat.name}</div>
              <p className="text-[11px] font-mono text-zinc-400">{mat.texture}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
