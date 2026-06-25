---
title: "Building a Portfolio with Next.js and Tailwind"
date: "2024-01-15"
tags: ["nextjs", "react", "tailwind"]
description: "A deep dive into how I built this portfolio with a custom terminal theme."
readTime: 5
---

## ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
## Introduction

Welcome to my new portfolio. I wanted something that felt personal, fast, and native to my daily workflow. As someone who spends hours in a tiling window manager (specifically **Hyprland**), a generic dark theme just wasn't enough.

### The Problem

Most portfolios use heavy UI libraries. They have smooth spring animations, rounded corners everywhere, and massive images. I wanted a site that feels like opening a terminal and running `neofetch`.

### The Solution

I decided to build from scratch using:
- **Next.js App Router** for the framework
- **Tailwind CSS** for utility classes
- **Framer Motion** for minimal entrance animations
- Pure CSS for the background particles

## ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
## Implementation Details

Here is how I implemented the custom color palette.

\`\`\`css
:root {
  --bg-base:      #0d0f14;
  --bg-surface:   #111420;
  --bg-elevated:  #161926;
  --bg-border:    #1e2130;
  
  --accent-purple: #bd93f9;
  --accent-cyan:   #8be9fd;
}
\`\`\`

> I avoided using a grid background to keep it looking like a raw terminal window, but added a very subtle scanline effect.

### Typography

Everything is rendered in \`JetBrains Mono\`. There are absolutely no sans-serif fonts on this website. 

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| h1 | 1.4rem | 500 | Purple |
| h2 | 1.1rem | 500 | White |
| h3 | 0.95rem | 400 | Cyan |

## ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
## Conclusion

Building this was a lot of fun. Check out the source code on [GitHub](https://github.com/garrymarkus) if you want to learn more.
