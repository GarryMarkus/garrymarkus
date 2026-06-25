import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  description: string;
  readTime: number;
  slug: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter(dir => {
    return fs.statSync(path.join(postsDirectory, dir)).isDirectory();
  });
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, slug, "README.md");
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    meta: {
      ...data,
      slug,
    } as PostMetadata,
    content,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is NonNullable<ReturnType<typeof getPostBySlug>> => post !== null)
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
}
