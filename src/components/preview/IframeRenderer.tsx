"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { Loader2, AlertCircle, ExternalLink, RefreshCw } from "lucide-react";

interface IframeRendererProps {
  project: Project;
  deviceView: "desktop" | "tablet" | "mobile";
}

export default function IframeRenderer({ project, deviceView }: IframeRendererProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    // Timeout safety if iframe fails to emit load within 8s
    const timer = setTimeout(() => {
      // Don't flag error if it's internal demo
      if (project.demoPath.startsWith("/demos/")) {
        setIsLoading(false);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [project, iframeKey]);

  const handleReload = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1);
  };

  const getDeviceWidth = () => {
    switch (deviceView) {
      case "mobile":
        return "max-w-[390px]";
      case "tablet":
        return "max-w-[768px]";
      case "desktop":
      default:
        return "w-full";
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#070908] overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#080A09]/90 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-[#B6FF3B]/20 border-t-[#B6FF3B] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B6FF3B] animate-ping" />
            </div>
          </div>
          <p className="mt-4 text-xs font-mono text-[#B6FF3B] tracking-widest uppercase">
            LOADING LIVE ENVIRONMENT...
          </p>
          <span className="text-[11px] font-mono text-zinc-500 mt-1">
            Establishing interactive iframe session for {project.title}
          </span>
        </div>
      )}

      {/* Blocked or Load Error State */}
      {hasError ? (
        <div className="p-8 max-w-md text-center bg-[#0D120F] border border-red-500/30 rounded-2xl">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white mb-2">Live Preview Header Restriction</h4>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            This external endpoint enforces strict <code className="text-red-300">X-Frame-Options: SAMEORIGIN</code> security headers preventing inline framing.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleReload}
              className="px-4 py-2 rounded-lg border border-white/20 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/40 flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RETRY</span>
            </button>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#B6FF3B] text-black font-semibold text-xs font-mono flex items-center space-x-1.5 hover:bg-[#cbfb70]"
            >
              <span>OPEN LIVE SITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ) : (
        <div
          className={`h-full transition-all duration-300 flex items-center justify-center ${getDeviceWidth()} ${
            deviceView !== "desktop" ? "py-4 px-2" : ""
          }`}
        >
          <div
            className={`w-full h-full relative ${
              deviceView !== "desktop"
                ? "border-2 border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 ring-1 ring-white/10"
                : ""
            }`}
          >
            <iframe
              key={iframeKey}
              src={project.demoPath}
              title={`Live Preview of ${project.title}`}
              className="w-full h-full border-0 bg-[#080A09]"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
