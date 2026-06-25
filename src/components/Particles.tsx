"use client";

import React, { useEffect, useState } from "react";

export function Particles() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const count = window.innerWidth < 768 ? 10 : 25;
    const colors = [
      "var(--accent-purple)",
      "var(--accent-cyan)",
      "var(--accent-green)",
      "var(--accent-pink)",
      "var(--accent-yellow)",
    ];

    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      driftX: (Math.random() - 0.5) * 60, // px
      duration: 8 + Math.random() * 12, // 8s to 20s
      delay: -(Math.random() * 20), // staggered start
      opacity: 0.15 + Math.random() * 0.1, // 15-25%
      size: 2 + Math.random() * 2, // 2-4px
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: 0,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            "--x": `${p.x}vw`,
            "--drift-x": `${p.driftX}px`,
            "--dur": `${p.duration}s`,
            "--delay": `${p.delay}s`,
            "--opacity": p.opacity,
            animation: `float-up var(--dur) linear var(--delay) infinite`,
          } as React.CSSProperties}
        />
      ))}
      <div className="scanline-overlay" />
      <div className="vignette-overlay" />
    </div>
  );
}
