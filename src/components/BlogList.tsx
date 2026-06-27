"use client";

import { Post } from "@/lib/posts";
import { useRouter } from "next/navigation";

interface BlogListProps {
  posts: Post[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}

export function BlogList({ posts, selectedSlug, onSelect }: BlogListProps) {
  const router = useRouter();
  return (
    <div className="h-full overflow-y-auto bg-surface border-r border-border custom-scrollbar">
      <div className="sticky top-0 bg-surface z-10">
        <div className="py-3 px-5 font-mono text-[11px] uppercase text-faint tracking-[0.07em]">
          // my notebook
        </div>
        <div className="border-b border-border w-full" />
      </div>

      <div className="flex flex-col">
        {posts.map((post) => {
          const isSelected = post.slug === selectedSlug;
          return (
            <button
              key={post.slug}
              onClick={() => onSelect(post.slug)}
              onDoubleClick={() => router.push(`/notebook/${post.slug}`)}
              className={`
                text-left py-[18px] px-5 border-b border-border transition-all duration-150 ease-out
                ${isSelected 
                  ? "border-l-[3px] border-l-gold bg-surface-2 pl-[17px]" 
                  : "border-l-[3px] border-l-border hover:bg-black/5"
                }
              `}
            >
              <div className="font-mono text-[11px] text-faint uppercase">
                {post.date}
              </div>
              <h2 className="font-serif text-[21px] text-ink font-normal leading-[1.25] mt-1">
                {post.title}
              </h2>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.excerpt && (
                <p className="font-serif text-[15px] text-muted mt-1.5 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
