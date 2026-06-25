import React from "react";
import { AsciiArt } from "./AsciiArt";

const ASCII_LOGO = `
 ██████╗  █████╗ ██████╗ ██████╗ ██╗   ██╗
██╔════╝ ██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
██║  ███╗███████║██████╔╝██████╔╝ ╚████╔╝ 
██║   ██║██╔══██║██╔══██╗██╔══██╗  ╚██╔╝  
╚██████╔╝██║  ██║██║  ██║██║  ██║   ██║   
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
`;

const AVATAR_BLOCK = `
■ ■ ■ ■ ■ ■ ■ ■
■ ■ □ □ □ □ ■ ■
■ □ ■ ■ ■ ■ □ ■
■ □ ■ □ □ ■ □ ■
■ □ ■ ■ ■ ■ □ ■
■ □ □ □ □ □ □ ■
■ ■ ■ ■ ■ ■ ■ ■
`;

export function Neofetch() {
  const info = [
    { key: "name", value: "Garry Markus" },
    { key: "role", value: "Software Engineer" },
    { key: "location", value: "Earth" },
    { key: "os", value: "Arch Linux x86_64" },
    { key: "wm", value: "Hyprland" },
    { key: "shell", value: "zsh 5.9" },
    { key: "editor", value: "neovim (btw)" },
    { key: "terminal", value: "kitty" },
    { key: "theme", value: "Dracula + Nord" },
    { key: "focus", value: "React, Next.js, TypeScript", highlight: true },
    { key: "uptime", value: "always building", success: true },
    { key: "status", value: "open to work", success: true },
  ];

  const colors = [
    "#44475a", "#ff5555", "#50fa7b", "#f1fa8c",
    "#bd93f9", "#ff79c6", "#8be9fd", "#f8f8f2"
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
      {/* Left Column */}
      <div className="md:w-[40%] flex flex-col items-center md:items-end justify-start text-[var(--accent-purple)]">
        <AsciiArt art={ASCII_LOGO.replace(/^\\n/, "")} />
        <div className="mt-4 text-[var(--accent-cyan)] opacity-70">
          <AsciiArt art={AVATAR_BLOCK.replace(/^\\n/, "")} />
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-[60%] flex flex-col justify-center">
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

        {/* Color Palette Row */}
        <div className="mt-6 flex gap-1">
          {colors.map((c) => (
            <div
              key={c}
              className="w-[14px] h-[14px] rounded-[3px]"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
