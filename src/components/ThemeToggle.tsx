"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[84px] h-[32px]" />; // Placeholder to avoid layout shift
  }

  const modes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "system", icon: Laptop, label: "System" },
    { value: "dark", icon: Moon, label: "Dark" },
  ];

  return (
    <div className="flex items-center bg-surface border border-border rounded-full p-1 gap-1">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = theme === mode.value;
        return (
          <button
            key={mode.value}
            onClick={() => setTheme(mode.value)}
            className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
              isActive 
                ? "bg-ink text-bg" 
                : "text-muted hover:text-ink hover:bg-surface-2"
            }`}
            aria-label={`Switch to ${mode.label} theme`}
            title={mode.label}
          >
            <Icon size={12} strokeWidth={isActive ? 2.5 : 2} />
          </button>
        );
      })}
    </div>
  );
}
