"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Post } from "@/lib/posts";
import { BlogList } from "./BlogList";
import { BlogPreview } from "./BlogPreview";

interface BlogSplitViewProps {
  posts: Post[];
}

import { categories as CATEGORIES, latestSlugs as LATEST_SLUGS } from "@/lib/posts.gen";

export function BlogSplitView({ posts }: BlogSplitViewProps) {
  const allCategories = useMemo(() => ["Latest", ...CATEGORIES], []);
  const defaultCategory = allCategories[0];
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedSlug, setSelectedSlug] = useState<string>("");

  useEffect(() => {
    const savedCategory = sessionStorage.getItem("notebook_active_category");
    if (savedCategory && allCategories.includes(savedCategory)) {
      setSelectedCategory(savedCategory);
    }
    
    const savedSlug = sessionStorage.getItem("notebook_active_slug");
    if (savedSlug) {
      setSelectedSlug(savedSlug);
    }
  }, [allCategories]);

  useEffect(() => {
    if (selectedCategory) sessionStorage.setItem("notebook_active_category", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSlug) sessionStorage.setItem("notebook_active_slug", selectedSlug);
  }, [selectedSlug]);

  const filteredPosts = useMemo(() => {
    let filtered;
    if (selectedCategory === "Latest") {
      // Show only the posts that were newly added or updated in the most recent compile
      filtered = posts
        .filter(p => LATEST_SLUGS.some(ls => ls.slug === p.slug))
        .sort((a, b) => b.rawDate.localeCompare(a.rawDate));
    } else {
      // For standard categories, return the posts (which are pre-sorted oldest first)
      filtered = posts.filter(p => p.category === selectedCategory);
    }
    
    return filtered.map(p => ({
      ...p,
      latestStatus: LATEST_SLUGS.find(ls => ls.slug === p.slug)?.status
    }));
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
        className="h-full md:h-full overflow-hidden flex flex-col"
      >
        <BlogList 
          posts={filteredPosts} 
          selectedSlug={selectedSlug} 
          onSelect={setSelectedSlug}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={allCategories}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="hidden md:flex md:h-full overflow-hidden flex-col"
      >
        <BlogPreview post={selectedPost} selectedCategory={selectedCategory} />
      </motion.div>
    </div>
  );
}
