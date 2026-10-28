import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 · Page Not Located · Garry Markus";
  }, []);

  const recoveryLinks = [
    { code: "01", label: "Overview", path: "/", desc: "Primary engineering thesis & verified telemetry" },
    { code: "02", label: "Selected Systems", path: "/projects", desc: "Technical dossiers for open-source repositories" },
    { code: "03", label: "Technical Deep Dives", path: "/blog", desc: "Compiled Obsidian publications & lecture notes" },
    { code: "04", label: "Career & Background", path: "/experience", desc: "Leadership appointments & academic foundation" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20 max-w-xl mx-auto font-mono text-xs">
      
      {/* Clean Diagnostic Frame */}
      <div className="w-full border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-6 sm:p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-3 text-[11px] text-[var(--color-text-muted)]">
          <span>404 / EXCEPTION</span>
          <span>Route Not Located</span>
        </div>

        {/* Narrative */}
        <div className="space-y-2">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-text-primary)] tracking-tight">
            Target Page Not Located
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] font-sans leading-relaxed">
            The requested client route does not resolve to an active document or section in this static portfolio deployment.
          </p>
        </div>

        {/* Recovery Register Links */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider block">
            VALID SECTIONS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {recoveryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-base)] p-3.5 flex flex-col gap-1 no-underline group hover:border-[var(--color-border-strong)] transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-[var(--color-text-primary)] group-hover:underline font-semibold">
                  <span>{link.code} · {link.label}</span>
                  <span className="text-[var(--color-text-muted)] group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
                <span className="text-[11px] text-[var(--color-text-muted)] font-sans line-clamp-1">
                  {link.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Default Return Trigger */}
        <div className="pt-4 border-t border-[var(--color-border-hairline)] flex items-center justify-between">
          <Link
            to="/"
            className="px-4 py-2 border border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-bg-base)] font-semibold hover:bg-transparent hover:text-[var(--color-text-primary)] transition-all no-underline text-xs flex items-center gap-2"
          >
            <span>Return to Overview</span>
            <span>→</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
