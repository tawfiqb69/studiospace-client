import { Bricolage_Grotesque, Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
      className={`${instrumentSans.variable} ${bricolage.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}