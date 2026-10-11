"use client";

import React, { useRef, useEffect, useState } from "react";
import { Project } from "@/types/project";
import { Sparkles, RefreshCw, Zap, Sliders, Activity } from "lucide-react";

interface CustomRendererProps {
  project: Project;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function CustomRenderer({ project }: CustomRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particleCount, setParticleCount] = useState(250);
  const [gravityMode, setGravityMode] = useState<"attract" | "repel">("attract");
  const [colorTheme, setColorTheme] = useState<"neon" | "cyan" | "magenta">("neon");
  const [fps, setFps] = useState(60);

  const themeColors = {
    neon: ["#B6FF3B", "#D6FF85", "#98E61C", "#FFFFFF"],
    cyan: ["#38BDF8", "#0284C7", "#7DD3FC", "#FFFFFF"],
    magenta: ["#F43F5E", "#FB7185", "#FDA4AF", "#FFFFFF"],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize particles
    const particles: Particle[] = [];
    const colors = themeColors[colorTheme];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseDown = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseDown = () => {
      isMouseDown = true;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    let lastTime = performance.now();
    let frames = 0;

    const render = (time: number) => {
      frames++;
      if (time - lastTime >= 1000) {
        setFps(frames);
        frames = 0;
        lastTime = time;
      }

      ctx.fillStyle = "rgba(8, 10, 9, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Render mouse attractor cursor
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, isMouseDown ? 45 : 25, 0, Math.PI * 2);
      ctx.strokeStyle = gravityMode === "attract" ? "rgba(182, 255, 59, 0.4)" : "rgba(244, 63, 94, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gravitational force towards mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 300) {
          const force = (300 - dist) / 300;
          const angle = Math.atan2(dy, dx);
          const mult = gravityMode === "attract" ? (isMouseDown ? 1.5 : 0.6) : (isMouseDown ? -2 : -0.8);
          p.vx += Math.cos(angle) * force * mult;
          p.vy += Math.sin(angle) * force * mult;
        }

        // Apply velocities and air damping
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > height) { p.y = height; p.vy *= -1; }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 65) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(182, 255, 59, ${0.35 * (1 - cdist / 65)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [particleCount, gravityMode, colorTheme]);

  return (
    <div className="w-full h-full bg-[#080A09] flex flex-col relative overflow-hidden">
      {/* Top Controls Bar */}
      <div className="p-4 bg-[#0D120F]/90 backdrop-blur-md border-b border-white/10 z-10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-lg bg-[#B6FF3B]/10 text-[#B6FF3B] border border-[#B6FF3B]/30">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              {project.title} · REAL-TIME VECTOR PHYSICS SANDBOX
            </span>
            <div className="text-[10px] font-mono text-zinc-400">
              Interactive 2D physics running natively inside modal
            </div>
          </div>
        </div>

        {/* Real-time controls */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <button
            onClick={() => setGravityMode(gravityMode === "attract" ? "repel" : "attract")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              gravityMode === "attract"
                ? "bg-[#142217] border-[#B6FF3B] text-[#B6FF3B]"
                : "bg-[#251216] border-red-500 text-red-400"
            }`}
          >
            {gravityMode === "attract" ? "MODE: ATTRACT" : "MODE: REPEL"}
          </button>

          <div className="hidden sm:flex items-center space-x-1 bg-[#121714] p-1 rounded-lg border border-white/10">
            {(["neon", "cyan", "magenta"] as const).map((thm) => (
              <button
                key={thm}
                onClick={() => setColorTheme(thm)}
                className={`px-2 py-1 rounded text-[11px] uppercase transition-all ${
                  colorTheme === thm ? "bg-[#B6FF3B] text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {thm}
              </button>
            ))}
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-[#121714] border border-white/10 text-emerald-400 text-[11px] flex items-center space-x-1">
            <Activity className="w-3 h-3" />
            <span>{fps} FPS</span>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 w-full relative cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-4 left-4 pointer-events-none text-[11px] font-mono text-zinc-500 bg-[#080A09]/80 px-3 py-1.5 rounded-lg border border-white/10">
          💡 MOVE MOUSE TO ATTRACT · CLICK &amp; HOLD FOR SHOCKWAVE PULSE
        </div>
      </div>
    </div>
  );
}
