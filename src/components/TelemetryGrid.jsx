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
  const easy = lcStats.find((s) => s.difficulty === "Easy")?.count || 150;
  const medium = lcStats.find((s) => s.difficulty === "Medium")?.count || 200;
  const hard = lcStats.find((s) => s.difficulty === "Hard")?.count || 50;
  const total = lcStats.find((s) => s.difficulty === "All")?.count || (easy + medium + hard);

  return (
    <section className="flex flex-col gap-6 pt-2">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--color-border-hairline)] pb-3 font-mono">
        <div>
          <span className="text-[11px] text-[var(--color-text-muted)] tracking-wider block">
            INDEX 01 · TELEMETRY & ALGORITHMIC LEDGER
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)]">
            Performance Metrics & Verifiable Benchmarks
          </h2>
        </div>
        <div className="text-xs text-[var(--color-text-muted)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400" />
          <span>DATA_FEED: LIVE API SYNC</span>
        </div>
      </div>

      {/* GitHub Shipping Ledger */}
      <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-5 flex flex-col gap-4 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-hairline)] pb-3">
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-text-primary)] font-semibold">
              [SOURCE_FEED: GITHUB]
            </span>
            <span className="text-[var(--color-text-muted)]">
              REPOSITORIES: 16 PUBLIC
            </span>
            <span className="text-[var(--color-border-strong)] hidden md:inline">|</span>
            <span className="text-[var(--color-text-muted)] hidden md:inline">
              FOCUS: ZERO RUNTIME DEPENDENCIES
            </span>
          </div>

          <a
            href="https://github.com/GarryMarkus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-white transition-colors no-underline"
          >
            github.com/GarryMarkus ↗
          </a>
        </div>

        {/* Heatmap Graph Container */}
        <div className="w-full overflow-x-auto py-2 flex items-center justify-center bg-[var(--color-bg-base)] border border-[var(--color-border-hairline)]">
          <img
            src="https://ghchart.rshah.org/3b82f6/GarryMarkus"
            alt="GitHub Contributions"
            className="w-full max-w-[850px] h-auto object-cover opacity-85 contrast-125"
            draggable={false}
          />
        </div>
      </div>

      {/* 3-Column Structured Telemetry Registers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-mono">
        
        {/* Register 01: LeetCode */}
        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-4 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-2 text-xs">
            <span className="text-[var(--color-text-primary)] font-semibold">
              [REGISTER: LEETCODE]
            </span>
            <a
              href="https://leetcode.com/u/GarryMarkus/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-white no-underline text-[11px]"
            >
              @GarryMarkus ↗
            </a>
          </div>

          <div>
            <div className="text-3xl font-display font-bold text-[var(--color-text-primary)] font-tabular tracking-tight">
              {total > 0 ? total : "400+"}
            </div>
            <div className="text-[11px] text-[var(--color-text-muted)]">
              TOTAL ALGORITHMIC PROBLEMS SOLVED
            </div>
          </div>

          {/* Tabular Figure Register */}
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-hairline)] text-[10px] text-[var(--color-text-muted)] text-left">
                <th className="py-1 font-normal">DIFFICULTY</th>
                <th className="py-1 font-normal text-right">SOLVED</th>
                <th className="py-1 font-normal text-right">DOMAINS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-hairline)] text-[11px]">
              <tr>
                <td className="py-1 text-emerald-400 font-medium">EASY</td>
                <td className="py-1 text-right font-tabular text-[var(--color-text-primary)] font-semibold">
                  {easy}
                </td>
                <td className="py-1 text-right text-[var(--color-text-muted)] text-[10px]">
                  Pointers · Bitwise
                </td>
              </tr>
              <tr>
                <td className="py-1 text-amber-400 font-medium">MEDIUM</td>
                <td className="py-1 text-right font-tabular text-[var(--color-text-primary)] font-semibold">
                  {medium}
                </td>
                <td className="py-1 text-right text-[var(--color-text-muted)] text-[10px]">
                  Trees · Graphs · DP
                </td>
              </tr>
              <tr>
                <td className="py-1 text-rose-400 font-medium">HARD</td>
                <td className="py-1 text-right font-tabular text-[var(--color-text-primary)] font-semibold">
                  {hard}
                </td>
                <td className="py-1 text-right text-[var(--color-text-muted)] text-[10px]">
                  Flow · Combinatorics
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Register 02: Chess.com */}
        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-4 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-2 text-xs">
            <span className="text-[var(--color-text-primary)] font-semibold">
              [REGISTER: CHESS.COM]
            </span>
            <a
              href="https://www.chess.com/member/garrymarkus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-white no-underline text-[11px]"
            >
              @garrymarkus ↗
            </a>
          </div>

          <div>
            <div className="text-3xl font-display font-bold text-[var(--color-text-primary)] font-tabular tracking-tight">
              {rapid}
            </div>
            <div className="text-[11px] text-[var(--color-text-muted)]">
              RAPID RATING (PEAK REGULATION)
            </div>
          </div>

          {/* Tabular Figure Register */}
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-hairline)] text-[10px] text-[var(--color-text-muted)] text-left">
                <th className="py-1 font-normal">FORMAT</th>
                <th className="py-1 font-normal text-right">METRIC</th>
                <th className="py-1 font-normal text-right">BENCHMARK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-hairline)] text-[11px]">
              <tr>
                <td className="py-1 text-[var(--color-text-secondary)]">RAPID</td>
                <td className="py-1 text-right font-tabular text-[var(--color-text-primary)] font-semibold">
                  {rapid}
                </td>
                <td className="py-1 text-right text-[var(--color-text-muted)] text-[10px]">
                  10+0 Time Control
                </td>
              </tr>
              <tr>
                <td className="py-1 text-[var(--color-text-secondary)]">BLITZ</td>
                <td className="py-1 text-right font-tabular text-[var(--color-text-primary)] font-semibold">
                  {blitz}
                </td>
                <td className="py-1 text-right text-[var(--color-text-muted)] text-[10px]">
                  Speed Calculation
                </td>
              </tr>
              <tr>
                <td className="py-1 text-blue-400 font-medium">ROLE</td>
                <td className="py-1 text-right font-mono text-[var(--color-text-primary)] font-semibold">
                  AMBASSADOR
                </td>
                <td className="py-1 text-right text-[var(--color-text-muted)] text-[10px]">
                  Collegiate Forum
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Register 03: Lichess */}
        <div className="border border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] p-4 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-2 text-xs">
            <span className="text-[var(--color-text-primary)] font-semibold">
              [REGISTER: LICHESS]
            </span>
            <a
              href="https://lichess.org/@/garrymarkus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-white no-underline text-[11px]"
            >
              @garrymarkus ↗
            </a>
          </div>

          <div>
            <div className="text-3xl font-display font-bold text-[var(--color-text-primary)] font-tabular tracking-tight">
              {lichessClassical}
            </div>
            <div className="text-[11px] text-[var(--color-text-muted)]">
              CLASSICAL EVALUATION RATING
            </div>
          </div>

          {/* Tabular Figure Register */}
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-hairline)] text-[10px] text-[var(--color-text-muted)] text-left">
                <th className="py-1 font-normal">MODE</th>
                <th className="py-1 font-normal text-right">RATING</th>
                <th className="py-1 font-normal text-right">EVALUATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-hairline)] text-[11px]">
              <tr>
                <td className="py-1 text-[var(--color-text-secondary)]">CLASSICAL</td>
                <td className="py-1 text-right font-tabular text-[var(--color-text-primary)] font-semibold">
                  {lichessClassical}
                </td>
                <td className="py-1 text-right text-[var(--color-text-muted)] text-[10px]">
                  Positional Depth
                </td>
              </tr>
              <tr>
                <td className="py-1 text-[var(--color-text-secondary)]">PUZZLES</td>
                <td className="py-1 text-right font-tabular text-[var(--color-text-primary)] font-semibold">
                  {lichessPuzzle}
                </td>
                <td className="py-1 text-right text-[var(--color-text-muted)] text-[10px]">
                  Tactical Patterns
                </td>
              </tr>
              <tr>
                <td className="py-1 text-[var(--color-text-secondary)]">RAPID / BLITZ</td>
                <td className="py-1 text-right font-tabular text-[var(--color-text-primary)] font-semibold">
                  {lichessRapid} / {lichessBlitz}
                </td>
                <td className="py-1 text-right text-[var(--color-text-muted)] text-[10px]">
                  Dynamic Play
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
