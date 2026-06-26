import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Writing | ${siteConfig.name}`,
  description: "Essays on security, chess & building things.",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="canvas-card">
      <div className="theme-grid">
        
        {/* ── ROW 1: HEADER & BACK BUTTON ─────────────────────── */}
        <div className="grid-cell cell-align-top header-cell hidden md:flex">
          {/* Gutter */}
        </div>
        
        <div className="grid-cell cell-align-top header-cell">
          <Link href="/" className="font-display font-bold text-xs tracking-wider uppercase text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
        
        <div className="grid-cell cell-align-top header-cell">
          {/* Keep empty for now */}
        </div>

        {/* ── ROW 2: SECTION TITLE ───────────────────────────── */}
        <div className="grid-cell hidden md:flex">
          {/* Gutter */}
        </div>
        
        <div className="grid-cell span-cols-2">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2 block">
            Essays &amp; Musings
          </span>
          <h1 className="hero-name">Writing</h1>
          <p className="body-lead mt-4">
            <mark className="bg-[#fef08a] px-1.5 py-0.5 rounded text-neutral-900 font-semibold">
              Essays on security, chess &amp; building things.
            </mark>
          </p>
        </div>

        {/* ── ROWS FOR DYNAMIC BLOG POSTS ───────────────────── */}
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-row-container">
            {/* Column 1: Date */}
            <div className="grid-cell cell-interactive blog-cell-date">
              {post.date}
            </div>
            
            {/* Column 2: Title and Excerpt */}
            <div className="grid-cell cell-interactive span-cols-2 blog-cell-content">
              <div className="blog-cell-meta">
                <h3 className="blog-post-title">{post.title}</h3>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
              <p className="blog-post-excerpt">{post.excerpt}</p>
            </div>
          </Link>
        ))}



        {/* ── SOCIALS SIDEBAR ────────────────────────────────── */}
        <aside className="socials-sidebar">
          <a 
            href={siteConfig.contact.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-vertical-link"
          >
            Github
          </a>
          <a 
            href={siteConfig.contact.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-vertical-link"
          >
            Linkedin
          </a>
          <a 
            href={siteConfig.contact.x} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-vertical-link"
          >
            Twitter
          </a>
        </aside>

      </div>
    </div>
  );
}
