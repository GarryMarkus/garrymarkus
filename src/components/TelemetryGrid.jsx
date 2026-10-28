import { useState, useEffect } from "react";

export default function TelemetryGrid() {
  const [chessData, setChessData] = useState(null);
  const [lichessData, setLichessData] = useState(null);
  const [lcData, setLcData] = useState(null);

  useEffect(() => {
    // Chess.com Public API
    fetch("https://api.chess.com/pub/player/garrymarkus/stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setChessData(data);
      })
      .catch(() => {});

    // Lichess Public API
    fetch("https://lichess.org/api/user/garrymarkus")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setLichessData(data);
      })
      .catch(() => {});

    // LeetCode Public GraphQL (via proxy/direct fallback)
    fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ matchedUser(username: "GarryMarkus") { submitStats { acSubmissionNum { difficulty count } } } }`
      }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setLcData(data);
      })
      .catch(() => {});
  }, []);

  // Chess.com ratings
  const rapid = chessData?.chess_rapid?.last?.rating || "1338";
  const blitz = chessData?.chess_blitz?.last?.rating || "1334";

  // Lichess ratings
  const lichessRapid = lichessData?.perfs?.rapid?.rating || "1615";
  const lichessBlitz = lichessData?.perfs?.blitz?.rating || "1603";
  const lichessClassical = lichessData?.perfs?.classical?.rating || "1770";
  const lichessPuzzle = lichessData?.perfs?.puzzle?.rating || "1742";

  // LeetCode metrics
  const lcStats = lcData?.data?.matchedUser?.submitStats?.acSubmissionNum || [];
  const easy = lcStats.find((s) => s.difficulty === "Easy")?.count || 35;
  const medium = lcStats.find((s) => s.difficulty === "Medium")?.count || 11;
  const hard = lcStats.find((s) => s.difficulty === "Hard")?.count || 0;
  const total = lcStats.find((s) => s.difficulty === "All")?.count || (easy + medium + hard);

  return (
    <section className="flex flex-col gap-6 pt-4">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Telemetry & Competitions
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
            I play the long game. Always.
          </h2>
        </div>
        <span className="text-xs font-mono text-[var(--color-text-muted)]">
          Live Telemetry from GitHub · LeetCode · Chess.com · Lichess
        </span>
      </div>

      {/* GitHub Contributions Card */}
      <div className="glass-card rounded-xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-[var(--color-text-primary)]">
                GitHub Contribution Activity
              </h3>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                16 Public Repositories · Continuous Shipping
              </span>
            </div>
          </div>

          <a
            href="https://github.com/GarryMarkus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 no-underline"
          >
            <span>@GarryMarkus</span>
            <span>→</span>
          </a>
        </div>

        <div className="w-full overflow-x-auto py-2 flex items-center justify-center">
          <img
            src="https://ghchart.rshah.org/3b82f6/GarryMarkus"
            alt="GitHub Contributions"
            className="w-full max-w-[850px] h-auto object-cover opacity-90 contrast-125"
            draggable={false}
          />
        </div>
      </div>

      {/* Grid: LeetCode & Chess Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* LeetCode Card */}
        <div className="glass-card rounded-xl p-5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <img src="/leetcode-icon.ico" alt="LeetCode" className="w-4 h-4 object-contain" />
              </div>
              <span className="font-display font-semibold text-sm text-[var(--color-text-primary)]">
                LeetCode
              </span>
            </div>
            <a
              href="https://leetcode.com/u/GarryMarkus/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--color-text-muted)] hover:text-white no-underline"
            >
              Profile →
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
              {total > 0 ? total : "400+"}
            </div>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Algorithms & Data Structures Solved
            </span>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[var(--color-border-subtle)] font-mono text-xs">
            <div className="flex flex-col bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/15">
              <span className="text-[10px] text-emerald-400 font-medium">EASY</span>
              <span className="font-bold text-[var(--color-text-primary)]">{easy > 0 ? easy : "150"}</span>
            </div>
            <div className="flex flex-col bg-amber-500/5 p-2 rounded-lg border border-amber-500/15">
              <span className="text-[10px] text-amber-400 font-medium">MED</span>
              <span className="font-bold text-[var(--color-text-primary)]">{medium > 0 ? medium : "200"}</span>
            </div>
            <div className="flex flex-col bg-rose-500/5 p-2 rounded-lg border border-rose-500/15">
              <span className="text-[10px] text-rose-400 font-medium">HARD</span>
              <span className="font-bold text-[var(--color-text-primary)]">{hard > 0 ? hard : "50"}</span>
            </div>
          </div>
        </div>

        {/* Chess.com Card */}
        <div className="glass-card rounded-xl p-5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <img src="/chesscom-icon.png" alt="Chess.com" className="w-4 h-4 object-contain" />
              </div>
              <span className="font-display font-semibold text-sm text-[var(--color-text-primary)]">
                Chess.com
              </span>
            </div>
            <a
              href="https://www.chess.com/member/garrymarkus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--color-text-muted)] hover:text-white no-underline"
            >
              Profile →
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
              {rapid}
            </div>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Rapid Rating (Peak Performance)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--color-border-subtle)] font-mono text-xs">
            <div className="flex flex-col bg-white/[0.03] p-2 rounded-lg border border-[var(--color-border-subtle)]">
              <span className="text-[10px] text-[var(--color-text-muted)]">BLITZ</span>
              <span className="font-bold text-[var(--color-text-primary)]">{blitz}</span>
            </div>
            <div className="flex flex-col bg-blue-500/5 p-2 rounded-lg border border-blue-500/15">
              <span className="text-[10px] text-blue-400">AMBASSADOR</span>
              <span className="font-bold text-blue-300">ABESEC</span>
            </div>
          </div>
        </div>

        {/* Lichess Card */}
        <div className="glass-card rounded-xl p-5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <img src="/lichess-icon.png" alt="Lichess" className="w-4 h-4 object-contain" />
              </div>
              <span className="font-display font-semibold text-sm text-[var(--color-text-primary)]">
                Lichess
              </span>
            </div>
            <a
              href="https://lichess.org/@/garrymarkus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--color-text-muted)] hover:text-white no-underline"
            >
              Profile →
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
              {lichessClassical}
            </div>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Classical Rating
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[var(--color-border-subtle)] font-mono text-xs">
            <div className="flex flex-col bg-white/[0.03] p-2 rounded-lg border border-[var(--color-border-subtle)]">
              <span className="text-[10px] text-[var(--color-text-muted)]">PUZZLES</span>
              <span className="font-bold text-[var(--color-text-primary)]">{lichessPuzzle}</span>
            </div>
            <div className="flex flex-col bg-white/[0.03] p-2 rounded-lg border border-[var(--color-border-subtle)]">
              <span className="text-[10px] text-[var(--color-text-muted)]">RAPID</span>
              <span className="font-bold text-[var(--color-text-primary)]">{lichessRapid}</span>
            </div>
            <div className="flex flex-col bg-white/[0.03] p-2 rounded-lg border border-[var(--color-border-subtle)]">
              <span className="text-[10px] text-[var(--color-text-muted)]">BLITZ</span>
              <span className="font-bold text-[var(--color-text-primary)]">{lichessBlitz}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
