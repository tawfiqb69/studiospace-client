"use client";

import Link from "next/link";
import { toast } from "sonner";
import { FaStar, FaMapMarkerAlt, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { privateFetch } from "@/lib/api";
import DeleteStudioModal from "./DeleteStudioModal";

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
        <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-muted text-4xl">
          📸
        </div>

        <h1 className="font-heading text-2xl font-bold">
          You haven&apos;t listed a studio yet
        </h1>

        <p className="mt-2 max-w-md text-muted-foreground">
          Start sharing your creative space with people looking for the perfect
          studio.
        </p>

        <Link
          href="/add-studio"
          className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Add your first studio
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Studio management</p>

          <h1 className="mt-2 font-heading text-3xl font-bold">
            My Studio Listings
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage and keep track of your creative spaces.
          </p>
        </div>

        <Link
          href="/add-studio"
          className="w-fit rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
        >
          + Add New Studio
        </Link>
      </div>

      <div className="mb-5 text-sm text-muted-foreground">
        {studios.length} {studios.length === 1 ? "studio" : "studios"} listed
      </div>

      <div className="space-y-4">
        {studios.map((studio) => (
          <div
            key={studio._id}
            className="flex flex-col gap-5 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
          >
            <img
              src={studio.image}
              alt={studio.title}
              className="h-48 w-full rounded-lg object-cover sm:h-28 sm:w-36"
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-heading text-lg font-bold">
                  {studio.title}
                </h2>

                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {studio.category}
                </span>
              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <FaMapMarkerAlt />
                {studio.location}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <span className="font-semibold text-primary">
                  ${studio.hourlyRate}/hr
                </span>

                <span className="flex items-center gap-1 text-muted-foreground">
                  <FaStar className="text-gel" />
                  {Number(studio.rating || 0).toFixed(1)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:justify-end">
              <Link
                href={`/studios/${studio._id}`}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted"
              >
                <FaEye />
                View
              </Link>

              <Link
                href={`/studios/edit/${studio._id}`}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted"
              >
                <FaEdit />
                Update
              </Link>

              <button
                type="button"
                onClick={() => setSelectedStudio(studio)}
                className="flex items-center gap-2 rounded-lg border border-destructive/30 px-3 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
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
