import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug, getAllPosts } from "@/lib/posts.js";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} · Technical Notes · Garry Markus`;
    } else {
      document.title = "Document Not Found · Garry Markus";
    }
  }, [post]);

  // Reading progress tracker (pure hairline indicator)
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

  // Sharp industrial Copy buttons on code blocks
  useEffect(() => {
    if (!contentRef.current) return;

    const preBlocks = contentRef.current.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      if (pre.querySelector(".copy-code-btn")) return;

      pre.style.position = "relative";

      const btn = document.createElement("button");
      btn.className = "copy-code-btn";
      btn.innerText = "Copy";
      btn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: #14171d;
        border: 1px solid #282f3b;
        color: #9ca3af;
        font-family: monospace;
        font-size: 11px;
        padding: 3px 8px;
        border-radius: 0px;
        cursor: pointer;
        transition: all 0.1s ease;
      `;

      btn.addEventListener("click", () => {
        const code = pre.querySelector("code");
        const text = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(text).then(() => {
          btn.innerText = "Copied";
          btn.style.color = "#10b981";
          btn.style.borderColor = "#10b981";
          setTimeout(() => {
            btn.innerText = "Copy";
            btn.style.color = "#9ca3af";
            btn.style.borderColor = "#282f3b";
          }, 2000);
        });
      });

      pre.appendChild(btn);
    });
  }, [post]);

  if (!post) {
    return (
      <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-10 text-center flex flex-col items-center justify-center gap-4 max-w-lg mx-auto font-mono text-xs">
        <div className="text-rose-400 font-semibold tracking-wider">
          DOCUMENT NOT FOUND
        </div>
        <p className="text-[var(--color-text-muted)] font-sans leading-relaxed">
          The requested technical note &quot;{slug}&quot; could not be resolved in the static compiled Obsidian knowledge vault.
        </p>
        <Link
          to="/blog"
          className="mt-2 px-4 py-2 border border-[var(--color-border-medium)] bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-primary)] hover:border-white transition-colors no-underline"
        >
          Return to Publications Index →
        </Link>
      </div>
    );
  }

  const dateObj = new Date(post.rawDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="relative">
      {/* Hairline Reading Progress Line */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[2px] bg-white z-[60] transition-all duration-75"
      />

      <article className="flex flex-col gap-8 max-w-3xl">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-muted)] border-b border-[var(--color-border-hairline)] pb-3">
          <Link
            to="/blog"
            className="text-[var(--color-text-primary)] hover:underline no-underline"
          >
            Publications
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text-secondary)]">{post.category}</span>
          <span>/</span>
          <span className="text-[var(--color-text-muted)] truncate">{post.slug}</span>
        </div>

        {/* Structured Document Header Ledger */}
        <header className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-6 sm:p-7 flex flex-col gap-5 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-hairline)] pb-3 text-[11px] text-[var(--color-text-muted)]">
            <span className="text-[var(--color-text-primary)] font-semibold">
              Technical Document Specification
            </span>
            <span>Static Client Delivery</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[var(--color-text-primary)] leading-[1.2] tracking-tight">
              {post.title}
            </h1>
          </div>

          {/* Metadata Table */}
          <table className="w-full text-[11px] border-collapse">
            <tbody className="divide-y divide-[var(--color-border-hairline)] border-y border-[var(--color-border-hairline)]">
              <tr>
                <td className="py-1.5 text-[var(--color-text-muted)] w-1/3">Discipline</td>
                <td className="py-1.5 text-[var(--color-text-primary)]">{post.category}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-[var(--color-text-muted)]">Publication Date</td>
                <td className="py-1.5 text-[var(--color-text-primary)]">{formattedDate}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-[var(--color-text-muted)]">Reading Estimate</td>
                <td className="py-1.5 text-[var(--color-text-primary)]">{post.readTime}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-[var(--color-text-muted)]">Author</td>
                <td className="py-1.5 text-[var(--color-text-primary)]">Prem Singh (@GarryMarkus)</td>
              </tr>
            </tbody>
          </table>

          {post.excerpt && (
            <p className="text-xs font-sans text-[var(--color-text-secondary)] leading-relaxed italic bg-[var(--color-bg-base)] p-3 border border-[var(--color-border-hairline)]">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Article Body */}
        <div
          ref={contentRef}
          className="prose max-w-none w-full"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Adjacent Publication Navigation */}
        <footer className="pt-6 border-t border-[var(--color-border-hairline)] mt-6 flex flex-col gap-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="p-4 border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-strong)] transition-colors no-underline flex flex-col gap-1"
              >
                <span className="text-[10px] text-[var(--color-text-muted)]">← Previous Publication</span>
                <span className="font-display font-semibold text-xs text-[var(--color-text-primary)] truncate">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="p-4 border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-strong)] transition-colors no-underline flex flex-col gap-1 sm:text-right"
              >
                <span className="text-[10px] text-[var(--color-text-muted)]">Next Publication →</span>
                <span className="font-display font-semibold text-xs text-[var(--color-text-primary)] truncate">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-hairline)] text-[11px] text-[var(--color-text-muted)]">
            <Link
              to="/blog"
              className="text-[var(--color-text-primary)] hover:underline no-underline"
            >
              ← Back to All Publications
            </Link>

            <span>Compiled with Obsidian & KaTeX</span>
          </div>
        </footer>

      </article>
    </div>
  );
}
