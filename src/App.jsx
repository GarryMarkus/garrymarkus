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
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0c-2.4-1.6-3.5-1.3-3.5-1.3a4.2 4.2 0 0 0-.1 3.2 4.6 4.6 0 0 0-1.3 3.2c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2v3.5" />
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
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 10v9" />
          <circle cx="4" cy="5.5" r="1.25" fill="currentColor" stroke="none" />
          <path d="M10 19v-5.5a3.2 3.2 0 0 1 6.4 0V19" />
          <path d="M10 10v9" />
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
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
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
                strokeWidth="1.5"
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
