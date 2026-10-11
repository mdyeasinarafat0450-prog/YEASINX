"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Terminal, Shield, Sparkles } from "lucide-react";

export default function Footer() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#060807] px-6 py-12 text-zinc-500 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Mission */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
          <div className="flex items-center space-x-2 text-white font-bold">
            <span className="w-2 h-2 rounded-sm bg-[#B6FF3B]" />
            <span>NEON//FRAME</span>
          </div>
          <span className="hidden sm:inline text-zinc-700">/</span>
          <span className="text-zinc-400">CREATIVE DEVELOPER &amp; MOTION DESIGNER</span>
        </div>

        {/* Real-time Clock & System Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400">SYSTEM NOMINAL</span>
          </div>

          <div className="flex items-center space-x-1.5 text-zinc-400">
            <span className="text-zinc-600">UTC CLOCK:</span>
            <span className="text-white font-bold">{localTime || "--:--:--"}</span>
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#B6FF3B] hover:text-black transition-all border border-white/10 text-zinc-300"
          title="Return to Top"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600 gap-2">
        <p>© 2025 NEON//FRAME. ALL EXPERIENCES ENGINEERED WITH INTEGRITY.</p>
        <p className="text-zinc-500">PRODUCTION BUILD READY · VERCEL DEPLOYMENT</p>
      </div>
    </footer>
  );
}
