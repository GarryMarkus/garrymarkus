import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const post = await getPostBySlug(p.slug);
  if (!post) {
    return { title: "Not Found" };
  }
  return {
    title: `${post.title} | Prem Singh`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const post = await getPostBySlug(p.slug);

  if (!post) {
    notFound();
  }

  const dateObj = new Date(post.rawDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-4 border-b border-[var(--color-border-subtle)] pb-8">
        <Link href="/blog" className="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors inline-flex items-center gap-2 mb-2">
          ← back to index
        </Link>
        <h1 className="text-3xl font-semibold leading-tight">{post.title}</h1>
        <div className="font-mono text-sm text-[var(--color-text-muted)] flex gap-4">
          <time>{formattedDate}</time>
          {post.readTime && <span>· {post.readTime}</span>}
          <span>· {post.category}</span>
        </div>
      </header>

      <div 
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
