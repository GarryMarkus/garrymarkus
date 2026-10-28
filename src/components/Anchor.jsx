import { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Anchor() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: "1", label: "Overview", path: "/" },
    { key: "2", label: "Selected Systems", path: "/projects" },
    { key: "3", label: "Technical Deep Dives", path: "/blog" },
    { key: "4", label: "Career & Background", path: "/experience" },
  ];

  // Hotkey navigation: 1, 2, 3, 4
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in input, textarea, or contentEditable
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target.isContentEditable
      ) {
        return;
      }

      if (e.key === "1") navigate("/");
      if (e.key === "2") navigate("/projects");
      if (e.key === "3") navigate("/blog");
      if (e.key === "4") navigate("/experience");
      if (e.key === "Escape" && location.pathname.startsWith("/blog/")) {
        navigate("/blog");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, location.pathname]);

  return (
    <aside className="w-full lg:w-[38%] lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-[var(--color-border-hairline)] p-6 sm:p-8 lg:p-12 flex flex-col justify-between gap-8 bg-[var(--color-bg-base)] shrink-0 z-30">
      
      {/* Top Header: Identity & Thesis */}
      <div className="flex flex-col gap-6">
        
        {/* Identity Block */}
        <div>
          <NavLink
            to="/"
            className="group inline-flex flex-col no-underline"
          >
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-text-primary)] tracking-tight group-hover:text-white transition-colors">
              Garry Markus
            </h1>
            <span className="font-mono text-xs text-[var(--color-text-muted)] mt-0.5">
              Prem Singh · Systems & Algorithmic Software Engineer
            </span>
          </NavLink>
        </div>

        {/* Engineering Thesis */}
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-sans leading-relaxed">
          Focused on deterministic execution, low-latency desktop utilities, and algorithmic arbiter engines. Engineered with a zero-runtime dependency philosophy and deep protocol integration.
        </p>

        {/* Live Status & Institutional Alignment */}
        <div className="border-t border-[var(--color-border-hairline)] pt-4 flex flex-col gap-2 font-mono text-[11px]">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span>FOCUS</span>
            <span className="text-[var(--color-text-secondary)] text-right">UCI Engines & FIDE Pairing</span>
          </div>
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span>STATUS</span>
            <span className="text-emerald-400 font-medium">Open for Software Roles</span>
          </div>
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span>ACADEMIC</span>
            <span className="text-[var(--color-text-secondary)]">ABESEC · B.Tech CSE (2027)</span>
          </div>
        </div>

        {/* Interactive Section Controller */}
        <nav aria-label="Primary sections" className="pt-2 flex flex-col gap-1 font-mono text-xs">
          <div className="text-[10px] text-[var(--color-text-muted)] tracking-wider mb-1">
            SECTIONS [KEYS 1–4]
          </div>
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.key}
                to={item.path}
                end={item.path === "/"}
                className={`flex items-center justify-between py-2 px-3 border transition-all no-underline ${
                  isActive
                    ? "border-[var(--color-border-strong)] bg-[var(--color-bg-surface-elevated)] text-[var(--color-text-primary)] font-semibold"
                    : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-tabular text-[var(--color-text-dim)]">
                    0{item.key}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] text-[var(--color-text-dim)] hidden sm:inline">
                  {item.key}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer: Quiet Dispatch Links */}
      <div className="border-t border-[var(--color-border-hairline)] pt-6 flex flex-col gap-3 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[var(--color-text-muted)]">
          <a
            href="https://github.com/GarryMarkus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-text-primary)] transition-colors no-underline"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/prem-singh-88662130a"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-text-primary)] transition-colors no-underline"
          >
            LinkedIn ↗
          </a>
          <a
            href="/Prem_Singh_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-text-primary)] transition-colors no-underline"
          >
            Resume ↗
          </a>
          <a
            href="mailto:premsinghiitjee@gmail.com"
            className="hover:text-[var(--color-text-primary)] transition-colors no-underline"
          >
            Email ↗
          </a>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-dim)]">
          <span>© {new Date().getFullYear()} Prem Singh</span>
          <span>Delhi NCR (UTC+5:30)</span>
        </div>
      </div>

    </aside>
  );
}
