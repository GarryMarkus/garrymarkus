import { useState } from "react";

export default function ProjectDossier({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-medium)] transition-colors p-6 sm:p-7 flex flex-col gap-5">
      
      {/* Dossier Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[var(--color-border-hairline)] pb-4">
        <div>
          <div className="flex items-center gap-2.5 font-mono text-xs text-[var(--color-text-muted)] mb-1">
            <span className="font-tabular font-semibold text-[var(--color-text-primary)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>·</span>
            <span className="text-[var(--color-text-secondary)]">{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--color-text-primary)] tracking-tight">
            {project.title}
          </h2>
          <p className="font-mono text-xs text-[var(--color-text-secondary)] mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 font-mono text-xs shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors no-underline flex items-center gap-1"
            >
              <span>Live Demo</span>
              <span>↗</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-primary)] hover:text-white transition-colors no-underline flex items-center gap-1"
            >
              <span>Repository</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Problem Statement */}
      <div className="space-y-1.5">
        <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider block">
          PROBLEM STATEMENT
        </span>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-sans leading-relaxed">
          {project.problem}
        </p>
      </div>

      {/* Architecture Highlights */}
      <div className="space-y-1.5">
        <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider block">
          ARCHITECTURE & IMPLEMENTATION
        </span>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-sans leading-relaxed">
          {project.architecture}
        </p>
        {project.highlights && (
          <ul className="mt-2 space-y-1 text-xs font-sans text-[var(--color-text-muted)]">
            {project.highlights.map((item, hIdx) => (
              <li key={hIdx} className="flex items-start gap-2">
                <span className="font-mono text-[10px] text-[var(--color-text-dim)] shrink-0 mt-0.5">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Stack Specification */}
      <div className="pt-3 border-t border-[var(--color-border-hairline)] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--color-text-muted)] text-[11px]">
          <span className="text-[var(--color-text-dim)]">STACK:</span>
          <span>{project.stack.join(" · ")}</span>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[11px] text-[var(--color-text-secondary)] hover:text-white transition-colors flex items-center gap-1.5 ml-auto"
        >
          <span>{isExpanded ? "Collapse Specs" : "Technical Metrics"}</span>
          <span>{isExpanded ? "↑" : "↓"}</span>
        </button>
      </div>

      {/* Expandable Technical Deep-Dive Ledger */}
      {isExpanded && (
        <div className="pt-3 border-t border-[var(--color-border-hairline)] font-mono text-xs space-y-3 bg-[var(--color-bg-base)] p-4 border">
          <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider block">
            VERIFIABLE TECHNICAL CONSTRAINTS:
          </span>
          <p className="text-[11px] text-[var(--color-text-secondary)] font-sans leading-relaxed">
            {project.constraints}
          </p>

          {project.stats && (
            <table className="w-full text-[11px] border-collapse mt-2">
              <tbody className="divide-y divide-[var(--color-border-hairline)] border-y border-[var(--color-border-hairline)]">
                {Object.entries(project.stats).map(([k, v]) => (
                  <tr key={k}>
                    <td className="py-1 text-[var(--color-text-muted)] uppercase w-1/3">{k}</td>
                    <td className="py-1 text-[var(--color-text-primary)]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

    </article>
  );
}
