import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="canvas-card">
      <div className="theme-grid">
        
        {/* ── ROW 1: HEADER (Empty for alignment) ──────────────── */}
        <div className="grid-cell cell-align-top header-cell hidden md:flex">
          {/* Left Gutter */}
        </div>
        
        <div className="grid-cell cell-align-top header-cell">
          {/* Keep empty */}
        </div>
        
        <div className="grid-cell cell-align-top header-cell">
          {/* Keep empty */}
        </div>

        {/* ── ROW 2: ARTICLE BODY & LEFT BACK LINK ────────────── */}
        <div className="post-back-cell">
          <Link href="/blog" className="post-back-link inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" style={{ transform: "rotate(90deg)" }} /> 
            Back to Writing
          </Link>
        </div>
        
        <article className="grid-cell span-cols-2 post-article-cell">
          <header className="post-header">
            <div className="post-eyebrow">Technical Essay</div>
            <h1 className="post-detail-title">{post.title}</h1>
            
            <div className="post-detail-meta">
              <span className="font-bold text-neutral-900">{siteConfig.name}</span>
              <span className="text-neutral-300">•</span>
              <span>{post.date}</span>
              <span className="text-neutral-300">•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <section 
            className="post-body-content markdown-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        {/* ── ROW 3: BOTTOM GRID FOOTER BAR (Direct cells) ────── */}
        <div className="grid-cell hidden md:flex">
          {/* Left Gutter */}
        </div>
        
        <Link 
          href="/" 
          className="grid-cell cell-interactive justify-center items-center group"
        >
          <span className="font-display font-bold text-xs tracking-wider uppercase text-neutral-900 group-hover:text-[var(--accent-blue)] transition-colors inline-flex items-center gap-1.5">
            ← BACK TO HOME
          </span>
        </Link>
        
        <Link 
          href="/blog" 
          className="grid-cell cell-interactive justify-center items-center group"
        >
          <span className="font-display font-bold text-xs tracking-wider uppercase text-neutral-900 group-hover:text-[var(--accent-blue)] transition-colors inline-flex items-center gap-1.5">
            ARCHIVE →
          </span>
        </Link>

        {/* ── RIGHT SOCIALS/METADATA SIDEBAR (Spans all rows) ── */}
        <aside className="socials-sidebar">
          <span className="social-vertical-link">
            {siteConfig.name} // ESSAY
          </span>
          <span className="social-vertical-link text-neutral-400">
            {post.readTime}
          </span>
        </aside>

      </div>
    </div>
  );
}
