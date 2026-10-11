"use client";

import React, { useState } from "react";
import { Project } from "@/types/project";
import { ShieldAlert, ExternalLink, Image as ImageIcon, CheckCircle2, ChevronRight } from "lucide-react";

interface ThumbnailRendererProps {
  project: Project;
}

export default function ThumbnailRenderer({ project }: ThumbnailRendererProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const images = project.gallery && project.gallery.length > 0
    ? [project.thumbnail, ...project.gallery]
    : [project.thumbnail];

  return (
    <div className="w-full h-full overflow-y-auto bg-[#070908] p-6 lg:p-10 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-6">
        {/* Clear Security & Fallback Banner */}
        <div className="p-4 rounded-xl bg-[#171212] border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                  LIVE PREVIEW UNAVAILABLE
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                  CSP / X-FRAME-OPTIONS RESTRICTION
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                This project enforces strict frame security policies. High-resolution presentation mode is active.
              </p>
            </div>
          </div>

          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#B6FF3B] text-black font-semibold text-xs font-mono inline-flex items-center space-x-2 hover:bg-[#c6fb69] transition-all whitespace-nowrap shadow-md shadow-[#B6FF3B]/10"
            >
              <span>OPEN LIVE WEBSITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Presentation Showcase Screen */}
        <div className="rounded-2xl border border-white/10 bg-[#0E1210] overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#111713]">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-[#B6FF3B]" />
              <span className="text-xs font-mono text-white font-semibold">
                PRESENTATION GALLERY · SCREEN {activeSlide + 1} OF {images.length}
              </span>
            </div>
            <div className="flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeSlide === idx ? "bg-[#B6FF3B] scale-125" : "bg-zinc-600 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Main Visual Display */}
          <div className="relative aspect-[16/10] bg-[#0A0D0B] flex items-center justify-center p-4">
            <img
              src={images[activeSlide]}
              alt={`${project.title} slide ${activeSlide + 1}`}
              className="max-h-full max-w-full object-contain rounded-lg border border-white/5"
            />
          </div>
        </div>

        {/* Detailed Specs & Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-[#0E1210] border border-white/10 space-y-4">
            <h4 className="text-sm font-mono text-[#B6FF3B] uppercase tracking-wider">PROJECT BLUEPRINT</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">{project.longDescription}</p>

            <div className="pt-2">
              <span className="text-xs font-mono text-zinc-500 uppercase">ROLE & RESPONSIBILITY</span>
              <p className="text-xs font-mono text-white mt-1">{project.role}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E1210] border border-white/10 space-y-4">
            <h4 className="text-sm font-mono text-[#B6FF3B] uppercase tracking-wider">KEY DELIVERABLES</h4>
            <ul className="space-y-2.5">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#B6FF3B] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
