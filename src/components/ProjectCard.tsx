"use client";

import React from "react";
import { Project } from "@/types/project";
import { ArrowUpRight, Play, Eye, Sparkles, ExternalLink, ShieldAlert } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const getBadgeStyle = () => {
    switch (project.previewMode) {
      case "iframe":
        return {
          bg: "bg-[#18231C]",
          text: "text-[#B6FF3B]",
          border: "border-[#B6FF3B]/30",
          label: "● LIVE IFRAME",
        };
      case "custom":
        return {
          bg: "bg-[#1A2616]",
          text: "text-[#B6FF3B]",
          border: "border-[#B6FF3B]/40",
          label: "★ INTERACTIVE DEMO",
        };
      case "video":
        return {
          bg: "bg-[#271216]",
          text: "text-[#F43F5E]",
          border: "border-[#F43F5E]/30",
          label: "▶ MOTION REEL",
        };
      case "thumbnail":
        return {
          bg: "bg-[#251C14]",
          text: "text-[#F59E0B]",
          border: "border-[#F59E0B]/30",
          label: "🛡️ GALLERY / FALLBACK",
        };
      case "external":
      default:
        return {
          bg: "bg-[#141C24]",
          text: "text-[#38BDF8]",
          border: "border-[#38BDF8]/30",
          label: "↗ EXTERNAL",
        };
    }
  };

  const badge = getBadgeStyle();

  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative flex flex-col rounded-2xl bg-[#0D120F] border border-white/10 overflow-hidden cursor-pointer transition-all duration-400 hover:border-[#B6FF3B]/50 hover:shadow-[0_0_35px_rgba(182,255,59,0.18)] hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#B6FF3B]"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      role="button"
      aria-label={`View project ${project.title}`}
    >
      {/* Thumbnail Banner with Hover Zoom */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070908] border-b border-white/5">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D120F] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Preview Mode Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span
            className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${badge.bg} ${badge.text} ${badge.border}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Hover Action Circle */}
        <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#B6FF3B] group-hover:text-black group-hover:scale-110 group-hover:border-[#B6FF3B]">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div>
          {/* Category & Year */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span className="text-[#B6FF3B] font-semibold">{project.category}</span>
            <span className="text-zinc-500">{project.year}</span>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#B6FF3B] transition-colors flex items-center justify-between">
            <span>{project.title}</span>
          </h3>
          <p className="text-xs font-mono text-zinc-400 mt-0.5">{project.subtitle}</p>

          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed mt-3 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech Stack & Action Footer */}
        <div className="pt-2 border-t border-white/5 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131915] text-zinc-300 border border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/50 text-zinc-500">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-1 text-xs font-mono">
            <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
              {project.previewMode === "iframe"
                ? "Interactive In-Portfolio Preview"
                : project.previewMode === "custom"
                ? "Live WebGL / Canvas Demo"
                : project.previewMode === "video"
                ? "Motion Reel Inspection"
                : "Presentation & Specs"}
            </span>
            <span className="text-[#B6FF3B] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
              <span>View</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
