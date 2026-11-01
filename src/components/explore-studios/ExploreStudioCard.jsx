import Image from "next/image";
import Link from "next/link";

const categoryStyles = {
  "Photo Studios": "bg-gel-photo",
  "Sound Stages": "bg-gel-sound",
  "Podcast Rooms": "bg-gel-podcast",
  "Music Suites": "bg-gel-music",
  "Art Workshops": "bg-gel-art",
};

export default function ExploreStudioCard({ studio }) {
  const categoryStyle =
    categoryStyles[studio.category] || "bg-secondary";

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/studios/${studio._id}`}
        className="relative block overflow-hidden rounded-2xl bg-secondary"
      >
        <div className="relative aspect-[5/4]">
          <Image
            src={studio.image}
            alt={studio.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold text-white ${categoryStyle}`}
        >
          {studio.category}
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-sm font-semibold text-foreground">
          ★ {Number(studio.rating || 0).toFixed(1)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <div className="flex-1">
          <h3 className="font-heading text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
            {studio.title}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            📍 {studio.location}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <p className="font-heading text-lg font-bold text-foreground">
            ৳{studio.hourlyRate}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / hour
            </span>
          </p>

          <Link
            href={`/studios/${studio._id}`}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}