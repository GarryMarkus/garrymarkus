"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Post } from "@/lib/posts";
import { MarkdownContent } from "@/components/MarkdownContent";

export function FullPostClient({ post }: { post: Post }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
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
        <motion.div variants={itemVariants} className="pt-[24px]">
          <Link 
            href="/notebook" 
            className="font-mono text-[12px] text-muted hover:text-gold transition-colors"
          >
            ← back to my notebook
          </Link>
        </motion.div>

        <div className="mt-12">
          {post.tags && post.tags.length > 0 && (
            <motion.div variants={itemVariants} className="flex gap-2 mb-3">
              {post.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          <motion.h1 
            variants={itemVariants}
            className="font-serif text-[52px] font-normal italic text-ink leading-[1.1]"
          >
            {post.title}
          </motion.h1>

          <motion.div variants={itemVariants} className="mt-4">
            <div className="font-mono text-[12px] text-faint uppercase">
              {post.date}
            </div>
            <div className="w-16 border-t-[1.5px] border-gold mt-6" />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-10">
          <MarkdownContent html={post.contentHtml || ""} />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 mb-20 text-center">
          <div className="font-serif italic text-faint mb-4">
            — ✦ —
          </div>
          <Link 
            href="/notebook" 
            className="btn-ghost"
          >
            ← back to my notebook
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
