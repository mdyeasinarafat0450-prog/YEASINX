"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Project } from "@/types/project";
import {
  X,
  Maximize2,
  Minimize2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Tablet,
  Smartphone,
  Lock,
  ArrowLeft,
  RefreshCw,
  Share2,
} from "lucide-react";
import IframeRenderer from "./preview/IframeRenderer";
import ThumbnailRenderer from "./preview/ThumbnailRenderer";
import VideoRenderer from "./preview/VideoRenderer";
import CustomRenderer from "./preview/CustomRenderer";

interface ProjectPreviewModalProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

export default function ProjectPreviewModal({
  project,
  allProjects,
  isOpen,
  onClose,
  onNavigate,
}: ProjectPreviewModalProps) {
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Preserve scroll position when opening/closing
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll"; // avoid layout jump
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

  // Fullscreen API Handling
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      console.warn("Fullscreen API fallback active:", err);
      // graceful state fallback
      setIsFullscreen((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Project navigation indices
  const currentIndex = project ? allProjects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const handlePrev = useCallback(() => {
    if (prevProject) onNavigate(prevProject);
  }, [prevProject, onNavigate]);

  const handleNext = useCallback(() => {
    if (nextProject) onNavigate(nextProject);
  }, [nextProject, onNavigate]);

  // Keyboard navigation & accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key.toLowerCase() === "f" && !e.metaKey && !e.ctrlKey) {
        // Toggle fullscreen
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  const handleCopyLink = () => {
    if (!project) return;
    const url = window.location.origin + project.demoPath;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Interactive preview of ${project.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 transition-all duration-300"
    >
      {/* Browser Window Wrapper */}
      <div
        ref={containerRef}
        className={`w-full flex flex-col bg-[#0A0D0B] border border-white/15 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-0 rounded-none border-none h-screen"
            : "max-w-7xl h-[92vh] max-h-[1000px]"
        }`}
      >
        {/* Browser Top Navigation Bar */}
        <div className="bg-[#101512] border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0 gap-3">
          {/* Left Controls & Back to Portfolio */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              id="back-to-portfolio-btn"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all border border-white/10"
              title="Close Preview and Back to Portfolio (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#B6FF3B]" />
              <span className="hidden sm:inline">BACK TO PORTFOLIO</span>
            </button>

            {/* Window Traffic Lights */}
            <div className="hidden md:flex items-center space-x-1.5 pl-2">
              <span
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer transition-colors"
                title="Close"
              />
              <span
                onClick={toggleFullscreen}
                className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer transition-colors"
                title="Full Screen"
              />
              <span
                onClick={() => setDeviceView(deviceView === "desktop" ? "tablet" : "desktop")}
                className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer transition-colors"
                title="Toggle Viewport"
              />
            </div>
          </div>

          {/* Center Simulated URL / Address Bar */}
          <div className="flex-1 max-w-xl mx-auto flex items-center bg-[#070A09] border border-white/10 rounded-full px-3.5 py-1.5 text-xs font-mono text-zinc-300 shadow-inner">
            <Lock className="w-3.5 h-3.5 text-[#B6FF3B] shrink-0 mr-2" />
            <span className="text-zinc-500 select-none hidden sm:inline">https://</span>
            <span className="text-white font-semibold truncate">
              nexora.dev{project.demoPath.startsWith("/") ? project.demoPath : `/${project.slug}`}
            </span>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[#18231C] text-[#B6FF3B] font-bold border border-[#B6FF3B]/30 uppercase tracking-wider shrink-0 ml-2">
              {project.previewMode}
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Device Switcher (only for iframe) */}
            {project.previewMode === "iframe" && (
              <div className="hidden lg:flex items-center bg-[#080A09] p-1 rounded-lg border border-white/10 mr-1">
                <button
                  onClick={() => setDeviceView("desktop")}
                  className={`p-1 rounded transition-colors ${
                    deviceView === "desktop" ? "bg-[#B6FF3B] text-black" : "text-zinc-400 hover:text-white"
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeviceView("tablet")}
                  className={`p-1 rounded transition-colors ${
                    deviceView === "tablet" ? "bg-[#B6FF3B] text-black" : "text-zinc-400 hover:text-white"
                  }`}
                  title="Tablet View"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeviceView("mobile")}
                  className={`p-1 rounded transition-colors ${
                    deviceView === "mobile" ? "bg-[#B6FF3B] text-black" : "text-zinc-400 hover:text-white"
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Prev / Next Navigation */}
            <div className="flex items-center space-x-1 bg-[#080A09] p-0.5 rounded-lg border border-white/10">
              <button
                onClick={handlePrev}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title={`Previous Project: ${prevProject.title} (Left Arrow)`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title={`Next Project: ${nextProject.title} (Right Arrow)`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              id="preview-fullscreen-btn"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-[#B6FF3B] hover:text-black text-zinc-300 transition-colors border border-white/10"
              title={isFullscreen ? "Exit Full Screen" : "Full Screen Mode"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Open Live Website External Button */}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="preview-open-external-btn"
                className="px-3 py-1.5 rounded-lg bg-[#B6FF3B] text-black font-semibold text-xs font-mono hover:bg-[#c9ff6a] transition-all flex items-center space-x-1.5 shadow-sm"
                title="Open in New Window"
              >
                <span className="hidden sm:inline">OPEN LIVE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              id="preview-close-btn"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-zinc-300 transition-colors"
              title="Close Preview (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Project Preview Viewport Container */}
        <div className="flex-1 w-full bg-[#080A09] relative overflow-hidden flex flex-col">
          {project.previewMode === "iframe" && (
            <IframeRenderer project={project} deviceView={deviceView} />
          )}

          {project.previewMode === "thumbnail" && (
            <ThumbnailRenderer project={project} />
          )}

          {project.previewMode === "video" && (
            <VideoRenderer project={project} />
          )}

          {project.previewMode === "custom" && (
            <CustomRenderer project={project} />
          )}

          {project.previewMode === "external" && (
            <ThumbnailRenderer project={project} />
          )}
        </div>

        {/* Bottom Footer Info Strip */}
        <div className="bg-[#0B0E0C] border-t border-white/10 px-4 py-2.5 flex items-center justify-between text-xs font-mono text-zinc-400 shrink-0">
          <div className="flex items-center space-x-3 truncate">
            <span className="text-white font-bold">{project.title}</span>
            <span className="text-zinc-500 hidden sm:inline">|</span>
            <span className="text-zinc-400 hidden sm:inline">{project.subtitle}</span>
            <span className="text-zinc-500 hidden md:inline">|</span>
            <span className="text-[#B6FF3B] hidden md:inline">{project.category}</span>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <button
              onClick={handleCopyLink}
              className="text-zinc-400 hover:text-[#B6FF3B] transition-colors flex items-center space-x-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedUrl ? "COPIED!" : "SHARE"}</span>
            </button>
            <span className="text-zinc-600 hidden sm:inline">
              ESC: CLOSE · ← / →: SWITCH PROJECT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
