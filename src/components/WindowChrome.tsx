import React from "react";
import clsx from "clsx";

interface WindowChromeProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  timestamp?: string;
  promptPath?: string;
  hideDots?: boolean;
}

export function WindowChrome({
  title,
  children,
  className,
  bodyClassName,
  timestamp,
  hideDots = false,
}: WindowChromeProps) {
  return (
    <div
      className={clsx(
        "border-2 border-black bg-[var(--bg-surface)] rounded-[20px] shadow-brutal overflow-hidden",
        className
      )}
    >
      {/* Header bar */}
      <div className="h-[36px] flex-shrink-0 border-b-2 border-black flex items-center justify-between px-3 bg-[var(--bg-surface)] relative select-none">
        {!hideDots ? (
          <div className="flex items-center gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[var(--window-dot-red)] border border-black" />
            <div className="w-[10px] h-[10px] rounded-full bg-[var(--window-dot-yellow)] border border-black" />
            <div className="w-[10px] h-[10px] rounded-full bg-[var(--window-dot-green)] border border-black" />
          </div>
        ) : (
          <div className="w-[42px]" />
        )}

        <div className="text-[11px] font-headings font-bold text-[var(--text-secondary)] absolute left-1/2 -translate-x-1/2 hidden sm:block truncate px-4 max-w-[60%]">
          {title.toUpperCase()}
        </div>

        <div className="text-[11px] font-mono text-[var(--text-muted)] min-w-[42px] text-right">
          {timestamp ?? ""}
        </div>
      </div>

      {/* Card body */}
      <div className={clsx("p-4 sm:p-5 text-white", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
