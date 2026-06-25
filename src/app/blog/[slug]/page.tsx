import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { WindowChrome } from "@/components/WindowChrome";
import { TableOfContents } from "@/components/TableOfContents";
import Link from "next/link";
import React from "react";

// Provide custom MDX components for terminal styling
const mdxComponents = {
  h2: (props: any) => (
    <h2 {...props} className="mt-8 mb-4 text-[1.1rem] font-medium text-[var(--text-primary)] font-mono">
      <span className="text-[var(--accent-pink)]">## </span>
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 {...props} className="mt-6 mb-3 text-[0.95rem] font-normal text-[var(--accent-cyan)] font-mono">
      <span className="text-[var(--text-muted)]">### </span>
      {props.children}
    </h3>
  ),
  p: (props: any) => (
    <p className="text-[var(--text-secondary)] leading-[1.9] mb-[1.6em] font-mono text-[14px]" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-[1.6em] text-[var(--text-secondary)] font-mono text-[14px]" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-[1.6em] text-[var(--text-secondary)] font-mono text-[14px]" {...props} />
  ),
  li: (props: any) => (
    <li className="mb-2" {...props} />
  ),
  pre: (props: any) => (
    <WindowChrome title={props.children?.props?.className?.replace("language-", "") || "code"} className="my-6 !shadow-none !border-[rgba(255,255,255,0.05)] hover:shadow-[0_0_0_1px_rgba(189,147,249,0.2)] transition-shadow">
      <pre {...props} className="bg-transparent overflow-x-auto text-[13px] leading-[1.6] custom-scrollbar p-0 m-0 font-mono" />
    </WindowChrome>
  ),
  code: (props: any) => {
    // If it's a block code (inside pre), it will have a language class. 
    // We don't want to style inline code the same way.
    if (props.className) {
      return <code {...props} className={props.className} />;
    }
    return (
      <code className="bg-[rgba(139,233,253,0.1)] text-[var(--accent-cyan)] border border-[rgba(139,233,253,0.2)] rounded-[3px] px-[5px] py-[1px] mx-[2px] font-mono text-[0.9em]" {...props} />
    );
  },
  blockquote: (props: any) => (
    <blockquote className="border-l-[3px] border-[var(--accent-purple)] bg-[rgba(189,147,249,0.05)] p-[10px_16px] my-[1.6em] text-[var(--text-secondary)] italic font-mono text-[14px]" {...props}>
      <span className="text-[var(--accent-pink)] not-italic block mb-1">#</span>
      {props.children}
    </blockquote>
  ),
  a: (props: any) => (
    <a className="text-[var(--accent-cyan)] no-underline hover:underline decoration-dashed hover:text-[var(--accent-purple)] underline-offset-4 font-mono" target={props.href?.startsWith("http") ? "_blank" : undefined} rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined} {...props}>
      {props.children}
      {props.href?.startsWith("http") && <span className="ml-1 text-[11px] no-underline inline-block">↗</span>}
    </a>
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full text-left border-collapse font-mono text-[13px]" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="bg-[var(--bg-surface)] text-[var(--accent-purple)] border-b border-[rgba(189,147,249,0.3)] p-3 font-medium" {...props} />
  ),
  td: (props: any) => (
    <td className="border-b border-[var(--bg-border)] p-3 text-[var(--text-secondary)] group-even:bg-[var(--bg-elevated)]" {...props} />
  ),
  tr: (props: any) => (
    <tr className="group" {...props} />
  ),
  hr: (props: any) => (
    <div className="text-[var(--text-muted)] text-center my-10 select-none font-mono">
      ── ✦ ─────────────────────────────── ✦ ──
    </div>
  ),
  img: (props: any) => (
    <WindowChrome title={props.alt || "image"} className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-full h-auto rounded-[6px]" {...props} />
    </WindowChrome>
  ),
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Find next/prev posts
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null; // Older post
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null; // Newer post

  const lineCount = post.content.split("\n").length;
  const charCount = post.content.length;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start font-mono">
      <TableOfContents />

      <article className="flex-1 min-w-0 max-w-[680px]">
        {/* Post Metadata Header */}
        <WindowChrome title="~/meta.json" className="mb-10">
          <div className="mb-4 text-[var(--text-muted)] font-mono text-[13px]">
            <span className="text-[var(--accent-purple)]">❯</span> cat meta.json
          </div>
          <pre className="font-mono text-[13px] leading-[1.6] whitespace-pre-wrap">
            <span className="text-[var(--text-muted)]">{'{'}</span>
            <br />
            {'  '}<span className="text-[var(--accent-cyan)]">&quot;title&quot;</span><span className="text-[var(--text-muted)]">:</span> <span className="text-[var(--accent-green)]">&quot;{post.meta.title}&quot;</span><span className="text-[var(--text-muted)]">,</span>
            <br />
            {'  '}<span className="text-[var(--accent-cyan)]">&quot;author&quot;</span><span className="text-[var(--text-muted)]">:</span> <span className="text-[var(--accent-green)]">&quot;Garry Markus&quot;</span><span className="text-[var(--text-muted)]">,</span>
            <br />
            {'  '}<span className="text-[var(--accent-cyan)]">&quot;date&quot;</span><span className="text-[var(--text-muted)]">:</span> <span className="text-[var(--accent-green)]">&quot;{post.meta.date}&quot;</span><span className="text-[var(--text-muted)]">,</span>
            <br />
            {'  '}<span className="text-[var(--accent-cyan)]">&quot;readTime&quot;</span><span className="text-[var(--text-muted)]">:</span> <span className="text-[var(--accent-green)]">&quot;{post.meta.readTime} min read&quot;</span><span className="text-[var(--text-muted)]">,</span>
            <br />
            {'  '}<span className="text-[var(--accent-cyan)]">&quot;tags&quot;</span><span className="text-[var(--text-muted)]">:</span> <span className="text-[var(--text-muted)]">[</span>
            {post.meta.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                <span className="text-[var(--accent-green)]">&quot;{tag}&quot;</span>
                {i < post.meta.tags.length - 1 && <span className="text-[var(--text-muted)]">, </span>}
              </React.Fragment>
            ))}
            <span className="text-[var(--text-muted)]">]</span>
            <br />
            <span className="text-[var(--text-muted)]">{'}'}</span>
          </pre>
        </WindowChrome>

        {/* Post Content */}
        <div className="max-w-none">
          <MDXRemote 
            source={post.content} 
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, rehypeHighlight as any],
              }
            }}
          />
        </div>

        {/* Footer info */}
        <div className="mt-16 font-mono text-[13px] text-[var(--text-muted)] flex flex-col gap-1 select-none">
          <div>~</div>
          <div>~</div>
          <div>~</div>
          <div>&quot;{post.slug}.md&quot; {lineCount}L, {charCount}C</div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-[var(--bg-border)]">
          <div className="mb-6 font-mono text-[13px] text-[var(--text-muted)]">
            <span className="text-[var(--accent-purple)]">❯</span> git log --prev / --next
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="block no-underline group">
                <div className="bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-[6px] p-4 transition-all duration-150 group-hover:bg-[var(--bg-elevated)] h-full flex flex-col justify-center">
                  <div className="text-[var(--text-muted)] text-[11px] mb-1">← PREVIOUS</div>
                  <div className="text-[var(--accent-cyan)] group-hover:text-[var(--accent-purple)] group-hover:underline decoration-dashed underline-offset-4 text-[13px]">{prevPost.meta.title}</div>
                </div>
              </Link>
            ) : <div />}
            
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="block no-underline group text-right">
                <div className="bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-[6px] p-4 transition-all duration-150 group-hover:bg-[var(--bg-elevated)] h-full flex flex-col justify-center">
                  <div className="text-[var(--text-muted)] text-[11px] mb-1">NEXT →</div>
                  <div className="text-[var(--accent-cyan)] group-hover:text-[var(--accent-purple)] group-hover:underline decoration-dashed underline-offset-4 text-[13px]">{nextPost.meta.title}</div>
                </div>
              </Link>
            ) : <div />}
          </div>

          <div className="mt-10 mb-8 font-mono text-[13px]">
            <span className="text-[var(--accent-purple)]">❯</span> cd ../blog
            <br />
            <Link href="/blog" className="text-[var(--accent-cyan)] hover:text-[var(--accent-purple)] no-underline mt-2 inline-block">
              [ return to blog list ]
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
