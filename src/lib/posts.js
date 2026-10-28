import { posts as genPosts, categories as genCategories } from "./posts.gen.js";

export function getAllPosts() {
  return genPosts;
}

export function getAllCategories() {
  return genCategories;
}

export function getPostBySlug(slug) {
  return genPosts.find((p) => p.slug === slug);
}
