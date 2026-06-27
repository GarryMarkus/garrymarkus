"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Nav } from "@/components/Nav";
import { BackgroundEffect } from "@/components/BackgroundEffect";
import Link from "next/link";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  dateStr: string;
  shortRole: string;
  shortDate: string;
  bullets: React.ReactNode[];
  skills: string[];
  section?: string;
}

const experienceData: ExperienceItem[] = [
  {
    id: "chess-wizzania",
    section: "PROFESSIONAL",
    company: "Chess Wizzania",
    role: 'CHESS COACH & OPERATIONS MANAGER INTERN',
    dateStr: "JAN 2026 — PRESENT",
    shortRole: "Chess Coach",
    shortDate: "JAN 2026 →",
    bullets: [
      <span key="1"><span className="highlight text-[rgba(255,255,255,0.95)]">Coach</span> students in chess fundamentals and <span className="highlight text-[rgba(255,255,255,0.95)]">advanced strategy</span> with structured, personalized training sessions.</span>,
      <span key="2"><span className="highlight text-[rgba(255,255,255,0.95)]">Manage</span> scheduling, administrative workflows, and <span className="highlight text-[rgba(255,255,255,0.95)]">operational coordination</span> to ensure smooth day-to-day functioning.</span>
    ],
    skills: ["CHESS PEDAGOGY", "CURRICULUM DESIGN", "OPERATIONS", "SCHEDULING"]
  },
  {
    id: "chess-com",
    section: "LEADERSHIP & CAMPUS INVOLVEMENT",
    company: "Chess.com",
    role: 'COLLEGE AMBASSADOR  —  <span class="text-[rgba(255,255,255,0.35)]">ABES ENGINEERING COLLEGE</span>',
    dateStr: "JAN 2026 — PRESENT",
    shortRole: "College Ambassador",
    shortDate: "JAN 2026 →",
    bullets: [
      <span key="1"><span className="highlight text-[rgba(255,255,255,0.95)]">Represent</span> Chess.com officially on campus, <span className="highlight text-[rgba(255,255,255,0.95)]">growing</span> the platform's student user base through peer outreach and campaigns.</span>,
      <span key="2"><span className="highlight text-[rgba(255,255,255,0.95)]">Organize</span> Chess.com-sponsored online tournaments and community engagement events for the college.</span>
    ],
    skills: ["COMMUNITY BUILDING", "OUTREACH", "CHESS.COM", "PEER EDUCATION"]
  },
  {
    id: "enpassant",
    company: "EnPassant Chess Forum",
    role: 'PRESIDENT  —  <span class="text-[rgba(255,255,255,0.35)]">ABES ENGINEERING COLLEGE</span>',
    dateStr: "AUG 2025 — JUN 2026",
    shortRole: "President",
    shortDate: "AUG 2025 → JUN 2026",
    bullets: [
      <span key="1"><span className="highlight text-[rgba(255,255,255,0.95)]">Led</span> a chess community of 400+ members, organizing campus-wide tournaments, workshops, and online events.</span>,
      <span key="2"><span className="highlight text-[rgba(255,255,255,0.95)]">Spearheaded</span> club initiatives and <span className="highlight text-[rgba(255,255,255,0.95)]">directed</span> design efforts, boosting visibility and student participation.</span>,
      <span key="3"><span className="highlight text-[rgba(255,255,255,0.95)]">Coordinate</span> scheduling, administrative processes, and operational workflows to ensure efficient day-to-day operations.</span>
    ],
    skills: ["LEADERSHIP", "EVENT PLANNING", "COMMUNITY MANAGEMENT", "CHESS FORUM"]
  },
  {
    id: "acm",
    company: "ACM Student Chapter",
    role: 'DESIGN LEAD  —  <span class="text-[rgba(255,255,255,0.35)]">ABES ENGINEERING COLLEGE</span>',
    dateStr: "AUG 2025 — JUN 2026",
    shortRole: "Design Lead",
    shortDate: "AUG 2025 → JUN 2026",
    bullets: [
      <span key="1"><span className="highlight text-[rgba(255,255,255,0.95)]">Directed</span> branding and design for club events and digital content, strengthening audience engagement and outreach.</span>,
      <span key="2"><span className="highlight text-[rgba(255,255,255,0.95)]">Produced</span> visual assets in collaboration with event teams, supporting seamless event execution.</span>
    ],
    skills: ["BRANDING", "DIGITAL DESIGN", "VISUAL ASSETS", "CROSS-TEAM COLLABORATION"]
  }
];

