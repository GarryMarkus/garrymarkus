import { Link } from "react-router-dom";

export default function Hero() {
  const focusAreas = [
    "Distributed Systems",
    "Systems Programming",
    "Algorithmic Optimization",
    "Chess Engines & Graph Theory",
  ];

  return (
    <section className="flex flex-col gap-6 pb-8 border-b border-[var(--color-border-hairline)]">
      
      {/* Editorial Category Ribbon */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] border-b border-[var(--color-border-hairline)] pb-3">
        <span>01 / OVERVIEW & THESIS</span>
        <span>ACADEMIC CSE · ABESEC</span>
      </div>

      {/* Main Narrative Statement */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] tracking-tight leading-[1.15]">
          Engineering high-performance software systems, desktop utilities, and algorithmic engines.
        </h1>
        
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-sans leading-relaxed">
          Specializing in low-overhead architectures, UCI chess engine integration, and algorithmic problem-solving. Focused on deterministic execution, minimal abstraction bloat, and resilient client-side software.
        </p>
      </div>

      {/* Delimited Focus Areas */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[var(--color-text-muted)]">
        <span className="text-[var(--color-text-dim)]">DOMAINS:</span>
        {focusAreas.map((area, idx) => (
          <span key={idx} className="flex items-center gap-2">
            <span className="text-[var(--color-text-secondary)]">{area}</span>
            {idx < focusAreas.length - 1 && <span className="text-[var(--color-text-dim)]">·</span>}
          </span>
        ))}
      </div>

      {/* Action Triggers */}
      <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
        <Link
          to="/projects"
          className="px-4 py-2 border border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-bg-base)] font-semibold hover:bg-transparent hover:text-[var(--color-text-primary)] transition-all no-underline flex items-center gap-2"
        >
          <span>Explore Projects</span>
          <span>→</span>
        </Link>

        <Link
          to="/blog"
          className="px-4 py-2 border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-all no-underline flex items-center gap-2"
        >
          <span>Technical Log</span>
          <span>→</span>
        </Link>

        <a
          href="https://github.com/GarryMarkus"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-[var(--color-border-hairline)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-border-strong)] transition-all no-underline flex items-center gap-1.5"
        >
          <span>GitHub</span>
          <span>↗</span>
        </a>
      </div>

    </section>
  );
}
