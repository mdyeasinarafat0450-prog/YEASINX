"use client";

import React, { useState, useEffect, useRef } from "react";
import { Project } from "@/types/project";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Film, Maximize2 } from "lucide-react";

interface VideoRendererProps {
  project: Project;
}

export default function VideoRenderer({ project }: VideoRendererProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeScene, setActiveScene] = useState(0);
  const [progress, setProgress] = useState(35);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const scenes = [
    { name: "01 // WIREFRAME OSCILLATION", color: "#F43F5E", bpm: 128 },
    { name: "02 // BASSLINE SPECTRUM", color: "#B6FF3B", bpm: 140 },
    { name: "03 // KINETIC TYPOGRAPHY", color: "#38BDF8", bpm: 120 },
  ];

  // Dynamic generative kinetic waveform canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const render = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 450;

      ctx.fillStyle = "#080A09";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isPlaying) {
        t += 0.04;
      }

      const activeColor = scenes[activeScene].color;
      const centerY = canvas.height / 2;
      const barCount = 48;
      const barWidth = canvas.width / (barCount * 1.5);
      const gap = barWidth * 0.5;

      // Draw pulsating frequency spectrum
      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + gap) + 40;
        const wave = Math.sin(t * 2 + i * 0.25) * Math.cos(t + i * 0.1);
        const amp = Math.abs(wave) * (canvas.height * 0.35) + 15;

        // Gradient bar
        const grad = ctx.createLinearGradient(0, centerY - amp, 0, centerY + amp);
        grad.addColorStop(0, activeColor);
        grad.addColorStop(0.5, "#FFFFFF");
        grad.addColorStop(1, activeColor);

        ctx.fillStyle = grad;
        ctx.shadowColor = activeColor;
        ctx.shadowBlur = 15;
        ctx.fillRect(x, centerY - amp, barWidth, amp * 2);
      }

      // Draw center oscilloscope line
      ctx.beginPath();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#FFFFFF";

      for (let x = 0; x < canvas.width; x += 6) {
        const y = centerY + Math.sin(x * 0.02 + t * 4) * 35 * Math.sin(t);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, activeScene]);

  return (
    <div className="w-full h-full bg-[#060807] flex flex-col items-center justify-center p-6 lg:p-8">
      <div className="max-w-4xl w-full bg-[#0D120F] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Video Header */}
        <div className="p-4 bg-[#111713] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Film className="w-4 h-4 text-[#B6FF3B]" />
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              {project.title} · MOTION DESIGN REEL
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/30">
            60 FPS PROCEDURAL MOTION
          </span>
        </div>

        {/* Video / Canvas viewport */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Center Play Overlay if paused */}
          {!isPlaying && (
            <div
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-[#B6FF3B] flex items-center justify-center text-black shadow-xl shadow-[#B6FF3B]/30 hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-black translate-x-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Video Scrubber & Controls */}
        <div className="p-4 bg-[#0A0D0B] border-t border-white/10 space-y-4">
          {/* Progress bar */}
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-full bg-[#B6FF3B] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B6FF3B] hover:text-black transition-colors flex items-center justify-center text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <span className="text-xs font-mono text-zinc-400">00:14 / 00:45</span>
            </div>

            {/* Scene Selector */}
            <div className="flex gap-2">
              {scenes.map((s, idx) => (
                <button
                  key={s.name}
                  onClick={() => setActiveScene(idx)}
                  className={`text-[11px] font-mono px-3 py-1.5 rounded-lg border transition-all ${
                    activeScene === idx
                      ? "border-[#B6FF3B] bg-[#142217] text-[#B6FF3B] font-bold"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
