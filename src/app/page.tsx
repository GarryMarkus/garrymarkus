"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { BackgroundEffect } from "@/components/BackgroundEffect";
import { Nav } from "@/components/Nav";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const phrases = [
  { line1: "I play the long game.", line2: "Always." },
  { line1: "I secure the underlying systems.", line2: "Uncompromisingly." },
  { line1: "I know how to calculate.", line2: "Precisely." },
  { line1: "I design the clarity.", line2: "Minimalism." },
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const line1Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  };

  const line2Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.22 } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.38 } },
  };

  const ctAsVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.48 } },
  };

  const bottomBarVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.3, delay: 0.6 } },
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-bg relative">
      <BackgroundEffect />
      <Nav />

      <main className="flex-1 flex items-center justify-center relative mt-[56px] mb-[40px] px-6">
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="text-center relative leading-[1.05] min-h-[160px] md:min-h-[220px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)", y: -8 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <div className="relative inline-block">
                  <span className="font-serif text-[38px] md:text-[62px] lg:text-[76px] font-normal italic text-ink relative z-10">
                    {phrases[index].line1}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[38px] md:text-[62px] lg:text-[76px] font-bold text-ink">
                    {phrases[index].line2}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            variants={subtitleVariants}
            className="font-serif text-[19px] text-muted text-center max-w-[480px] mt-[28px]"
          >
            Cybersecurity engineer. Chess coach. Graphics Designer.
          </motion.p>

          <motion.div
            variants={ctAsVariants}
            className="flex items-center justify-center gap-4 mt-[32px]"
          >
            <a
              href="/Prem_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View Resume <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </a>
            <Link href="/notebook" className="btn-ghost">
              Open my notebook <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <motion.footer
        initial="hidden"
        animate="show"
        variants={bottomBarVariants}
        className="fixed bottom-0 left-0 right-0 h-[40px] border-t border-border flex items-center justify-between px-6 bg-bg z-50"
      >
        <div className="font-mono text-[11px] text-faint">
          @garrymarkus
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/garrymarkus" target="_blank" rel="noopener noreferrer" className="text-faint hover:text-gold transition-colors">
            <GithubIcon className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/garrymarkus" target="_blank" rel="noopener noreferrer" className="text-faint hover:text-gold transition-colors">
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a href="https://x.com/garrymarkus" target="_blank" rel="noopener noreferrer" className="text-faint hover:text-gold transition-colors">
            <TwitterIcon className="w-4 h-4" />
          </a>
        </div>
      </motion.footer>
    </div>
  );
}
