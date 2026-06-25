import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { StatusBar } from "@/components/StatusBar";
import { Particles } from "@/components/Particles";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Garry Markus | Portfolio",
  description: "Personal portfolio website with Hyprland terminal theme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="antialiased min-h-screen pt-[36px] pb-[28px] md:pb-[28px]">
        <Particles />
        <NavBar />
        
        <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
          {children}
        </main>
        
        <StatusBar />
      </body>
    </html>
  );
}
