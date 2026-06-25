import Link from "next/link";
import { PostMetadata } from "@/lib/posts";

interface BlogCardProps {
  post: PostMetadata;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline group">
      <div className="bg-[var(--bg-surface)] border-2 border-black rounded-[20px] p-4 transition-all duration-150 group-hover:bg-[var(--bg-elevated)] shadow-brutal-sm group-hover:shadow-brutal group-hover:translate-x-[-1px] group-hover:translate-y-[-1px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2.5 text-[12px] text-[var(--text-muted)] font-mono gap-1">
          <div className="flex gap-3 overflow-hidden font-medium">
            <span className="hidden sm:inline-block w-[75px] text-[var(--text-muted)]">-rw-r--r--</span>
            <span className="flex-shrink-0 text-[var(--text-secondary)]">{post.date}</span>
            <span className="text-[var(--accent-lime)] font-semibold truncate">{post.slug}/README.md</span>
          </div>
          <span className="flex-shrink-0 font-semibold text-[var(--text-secondary)]">{post.readTime} min read</span>
        </div>

        <h3 className="font-headings font-extrabold text-[15px] sm:text-[16px] text-white mb-1.5 group-hover:text-[var(--accent-lime)] transition-colors">
          {post.title}
        </h3>

        <p className="text-[var(--text-secondary)] text-[12px] sm:text-[13px] mb-3.5 leading-[1.6] font-medium">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[var(--bg-base)] text-white border border-white/10 rounded-[6px] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm group-hover:border-black"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
