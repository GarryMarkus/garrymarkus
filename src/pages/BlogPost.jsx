import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/lib/posts.js";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | GarryMarkus`;
    } else {
      document.title = "Not Found | GarryMarkus";
    }
  }, [post]);

  if (!post) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center py-20 animate-page-enter">
        <h1 className="text-4xl font-semibold">Post Not Found</h1>
        <p className="font-mono text-sm text-[var(--color-text-muted)]">
          The requested article does not exist.
        </p>
        <Link
          to="/blog"
          className="font-mono text-xs mt-4 text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] px-4 py-2 hover:bg-[var(--color-border-subtle)] transition-colors no-underline"
        >
          ← Back to Blog
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
    <article className="flex flex-col gap-10 animate-page-enter">
      <header className="flex flex-col gap-4 border-b border-[var(--color-border-subtle)] pb-8">
        <Link
          to="/blog"
          className="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors inline-flex items-center gap-2 mb-2 no-underline"
        >
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
