import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 · Route Not Found · Garry Markus";
  }, []);

  const recoveryLinks = [
    { label: "Overview", path: "/", desc: "Return to the main profile & metrics" },
    { label: "Projects", path: "/projects", desc: "Explore open-source systems & desktop tools" },
    { label: "Technical Log", path: "/blog", desc: "Browse notes on DSA, Go, NumPy & Security" },
    { label: "Experience", path: "/experience", desc: "Review leadership and engineering career" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20 animate-page-enter max-w-xl mx-auto text-center gap-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 font-mono text-2xl font-bold shadow-lg shadow-rose-500/10">
        404
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
          System Route Not Found
        </h1>
        <p className="text-xs sm:text-sm font-mono text-[var(--color-text-muted)] leading-relaxed">
          The requested path does not map to any active node in this portfolio deployment.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left font-mono">
        {recoveryLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="glass-card rounded-xl p-3.5 flex flex-col gap-1 no-underline group hover:border-blue-500/40 transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-[var(--color-text-primary)] group-hover:text-blue-400 font-semibold">
              <span>{link.label}</span>
              <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <span className="text-[11px] text-[var(--color-text-muted)] line-clamp-1">
              {link.desc}
            </span>
          </Link>
        ))}
      </div>

      <Link
        to="/"
        className="mt-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-medium transition-all shadow-lg shadow-blue-600/20 no-underline"
      >
        ← Return to Overview
      </Link>
    </div>
  );
}
