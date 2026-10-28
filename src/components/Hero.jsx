import { Link } from "react-router-dom";

export default function Hero() {
  const focusAreas = [
    "Distributed Systems",
    "Systems Programming",
    "Algorithmic Problem Solving",
    "Chess Engines & Pairings",
  ];

  return (
    <section className="flex flex-col gap-8 pb-12 pt-2 border-b border-[var(--color-border-subtle)]">
      
      {/* Top Telemetry Badge */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>Prem Singh · @GarryMarkus</span>
        </div>

        <span className="text-xs font-mono text-[var(--color-text-muted)] hidden sm:inline">
          B.Tech CSE @ ABESEC
        </span>
      </div>

      {/* Main Narrative Headline */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--color-text-primary)] tracking-tight leading-[1.1]">
          Building robust software systems from <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">first principles</span>.
        </h1>
        
        <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
          Passionate about clean architecture, high-concurrency design, and scalable tooling.
          From low-latency desktop utilities and chess engines to modern web platforms, I focus on algorithmic clarity and performance.
        </p>
      </div>

      {/* Focus Area Tags */}
      <div className="flex flex-wrap gap-2">
        {focusAreas.map((area, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-md bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] text-xs font-mono text-[var(--color-text-secondary)] hover:border-blue-500/40 hover:text-white transition-colors"
          >
            {area}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link
          to="/projects"
          className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-medium transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 no-underline"
        >
          <span>View Projects</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        <Link
          to="/blog"
          className="px-5 py-2.5 rounded-lg bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-surface-elevated)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] font-mono text-xs font-medium transition-all flex items-center gap-2 no-underline"
        >
          <span>Technical Log</span>
          <svg className="w-3.5 h-3.5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </Link>

        <a
          href="https://github.com/GarryMarkus"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-lg border border-[var(--color-border-subtle)] hover:border-[var(--color-border-medium)] bg-transparent text-[var(--color-text-secondary)] hover:text-white font-mono text-xs transition-colors no-underline flex items-center gap-2"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <span>GitHub</span>
        </a>
      </div>

    </section>
  );
}
