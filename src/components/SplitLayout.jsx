import { Outlet, NavLink, useLocation } from "react-router-dom";
import Anchor from "./Anchor.jsx";

export default function SplitLayout() {
  const location = useLocation();

  const mobileNav = [
    { label: "Overview", path: "/" },
    { label: "Systems", path: "/projects" },
    { label: "Dossiers", path: "/blog" },
    { label: "Career", path: "/experience" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Structural Max-Width Frame */}
      <div className="max-w-[1536px] mx-auto min-h-screen flex flex-col lg:flex-row border-x border-[var(--color-border-hairline)] relative">
        
        {/* Left Column: Pinned Anchor Viewport */}
        <Anchor />

        {/* Right Column: The Dynamic Stage */}
        <main className="w-full lg:w-[62%] min-h-screen flex flex-col p-6 sm:p-8 lg:p-12 pb-24 lg:pb-12 bg-[var(--color-bg-base)]">
          <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col animate-stage-enter">
            <Outlet />
          </div>
        </main>

      </div>

      {/* Mobile Sticky Utility Dock (Visible only on < lg screens) */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg-surface-elevated)]/95 border-t border-[var(--color-border-hairline)] px-4 py-2 flex items-center justify-around font-mono text-xs"
      >
        {mobileNav.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={`px-3 py-1.5 border transition-colors no-underline ${
                isActive
                  ? "border-[var(--color-border-strong)] bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-semibold"
                  : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>

    </div>
  );
}
