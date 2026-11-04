export default function App() {
  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/GarryMarkus",
      icon: (
        <svg
          className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-200 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/prem-singh-88662130a",
      icon: (
        <svg
          className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-200 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: "Contact",
      href: "mailto:premsinghiitjee@gmail.com",
      icon: (
        <svg
          className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-200 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 bg-[#090a0d] text-[#f3f4f6] font-['Courier_Prime',Consolas,monospace] antialiased selection:bg-zinc-800 selection:text-white">
      
      {/* Subtle Duotone Ambient Atmosphere (Ultra-soft Deep Navy / Slate) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-blue-950/15 via-transparent to-transparent blur-[160px] rounded-full"
      />

      {/* Header Telemetry */}
      <header className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between text-xs font-[Consolas,monospace] text-zinc-500">
        <span className="tracking-widest uppercase text-[11px] text-zinc-400">Prem Singh</span>
      </header>

      {/* Central Hero Composition */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto px-4 max-w-xl mx-auto">
        
        {/* Crisp Courier Prime headline with refined duotone hierarchy */}
        <h1 className="text-3xl sm:text-5xl font-['Courier_Prime',monospace] font-bold tracking-tight text-white flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1">
          <span>GarryMarkus</span>
          <span className="text-zinc-500 font-normal">is building</span>
        </h1>

        <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-[Consolas,monospace] leading-relaxed max-w-md">
          Systems & algorithmic software. Low-latency tools and deterministic architectures.
        </p>

        {/* Clean, restrained social action pills in Consolas */}
        <nav
          aria-label="Social Profiles"
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={social.name}
              className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 text-zinc-300 hover:text-white transition-all font-[Consolas,monospace] text-xs no-underline"
            >
              {social.icon}
              <span>{social.name}</span>
              <svg
                className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          ))}
        </nav>

      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-[Consolas,monospace] text-zinc-400 border-t border-white/[0.05] pt-4">
        <span>© {new Date().getFullYear()} GarryMarkus</span>
        <span>Delhi NCR (UTC+5:30)</span>
      </footer>

    </main>
  );
}
