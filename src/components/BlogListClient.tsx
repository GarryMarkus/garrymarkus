"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { WindowChrome } from "@/components/WindowChrome";
import { BlogCard } from "@/components/BlogCard";
import { PostMetadata } from "@/lib/posts";
import { PageTransition } from "@/components/PageTransition";
import { Search, Terminal } from "lucide-react";

const PAGE_SIZE = 6;

interface BlogListClientProps {
  posts: PostMetadata[];
}

function BlogListContent({ posts }: BlogListClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams ? (searchParams.get("search") || "") : "";
  const [filter, setFilter] = useState(initialQuery);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Sync state if URL changes
  useEffect(() => {
    if (searchParams) {
      setFilter(searchParams.get("search") || "");
    }
  }, [searchParams]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(filter.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full text-white">
      {/* 1. Header welcome banner */}
      <header className="mb-6">
        <div className="flex items-center gap-2 text-[var(--accent-cyan)] text-[11px] font-bold uppercase tracking-widest font-mono">
          <Terminal size={14} className="stroke-[2.5]" />
          <span>INDEX: DIRECTORY LISTING</span>
        </div>
        <h1 className="font-headings font-extrabold text-2xl md:text-4xl tracking-tight text-white mt-2">
          Library
        </h1>
      </header>

      {/* 2. Prominent Search Input Panel */}
      <div className="mb-8 max-w-xl bg-[var(--bg-surface)] border-2 border-black rounded-2xl p-3 flex items-center gap-2.5 shadow-brutal focus-within:translate-x-[-1px] focus-within:translate-y-[-1px] focus-within:shadow-[6px_6px_0px_#000000] transition-all">
        <Search size={18} className="text-[var(--text-secondary)] stroke-[2.5] ml-1" />
        <input
          type="text"
          value={filter}
          placeholder="Filter by title, tag, or tools..."
          onChange={(e) => {
            setFilter(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          className="bg-transparent border-none text-white font-semibold outline-none w-full text-[13px] sm:text-[14px] caret-white"
        />
        {filter && (
          <button
            onClick={() => setFilter("")}
            className="text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-elevated)] border border-white/10 rounded-lg px-2.5 py-1 hover:bg-neutral-800 transition-colors cursor-pointer text-white"
          >
            Clear
          </button>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <WindowChrome title="user@portfolio: ~/blog" className="border-2 border-black bg-[var(--bg-surface)]">
          <div className="mb-6 font-mono text-[13px] text-white overflow-x-auto custom-scrollbar">
            <div className="text-[var(--text-muted)] font-semibold">
              <span>❯</span> ls -la ./blog/
            </div>
            <div className="font-bold my-1">total {posts.length} posts</div>
            <div className="flex gap-4">
              <span className="w-[80px] text-[var(--text-muted)]">drwxr-xr-x</span>
              <span>user</span>
              <span>{new Date().toISOString().split("T")[0]}</span>
              <span className="text-[var(--accent-cyan)] font-bold">./</span>
            </div>
            <div className="flex gap-4 mb-4">
              <span className="w-[80px] text-[var(--text-muted)]">drwxr-xr-x</span>
              <span>user</span>
              <span>{new Date().toISOString().split("T")[0]}</span>
              <span className="text-[var(--accent-cyan)] font-bold">../</span>
            </div>

            {filter && (
              <div className="mt-4 pt-4 border-t border-dashed border-white/10">
                <div className="text-[var(--text-muted)] font-semibold">
                  <span>❯</span> grep -r -i "{filter}" ./blog/
                </div>
                <div className="text-[var(--accent-lime)] font-bold mt-1">
                  grep: found {filteredPosts.length} match{filteredPosts.length === 1 ? "" : "es"}
                </div>
              </div>
            )}
          </div>

          <motion.div className="flex flex-col gap-[12px] pt-4" variants={containerVariants}>
            {visiblePosts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <BlogCard post={post} />
              </motion.div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-[var(--accent-red)] font-semibold text-[13px] mt-4 font-mono">
                grep: no matches found for "{filter}"
              </div>
            )}
          </motion.div>

        {filteredPosts.length > 0 && (
          <div className="mt-8 pt-6 border-t-2 border-black font-mono text-[13px] flex flex-col gap-3">
            <div className="text-[var(--text-muted)] font-semibold">
              <span>❯</span> cat --more (showing {visiblePosts.length} of {filteredPosts.length} posts)
            </div>
            {hasMore && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="btn-brutal btn-brutal-cyan text-[11px] font-bold tracking-wider py-2 px-5 text-black border-2 border-black rounded shadow-[2px_2px_0px_#000000] hover:translate-y-[-1px] hover:shadow-brutal transition-all"
                >
                  Load More Posts
                </button>
              </div>
            )}
          </div>
        )}
      </WindowChrome>
    </motion.div>
  </div>
);
}

export function BlogListClient({ posts }: BlogListClientProps) {
  return (
    <PageTransition>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[50vh] font-mono text-[14px]">
          [ loading blog posts... ]
        </div>
      }>
        <BlogListContent posts={posts} />
      </Suspense>
    </PageTransition>
  );
}
