"use client";

import React, { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Code2, Globe } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Futuristic interactive geometric wireframe matrix reacting smoothly to mouse
  useEffect(() => {
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

    // Grid coordinates
    const cols = 28;
    const rows = 16;
    let time = 0;

    const render = () => {
      time += 0.015;
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cellW = width / cols;
      const cellH = height / rows;

      ctx.lineWidth = 0.5;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellW;
          const y = j * cellH;

          // Distance to mouse
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 320;

          let offsetX = 0;
          let offsetY = 0;

          if (dist < maxDist) {
            const factor = (maxDist - dist) / maxDist;
            offsetX = -(dx / dist) * factor * 25;
            offsetY = -(dy / dist) * factor * 25;
          }

          const wave = Math.sin(time + i * 0.2 + j * 0.15) * 4;

          const px = x + offsetX;
          const py = y + offsetY + wave;

          // Ambient grid dot
          const alpha = Math.max(0.04, 1 - dist / 350) * 0.45;
          ctx.fillStyle = `rgba(182, 255, 59, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, dist < 180 ? 2 : 1, 0, Math.PI * 2);
          ctx.fill();

          // Connect horizontal neighbors if close to cursor
          if (i < cols - 1 && dist < 220) {
            ctx.strokeStyle = `rgba(182, 255, 59, ${alpha * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo((i + 1) * cellW, py);
            ctx.stroke();
          }
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
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background Interactive Matrix Canvas */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-70">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Ambient Gradient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B6FF3B]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Top Meta Status Pill */}
      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0D1410] border border-[#B6FF3B]/30 text-xs font-mono text-[#B6FF3B] w-fit shadow-sm shadow-[#B6FF3B]/10">
        <span className="w-2 h-2 rounded-full bg-[#B6FF3B] animate-ping" />
        <span className="tracking-wider">NEXT-GEN INTERACTIVE PORTFOLIO // 2025</span>
      </div>

      {/* Main Cinematic Typography Centerpiece */}
      <div className="my-auto py-12 max-w-5xl">
        <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.95] text-white font-sans uppercase">
          I DESIGN <br />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B6FF3B] to-[#98E61C]">
            DIGITAL
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#B6FF3B]/40 blur-sm" />
          </span>{" "}
          <br />
          EXPERIENCES<span className="text-[#B6FF3B]">.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg sm:text-2xl text-zinc-300 font-mono tracking-tight max-w-3xl">
          Creative Developer <span className="text-[#B6FF3B]">·</span> Web Designer{" "}
          <span className="text-[#B6FF3B]">·</span> Motion Designer
        </p>

        {/* Short Statement */}
        <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans max-w-2xl leading-relaxed">
          Bridging bleeding-edge web engineering and cinematic art direction. Interactive platforms with in-browser live previews, zero compromise on performance.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#portfolio"
            id="hero-explore-work-btn"
            className="px-8 py-4 rounded-full bg-[#B6FF3B] text-black font-extrabold text-sm font-mono tracking-wider hover:bg-[#c9ff6a] transition-all transform hover:-translate-y-1 shadow-[0_0_35px_rgba(182,255,59,0.35)] flex items-center space-x-2"
          >
            <span>EXPLORE MY WORK</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            id="hero-lets-talk-btn"
            className="px-8 py-4 rounded-full bg-[#0D120F] border border-white/20 text-white font-mono text-sm hover:border-[#B6FF3B] hover:text-[#B6FF3B] hover:bg-[#141B16] transition-all transform hover:-translate-y-1 flex items-center space-x-2"
          >
            <span>LET&apos;S TALK</span>
            <span className="w-2 h-2 rounded-full bg-[#B6FF3B]" />
          </a>
        </div>
      </div>

      {/* Bottom Status & Scroll Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-zinc-500 gap-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-zinc-600">LATENCY:</span>
            <span className="text-[#B6FF3B]">0.4ms</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-zinc-600">ENGINE:</span>
            <span className="text-white">NEXT.JS 15 + GSAP</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#portfolio"
          className="flex items-center space-x-2 text-zinc-400 hover:text-[#B6FF3B] transition-colors group"
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
