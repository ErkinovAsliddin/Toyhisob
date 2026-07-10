import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "To'y Platform — Plan Your Wedding, Not Your Debt",
  description:
    "Wedding planning & marketplace for Uzbekistan. Compare real costs, build a realistic budget, and plan the wedding you want — not the one social pressure pushes you into.",
  keywords: [
    "wedding planner uzbekistan",
    "to'y",
    "to'y rejalashtirish",
    "wedding budget",
    "wedding vendors tashkent",
  ],
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
