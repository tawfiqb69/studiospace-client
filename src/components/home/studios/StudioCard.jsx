import Image from "next/image";
import Link from "next/link";

export default function StudioCard({ studio }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      {/* Studio Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={studio.image}
          alt={studio.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
          {studio.category}
        </span>
      </div>

      {/* Studio Information */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 font-heading text-xl font-semibold text-foreground">
          {studio.title}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-semibold text-primary">
            ৳{studio.hourlyRate}
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              / hour
            </span>
          </p>

          <p className="flex items-center gap-1 text-sm text-foreground">
            <span className="text-gel">★</span>
            {Number(studio.rating || 0).toFixed(1)}
          </p>
        </div>

        <p className="mt-3 line-clamp-1 text-sm text-muted-foreground">
          <span className="mr-1">📍</span>
          {studio.location}
        </p>

        <Link
          href={`/studios/${studio._id}`}
          className="mt-auto pt-5"
        >
          <span className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            View Details
          </span>
        </Link>
      </div>
    </article>
  );
}