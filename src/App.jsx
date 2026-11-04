export default function App() {
  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/GarryMarkus",
      hoverGlow: "hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]",
      arrowColor: "text-indigo-400",
      icon: (
        <svg
          className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
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
      hoverGlow: "hover:border-sky-500/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]",
      arrowColor: "text-sky-400",
      icon: (
        <svg
          className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
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
      hoverGlow: "hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]",
      arrowColor: "text-amber-400",
      icon: (
        <svg
          className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
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
    <main className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 sm:p-10 bg-[#07080b] text-[#f3f4f6] antialiased overflow-hidden selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* Duotone Ambient Atmospheres (Indigo + Solar Amber) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[550px] h-[550px] bg-gradient-to-br from-indigo-600/18 via-blue-500/10 to-transparent blur-[140px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 w-[550px] h-[550px] bg-gradient-to-tl from-amber-500/16 via-rose-500/10 to-transparent blur-[140px] rounded-full"
      />

      {/* Subtle Structural Architectural Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
      />

      {/* Top Identity / Telemetry Bar */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between text-xs font-mono text-neutral-400">
        <span className="tracking-wider text-neutral-300 font-medium">GARRY MARKUS</span>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300 text-[11px] tracking-wide shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>PORTFOLIO V2 IN PROGRESS</span>
        </div>
      </header>

      {/* Central Hero Composition */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-12 max-w-2xl px-4">
        
        {/* Main Duotone Headline */}
        <h1 className="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 text-4xl sm:text-6xl md:text-7xl tracking-tight">
          <span className="font-['Syne',sans-serif] font-extrabold text-white">
            GarryMarkus
          </span>
          <span className="font-['Instrument_Serif',Georgia,serif] italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-indigo-300 drop-shadow-sm">
            is building
          </span>
        </h1>

        {/* Minimal Sub-Narrative */}
        <p className="mt-5 sm:mt-6 font-mono text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed tracking-tight">
          Engineering low-latency desktop utilities, algorithmic arbiter engines, and clean systems.
        </p>

        {/* Duotone Interactive Social Pills */}
        <nav
          aria-label="Social Profiles"
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={social.name}
              className={`group flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 hover:text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] font-mono text-xs sm:text-sm no-underline ${social.hoverGlow}`}
            >
              {social.icon}
              <span className="font-medium tracking-tight">{social.name}</span>
              <span
                aria-hidden="true"
                className={`text-[11px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${social.arrowColor}`}
              >
                ↗
              </span>
            </a>
          ))}
        </nav>

      </div>

      {/* Subtle Terminal Footer */}
      <footer className="relative z-10 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-neutral-400 border-t border-white/[0.06] pt-4">
        <span>Prem Singh · Systems & Algorithmic Software</span>
        <span>Delhi NCR (UTC+5:30)</span>
      </footer>

    </main>
  );
}
