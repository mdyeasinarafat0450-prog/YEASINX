"use client";

import React, { useState, useMemo } from "react";
import { Project, ProjectCategory } from "@/types/project";
import { projectsData, projectCategories } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectPreviewModal from "./ProjectPreviewModal";
import { Sparkles, Layers, SlidersHorizontal, Eye } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Filter projects smoothly
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData;
    return projectsData.filter((p) =>
      p.category === activeCategory || p.allCategories.includes(activeCategory)
    );
  }, [activeCategory]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleNavigateProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section id="portfolio" className="relative py-28 px-6 sm:px-10 lg:px-14 xl:px-16 max-w-[1780px] 2xl:max-w-[1920px] mx-auto scroll-mt-20">
      {/* Section Header */}
      <ScrollReveal direction="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#121A15] border border-[#B6FF3B]/30 text-[#B6FF3B] font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE WORK SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
              SELECTED <span className="text-[#B6FF3B]">PROJECTS</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mt-3 font-sans leading-relaxed">
              Every project includes an embedded live interactive preview or native sandbox environment. Click any card to explore live inside this portfolio.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden sm:flex items-center space-x-6 p-4 rounded-xl bg-[#0D120F] border border-white/10 text-xs font-mono">
            <div>
              <div className="text-white font-bold text-lg">04</div>
              <div className="text-zinc-500">LIVE DEMOS</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-[#B6FF3B] font-bold text-lg">100%</div>
              <div className="text-zinc-500">INTERACTIVE</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-white font-bold text-lg">60 FPS</div>
              <div className="text-zinc-500">PERFORMANCE</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between pb-6 mb-10 border-b border-white/10 overflow-x-auto scrollbar-none gap-4">
        <div className="flex items-center space-x-2 shrink-0">
          {projectCategories.map((cat) => {
            const count =
              cat === "All"
                ? projectsData.length
                : projectsData.filter((p) => p.category === cat || p.allCategories.includes(cat)).length;

            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
                  isActive
                    ? "bg-[#B6FF3B] text-black font-bold shadow-[0_0_20px_rgba(182,255,59,0.3)] scale-[1.02]"
                    : "bg-[#0E1310] text-zinc-400 hover:text-white hover:bg-[#151D18] border border-white/5"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-black/20 text-black font-extrabold" : "bg-white/10 text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs font-mono text-zinc-500 shrink-0 hidden lg:block">
          SHOWING {filteredProjects.length} CURATED EXPERIENCES
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 0.08} direction="up">
            <ProjectCard
              project={project}
              onSelect={handleSelectProject}
            />
          </ScrollReveal>
        ))}
      </div>

      {/* Live Preview Modal */}
      <ProjectPreviewModal
        project={selectedProject}
        allProjects={projectsData}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        onNavigate={handleNavigateProject}
      />
    </section>
  );
}