function RoleCard({ item, index, setActiveId }: { item: ExperienceItem, index: number, setActiveId: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveId(item.id);
    }
  }, [isInView, item.id, setActiveId]);

  return (
    <div className="flex flex-col relative" id={item.id} ref={ref}>
      {item.section && (
        <div className="flex items-center gap-[16px] mb-[36px] w-full">
          <div className="border-t border-[rgba(255,255,255,0.1)] w-[40px]" />
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[rgba(255,255,255,0.25)] whitespace-nowrap">
            // {item.section}
          </div>
          <div className="flex-1 border-t border-[rgba(255,255,255,0.1)]" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.h3 
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          className="font-serif italic text-[36px] md:text-[48px] font-normal leading-[1.0] text-[rgba(255,255,255,0.92)]"
        >
          {item.company}
        </motion.h3>

        <div className="flex flex-col md:flex-row justify-between md:items-baseline mt-[10px] gap-2">
          <div 
            className="font-mono text-[12px] uppercase tracking-[0.07em] text-[rgba(255,255,255,0.6)]"
            dangerouslySetInnerHTML={{ __html: item.role }}
          />
          <div className="font-mono text-[11px] text-[rgba(255,255,255,0.3)] whitespace-nowrap">
            {item.dateStr}
          </div>
        </div>

        <motion.div 
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          className="border-t-[1.5px] border-[#C8920A] w-[48px] mt-[16px]"
        />

        <div className="mt-[20px] flex flex-col gap-[12px]">
          {item.bullets.map((bullet, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: 0.25 + (i * 0.06) }}
              className="flex items-start gap-[14px]"
            >
              <div className="w-[5px] h-[5px] rounded-full bg-[#C8920A] mt-[8px] shrink-0" />
              <div className="font-serif text-[17px] leading-[1.7] text-[rgba(255,255,255,0.72)]">
                {bullet}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-[20px] flex flex-wrap gap-[6px]">
          {item.skills.map((skill, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, delay: 0.35 + (i * 0.04) }}
              className="font-mono text-[10px] uppercase px-[9px] py-[3px] rounded-full border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.35)] transition-colors duration-150 hover:border-[#C8920A] hover:text-[#C8920A] cursor-default"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ExperiencePage() {
  const [activeId, setActiveId] = useState<string>("chess-wizzania");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const activeIndex = experienceData.findIndex(item => item.id === activeId);
    if (activeIndex !== -1 && experienceData.length > 1) {
      const newProgress = (activeIndex / (experienceData.length - 1)) * 100;
      setProgress(newProgress);
    }
  }, [activeId]);

  return (
    <div className="min-h-screen w-full bg-[#141414] relative dark">
      <BackgroundEffect />
      <Nav showLinks={false} />

      <main className="max-w-[1000px] mx-auto px-[20px] md:px-[48px] pt-[80px] pb-[120px] relative z-10">
        
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="mb-[32px]"
        >
          <Link 
            href="/" 
            className="font-mono text-[12px] text-[rgba(255,255,255,0.35)] hover:text-[rgba(255,255,255,0.85)] transition-colors inline-block"
          >
            ← back to home
          </Link>
        </motion.div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] md:gap-[64px] items-start mt-0">
          
          {/* LEFT COLUMN */}
          <motion.div 
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="md:sticky top-[80px] h-fit mb-[48px] md:mb-0"
          >
            {/* Heading Block */}
            <div className="mb-[24px]">
              <div className="flex flex-col leading-[1.0]">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                >
                  <h1 className="font-serif italic font-normal text-[42px] md:text-[32px] text-[rgba(255,255,255,0.92)] m-0">
                    The
                  </h1>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 }}
                >
                  <h1 className="font-mono font-bold text-[42px] md:text-[32px] text-[#FFFFFF] mb-[8px]">
                    Record.
                  </h1>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.3 }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-[rgba(255,255,255,0.25)] mb-[20px]">
                  CHESS · SECURITY · CAMPUS
                </div>
                <div className="border-t border-[rgba(255,255,255,0.08)] w-full" />
              </motion.div>
            </div>

            {/* TIMELINE (Hidden on Mobile) */}
            <div className="hidden md:block">
              <div className="font-mono text-[11px] uppercase text-[rgba(255,255,255,0.3)] mb-[24px]">
                // the record
              </div>
            
            <div className="relative pl-[12px]">
              {/* Single Vertical Track Line */}
              <div className="absolute left-[3px] top-[6px] bottom-0 w-[1px] bg-[rgba(255,255,255,0.1)]" />
              
              {/* Progress Line (amber overlay) */}
              <div 
                className="absolute left-[3px] top-[6px] w-[1px] bg-[#C8920A] transition-all duration-500 ease-out" 
                style={{ height: `${progress}%` }} 
              />

              <div className="flex flex-col gap-[32px]">
                {experienceData.map((item, i) => {
                  const activeIndex = experienceData.findIndex(d => d.id === activeId);
                  const isActive = item.id === activeId;
                  const isPast = i < activeIndex;
                  const isFilled = isActive || isPast;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => {
                        const el = document.getElementById(item.id);
                        if (el) {
                          const yOffset = -120;
                          const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                      className="relative text-left group"
                    >
                      {/* Node Dot */}
                      <div className={`absolute -left-[13px] top-[6px] w-[7px] h-[7px] rounded-full transition-all duration-300 ${isFilled ? 'bg-[#C8920A] border-[#C8920A] border-[1px]' : 'bg-transparent border border-[rgba(255,255,255,0.2)]'} ${isActive ? 'shadow-[0_0_8px_rgba(200,146,10,0.5)]' : ''}`} />
                      
                      <div className="pl-[8px] -ml-[10px]">
                        <div className="font-mono text-[10px] text-[rgba(255,255,255,0.3)] uppercase">
                          {item.shortDate}
                        </div>
                        <div className={`font-mono text-[11px] mt-[3px] leading-[1.3] transition-colors duration-300 ${isActive ? 'text-[rgba(255,255,255,0.95)]' : 'text-[rgba(255,255,255,0.7)]'}`}>
                          {item.shortRole}
                        </div>
                        <div className="font-serif italic text-[13px] text-[rgba(255,255,255,0.4)] mt-[2px]">
                          {item.company}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            </div>
          </motion.div>

          {/* RIGHT CARDS */}
          <div className="flex flex-col gap-[48px] md:gap-[72px]">
            {experienceData.map((item, index) => (
              <RoleCard 
                key={item.id} 
                item={item} 
                index={index} 
                setActiveId={setActiveId} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
