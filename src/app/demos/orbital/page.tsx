"use client";

import React, { useState } from "react";
import { Radio, Satellite, Globe, Cpu, Zap, Sliders, Shield, ArrowRight } from "lucide-react";

export default function OrbitalDemoPage() {
  const [altitudeKm, setAltitudeKm] = useState(550);
  const [activeSubsystem, setActiveSubsystem] = useState("phased-array");
  const [encryptionLocked, setEncryptionLocked] = useState(true);

  // Orbital physics calculations
  const earthRadius = 6371;
  const standardGravitationalParam = 398600.4418; // km^3/s^2
  const r = earthRadius + altitudeKm;
  const orbitalVelocity = Math.sqrt(standardGravitationalParam / r).toFixed(2); // km/s
  const orbitalPeriodMinutes = ((2 * Math.PI * Math.sqrt(Math.pow(r, 3) / standardGravitationalParam)) / 60).toFixed(1);
  const footprintKm = Math.floor(Math.sqrt(2 * earthRadius * altitudeKm + Math.pow(altitudeKm, 2)));

  const subsystems = [
    {
      id: "phased-array",
      name: "KA-BAND ACTIVE PHASED ARRAY",
      power: "120 W",
      throughput: "24.5 Gbps",
      description: "Electronically steerable multi-beam antenna capable of maintaining 12 concurrent ground stations with zero mechanical gimbal delay.",
    },
    {
      id: "star-tracker",
      name: "SUB-ARCSECOND STAR TRACKER",
      power: "14 W",
      accuracy: "0.2 arcsec",
      description: "Dual-head optical celestial navigation tracking over 40,000 reference stars at 30Hz refresh rates.",
    },
    {
      id: "ion-propulsion",
      name: "HALL-EFFECT XENON THRUSTER",
      thrust: "18 mN",
      isp: "1,650 sec",
      description: "High-efficiency electric propulsion providing station-keeping and autonomous orbital debris collision evasion.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07050E] text-[#ECE7F8] font-sans selection:bg-[#A855F7] selection:text-white pb-20">
      {/* Top Telemetry Header */}
      <header className="sticky top-0 z-30 bg-[#0B0818]/90 backdrop-blur-md border-b border-[#2B1F4A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7]">
            <Satellite className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-wider font-mono text-white">ORBITAL-X</span>
            <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded bg-[#3B1A66] text-[#D8B4FE] font-mono border border-[#A855F7]/30">
              LEO CONSTEL-9
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          <span className="hidden sm:inline-flex items-center space-x-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>CARRIER LOCK: OK</span>
          </span>
          <button
            onClick={() => setEncryptionLocked(!encryptionLocked)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center space-x-1.5 ${
              encryptionLocked
                ? "bg-[#251540] border-[#A855F7]/50 text-[#D8B4FE]"
                : "bg-red-500/20 border-red-500/50 text-red-300"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{encryptionLocked ? "QKD ENCRYPTED" : "TEST MODE"}</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-12 pb-10 max-w-6xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1230] border border-[#A855F7]/30 text-[#D8B4FE] font-mono text-xs mb-6">
          <Radio className="w-3.5 h-3.5 text-[#B6FF3B]" />
          <span>DEEP-SPACE OPTICAL &amp; KA-BAND PLATFORM</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
          AUTONOMOUS SATELLITE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-[#A855F7] to-[#B6FF3B]">
            TELEMETRY &amp; CONTROL
          </span>
        </h1>

        <p className="text-base sm:text-lg text-purple-200/70 max-w-2xl leading-relaxed">
          The next-generation distributed orbital operating system. Real-time inter-satellite laser mesh networking with deterministic microsecond guarantees.
        </p>
      </section>

      {/* Interactive Orbit Mechanics Calculator */}
      <section className="px-6 py-8 max-w-6xl mx-auto">
        <div className="p-6 rounded-2xl bg-[#110D24] border border-[#2B1F4A]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-[#A855F7]" />
                <span>INTERACTIVE FLIGHT TRAJECTORY COMPUTATION</span>
              </h2>
              <p className="text-xs font-mono text-purple-300/60 mt-1">
                Dynamically adjust orbital altitude to recalculate Keplerian orbital mechanics.
              </p>
            </div>
            <div className="text-sm font-mono text-[#B6FF3B] bg-[#1E143B] px-3 py-1.5 rounded-lg border border-[#A855F7]/30">
              ALTITUDE: {altitudeKm} KM LEO
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2 mb-8">
            <input
              type="range"
              min="300"
              max="1200"
              step="10"
              value={altitudeKm}
              onChange={(e) => setAltitudeKm(Number(e.target.value))}
              className="w-full accent-[#A855F7] cursor-pointer bg-[#241744] h-2 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-purple-300/50">
              <span>300 km (VLEO)</span>
              <span>550 km (STANDARD STARLINK ALTITUDE)</span>
              <span>1,200 km (HIGH LEO)</span>
            </div>
          </div>

          {/* Computed Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#181135] border border-[#2E2052]">
              <span className="text-xs font-mono text-purple-300/60">ORBITAL VELOCITY</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">{orbitalVelocity} km/s</div>
              <span className="text-[11px] font-mono text-[#B6FF3B]">{Math.round(Number(orbitalVelocity) * 3600)} km/h</span>
            </div>

            <div className="p-4 rounded-xl bg-[#181135] border border-[#2E2052]">
              <span className="text-xs font-mono text-purple-300/60">ORBITAL REVOLUTION</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">{orbitalPeriodMinutes} min</div>
              <span className="text-[11px] font-mono text-purple-300/60">{(1440 / Number(orbitalPeriodMinutes)).toFixed(1)} orbits / 24h</span>
            </div>

            <div className="p-4 rounded-xl bg-[#181135] border border-[#2E2052]">
              <span className="text-xs font-mono text-purple-300/60">HORIZON COVERAGE FOOTPRINT</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">{footprintKm} km</div>
              <span className="text-[11px] font-mono text-[#38BDF8]">Direct Line of Sight</span>
            </div>
          </div>
        </div>
      </section>

      {/* Subsystem Hardware Modules */}
      <section className="px-6 py-8 max-w-6xl mx-auto">
        <h3 className="text-sm font-mono text-purple-300/60 uppercase tracking-widest mb-4">PAYLOAD SUBSYSTEMS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subsystems.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setActiveSubsystem(sub.id)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                activeSubsystem === sub.id
                  ? "bg-[#1E143B] border-[#A855F7] shadow-lg shadow-[#A855F7]/10"
                  : "bg-[#110D24] border-[#2B1F4A] hover:border-[#A855F7]/40"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono text-[#B6FF3B]">MODULE // ACTIVE</span>
                <span className="text-xs font-mono text-purple-300/60">PWR: {sub.power}</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">{sub.name}</h4>
              <p className="text-xs text-purple-200/70 leading-relaxed">{sub.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
