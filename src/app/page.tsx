"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#080A09] text-white selection:bg-[#B6FF3B] selection:text-black overflow-x-hidden">
      {/* Custom Trailing Glow Cursor */}
      <CustomCursor />

      {/* Top Fixed Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Portfolio Section — Main Priority */}
      <Portfolio />

      {/* Editorial About Section */}
      <About />

      {/* Technical Stack & Skills */}
      <Skills />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
