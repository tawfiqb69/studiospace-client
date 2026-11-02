
import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Mic2,
  Music2,
  Palette,
} from "lucide-react";

const categories = [
  {
    name: "Photo Studios",
    number: "01",
    icon: Camera,
    description: "Perfect spaces for photography and creative shoots.",
    cardStyle: "border-gel-photo/30 bg-gel-photo/10",
    iconStyle: "bg-gel-photo/15 text-gel-photo",
  },
  {
    name: "Sound Stages",
    number: "02",
    icon: Clapperboard,
    description: "Professional spaces for film and video production.",
    cardStyle: "border-gel-sound/30 bg-gel-sound/10",
    iconStyle: "bg-gel-sound/15 text-gel-sound",
  },
  {
    name: "Podcast Rooms",
    number: "03",
    icon: Mic2,
    description: "Create your next podcast in a dedicated space.",
    cardStyle: "border-gel-podcast/30 bg-gel-podcast/10",
    iconStyle: "bg-gel-podcast/15 text-gel-podcast",
  },
  {
    name: "Music Suites",
    number: "04",
    icon: Music2,
    description: "Spaces for recording, mixing, and making music.",
    cardStyle: "border-gel-music/30 bg-gel-music/10",
    iconStyle: "bg-gel-music/15 text-gel-music",
  },
  {
    name: "Art Workshops",
    number: "05",
    icon: Palette,
    description: "Creative spaces to explore your artistic ideas.",
    cardStyle: "border-gel-art/30 bg-gel-art/10",
    iconStyle: "bg-gel-art/15 text-gel-art",
  },
];

export default function StudioCategories() {
  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <span className="size-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Explore by category
              </span>
            </div>

            <h2 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Find the space for
              <span className="text-primary"> your next big idea.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              From photography to music production, discover a creative
              environment that brings your ideas to life.
            </p>
          </div>

          <p className="shrink-0 font-heading text-sm font-semibold text-muted-foreground">
            <span className="text-3xl font-bold text-primary">05</span>
            <span className="ml-2">Creative categories</span>
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/studios?category=${encodeURIComponent(category.name)}`}
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-7 lg:col-span-2 ${
                  index === 3
                    ? "lg:col-start-2"
                    : index === 4
                      ? "lg:col-start-4"
                      : ""
                } ${category.cardStyle}`}
              >
                {/* Decorative Background Number */}
                <span className="pointer-events-none absolute -right-2 -top-7 font-heading text-8xl font-bold text-foreground/[0.045] transition-all duration-500 group-hover:scale-110 group-hover:text-primary/[0.10]">
                  {category.number}
                </span>

                <div className="relative">
                  {/* Icon and Category Number */}
                  <div className="mb-8 flex items-center justify-between">
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl ${category.iconStyle} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={26} strokeWidth={1.8} />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-muted-foreground/70">
                      CATEGORY / {category.number}
                    </span>
                  </div>

                  {/* Card Content */}
                  <h3 className="font-heading text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                    {category.name}
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
                    {category.description}
                  </p>

                  {/* Explore Action */}
                  <div className="mt-7 flex items-center justify-between border-t border-foreground/10 pt-5">
                    <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      Explore spaces
                    </span>

                    <span className="flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
