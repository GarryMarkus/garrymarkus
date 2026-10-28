import { useState, useEffect, useMemo } from "react";
import { projects, projectCategories } from "@/data/projects.js";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Projects & Systems · Garry Markus";
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "Systems & Desktop":
        return "bg-blue-500/10 text-blue-400 border-blue-500/25";
      case "Algorithms & Chess":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
      case "AI & Web":
        return "bg-amber-500/10 text-amber-400 border-amber-500/25";
      case "Web & Extensions":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/25";
      default:
        return "bg-white/5 text-[var(--color-text-secondary)] border-white/10";
    }
  };

  return (
    <div className="flex flex-col gap-10 animate-page-enter">
      
      {/* Header */}
      <section className="flex flex-col gap-3 border-b border-[var(--color-border-subtle)] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span>Engineering Portfolio · 10 Active Projects</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
          Projects & Core Systems
        </h1>

        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
          A collection of open-source desktop clients, tournament arbiters, browser tooling, and distributed systems architecture built from first principles.
        </p>

        {/* Quick Stats Chips */}
        <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-text-primary)] font-semibold">{projects.length}</span>
            <span>Total Projects</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-text-primary)] font-semibold">100%</span>
            <span>Open Source</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-text-primary)] font-semibold">4</span>
            <span>Technical Domains</span>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600/15 border-blue-500/40 text-blue-300 font-medium shadow-sm"
                  : "bg-white/[0.02] border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-border-medium)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Search projects by tech, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] focus:border-blue-500/50 rounded-lg px-3 py-1.5 pl-8 text-xs font-mono text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none transition-colors"
          />
          <svg
            className="w-3.5 h-3.5 text-[var(--color-text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--color-text-muted)] hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center flex flex-col items-center justify-center gap-3">
          <p className="text-sm font-mono text-[var(--color-text-muted)]">
            No projects found matching the criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-xs font-mono text-blue-400 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="glass-card rounded-xl p-6 flex flex-col justify-between gap-5 group hover:border-[var(--color-border-medium)] transition-all"
            >
              {/* Card Top: Category and Links */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-medium ${getCategoryBadgeClass(
                      project.category
                    )}`}
                  >
                    {project.category}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-white transition-colors rounded hover:bg-white/5"
                        title="Live Demo"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-white transition-colors rounded hover:bg-white/5"
                        title="GitHub Repository"
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-display font-semibold text-[var(--color-text-primary)] group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs font-mono text-cyan-400/80 mt-0.5">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mt-1">
                  {project.description}
                </p>
              </div>

              {/* Card Bottom: Tags & Specs */}
              <div className="flex flex-col gap-3 pt-4 border-t border-[var(--color-border-subtle)]">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-white/[0.03] text-[11px] font-mono text-[var(--color-text-muted)] border border-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mini Spec Telemetry */}
                {project.stats && (
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-text-dim)] pt-1">
                    {Object.entries(project.stats).map(([k, v], sIdx) => (
                      <span key={sIdx} className="capitalize">
                        <span className="text-[var(--color-text-muted)]">{k}:</span> {v}
                      </span>
                    ))}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-mono no-underline ml-auto flex items-center gap-1"
                      >
                        <span>source</span>
                        <span>→</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
