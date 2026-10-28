import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero.jsx";
import TelemetryGrid from "@/components/TelemetryGrid.jsx";
import { postSummaries } from "@/lib/postSummaries.gen.js";

export default function Home() {
  useEffect(() => {
    document.title = "Garry Markus · Systems, Algorithms & Engineering Spec";
  }, []);

  const featuredProjects = [
    {
      index: "01",
      title: "ChessReader",
      category: "DESKTOP_LINUX / UCI",
      desc: "Linux chess workbench and PGN reader featuring UCI engine communication, multi-chapter game navigation, and high-framerate piece animation.",
      tags: ["C++ / Python", "UCI Engine", "Linux Desktop"],
      github: "https://github.com/GarryMarkus/ChessReader",
    },
    {
      index: "02",
      title: "Document-Viewer",
      category: "DESKTOP_WIN / PDF_CORE",
      desc: "Distraction-free document and PDF reader for Windows inspired by GNOME aesthetics. Optimized for high-throughput rasterization with zero telemetry.",
      tags: ["TypeScript", "Desktop UI", "PDF Engine"],
      github: "https://github.com/GarryMarkus/Document-Viewer",
    },
    {
      index: "03",
      title: "SkillForge",
      category: "WEB_PLATFORM / AI_EVAL",
      desc: "Skill verification platform evaluating software engineering competencies through intelligent matching and deterministic challenge evaluation.",
      tags: ["JavaScript", "LLM Integration", "Adaptive Engine"],
      github: "https://github.com/GarryMarkus/SkillForge",
    },
  ];

  const recentPosts = postSummaries.slice(0, 3);

  return (
    <div className="flex flex-col gap-12 sm:gap-14 animate-page-enter">
      {/* Editorial Hero Component */}
      <Hero />

      {/* Telemetry & Algorithmic Ledger */}
      <TelemetryGrid />

      {/* Featured Systems Section */}
      <section className="flex flex-col gap-6 pt-4 border-t border-[var(--color-border-hairline)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 font-mono">
          <div>
            <span className="text-[11px] text-[var(--color-text-muted)] tracking-wider block">
              INDEX 02 · SELECTED SYSTEMS ARCHITECTURE
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
              Engineered Applications & Repositories
            </h2>
          </div>

          <Link
            to="/projects"
            className="text-xs text-[var(--color-text-primary)] hover:underline flex items-center gap-1 no-underline font-mono"
          >
            [ALL PROJECTS INDEX →]
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.map((p) => (
            <div
              key={p.index}
              className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-medium)] transition-colors p-5 flex flex-col justify-between gap-5 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] border-b border-[var(--color-border-hairline)] pb-2">
                  <span>SYS_{p.index} · {p.category}</span>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-muted)] hover:text-white transition-colors"
                    aria-label={`View ${p.title} repository`}
                  >
                    [REPO ↗]
                  </a>
                </div>

                <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] group-hover:text-white transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--color-border-hairline)] font-mono text-[10px]">
                {p.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-1.5 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-bg-base)] text-[var(--color-text-muted)]"
                  >
                    [{t}]
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Technical Notes Section */}
      <section className="flex flex-col gap-6 pt-4 border-t border-[var(--color-border-hairline)] pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 font-mono">
          <div>
            <span className="text-[11px] text-[var(--color-text-muted)] tracking-wider block">
              INDEX 03 · WRITTEN SPECIFICATIONS & LOG
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
              Technical RFCs & Obsidian Notes
            </h2>
          </div>

          <Link
            to="/blog"
            className="text-xs text-[var(--color-text-primary)] hover:underline flex items-center gap-1 no-underline font-mono"
          >
            [VIEW ALL 24 NOTES →]
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
                  <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold">
                    DOC_{String(idx + 1).padStart(2, "0")} · [{post.category.toUpperCase()}]
                  </span>
                  <span className="text-[10px]">
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
                  [READ →]
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
