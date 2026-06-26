import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garry Markus",
  description: "Editorial platform for technology and systems.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Garry Markus",
    description: "Editorial platform for technology and systems.",
  },
};

export const viewport = {
  themeColor: "#FCFCFD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
