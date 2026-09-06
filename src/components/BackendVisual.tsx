import { Suspense } from "react";

async function getChessStats() {
  try {
    const res = await fetch("https://api.chess.com/pub/player/garrymarkus/stats", { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function getLichessStats() {
  try {
    const res = await fetch("https://lichess.org/api/user/garrymarkus", { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function getLeetCodeStats() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ matchedUser(username: "GarryMarkus") { submitStats { acSubmissionNum { difficulty count } } } }`
      }),
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export default async function BackendVisual() {
  const chessData = await getChessStats();
  const lichessData = await getLichessStats();
  const lcData = await getLeetCodeStats();

  // Chess.com Stats
  const rapid = chessData?.chess_rapid?.last?.rating || "1338";
  const blitz = chessData?.chess_blitz?.last?.rating || "1334";

  // Lichess Stats
  const lichessRapid = lichessData?.perfs?.rapid?.rating || "1615";
  const lichessBlitz = lichessData?.perfs?.blitz?.rating || "1603";

  // LeetCode Stats
  const lcStats = lcData?.data?.matchedUser?.submitStats?.acSubmissionNum || [];
  const easy = lcStats.find((s: any) => s.difficulty === "Easy")?.count || 35;
  const medium = lcStats.find((s: any) => s.difficulty === "Medium")?.count || 11;
  const hard = lcStats.find((s: any) => s.difficulty === "Hard")?.count || 0;
  const total = lcStats.find((s: any) => s.difficulty === "All")?.count || (easy + medium + hard);

  return (
    <div className="home-page-marker w-full h-full flex flex-col justify-center gap-6 animate-page-enter p-8 lg:p-0">
      
      {/* Header */}
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-xl font-heading font-bold text-[var(--color-text-primary)]">I play the long game. Always</h2>
      </div>

      {/* GitHub Section */}
      <div className="flex flex-col gap-3 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent)] transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[var(--color-text-primary)] font-medium flex items-center gap-2.5">
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <svg role="img" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </div>
            GitHub Contributions
          </span>
        </div>
        <div className="mt-2 w-full overflow-hidden flex items-center justify-center">
          <img 
            src="https://ghchart.rshah.org/2563eb/GarryMarkus" 
            alt="GitHub Contributions" 
            className="w-full max-w-[700px] h-auto object-cover mix-blend-multiply opacity-90"
            draggable={false}
          />
        </div>
      </div>

      {/* Grid for LeetCode & Chess Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* LeetCode Section */}
        <div className="flex flex-col gap-4 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent)] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[var(--color-text-primary)] font-medium flex items-center gap-2.5">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <img src="/leetcode-icon.ico" alt="LeetCode" className="w-full h-full object-contain grayscale contrast-200 scale-90" draggable={false} />
              </div>
              LeetCode
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="text-3xl font-heading font-bold text-[var(--color-text-primary)] tracking-tight">
              {total > 0 ? total : "400+"}
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">Problems Solved</span>
          </div>

          <div className="flex gap-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)] font-bold">Easy</span>
              <span className="text-sm font-mono text-[var(--color-text-primary)]">{easy > 0 ? easy : "150"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)] font-bold">Medium</span>
              <span className="text-sm font-mono text-[var(--color-text-primary)]">{medium > 0 ? medium : "200"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)] font-bold">Hard</span>
              <span className="text-sm font-mono text-[var(--color-text-primary)]">{hard > 0 ? hard : "50"}</span>
            </div>
          </div>
        </div>

        {/* Chess.com Section */}
        <div className="flex flex-col gap-4 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent)] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[var(--color-text-primary)] font-medium flex items-center gap-2.5">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <img src="/chesscom-icon.png" alt="Chess.com" className="w-full h-full object-contain grayscale contrast-200 scale-[1.2]" draggable={false} />
              </div>
              Chess.com
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="text-3xl font-heading font-bold text-[var(--color-text-primary)] tracking-tight">
              {rapid}
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">Rapid Rating</span>
          </div>

          <div className="flex gap-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)] font-bold">Blitz</span>
              <span className="text-sm font-mono text-[var(--color-text-primary)]">{blitz}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)] font-bold">Status</span>
              <span className="text-sm font-mono text-[var(--color-text-primary)]">Active</span>
            </div>
          </div>
        </div>

        {/* Lichess Section */}
        <div className="flex flex-col gap-4 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent)] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[var(--color-text-primary)] font-medium flex items-center gap-2.5">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <img src="/lichess-icon.png" alt="Lichess" className="w-full h-full object-contain scale-[1.4]" draggable={false} />
              </div>
              Lichess
            </span>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="text-3xl font-heading font-bold text-[var(--color-text-primary)] tracking-tight">
              {lichessRapid}
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">Rapid Rating</span>
          </div>

          <div className="flex gap-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)] font-bold">Blitz</span>
              <span className="text-sm font-mono text-[var(--color-text-primary)]">{lichessBlitz}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-primary)] font-bold">Status</span>
              <span className="text-sm font-mono text-[var(--color-text-primary)]">Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
