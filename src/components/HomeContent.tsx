"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Play, Calendar, Shield, Cpu, Cloud, Lock, Terminal, Sparkles, BookOpen, Briefcase, GraduationCap, Award } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { PostMetadata } from "@/lib/posts";

// Helper components for custom quirky illustrations to match the Voxie aesthetic
const SecurityGraphic = () => (
  <svg viewBox="0 0 200 160" className="w-32 h-28 text-black opacity-90" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Shield */}
    <path d="M100 15 L165 45 V95 C165 130 100 150 100 150 C100 150 35 130 35 95 V45 Z" fill="#000000" fillOpacity="0.05" strokeWidth="4.5" />
    
    {/* Lock Shackle */}
    <path d="M85 80 V62 a15 15 0 0 1 30 0 V80" />
    {/* Lock Body */}
    <rect x="75" y="80" width="50" height="36" rx="8" fill="#000" />
    
    {/* Keyhole */}
    <circle cx="100" cy="94" r="4.5" fill="#fff" />
    <line x1="100" y1="98" x2="100" y2="108" strokeWidth="3" stroke="white" />
    
    {/* Terminal prompt symbol overlay top-right */}
    <path d="M115 35 L125 45 L115 55" strokeWidth="3.5" />
    <line x1="130" y1="55" x2="145" y2="55" strokeWidth="3.5" />
    
    {/* Binary nodes/network lines */}
    <circle cx="55" cy="65" r="3" fill="#000" />
    <circle cx="50" cy="110" r="3" fill="#000" />
    <path d="M55 65 L70 80 M50 110 L65 95" />
  </svg>
);

