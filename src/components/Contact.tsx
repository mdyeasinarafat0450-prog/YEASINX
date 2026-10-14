"use client";

import React, { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  Sparkles,
  Globe,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

// Inline clean SVG icons for brand profiles
const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Creative Agency Website",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Editable direct email address
  const directEmail = "contact@nexora.dev";

  const socialLinks = [
    { name: "GitHub", url: "https://github.com", icon: GithubIcon },
    { name: "LinkedIn", url: "https://linkedin.com", icon: LinkedinIcon },
    { name: "X (Twitter)", url: "https://x.com", icon: TwitterIcon },
    { name: "CodePen", url: "https://codepen.io", icon: Globe },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      errs.name = "Please provide your full name (minimum 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Please provide a brief project description (minimum 10 characters).";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build functional mailto link so message is genuinely sent via client's email client
    const subject = encodeURIComponent(`[NEXORA Inquiry] ${formData.projectType} from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nProject Scope:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${directEmail}?subject=${subject}&body=${body}`;

    // Trigger user mail client
    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-10 lg:px-14 xl:px-16 max-w-[1780px] 2xl:max-w-[1920px] mx-auto scroll-mt-20 border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[350px] bg-[#B6FF3B]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Top Tag & Section Title */}
      <ScrollReveal direction="up" delay={0.05}>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121A15] border border-[#B6FF3B]/30 text-[#B6FF3B] font-mono text-xs mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INITIATE COLLABORATION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] max-w-4xl mb-4">
          LET’S BUILD SOMETHING <br />
          <span className="text-[#B6FF3B]">EXTRAORDINARY.</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mb-14 font-sans leading-relaxed">
          Whether you have an upcoming project, need an interactive web platform, or want to discuss design systems and creative engineering, my inbox is always open.
        </p>
      </ScrollReveal>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Email & Social Profiles */}
        <div className="lg:col-span-5">
          <ScrollReveal direction="right" delay={0.1} className="space-y-8">
            {/* Email Quick-Copy Card */}
            <div className="p-6 rounded-2xl bg-[#0D120F] border border-white/10 space-y-4">
              <span className="text-xs font-mono text-[#B6FF3B] uppercase tracking-wider">DIRECT COMMUNICATION</span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#080A09] border border-white/10">
                <div className="flex items-center space-x-3 truncate">
                  <Mail className="w-4 h-4 text-[#B6FF3B] shrink-0" />
                  <span className="text-sm font-mono text-white truncate">{directEmail}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-[#B6FF3B] hover:text-black transition-colors text-zinc-300 ml-2 shrink-0"
                  title="Copy Email Address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copiedEmail && (
                <p className="text-xs font-mono text-[#B6FF3B] flex items-center space-x-1.5 animate-pulse">
                  <Check className="w-3.5 h-3.5" />
                  <span>Email address copied to clipboard!</span>
                </p>
              )}
              <p className="text-xs text-zinc-400 leading-relaxed">
                Typical response latency is within 24 hours on business days.
              </p>
            </div>

            {/* Social Profiles */}
            <div className="p-6 rounded-2xl bg-[#0D120F] border border-white/10 space-y-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">NETWORK PROFILES</span>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((soc) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={soc.name}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-[#080A09] border border-white/5 hover:border-[#B6FF3B]/50 hover:bg-[#121A15] transition-all flex items-center justify-between text-xs font-mono text-zinc-300 hover:text-white group"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-[#B6FF3B] transition-colors" />
                        <span>{soc.name}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#B6FF3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Validated Contact Form */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="left" delay={0.15}>
            <div className="p-8 rounded-2xl bg-[#0D120F] border border-white/10 relative">
              <h3 className="text-xl font-bold text-white mb-2 font-mono">PROJECT INQUIRY</h3>
              <p className="text-xs text-zinc-400 mb-6 font-mono">
                Fill out the details below. This will automatically format and generate a validated direct inquiry.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-[#132018] border border-[#B6FF3B]/40 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#B6FF3B]/20 text-[#B6FF3B] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Inquiry Form Prepared &amp; Dispatched</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed max-w-md mx-auto">
                    Your mail client has been opened with your pre-formatted project scope. You can also send directly to <span className="text-[#B6FF3B]">{directEmail}</span>.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">YOUR NAME *</label>
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#080A09] border text-sm text-white placeholder-zinc-600 focus:outline-none transition-all ${
                          errors.name ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-[#B6FF3B]"
                        }`}
                      />
                      {errors.name && <p className="text-[11px] font-mono text-red-400">{errors.name}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#080A09] border text-sm text-white placeholder-zinc-600 focus:outline-none transition-all ${
                          errors.email ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-[#B6FF3B]"
                        }`}
                      />
                      {errors.email && <p className="text-[11px] font-mono text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Project Scope Selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400">PROJECT CATEGORY</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#080A09] border border-white/10 text-sm text-white focus:outline-none focus:border-[#B6FF3B] transition-all font-mono"
                    >
                      <option value="Creative Agency Website">Creative Agency Website</option>
                      <option value="SaaS Dashboard / Web App">SaaS Dashboard / Web App</option>
                      <option value="Product Landing Page">Product Landing Page</option>
                      <option value="Motion & 3D WebGL Experience">Motion &amp; 3D WebGL Experience</option>
                      <option value="UI/UX Architecture Consulting">UI/UX Architecture Consulting</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400">PROJECT SCOPE &amp; TIMELINE *</label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about your goals, timeline, and deliverables..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-[#080A09] border text-sm text-white placeholder-zinc-600 focus:outline-none transition-all ${
                        errors.message ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-[#B6FF3B]"
                      }`}
                    />
                    {errors.message && <p className="text-[11px] font-mono text-red-400">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full py-4 rounded-xl bg-[#B6FF3B] text-black font-extrabold text-sm font-mono tracking-wider hover:bg-[#cbfb6e] transition-all shadow-[0_0_25px_rgba(182,255,59,0.3)] flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT INQUIRY</span>
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
