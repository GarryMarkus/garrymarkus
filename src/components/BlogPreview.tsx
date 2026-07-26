"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Post } from "@/lib/posts";
import { MarkdownContent } from "./MarkdownContent";

interface BlogPreviewProps {
  post?: Post;
  selectedCategory?: string;
}

export function BlogPreview({ post, selectedCategory = "default" }: BlogPreviewProps) {
  const router = useRouter();

  if (!post) {
    return (
      <div className="h-full bg-bg flex items-center justify-center">
        <span className="font-courier text-[11px] uppercase text-faint tracking-[0.07em]">
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
        <div className="flex items-center justify-between px-5 py-[10px] gap-3">
          <div className="font-courier text-[11px] uppercase text-faint tracking-[0.07em] min-w-0 truncate">
            {"//"} {truncatedTitle}
          </div>
          <button 
            onClick={() => router.push(`/notebook/${post.slug}`)}
            className="btn-primary !text-[10px] !py-[7px] !px-4 shrink-0 whitespace-nowrap"
          >
            Open full post →
          </button>
        </div>
        <div className="border-b border-border w-full" />
      </div>

      <div className="px-4 md:px-10 py-6 md:py-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${post.slug}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2 }}
          >
            {post.contentHtml ? (
              <MarkdownContent html={post.contentHtml} />
            ) : (
              <div className="font-courier text-faint text-[13px]">
                Loading content...
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}