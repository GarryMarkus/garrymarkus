"use client";

import { Post } from "@/lib/posts";
import { useRouter } from "next/navigation";

interface BlogListProps {
  posts: Post[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  categories?: string[];
}

export function BlogList({ 
  posts, 
  selectedSlug, 
  onSelect,
  selectedCategory,
  onSelectCategory,
  categories
}: BlogListProps) {
  const router = useRouter();
  
  return (
    <div className="flex flex-col h-full bg-surface border-r border-border">
      <div className="flex-shrink-0 sticky top-0 bg-surface z-10">
        <div className="py-2.5 sm:py-3 px-4 sm:px-5 font-courier text-[11px] uppercase text-faint tracking-[0.07em]">
          {"//"} my notebook
        </div>
        
        {/* Category Tabs */}
        {categories && onSelectCategory && selectedCategory && (
          <div className="flex px-2 sm:px-3 pb-1.5 sm:pb-2 gap-1.5 sm:gap-2 overflow-x-auto custom-scrollbar border-b border-border">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`
                  px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-courier tracking-wider rounded-sm transition-colors
                  ${selectedCategory === cat 
                    ? "bg-gold text-surface-2 font-semibold" 
                    : "text-muted hover:text-ink hover:bg-black/5"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        
        {!categories && (
           <div className="border-b border-border w-full" />
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-surface">
        {posts.length === 0 ? (
          <div className="p-5 text-faint font-courier text-[11px] uppercase text-center mt-10">
            No posts found in this category.
          </div>
        ) : (
          <div className="flex flex-col">
            {posts.map((post) => {
              const isSelected = post.slug === selectedSlug;
              return (
                <button
                  key={post.slug}
                  onClick={() => onSelect(post.slug)}
                  onDoubleClick={() => router.push(`/notebook/${post.slug}`)}
                  className={`
                    text-left py-[14px] sm:py-[18px] px-4 sm:px-5 border-b border-border transition-all duration-150 ease-out
                    ${isSelected 
                      ? "border-l-[3px] border-l-gold bg-surface-2 pl-[13px] sm:pl-[17px]" 
                      : "border-l-[3px] border-l-border hover:bg-black/5"
                    }
                  `}
                >
                  <div className="font-courier text-[11px] text-faint uppercase">
                    {post.date}
                  </div>
                  <h2 className="font-courier text-[14px] sm:text-[16px] text-ink font-semibold leading-[1.4] mt-1">
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
                    <p className="font-courier text-[12px] sm:text-[13px] text-muted mt-1.5 line-clamp-2 leading-[1.5]">
                      {post.excerpt}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
