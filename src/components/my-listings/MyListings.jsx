"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Camera, Eye, MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { privateFetch } from "@/lib/api";
import DeleteStudioModal from "./DeleteStudioModal";

// Protita category-r nijer rong (brand category colors)
const categoryColors = {
  "Photo Studios": "#D97868",
  "Sound Stages": "#8270BD",
  "Podcast Rooms": "#4D9D8B",
  "Music Suites": "#D0A03D",
  "Art Workshops": "#A77BB2",
};

function getCategoryColor(category) {
  return categoryColors[category] || "#C0245E";
}

export default function MyListings({ studios }) {
  const router = useRouter();

  const [selectedStudio, setSelectedStudio] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedStudio) return;

    setIsDeleting(true);

    try {
      const result = await privateFetch(`/api/studios/${selectedStudio._id}`, {
        method: "DELETE",
      });

      if (!result.ok) {
        toast.error(result.data?.message || "Failed to delete studio");
        return;
      }

      toast.success("Studio deleted successfully");
      setSelectedStudio(null);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (studios.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <span className="mb-5 flex size-20 items-center justify-center rounded-full bg-muted text-primary">
          <Camera className="size-9" aria-hidden="true" />
        </span>

        <h1 className="font-heading text-2xl font-bold">
          You haven&apos;t listed a studio yet
        </h1>

        <p className="mt-2 max-w-md text-muted-foreground">
          Start sharing your creative space with people looking for the perfect
          studio.
        </p>

        <Link
          href="/add-studio"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add your first studio
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Studio management
          </p>

          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            My Studio Listings
          </h1>

          <p className="mt-2 text-muted-foreground">
            <span className="font-semibold text-foreground">
              {studios.length}
            </span>{" "}
            {studios.length === 1 ? "space" : "spaces"} live on StudioSpace.
          </p>
        </div>

        <Link
          href="/add-studio"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 sm:w-fit"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add New Studio
        </Link>
      </div>

      {/* Listings */}
      <div className="space-y-5">
        {studios.map((studio) => {
          const color = getCategoryColor(studio.category);

          return (
            <article
              key={studio._id}
              className="group grid overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]"
            >
              {/* Image: sob card-e same size */}
              <div className="relative h-52 w-full overflow-hidden sm:h-full sm:min-h-48">
                <Image
                  src={studio.image}
                  alt={studio.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Rating chip */}
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                  <Star className="size-3.5 fill-gel text-gel" aria-hidden="true" />
                  {Number(studio.rating || 0).toFixed(1)}
                </span>

                {/* Category rong-er line */}
                <span
                  className="absolute inset-x-0 bottom-0 h-1"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
              </div>

              {/* Details */}
              <div className="flex min-w-0 flex-col justify-between gap-5 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                      {studio.category}
                    </span>

                    <h2 className="mt-1.5 font-heading text-xl font-bold leading-snug sm:text-2xl">
                      {studio.title}
                    </h2>

                    <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
                      <MapPin
                        className="mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">{studio.location}</span>
                    </p>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 sm:text-right">
                    <p className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                      ৳{Number(studio.hourlyRate).toLocaleString("en-BD")}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      per hour
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2 border-t border-dashed border-border pt-4 sm:flex sm:justify-end">
                  <Link
                    href={`/studios/${studio._id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted"
                  >
                    <Eye className="size-4" aria-hidden="true" />
                    View
                  </Link>

                  <Link
                    href={`/studios/edit/${studio._id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted"
                  >
                    <Pencil className="size-4" aria-hidden="true" />
                    Update
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedStudio(studio)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-destructive/30 px-3 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <DeleteStudioModal
        open={Boolean(selectedStudio)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setSelectedStudio(null);
          }
        }}
        studioTitle={selectedStudio?.title || ""}
        onConfirm={handleDelete}
        loading={isDeleting}
      />
    </section>
  );
}