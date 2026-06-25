"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, FileText, Mail, Terminal } from "lucide-react";
import { siteConfig } from "@/lib/config";

const GithubIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "For you", href: "/", icon: Home },
    { label: "Library", href: "/blog", icon: BookOpen },
    { label: "Resume", href: siteConfig.resumePath, icon: FileText, external: true },
  ];

  const sysInfo = [
    { label: "OS", value: "Arch Linux" },
    { label: "WM", value: "Hyprland" },
    { label: "Uptime", value: "always up", accent: "text-[var(--accent-lime)]" },
  ];

  return (
    <div className="flex flex-col justify-between w-full h-full text-white">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl border-2 border-black bg-[var(--accent-lime)] flex items-center justify-center shadow-brutal-sm">
          <Terminal size={18} className="text-black stroke-[2.5]" />
        </div>
        <div className="flex flex-col">
          <span className="font-headings font-extrabold text-[15px] tracking-tight leading-none text-white uppercase">
            {siteConfig.name}
          </span>
          <span className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider mt-0.5">
            {siteConfig.role.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Navigation tabs */}
      <nav className="flex flex-col gap-2 mt-8 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          const content = (
            <div
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all font-headings text-[13px] font-bold uppercase tracking-wider cursor-pointer ${
                isActive
                  ? "bg-white text-black border-black shadow-brutal-sm"
                  : "bg-transparent text-[var(--text-secondary)] border-transparent hover:text-white hover:bg-[var(--bg-elevated)]"
              }`}
            >
              <Icon size={16} className="stroke-[2.5]" />
              <span>{item.label}</span>
            </div>
          );

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline block"
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={item.label} href={item.href} className="no-underline block">
              {content}
            </Link>
          );
        })}
      </nav>

      {/* System Status info block */}
      <div className="border-t-2 border-black/20 pt-6 mt-6">
        <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3">
          System Diagnostics
        </span>
        <div className="flex flex-col gap-2 font-mono text-[11px] text-[var(--text-secondary)]">
          {sysInfo.map((info) => (
            <div key={info.label} className="flex justify-between border-b border-white/5 pb-1">
              <span className="font-medium text-[var(--text-muted)]">{info.label}</span>
              <span className={`font-bold ${info.accent || "text-white"}`}>{info.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Details & Contacts */}
      <div className="flex items-center justify-between border-t-2 border-black/20 pt-6 mt-6">
        <div className="flex gap-2.5">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="w-8 h-8 rounded-lg border-2 border-black bg-white shadow-brutal-sm flex items-center justify-center hover:translate-y-[-1px] hover:shadow-brutal active:translate-y-[1px] active:shadow-brutal-sm transition-all text-black"
            title="Mail"
          >
            <Mail size={14} className="stroke-[2.5]" />
          </a>
          <a
            href={siteConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg border-2 border-black bg-white shadow-brutal-sm flex items-center justify-center hover:translate-y-[-1px] hover:shadow-brutal active:translate-y-[1px] active:shadow-brutal-sm transition-all text-black"
            title="GitHub"
          >
            <GithubIcon size={14} className="stroke-[2.5]" />
          </a>
          <a
            href={siteConfig.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg border-2 border-black bg-white shadow-brutal-sm flex items-center justify-center hover:translate-y-[-1px] hover:shadow-brutal active:translate-y-[1px] active:shadow-brutal-sm transition-all text-black"
            title="LinkedIn"
          >
            <LinkedinIcon size={14} className="stroke-[2.5]" />
          </a>
          <a
            href={siteConfig.contact.x}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg border-2 border-black bg-white shadow-brutal-sm flex items-center justify-center hover:translate-y-[-1px] hover:shadow-brutal active:translate-y-[1px] active:shadow-brutal-sm transition-all text-black"
            title="X (Twitter)"
          >
            <XIcon size={14} className="stroke-[2.5]" />
          </a>
        </div>
      </div>
    </div>
  );
}
