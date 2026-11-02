"use client";

import { useState } from "react";
import Link from "next/link";
import { Aperture, ArrowUpRight } from "lucide-react";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
];

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const socials = [
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Subscribed. We'll email you when new studios open up.");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-secondary">
      <div className="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand and mission */}
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/15 transition-transform duration-300 group-hover:rotate-6">
                <Aperture className="size-5" aria-hidden="true" />
              </span>

              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                StudioSpace<span className="text-primary">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              We help creators find the right room for the work, and help space
              owners earn from rooms that would otherwise sit empty.
            </p>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-sm font-bold text-foreground">
              Quick links
            </h2>

            <ul className="mt-5 space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular categories */}
          <div className="lg:col-span-3">
            <h2 className="font-heading text-sm font-bold text-foreground">
              Popular categories
            </h2>

            <ul className="mt-5 space-y-3.5">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category)}`}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-background/70 p-5 shadow-sm backdrop-blur-sm">
              <h2 className="font-heading text-sm font-bold text-foreground">
                Get new studios in your inbox
              </h2>

              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Stay updated with new creative spaces and opportunities.
              </p>

              <form onSubmit={handleSubscribe} className="mt-4 space-y-3">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  aria-label="Email address"
                  className="h-11 rounded-xl border-border bg-card text-sm"
                />

                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl text-sm font-semibold shadow-sm shadow-primary/10 transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
                >
                  Subscribe
                  <ArrowUpRight size={16} />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">
              © 2026 StudioSpace. All rights reserved.
            </p>
            <p>Using this site means you accept our terms and conditions.</p>
          </div>

          {/* Social links */}
          <ul className="flex items-center gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/15"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}