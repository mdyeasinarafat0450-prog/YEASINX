"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with fine pointer (mouse), not touch
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let targetX = -100;
    let targetY = -100;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Smooth trailing animation loop
    let animId: number;
    let curX = -100;
    let curY = -100;

    const loop = () => {
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      setTrailingPos({ x: curX, y: curY });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-[#B6FF3B] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? "8px" : "6px",
          height: isHovered ? "8px" : "6px",
          boxShadow: "0 0 10px #B6FF3B",
        }}
      />

      {/* Trailing Soft Halo */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full border border-[#B6FF3B]/50 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-200"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? "46px" : "30px",
          height: isHovered ? "46px" : "30px",
          backgroundColor: isHovered ? "rgba(182, 255, 59, 0.1)" : "transparent",
        }}
      />
    </>
  );
}
