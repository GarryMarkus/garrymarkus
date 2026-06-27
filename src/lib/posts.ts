import { posts as genPosts, GeneratedPost } from "./posts.gen";

export interface Post extends GeneratedPost {}

export function getAllPosts(): Post[] {
  return genPosts;
}

// Ensure asynchronous signature as expected by the redesigned frontend
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return genPosts.find((p) => p.slug === slug);
}
