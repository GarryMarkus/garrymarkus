import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/lib/posts.js";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} · Technical Log · Garry Markus`;
    } else {
      document.title = "Post Not Found · Garry Markus";
    }
  }, [post]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add interactive Copy buttons to code blocks
  useEffect(() => {
    if (!contentRef.current) return;

    const preBlocks = contentRef.current.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      if (pre.querySelector(".copy-code-btn")) return; // already added

      pre.style.position = "relative";

      const btn = document.createElement("button");
      btn.className = "copy-code-btn";
      btn.innerText = "Copy";
      btn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: #94a3b8;
        font-family: monospace;
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.15s ease;
      `;

      btn.addEventListener("click", () => {
        const code = pre.querySelector("code");
        const text = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(text).then(() => {
          btn.innerText = "Copied!";
          btn.style.color = "#10b981";
          btn.style.borderColor = "#10b981";
          setTimeout(() => {
            btn.innerText = "Copy";
            btn.style.color = "#94a3b8";
            btn.style.borderColor = "rgba(255, 255, 255, 0.15)";
          }, 2000);
        });
      });

      pre.appendChild(btn);
    });
  }, [post]);

  if (!post) {
    return (
      <div className="glass-card rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4 animate-page-enter max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-mono text-lg">
          404
        </div>
        <h1 className="text-2xl font-display font-bold text-[var(--color-text-primary)]">
          Article Not Found
        </h1>
        <p className="text-sm font-mono text-[var(--color-text-muted)]">
          The requested technical note could not be located in the knowledge base.
        </p>
        <Link
          to="/blog"
          className="mt-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs transition-colors no-underline"
        >
          ← Return to Technical Log
        </Link>
      </div>
    );
  }

  const dateObj = new Date(post.rawDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative animate-page-enter">
      {/* Viewport Reading Progress Bar */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 z-[60] transition-all duration-75"
      />

      <article className="flex flex-col gap-8 max-w-3xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-muted)]">
          <Link
            to="/blog"
            className="text-blue-400 hover:underline flex items-center gap-1.5 no-underline"
          >
            <span>←</span>
            <span>Technical Log</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text-secondary)]">{post.category}</span>
        </div>

        {/* Article Header */}
        <header className="flex flex-col gap-4 border-b border-[var(--color-border-subtle)] pb-8">
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
              {post.category}
            </span>
            <span className="text-[var(--color-text-muted)]">·</span>
            <span className="text-[var(--color-text-muted)]">{formattedDate}</span>
            <span className="text-[var(--color-text-muted)]">·</span>
            <span className="text-[var(--color-text-muted)]">{post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--color-text-primary)] leading-[1.2] tracking-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed border-l-2 border-blue-500/40 pl-3.5 my-1">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Article Body */}
        <div
          ref={contentRef}
          className="prose prose-invert max-w-none w-full"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Article Footer */}
        <footer className="pt-8 border-t border-[var(--color-border-subtle)] mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--color-text-muted)]">
          <Link
            to="/blog"
            className="text-blue-400 hover:text-blue-300 no-underline flex items-center gap-1.5"
          >
            <span>←</span>
            <span>Back to all notes</span>
          </Link>

          <span>Garry Markus Knowledge Base</span>
        </footer>

      </article>
    </div>
  );
}
