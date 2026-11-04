export default function ExploreStudiosSkeleton() {
  return (
    <section className="animate-pulse bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-4 h-7 w-48 rounded-full bg-secondary" />

            {/* Title */}
            <div className="h-10 w-64 max-w-full rounded bg-secondary sm:h-12 sm:w-80" />

            {/* Description */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full max-w-xl rounded bg-secondary" />
              <div className="h-4 w-3/4 max-w-md rounded bg-secondary" />
            </div>
          </div>

          {/* Studio Count */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-border bg-secondary/60 px-5 py-3">
            <div className="size-10 rounded-xl bg-secondary" />

            <div className="space-y-2">
              <div className="h-5 w-10 rounded bg-secondary" />
              <div className="h-3 w-24 rounded bg-secondary" />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-9 rounded-2xl border border-border bg-secondary/40 p-3 sm:p-4">
          <div className="mb-3 px-1">
            <div className="h-3 w-36 rounded bg-secondary" />
          </div>

          <div className="flex gap-2 overflow-hidden pb-1">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-12 w-32 shrink-0 rounded-xl bg-secondary"
              />
            ))}
          </div>
        </div>

        {/* Results Heading */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-6 w-48 max-w-full rounded bg-secondary" />
            <div className="h-4 w-36 rounded bg-secondary" />
          </div>

          <div className="hidden h-7 w-44 rounded-full bg-secondary sm:block" />
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              {/* Studio Image */}
              <div className="aspect-5/4 rounded-2xl bg-secondary" />

              {/* Studio Card Content */}
              <div className="space-y-3 px-1 pt-4">
                <div className="h-6 w-3/4 rounded bg-secondary" />

                <div className="h-4 w-1/2 rounded bg-secondary" />

                <div className="mt-5 flex items-center justify-between">
                  <div className="h-5 w-24 rounded bg-secondary" />
                  <div className="h-5 w-16 rounded bg-secondary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}