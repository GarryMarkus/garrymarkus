import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Prem Singh",
};

export default function Blog() {
  const posts = getAllPosts();

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());

  return (
    <div className="flex flex-col gap-12">
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
              <Link href={`/blog/${post.slug}`} className="hover:underline text-lg text-[var(--color-text-primary)] leading-snug">
                {post.title}
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}
