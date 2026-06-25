import { getAllPosts } from "@/lib/posts";
import { BlogListClient } from "@/components/BlogListClient";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: "Security labs, tech write-ups, and terminal-themed musings.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogListClient posts={posts.map((p) => p.meta)} />;
}
