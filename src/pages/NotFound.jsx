import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 · Diagnostic Exception · Garry Markus";
  }, []);

  const recoveryLinks = [
    { code: "01", label: "OVERVIEW", path: "/", desc: "Return to primary profile & telemetry ledger" },
    { code: "02", label: "PROJECTS", path: "/projects", desc: "Inspect open-source systems & architecture dossiers" },
    { code: "03", label: "TECHNICAL LOG", path: "/blog", desc: "Access compiled RFC publications & Obsidian notes" },
    { code: "04", label: "EXPERIENCE", path: "/experience", desc: "Review leadership appointments & academic foundation" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-16 animate-page-enter max-w-2xl mx-auto font-mono text-xs">
      
      {/* Terminal Diagnostic Panel */}
      <div className="w-full border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-6 sm:p-8 flex flex-col gap-6">
        
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-hairline)] pb-3 text-[11px] text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-rose-500 inline-block" />
            <span className="text-[var(--color-text-primary)] font-semibold">
              DIAGNOSTIC EXCEPTION · FAULT CODE: 0x404
            </span>
          </div>
          <div>STATUS: ROUTE_UNRESOLVED</div>
        </div>

        {/* Fault Narrative */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
            Target Resource Not Located
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] font-sans leading-relaxed">
            The requested client route does not resolve to an active document or component in this static SPA deployment. The routing engine halted dispatch to prevent undefined rendering states.
          </p>
        </div>

        {/* Telemetry Exception Ledger */}
        <div className="space-y-1">
          <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider block">
            DIAGNOSTIC LEDGER:
          </span>
          <table className="w-full text-[11px] border-collapse">
            <tbody className="divide-y divide-[var(--color-border-hairline)] border-y border-[var(--color-border-hairline)]">
              <tr>
                <td className="py-1.5 text-[var(--color-text-muted)] w-1/3">EXCEPTION ID</td>
                <td className="py-1.5 text-rose-400 font-semibold">HTTP_404_PAGE_NOT_FOUND</td>
              </tr>
              <tr>
                <td className="py-1.5 text-[var(--color-text-muted)]">DISPATCH LAYER</td>
                <td className="py-1.5 text-[var(--color-text-primary)]">React Router v6 · Client Route Fallback</td>
              </tr>
              <tr>
                <td className="py-1.5 text-[var(--color-text-muted)]">SUGGESTED RECOVERY</td>
                <td className="py-1.5 text-[var(--color-text-primary)]">Select an audited publication or system register below</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recovery Register Links */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] text-[var(--color-text-muted)] tracking-wider block">
            VALID SYSTEM INDICES:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {recoveryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-base)] p-3.5 flex flex-col gap-1 no-underline group hover:border-[var(--color-border-strong)] transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-[var(--color-text-primary)] group-hover:underline font-semibold">
                  <span>[{link.code}. {link.label}]</span>
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
            className="px-4 py-2 border border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-bg-base)] font-semibold hover:bg-transparent hover:text-[var(--color-text-primary)] transition-all no-underline text-xs"
          >
            [RE-INITIALIZE ROUTE: RETURN HOME →]
          </Link>
          <span className="text-[11px] text-[var(--color-text-muted)] hidden sm:inline">
            SYS_ID: GM-RECOVERY
          </span>
        </div>

      </div>

    </div>
  );
}
