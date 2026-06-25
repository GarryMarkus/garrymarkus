"use client";

import React, { useEffect, useState } from "react";
import { WindowChrome } from "@/components/WindowChrome";
import clsx from "clsx";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Find all h2 and h3 in the prose
    const elements = Array.from(document.querySelectorAll(".prose h2, .prose h3"));
    const headingData = elements.map((el) => ({
      id: el.id,
      text: el.textContent?.replace(/^##?\\s+/, "") || "", // remove heading hashes
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // smooth scroll with offset for the nav bar
      const y = element.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  const Content = (
    <div className="flex flex-col gap-[6px] font-mono text-[13px]">
      <div className="mb-4 text-[var(--text-muted)]">
        <span className="text-[var(--accent-purple)]">❯</span> outline post.md
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
              "no-underline transition-colors block text-left group",
              h.level === 2 ? "pl-0" : "pl-4",
              isActive ? "text-[var(--accent-purple)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            {h.level === 2 && (
              <span className={clsx("mr-2", isActive ? "text-[var(--accent-purple)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]")}>
                {isActive ? "❯" : "──"}
              </span>
            )}
            {h.level === 3 && (
              <span className={clsx("mr-2", isActive ? "text-[var(--accent-purple)]" : "text-[var(--text-muted)]")}>
                └─
              </span>
            )}
            <span className={clsx(h.level === 2 && "font-medium")}>
              {h.text}
            </span>
          </a>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[240px] flex-shrink-0 sticky top-[80px] self-start">
        <WindowChrome title="~/toc" className="mb-0">
          {Content}
        </WindowChrome>
      </div>

      {/* Mobile/Tablet Collapsible */}
      <div className="lg:hidden w-full mb-6">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-purple)] font-mono text-[13px] transition-colors mb-2"
        >
          <span className="text-[var(--accent-purple)]">{isOpen ? "▼" : "❯"}</span> outline
        </button>
        {isOpen && (
          <WindowChrome title="~/toc" className="mb-0">
            {Content}
          </WindowChrome>
        )}
      </div>
    </>
  );
}
