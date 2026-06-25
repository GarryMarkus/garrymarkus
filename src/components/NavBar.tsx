"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const WORKSPACES = [
  { id: 1, label: "home", path: "/" },
  { id: 2, label: "blog", path: "/blog" },
];

export function NavBar() {
  const pathname = usePathname();
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentSection = pathname === "/" ? "home" : pathname.replace(/^\//, "");

  return (
    <nav className="fixed top-0 left-0 right-0 h-[36px] bg-[var(--bg-base)] border-b border-[var(--bg-border)] z-50 flex items-center justify-between px-2 md:px-4 text-[11px] font-mono">
      <div className="flex items-center gap-1 md:gap-2">
        {WORKSPACES.map((ws) => {
          const isActive = pathname === ws.path || (pathname.startsWith("/blog") && ws.path === "/blog");
          return (
            <Link
              key={ws.id}
              href={ws.path}
              className={`px-2 md:px-3 py-[2px] rounded-sm transition-colors ${
                isActive
                  ? "bg-[var(--accent-purple)] text-[var(--bg-base)]"
                  : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:bg-[var(--bg-selection)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="md:mr-2">{ws.id}</span>
              <span className="hidden md:inline">{ws.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="text-[var(--text-muted)] absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
        ~/ {">"} {currentSection}
      </div>

      <div className="text-[var(--text-muted)]">
        {time ? format(time, "EEE dd MMM HH:mm") : "..."}
      </div>
    </nav>
  );
}
