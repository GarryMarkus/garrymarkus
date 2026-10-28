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
    { code: "01", name: "OVERVIEW", path: "/" },
    { code: "02", name: "PROJECTS", path: "/projects" },
    { code: "03", name: "TECHNICAL LOG", path: "/blog" },
    { code: "04", name: "EXPERIENCE", path: "/experience" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] flex flex-col relative selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Top Telemetry Ribbon */}
      <div className="w-full border-b border-[var(--color-border-hairline)] bg-[var(--color-bg-subtle)] text-[11px] font-mono text-[var(--color-text-muted)] tracking-wider">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-text-primary)] font-semibold tracking-normal">
              GARRY MARKUS / PREM SINGH
            </span>
            <span className="text-[var(--color-border-strong)] hidden sm:inline">|</span>
            <span className="hidden sm:inline">SYS_LOC: 28.61°N, 77.20°E [DELHI]</span>
            <span className="text-[var(--color-border-strong)] hidden sm:inline">·</span>
            <span className="hidden sm:inline">UTC+5:30</span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[10px]">
            <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 bg-emerald-400" />
              STATUS: NOMINAL / OPEN_FOR_ROLES
            </span>
          </div>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border-hairline)] bg-[var(--color-bg-base)]/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          
          {/* Brand Monogram */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-mono text-xs font-semibold text-[var(--color-text-primary)] hover:text-white transition-colors no-underline group"
          >
            <div className="w-7 h-7 border border-[var(--color-border-medium)] bg-[var(--color-bg-surface)] flex items-center justify-center text-[var(--color-text-primary)] group-hover:border-[var(--color-text-primary)] transition-colors">
              GM
            </div>
            <span className="tracking-tight text-sm font-display font-bold">GARRY MARKUS</span>
          </Link>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 font-mono text-xs">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-3 py-1.5 border transition-all duration-100 no-underline ${
                    isActive
                      ? "border-[var(--color-border-strong)] bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-primary)] font-medium"
                      : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]"
                  }`
                }
              >
                [{link.code}. {link.name}]
              </NavLink>
            ))}
          </nav>

          {/* Fast Quick Links */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs">
            <a
              href="https://github.com/GarryMarkus"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] border border-transparent hover:border-[var(--color-border-hairline)] hover:bg-[var(--color-bg-subtle)] transition-colors no-underline"
              aria-label="GitHub Profile"
            >
              [GITHUB]
            </a>

            <a
              href="https://linkedin.com/in/prem-singh-88662130a"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] border border-transparent hover:border-[var(--color-border-hairline)] hover:bg-[var(--color-bg-subtle)] transition-colors no-underline"
              aria-label="LinkedIn Profile"
            >
              [LINKEDIN]
            </a>

            <a
              href="/Prem_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 border border-[var(--color-border-medium)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-colors no-underline"
            >
              [RESUME.PDF]
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:text-white"
            aria-label="Toggle navigation menu"
          >
            <span className="font-mono text-xs px-1">
              {mobileMenuOpen ? "[CLOSE]" : "[MENU]"}
            </span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] px-4 py-3 flex flex-col gap-1.5 font-mono text-xs">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 border transition-colors no-underline ${
                    isActive
                      ? "border-[var(--color-border-strong)] bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-primary)] font-medium"
                      : "border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]"
                  }`
                }
              >
                [{link.code}. {link.name}]
              </NavLink>
            ))}

            <div className="pt-3 mt-2 border-t border-[var(--color-border-hairline)] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/GarryMarkus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 border border-[var(--color-border-hairline)] text-[var(--color-text-muted)] hover:text-white no-underline"
                >
                  [GITHUB]
                </a>
                <a
                  href="https://linkedin.com/in/prem-singh-88662130a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 border border-[var(--color-border-hairline)] text-[var(--color-text-muted)] hover:text-white no-underline"
                >
                  [LINKEDIN]
                </a>
              </div>
              <a
                href="/Prem_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 border border-[var(--color-border-medium)] bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-primary)] no-underline"
              >
                [RESUME.PDF]
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 z-10 animate-page-enter">
        <Outlet />
      </main>

      {/* Industrial Specification Ledger Footer */}
      <footer className="w-full border-t border-[var(--color-border-hairline)] bg-[var(--color-bg-subtle)] py-8 z-10 font-mono text-xs text-[var(--color-text-muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-[var(--color-border-hairline)]">
            {/* System Coordinates & Identity */}
            <div className="space-y-1">
              <div className="text-[var(--color-text-primary)] font-semibold text-xs tracking-wider">
                SPECIFICATION LEDGER // GM-2026
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                ENGINEER: Prem Singh (Garry Markus)
                <br />
                ACADEMIC: ABES Engineering College (CSE)
                <br />
                LOCATION: Delhi NCR, India (28.61°N, 77.20°E)
              </p>
            </div>

            {/* Architecture Metrics */}
            <div className="space-y-1">
              <div className="text-[var(--color-text-primary)] font-semibold text-xs tracking-wider">
                RUNTIME TELEMETRY
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                STACK: React 19 · Vite 6 · Tailwind CSS 4
                <br />
                PARADIGM: 100% Client-Side SPA (Zero Cloud Run)
                <br />
                STYLING: Swiss Industrial Editorial (Anti-AI)
              </p>
            </div>

            {/* Quick Dispatch & Indices */}
            <div className="space-y-1 md:text-right">
              <div className="text-[var(--color-text-primary)] font-semibold text-xs tracking-wider">
                DISPATCH & REPOSITORY
              </div>
              <div className="text-[11px] flex flex-col md:items-end gap-1 text-[var(--color-text-secondary)]">
                <a
                  href="mailto:premsinghiitjee@gmail.com"
                  className="text-[var(--color-text-primary)] hover:underline no-underline"
                >
                  premsinghiitjee@gmail.com
                </a>
                <a
                  href="https://github.com/GarryMarkus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline no-underline"
                >
                  github.com/GarryMarkus
                </a>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="hover:text-[var(--color-text-primary)] text-left md:text-right transition-colors"
                >
                  [RETURN_TO_TOP ↑]
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <span>© {new Date().getFullYear()} PREM SINGH. NO RIGHTS RESERVED / MIT OPEN SPECIFICATION.</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400" />
              SYSTEM CLOCK: UTC+5:30 (IST)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
