import { Link } from "react-router-dom";

export default function Hero() {
  const focusAreas = [
    "[DISTRIBUTED SYSTEMS]",
    "[SYSTEMS PROGRAMMING]",
    "[ALGORITHMIC OPTIMIZATION]",
    "[CHESS ENGINES & GRAPH THEORY]",
  ];

  return (
    <section className="flex flex-col gap-6 pb-10 pt-2 border-b border-[var(--color-border-hairline)]">
      
      {/* Editorial Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--color-text-muted)] border-b border-[var(--color-border-hairline)] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 inline-block" />
          <span className="text-[var(--color-text-primary)] font-semibold">PREM SINGH</span>
          <span className="text-[var(--color-border-strong)]">/</span>
          <span>HANDLE: @GarryMarkus</span>
        </div>

        <div className="flex items-center gap-3">
          <span>DEPT: COMPUTER SCIENCE & ENGINEERING</span>
          <span className="text-[var(--color-border-strong)] hidden sm:inline">|</span>
          <span className="hidden sm:inline">INSTITUTION: ABESEC</span>
        </div>
      </div>

      {/* Main Editorial Statement */}
      <div className="flex flex-col gap-4 max-w-4xl">
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-display font-bold text-[var(--color-text-primary)] tracking-tight leading-[1.15]">
          Engineering high-performance software systems, desktop utilities, and algorithmic engines.
        </h1>
        
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-3xl font-sans">
          Computer Science engineer specializing in low-overhead architectures, UCI chess engine integration, and algorithmic problem-solving. Focused on deterministic execution, minimal abstraction bloat, and resilient systems.
        </p>
      </div>

      {/* Domain Competencies (Monospace Bracketed Matrix) */}
      <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
        <span className="text-[var(--color-text-muted)] mr-1">DOMAINS:</span>
        {focusAreas.map((area, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-white transition-colors"
          >
            {area}
          </span>
        ))}
      </div>

      {/* Action Trigger Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-3 font-mono text-xs">
        <Link
          to="/projects"
          className="px-4 py-2 border border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-bg-base)] font-medium hover:bg-transparent hover:text-[var(--color-text-primary)] transition-all no-underline"
        >
          [INDEX PROJECTS →]
        </Link>

        <Link
          to="/blog"
          className="px-4 py-2 border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-surface-elevated)] transition-all no-underline"
        >
          [TECHNICAL LOG →]
        </Link>

        <a
          href="https://github.com/GarryMarkus"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-[var(--color-border-hairline)] bg-transparent text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-border-strong)] transition-colors no-underline"
        >
          [GITHUB ↗]
        </a>
      </div>

    </section>
  );
}
