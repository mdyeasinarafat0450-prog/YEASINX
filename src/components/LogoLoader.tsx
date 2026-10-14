"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Terminal, ShieldCheck, ChevronRight } from "lucide-react";

interface LogoLoaderProps {
  onLoaded?: () => void;
  minDurationMs?: number;
}

export default function LogoLoader({
  onLoaded,
  minDurationMs = 2100,
}: LogoLoaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("INITIALIZING NEXORA ENGINE...");
  const [isFinishing, setIsFinishing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    // Disable background scrolling while loader is active
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / minDurationMs) * 100, 100);

      // Nonlinear smooth cyber easing
      setProgress(Math.floor(rawProgress));

      if (rawProgress < 25) {
        setStatusText("[01/04] BOOTSTRAPPING KERNEL & ENVIRONMENT...");
      } else if (rawProgress < 55) {
        setStatusText("[02/04] LOADING 3D WORKSTATION & ASSETS...");
      } else if (rawProgress < 85) {
        setStatusText("[03/04] INITIALIZING AMBIENT CYBER PARTICLES...");
      } else if (rawProgress < 100) {
        setStatusText("[04/04] CALIBRATING SHADERS & 60FPS ENGINE...");
      } else {
        setStatusText("SYSTEM READY // ACCESS GRANTED");
        clearInterval(interval);

        // Initiate cinematic shutter exit
        setTimeout(() => {
          setIsFinishing(true);
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = "";
            if (onLoaded) onLoaded();
          }, 850);
        }, 300);
      }
    }, 28);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [minDurationMs, onLoaded]);

  const handleSkip = () => {
    setProgress(100);
    setStatusText("SKIPPING INTRO // ACCESS GRANTED");
    setIsFinishing(true);
    setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = "";
      if (onLoaded) onLoaded();
    }, 400);
  };

  if (isDone) return null;

  return (
    <div
      aria-label="Website Loading Screen"
      className={`fixed inset-0 z-50 flex items-center justify-center select-none pointer-events-auto transition-opacity duration-700 ${
        isFinishing ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* =================================================================== */}
      {/* CINEMATIC SHUTTER SPLIT CURTAINS (Top & Bottom halves slide open)   */}
      {/* =================================================================== */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#080A09] border-b border-[#B6FF3B]/30 transition-transform duration-700 ease-out z-10 ${
          isFinishing ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#080A09] border-t border-[#B6FF3B]/30 transition-transform duration-700 ease-out z-10 ${
          isFinishing ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Cyber Grid Background Matrix */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(182, 255, 59, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(182, 255, 59, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Atmospheric Ambient Glow Pulsing in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#B6FF3B]/10 blur-[130px] rounded-full pointer-events-none z-20 animate-pulse" />

      {/* Cyber Scanline Line Sweeper */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-transparent via-[#B6FF3B]/5 to-transparent h-24 animate-scanline" />

      {/* Skip Button (Top Right) */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-30 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-[#B6FF3B] hover:border-[#B6FF3B]/40 text-xs font-mono transition-all flex items-center space-x-1 cursor-pointer"
        title="Skip Intro Animation"
      >
        <span>SKIP</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* Tech Corner HUD Brackets */}
      <div className="absolute top-6 left-6 z-30 w-6 h-6 border-t-2 border-l-2 border-[#B6FF3B]/60 pointer-events-none" />
      <div className="absolute bottom-6 left-6 z-30 w-6 h-6 border-b-2 border-l-2 border-[#B6FF3B]/60 pointer-events-none" />
      <div className="absolute bottom-6 right-6 z-30 w-6 h-6 border-b-2 border-r-2 border-[#B6FF3B]/60 pointer-events-none" />

      {/* =================================================================== */}
      {/* CENTRAL LOGO & TELEMETRY CENTERPIECE                                */}
      {/* =================================================================== */}
      <div
        className={`relative z-30 flex flex-col items-center justify-center p-8 max-w-md w-full text-center transition-all duration-500 transform ${
          isFinishing ? "scale-105 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Holographic Rotating Logo Icon */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 flex items-center justify-center">
          {/* Outermost Ticked HUD Circle (Clockwise) */}
          <div
            className="absolute inset-0 rounded-full border border-dashed border-[#B6FF3B]/35 animate-spin"
            style={{ animationDuration: "14s" }}
          />

          {/* Middle Counter-Rotating Segmented Ring */}
          <div
            className="absolute inset-2 rounded-full border-2 border-t-[#B6FF3B] border-r-transparent border-b-[#38BDF8] border-l-transparent animate-spin"
            style={{ animationDuration: "5s", animationDirection: "reverse" }}
          />

          {/* Inner Pulsing Radar Glow */}
          <div className="absolute inset-5 rounded-full bg-[#B6FF3B]/10 animate-ping opacity-40" />

          {/* Geometric Diamond Cube Emblem with Glowing Core */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            {/* Outer Diamond */}
            <div className="absolute inset-0 rotate-45 rounded-lg bg-gradient-to-br from-[#121A15] to-[#0A0E0C] border-2 border-[#B6FF3B] shadow-[0_0_30px_rgba(182,255,59,0.5)] transform hover:scale-105 transition-transform" />

            {/* Inner Glowing Core */}
            <div className="relative z-10 w-6 h-6 rotate-45 rounded-sm bg-[#B6FF3B] shadow-[0_0_16px_#B6FF3B] flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>

            {/* Orbiting Satellite Particle */}
            <div
              className="absolute -inset-1 animate-spin"
              style={{ animationDuration: "3s" }}
            >
              <div className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
            </div>
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-center space-x-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[0.35em] text-white uppercase font-sans pl-2">
              NEXORA
            </h1>
            <span className="w-2.5 h-2.5 rounded-full bg-[#B6FF3B] shadow-[0_0_12px_#B6FF3B] animate-ping" />
          </div>

          <div className="flex items-center justify-center space-x-2 text-[11px] font-mono tracking-widest text-zinc-400">
            <span className="text-[#B6FF3B] font-bold">&bull;</span>
            <span>CREATIVE DEVELOPER</span>
            <span className="text-zinc-600">/</span>
            <span>3D DIGITAL EXPERIENCES</span>
            <span className="text-[#B6FF3B] font-bold">&bull;</span>
          </div>
        </div>

        {/* Futuristic High-Tech Progress Bar */}
        <div className="w-full max-w-xs space-y-3">
          {/* Percentage Counter & Equalizer */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-1 text-zinc-400">
              <Terminal className="w-3.5 h-3.5 text-[#B6FF3B]" />
              <span className="text-[10px] tracking-wider text-zinc-400">BOOT PROTOCOL</span>
            </div>

            {/* Equalizer Waveform Bars */}
            <div className="flex items-end space-x-0.5 h-3.5 px-2">
              {[40, 80, 50, 100, 70, 90, 60, 95].map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-[#B6FF3B] rounded-full transition-all duration-150"
                  style={{
                    height: `${(h * progress) / 100}%`,
                    opacity: 0.4 + (i % 3) * 0.25,
                  }}
                />
              ))}
            </div>

            <span className="text-sm font-extrabold font-mono text-[#B6FF3B] tracking-wider">
              {progress < 10 ? `0${progress}` : progress}%
            </span>
          </div>

          {/* Segmented Neon Glowing Progress Bar */}
          <div className="relative w-full h-2 bg-black/80 rounded-full border border-white/10 overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#98E61C] via-[#B6FF3B] to-[#38BDF8] rounded-full transition-all duration-75 relative shadow-[0_0_14px_rgba(182,255,59,0.7)]"
              style={{ width: `${progress}%` }}
            >
              {/* Traveling Glint Line */}
              <div className="absolute top-0 right-0 bottom-0 w-3 bg-white/80 blur-xs rounded-full" />
            </div>
          </div>

          {/* Dynamic Technical Status Readout */}
          <p className="text-[10px] font-mono text-zinc-400 tracking-wider truncate h-4">
            {statusText}
          </p>
        </div>
      </div>
    </div>
  );
}
