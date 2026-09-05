import type { Metadata } from "next";
import { Courier_Prime, Space_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Prem Singh",
  description: "Software Engineering, Systems & Algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${courierPrime.variable} ${spaceMono.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] font-mono selection:bg-[var(--color-text-primary)] selection:text-[var(--color-bg-primary)]">
        <div className="flex flex-col lg:flex-row min-h-screen max-w-[1600px] mx-auto">
          
          {/* Left Column - Fixed on Desktop */}
          <aside className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 p-8 md:p-12 lg:p-20 xl:p-24 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div className="flex flex-col gap-10">
              <Link 
                href="/" 
                className="font-heading font-bold text-3xl md:text-4xl text-[var(--color-text-primary)] transition-opacity w-fit tracking-tight no-underline"
              >
                PREM SINGH
              </Link>
              
              <div className="flex flex-col gap-6 text-sm max-w-lg pr-4">
                <p>
                  I build robust systems from first principles.
                </p>
                <p>
                  I am passionate about writing clean, modular code, and crafting elegant client-side architectures as well as highly concurrent algorithms.
                </p>
                <p>
                  Focus areas include:<br/>
                  <span className="text-[var(--color-text-primary)]">Distributed Systems, Web Tooling, Core Algorithms.</span>
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-xs text-[var(--color-text-muted)] opacity-60">Navigation:</span>
                <nav className="flex flex-col gap-2">
                  <Link href="/" className="w-fit">Projects</Link>
                  <Link href="/experience" className="w-fit">Experience</Link>
                  <Link href="/blog" className="w-fit">Technical Log</Link>
                </nav>
              </div>
            </div>

            <div className="mt-16 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-[var(--color-text-muted)] opacity-60">Connect:</span>
                <a href="mailto:premsinghiitjee@gmail.com" className="w-fit">premsinghiitjee@gmail.com</a>
                <a href="https://github.com/GarryMarkus" target="_blank" rel="noopener noreferrer" className="w-fit text-[var(--color-text-muted)] hover:text-[var(--color-accent)] no-underline">github</a>
                <a href="https://linkedin.com/in/prem-singh-88662130a" target="_blank" rel="noopener noreferrer" className="w-fit text-[var(--color-text-muted)] hover:text-[var(--color-accent)] no-underline">linkedin</a>
                <a href="/Prem_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer" className="w-fit text-[var(--color-text-muted)] hover:text-[var(--color-accent)] no-underline">resume.pdf</a>
              </div>
              <div className="text-xs opacity-60">
                © 2026 Prem Singh.
              </div>
            </div>
          </aside>

          {/* Right Column - Scrollable Content */}
          <main className="lg:w-1/2 p-8 md:p-12 lg:p-20 xl:p-24 flex flex-col min-h-screen">
            <div className="max-w-xl w-full">
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  );
}
