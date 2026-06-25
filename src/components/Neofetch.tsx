import React from "react";
import { AsciiArt } from "./AsciiArt";
import { siteConfig } from "@/lib/config";
import { ExternalLink } from "lucide-react";

const ASCII_LOGO = `
 ██████╗  █████╗ ██████╗ ██████╗ ██╗   ██╗
██╔════╝ ██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
██║  ███╗███████║██████╔╝██████╔╝ ╚████╔╝ 
██║   ██║██╔══██║██╔══██╗██╔══██╗  ╚██╔╝  
╚██████╔╝██║  ██║██║  ██║██║  ██║   ██║   
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
`;



export function Neofetch() {
  const info = [
    { key: "name", value: siteConfig.name },
    { key: "role", value: siteConfig.role },
    { key: "location", value: siteConfig.location },
    { key: "os", value: "Arch Linux x86_64" },
    { key: "wm", value: "Hyprland" },
    { key: "shell", value: "zsh 5.9" },
    { key: "editor", value: "neovim (btw)" },
    { key: "terminal", value: "kitty / alacritty" },
    { key: "theme", value: "Dracula + Nord" },
    { key: "focus", value: siteConfig.focus, highlight: true },
    { key: "uptime", value: "always building", success: true },
    { key: "status", value: siteConfig.status, success: true },
  ];

  const colors = [
    "#44475a",
    "#ff5555",
    "#50fa7b",
    "#f1fa8c",
    "#bd93f9",
    "#ff79c6",
    "#8be9fd",
    "#f8f8f2",
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
      <div className="md:w-[45%] flex flex-col items-center md:items-end justify-start text-[var(--accent-purple)]">
        <AsciiArt art={ASCII_LOGO.trim()} />
        <div className="mt-6">
          <a
            href={siteConfig.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-[var(--accent-purple)] text-[var(--accent-purple)] text-[12px] tracking-[0.1em] rounded-sm transition-all duration-150 hover:bg-[rgba(189,147,249,0.1)] hover:shadow-[0_0_12px_rgba(189,147,249,0.2)] no-underline font-mono"
          >
            [ cat resume.pdf ] <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="md:w-[55%] flex flex-col justify-center">
        <div className="flex flex-col gap-[4px] text-[13px] sm:text-[14px]">
          {info.map((item) => (
            <div key={item.key} className="flex">
              <span className="w-[80px] sm:w-[100px] text-[var(--accent-pink)] font-medium">
                {item.key}
              </span>
              <span className="text-[var(--text-muted)] mr-3">→</span>
              <span
                className={
                  item.highlight
                    ? "text-[var(--accent-cyan)]"
                    : item.success
                    ? "text-[var(--accent-green)]"
                    : "text-[var(--text-primary)]"
                }
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-1">
          {colors.map((c) => (
            <div key={c} className="w-[14px] h-[14px] rounded-[3px]" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
