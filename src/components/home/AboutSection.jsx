
import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-secondary/40 px-5 py-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 font-medium text-primary">
            About StudioSpace
          </p>

          <h2 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            A Creative Space for Every Big Idea
          </h2>

          <p className="mt-6 leading-8 text-muted-foreground">
            StudioSpace is a creative space booking platform that connects
            creators with inspiring studios for their projects. From
            photography and filmmaking to podcasting and music production,
            discover spaces that help bring your ideas to life.
          </p>

          <p className="mt-4 leading-8 text-muted-foreground">
            Our goal is to make finding and booking the right creative
            workspace simple, convenient, and accessible for everyone.
          </p>

          <Link
            href="/studios"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Explore Studios
          </Link>
        </div>

        <div className="relative rounded-3xl border border-gel-photo/30 bg-gel-photo/10 p-8 sm:p-12">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gel-photo text-3xl text-[#26272E]">
              📸
            </div>

            <h3 className="font-heading text-2xl font-bold text-foreground">
              Where creativity finds its space.
            </h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              Discover. Book. Create. Everything you need to make your next
              creative project happen.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Photography", "Filmmaking", "Podcasting", "Music"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
