
import Link from "next/link";

const categories = [
  {
    name: "Photo Studios",
    icon: "📸",
    description: "Perfect spaces for photography and creative shoots.",
    cardStyle: "border-gel-photo/30 bg-gel-photo/10",
    iconStyle: "bg-gel-photo",
  },
  {
    name: "Sound Stages",
    icon: "🎬",
    description: "Professional spaces for film and video production.",
    cardStyle: "border-gel-sound/30 bg-gel-sound/10",
    iconStyle: "bg-gel-sound",
  },
  {
    name: "Podcast Rooms",
    icon: "🎙️",
    description: "Create your next podcast in a dedicated space.",
    cardStyle: "border-gel-podcast/30 bg-gel-podcast/10",
    iconStyle: "bg-gel-podcast",
  },
  {
    name: "Music Suites",
    icon: "🎵",
    description: "Spaces for recording, mixing, and making music.",
    cardStyle: "border-gel-music/30 bg-gel-music/10",
    iconStyle: "bg-gel-music",
  },
  {
    name: "Art Workshops",
    icon: "🎨",
    description: "Creative spaces to explore your artistic ideas.",
    cardStyle: "border-gel-art/30 bg-gel-art/10",
    iconStyle: "bg-gel-art",
  },
];

export default function StudioCategories() {
  return (
    <section className="bg-secondary/40 px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-medium text-primary">
            Explore by category
          </p>

          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Find Your Creative Space
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover the perfect space for your next creative project.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/studios?category=${encodeURIComponent(category.name)}`}
              className={`group rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${category.cardStyle}`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl text-[#26272E] ${category.iconStyle}`}
                >
                  {category.icon}
                </span>

                <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground">
                  Explore
                </span>
              </div>

              <h3 className="font-heading text-xl font-semibold text-foreground">
                {category.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
