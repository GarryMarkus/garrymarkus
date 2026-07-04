"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Nav({ showLinks = true }: { showLinks?: boolean }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0, duration: 0.4 }}
      className="fixed top-0 left-0 right-0 h-[56px] flex items-center justify-between px-4 md:px-6 z-50 bg-bg border-b border-border"
    >
      <div className="flex md:flex-1" />
      <div className="flex justify-center md:flex-1 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
        <Link 
          href="/" 
          className="font-mono font-bold text-[13px] md:text-[15px] tracking-[0.1em] md:tracking-[0.12em] text-ink uppercase truncate"
        >
          GarryMarkus
        </Link>
      </div>
      <div className="flex justify-end gap-3 md:gap-6 items-center md:flex-1 relative z-10">
        {showLinks && (
          <>
            <Link
              href="/experience"
              className="font-mono text-[10px] md:text-[12px] uppercase text-muted hover:text-gold transition-colors flex items-center gap-1"
            >
              <span className="hidden sm:inline">Experience</span>
              <span className="sm:hidden">Exp</span>
              <ArrowRight className="w-3 md:w-3.5 h-3 md:h-3.5" />
            </Link>
            <div className="hidden md:block w-px h-4 bg-border mx-0 md:mx-2" />
          </>
        )}
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
