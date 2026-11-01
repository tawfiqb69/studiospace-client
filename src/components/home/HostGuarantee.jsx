
const guarantees = [
  {
    icon: "🛡️",
    title: "Liability Protection",
    description:
      "Enjoy greater peace of mind with protection designed to support your creative sessions.",
    cardStyle: "border-gel-photo/30 bg-gel-photo/10",
    iconStyle: "bg-gel-photo",
  },
  {
    icon: "✓",
    title: "Verified Profiles",
    description:
      "Connect with confidence through verified profiles on our creative space platform.",
    cardStyle: "border-gel-sound/30 bg-gel-sound/10",
    iconStyle: "bg-gel-sound",
  },
  {
    icon: "🎛️",
    title: "Equipment Safety",
    description:
      "Create comfortably with a focus on equipment safety and responsible studio use.",
    cardStyle: "border-gel-podcast/30 bg-gel-podcast/10",
    iconStyle: "bg-gel-podcast",
  },
  {
    icon: "🎧",
    title: "24/7 Host Support",
    description:
      "Get support whenever you need help during your creative space experience.",
    cardStyle: "border-gel-art/30 bg-gel-art/10",
    iconStyle: "bg-gel-art",
  },
];

export default function HostGuarantee() {
  return (
    <section className="bg-secondary/40 px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 font-medium text-primary">
            Your trust matters
          </p>

          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Host Guarantee & Creator Support
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Focus on your creativity while we help make your studio
            experience more comfortable and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item) => (
            <article
              key={item.title}
              className={`rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${item.cardStyle}`}
            >
              <span
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold text-[#26272E] ${item.iconStyle}`}
              >
                {item.icon}
              </span>

              <h3 className="font-heading text-xl font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
