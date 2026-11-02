import {
  ShieldCheck,
  BadgeCheck,
  SlidersHorizontal,
  Headset,
  ArrowUpRight,
} from "lucide-react";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description:
      "Enjoy greater peace of mind with protection designed to support your creative sessions.",
    iconStyle: "bg-gel-photo/20 text-gel-photo",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description:
      "Connect with confidence through verified profiles on our creative space platform.",
    iconStyle: "bg-gel-sound/20 text-gel-sound",
  },
  {
    icon: SlidersHorizontal,
    title: "Equipment Safety",
    description:
      "Create comfortably with a focus on equipment safety and responsible studio use.",
    iconStyle: "bg-gel-podcast/20 text-gel-podcast",
  },
  {
    icon: Headset,
    title: "24/7 Host Support",
    description:
      "Get support whenever you need help during your creative space experience.",
    iconStyle: "bg-gel-art/20 text-gel-art",
  },
];

export default function HostGuarantee() {
  return (
    <section className="bg-secondary/40 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <span className="size-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Your trust matters
              </span>
            </div>

            <h2 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Creativity deserves
              <span className="text-primary"> peace of mind.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Focus on what you do best. We are building a creative space
              experience where trust, safety, and support come together.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 lg:pb-2">
            <span className="font-heading text-5xl font-bold tracking-tight text-primary/20 sm:text-6xl">
              04
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Core commitments
              </p>
              <p className="text-xs text-muted-foreground">
                Built around creators
              </p>
            </div>
          </div>
        </div>

        {/* Guarantee Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {guarantees.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-8"
              >
                {/* Background Number */}
                <span className="pointer-events-none absolute -right-2 -top-8 font-heading text-8xl font-bold text-foreground/[0.035] transition-all duration-300 group-hover:text-primary/[0.08]">
                  0{index + 1}
                </span>

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl ${item.iconStyle} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={27} strokeWidth={1.8} />
                    </div>

                    <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                      <span className="size-2.5 rounded-full bg-primary ring-4 ring-primary/10" />
                    </span>
                  </div>

                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xs font-bold tracking-widest text-primary">
                      0{index + 1}
                    </span>
                    <span className="h-px w-8 bg-border" />
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Our commitment
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
