import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MarkdownContent } from "@/components/MarkdownContent";
import { FullPostClient } from "./FullPostClient";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-bg">
      <div className="max-w-[680px] mx-auto px-6 pb-20">
        <FullPostClient post={post} />
      </div>
    </div>
  );
}
