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
      className="fixed top-0 left-0 right-0 h-[56px] flex items-center px-6 z-50 bg-bg border-b border-border"
    >
      <div className="flex-1" />
      <div className="flex-1 flex justify-center">
        <Link 
          href="/" 
          className="font-mono font-bold text-[15px] tracking-[0.12em] text-ink uppercase"
        >
          GarryMarkus
        </Link>
      </div>
      <div className="flex-1 flex justify-end gap-6 items-center">
        {showLinks && (
          <>
            <Link
              href="/experience"
              className="font-mono text-[12px] uppercase text-muted hover:text-gold transition-colors flex items-center gap-1"
            >
              Experience <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <div className="w-px h-4 bg-border mx-2" />
          </>
        )}
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
