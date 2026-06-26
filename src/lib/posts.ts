import { posts as genPosts, GeneratedPost } from "./posts.gen";

export interface Post extends GeneratedPost {}

export function getAllPosts(): Post[] {
  return genPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return genPosts.find((p) => p.slug === slug);
}
