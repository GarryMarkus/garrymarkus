"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Post } from "@/lib/posts";
import { MarkdownContent } from "./MarkdownContent";

interface BlogPreviewProps {
  post?: Post;
}

export function BlogPreview({ post }: BlogPreviewProps) {
  const router = useRouter();

  if (!post) {
    return (
      <div className="h-full bg-bg flex items-center justify-center">
        <span className="font-mono text-[11px] uppercase text-faint tracking-[0.07em]">
          No post selected
        </span>
      </div>
    );
  }

  const truncatedTitle = post.title.length > 40 
    ? post.title.substring(0, 40) + "..." 
    : post.title;

  return (
    <motion.div 
      className="h-full overflow-y-auto bg-bg custom-scrollbar relative"
    >
      <div className="sticky top-0 bg-bg z-10">
        <div className="flex items-center justify-between px-5 py-[10px]">
          <div className="font-mono text-[11px] uppercase text-faint tracking-[0.07em]">
            // {truncatedTitle}
          </div>
          <button 
            onClick={() => router.push(`/notebook/${post.slug}`)}
            className="btn-primary !text-[10px] !py-[7px] !px-4"
          >
            Open full post →
          </button>
        </div>
        <div className="border-b border-border w-full" />
      </div>

      <div className="px-10 py-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ 
              duration: 0.2, 
              exit: { duration: 0.12 }
            }}
          >
            {post.contentHtml ? (
              <MarkdownContent html={post.contentHtml} />
            ) : (
              <div className="font-mono text-faint text-[13px]">
                Loading content...
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
