"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Clapperboard,
  Grid2X2,
  Mic2,
  Music2,
  Palette,
  Sparkles,
} from "lucide-react";

import ExploreStudioCard from "./ExploreStudioCard";

const categories = [
  { label: "All Studios", Icon: Grid2X2 },
  { label: "Photo Studios", Icon: Camera },
  { label: "Sound Stages", Icon: Clapperboard },
  { label: "Podcast Rooms", Icon: Mic2 },
  { label: "Music Suites", Icon: Music2 },
  { label: "Art Workshops", Icon: Palette },
];

export default function ExploreStudios({ studios, selectedCategory }) {
  const router = useRouter();

  const handleCategoryChange = (category) => {
    if (category === "All Studios") {
      router.push("/studios");
    } else {
      router.push(`/studios?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <section className="bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary">
              <Sparkles className="size-3.5" />
              FIND YOUR CREATIVE SPACE
            </div>

            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Explore Studios
              <span className="text-primary">.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Discover inspiring spaces for photography, music, podcasting,
              and your next creative project.
            </p>
          </div>

          {/* Studio Count */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-border bg-secondary/60 px-5 py-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Grid2X2 className="size-5" />
            </div>

            <div>
              <p className="font-heading text-xl font-bold leading-none text-foreground">
                {studios.length}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {studios.length === 1 ? "Creative space" : "Creative spaces"}
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-9 rounded-2xl border border-border bg-secondary/40 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              BROWSE BY CATEGORY
            </p>

            {selectedCategory && (
              <button
                type="button"
                onClick={() => handleCategoryChange("All Studios")}
                className="text-xs font-semibold text-primary transition-colors hover:text-primary/75"
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(({ label, Icon }) => {
              const isActive =
                label === "All Studios"
                  ? !selectedCategory
                  : selectedCategory === label;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleCategoryChange(label)}
                  aria-pressed={isActive}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/15"
                      : "border-transparent bg-background text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Heading */}
        {studios.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                  {selectedCategory || "All creative spaces"}
                </h2>

                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  Showing {studios.length}{" "}
                  {studios.length === 1 ? "studio" : "studios"}
                  {selectedCategory ? " in this category" : ""}
                </p>
              </div>

              <span className="hidden rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground sm:inline-flex">
                Explore your possibilities
              </span>
            </div>

            {/* Studio Grid */}
            <div className="grid grid-cols-1 gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <ExploreStudioCard key={studio._id} studio={studio} />
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary/50 px-6 py-16 text-center sm:py-20">
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative mx-auto flex size-20 items-center justify-center rounded-2xl border border-primary/15 bg-background text-primary shadow-sm">
              <Palette className="size-9" />
            </div>

            <div className="relative mx-auto mt-6 max-w-md">
              <p className="text-xs font-semibold tracking-widest text-primary">
                NEW POSSIBILITIES AWAIT
              </p>

              <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                No studios found
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                We couldn&apos;t find any studios in this category. Explore
                other creative spaces or share your own space with creators.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleCategoryChange("All Studios")}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:text-primary"
                >
                  View All Studios
                  <ArrowRight className="size-4" />
                </button>

                <Link
                  href="/add-studio"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Add Your Studio
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}