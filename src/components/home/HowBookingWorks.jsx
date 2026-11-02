
import {
  Search,
  Clock3,
  CalendarCheck,
  Sparkles,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Spaces",
    description:
      "Explore a variety of creative studios and find the perfect space for your project.",
    color: "text-gel-photo",
    iconBg: "bg-gel-photo/15",
    dot: "bg-gel-photo",
  },
  {
    number: "02",
    icon: Clock3,
    title: "Select Shoot Hours",
    description:
      "Choose your preferred studio and select the hours that fit your schedule.",
    color: "text-gel-sound",
    iconBg: "bg-gel-sound/15",
    dot: "bg-gel-sound",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Book Instantly",
    description:
      "Complete your booking and secure your creative space with ease.",
    color: "text-gel-podcast",
    iconBg: "bg-gel-podcast/15",
    dot: "bg-gel-podcast",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Create & Produce",
    description:
      "Bring your ideas to life in a space designed for creativity and production.",
    color: "text-gel-music",
    iconBg: "bg-gel-music/15",
    dot: "bg-gel-music",
  },
];

export default function HowBookingWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 overflow-hidden bg-background px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <span className="size-2 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Simple & seamless
              </span>
            </div>

            <h2 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              From idea to creation,
              <span className="text-primary"> in four steps.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Finding and booking your perfect creative space is easier
              than ever. Just follow these four simple steps.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span className="font-heading text-5xl font-bold text-primary/20">
              04
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Simple steps
              </p>
              <p className="text-xs text-muted-foreground">
                One creative journey
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Connector */}
          <div className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-px bg-border lg:block" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-7"
                >
                  {/* Step Header */}
                  <div className="relative z-10 mb-8 flex items-center justify-between">
                    <div
                      className={`flex size-[4.5rem] items-center justify-center rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/30 ${step.color}`}
                    >
                      <Icon size={29} strokeWidth={1.7} />
                    </div>

                    <span className={`font-heading text-4xl font-bold ${step.color} opacity-30 transition-opacity duration-300 group-hover:opacity-100`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute right-8 top-[4.25rem] hidden size-3 rounded-full border-2 border-card lg:block">
                    <span className={`block size-full rounded-full ${step.dot}`} />
                  </div>

                  {/* Step Content */}
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Step {step.number}
                  </p>

                  <h3 className="font-heading text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl ${step.dot} transition-all duration-500 group-hover:w-full`} />
                </article>
              );
            })}
          </div>
        </div>

        {/* Closing Message */}
        <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-border bg-secondary/40 px-5 py-5 text-center">
          <Sparkles size={18} className="shrink-0 text-primary" />
          <p className="text-sm font-medium text-foreground">
            Your next creative project starts with the right space.
          </p>
        </div>
      </div>
    </section>
  );
}
