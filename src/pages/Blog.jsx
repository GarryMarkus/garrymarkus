import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { postSummaries } from "@/lib/postSummaries.gen.js";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Technical Deep Dives · Garry Markus";
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
    <div className="flex flex-col gap-8">
      
      {/* Editorial Header */}
      <section className="flex flex-col gap-3 border-b border-[var(--color-border-hairline)] pb-6 font-mono">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>03 / TECHNICAL DEEP DIVES</span>
          <span>{postSummaries.length} COMPILED NOTES</span>
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)] tracking-tight">
          Publications & Engineering Notes
        </h1>

        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-sans leading-relaxed max-w-2xl">
          Algorithmic analyses, runtime mechanics, memory models, and systems specifications authored in Obsidian and compiled to static delivery.
        </p>
      </section>

      {/* Filter and Search Controls */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        {/* Plain Text Delimited Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat, idx) => (
            <div key={cat} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`transition-colors ${
                  selectedCategory === cat
                    ? "text-[var(--color-text-primary)] font-semibold underline underline-offset-4"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                }`}
              >
                {cat}
              </button>
              {idx < categories.length - 1 && (
                <span className="text-[var(--color-text-dim)]">·</span>
              )}
            </div>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[200px]">
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-hairline)] focus:border-[var(--color-border-strong)] px-3 py-1.5 text-xs font-mono text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--color-text-muted)] hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </section>

      {/* Publications Table Ledger */}
      {filteredPosts.length === 0 ? (
        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-10 text-center flex flex-col items-center justify-center gap-2 font-mono text-xs">
          <p className="text-[var(--color-text-muted)]">
            No technical publications match the specified filter query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-[var(--color-text-primary)] underline hover:text-white"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] overflow-x-auto font-mono">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-hairline)] bg-[var(--color-bg-subtle)] text-[10px] text-[var(--color-text-muted)] tracking-wider">
                <th className="py-2.5 px-4 font-normal">#</th>
                <th className="py-2.5 px-4 font-normal">DATE</th>
                <th className="py-2.5 px-4 font-normal">DISCIPLINE</th>
                <th className="py-2.5 px-4 font-normal">TITLE & SUMMARY</th>
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
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[var(--color-text-muted)] whitespace-nowrap">
                    {post.date}
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[var(--color-text-secondary)] whitespace-nowrap">
                    {post.category}
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
                      className="text-[11px] text-[var(--color-text-secondary)] group-hover:text-white no-underline transition-colors flex items-center justify-end gap-1"
                    >
                      <span>Read</span>
                      <span>→</span>
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
