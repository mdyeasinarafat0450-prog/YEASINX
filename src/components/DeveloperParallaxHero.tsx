"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Sparkles,
  Layers,
  Eye,
  RefreshCw,
  Box,
  ShieldCheck,
  Cuboid,
  Image as ImageIcon,
} from "lucide-react";
import { heroAssetsConfig } from "@/config/hero-assets";
import Developer3DScene from "./Developer3DScene";

export default function DeveloperParallaxHero() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // View Mode: "3d" (Real GLB Model) vs "2d" (Parallax Image Card)
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");

  // Interaction States
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [wireframeError, setWireframeError] = useState<boolean>(false);
  const [viewFraming, setViewFraming] = useState<"workstation" | "full">("workstation");
  const [scrollYOffset, setScrollYOffset] = useState<number>(0);

  // Smooth scroll parallax inertia for 3D character card
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 900) {
            setScrollYOffset(scrollY * 0.12);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // RAF smoothing values for mouse parallax (used in 2D mode)
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const checkMedia = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 768;
      setIsMobile(isCoarse || isSmall);

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPrefersReducedMotion(reducedMotion);
    };

    checkMedia();
    window.addEventListener("resize", checkMedia);
    return () => window.removeEventListener("resize", checkMedia);
  }, []);

  // Smooth linear interpolation loop for physics-based spring feel (2D mode only)
  useEffect(() => {
    if (viewMode === "3d" || isMobile || prefersReducedMotion) return;

    const smoothMotionLoop = () => {
      const { targetX, targetY } = mousePos.current;
      mousePos.current.x += (targetX - mousePos.current.x) * 0.08;
      mousePos.current.y += (targetY - mousePos.current.y) * 0.08;

      // Max tilt: 6 degrees on X, 8 degrees on Y
      setRotateX(-mousePos.current.y * 6);
      setRotateY(mousePos.current.x * 8);

      animationFrameId.current = requestAnimationFrame(smoothMotionLoop);
    };

    animationFrameId.current = requestAnimationFrame(smoothMotionLoop);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [viewMode, isMobile, prefersReducedMotion]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (viewMode === "3d" || isMobile || prefersReducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      mousePos.current.targetX = Math.max(-1, Math.min(1, x));
      mousePos.current.targetY = Math.max(-1, Math.min(1, y));

      const percentX = ((e.clientX - rect.left) / rect.width) * 100;
      const percentY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePos({ x: percentX, y: percentY, opacity: 0.22 });
    },
    [viewMode, isMobile, prefersReducedMotion]
  );

  const handleMouseEnter = () => {
    if (viewMode === "3d" || isMobile || prefersReducedMotion) return;
    setIsHovered(true);
    if (!wireframeError) {
      setIsWireframe(true);
    }
  };

  const handleMouseLeave = () => {
    if (viewMode === "3d" || isMobile || prefersReducedMotion) return;
    setIsHovered(false);
    setIsWireframe(false);
    mousePos.current.targetX = 0;
    mousePos.current.targetY = 0;
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Toggle wireframe on mobile tap or manual button click
  const handleToggleWireframe = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (wireframeError) return;
    setIsWireframe((prev) => !prev);
  };

  const handleToggleFraming = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewFraming((prev) => (prev === "workstation" ? "full" : "workstation"));
  };

  // Pick active image paths based on framing view mode
  const currentMainSrc =
    viewFraming === "workstation"
      ? heroAssetsConfig.mainImage.workstationSrc
      : heroAssetsConfig.mainImage.src;

  const currentWireframeSrc =
    viewFraming === "workstation"
      ? heroAssetsConfig.wireframeImage.workstationSrc
      : heroAssetsConfig.wireframeImage.src;

  return (
    <div
      className="relative w-full max-w-[590px] mx-auto select-none transition-transform duration-100 ease-out"
      style={{
        perspective: "1200px",
        transform: `translateY(${scrollYOffset}px)`,
      }}
    >
      {/* 3D Transform Stage Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (viewMode === "2d" && isMobile) setIsWireframe((prev) => !prev);
        }}
        className={`relative w-full aspect-[4/3] rounded-2xl transition-transform duration-200 ease-out group ${
          viewMode === "2d" && isMobile && !prefersReducedMotion ? "animate-pulse-subtle" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform:
            viewMode === "2d" && !isMobile && !prefersReducedMotion
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
              : "none",
        }}
      >
        {/* ============================================================== */}
        {/* LAYER 0: Ambient Backlight Glow Pools (Deepest z: -25px)       */}
        {/* ============================================================== */}
        <div
          className="absolute -inset-4 rounded-3xl pointer-events-none transition-all duration-700 blur-2xl"
          style={{
            transform: "translateZ(-25px)",
            background: isWireframe
              ? "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.12) 0%, rgba(182, 255, 59, 0.22) 45%, transparent 70%)"
              : "radial-gradient(circle at 50% 50%, rgba(182, 255, 59, 0.26) 0%, rgba(56, 189, 248, 0.10) 50%, transparent 70%)",
            opacity: isHovered || isWireframe ? 1 : 0.7,
          }}
        />

        {/* ============================================================== */}
        {/* MAIN STAGE CONTENT: 3D GLB CANVAS vs 2D EDITORIAL IMAGE        */}
        {/* ============================================================== */}
        <div
          className={`absolute inset-0 rounded-2xl bg-[#090D0B] border transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden ${
            isWireframe
              ? "border-[#B6FF3B]/50 shadow-[0_0_35px_rgba(182,255,59,0.25)]"
              : "border-white/10"
          }`}
          style={{ transform: "translateZ(0px)" }}
        >
          {viewMode === "3d" ? (
            /* 1. Real-Time 3D WebGL GLTF Scene */
            <Developer3DScene
              isWireframe={isWireframe}
              onToggleWireframe={setIsWireframe}
              showOverlayControls={true}
              className="w-full h-full"
            />
          ) : (
            /* 2. 2D Parallax Image Card Fallback */
            <>
              {/* Primary Full-Color Coder Scene (Image A) */}
              <div
                className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
                style={{ opacity: isWireframe ? 0 : 1 }}
              >
                <Image
                  src={currentMainSrc}
                  alt={heroAssetsConfig.mainImage.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 590px"
                  className="object-cover object-center scale-[1.03] transition-transform duration-700 ease-out"
                  style={{
                    transform:
                      !isMobile && !prefersReducedMotion
                        ? `translateX(${-rotateY * 0.7}px) translateY(${-rotateX * 0.7}px) scale(1.04)`
                        : "scale(1.02)",
                  }}
                />
              </div>

              {/* Wireframe Overlay Scene (Image B) */}
              <div
                className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out pointer-events-none"
                style={{ opacity: isWireframe && !wireframeError ? 1 : 0 }}
              >
                <Image
                  src={currentWireframeSrc}
                  alt={heroAssetsConfig.wireframeImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 590px"
                  onError={() => setWireframeError(true)}
                  className="object-cover object-center scale-[1.03] transition-transform duration-700 ease-out"
                  style={{
                    transform:
                      !isMobile && !prefersReducedMotion
                        ? `translateX(${-rotateY * 0.7}px) translateY(${-rotateX * 0.7}px) scale(1.04)`
                        : "scale(1.02)",
                  }}
                />
              </div>

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A09] via-transparent to-[#080A09]/30 pointer-events-none opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080A09]/40 via-transparent to-[#080A09]/30 pointer-events-none" />

              {/* Interactive Glare Sheen */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(182, 255, 59, 0.22) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 60%)`,
                  opacity: glarePos.opacity,
                }}
              />

              {/* Top-Left Status Tag for 2D View */}
              <div
                className={`absolute top-4 left-4 z-20 flex items-center space-x-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border text-xs font-mono shadow-lg transition-all duration-300 ${
                  isWireframe
                    ? "bg-[#111A13]/90 border-[#B6FF3B] text-[#B6FF3B] shadow-[0_0_20px_rgba(182,255,59,0.35)]"
                    : "bg-[#0D1410]/85 border-[#B6FF3B]/30 text-white"
                }`}
              >
                {isWireframe ? (
                  <>
                    <Box className="w-3.5 h-3.5 text-[#B6FF3B] animate-spin" style={{ animationDuration: "6s" }} />
                    <span className="font-bold tracking-wider text-[11px] text-[#B6FF3B]">
                      VISUALIZING THE BUILD // WIREFRAME
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#B6FF3B] animate-ping" />
                    <span className="font-bold tracking-wider text-[11px]">NEXORA // WORKSTATION</span>
                  </>
                )}
              </div>

              {/* Top-Right 2D Controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
                <button
                  onClick={handleToggleWireframe}
                  className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-[10px] font-mono transition-all flex items-center space-x-1.5 cursor-pointer ${
                    isWireframe
                      ? "bg-[#B6FF3B] text-black font-extrabold border-[#B6FF3B] shadow-[0_0_15px_rgba(182,255,59,0.4)]"
                      : "bg-black/70 text-zinc-300 border-white/15 hover:border-[#B6FF3B] hover:text-[#B6FF3B]"
                  }`}
                  title="Toggle Wireframe View"
                >
                  <Layers className="w-3 h-3" />
                  <span>{isWireframe ? "WIREFRAME ON" : "WIREFRAME"}</span>
                </button>

                <button
                  onClick={handleToggleFraming}
                  className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title={viewFraming === "workstation" ? "Switch to Full Sheet" : "Switch to Focused View"}
                >
                  <RefreshCw className="w-2.5 h-2.5 text-[#B6FF3B]" />
                  <span>{viewFraming === "workstation" ? "WORKSTATION" : "FULL SHEET"}</span>
                </button>
              </div>

              {/* Bottom-Left 2D Specs Chip */}
              <div className="absolute bottom-5 left-5 z-20 p-3 rounded-xl bg-[#090D0A]/90 backdrop-blur-md border border-white/10 shadow-2xl max-w-[240px] hidden sm:block">
                {isWireframe ? (
                  <div className="font-mono text-[10px] text-zinc-300 space-y-0.5">
                    <div className="text-[#B6FF3B] font-bold">MESH TOPOLOGY</div>
                    <p className="text-zinc-400">VERTICES: 28,432 &bull; TRIS: 51,276</p>
                    <p className="text-zinc-500">TEXTURES: 4K PBR &bull; CLEAN TOPO</p>
                  </div>
                ) : (
                  <div className="font-mono text-[10px] text-zinc-300 space-y-0.5">
                    <div className="text-white font-bold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B6FF3B]" />
                      <span>NEXORA DEV ENVIRONMENT</span>
                    </div>
                    <p className="text-zinc-400">DUAL MONITORS &bull; NEON-GREEN ACCENT</p>
                    <p className="text-[#B6FF3B]">BETTER CODE &bull; BETTER TOMORROW</p>
                  </div>
                )}
              </div>

              {/* Bottom-Right 2D State Indicator */}
              <div className="absolute bottom-5 right-5 z-20 flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono shadow-2xl text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B6FF3B] animate-pulse" />
                <span>{isWireframe ? "TOPOLOGY SHOWN" : isMobile ? "TAP FOR WIREFRAME" : "HOVER FOR WIREFRAME"}</span>
              </div>
            </>
          )}

          {/* Neon Green Bottom Deskline Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B6FF3B] to-transparent opacity-70 shadow-[0_0_15px_#B6FF3B]" />
        </div>
      </div>

      {/* Mode Switcher & Telemetry Bar below the stage */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-zinc-400 px-2 gap-2">
        <div className="flex items-center space-x-2">
          {/* 3D vs 2D View Switcher Pill */}
          <div className="inline-flex rounded-full bg-black/70 p-0.5 border border-white/15">
            <button
              onClick={() => setViewMode("3d")}
              className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === "3d"
                  ? "bg-[#B6FF3B] text-black shadow-[0_0_12px_rgba(182,255,59,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Cuboid className="w-3 h-3" />
              <span>3D LIVE</span>
            </button>
            <button
              onClick={() => setViewMode("2d")}
              className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === "2d"
                  ? "bg-[#B6FF3B] text-black shadow-[0_0_12px_rgba(182,255,59,0.4)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>PHOTO</span>
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center space-x-1.5 text-zinc-500">
            <span>&bull;</span>
            <span className="text-zinc-400">144 MESHES &bull; 51,276 TRIS</span>
          </span>
        </div>

        <span className="text-zinc-500 text-[10px] hidden sm:inline">
          {viewMode === "3d"
            ? "CLICK & DRAG TO ORBIT 360°"
            : isMobile
            ? "TAP TO TOGGLE WIREFRAME"
            : "HOVER FOR WIREFRAME"}
        </span>
      </div>
    </div>
  );
}
