import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Check, MapPin, Star } from "lucide-react";
import StudioGallery from "@/components/studio-details/StudioGallery";
import BookWorkspaceButton from "@/components/studio-details/BookWorkspaceButton";
import StudioDetailsSkeleton from "@/components/studio-details/StudioDetailsSkeleton";

const categoryStyles = {
  "Photo Studios": "bg-gel-photo",
  "Sound Stages": "bg-gel-sound",
  "Podcast Rooms": "bg-gel-podcast",
  "Music Suites": "bg-gel-music",
  "Art Workshops": "bg-gel-art",
};

function money(value) {
  return `৳${Number(value || 0).toLocaleString("en-US")}`;
}

async function StudioDetails({ params }) {
  const { id } = await params;

  let studio = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/studios/${id}`,
      { cache: "no-store" }
    );

    if (response.ok) {
      studio = await response.json();
    }
  } catch (error) {
    console.error("Studio details error:", error);
  }

  // Studio na pele (vul id, ba server error) friendly message
  if (!studio) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-semibold">
          We couldn&apos;t find that studio
        </h1>
        <p className="mt-3 text-muted-foreground">
          It may have been removed, or the link is incorrect.
        </p>
        <Link
          href="/studios"
          className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse all studios
        </Link>
      </div>
    );
  }

  const images = (studio.gallery?.length ? studio.gallery : [studio.image]).filter(Boolean);
  const amenities = studio.amenities || [];
  const reviews = studio.reviews || [];
  const categoryStyle = categoryStyles[studio.category] || "bg-secondary";
  const rating = Number(studio.rating || 0);

  const specs = [
    { label: "Category", value: studio.category },
    { label: "Max capacity", value: `${studio.maxCapacity} people` },
    { label: "Security deposit", value: money(studio.securityDeposit) },
    { label: "Address", value: studio.location },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/studios"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All studios
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Main column */}
        <div className="min-w-0">
          <StudioGallery images={images} title={studio.title} />

          <div className="mt-8">
            <span
              className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold text-white ${categoryStyle}`}
            >
              {studio.category}
            </span>

            <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {studio.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" aria-hidden="true" />
                {studio.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 fill-gel text-gel" aria-hidden="true" />
                {rating > 0 ? (
                  <>
                    <span className="font-medium text-foreground">
                      {rating.toFixed(1)}
                    </span>
                    ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                  </>
                ) : (
                  "New listing"
                )}
              </span>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {specs.map((spec) => (
              <div key={spec.label} className="rounded-xl bg-secondary p-4">
                <p className="text-xs text-muted-foreground">{spec.label}</p>
                <p className="mt-1 font-heading text-sm font-semibold">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          {/* Overview */}
          <section className="mt-10 border-t border-border pt-8">
            <h2 className="font-heading text-xl font-semibold">About this studio</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
              {studio.overview}
            </p>
          </section>

          {/* Amenities */}
          <section className="mt-10 border-t border-border pt-8">
            <h2 className="font-heading text-xl font-semibold">Amenities</h2>
            {amenities.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm"
                  >
                    <Check className="size-4 text-primary" aria-hidden="true" />
                    {amenity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-muted-foreground">
                The host hasn&apos;t listed amenities yet.
              </p>
            )}
          </section>

          {/* Host */}
          <section className="mt-10 border-t border-border pt-8">
            <h2 className="font-heading text-xl font-semibold">Your host</h2>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
                {studio.ownerName?.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="font-medium">{studio.ownerName}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {studio.ownerEmail}
                </p>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="mt-10 border-t border-border pt-8">
            <h2 className="font-heading text-xl font-semibold">
              Reviews{reviews.length > 0 && ` (${reviews.length})`}
            </h2>
            {reviews.length > 0 ? (
              <ul className="mt-2 divide-y divide-border">
                {reviews.map((review, index) => (
                  <li key={index} className="py-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium">{review.userName}</p>
                      <span className="inline-flex items-center gap-1 text-sm">
                        <Star className="size-4 fill-gel text-gel" aria-hidden="true" />
                        {Number(review.rating || 0).toFixed(1)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {review.comment}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-muted-foreground">
                No reviews yet for this studio.
              </p>
            )}
          </section>
        </div>

        {/* Booking card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-heading text-3xl font-bold">
              {money(studio.hourlyRate)}
              <span className="ml-1 text-base font-normal text-muted-foreground">
                / hour
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {money(studio.securityDeposit)} security deposit. Fits up to{" "}
              {studio.maxCapacity} people.
            </p>

            <div className="mt-6">
              <BookWorkspaceButton studioId={studio._id} />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Your request is saved as Pending until it is confirmed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function StudioDetailsPage({ params }) {
  return (
    <Suspense fallback={<StudioDetailsSkeleton />}>
      <StudioDetails params={params} />
    </Suspense>
  );
}