const MascotComputer = () => (
  <svg viewBox="0 0 200 160" className="w-32 h-28 text-black opacity-90" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    {/* Screen */}
    <rect x="40" y="30" width="120" height="80" rx="16" fill="#000000" fillOpacity="0.05" />
    <line x1="50" y1="90" x2="150" y2="90" />
    {/* Face inside screen */}
    <circle cx="80" cy="65" r="7" fill="#000" />
    <circle cx="120" cy="65" r="7" fill="#000" />
    <path d="M92 80c5 5 11 5 16 0" />
    {/* Stand */}
    <path d="M85 110l-10 25h50l-10-25" />
    <rect x="60" y="135" width="80" height="8" rx="4" fill="#000" />
    {/* Sparks */}
    <path d="M30 40l10 10M170 40l-10 10M165 110l10 10" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

interface HomeContentProps {
  recentPosts: PostMetadata[];
}

export function HomeContent({ recentPosts }: HomeContentProps) {
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "credentials">("projects");

  const toggleBookmark = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  // Safe fallbacks for highlights
  const featuredPost = recentPosts[0] || {
    title: "Lab 0x01: Advanced Network Security & Port Scanning",
    description: "Deep dive into bypassing modern firewall rules using decoy scans, custom timing templates, and packet fragments.",
    date: "2026-06-25",
    slug: "sample",
  };

  // Remaining posts for lists
  const listPosts = recentPosts.slice(1, 4);

  // Category items for the bottom grid
  const categories = [
    { title: "Offensive Sec", subtitle: "Root Access Labs", color: "bg-[var(--accent-pink)]", icon: Shield, desc: "Exploits & payloads" },
    { title: "Security Tools", subtitle: "Custom CLI Utilities", color: "bg-[var(--accent-cyan)]", icon: Cpu, desc: "Automation & scans" },
    { title: "Cloud DevOps", subtitle: "Securing Infrastructure", color: "bg-[var(--accent-red)]", icon: Cloud, desc: "Docker & K8s labs" },
    { title: "System Internals", subtitle: "Linux Kernel Hardening", color: "bg-[var(--accent-yellow)]", icon: Lock, desc: "Polkit & dotfiles" },
  ];

  return (
    <div className="w-full text-white">
      {/* 1. Header welcome banner */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-[var(--accent-lime)] text-[11px] font-bold uppercase tracking-widest font-mono">
          <Terminal size={14} className="stroke-[2.5]" />
          <span>STATUS: ONLINE & DEPLOYING</span>
        </div>
        <h1 className="font-headings font-extrabold text-2xl md:text-4xl tracking-tight text-white mt-2">
          {activeTab === "projects" ? "Projects & Patents" : activeTab === "overview" ? "Log Files" : "Credentials & Skills"}
        </h1>
      </header>

      {/* 2. Top Row: Featured Big Horizontal Cards */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        
        {/* Card 1: About/Intro (Yellow Card) */}
        <div className="bg-[var(--accent-yellow)] border-2 border-black rounded-[28px] p-6 text-black flex flex-col justify-between h-[210px] sm:h-[230px] shadow-brutal hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all relative overflow-hidden group">
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="bg-black text-[var(--accent-yellow)] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {siteConfig.name} • {siteConfig.role}
              </span>
              <h2 className="font-headings font-extrabold text-lg sm:text-[22px] mt-3 tracking-tight max-w-[340px] leading-tight">
                i know somethings or two about cybersecurity.
              </h2>
            </div>
            
            {/* Quirky Illustration nested on right */}
            <div className="absolute right-2 bottom-2 pointer-events-none group-hover:scale-105 transition-transform duration-200">
              <SecurityGraphic />
            </div>
          </div>

          <div className="z-10">
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white hover:bg-neutral-900 transition-colors px-5 py-2.5 rounded-full text-xs font-bold font-headings uppercase tracking-wider shadow-brutal-sm"
            >
              <Play size={12} className="fill-white" />
              <span>Read Resume</span>
            </a>
          </div>
        </div>

        {/* Card 2: Featured Write-up (Orange Card) */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="block no-underline">
            <div className="bg-[var(--accent-red)] border-2 border-black rounded-[28px] p-6 text-black flex flex-col justify-between h-[210px] sm:h-[230px] shadow-brutal hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all relative overflow-hidden group">
              <div className="flex justify-between items-start z-10">
                <div className="flex-1">
                  <span className="bg-black text-[var(--accent-red)] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Featured Write-up • {featuredPost.date}
                  </span>
                  <h2 className="font-headings font-extrabold text-xl sm:text-2xl mt-3 tracking-tight max-w-[320px] leading-tight line-clamp-2">
                    {featuredPost.title}
                  </h2>
                </div>

                {/* Quirky Illustration nested on right */}
                <div className="absolute right-2 bottom-2 pointer-events-none group-hover:scale-105 transition-transform duration-200">
                  <MascotComputer />
                </div>
              </div>

              <div className="z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 bg-black text-white hover:bg-neutral-900 transition-colors px-5 py-2.5 rounded-full text-xs font-bold font-headings uppercase tracking-wider shadow-brutal-sm">
                  <span>Read Post</span>
                  <ArrowRight size={12} className="stroke-[2.5]" />
                </div>
              </div>
            </div>
          </Link>
        )}
      </section>

      {/* Interactive Tab Switcher */}
      <div className="flex gap-2.5 mb-8 border-b-2 border-white/10 pb-4 overflow-x-auto select-none no-scrollbar">
        {[
          { id: "projects", label: "Projects & Patents", icon: Briefcase },
          { id: "overview", label: "Log Files", icon: Terminal },
          { id: "credentials", label: "Skills & Credentials", icon: GraduationCap },
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all font-headings text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-white text-black border-black shadow-brutal-sm translate-y-[-1px]"
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-transparent hover:text-white hover:bg-[var(--bg-elevated)]"
              }`}
            >
              <TabIcon size={14} className="stroke-[2.5]" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <>
          {/* 3. Middle Row: Track list style posts */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
              <h2 className="font-headings font-bold text-[15px] text-[var(--text-secondary)] uppercase tracking-wider">
                Based on your interests
              </h2>
              <Link href="/blog" className="text-[11px] font-bold text-[var(--accent-lime)] hover:underline uppercase tracking-wider">
                View more →
              </Link>
            </div>

            <motion.div
              className="flex flex-col gap-2.5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {listPosts.length > 0 ? (
                listPosts.map((post, idx) => {
                  const bgColors = ["bg-[var(--accent-pink)]", "bg-[var(--accent-cyan)]", "bg-[var(--accent-purple)]"];
                  const avatarBg = bgColors[idx % bgColors.length];
                  const isFav = !!bookmarked[post.slug];

                  return (
                    <motion.div key={post.slug} variants={itemVariants}>
                      <Link href={`/blog/${post.slug}`} className="block no-underline group">
                        <div className="bg-[var(--bg-surface)] border border-white/10 rounded-2xl p-3 flex items-center justify-between hover:bg-[var(--bg-elevated)] hover:border-black transition-all group-hover:translate-x-[2px] shadow-sm">
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Custom square track icon */}
                            <div className={`w-10 h-10 rounded-xl ${avatarBg} border-2 border-black flex items-center justify-center flex-shrink-0 shadow-brutal-sm`}>
                              <BookOpen size={16} className="text-black stroke-[2.5]" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-headings font-bold text-[13px] sm:text-[14px] text-white truncate group-hover:text-[var(--accent-lime)] transition-colors">
                                {post.title}
                              </h3>
                              <span className="text-[10px] text-[var(--text-muted)] font-mono font-medium block mt-0.5">
                                {siteConfig.name} • {post.date}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 flex-shrink-0">
                            <span className="hidden md:inline-block text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                              {post.tags[0] || "cybersecurity"}
                            </span>
                            <span className="text-[11px] font-mono text-[var(--text-muted)] font-medium">
                              {post.readTime || "5"} min read
                            </span>
                            <button
                              onClick={(e) => toggleBookmark(post.slug, e)}
                              className={`hover:scale-110 transition-transform ${isFav ? "text-[var(--accent-pink)]" : "text-[var(--text-muted)] hover:text-white"}`}
                              title={isFav ? "Saved" : "Save"}
                            >
                              <Heart size={14} className={isFav ? "fill-[var(--accent-pink)]" : ""} />
                            </button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-[var(--text-muted)] text-[12px] font-mono p-4 bg-[var(--bg-surface)] rounded-xl border border-white/5">
                  [ cat: error: no recent write-ups found ]
                </div>
              )}
            </motion.div>
          </section>

          {/* 4. Bottom Row: Categories Grid */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
              <h2 className="font-headings font-bold text-[15px] text-[var(--text-secondary)] uppercase tracking-wider">
                Explore Categories
              </h2>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                4 categories loaded
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="border-2 border-black bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-3xl p-5 flex flex-col justify-between h-[150px] shadow-brutal hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all group cursor-pointer"
                    onClick={() => {
                      window.location.href = `/blog?search=${encodeURIComponent(cat.title.toLowerCase())}`;
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`w-9 h-9 rounded-xl ${cat.color} border-2 border-black flex items-center justify-center shadow-brutal-sm group-hover:scale-105 transition-transform`}>
                        <Icon size={16} className="text-black stroke-[2.5]" />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold">0{idx + 1}</span>
                    </div>

                    <div className="mt-4">
                      <span className="text-[9px] font-bold text-[var(--accent-lime)] font-mono uppercase block mb-1">
                        {cat.subtitle}
                      </span>
                      <h3 className="font-headings font-extrabold text-[14px] text-white tracking-tight leading-none group-hover:text-[var(--accent-lime)] transition-colors">
                        {cat.title}
                      </h3>
                      <span className="text-[10px] text-[var(--text-muted)] font-medium mt-1 block">
                        {cat.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {activeTab === "projects" && (
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SkillForge */}
            <div className="bg-[var(--bg-surface)] border-2 border-black rounded-[24px] p-6 text-white flex flex-col justify-between shadow-brutal hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all">
              <div>
                <div className="flex justify-between items-start">
                  <span className="bg-[var(--accent-cyan)] text-black text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-black shadow-brutal-sm">
                    Full-Stack AI Project
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold">2026</span>
                </div>
                <h3 className="font-headings font-extrabold text-lg mt-3 text-white tracking-tight leading-snug">
                  SkillForge
                </h3>
                <span className="text-[10px] text-[var(--accent-cyan)] font-mono uppercase block mt-1 font-semibold">
                  Django • React • LangChain • RAG • Vector Embeddings
                </span>
                <p className="text-[12px] text-[var(--text-secondary)] mt-3 leading-relaxed">
                  Built a full-stack AI career platform where students verify skills, receive personalized learning paths, and apply to jobs end-to-end. Engineered semantic candidate-job matching using sentence embeddings and cosine similarity.
                </p>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Associated Patents:</span>
                <div className="flex items-center gap-2 text-[11px] text-[var(--accent-pink)] font-bold">
                  <Award size={12} className="stroke-[2.5]" />
                  <span>Patent Filed: AI Matching & Verification Logic (2026)</span>
                </div>
              </div>
            </div>

            {/* Swiss Pairing System */}
            <div className="bg-[var(--bg-surface)] border-2 border-black rounded-[24px] p-6 text-white flex flex-col justify-between shadow-brutal hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all">
              <div>
                <div className="flex justify-between items-start">
                  <span className="bg-[var(--accent-lime)] text-black text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-black shadow-brutal-sm">
                    Python Automation
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold">2025</span>
                </div>
                <h3 className="font-headings font-extrabold text-lg mt-3 text-white tracking-tight leading-snug">
                  Chess Tournament Swiss Pairing System
                </h3>
                <span className="text-[10px] text-[var(--accent-lime)] font-mono uppercase block mt-1 font-semibold">
                  Python • Algorithms • Automation
                </span>
                <p className="text-[12px] text-[var(--text-secondary)] mt-3 leading-relaxed">
                  Built a Python automation tool implementing the Swiss pairing algorithm to generate fair, competitive round matchups for chess tournaments. Designed pairing logic accounting for player scores, win/loss history, and opponent records.
                </p>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Highlights:</span>
                <div className="flex items-center gap-2 text-[11px] text-[var(--accent-yellow)] font-bold">
                  <Sparkles size={12} className="stroke-[2.5]" />
                  <span>Automates matchups & removes pairing effort</span>
                </div>
              </div>
            </div>

            {/* Agri-Tech Patent */}
            <div className="bg-[var(--bg-surface)] border-2 border-black rounded-[24px] p-6 text-white flex flex-col justify-between shadow-brutal hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all lg:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="bg-[var(--accent-purple)] text-black text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-black shadow-brutal-sm">
                      Official Patent
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">Filed Feb 2026 (India)</span>
                  </div>
                  <h3 className="font-headings font-extrabold text-lg mt-3 text-white tracking-tight leading-snug">
                    Role-Based Digital Agri-Tech Platform for Integrated Agricultural Resource Management
                  </h3>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-2 leading-relaxed">
                    Patent filed under The Patents Act, 1970 (India) focusing on dynamic resource allocation workflows. Details algorithms and system flows for real-time agricultural asset management.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-purple)] border-2 border-black flex items-center justify-center flex-shrink-0 shadow-brutal-sm text-black">
                  <BookOpen size={20} className="stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "credentials" && (
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: Skills & Education */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Technical Skills */}
              <div className="bg-[var(--bg-surface)] border-2 border-black rounded-[24px] p-6 shadow-brutal">
                <h3 className="font-headings font-extrabold text-base text-white border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                  <Cpu size={16} className="text-[var(--accent-cyan)] stroke-[2.5]" />
                  <span>Technical Skills</span>
                </h3>
                <div className="flex flex-col gap-3 font-mono text-[12px]">
                  <div>
                    <span className="text-[var(--text-muted)] font-bold block">Languages:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {["Python", "C++", "C", "HTML5", "CSS3"].map((lang) => (
                        <span key={lang} className="bg-[var(--bg-elevated)] border border-white/10 text-white px-2 py-0.5 rounded-lg font-bold">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-[var(--text-muted)] font-bold block">Databases:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {["PostgreSQL", "MySQL"].map((db) => (
                        <span key={db} className="bg-[var(--bg-elevated)] border border-white/10 text-white px-2 py-0.5 rounded-lg font-bold">
                          {db}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-[var(--text-muted)] font-bold block">Tools & Frameworks:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {["Django", "React", "LangChain", "RAG", "Vector Embeddings", "Git", "GitHub", "Figma"].map((tool) => (
                        <span key={tool} className="bg-[var(--bg-elevated)] border border-white/10 text-white px-2 py-0.5 rounded-lg font-bold">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-[var(--text-muted)] font-bold block">Operating Systems:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {["Linux (Arch/Hyprland)", "Windows", "MacOS"].map((os) => (
                        <span key={os} className="bg-[var(--bg-elevated)] border border-white/10 text-white px-2 py-0.5 rounded-lg font-bold">
                          {os}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-[var(--bg-surface)] border-2 border-black rounded-[24px] p-6 shadow-brutal flex-1">
                <h3 className="font-headings font-extrabold text-base text-white border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                  <GraduationCap size={16} className="text-[var(--accent-lime)] stroke-[2.5]" />
                  <span>Education</span>
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-lime)] border-2 border-black flex items-center justify-center flex-shrink-0 shadow-brutal-sm text-black">
                    <GraduationCap size={18} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-headings font-bold text-[14px] text-white">
                      B.Tech in Computer Science & Engineering
                    </h4>
                    <span className="text-[11px] text-[var(--text-muted)] font-bold font-mono">
                      ABES Engineering College, Ghaziabad
                    </span>
                    <div className="flex items-center gap-4 mt-3 font-mono text-[11px]">
                      <div>
                        <span className="text-[var(--text-muted)] block">Graduation:</span>
                        <span className="text-white font-bold">May 2027</span>
                      </div>
                      <div>
                        <span className="text-[var(--text-muted)] block">Aggregate Score:</span>
                        <span className="text-[var(--accent-lime)] font-bold">71.08% (till 5th Sem)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Col: Achievements */}
            <div className="lg:col-span-5">
              <div className="bg-[var(--bg-surface)] border-2 border-black rounded-[24px] p-6 shadow-brutal h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-headings font-extrabold text-base text-white border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                    <Award size={16} className="text-[var(--accent-yellow)] stroke-[2.5]" />
                    <span>Key Achievements</span>
                  </h3>
                  <div className="flex flex-col gap-4 font-mono text-[11px]">
                    <div className="flex items-start gap-3 border-b border-white/5 pb-3">
                      <div className="w-6 h-6 rounded-md bg-[var(--accent-yellow)] border border-black flex items-center justify-center text-black flex-shrink-0 text-xs">
                        🏆
                      </div>
                      <div>
                        <span className="text-white font-bold block">Competitive Programming</span>
                        <span className="text-[var(--text-secondary)]">Achieved a 2-Star rating on CodeChef.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-b border-white/5 pb-3">
                      <div className="w-6 h-6 rounded-md bg-[var(--accent-pink)] border border-black flex items-center justify-center text-black flex-shrink-0 text-xs">
                        🚀
                      </div>
                      <div>
                        <span className="text-white font-bold block">JNU Open Tech-Fest Hackathon</span>
                        <span className="text-[var(--text-secondary)]">Ranked 7th out of 65 competing teams for developing "SkillBridge".</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-b border-white/5 pb-3">
                      <div className="w-6 h-6 rounded-md bg-[var(--accent-cyan)] border border-black flex items-center justify-center text-black flex-shrink-0 text-xs">
                        ♟️
                      </div>
                      <div>
                        <span className="text-white font-bold block">Shehmaat Solo Chess</span>
                        <span className="text-[var(--text-secondary)]">Secured 2nd Runner-Up placement in the 2024 brackets.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md bg-[var(--accent-lime)] border border-black flex items-center justify-center text-black flex-shrink-0 text-xs">
                        👑
                      </div>
                      <div>
                        <span className="text-white font-bold block">ABES Chess Championship</span>
                        <span className="text-[var(--text-secondary)]">Attained 4th Place overall in the 2025 tournament cycle.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-[var(--bg-elevated)] border border-white/10 rounded-xl p-3 flex items-center gap-3 font-mono text-[10px] text-[var(--text-muted)]">
                  <span>♟️</span>
                  <span>Currently Chess Coach & Operations Manager Intern at Chess Wizzania.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

