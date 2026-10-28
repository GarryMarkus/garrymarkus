import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Overview", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Technical Log", path: "/blog" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] flex flex-col relative selection:bg-blue-500/30 selection:text-white">
      {/* Ambient background glows */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      >
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-600/5 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/5 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      </div>

      {/* Sticky Glass Top Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand & Live Telemetry Pill */}
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 font-display font-bold text-lg text-[var(--color-text-primary)] hover:opacity-90 transition-opacity no-underline"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-sm font-semibold shadow-inner">
                GM
              </div>
              <span className="tracking-tight hidden xs:inline-block">Garry Markus</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for roles</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md transition-all duration-150 no-underline ${
                    isActive
                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/30 font-medium shadow-sm"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Social Links & Resume Button */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="https://github.com/GarryMarkus"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors rounded-lg hover:bg-white/[0.04]"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/prem-singh-88662130a"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors rounded-lg hover:bg-white/[0.04]"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64c0-.91-.73-1.64-1.64-1.64s-1.64.73-1.64 1.64c0 .91.73 1.64 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78Z"/>
              </svg>
            </a>

            <a
              href="/Prem_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-[var(--color-border-subtle)] hover:border-blue-500/40 bg-white/[0.02] hover:bg-blue-500/10 text-xs font-mono text-[var(--color-text-primary)] transition-all flex items-center gap-1.5 no-underline ml-1"
            >
              <span>Resume</span>
              <svg className="w-3 h-3 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-white/[0.04]"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-base)] px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-mono transition-colors no-underline ${
                    isActive
                      ? "bg-blue-500/15 text-blue-400 font-medium"
                      : "text-[var(--color-text-secondary)] hover:bg-white/[0.04]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-3 mt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/GarryMarkus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[var(--color-text-muted)] hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/prem-singh-88662130a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[var(--color-text-muted)] hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:premsinghiitjee@gmail.com"
                  className="text-xs font-mono text-[var(--color-text-muted)] hover:text-white"
                >
                  Email
                </a>
              </div>
              <a
                href="/Prem_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono px-3 py-1 bg-blue-500/15 border border-blue-500/30 text-blue-400 rounded-md"
              >
                Resume.pdf
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 z-10">
        <Outlet />
      </main>

      {/* Site Footer */}
      <footer className="w-full border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]/50 py-8 z-10 font-mono text-xs text-[var(--color-text-muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Garry Markus (Prem Singh)</span>
            <span>·</span>
            <span>Built with React + Vite</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>India (UTC+5:30)</span>
            </span>
            <a 
              href="mailto:premsinghiitjee@gmail.com"
              className="text-[var(--color-text-secondary)] hover:text-white no-underline transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
