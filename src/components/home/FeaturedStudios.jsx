
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import StudioCard from "./studios/StudioCard";

export default async function FeaturedStudios() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/studios?limit=6&sort=rating`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch studios");
  }

  const studios = await response.json();

  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <Sparkles size={15} className="text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Curated for creators
              </span>
            </div>

            <h2 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Spaces worth
              <span className="text-primary"> creating in.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Explore some of the top-rated creative spaces, handpicked
              for your next photography, music, or production project.
            </p>
          </div>

          <Link
            href="/studios"
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            View all studios
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Studio Cards */}
        {studios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card px-5 py-16 text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles size={25} />
            </div>

            <h3 className="font-heading text-xl font-bold text-foreground">
              No studios available yet
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Check back soon to discover inspiring creative spaces.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function FeaturedStudiosSkeleton() {
  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading Skeleton */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full max-w-2xl">
            <div className="h-8 w-44 animate-pulse rounded-full bg-secondary" />
            <div className="mt-5 h-10 w-3/4 animate-pulse rounded-lg bg-secondary sm:h-12" />
            <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded bg-secondary" />
            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-secondary" />
          </div>

          <div className="h-12 w-44 animate-pulse rounded-xl bg-secondary" />
        </div>

        {/* Card Skeletons */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="aspect-16/11 animate-pulse bg-secondary" />

              <div className="space-y-5 p-5">
                <div className="h-5 w-28 animate-pulse rounded-full bg-secondary" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-secondary" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />

                <div className="border-t border-border pt-5">
                  <div className="h-11 animate-pulse rounded-xl bg-secondary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
