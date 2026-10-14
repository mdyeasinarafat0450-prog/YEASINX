"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Code2, Terminal } from "lucide-react";
import DeveloperParallaxHero from "./DeveloperParallaxHero";
import { ScrollReveal } from "./ScrollReveal";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle ambient matrix background particle grid (lightweight 2D canvas)
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const cols = 22;
    const rows = 14;
    let time = 0;

    const render = () => {
      time += 0.012;
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const cellW = width / cols;
      const cellH = height / rows;

      ctx.lineWidth = 0.5;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellW;
          const y = j * cellH;

          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 260;

          let offsetX = 0;
          let offsetY = 0;

          if (dist < maxDist) {
            const factor = (maxDist - dist) / maxDist;
            offsetX = -(dx / dist) * factor * 16;
            offsetY = -(dy / dist) * factor * 16;
          }

          const wave = Math.sin(time + i * 0.18 + j * 0.14) * 3;
          const px = x + offsetX;
          const py = y + offsetY + wave;

          const alpha = Math.max(0.02, 1 - dist / 320) * 0.35;
          ctx.fillStyle = `rgba(182, 255, 59, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, dist < 140 ? 1.6 : 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-12 px-6 sm:px-10 lg:px-14 xl:px-16 w-full max-w-[1780px] 2xl:max-w-[1920px] mx-auto overflow-hidden">
      {/* Background Interactive Ambient Canvas */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-35">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Atmospheric Ambient Lighting Pools */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#B6FF3B]/8 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[450px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Header Eyebrow Tag & Status Indicator */}
      <ScrollReveal direction="down" delay={0.1}>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D1410] border border-[#B6FF3B]/30 text-xs font-mono text-[#B6FF3B] shadow-sm shadow-[#B6FF3B]/10">
            <span className="w-2 h-2 rounded-full bg-[#B6FF3B] animate-ping" />
            <span className="tracking-wider font-semibold">AVAILABLE FOR PROJECTS</span>
          </div>
          <div className="hidden sm:inline-flex items-center space-x-2 text-xs font-mono text-zinc-400">
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">INDEPENDENT DEVELOPER / CREATIVE BUILDER</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Premium Split Layout: Typography on Left / Coder Workstation & Wireframe on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center my-auto py-6">
        {/* Left Column: Bold Editorial Typography & CTAs */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-6">
          {/* Main Cinematic Typography */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.02] font-sans uppercase">
            <span className="block text-white tracking-tight">
              I DESIGN<span className="text-[#B6FF3B]">,</span>
            </span>
            <span className="block text-white tracking-tight">
              I CREATE<span className="text-[#B6FF3B]">,</span>
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B6FF3B] to-[#98E61C] tracking-tight drop-shadow-[0_0_35px_rgba(182,255,59,0.35)]">
              I DEVELOP<span className="text-[#B6FF3B]">.</span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-zinc-300 font-sans max-w-xl leading-relaxed">
            Turning ambitious concepts into pixel-perfect digital reality. Architecting interactive interfaces, spatial 3D WebGL scenes, and robust web applications with clean TypeScript.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#portfolio"
                id="hero-explore-work-btn"
                className="px-8 py-4 rounded-full bg-[#B6FF3B] text-black font-extrabold text-xs sm:text-sm font-mono tracking-wider hover:bg-[#c9ff6a] transition-all transform hover:-translate-y-1 shadow-[0_0_35px_rgba(182,255,59,0.35)] flex items-center space-x-2 cursor-pointer"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                id="hero-lets-connect-btn"
                className="px-8 py-4 rounded-full bg-[#0D120F] border border-white/20 text-white font-mono text-xs sm:text-sm hover:border-[#B6FF3B] hover:text-[#B6FF3B] hover:bg-[#141B16] transition-all transform hover:-translate-y-1 flex items-center space-x-2 cursor-pointer"
              >
                <span>LET&apos;S CONNECT</span>
                <span className="w-2 h-2 rounded-full bg-[#B6FF3B]" />
              </a>
            </div>
          </ScrollReveal>

          {/* Quick Pillars Row */}
          <ScrollReveal direction="up" delay={0.58}>
            <div className="pt-4 flex items-center space-x-6 text-xs font-mono text-zinc-400">
              <div>
                <span className="text-[#B6FF3B] font-bold">01</span>
                <span className="text-zinc-300 ml-1.5">CREATIVE DESIGN</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div>
                <span className="text-[#B6FF3B] font-bold">02</span>
                <span className="text-zinc-300 ml-1.5">CLEAN CODE</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div>
                <span className="text-[#B6FF3B] font-bold">03</span>
                <span className="text-zinc-300 ml-1.5">60FPS PERFORMANCE</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Seated Coder Workstation with Hover/Tap Wireframe Transition */}
        <div className="lg:col-span-7 xl:col-span-7 w-full flex items-center justify-center">
          <ScrollReveal direction="left" delay={0.2} duration={0.8}>
            <DeveloperParallaxHero />
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Status & Scroll Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-zinc-500 gap-4 mt-8">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-zinc-600">STATUS:</span>
            <span className="text-[#B6FF3B]">ALL SYSTEMS NOMINAL</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-zinc-600">STACK:</span>
            <span className="text-white">NEXT.JS 15 &bull; TYPESCRIPT</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-zinc-600">BRAND:</span>
            <span className="text-[#B6FF3B]">NEXORA</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#portfolio"
          className="flex items-center space-x-2 text-zinc-400 hover:text-[#B6FF3B] transition-colors group cursor-pointer"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-[#B6FF3B] flex items-start justify-center p-1 transition-colors">
            <div className="w-1.5 h-2 rounded-full bg-[#B6FF3B] animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
