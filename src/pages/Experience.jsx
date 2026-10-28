import { useEffect } from "react";

export default function Experience() {
  useEffect(() => {
    document.title = "Experience & Academic Foundation · Garry Markus";
  }, []);

  const experiences = [
    {
      id: "EXP_01",
      role: "Chess Coach & Operations Intern",
      organization: "Chess Wizzania",
      date: "JAN 2026 – PRESENT",
      isCurrent: true,
      category: "PEDAGOGY & OPERATIONS",
      skills: ["Tactical Analysis", "Operational Scheduling", "Curriculum Design", "Engine Evaluation"],
      deliverables: [
        "Structured comprehensive tactical and positional training programs for competitive student cohorts across rated divisions.",
        "Engineered repeatable operational workflows for scheduling, student onboarding, and tournament preparation.",
        "Analyzed master databases and Stockfish engine evaluations to curate high-frequency tactical problem sets.",
      ],
    },
    {
      id: "EXP_02",
      role: "Collegiate Campus Ambassador — ABESEC",
      organization: "Chess.com",
      date: "JAN 2026 – PRESENT",
      isCurrent: true,
      category: "COMMUNITY & ARBITERING",
      skills: ["Community Growth", "Tournament Arbitering", "Event Direction", "Platform Evangelism"],
      deliverables: [
        "Spearheaded campus-wide competitive outreach, onboarding collegiate players onto official Chess.com rating ladders.",
        "Organized official collegiate blitz and rapid tournament broadcasts with live Swiss arbiter pairings.",
        "Coordinated with institutional athletic boards and faculty leadership to cultivate competitive chess infrastructure.",
      ],
    },
    {
      id: "EXP_03",
      role: "Executive President & Technical Director",
      organization: "En Passant Chess Forum",
      date: "AUG 2025 – PRESENT",
      isCurrent: true,
      category: "EXECUTIVE & SYSTEMS",
      skills: ["Executive Strategy", "Tournament Software", "Open Source Direction", "FIDE Arbitering"],
      deliverables: [
        "Direct executive and technical operations for the official college chess forum spanning 200+ active student members.",
        "Spearheaded development of automated FIDE-compliant Dutch Swiss and Round-Robin tournament pairing engines in Python.",
        "Architected the open-source En-Passant-Client web platform for real-time tournament notices and rating archives.",
      ],
    },
    {
      id: "EXP_04",
      role: "Design Lead",
      organization: "ACM Student Chapter",
      date: "AUG 2025 – JUN 2026",
      isCurrent: false,
      category: "DESIGN & IDENTITY",
      skills: ["Visual Communication", "Brand Systems", "Design Languages", "Editorial Layouts"],
      deliverables: [
        "Crafted cohesive visual brand identity, marketing collaterals, and design language for flagship hackathons and technical symposiums.",
        "Maintained typographic discipline and strict contrast standards across all published departmental media.",
      ],
    },
  ];

  const academicCurriculum = [
    {
      area: "SYSTEMS & ARCHITECTURE",
      courses: [
        "Operating Systems & POSIX Architecture",
        "Computer Organization & Architecture (COA)",
        "Systems Programming & Memory Models",
      ],
    },
    {
      area: "ALGORITHMS & COMPLEXITY",
      courses: [
        "Data Structures & Algorithms (DSA)",
        "Design & Analysis of Algorithms (DAA)",
        "Theory of Computation & Automata",
      ],
    },
    {
      area: "DISTRIBUTED SYSTEMS & NETWORKS",
      courses: [
        "Computer Networks (OSI & TCP/IP)",
        "Database Management Systems (Relational & ACID)",
        "Distributed Computing & Client-Server Models",
      ],
    },
    {
      area: "ENGINEERING PRACTICES",
      courses: [
        "Object-Oriented Software Engineering (OOD)",
        "Compiler Design Principles",
        "Information Security & Cryptography Basics",
      ],
    },
  ];

  const capabilityMatrix = [
    {
      domain: "LANGUAGES & RUNTIMES",
      spec: "C++, Python 3, Go, TypeScript, JavaScript (ESNext), SQL, Bash",
    },
    {
      domain: "SYSTEMS & PROTOCOLS",
      spec: "Linux / POSIX, UCI Protocol, REST, GraphQL, WebSocket, Concurrency Primitives",
    },
    {
      domain: "DATA & PERSISTENCE",
      spec: "Redis (In-Memory Caching), MongoDB, PostgreSQL, SQLite, Inverted Indices",
    },
    {
      domain: "ENGINEERING TOOLCHAINS",
      spec: "Vite, Git / GitHub Workflows, Tailwind CSS 4, ESLint, React 19, Node.js",
    },
  ];

  return (
    <div className="flex flex-col gap-12 sm:gap-14 animate-page-enter">
      
      {/* Editorial Header */}
      <section className="flex flex-col gap-3 border-b border-[var(--color-border-hairline)] pb-6 font-mono">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 inline-block" />
            <span className="text-[var(--color-text-primary)] font-semibold">
              INDEX 04 · CHRONOLOGICAL & CAPABILITY LEDGER
            </span>
          </div>
          <div>
            <span>VERIFIED RECORD: 2023 – 2026</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
          Experience & Academic Foundation
        </h1>

        <p className="text-sm text-[var(--color-text-secondary)] max-w-3xl leading-relaxed font-sans">
          Verifiable record of executive leadership, technical arbitering, institutional responsibilities, and undergraduate computer science curriculum.
        </p>

        {/* Telemetry Metrics */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 pt-2 text-xs text-[var(--color-text-muted)]">
          <div>
            POSITIONS: <span className="text-[var(--color-text-primary)] font-semibold">04 RECORDED</span>
          </div>
          <span>·</span>
          <div>
            STATUS: <span className="text-emerald-400 font-semibold">03 CURRENTLY ACTIVE</span>
          </div>
          <span>·</span>
          <div>
            DEGREE HORIZON: <span className="text-[var(--color-text-primary)] font-semibold">2027 EXPECTED</span>
          </div>
        </div>
      </section>

      {/* Experience Ledger (Split-Column Technical Table) */}
      <section className="flex flex-col gap-5 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--color-border-hairline)] pb-3">
          <div>
            <span className="text-[11px] text-[var(--color-text-muted)] tracking-wider block">
              SECTION 01 · PROFESSIONAL & LEADERSHIP APPOINTMENTS
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
              Chronological Positions Register
            </h2>
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            ORDER: REVERSE CHRONOLOGICAL
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-medium)] transition-colors p-5 sm:p-6 flex flex-col lg:flex-row gap-6"
            >
              {/* Left Column: Organization & Identity */}
              <div className="lg:w-1/3 flex flex-col justify-between gap-4 border-b lg:border-b-0 lg:border-r border-[var(--color-border-hairline)] pb-4 lg:pb-0 lg:pr-6">
                <div>
                  <div className="flex items-center gap-2 flex-wrap text-xs text-[var(--color-text-muted)] mb-2">
                    <span className="font-tabular font-semibold text-[var(--color-text-primary)]">
                      {exp.id}
                    </span>
                    <span>·</span>
                    <span>[{exp.category}]</span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--color-text-primary)]">
                    {exp.organization}
                  </h3>
                  
                  <div className="text-xs font-mono text-cyan-400/90 mt-1">
                    {exp.role}
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-[11px] text-[var(--color-text-muted)]">
                  <div className="flex items-center justify-between">
                    <span>HORIZON:</span>
                    <span className="text-[var(--color-text-primary)]">{exp.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>STATUS:</span>
                    {exp.isCurrent ? (
                      <span className="text-emerald-400 font-semibold">[ACTIVE]</span>
                    ) : (
                      <span className="text-[var(--color-text-dim)]">[CONCLUDED]</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Deliverables & Competencies */}
              <div className="lg:w-2/3 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider block">
                    ENGINEERING DELIVERABLES & IMPACT:
                  </span>
                  <ul className="flex flex-col gap-2 text-xs font-sans text-[var(--color-text-secondary)] leading-relaxed">
                    {exp.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-[var(--color-text-muted)] font-mono text-[11px] shrink-0 mt-0.5">
                          [{String(dIdx + 1).padStart(2, "0")}]
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Delimited Tech Skills */}
                <div className="pt-3 border-t border-[var(--color-border-hairline)] flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-[var(--color-text-muted)] mr-1">DOMAINS:</span>
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-1.5 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-bg-base)] text-[var(--color-text-secondary)]"
                    >
                      [{skill}]
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Curriculum Register (ABESEC) */}
      <section className="flex flex-col gap-5 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--color-border-hairline)] pb-3">
          <div>
            <span className="text-[11px] text-[var(--color-text-muted)] tracking-wider block">
              SECTION 02 · ACADEMIC CURRICULUM AUDIT
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
              Undergraduate Engineering Foundation
            </h2>
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            INSTITUTION: ABESEC (DR. APJAKTU)
          </span>
        </div>

        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-6 flex flex-col gap-6">
          {/* Degree Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[var(--color-border-hairline)] pb-4">
            <div>
              <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider block">
                DEGREE PROGRAMME:
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--color-text-primary)] mt-0.5">
                Bachelor of Technology in Computer Science & Engineering
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                ABES Engineering College, Ghaziabad (Affiliated to Dr. A.P.J. Abdul Kalam Technical University)
              </p>
            </div>

            <div className="text-xs sm:text-right text-[var(--color-text-muted)] whitespace-nowrap">
              <div>HORIZON: <span className="text-[var(--color-text-primary)] font-semibold">2023 – 2027</span></div>
              <div className="text-emerald-400 font-semibold">[CURRENTLY ACTIVE UNDERGRADUATE]</div>
            </div>
          </div>

          {/* Theoretical Foundations Matrix Table */}
          <div className="space-y-3">
            <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider block">
              THEORETICAL CURRICULUM & KNOWLEDGE DOMAINS:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {academicCurriculum.map((disc, idx) => (
                <div
                  key={idx}
                  className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-base)] p-4 flex flex-col gap-2"
                >
                  <div className="text-[11px] font-semibold text-[var(--color-text-primary)] border-b border-[var(--color-border-hairline)] pb-1.5">
                    [{disc.area}]
                  </div>
                  <ul className="space-y-1 text-xs text-[var(--color-text-secondary)] font-sans">
                    {disc.courses.map((course, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-2">
                        <span className="text-[var(--color-text-muted)] font-mono text-[10px]">▸</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capability Matrix */}
      <section className="flex flex-col gap-5 font-mono pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--color-border-hairline)] pb-3">
          <div>
            <span className="text-[11px] text-[var(--color-text-muted)] tracking-wider block">
              SECTION 03 · VERIFIABLE CAPABILITY MATRIX
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
              Core Technical Competencies
            </h2>
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            EVALUATION: PRODUCTION READY
          </span>
        </div>

        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-[var(--color-border-hairline)] bg-[var(--color-bg-subtle)] text-[10px] text-[var(--color-text-muted)] tracking-wider">
                <th className="py-2.5 px-4 font-normal w-1/3">DISCIPLINE</th>
                <th className="py-2.5 px-4 font-normal">TECHNICAL SPECIFICATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-hairline)]">
              {capabilityMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-[var(--color-bg-surface-elevated)] transition-colors">
                  <td className="py-3 px-4 text-[11px] text-[var(--color-text-primary)] font-semibold whitespace-nowrap">
                    [{item.domain}]
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[var(--color-text-secondary)]">
                    {item.spec}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
