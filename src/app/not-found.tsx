import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found | Prem Singh",
};

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center py-20">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="font-mono text-sm text-[var(--color-text-muted)]">Page not found.</p>
      <Link href="/" className="font-mono text-xs mt-4 text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] px-4 py-2 hover:bg-[var(--color-border-subtle)] transition-colors">
        ← Home
      </Link>
    </div>
  );
}
