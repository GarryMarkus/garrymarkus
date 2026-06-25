import React from "react";
import clsx from "clsx";

interface WindowChromeProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  timestamp?: string;
}

export function WindowChrome({ title, children, className, timestamp }: WindowChromeProps) {
  return (
    <div
      className={clsx(
        "rounded-[10px] bg-[var(--bg-surface)] border border-[var(--bg-border)] overflow-hidden",
        "shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] mb-6",
        className
      )}
    >
      <div className="h-[32px] border-b border-[var(--bg-border)] flex items-center justify-between px-3 relative bg-[var(--bg-base)] bg-opacity-40">
        {/* Left: Window Dots */}
        <div className="flex items-center gap-[7px]">
          <div className="w-[10px] h-[10px] rounded-full bg-[var(--window-dot-red)]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[var(--window-dot-yellow)]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[var(--window-dot-green)]" />
        </div>

        {/* Center: Title */}
        <div className="text-[11px] italic text-[var(--text-muted)] absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
          {title}
        </div>

        {/* Right: Timestamp/Breadcrumb (optional) */}
        <div className="text-[11px] text-[var(--text-muted)] w-[40px] text-right">
          {timestamp || ""}
        </div>
      </div>
      
      <div className="p-4 sm:p-6 text-[var(--text-secondary)]">
        {children}
      </div>
    </div>
  );
}
