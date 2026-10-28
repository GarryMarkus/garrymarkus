import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { postSummaries } from "@/lib/postSummaries.gen.js";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "RFC & Technical Publication Index · Garry Markus";
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

  return (
    <div className="flex flex-col gap-8 animate-page-enter">
      
      {/* Editorial Header */}
      <section className="flex flex-col gap-3 border-b border-[var(--color-border-hairline)] pb-6 font-mono">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 inline-block" />
            <span className="text-[var(--color-text-primary)] font-semibold">
              INDEX 03 · OBSIDIAN REPOSITORY & TECHNICAL RFC ARCHIVE
            </span>
          </div>
          <div>
            <span>FORMAT: MARKDOWN + KATEX</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
          RFC & Technical Publication Index
        </h1>

        <p className="text-sm text-[var(--color-text-secondary)] max-w-3xl leading-relaxed font-sans">
          Algorithmic analyses, runtime mechanics, and system specifications compiled directly from personal Obsidian engineering vaults.
        </p>

        {/* Telemetry Metrics */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 pt-2 text-xs text-[var(--color-text-muted)]">
          <div>
            PUBLICATIONS: <span className="text-[var(--color-text-primary)] font-semibold">{postSummaries.length} COMPILED</span>
          </div>
          <span>·</span>
          <div>
            DISCIPLINES: <span className="text-[var(--color-text-primary)] font-semibold">{categories.length - 1} ACTIVE</span>
          </div>
          <span>·</span>
          <div>
            INTEGRITY: <span className="text-emerald-400 font-semibold">STATIC CLIENT DELIVERY</span>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        {/* Category Filter Matrix */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[var(--color-text-muted)] mr-1 hidden sm:inline">DISCIPLINE:</span>
          {categories.map((cat) => (
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

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="FILTER_KEYWORDS..."
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
      </section>

      {/* Publications Table Ledger */}
      {filteredPosts.length === 0 ? (
        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-12 text-center flex flex-col items-center justify-center gap-3 font-mono">
          <p className="text-xs text-[var(--color-text-muted)]">
            NO TECHNICAL PUBLICATIONS FOUND MATCHING THE QUERY.
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
      ) : (
        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] overflow-x-auto font-mono">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-hairline)] bg-[var(--color-bg-subtle)] text-[10px] text-[var(--color-text-muted)] tracking-wider">
                <th className="py-2.5 px-4 font-normal">DOC_ID</th>
                <th className="py-2.5 px-4 font-normal">DATE</th>
                <th className="py-2.5 px-4 font-normal">DISCIPLINE</th>
                <th className="py-2.5 px-4 font-normal">SPECIFICATION TITLE & EXCERPT</th>
                <th className="py-2.5 px-4 font-normal">READ TIME</th>
                <th className="py-2.5 px-4 font-normal text-right">DISPATCH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-hairline)]">
              {filteredPosts.map((post, idx) => (
                <tr
                  key={post.slug}
                  className="hover:bg-[var(--color-bg-surface-elevated)] transition-colors group"
                >
                  <td className="py-3 px-4 font-tabular text-[var(--color-text-muted)] text-[11px] whitespace-nowrap">
                    RFC_{String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[var(--color-text-muted)] whitespace-nowrap">
                    {post.date}
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[var(--color-text-secondary)] whitespace-nowrap">
                    [{post.category.toUpperCase()}]
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="font-display font-semibold text-sm text-[var(--color-text-primary)] group-hover:underline no-underline block"
                    >
                      {post.title}
                    </Link>
                    <p className="text-[11px] text-[var(--color-text-muted)] font-sans line-clamp-1 mt-0.5">
                      {post.excerpt}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[var(--color-text-muted)] whitespace-nowrap">
                    {post.readTime}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="px-2.5 py-1 border border-[var(--color-border-hairline)] group-hover:border-[var(--color-border-strong)] text-[11px] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)] no-underline transition-colors"
                    >
                      [READ →]
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
