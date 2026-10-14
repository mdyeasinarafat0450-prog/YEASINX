"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GlobalCyberParticles from "@/components/GlobalCyberParticles";
import LogoLoader from "@/components/LogoLoader";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#080A09] text-white selection:bg-[#B6FF3B] selection:text-black overflow-x-hidden">
        {/* Intro Logo Preloader with Futuristic Cyber Animation */}
        <LogoLoader />

      {/* Global Ambient Cyber Particles Across Full Website */}
      <GlobalCyberParticles />

      {/* Custom Trailing Glow Cursor for Desktop */}
      <CustomCursor />

      {/* Top Fixed Header with Floating Glass Aesthetics */}
      <Navbar />

      {/* Hero Section with Split Layout & Interactive 3D Coder Character */}
      <Hero />

      {/* Portfolio Section — Interactive Works with In-Browser Live Previews */}
      <Portfolio />

      {/* Experience & Process Workflow (Discover -> Design -> Develop -> Launch) */}
      <Process />

      {/* Editorial About Section */}
      <About />

      {/* Technical Stack & Skills */}
      <Skills />

      {/* Contact Section & Validated Form */}
      <Contact />

      {/* Footer with Telemetry Status */}
      <Footer />
    </main>
  </SmoothScroll>
  );
}
