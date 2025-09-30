import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from './providers'
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Word Hunt Solver - Instantly Solve iMessage Word Hunt",
  description: "Stuck on Word Hunt? Use our free Word Hunt solver to find every possible word fast. Solve your iMessage GamePigeon Word Hunt boards instantly.",
  openGraph: {
    title: "Word Hunt Solver - Instantly Solve iMessage Word Hunt",
    description:
      "Solve Word Hunt puzzles instantly with our free solver. Find every possible word and win more games.",
    url: "https://www.solvewordhunt.com",
    siteName: "Word Hunt Solver",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Hunt Solver",
    description:
      "Instantly solve iMessage Word Hunt puzzles with our free solver. Find every possible word and win more games.",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Word Hunt Solver",
              url: "https://www.solvewordhunt.com",
              description:
                "Solve Word Hunt instantly with our free Word Hunt solver. Works with iMessage and Game Pigeon.",
              applicationCategory: "PuzzleGame",
              operatingSystem: "Any",
              keywords: [
                "Word Hunt Solver",
                "Game Pigeon Word Finder",
                "Word Game Solver",
                "Word Puzzle Helper",
                "Free Word Finder",
                "Word Hunt Cheat",
                "Word Finder Game Pigeon",
                "Word Hunt Tips",
                "Boggle Solver",
                "Scrabble Helper",
                "Word Hunt Strategy",
                "Game Pigeon Cheats",
                "Find Words in Grid",
                "Word Hunt Solutions",
              ],
              inLanguage: "en",
            }),
          }}
        />
        <meta name="google-site-verification" content="lBd_NBXcA5VrenJrl4xZPRnM3clCEoL_mpg4Vtt_eZQ" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />




      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        style={{
          backgroundImage: "url('/resources/background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      >

        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
