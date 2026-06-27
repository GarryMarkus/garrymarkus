"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Post } from "@/lib/posts";
import { BlogList } from "./BlogList";
import { BlogPreview } from "./BlogPreview";

interface BlogSplitViewProps {
  posts: Post[];
}

export function BlogSplitView({ posts }: BlogSplitViewProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>("");

  useEffect(() => {
    if (posts.length > 0 && !selectedSlug) {
      setSelectedSlug(posts[0].slug);
    }
  }, [posts, selectedSlug]);

  const selectedPost = posts.find(p => p.slug === selectedSlug);

  return (
    <div className="flex flex-col md:grid md:grid-cols-[340px_1fr] h-full">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="h-1/2 md:h-full overflow-hidden"
      >
        <BlogList 
          posts={posts} 
          selectedSlug={selectedSlug} 
          onSelect={setSelectedSlug} 
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="h-1/2 md:h-full overflow-hidden"
      >
        <BlogPreview post={selectedPost} />
      </motion.div>
    </div>
  );
}
