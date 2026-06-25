"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { WindowChrome } from "@/components/WindowChrome";
import { PostMetadata } from "@/lib/posts";

interface BlogListClientProps {
  posts: PostMetadata[];
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const [filter, setFilter] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(filter.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      <WindowChrome title="user@portfolio: ~/blog">
        <div className="mb-6 font-mono text-[13px] text-[var(--text-secondary)] overflow-x-auto custom-scrollbar">
          <div className="text-[var(--text-muted)]">
            <span className="text-[var(--accent-purple)]">❯</span> ls -la ./blog/
          </div>
          <div>total {posts.length} posts</div>
          <div className="flex gap-4">
            <span className="w-[80px]">drwxr-xr-x</span>
            <span>user</span>
            <span>{new Date().toISOString().split("T")[0]}</span>
            <span className="text-[var(--accent-cyan)]">./</span>
          </div>
          <div className="flex gap-4 mb-4">
            <span className="w-[80px]">drwxr-xr-x</span>
            <span>user</span>
            <span>{new Date().toISOString().split("T")[0]}</span>
            <span className="text-[var(--accent-cyan)]">../</span>
          </div>

          <div className="text-[var(--text-muted)] mt-6 whitespace-nowrap">
            <span className="text-[var(--accent-purple)]">❯</span> grep --tags &quot;[
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent border-b border-[var(--bg-border)] text-[var(--text-primary)] focus:border-[var(--accent-purple)] focus:shadow-[0_2px_0_0_rgba(189,147,249,0.3)] w-[150px] sm:w-[200px] outline-none transition-all px-1 ml-1"
            />
            ]&quot;
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
        >
          {filteredPosts.map((post, index) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Link href={`/blog/${post.slug}`} className="block no-underline group">
                <div className="bg-[var(--bg-base)] border border-[var(--bg-border)] rounded-[6px] p-[14px_16px] transition-all duration-150 group-hover:bg-[var(--bg-elevated)] group-hover:border-[var(--bg-border)] border-l-[3px] border-l-transparent group-hover:border-l-[var(--accent-purple)] font-mono">
                  
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-2 text-[12px] sm:text-[13px] text-[var(--text-muted)] gap-1">
                    <div className="flex gap-3 sm:gap-4 overflow-hidden">
                      <span className="hidden sm:inline w-[80px] flex-shrink-0">-rw-r--r--</span>
                      <span className="flex-shrink-0">{post.date}</span>
                      <span className="text-[var(--text-primary)] truncate">{post.slug}/README.md</span>
                    </div>
                    <span className="flex-shrink-0">{post.readTime} min read</span>
                  </div>

                  <div className="text-[var(--accent-purple)] text-[14px] sm:text-[15px] font-medium mb-1 group-hover:underline decoration-dashed underline-offset-4">
                    {post.title}
                  </div>
                  
                  <div className="text-[var(--text-secondary)] text-[12px] mb-3 leading-[1.6]">
                    {post.description}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[rgba(189,147,249,0.12)] text-[var(--accent-purple)] border border-[rgba(189,147,249,0.25)] rounded-[3px] px-[7px] py-[2px] text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="text-[var(--accent-red)] text-[13px] mt-4">
              grep: no matches found for &quot;{filter}&quot;
            </div>
          )}
        </motion.div>

        {filteredPosts.length > 0 && (
          <div className="mt-8 pt-4 border-t border-[var(--bg-border)] font-mono text-[13px] flex flex-col gap-3">
            <div className="text-[var(--text-muted)]">
              <span className="text-[var(--accent-purple)]">❯</span> cat --more (showing {filteredPosts.length} of {posts.length} posts)
            </div>
            <div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-[var(--accent-cyan)] text-[var(--accent-cyan)] text-[12px] tracking-[0.1em] rounded-sm transition-all hover:bg-[rgba(139,233,253,0.1)] hover:shadow-[0_0_12px_rgba(139,233,253,0.2)] cursor-pointer">
                [ load more → ]
              </button>
            </div>
          </div>
        )}
      </WindowChrome>
    </motion.div>
  );
}
