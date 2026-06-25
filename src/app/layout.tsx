import type { Metadata } from "next";
import { Lexend, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Home, BookOpen } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Particles } from "@/components/Particles";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-headings",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Portfolio`,
  description: `Personal portfolio — ${siteConfig.role}.`,
  openGraph: {
    title: `${siteConfig.name} | Portfolio`,
    description: `Personal portfolio — ${siteConfig.role}.`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexend.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[var(--bg-base)] text-white min-h-screen flex flex-col lg:flex-row">
        <Particles />

        {/* 1. Mobile Top Navigation Header */}
        <header className="lg:hidden flex items-center justify-between h-14 w-full bg-[var(--bg-surface)] border-b-2 border-black px-4 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 rounded-lg border-2 border-black bg-[var(--accent-lime)] flex items-center justify-center shadow-brutal-sm">
              <span className="font-mono text-black text-[11px] font-extrabold">GM</span>
            </div>
            <span className="font-headings font-extrabold text-[12px] text-white tracking-tight uppercase">
              {siteConfig.name}
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="text-[var(--text-secondary)] hover:text-white transition-colors" title="Home">
              <Home size={18} className="stroke-[2.5]" />
            </Link>
            <Link href="/blog" className="text-[var(--text-secondary)] hover:text-white transition-colors" title="Library">
              <BookOpen size={18} className="stroke-[2.5]" />
            </Link>
          </div>
        </header>

        {/* 2. Desktop Left Sidebar */}
        <aside className="hidden lg:flex w-[264px] h-[calc(100vh-2rem)] fixed left-4 top-4 bg-[var(--bg-surface)] border-2 border-black rounded-[24px] p-6 shadow-brutal z-30">
          <Sidebar />
        </aside>

        {/* 3. Main Content Area */}
        <main className="relative z-10 flex-1 w-full min-h-screen lg:pl-[296px] px-4 lg:px-8 py-6 lg:py-6 bg-[var(--bg-base)]">
          {children}
        </main>
      </body>
    </html>
  );
}
