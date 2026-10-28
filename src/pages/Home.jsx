import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero.jsx";
import TelemetryGrid from "@/components/TelemetryGrid.jsx";
import { getAllPosts } from "@/lib/posts.js";

export default function Home() {
  useEffect(() => {
    document.title = "Garry Markus · Systems & Algorithms";
  }, []);

  const featuredProjects = [
    {
      title: "ChessReader",
      desc: "A sleek Linux chess workbench and PGN reader featuring UCI engine analysis, multi-game chapter navigation, and customizable piece themes.",
      tags: ["Python", "UCI Engine", "Linux"],
      github: "https://github.com/GarryMarkus/ChessReader",
    },
    {
      title: "Document-Viewer",
      desc: "Clean, distraction-free document and PDF reader for Windows inspired by GNOME's minimalist aesthetics. Built for high rendering speed.",
      tags: ["TypeScript", "Desktop UI", "Minimalist"],
      github: "https://github.com/GarryMarkus/Document-Viewer",
    },
    {
      title: "SkillForge",
      desc: "Comprehensive platform transforming learners into verified, job-ready professionals through AI-powered skill verification and intelligent matching.",
      tags: ["JavaScript", "AI", "Adaptive Learning"],
      github: "https://github.com/GarryMarkus/SkillForge",
    },
  ];

  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="flex flex-col gap-12 sm:gap-16 animate-page-enter">
      {/* Hero Section */}
      <Hero />

      {/* Live Telemetry Grid */}
      <TelemetryGrid />

      {/* Featured Projects Preview Section */}
      <section className="flex flex-col gap-6 pt-4 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
              Selected Work
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
              Featured Systems & Applications
            </h2>
          </div>

          <Link
            to="/projects"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 no-underline"
          >
            <span>All Projects</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((p, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-5 flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-base text-[var(--color-text-primary)] group-hover:text-blue-400 transition-colors">
                    {p.title}
                  </h3>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-muted)] hover:text-white transition-colors"
                    aria-label={`View ${p.title} on GitHub`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--color-border-subtle)]">
                {p.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-white/[0.03] text-[10px] font-mono text-[var(--color-text-muted)] border border-white/[0.05]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Technical Notes Section */}
      <section className="flex flex-col gap-6 pt-4 border-t border-[var(--color-border-subtle)] pb-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Digital Garden
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
              Latest Technical Notes
            </h2>
          </div>

          <Link
            to="/blog"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 no-underline"
          >
            <span>Read All Notes</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="glass-card rounded-xl p-5 flex flex-col justify-between gap-4 no-underline group"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px]">
                    {post.category}
                  </span>
                  <span className="text-[var(--color-text-muted)] text-[11px]">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                <span>{post.date}</span>
                <span className="group-hover:translate-x-1 transition-transform text-blue-400">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
