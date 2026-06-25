"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { WindowChrome } from "@/components/WindowChrome";
import { Neofetch } from "@/components/Neofetch";
import { TypeWriter } from "@/components/TypeWriter";

export default function Home() {
  const [heroDone, setHeroDone] = useState(false);

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
      <motion.div variants={itemVariants}>
        <WindowChrome title="user@portfolio: ~" timestamp="--">
          <div className="mb-4 text-[var(--accent-green)]">
            <span className="text-[var(--accent-purple)]">❯</span> ./neofetch
          </div>
          <Neofetch />
        </WindowChrome>
      </motion.div>

      <motion.div id="about" variants={itemVariants}>
        <WindowChrome title="user@portfolio: ~/about">
          <div className="mb-4 text-[var(--text-muted)]">
            <span className="text-[var(--accent-purple)]">❯</span> cat about.txt
          </div>
          <div className="text-[var(--text-secondary)] whitespace-pre-wrap leading-[1.7]">
            <span className="text-[var(--accent-pink)]">#</span> about me{"\n"}
            <span className="text-[var(--accent-pink)]">#</span> ─────────────────────────────────────────{"\n"}
            <span className="text-[var(--accent-pink)]">#</span> I&apos;m Garry Markus, a Software Engineer who loves building fast, reliable systems.{"\n"}
            <span className="text-[var(--accent-pink)]">#</span> Currently focused on React, Next.js, and TypeScript.{"\n"}
            <span className="text-[var(--accent-pink)]">#</span> I write about my journey and tech on this site.{"\n"}
            <span className="text-[var(--accent-pink)]">#</span> When not coding, I&apos;m customizing my dotfiles or exploring new tech.{"\n"}
            <span className="text-[var(--accent-pink)]">#</span>{"\n"}
            <span className="text-[var(--accent-pink)]">#</span> contact →{" "}
            <a href="mailto:garrymarkus@example.com" className="text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] no-underline relative group">
              <span className="hidden group-hover:inline text-[var(--text-muted)]">→ </span>[mail]
            </a>{" | "}
            <a href="https://github.com/garrymarkus" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] no-underline relative group">
              <span className="hidden group-hover:inline text-[var(--text-muted)]">→ </span>[github]
            </a>{" | "}
            <a href="https://linkedin.com/in/garrymarkus" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] no-underline relative group">
              <span className="hidden group-hover:inline text-[var(--text-muted)]">→ </span>[linkedin]
            </a>{" | "}
            <a href="https://x.com/garrymarkus" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] no-underline relative group">
              <span className="hidden group-hover:inline text-[var(--text-muted)]">→ </span>[x]
            </a>
          </div>
        </WindowChrome>
      </motion.div>

      <motion.div variants={itemVariants}>
        <WindowChrome title="user@portfolio: ~/tools — ls -la">
          <div className="mb-4 text-[var(--text-muted)]">
            <span className="text-[var(--accent-purple)]">❯</span> ls -la ./tools
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-1 font-mono text-[13px]"
          >
            {[
              { perms: "drwxr-xr-x", size: "8.4K", date: "Jan 12 10:20", name: "react/", isDir: true },
              { perms: "drwxr-xr-x", size: "6.2K", date: "Feb 05 14:10", name: "nextjs/", isDir: true },
              { perms: "drwxr-xr-x", size: "9.1K", date: "Mar 10 09:45", name: "typescript/", isDir: true },
              { perms: "-rw-r--r--", size: "4.5K", date: "Apr 20 16:30", name: "tailwindcss", isDir: false },
              { perms: "-rw-r--r--", size: "3.2K", date: "May 01 11:15", name: "framer-motion", isDir: false },
              { perms: "-rw-r--r--", size: "5.0K", date: "Jun 15 08:00", name: "nodejs", isDir: false },
            ].map((tool, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-6 w-full">
                <span className="text-[var(--text-muted)] hidden sm:inline-block w-[90px]">{tool.perms}</span>
                <span className="text-[var(--text-muted)] inline-block w-[40px] text-right">{tool.size}</span>
                <span className="text-[var(--text-muted)] hidden sm:inline-block w-[110px]">{tool.date}</span>
                <span className={tool.isDir ? "text-[var(--accent-cyan)]" : "text-[var(--text-primary)]"}>
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </WindowChrome>
      </motion.div>

      <motion.div variants={itemVariants}>
        <WindowChrome title="user@portfolio: ~/blog — cat recent.log">
          <div className="mb-4 text-[var(--text-muted)]">
            <span className="text-[var(--accent-purple)]">❯</span> cat recent.log
          </div>
          <div className="flex flex-col gap-2">
            {[
              { date: "2024-01-15", title: "Building a Portfolio with Next.js and Tailwind", time: "5", slug: "sample" },
            ].map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={i} className="group block text-[13px] no-underline">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-2 rounded-md transition-colors group-hover:bg-[var(--bg-elevated)] group-hover:text-[var(--accent-purple)] text-[var(--text-secondary)]">
                  <span className="text-[var(--text-muted)] sm:w-[100px] flex-shrink-0">
                    <span className="hidden group-hover:inline text-[var(--accent-purple)] absolute -ml-4">❯ </span>
                    {post.date}
                  </span>
                  <span className="text-[var(--accent-green)] w-[40px] flex-shrink-0">INFO</span>
                  <span className="text-[var(--text-muted)] hidden sm:inline">→</span>
                  <span className="flex-grow truncate">{post.title}</span>
                  <span className="text-[var(--text-muted)] text-[11px] whitespace-nowrap">{post.time} min read</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--bg-border)]">
            <Link href="/blog" className="text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] no-underline flex items-center gap-2">
              <span className="text-[var(--accent-purple)]">❯</span> cat more →
            </Link>
          </div>
        </WindowChrome>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8 mb-20 px-4">
        <div className="flex flex-col gap-2 font-mono text-[13px]">
          <div className="flex items-center gap-2 text-[var(--accent-cyan)]">
            <span className="text-[var(--accent-purple)]">❯</span> 
            <span>echo &quot;let&apos;s build something cool together&quot;</span>
          </div>
          <div className="text-[var(--text-primary)]">let&apos;s build something cool together</div>
          
          <div className="flex items-center gap-2 text-[var(--accent-cyan)] mt-4">
            <span className="text-[var(--accent-purple)]">❯</span> 
            <TypeWriter 
              text="open --contact mail github linkedin x" 
              delayMs={1500} 
              speedMs={40} 
              onComplete={() => setHeroDone(true)}
            />
          </div>
          
          <div className={heroDone ? "opacity-100 transition-opacity duration-500" : "opacity-0"}>
            <div className="mt-6 flex gap-4 items-center">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-[var(--accent-purple)] text-[var(--accent-purple)] text-[12px] tracking-[0.1em] rounded-sm transition-all hover:bg-[rgba(189,147,249,0.1)] hover:shadow-[0_0_12px_rgba(189,147,249,0.2)] no-underline"
              >
                [ cat resume.pdf ] <span className="text-[14px]">↗</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
