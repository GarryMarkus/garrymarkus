import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { postSummaries } from "@/lib/postSummaries.gen.js";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Technical Log & Notes · Garry Markus";
  }, []);

  const categories = useMemo(() => {
    const set = new Set(postSummaries.map((p) => p.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filteredPosts = useMemo(() => {
    return postSummaries.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "DSA":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
      case "Go":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/25";
      case "Numpy":
        return "bg-blue-500/10 text-blue-400 border-blue-500/25";
      case "CyberSecurity":
        return "bg-amber-500/10 text-amber-400 border-amber-500/25";
      default:
        return "bg-white/5 text-[var(--color-text-secondary)] border-white/10";
    }
  };

  return (
    <div className="flex flex-col gap-10 animate-page-enter">
      
      {/* Header */}
      <section className="flex flex-col gap-3 border-b border-[var(--color-border-subtle)] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Digital Garden · 24 Technical Notes</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
          Technical Log & Research Notes
        </h1>

        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
          In-depth notes, lecture breakdowns, and algorithmic insights on C++, Go internals, NumPy mechanics, and network security.
        </p>

        {/* Quick Stats Chips */}
        <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-text-primary)] font-semibold">{postSummaries.length}</span>
            <span>Compiled Articles</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-text-primary)] font-semibold">{categories.length - 1}</span>
            <span>Disciplines</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--color-text-primary)] font-semibold">Obsidian</span>
            <span>Integrated Knowledge Base</span>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedCategory === cat
                  ? "bg-cyan-600/15 border-cyan-500/40 text-cyan-300 font-medium shadow-sm"
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
            placeholder="Search notes by keyword, topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] focus:border-cyan-500/50 rounded-lg px-3 py-1.5 pl-8 text-xs font-mono text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none transition-colors"
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

      {/* Notes List */}
      {filteredPosts.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center flex flex-col items-center justify-center gap-3">
          <p className="text-sm font-mono text-[var(--color-text-muted)]">
            No notes found matching your search.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-xs font-mono text-cyan-400 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="glass-card rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-underline group hover:border-[var(--color-border-medium)] transition-all"
            >
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-center gap-2.5 font-mono text-xs">
                  <span
                    className={`px-2 py-0.5 rounded border text-[10px] font-medium ${getCategoryColor(
                      post.category
                    )}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-[var(--color-text-muted)] text-[11px]">
                    {post.date}
                  </span>
                  <span>·</span>
                  <span className="text-[var(--color-text-muted)] text-[11px]">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-display font-semibold text-[var(--color-text-primary)] group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 shrink-0 sm:self-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">Read Note</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}
