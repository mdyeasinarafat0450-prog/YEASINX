"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface CyberNebulaOrb {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

export default function GlobalCyberParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user's reduced motion settings
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Mouse tracking with smooth spring interpolation
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      active: false,
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Scroll velocity tracking for parallax drift
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Particle Palette (matching the 3D Workstation Scene: Electric Lime, Cyber Cyan, Emerald)
    const particleColors = [
      { fill: "rgba(182, 255, 59, ", glow: "#B6FF3B" }, // 50% Signature Neon Green
      { fill: "rgba(182, 255, 59, ", glow: "#B6FF3B" },
      { fill: "rgba(56, 189, 248, ", glow: "#38BDF8" }, // 25% Cyber Cyan
      { fill: "rgba(16, 185, 129, ", glow: "#10B981" }, // 15% Matrix Emerald
      { fill: "rgba(255, 255, 255, ", glow: "#FFFFFF" }, // 10% Bright Starlight
    ];

    // Determine particle count based on screen width
    const particleCount = Math.min(Math.floor((width * height) / 11000), 160);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorScheme =
        particleColors[Math.floor(Math.random() * particleColors.length)];
      const baseSize = Math.random() * 2.2 + 0.8;
      const baseAlpha = Math.random() * 0.5 + 0.25;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: baseSize,
        baseSize,
        color: colorScheme.fill,
        glowColor: colorScheme.glow,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Ambient Nebula Orbs floating in background
    const nebulaOrbs: CyberNebulaOrb[] = [
      {
        x: width * 0.2,
        y: height * 0.3,
        radius: 350,
        color: "rgba(182, 255, 59, 0.035)",
        vx: 0.15,
        vy: 0.1,
      },
      {
        x: width * 0.8,
        y: height * 0.7,
        radius: 400,
        color: "rgba(56, 189, 248, 0.03)",
        vx: -0.12,
        vy: -0.15,
      },
      {
        x: width * 0.5,
        y: height * 0.5,
        radius: 300,
        color: "rgba(16, 185, 129, 0.025)",
        vx: 0.08,
        vy: -0.1,
      },
    ];

    let time = 0;

    // Main Canvas Render Loop
    const render = () => {
      time += 0.016;

      // Smooth mouse spring
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Damp scroll velocity
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Subtle Ambient Cyber Nebula Glow Pools
      nebulaOrbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Constellation Interconnecting Lines between close particles
      const maxConnectDist = 115;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.16 * p1.alpha;
            ctx.strokeStyle = `rgba(182, 255, 59, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Update & Draw Floating Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wave oscillation + velocity + scroll parallax
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.2;
        p.size = p.baseSize + Math.sin(p.pulsePhase * 0.8) * 0.4;

        p.x += p.vx + Math.cos(time + i) * 0.15;
        p.y += p.vy + Math.sin(time + i * 0.5) * 0.15 - scrollVelocity * 0.4;

        // Interactive Mouse repulsion / deflection
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius && mdist > 0) {
            const force = (mouse.radius - mdist) / mouse.radius;
            p.x += (mdx / mdist) * force * 3.5;
            p.y += (mdy / mdist) * force * 3.5;
            p.alpha = Math.min(p.alpha + force * 0.4, 0.95);
          }
        }

        // Screen boundary wrapping
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Outer glow halo for prominent particles
        if (p.size > 1.8) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.glowColor;
        } else {
          ctx.shadowBlur = 0;
        }

        // Draw particle dot
        ctx.fillStyle = `${p.color}${Math.max(0.05, p.alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.size), 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset shadow blur
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 transition-opacity duration-1000"
      />
    </div>
  );
}
