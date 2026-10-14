import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import "./globals.css";

// Self-hosted rather than next/font/google: Google Fonts fetches at build
// time, and that fetch intermittently fails on Vercel's build machines
// ("Cannot read properties of null" from the font loader) — self-hosting
// removes that external dependency entirely. Files are the exact same
// Google Fonts assets (fetched once, committed to ./fonts), so rendering is
// unchanged. Inter and Space Grotesk ship here as variable fonts (Google
// serves one file covering the whole weight axis), IBM Plex Mono as two
// static weights (it has no variable axis on Google Fonts).
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-variable.woff2",
  variable: "--font-space-grotesk",
  weight: "500 700",
});

const inter = localFont({
  src: "./fonts/Inter-variable.woff2",
  variable: "--font-inter",
  weight: "400 600",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "BusinessOS Nigeria — The Operating System for African SMEs",
  description:
    "Switch on only the parts of your business you need. HR, payroll, CRM, sales, inventory and reporting in one modular platform built for Nigerian SMEs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
