export default function App() {
  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/GarryMarkus",
      icon: (
        <svg
          className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-200 transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/prem-singh-88662130a",
      icon: (
        <svg
          className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-200 transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
        </svg>
      ),
    },
    {
      name: "Contact",
      href: "mailto:premsinghiitjee@gmail.com",
      icon: (
        <svg
          className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-200 transition-colors"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
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
        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          <span>building</span>
        </div>
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
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 text-zinc-300 hover:text-white transition-all font-[Consolas,monospace] text-xs no-underline"
            >
              {social.icon}
              <span>{social.name}</span>
              <span
                aria-hidden="true"
                className="text-zinc-500 group-hover:text-zinc-300 transition-colors text-[10px]"
              >
                ↗
              </span>
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
