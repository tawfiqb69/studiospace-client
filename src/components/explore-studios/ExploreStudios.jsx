
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ExploreStudioCard from "./ExploreStudioCard";

const categories = [
  "All Studios",
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

export default function ExploreStudios({
  studios,
  selectedCategory,
}) {
  const router = useRouter();

  const handleCategoryChange = (category) => {
    if (category === "All Studios") {
      router.push("/studios");
    } else {
      router.push(`/studios?category=${category}`);
    }
  };

  return (
    <section className="bg-background px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-medium text-primary">
            Find your perfect creative space
          </p>

          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Explore Studios
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover inspiring spaces for photography, music,
            podcasting, and your next creative project.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive =
              category === "All Studios"
                ? !selectedCategory
                : selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isActive
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {studios.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              Showing {studios.length}{" "}
              {studios.length === 1 ? "studio" : "studios"}
            </p>

            <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <ExploreStudioCard
                  key={studio._id}
                  studio={studio}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-border bg-secondary px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-background text-3xl">
              🎨
            </div>

            <h2 className="font-heading text-2xl font-bold text-foreground">
              No studios found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              We couldn&apos;t find any studios in this category.
              Try exploring other categories or add your own creative space.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => handleCategoryChange("All Studios")}
                className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
              >
                View All Studios
              </button>

              <Link
                href="/add-studio"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Add Your Studio
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
