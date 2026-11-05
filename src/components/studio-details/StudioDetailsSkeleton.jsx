export default function StudioDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      {/* Back Link */}
      <div className="h-5 w-28 rounded bg-secondary" />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Main Column */}
        <div className="min-w-0">
          {/* Studio Gallery */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="aspect-16/10 rounded-2xl bg-secondary sm:row-span-2" />
            <div className="hidden aspect-16/10 rounded-2xl bg-secondary sm:block" />
            <div className="hidden aspect-16/10 rounded-2xl bg-secondary sm:block" />
          </div>

          {/* Studio Information */}
          <div className="mt-8">
            <div className="h-7 w-32 rounded-full bg-secondary" />
            <div className="mt-4 h-9 w-3/4 rounded bg-secondary" />

            <div className="mt-3 flex flex-wrap gap-5">
              <div className="h-5 w-40 rounded bg-secondary" />
              <div className="h-5 w-28 rounded bg-secondary" />
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="rounded-xl bg-secondary p-4">
                <div className="h-3 w-20 rounded bg-muted" />
                <div className="mt-3 h-5 w-24 max-w-full rounded bg-muted" />
              </div>
            ))}
          </div>

          {/* Overview */}
          <section className="mt-10 border-t border-border pt-8">
            <div className="h-7 w-44 rounded bg-secondary" />

            <div className="mt-4 space-y-3">
              <div className="h-4 w-full rounded bg-secondary" />
              <div className="h-4 w-full rounded bg-secondary" />
              <div className="h-4 w-2/3 rounded bg-secondary" />
            </div>
          </section>

          {/* Amenities */}
          <section className="mt-10 border-t border-border pt-8">
            <div className="h-7 w-28 rounded bg-secondary" />

            <div className="mt-4 flex flex-wrap gap-2">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-9 w-28 rounded-full bg-secondary"
                />
              ))}
            </div>
          </section>

          {/* Host */}
          <section className="mt-10 border-t border-border pt-8">
            <div className="h-7 w-28 rounded bg-secondary" />

            <div className="mt-4 flex items-center gap-4">
              <div className="size-12 shrink-0 rounded-full bg-secondary" />

              <div className="space-y-2">
                <div className="h-5 w-32 rounded bg-secondary" />
                <div className="h-4 w-44 max-w-full rounded bg-secondary" />
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="mt-10 border-t border-border pt-8">
            <div className="h-7 w-24 rounded bg-secondary" />

            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="border-b border-border py-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="h-5 w-32 rounded bg-secondary" />
                  <div className="h-5 w-12 rounded bg-secondary" />
                </div>

                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full rounded bg-secondary" />
                  <div className="h-4 w-2/3 rounded bg-secondary" />
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Booking Card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="h-9 w-36 rounded bg-secondary" />
            <div className="mt-3 h-4 w-full rounded bg-secondary" />

            <div className="mt-6 h-12 rounded-lg bg-secondary" />

            <div className="mt-4 h-4 w-3/4 rounded bg-secondary" />
          </div>
        </aside>
      </div>
    </div>
  );
}