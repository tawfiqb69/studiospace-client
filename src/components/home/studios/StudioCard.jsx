
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ArrowUpRight,
  Star,
  Clock3,
} from "lucide-react";

export default function StudioCard({ studio }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
      {/* Studio Image */}
      <div className="relative aspect-16/11 overflow-hidden bg-secondary">
        <Image
          src={studio.image}
          alt={studio.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-black/25" />

        {/* Featured Badge */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-primary" />
          Featured Space
        </div>

        {/* Rating Badge */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-sm font-semibold text-white backdrop-blur-md">
          <Star className="size-3.5 fill-gel text-gel" />
          {Number(studio.rating || 0).toFixed(1)}
        </div>

        {/* Image Bottom Content */}
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <span className="rounded-full border border-white/20 bg-black/35 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md">
            {studio.category}
          </span>

          <div className="rounded-2xl border border-white/20 bg-background/95 px-4 py-3 shadow-lg backdrop-blur-md">
            <p className="text-[10px] font-medium text-muted-foreground">
              Starting from
            </p>

            <p className="font-heading text-xl font-bold text-primary">
              ৳{studio.hourlyRate}
              <span className="ml-1 text-xs font-medium text-muted-foreground">
                /hr
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Studio Details */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 font-heading text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
            {studio.title}
          </h3>

          <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>

        {/* Card Footer */}
        <div className="mt-auto pt-6">
          <div className="mb-5 flex items-center gap-2 border-t border-border pt-5 text-xs font-medium text-muted-foreground">
            <Clock3 size={15} />
            Hourly booking
            <span className="ml-auto rounded-full bg-secondary px-3 py-1.5">
              Flexible hours
            </span>
          </div>

          <Link
            href={`/studios/${studio._id}`}
            className="group/button flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            View Studio Details
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
