import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GarryMarkus is building",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-black text-white flex items-center justify-center font-mono">
        {children}
      </body>
    </html>
  );
}
