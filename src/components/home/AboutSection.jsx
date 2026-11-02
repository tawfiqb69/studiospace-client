
import Link from "next/link";
import {
  Camera,
  Clapperboard,
  Mic2,
  Music2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const creativeSpaces = [
  {
    title: "Photography",
    icon: Camera,
    style: "bg-gel-photo/15 text-gel-photo",
  },
  {
    title: "Filmmaking",
    icon: Clapperboard,
    style: "bg-gel-sound/15 text-gel-sound",
  },
  {
    title: "Podcasting",
    icon: Mic2,
    style: "bg-gel-podcast/15 text-gel-podcast",
  },
  {
    title: "Music",
    icon: Music2,
    style: "bg-gel-art/15 text-gel-art",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-hidden bg-secondary/40 px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Left Content */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <Sparkles size={15} className="text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              About StudioSpace
            </span>
          </div>

          <h2 className="max-w-xl font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            A creative space for every
            <span className="text-primary"> big idea.</span>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-8 text-muted-foreground sm:text-base">
            StudioSpace is a creative space booking platform that connects
            creators with inspiring studios for their projects. From
            photography and filmmaking to podcasting and music production,
            discover spaces that help bring your ideas to life.
          </p>

          <p className="mt-4 max-w-xl text-sm leading-8 text-muted-foreground sm:text-base">
            Our goal is to make finding and booking the right creative
            workspace simple, convenient, and accessible for everyone.
          </p>

          <Link
            href="/studios"
            className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Explore Studios
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* Brand Message */}
          <div className="mt-12 flex items-center gap-4 border-t border-border pt-6">
            <div className="h-10 w-1 rounded-full bg-primary" />
            <p className="font-heading text-lg font-semibold text-foreground">
              Discover. Book. Create.
            </p>
          </div>
        </div>

        {/* Right Visual Showcase */}
        <div className="relative mx-auto w-full max-w-xl">
          {/* Decorative Background */}
          <div className="absolute -right-8 -top-8 size-40 rounded-full bg-gel-photo/20 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 size-40 rounded-full bg-gel-sound/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-xl shadow-foreground/5 sm:p-8">
            {/* Top Label */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Your creative journey
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Find your space.
                </h3>
              </div>

              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles size={23} />
              </div>
            </div>

            {/* Creative Space Tiles */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {creativeSpaces.map((space, index) => {
                const Icon = space.icon;

                return (
                  <div
                    key={space.title}
                    className="group rounded-2xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-6"
                  >
                    <div
                      className={`mb-7 flex size-12 items-center justify-center rounded-xl ${space.style} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    <p className="text-sm font-semibold text-foreground sm:text-base">
                      {space.title}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" />
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Explore spaces
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Message */}
            <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-secondary/70 p-4 sm:p-5">
              <div>
                <p className="font-heading text-base font-bold text-foreground sm:text-lg">
                  Where ideas come alive.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  One platform. Endless possibilities.
                </p>
              </div>

              <div className="flex -space-x-2">
                {creativeSpaces.map((space) => {
                  const Icon = space.icon;

                  return (
                    <div
                      key={space.title}
                      className={`flex size-9 items-center justify-center rounded-full border-2 border-card ${space.style}`}
                    >
                      <Icon size={15} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute -bottom-4 -right-3 -z-10 size-24 rounded-3xl border border-gel-photo/30 bg-gel-photo/10" />
        </div>
      </div>
    </section>
  );
}
