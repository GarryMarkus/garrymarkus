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
      <span key="1"><span className="highlight text-ink">Coach</span> students in chess fundamentals and <span className="highlight text-ink">advanced strategy</span> with structured, personalized training sessions.</span>,
      <span key="2"><span className="highlight text-ink">Manage</span> scheduling, administrative workflows, and <span className="highlight text-ink">operational coordination</span> to ensure smooth day-to-day functioning.</span>
    ],
    skills: ["CHESS PEDAGOGY", "CURRICULUM DESIGN", "OPERATIONS", "SCHEDULING"]
  },
  {
    id: "chess-com",
    section: "LEADERSHIP & CAMPUS INVOLVEMENT",
    company: "Chess.com",
    role: 'COLLEGE AMBASSADOR  —  <span class="text-faint">ABES ENGINEERING COLLEGE</span>',
    dateStr: "JAN 2026 — PRESENT",
    shortRole: "College Ambassador",
    shortDate: "JAN 2026 →",
    bullets: [
      <span key="1"><span className="highlight text-ink">Represent</span> Chess.com officially on campus, <span className="highlight text-ink">growing</span> the platform's student user base through peer outreach and campaigns.</span>,
      <span key="2"><span className="highlight text-ink">Organize</span> Chess.com-sponsored online tournaments and community engagement events for the college.</span>
    ],
    skills: ["COMMUNITY BUILDING", "OUTREACH", "CHESS.COM", "PEER EDUCATION"]
  },
  {
    id: "enpassant",
    company: "EnPassant Chess Forum",
    role: 'PRESIDENT  —  <span class="text-faint">ABES ENGINEERING COLLEGE</span>',
    dateStr: "AUG 2025 — JUN 2026",
    shortRole: "President",
    shortDate: "AUG 2025 → JUN 2026",
    bullets: [
      <span key="1"><span className="highlight text-ink">Led</span> a chess community of 400+ members, organizing campus-wide tournaments, workshops, and online events.</span>,
      <span key="2"><span className="highlight text-ink">Spearheaded</span> club initiatives and <span className="highlight text-ink">directed</span> design efforts, boosting visibility and student participation.</span>,
      <span key="3"><span className="highlight text-ink">Coordinate</span> scheduling, administrative processes, and operational workflows to ensure efficient day-to-day operations.</span>
    ],
    skills: ["LEADERSHIP", "EVENT PLANNING", "COMMUNITY MANAGEMENT", "CHESS FORUM"]
  },
  {
    id: "acm",
    company: "ACM Student Chapter",
    role: 'DESIGN LEAD  —  <span class="text-faint">ABES ENGINEERING COLLEGE</span>',
    dateStr: "AUG 2025 — JUN 2026",
    shortRole: "Design Lead",
    shortDate: "AUG 2025 → JUN 2026",
    bullets: [
      <span key="1"><span className="highlight text-ink">Directed</span> branding and design for club events and digital content, strengthening audience engagement and outreach.</span>,
      <span key="2"><span className="highlight text-ink">Produced</span> visual assets in collaboration with event teams, supporting seamless event execution.</span>
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
        <div className="flex items-center gap-[16px] mb-[24px] sm:mb-[36px] w-full">
          <div className="border-t border-border w-[40px]" />
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-faint whitespace-nowrap">
            {"//"} {item.section}
          </div>
          <div className="flex-1 border-t border-border" />
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
          className="font-serif text-[28px] sm:text-[36px] md:text-[56px] font-normal italic leading-[1.0] text-ink"
        >
          {item.company}
        </motion.h3>

        <div className="flex flex-col md:flex-row justify-between md:items-baseline mt-[10px] gap-2">
          <div 
            className="font-mono text-[10px] sm:text-[12px] uppercase tracking-[0.07em] text-muted break-words [overflow-wrap:anywhere]"
            dangerouslySetInnerHTML={{ __html: item.role }}
          />
          <div className="font-mono text-[11px] text-faint whitespace-nowrap">
            {item.dateStr}
          </div>
        </div>

        <motion.div 
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          className="border-t-[1.5px] border-gold w-[48px] mt-[16px]"
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
              <div className="w-[5px] h-[5px] rounded-full bg-gold mt-[8px] shrink-0" />
              <div className="font-serif text-[15px] sm:text-[16px] md:text-[18px] leading-[1.75] text-muted">
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
              className="font-mono text-[9px] sm:text-[10px] uppercase px-[9px] py-[3px] rounded-full border border-border text-faint transition-colors duration-150 hover:border-gold hover:text-gold cursor-default"
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
    <div className="min-h-screen w-full bg-bg relative">
      <BackgroundEffect />
      <Nav showLinks={false} />

      <main className="max-w-[1000px] mx-auto px-[20px] md:px-[48px] pt-[72px] sm:pt-[80px] pb-[80px] sm:pb-[120px] relative z-10">
        
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="mb-[32px]"
        >
          <Link 
            href="/" 
            className="font-mono text-[12px] text-faint hover:text-ink transition-colors inline-block"
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
                  <h1 className="font-serif italic font-normal text-[28px] sm:text-[32px] md:text-[32px] text-ink m-0">
                    The
                  </h1>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 }}
                >
                  <h1 className="font-mono font-bold text-[28px] sm:text-[32px] md:text-[32px] text-ink mb-[8px]">
                    Record.
                  </h1>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.3 }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-faint mb-[20px]">
                  CHESS · SECURITY · CAMPUS
                </div>
                <div className="border-t border-border w-full" />
              </motion.div>
            </div>

            {/* TIMELINE (Hidden on Mobile) */}
            <div className="hidden md:block">
              <div className="font-mono text-[11px] uppercase text-faint mb-[24px]">
                {"//"} the record
              </div>
            
            <div className="relative pl-[12px]">
              {/* Single Vertical Track Line */}
              <div className="absolute left-[3px] top-[6px] bottom-0 w-[1px] bg-border" />
              
              {/* Progress Line (amber overlay) */}
              <div 
                className="absolute left-[3px] top-[6px] w-[1px] bg-gold transition-all duration-500 ease-out" 
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
                      <div className={`absolute -left-[13px] top-[6px] w-[7px] h-[7px] rounded-full transition-all duration-300 ${isFilled ? 'bg-gold border-gold border-[1px]' : 'bg-transparent border border-border'} ${isActive ? 'shadow-md shadow-gold/50' : ''}`} />
                      
                      <div className="pl-[8px] -ml-[10px]">
                        <div className="font-mono text-[10px] text-faint uppercase">
                          {item.shortDate}
                        </div>
                        <div className={`font-mono text-[11px] mt-[3px] leading-[1.3] transition-colors duration-300 ${isActive ? 'text-ink' : 'text-muted'}`}>
                          {item.shortRole}
                        </div>
                        <div className="font-serif italic text-[13px] text-faint mt-[2px]">
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
          <div className="flex flex-col gap-[36px] sm:gap-[48px] md:gap-[72px]">
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
