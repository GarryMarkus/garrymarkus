import { useEffect } from "react";

export default function Experience() {
  useEffect(() => {
    document.title = "Experience & Leadership · Garry Markus";
  }, []);

  const experiences = [
    {
      role: "Chess Coach & Operations Intern",
      organization: "Chess Wizzania",
      date: "Jan 2026 – Present",
      isCurrent: true,
      category: "Coaching & Operations",
      skills: ["Tactical Pedagogy", "Operational Scheduling", "Curriculum Design", "Player Analytics"],
      points: [
        "Structured comprehensive tactical and positional training programs for competitive student cohorts.",
        "Engineered repeatable operational workflows for scheduling, student onboarding, and tournament preparation.",
        "Analyzed engine evaluations and master game databases to construct tactical problem sets.",
      ],
    },
    {
      role: "College Ambassador — ABESEC",
      organization: "Chess.com",
      date: "Jan 2026 – Present",
      isCurrent: true,
      category: "Community & Growth",
      skills: ["Community Growth", "Tournament Arbitering", "Platform Evangelism", "Event Direction"],
      points: [
        "Spearheaded campus-wide student outreach, onboarding collegiate chess players onto Chess.com competitive ladders.",
        "Organized official collegiate blitz and rapid tournament broadcasts with live arbiter pairings.",
        "Coordinated with faculty and collegiate sports boards to foster institutional chess culture.",
      ],
    },
    {
      role: "President / Advisory",
      organization: "EnPassant Chess Forum",
      date: "Aug 2025 – Present",
      isCurrent: true,
      category: "Executive Leadership",
      skills: ["Executive Strategy", "Tournament Software", "Open Source Direction", "Administration"],
      points: [
        "Directed executive and technical operations for the official college chess forum across 200+ active student members.",
        "Led development and deployment of open-source Swiss and Round-Robin tournament pairing engines.",
        "Curated instructional study material and managed administrative relations with academic leadership.",
      ],
    },
    {
      role: "Design Lead",
      organization: "ACM Student Chapter",
      date: "Aug 2025 – Jun 2026",
      isCurrent: false,
      category: "Design & Identity",
      skills: ["Visual Communication", "Brand Identity", "Design Systems", "Institutional Media"],
      points: [
        "Crafted cohesive visual brand identity, marketing collaterals, and design language for flagship hackathons and tech symposiums.",
        "Collaborated with technical committees to maintain consistent typography, color palettes, and presentation ergonomics across digital touchpoints.",
      ],
    },
  ];

  const education = {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "ABES Engineering College",
    date: "Expected 2027",
    status: "Active Undergraduate",
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems & POSIX",
      "Computer Networks",
      "Distributed Computing",
      "Database Management Systems",
      "Object-Oriented Design",
      "Theory of Computation",
    ],
  };

  const competencies = [
    {
      domain: "Languages",
      items: ["C++", "Python", "Go", "TypeScript", "JavaScript", "SQL"],
    },
    {
      domain: "Systems & Architecture",
      items: ["Distributed Systems", "Web Tooling", "Concurrency Models", "UCI Chess Engines", "REST & GraphQL"],
    },
    {
      domain: "Tools & Infrastructure",
      items: ["Linux / POSIX", "Git / GitHub", "Vite", "Node.js", "Redis", "MongoDB", "Tailwind CSS v4"],
    },
  ];

  return (
    <div className="flex flex-col gap-14 animate-page-enter">
      
      {/* Header */}
      <section className="flex flex-col gap-3 border-b border-[var(--color-border-subtle)] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-mono w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span>Track Record · Leadership & Engineering</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
          Experience & Leadership
        </h1>

        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
          Chronicle of leadership roles, engineering initiatives, competitive coaching, and institutional responsibilities.
        </p>
      </section>

      {/* Experience Timeline */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-3">
          <h2 className="text-lg font-display font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <span>Positions & Roles</span>
            <span className="text-xs font-mono font-normal text-[var(--color-text-muted)]">({experiences.length})</span>
          </h2>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>3 Active Roles</span>
          </span>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-500/20 flex flex-col gap-10">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative flex flex-col gap-3 group">
              
              {/* Timeline Bullet Node */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 ${
                  exp.isCurrent
                    ? "bg-blue-600 border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                    : "bg-[var(--color-bg-base)] border-[var(--color-border-medium)]"
                }`}
              />

              {/* Card Container */}
              <div className="glass-card rounded-xl p-5 sm:p-6 flex flex-col gap-4 group-hover:border-blue-500/30 transition-all">
                
                {/* Header: Org, Role & Date */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {exp.category}
                      </span>
                      {exp.isCurrent && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--color-text-primary)] mt-1.5">
                      {exp.organization}
                    </h3>
                    <p className="text-sm font-mono text-cyan-400/90 font-medium">
                      {exp.role}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-[var(--color-text-muted)] shrink-0 self-start sm:self-auto bg-white/[0.03] px-2.5 py-1 rounded border border-white/5">
                    {exp.date}
                  </span>
                </div>

                {/* Bullet Points */}
                <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="text-blue-400 mt-1 shrink-0 font-mono text-xs">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills & Focus Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--color-border-subtle)]">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-white/[0.03] text-[11px] font-mono text-[var(--color-text-muted)] border border-white/[0.05]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="flex flex-col gap-6 pt-4 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-bold text-[var(--color-text-primary)]">
            Academic Foundation
          </h2>
          <span className="text-xs font-mono text-blue-400">Undergraduate Degree</span>
        </div>

        <div className="glass-card rounded-xl p-6 sm:p-8 flex flex-col gap-5 border border-[var(--color-border-subtle)]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-medium">Degree & Field</span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)] mt-0.5">
                {education.degree}
              </h3>
              <p className="text-sm font-mono text-[var(--color-text-secondary)] mt-1">
                {education.institution}
              </p>
            </div>

            <div className="flex flex-col sm:items-end font-mono text-xs text-[var(--color-text-muted)]">
              <span className="text-[var(--color-text-primary)] font-semibold">{education.date}</span>
              <span className="text-emerald-400 font-medium">{education.status}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
              Core Coursework & Theoretical Foundations
            </span>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course, cIdx) => (
                <span
                  key={cIdx}
                  className="px-3 py-1 rounded-md bg-[var(--color-bg-surface)] text-xs font-mono text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix Section */}
      <section className="flex flex-col gap-6 pt-4 border-t border-[var(--color-border-subtle)] pb-8">
        <h2 className="text-lg font-display font-bold text-[var(--color-text-primary)]">
          Core Technical Competencies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {competencies.map((comp, idx) => (
            <div key={idx} className="glass-card rounded-xl p-5 flex flex-col gap-3">
              <h3 className="font-display font-semibold text-sm text-blue-400 border-b border-[var(--color-border-subtle)] pb-2">
                {comp.domain}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {comp.items.map((item, iIdx) => (
                  <span
                    key={iIdx}
                    className="px-2.5 py-1 rounded bg-white/[0.03] text-xs font-mono text-[var(--color-text-secondary)] border border-white/[0.05]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
