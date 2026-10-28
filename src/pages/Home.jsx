import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero.jsx";
import TelemetryGrid from "@/components/TelemetryGrid.jsx";
import { postSummaries } from "@/lib/postSummaries.gen.js";

export default function Home() {
  useEffect(() => {
    document.title = "Garry Markus · Systems, Algorithms & Engineering Architecture";
  }, []);

  const featuredProjects = [
    {
      index: "01",
      title: "ChessReader",
      category: "Systems & Desktop",
      desc: "Linux chess workbench and PGN reader featuring asynchronous UCI engine communication, multi-chapter game tree navigation, and high-framerate vector piece animation.",
      stack: ["Python", "UCI Protocol", "Cairo", "Linux POSIX"],
      github: "https://github.com/GarryMarkus/ChessReader",
    },
    {
      index: "02",
      title: "Document-Viewer",
      category: "Systems & Desktop",
      desc: "Distraction-free document and PDF reader for Windows inspired by GNOME ergonomics. Optimized for sub-50ms cold starts, virtualized page rendering, and zero telemetry.",
      stack: ["TypeScript", "Canvas", "Win32 API", "PDF Core"],
      github: "https://github.com/GarryMarkus/Document-Viewer",
    },
    {
      index: "03",
      title: "Chess-Tournament-Swiss-Pairing",
      category: "Algorithms & Chess",
      desc: "FIDE Dutch Swiss pairing engine utilizing weighted bipartite Blossom graph matching. Computes automated Buchholz and Sonneborn-Berger tiebreaks with strict color parity.",
      stack: ["Python", "Graph Matching", "Blossom", "FIDE Rules"],
      github: "https://github.com/EnPassant-Chess-Forum-ABESEC/Chess-Tournament-Swiss-Pairing",
    },
  ];

  const recentPosts = postSummaries.slice(0, 3);

  return (
    <div className="flex flex-col gap-10">
      
      {/* Editorial Hero Section */}
      <Hero />

      {/* Verified Telemetry Ledger */}
      <TelemetryGrid />

      {/* Featured Systems Section */}
      <section className="flex flex-col gap-6 pt-4 border-t border-[var(--color-border-hairline)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 font-mono">
          <div>
            <span className="text-[11px] text-[var(--color-text-muted)] tracking-wider block">
              SELECTED SYSTEMS DOSSIERS
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
              Core Applications & Software Repositories
            </h2>
          </div>

          <Link
            to="/projects"
            className="text-xs text-[var(--color-text-secondary)] hover:text-white transition-colors no-underline flex items-center gap-1 font-mono"
          >
            <span>All 10 Systems</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.map((p) => (
            <div
              key={p.index}
              className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-medium)] transition-colors p-5 flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] border-b border-[var(--color-border-hairline)] pb-2">
                  <span>{p.index} · {p.category}</span>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-secondary)] hover:text-white transition-colors"
                  >
                    Source ↗
                  </a>
                </div>

                <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] group-hover:text-white transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans line-clamp-3">
                  {p.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--color-border-hairline)] font-mono text-[11px] text-[var(--color-text-muted)]">
                {p.stack.join(" · ")}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Technical Notes Section */}
      <section className="flex flex-col gap-6 pt-4 border-t border-[var(--color-border-hairline)] pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 font-mono">
          <div>
            <span className="text-[11px] text-[var(--color-text-muted)] tracking-wider block">
              OBSIDIAN DIGITAL GARDEN
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
              Recent Technical Publications
            </h2>
          </div>

          <Link
            to="/blog"
            className="text-xs text-[var(--color-text-secondary)] hover:text-white transition-colors no-underline flex items-center gap-1 font-mono"
          >
            <span>All 24 Notes</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentPosts.map((post, idx) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-medium)] transition-colors p-5 flex flex-col justify-between gap-4 no-underline group"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] border-b border-[var(--color-border-hairline)] pb-2">
                  <span className="text-[11px] text-[var(--color-text-secondary)] font-semibold">
                    0{idx + 1} · {post.category}
                  </span>
                  <span className="text-[11px]">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-white transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed font-sans">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--color-border-hairline)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
                <span>{post.date}</span>
                <span className="text-[var(--color-text-primary)] group-hover:translate-x-0.5 transition-transform">
                  Read Note →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
