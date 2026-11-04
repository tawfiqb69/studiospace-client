export default function StudioDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-5 w-28 rounded bg-secondary" />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <div className="aspect-16/10 rounded-2xl bg-secondary" />
          <div className="mt-6 h-6 w-28 rounded-full bg-secondary" />
          <div className="mt-4 h-9 w-3/4 rounded bg-secondary" />
          <div className="mt-3 h-5 w-1/3 rounded bg-secondary" />

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-20 rounded-xl bg-secondary" />
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-secondary" />
            <div className="h-4 w-full rounded bg-secondary" />
            <div className="h-4 w-2/3 rounded bg-secondary" />
          </div>
        </div>

        <div className="h-72 rounded-2xl bg-secondary" />
      </div>
    </div>
  );
}