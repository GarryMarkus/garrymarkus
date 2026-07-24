"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "@/lib/posts";
import { MarkdownContent } from "@/components/MarkdownContent";

export function FullPostClient({ post }: { post: Post }) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const container = document.getElementById("post-body");
    if (!container) return;

    // Use the baked-in IDs from marked compiler
    const elements = Array.from(container.querySelectorAll("h2, h3"));
    const newHeadings = elements.map((el) => {
      return {
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H3" ? 3 : 2,
      };
    });
    setHeadings(newHeadings);

    const handleScroll = () => {
      const headingElements = newHeadings.map(h => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
      let currentActiveId = newHeadings.length > 0 ? newHeadings[0].id : "";
      
      for (const el of headingElements) {
        // If the top of the heading is above the middle of the screen (or close to top)
        if (el.getBoundingClientRect().top <= 160) {
          currentActiveId = el.id;
        }
      }

      // If user has scrolled to the absolute bottom of the page, activate the last heading
      if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
        if (newHeadings.length > 0) {
          currentActiveId = newHeadings[newHeadings.length - 1].id;
        }
      }
      
      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post.contentHtml]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(4px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-bg min-h-screen"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        {/* Back link */}
        <motion.div variants={itemVariants} className="pt-[24px]">
          <Link 
            href="/notebook" 
            className="font-mono text-[12px] text-muted hover:text-gold transition-colors"
          >
            ← back to my notebook
          </Link>
        </motion.div>

        {/* Tufte Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,640px)_1fr] gap-0 lg:gap-16 mt-6 sm:mt-8 md:mt-12">
          
          {/* LEFT: Main content column */}
          <div>
            <motion.h1 
              variants={itemVariants}
              className="font-serif text-[28px] sm:text-[36px] md:text-[42px] lg:text-[52px] font-normal italic text-ink leading-[1.1]"
            >
              {post.title}
            </motion.h1>

            <motion.div variants={itemVariants} className="mt-4 sm:mt-6">
              <div className="w-16 border-t-[1.5px] border-gold" />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6 sm:mt-8 md:mt-10" id="post-body">
              <MarkdownContent html={post.contentHtml || ""} />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 sm:mt-16 mb-12 sm:mb-20">
              <div className="font-serif italic text-faint mb-4">
                — ✦ —
              </div>
              <Link href="/notebook" className="btn-ghost">
                ← back to my notebook
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: Margin column — metadata + TOC */}
          <motion.aside 
            variants={itemVariants}
            className="hidden lg:block"
          >
            <div className="sticky top-[80px] pt-[8px]">
              {/* Date */}
              <div className="font-mono text-[11px] text-faint uppercase tracking-[0.05em]">
                {post.date}
              </div>

              {/* Read time */}
              {post.readTime && (
                <div className="font-mono text-[11px] text-faint mt-1.5">
                  {post.readTime}
                </div>
              )}

              {/* Category */}
              {post.category && (
                <div className="mt-5">
                  <div className="font-mono text-[9px] text-faint uppercase tracking-[0.1em] mb-1">
                    Section
                  </div>
                  <div className="font-mono text-[12px] text-muted">
                    {post.category}
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-5">
                  <div className="font-mono text-[9px] text-faint uppercase tracking-[0.1em] mb-2">
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Clean minimal TOC */}
              {headings.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="font-mono text-[9px] text-faint uppercase tracking-[0.1em] mb-4">
                    On this page
                  </div>
                  <nav className="flex flex-col gap-0">
                    {headings.map((h) => {
                      const isActive = activeId === h.id;
                      return (
                        <button 
                          key={h.id}
                          onClick={() => {
                            const el = document.getElementById(h.id);
                            if (el) {
                              const y = el.getBoundingClientRect().top + window.scrollY - 100;
                              window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                          }}
                          className={`text-left py-[5px] font-mono text-[11px] leading-[1.5] transition-colors duration-200 ${
                            h.level === 3 ? 'pl-3' : ''
                          } ${
                            isActive 
                              ? 'text-gold' 
                              : 'text-faint hover:text-muted'
                          }`}
                        >
                          {h.text}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              )}
            </div>
          </motion.aside>
        </div>

        {/* Mobile-only metadata */}
        <div className="lg:hidden mt-4 mb-6 sm:mb-8">
          <div className="font-mono text-[12px] text-faint uppercase">
            {post.date}
            {post.readTime && <span className="ml-3">· {post.readTime}</span>}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
