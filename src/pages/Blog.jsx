import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "@/lib/posts.js";

export default function Blog() {
  useEffect(() => {
    document.title = "Blog | GarryMarkus";
  }, []);

  const posts = useMemo(() => {
    const rawPosts = getAllPosts();
    return [...rawPosts].sort(
      (a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
    );
  }, []);

  return (
    <div className="flex flex-col gap-12 animate-page-enter">
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Technical Log</h1>
        <p className="text-[var(--color-text-muted)]">Notes on systems engineering, algorithm design, and software architecture.</p>
      </section>

      <section className="flex flex-col gap-4">
        {posts.map((post) => {
          const dateObj = new Date(post.rawDate);
          const yyyyMm = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
          
          return (
            <article key={post.slug} className="flex gap-6 items-baseline">
              <time className="font-mono text-sm text-[var(--color-text-muted)] shrink-0 w-20">
                {yyyyMm}
              </time>
              <Link to={`/blog/${post.slug}`} className="hover:underline text-lg text-[var(--color-text-primary)] leading-snug">
                {post.title}
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}
