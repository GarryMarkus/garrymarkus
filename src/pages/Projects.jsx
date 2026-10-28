import { useState, useEffect, useMemo } from "react";
import { projects, projectCategories } from "@/data/projects.js";
import ProjectDossier from "@/components/ProjectDossier.jsx";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Selected Systems · Garry Markus";
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
        project.problem.toLowerCase().includes(query) ||
        project.architecture.toLowerCase().includes(query) ||
        project.stack.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-8">
      
      {/* Editorial Stage Header */}
      <section className="flex flex-col gap-3 border-b border-[var(--color-border-hairline)] pb-6 font-mono">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>02 / SELECTED SYSTEMS</span>
          <span>{projects.length} AUDITED REPOSITORIES</span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)] tracking-tight">
          Systems & Technical Dossiers
        </h1>

        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-sans leading-relaxed max-w-2xl">
          Engineered open-source desktop clients, tournament arbiters, browser tooling, and distributed platforms with zero backend dependencies.
        </p>
      </section>

      {/* Filter Matrix & Search Query */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        {/* Plain Text Delimited Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {projectCategories.map((cat, idx) => (
            <div key={cat} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`transition-colors ${
                  selectedCategory === cat
                    ? "text-[var(--color-text-primary)] font-semibold underline underline-offset-4"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                }`}
              >
                {cat}
              </button>
              {idx < projectCategories.length - 1 && (
                <span className="text-[var(--color-text-dim)]">·</span>
              )}
            </div>
          ))}
        </div>

        {/* Clean Search Input */}
        <div className="relative min-w-[200px]">
          <input
            type="text"
            placeholder="Search stack, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-hairline)] focus:border-[var(--color-border-strong)] px-3 py-1.5 text-xs font-mono text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--color-text-muted)] hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </section>

      {/* Dossier List */}
      {filteredProjects.length === 0 ? (
        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-10 text-center flex flex-col items-center justify-center gap-2 font-mono text-xs">
          <p className="text-[var(--color-text-muted)]">
            No technical dossiers match the specified filter query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-[var(--color-text-primary)] underline hover:text-white"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredProjects.map((project, idx) => (
            <ProjectDossier key={project.id} project={project} index={idx} />
          ))}
        </div>
      )}

    </div>
  );
}
