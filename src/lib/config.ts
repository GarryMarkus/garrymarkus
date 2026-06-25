export const siteConfig = {
  name: "Prem Singh",
  alias: "GarryMarkus",
  role: "Cybersecurity Engineer",
  location: "Ghaziabad, Uttar Pradesh, India",
  focus: "Python, C++, Django, LangChain, RAG, Web & System Security",
  status: "open to work" as const,
  bio: {
    intro:
      "is a B.Tech Computer Science student and Cybersecurity Engineer who knows a thing or two about cybersecurity, building intelligent secure applications, and automating workflows.",
    focusAreas: "offensive security research, AI integration, and full-stack development",
    blogTopics: "cybersecurity labs, network defense, and system internals",
    hobby: "solving chess puzzles, competing in programming challenges, or customizing Linux environments",
  },
  contact: {
    email: "premsinghiitjee@gmail.com",
    github: "https://github.com/GarryMarkus",
    linkedin: "https://linkedin.com/in/prem-singh-88662130a",
    x: "https://x.com/GarryMarkus",
  },
  resumePath: "/resume.pdf",
} as const;

export const contactLinks = [
  { label: "mail", href: `mailto:${siteConfig.contact.email}` },
  { label: "github", href: siteConfig.contact.github },
  { label: "linkedin", href: siteConfig.contact.linkedin },
  { label: "x", href: siteConfig.contact.x },
] as const;

