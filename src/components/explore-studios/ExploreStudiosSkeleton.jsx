export default function ExploreStudiosSkeleton() {
  return (
    <section className="px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 space-y-3 text-center">
          <div className="mx-auto h-4 w-32 animate-pulse rounded bg-secondary" />

          <div className="mx-auto h-9 w-64 animate-pulse rounded bg-secondary" />

          <div className="mx-auto h-4 w-80 max-w-full animate-pulse rounded bg-secondary" />
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex gap-3 overflow-hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-secondary"
            />
          ))}
        </div>

        {/* Studio Count */}
        <div className="mb-6 flex items-center justify-between">
          <div className="h-5 w-36 animate-pulse rounded bg-secondary" />

          <div className="h-4 w-24 animate-pulse rounded bg-secondary" />
        </div>

        {/* Studio Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              {/* Image */}
              <div className="aspect-5/4 rounded-2xl bg-secondary" />

              {/* Card Content */}
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