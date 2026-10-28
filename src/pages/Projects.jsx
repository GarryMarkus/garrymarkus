import { useState, useEffect, useMemo } from "react";
import { projects, projectCategories } from "@/data/projects.js";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table"); // "table" | "dossier"
  const [activeDossierId, setActiveDossierId] = useState(projects[0]?.id || null);

  useEffect(() => {
    document.title = "Technical Project Index · Garry Markus";
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

  return (
    <div className="flex flex-col gap-8 animate-page-enter">
      
      {/* Editorial Header */}
      <section className="flex flex-col gap-3 border-b border-[var(--color-border-hairline)] pb-6 font-mono">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 inline-block" />
            <span className="text-[var(--color-text-primary)] font-semibold">
              INDEX 02 · SYSTEM CATALOG & ARCHITECTURE SPECIFICATION
            </span>
          </div>
          <div>
            <span>VERIFIED REPOSITORIES: 10 AUDITED</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
          Technical Project Index
        </h1>

        <p className="text-sm text-[var(--color-text-secondary)] max-w-3xl leading-relaxed font-sans">
          Curated index of open-source desktop clients, tournament arbiters, browser tooling, and distributed platforms engineered with a zero-dependency philosophy.
        </p>

        {/* Telemetry Metrics */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 pt-2 text-xs text-[var(--color-text-muted)]">
          <div>
            REPOSITORIES: <span className="text-[var(--color-text-primary)] font-semibold">{projects.length}</span>
          </div>
          <span>·</span>
          <div>
            DOMAINS: <span className="text-[var(--color-text-primary)] font-semibold">4 SYSTEMS</span>
          </div>
          <span>·</span>
          <div>
            DISTRIBUTION: <span className="text-[var(--color-text-primary)] font-semibold">100% OPEN SOURCE</span>
          </div>
        </div>
      </section>

      {/* Control Bar: Categories, Search, View Mode */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-mono text-xs">
        
        {/* Category Filter Matrix */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[var(--color-text-muted)] mr-1 hidden sm:inline">FILTER:</span>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 border transition-all ${
                selectedCategory === cat
                  ? "border-[var(--color-border-strong)] bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-primary)] font-medium"
                  : "border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-border-medium)]"
              }`}
            >
              [{cat.toUpperCase()}]
            </button>
          ))}
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-60">
            <input
              type="text"
              placeholder="FILTER_QUERY..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-hairline)] focus:border-[var(--color-border-strong)] px-3 py-1 text-xs font-mono text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--color-text-muted)] hover:text-white"
              >
                [×]
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)]">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 transition-colors ${
                viewMode === "table"
                  ? "bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-primary)] font-semibold"
                  : "text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              [TABLE]
            </button>
            <span className="text-[var(--color-border-hairline)]">|</span>
            <button
              type="button"
              onClick={() => setViewMode("dossier")}
              className={`px-3 py-1 transition-colors ${
                viewMode === "dossier"
                  ? "bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-primary)] font-semibold"
                  : "text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              [DOSSIER]
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area: Table View vs Dossier View */}
      {filteredProjects.length === 0 ? (
        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-12 text-center flex flex-col items-center justify-center gap-3 font-mono">
          <p className="text-xs text-[var(--color-text-muted)]">
            NO SYSTEMS FOUND MATCHING SPECIFIED FILTER CRITERIA.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-xs text-[var(--color-text-primary)] underline hover:text-white"
          >
            [RESET ALL FILTERS]
          </button>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE / LEDGER VIEW */
        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-hairline)] bg-[var(--color-bg-subtle)] text-[10px] text-[var(--color-text-muted)] tracking-wider">
                <th className="py-2.5 px-4 font-normal">INDEX</th>
                <th className="py-2.5 px-4 font-normal">SYSTEM IDENTIFIER</th>
                <th className="py-2.5 px-4 font-normal">DOMAIN</th>
                <th className="py-2.5 px-4 font-normal">TECH SPECIFICATION</th>
                <th className="py-2.5 px-4 font-normal">ARCHITECTURE HIGHLIGHT</th>
                <th className="py-2.5 px-4 font-normal text-right">DISPATCH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-hairline)]">
              {filteredProjects.map((project, idx) => (
                <tr
                  key={project.id}
                  className="hover:bg-[var(--color-bg-surface-elevated)] transition-colors group"
                >
                  <td className="py-3 px-4 font-tabular text-[var(--color-text-muted)] text-[11px]">
                    SYS_{String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-display font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-white transition-colors">
                      {project.title}
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono truncate max-w-xs">
                      {project.tagline}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[var(--color-text-secondary)] whitespace-nowrap">
                    [{project.category.toUpperCase()}]
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[var(--color-text-muted)] whitespace-nowrap">
                    {project.tags.join(" · ")}
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[var(--color-text-secondary)] font-sans">
                    {project.stats
                      ? Object.entries(project.stats)
                          .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
                          .join(" | ")
                      : "Open Spec"}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 border border-[var(--color-border-hairline)] hover:border-[var(--color-border-strong)] text-[10px] text-emerald-400 no-underline"
                        >
                          [LIVE ↗]
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 border border-[var(--color-border-hairline)] hover:border-[var(--color-border-strong)] text-[10px] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] no-underline"
                        >
                          [CODE ↗]
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* DOSSIER / SPEC VIEW (Interactive Split / Detailed Specs) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Dossier Index List */}
          <div className="lg:col-span-5 flex flex-col gap-2 font-mono text-xs">
            <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider">
              SYSTEM SELECTION REGISTER:
            </span>
            {filteredProjects.map((project, idx) => {
              const isSelected = activeDossierId === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveDossierId(project.id)}
                  className={`text-left p-3 border transition-colors ${
                    isSelected
                      ? "border-[var(--color-border-strong)] bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-primary)]"
                      : "border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-border-medium)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-tabular">
                      SYS_{String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px]">
                      [{project.category.toUpperCase()}]
                    </span>
                  </div>
                  <div className="font-display font-semibold text-sm text-[var(--color-text-primary)] mt-0.5">
                    {project.title}
                  </div>
                  <div className="text-[11px] text-[var(--color-text-muted)] truncate">
                    {project.tagline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Dossier Detail Spec Sheet */}
          <div className="lg:col-span-7">
            {(() => {
              const active =
                filteredProjects.find((p) => p.id === activeDossierId) ||
                filteredProjects[0];
              if (!active) return null;

              return (
                <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-6 flex flex-col gap-6 font-mono text-xs">
                  {/* Dossier Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-hairline)] pb-3">
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider block">
                        TECHNICAL SPEC SHEET · ID: {active.id.toUpperCase()}
                      </span>
                      <h2 className="font-display font-bold text-2xl text-[var(--color-text-primary)]">
                        {active.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      {active.live && (
                        <a
                          href={active.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs no-underline hover:border-emerald-500"
                        >
                          [LIVE DEMO ↗]
                        </a>
                      )}
                      {active.github && (
                        <a
                          href={active.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 border border-[var(--color-border-medium)] bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-primary)] text-xs no-underline hover:border-white"
                        >
                          [SOURCE REPOSITORY ↗]
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Summary & Tagline */}
                  <div className="space-y-2">
                    <div className="text-[11px] text-cyan-400/90 font-mono">
                      {"// "}{active.tagline}
                    </div>
                    <p className="text-sm font-sans text-[var(--color-text-secondary)] leading-relaxed">
                      {active.description}
                    </p>
                  </div>

                  {/* Architecture & Constraint Specifications Table */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider block">
                      SYSTEM METADATA & CONSTRAINTS:
                    </span>
                    <table className="w-full text-xs border-collapse">
                      <tbody className="divide-y divide-[var(--color-border-hairline)] border-y border-[var(--color-border-hairline)]">
                        <tr>
                          <td className="py-2 text-[var(--color-text-muted)] w-1/3">DOMAIN</td>
                          <td className="py-2 text-[var(--color-text-primary)]">{active.category}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-[var(--color-text-muted)]">STACK MATRIX</td>
                          <td className="py-2 text-[var(--color-text-primary)]">{active.tags.join(" · ")}</td>
                        </tr>
                        {active.stats &&
                          Object.entries(active.stats).map(([key, val]) => (
                            <tr key={key}>
                              <td className="py-2 text-[var(--color-text-muted)] uppercase">{key}</td>
                              <td className="py-2 text-[var(--color-text-primary)]">{val}</td>
                            </tr>
                          ))}
                        <tr>
                          <td className="py-2 text-[var(--color-text-muted)]">LICENSE</td>
                          <td className="py-2 text-[var(--color-text-primary)]">MIT Open Source</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Direct Link Banner */}
                  <div className="pt-2 flex items-center justify-between text-[11px] text-[var(--color-text-muted)] border-t border-[var(--color-border-hairline)]">
                    <span>HOSTED VIA GITHUB REPOSITORIES</span>
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-primary)] hover:underline no-underline"
                    >
                      Inspect Source Code →
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
