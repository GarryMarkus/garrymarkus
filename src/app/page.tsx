import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Prem Singh",
};

export default function Home() {
  const projects = [
    {
      title: "Document-Viewer",
      summary: "A clean, distraction-free PDF reader for Windows, faithfully inspired by GNOME's minimalist aesthetics. Built for speed, minimalism, and a truly native feel.",
      tags: ["TypeScript"],
      source: "https://github.com/GarryMarkus/Document-Viewer",
      bgColor: "bg-zinc-800/80", 
    },
    {
      title: "Chess-Tournament-Swiss-Pairing",
      summary: "An open-source system for managing chess tournaments using the Swiss pairing algorithm. Easily generate pairings, manage standings, and run fair, efficient tournaments.",
      tags: ["Python", "Algorithms", "EnPassant"],
      source: "https://github.com/EnPassant-Chess-Forum-ABESEC/Chess-Tournament-Swiss-Pairing",
      bgColor: "bg-blue-900/40", 
    },
    {
      title: "Skip-The-Scroll",
      summary: "A browser extension that auto-loads every video in a massive YouTube playlist and reverses the order for you, saving you from scrolling endlessly.",
      tags: ["JavaScript", "Browser Extension"],
      source: "https://github.com/GarryMarkus/Skip-The-Scroll",
      bgColor: "bg-yellow-900/40", 
    },
    {
      title: "SkillForge",
      summary: "A comprehensive platform that transforms learners into verified, job-ready professionals through AI-powered skill verification, adaptive learning paths, and intelligent job matching.",
      tags: ["JavaScript", "AI"],
      source: "https://github.com/GarryMarkus/SkillForge",
      bgColor: "bg-emerald-900/40", 
    },
    {
      title: "En-Passant-Client",
      summary: "The frontend code for the EnPassant Chess Forum at ABESEC. A platform built to support the college chess community.",
      tags: ["JavaScript", "Frontend"],
      source: "https://github.com/EnPassant-Chess-Forum-ABESEC/En-Passant-Client",
      bgColor: "bg-purple-900/40", 
    },
    {
      title: "garrymarkus",
      summary: "The repository for my personal portfolio website and technical log. Clean, static, and text-first.",
      tags: ["TypeScript", "Next.js"],
      source: "https://github.com/GarryMarkus/garrymarkus",
      bgColor: "bg-neutral-800/60", 
    }
  ];

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-16">
        {projects.map((project, idx) => (
          <article key={idx} className="flex flex-col gap-4">
            
            {/* Metadata & Title */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl text-[var(--color-text-primary)] font-medium">
                {project.title}
              </h2>
              <p className="text-sm max-w-xl">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-3 py-1 bg-[var(--color-surface)] text-[var(--color-text-primary)] text-xs rounded-md border border-[var(--color-border-subtle)]"
                  >
                    {tag}
                  </span>
                ))}
                {project.source && (
                  <a href={project.source} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-transparent text-[var(--color-accent)] text-xs rounded-md border border-[var(--color-border-subtle)] hover:bg-[var(--color-border-subtle)] transition-colors no-underline">
                    Source
                  </a>
                )}
              </div>
            </div>

            {/* Visual Placeholder (Matching Screenshot's Rounded Cards) */}
            <div className={`w-full aspect-[4/3] sm:aspect-video rounded-xl mt-4 opacity-80 ${project.bgColor} flex items-center justify-center border border-[var(--color-border-subtle)]`}>
               <span className="text-[var(--color-text-muted)] font-medium text-sm font-mono opacity-50">[{project.title} Visual]</span>
            </div>

          </article>
        ))}
      </div>
    </div>
  );
}
