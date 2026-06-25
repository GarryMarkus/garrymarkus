import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { WindowChrome } from "@/components/WindowChrome";
import { TableOfContents } from "@/components/TableOfContents";
import { PageTransition } from "@/components/PageTransition";
import { CodeBlockWrapper } from "@/components/CodeBlockWrapper";
import { mdxOptions } from "@/lib/mdx";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

function extractLanguage(className?: string): string | undefined {
  return className?.replace("language-", "");
}

const mdxComponents = {
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <div className="mt-10 mb-4">
      <div className="border-t-2 border-white/10 border-dashed mb-4 select-none" />
      <h2 {...props} className="font-headings font-extrabold text-[1.3rem] text-white">
        <span className="text-[var(--accent-pink)] font-bold">## </span>
        {props.children}
      </h2>
    </div>
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 {...props} className="mt-6 mb-3 font-headings font-bold text-[1.1rem] text-white">
      <span className="text-[var(--text-muted)] font-bold">### </span>
      {props.children}
    </h3>
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="text-[var(--text-secondary)] leading-[1.8] mb-[1.5em] text-[14px] sm:text-[15px] font-medium" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc list-inside mb-[1.5em] text-[var(--text-secondary)] text-[14px] sm:text-[15px] font-medium" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal list-inside mb-[1.5em] text-[var(--text-secondary)] text-[14px] sm:text-[15px] font-medium" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => <li className="mb-2 pl-1" {...props} />,
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => {
    const child = props.children as React.ReactElement<{ className?: string; children?: string }>;
    const lang = extractLanguage(child?.props?.className);
    return (
      <CodeBlockWrapper language={lang}>
        <pre {...props} className="bg-transparent overflow-x-auto text-[13px] leading-[1.6] p-0 m-0 font-mono hljs" />
      </CodeBlockWrapper>
    );
  },
  code: (props: React.ComponentPropsWithoutRef<"code">) => {
    if (props.className) return <code {...props} className={props.className} />;
    return (
      <code
        className="bg-neutral-800 text-[var(--accent-lime)] border border-white/10 rounded-[3px] px-[5px] py-[1.5px] mx-[2px] font-mono text-[0.85em] font-bold"
        {...props}
      />
    );
  },
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-[var(--accent-purple)] bg-[var(--bg-surface)] p-4 my-6 text-[var(--text-secondary)] italic rounded-r-md"
      {...props}
    >
      {props.children}
    </blockquote>
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-[var(--accent-cyan)] font-bold no-underline hover:underline decoration-dashed hover:text-white underline-offset-4 transition-colors duration-150"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {props.children}
      {props.href?.startsWith("http") && <span className="ml-1 text-[11px] no-underline inline-block">↗</span>}
    </a>
  ),
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-8 border-2 border-white/10 rounded-lg shadow-sm">
      <table className="w-full text-left border-collapse text-[13px] bg-[var(--bg-surface)]" {...props} />
    </div>
  ),
  th: (props: React.ComponentPropsWithoutRef<"th">) => (
    <th
      className="bg-[var(--bg-elevated)] text-white border-b border-white/10 p-3 font-bold"
      {...props}
    />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-white/10 p-3 text-[var(--text-secondary)] even:bg-[var(--bg-elevated)] font-medium" {...props} />
  ),
  hr: () => (
    <div className="text-[var(--text-muted)] text-center my-10 select-none font-bold">
      ── ✦ ─────────────────────────────── ✦ ──
    </div>
  ),
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <WindowChrome title={props.alt || "image"} className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-full h-auto rounded-[6px]" alt={props.alt} src={props.src} />
    </WindowChrome>
  ),
};

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.meta.title} | ${siteConfig.name}`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const lineCount = post.content.split("\n").length;
  const charCount = post.content.length;

  return (
    <PageTransition>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start px-4 py-8 max-w-6xl mx-auto w-full bg-[var(--bg-base)]">
        <TableOfContents slug={slug} />

        <article className="flex-1 min-w-0 max-w-[680px]">
          <WindowChrome title="~/meta.json">
            <div className="mb-4 text-[var(--text-muted)] font-mono text-[13px] font-semibold">
              <span>❯</span> cat meta.json
            </div>
            <pre className="font-mono text-[13px] leading-[1.6] whitespace-pre-wrap">
              <span className="text-[var(--text-muted)]">{"{"}</span>
              <br />
              {"  "}
              <span className="text-[var(--accent-cyan)]">&quot;title&quot;</span>
              <span className="text-[var(--text-muted)]">:</span>{" "}
              <span className="text-[var(--text-primary)] font-bold">&quot;{post.meta.title}&quot;</span>
              <span className="text-[var(--text-muted)]">,</span>
              <br />
              {"  "}
              <span className="text-[var(--accent-cyan)]">&quot;author&quot;</span>
              <span className="text-[var(--text-muted)]">:</span>{" "}
              <span className="text-[var(--text-primary)] font-bold">&quot;{siteConfig.name}&quot;</span>
              <span className="text-[var(--text-muted)]">,</span>
              <br />
              {"  "}
              <span className="text-[var(--accent-cyan)]">&quot;date&quot;</span>
              <span className="text-[var(--text-muted)]">:</span>{" "}
              <span className="text-[var(--text-primary)] font-bold">&quot;{post.meta.date}&quot;</span>
              <span className="text-[var(--text-muted)]">,</span>
              <br />
              {"  "}
              <span className="text-[var(--accent-cyan)]">&quot;readTime&quot;</span>
              <span className="text-[var(--text-muted)]">:</span>{" "}
              <span className="text-[var(--text-primary)] font-bold">&quot;{post.meta.readTime} min read&quot;</span>
              <span className="text-[var(--text-muted)]">,</span>
              <br />
              {"  "}
              <span className="text-[var(--accent-cyan)]">&quot;tags&quot;</span>
              <span className="text-[var(--text-muted)]">:</span>{" "}
              <span className="text-[var(--text-muted)]">[</span>
              {post.meta.tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  <span className="text-[var(--text-primary)] font-bold">&quot;{tag}&quot;</span>
                  {i < post.meta.tags.length - 1 && <span className="text-[var(--text-muted)]">, </span>}
                </React.Fragment>
              ))}
              <span className="text-[var(--text-muted)]">]</span>
              <br />
              <span className="text-[var(--text-muted)]">{"}"}</span>
            </pre>
          </WindowChrome>

          <div className="blog-prose max-w-none mt-10">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: mdxOptions as never }}
            />
          </div>

          <div className="mt-16 font-mono text-[13px] text-[var(--text-muted)] flex flex-col gap-1 select-none font-semibold">
            <div>~</div>
            <div>~</div>
            <div>~</div>
            <div>
              &quot;{slug}.md&quot; {lineCount}L, {charCount}C
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 font-mono">
            <div className="mb-6 text-[13px] text-[var(--text-muted)] font-semibold">
              <span>❯</span> git log --prev / --next
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="block no-underline group">
                  <div className="bg-[var(--bg-surface)] border border-white/10 rounded-2xl p-4 transition-all duration-150 group-hover:bg-[var(--bg-elevated)] group-hover:border-white/20 h-full flex flex-col justify-center">
                    <div className="text-[var(--text-muted)] text-[11px] mb-1 font-semibold">← PREVIOUS POST</div>
                    <div className="text-white font-headings font-extrabold text-[13px]">{prevPost.meta.title}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="block no-underline group text-right">
                  <div className="bg-[var(--bg-surface)] border border-white/10 rounded-2xl p-4 transition-all duration-150 group-hover:bg-[var(--bg-elevated)] group-hover:border-white/20 h-full flex flex-col justify-center text-right">
                    <div className="text-[var(--text-muted)] text-[11px] mb-1 font-semibold">NEXT POST →</div>
                    <div className="text-white font-headings font-extrabold text-[13px]">{nextPost.meta.title}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            <div className="mt-10 mb-8 text-[13px]">
              <span className="text-[var(--text-muted)] font-semibold">❯</span> cd ../blog
              <br />
              <Link
                href="/blog"
                className="text-[var(--accent-cyan)] font-bold hover:text-white no-underline mt-2 inline-block transition-colors duration-150 border-b-2 border-transparent hover:border-white/25"
              >
                ../blog
              </Link>
            </div>
          </div>
        </article>
      </div>
    </PageTransition>
  );
}
