
const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Discover Spaces",
    description:
      "Explore a variety of creative studios and find the perfect space for your project.",
    cardStyle: "border-gel-photo/30 bg-gel-photo/10",
    iconStyle: "bg-gel-photo",
  },
  {
    number: "02",
    icon: "🕒",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred studio and select the hours that fit your schedule.",
    cardStyle: "border-gel-sound/30 bg-gel-sound/10",
    iconStyle: "bg-gel-sound",
  },
  {
    number: "03",
    icon: "📅",
    title: "Book Instantly",
    description:
      "Complete your booking and secure your creative space with ease.",
    cardStyle: "border-gel-podcast/30 bg-gel-podcast/10",
    iconStyle: "bg-gel-podcast",
  },
  {
    number: "04",
    icon: "✨",
    title: "Create & Produce",
    description:
      "Bring your ideas to life in a space designed for creativity and production.",
    cardStyle: "border-gel-music/30 bg-gel-music/10",
    iconStyle: "bg-gel-music",
  },
];

export default function HowBookingWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-secondary/40 px-5 py-16 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 font-medium text-primary">
            Simple & seamless
          </p>

          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            How Booking Works
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Finding and booking your perfect creative space is easier than
            ever. Just follow these four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className={`group rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${step.cardStyle}`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl text-[#26272E] ${step.iconStyle}`}
                >
                  {step.icon}
                </span>

                <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground">
                  Step {step.number}
                </span>
              </div>

              <h3 className="font-heading text-xl font-semibold text-foreground">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
