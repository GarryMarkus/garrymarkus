"use client";

import { usePathname } from "next/navigation";
import { GitBranch, Hexagon } from "lucide-react";

export function StatusBar() {
  const pathname = usePathname();
  const currentSection = pathname === "/" ? "index.tsx" : pathname.replace(/^\//, "") + ".md";

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[28px] bg-[var(--bg-surface)] border-t border-[var(--bg-border)] z-50 items-center justify-between px-3 text-[11px] font-mono hidden md:flex">
      <div className="flex items-center gap-3">
        <div className="bg-[var(--accent-purple)] text-[var(--bg-base)] px-[5px] py-[1px] rounded-[2px] font-bold">
          NORMAL
        </div>
        <div className="flex items-center text-[var(--accent-green)] gap-1">
          <GitBranch size={12} />
          <span>main</span>
        </div>
        <div className="text-[var(--text-secondary)]">
          {currentSection}
        </div>
      </div>

      <div className="flex items-center gap-4 text-[var(--text-muted)]">
        <span>UTF-8</span>
        <span>ln 1, col 1</span>
        <div className="flex items-center gap-1">
          <Hexagon size={12} />
          <span>hyprland</span>
        </div>
      </div>
    </div>
  );
}
