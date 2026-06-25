"use client";

import React, { useRef, useState } from "react";

interface CodeBlockWrapperProps {
  language?: string;
  children: React.ReactNode;
}

export function CodeBlockWrapper({ language, children }: CodeBlockWrapperProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-6 rounded-[10px] border border-[var(--bg-border)] bg-[#0a0c10] overflow-hidden hover:shadow-[0_0_0_1px_rgba(189,147,249,0.2)] transition-shadow duration-150">
      <div className="h-[28px] flex items-center justify-between px-3 border-b border-[var(--bg-border)] bg-[var(--bg-surface)]">
        <span className="text-[11px] text-[var(--text-muted)]">{language ?? "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-[10px] text-[var(--text-muted)] hover:text-[var(--accent-purple)] bg-transparent border-none cursor-pointer transition-colors duration-150"
        >
          {copied ? "copied!" : "copy"}
        </button>
      </div>
      <div ref={preRef} className="overflow-x-auto custom-scrollbar p-4">
        {children}
      </div>
    </div>
  );
}
