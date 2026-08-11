"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight, LayoutGrid, LockKeyhole, GitBranch, Terminal, BarChart2, FileText } from "lucide-react";
import { Post } from "@/lib/posts";
import { categories as CATEGORIES } from "@/lib/posts.gen";

interface NotebookArchiveProps {
  posts: Post[];
}

const CAT_ICONS: Record<string, any> = {
  "All": LayoutGrid,
  "CyberSecurity": LockKeyhole,
  "DSA": GitBranch,
  "Go": Terminal,
  "Numpy": BarChart2
};

export function NotebookArchive({ posts }: NotebookArchiveProps) {
  const router = useRouter();
  const allCategories = useMemo(() => ["All", ...CATEGORIES], []);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const savedCategory = sessionStorage.getItem("notebook_active_category");
    if (savedCategory && allCategories.includes(savedCategory)) {
      setSelectedCategory(savedCategory);
    }
  }, [allCategories]);

  useEffect(() => {
    if (selectedCategory) sessionStorage.setItem("notebook_active_category", selectedCategory);
  }, [selectedCategory]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter(p => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    CATEGORIES.forEach(cat => {
      counts[cat] = posts.filter(p => p.category === cat).length;
    });
    return counts;
  }, [posts]);

  return (
    <div className="w-full min-h-[calc(100vh-56px)] flex flex-col md:flex-row bg-transparent">
      
      {/* ── SIDEBAR (Navigation) ── */}
      <aside className="w-full md:w-72 flex-shrink-0 border-r border-border/30 bg-bg z-20 md:h-[calc(100vh-56px)] overflow-y-auto flex flex-col">
        {/* Sections Block */}
        <div className="p-6 md:p-8 pb-4">
          <div className="font-mono text-[10px] text-faint uppercase tracking-widest">
            System Index
          </div>
        </div>
        
        <div className="flex-1 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-[1px] bg-border/50 border-y border-border/50 w-full">
            {allCategories.map((cat, idx) => {
              const Icon = CAT_ICONS[cat] || FileText;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    group relative flex flex-col justify-between p-4 sm:p-5 md:p-4 aspect-square transition-all duration-150 text-left overflow-hidden
                    ${
                      selectedCategory === cat
                        ? "opacity-100 bg-white/[0.02] text-ink"
                        : "opacity-35 hover:opacity-70 bg-bg text-faint hover:text-ink"
                    }
                  `}
                >
                  <div className="relative z-10 flex justify-between items-start w-full">
                    <span className={`font-mono text-[9px] transition-colors ${selectedCategory === cat ? 'text-ink/60' : 'text-muted/40 group-hover:text-muted'}`}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className={`font-mono text-[9px] transition-colors ${selectedCategory === cat ? 'text-gold' : 'group-hover:text-gold'}`}>
                      [{categoryCounts[cat]}]
                    </span>
                  </div>
                  
                  {/* Elemental Icon */}
                  <div className="flex-1 flex items-center justify-center w-full z-10">
                    <Icon className={`w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5px] transition-all duration-150 ${selectedCategory === cat ? 'text-gold' : 'text-muted/40 group-hover:text-ink/70'}`} />
                  </div>
                  
                  <span className={`relative z-10 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest break-words leading-tight transition-colors ${selectedCategory === cat ? 'font-bold text-ink' : ''}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
            
            {/* Filler Block for odd numbers */}
            {allCategories.length % 2 !== 0 && (
              <div className="hidden md:block bg-bg relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--ink)_1px,_transparent_1px)] bg-[size:8px_8px]" />
              </div>
            )}
          </div>
        </div>

      </aside>

      {/* ── MAIN CONTENT (Dashboard Grid) ── */}
      <main className="flex-1 p-6 sm:p-10 md:p-12 md:h-[calc(100vh-56px)] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 max-w-4xl">
          <h1 className="font-serif text-[48px] sm:text-[64px] text-ink italic leading-[1.1]">
            Notebook.
          </h1>
          <p className="font-mono text-[13px] text-muted mt-3">
            // Knowledge base, technical guides, and systemic logs. I play the long game. Always.
          </p>
        </div>

        {/* Active Category Context */}
        <div className="flex items-center gap-4 mb-6 border-b border-border/20 pb-4">
          <span className="font-mono text-[11px] text-faint">
            // viewing:
          </span>
          <span className="font-mono text-[11px] text-ink font-bold uppercase tracking-widest">
            {selectedCategory}
          </span>
          <span className="font-mono text-[11px] text-gold">
            [{filteredPosts.length} {filteredPosts.length === 1 ? 'entry' : 'entries'}]
          </span>
        </div>

        {/* Posts Grid (Masonry CSS columns approach) */}
        <div className="max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {filteredPosts.length === 0 ? (
                <div className="py-32 text-center font-mono text-muted text-[12px] uppercase tracking-wider border border-dashed border-border/40 rounded-lg">
                  No entries found in this section.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30 border border-border/30">
                  {filteredPosts.map((post) => (
                    <button
                      key={post.slug}
                      onClick={() => router.push(`/notebook/${post.slug}`)}
                      className="group w-full text-left bg-bg hover:bg-surface p-6 transition-colors duration-150 relative flex flex-col h-full"
                    >
                      {/* Top Meta Bar */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="font-mono text-[9px] text-faint uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1 h-1 bg-gold/50 group-hover:bg-gold transition-colors duration-150" />
                          {post.category}
                        </div>
                        <div className="font-mono text-[10px] text-faint group-hover:text-muted transition-colors duration-150 shrink-0 ml-4">
                          {new Date(post.rawDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-3 flex-1">
                        <h2 className="font-serif text-[20px] sm:text-[22px] text-ink leading-[1.25] group-hover:text-gold group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4 group-hover:decoration-[0.5px] transition-colors duration-150 pr-8">
                          {post.title}
                        </h2>
                        
                        {post.excerpt && (
                          <p className="font-mono text-[11px] sm:text-[12px] text-muted leading-relaxed line-clamp-3 opacity-60 group-hover:opacity-100 transition-opacity duration-150">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-border/20 flex flex-wrap gap-1.5">
                          {post.tags.map(tag => (
                            <span key={tag} className="font-mono text-[9px] text-faint group-hover:text-muted border border-border/30 group-hover:border-border/60 px-1.5 py-0.5 transition-colors duration-150">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Arrow */}
                      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
