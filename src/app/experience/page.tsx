import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Prem Singh",
};

export default function Experience() {
  const experiences = [
    {
      role: "Chess Coach & Operations Intern",
      organization: "Chess Wizzania",
      date: "Jan 2026 – Present",
      points: [
        "Structured training sessions, tactical pedagogy, and operational scheduling workflows."
      ]
    },
    {
      role: "College Ambassador — ABESEC",
      organization: "Chess.com",
      date: "Jan 2026 – Present",
      points: [
        "Campus-wide outreach, student onboarding, and tournament organization."
      ]
    },
    {
      role: "President / Advisory",
      organization: "EnPassant Chess Forum",
      date: "Aug 2025 – Present",
      points: [
        "Led community initiatives, directed study material development, and managed administrative processes."
      ]
    },
    {
      role: "Design Lead",
      organization: "ACM Student Chapter",
      date: "Aug 2025 – Jun 2026",
      points: [
        "Visual communication and brand identity for institutional tech events."
      ]
    }
  ];

  const education = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "ABES Engineering College",
      date: "Expected 2027",
    }
  ];

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Experience & Leadership</h1>
      </section>

      <section className="flex flex-col gap-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <h2 className="font-medium text-lg">
                {exp.organization} <span className="text-[var(--color-text-muted)] font-normal">| {exp.role}</span>
              </h2>
              <span className="font-mono text-xs text-[var(--color-text-muted)] shrink-0">{exp.date}</span>
            </div>
            <ul className="list-disc list-inside text-sm text-[var(--color-text-muted)] flex flex-col gap-1 mt-1">
              {exp.points.map((point, pIdx) => (
                <li key={pIdx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-8 mt-4 pt-8 border-t border-[var(--color-border-subtle)]">
        <h2 className="text-xl font-medium">Education</h2>
        {education.map((edu, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <h3 className="font-medium text-lg">
                {edu.degree} <span className="text-[var(--color-text-muted)] font-normal">| {edu.institution}</span>
              </h3>
              <span className="font-mono text-xs text-[var(--color-text-muted)] shrink-0">{edu.date}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
