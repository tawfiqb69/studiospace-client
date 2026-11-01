import { Bricolage_Grotesque, Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/common/ThemeProvider";

// Body text
const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

// Headings
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudioSpace",
  description:
    "Find and book photo studios, sound stages, podcast rooms, music suites and art workshops by the hour, or list your own space.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${bricolage.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Suspense fallback={<div className="h-16 border-b border-border" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>

          <Footer />
          <Toaster
            position="top-center"
            style={{
              "--normal-bg": "var(--popover)",
              "--normal-text": "var(--popover-foreground)",
              "--normal-border": "var(--border)",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}