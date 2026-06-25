"use client";

import React, { useEffect, useState } from "react";
import { WindowChrome } from "@/components/WindowChrome";
import clsx from "clsx";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  slug: string;
}

export function TableOfContents({ slug }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("blog-post-page");
    return () => document.documentElement.classList.remove("blog-post-page");
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".blog-prose h2, .blog-prose h3"));
    const headingData = elements.map((el) => ({
      id: el.id,
      text: el.textContent?.replace(/^#+\s*/, "") ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slug]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: "auto" });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  const Content = (
    <div className="flex flex-col gap-[6px] font-mono text-[13px]">
      <div className="mb-4 text-[var(--text-muted)]">
        <span className="text-[var(--accent-purple)]">❯</span> outline {slug}.md
      </div>

      {headings.length === 0 && (
        <div className="text-[var(--text-muted)] italic">No headings found</div>
      )}

      {headings.map((h) => {
        const isActive = activeId === h.id;
        return (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={(e) => handleClick(e, h.id)}
            className={clsx(
              "no-underline transition-colors duration-150 block text-left group",
              h.level === 2 ? "pl-0" : "pl-4",
              isActive
                ? "text-[var(--accent-purple)]"
                : h.level === 2
                ? "text-[var(--text-primary)] hover:text-[var(--accent-purple)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            {h.level === 2 && (
              <span
                className={clsx(
                  "mr-2",
                  isActive ? "text-[var(--accent-purple)]" : "text-[var(--text-muted)]"
                )}
              >
                {isActive ? "❯" : "──"}
              </span>
            )}
            {h.level === 3 && (
              <span className={clsx("mr-2", isActive ? "text-[var(--accent-purple)]" : "text-[var(--text-muted)]")}>
                └─
              </span>
            )}
            <span className={clsx(h.level === 2 && "font-medium")}>{h.text}</span>
          </a>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-[200px] flex-shrink-0 sticky top-[76px] self-start">
        <WindowChrome title="~/toc">{Content}</WindowChrome>
      </div>

      {/* Mobile: collapsible at top */}
      <div className="lg:hidden w-full mb-6 md:mb-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-purple)] font-mono text-[13px] transition-colors duration-150 mb-2 cursor-pointer bg-transparent border-none"
        >
          <span className="text-[var(--accent-purple)]">{isOpen ? "▼" : "❯"}</span> outline
        </button>
        {isOpen && <WindowChrome title="~/toc">{Content}</WindowChrome>}
      </div>

      {/* Tablet: floating drawer button */}
      <div className="hidden md:block lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-16 right-4 z-40 w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--bg-border)] text-[var(--accent-purple)] font-mono text-lg shadow-lg hover:bg-[var(--bg-elevated)] transition-colors duration-150 cursor-pointer"
          aria-label="Table of contents"
        >
          ≡
        </button>
        {isOpen && (
          <div className="fixed inset-x-0 bottom-0 z-50 p-4 bg-[var(--bg-base)] border-t border-[var(--bg-border)] max-h-[60vh] overflow-y-auto">
            <WindowChrome title="~/toc">{Content}</WindowChrome>
          </div>
        )}
      </div>
    </>
  );
}
