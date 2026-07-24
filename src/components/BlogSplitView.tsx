"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Post } from "@/lib/posts";
import { BlogList } from "./BlogList";
import { BlogPreview } from "./BlogPreview";

interface BlogSplitViewProps {
  posts: Post[];
}

import { categories as CATEGORIES } from "@/lib/posts.gen";

export function BlogSplitView({ posts }: BlogSplitViewProps) {
  // If the dynamic categories list is empty (e.g. no folders exist yet), fallback to something safe
  const defaultCategory = CATEGORIES.length > 0 ? CATEGORIES[0] : "CyberSecurity";
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedSlug, setSelectedSlug] = useState<string>("");

  useEffect(() => {
    const savedCategory = sessionStorage.getItem("notebook_active_category");
    if (savedCategory && CATEGORIES.includes(savedCategory)) {
      setSelectedCategory(savedCategory);
    }
    
    const savedSlug = sessionStorage.getItem("notebook_active_slug");
    if (savedSlug) {
      setSelectedSlug(savedSlug);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) sessionStorage.setItem("notebook_active_category", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSlug) sessionStorage.setItem("notebook_active_slug", selectedSlug);
  }, [selectedSlug]);

  const filteredPosts = useMemo(() => {
    return posts.filter(p => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  useEffect(() => {
    // If no post is selected, or if the selected post is not in the current category
    if (filteredPosts.length > 0) {
      const currentPostValid = filteredPosts.some(p => p.slug === selectedSlug);
      if (!currentPostValid) {
        setSelectedSlug(filteredPosts[0].slug);
      }
    } else {
      setSelectedSlug("");
    }
  }, [filteredPosts, selectedSlug]);

  const selectedPost = posts.find(p => p.slug === selectedSlug);

  return (
    <div className="flex flex-col md:grid md:grid-cols-[340px_1fr] h-full">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="h-1/2 md:h-full overflow-hidden flex flex-col"
      >
        <BlogList 
          posts={filteredPosts} 
          selectedSlug={selectedSlug} 
          onSelect={setSelectedSlug}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={CATEGORIES}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="h-1/2 md:h-full overflow-hidden flex flex-col"
      >
        <BlogPreview post={selectedPost} />
      </motion.div>
    </div>
  );
}
