export default function DashboardSkeleton() {
  return (
    <div
      className="mx-auto max-w-4xl animate-pulse px-4 py-10 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      {/* Welcome card */}
      <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="size-20 shrink-0 rounded-full bg-secondary" />
        <div className="w-full min-w-0 space-y-3">
          <div className="h-9 w-64 max-w-full rounded bg-secondary" />
          <div className="h-5 w-48 max-w-full rounded bg-secondary" />
        </div>
      </div>

      {/* Overview */}
      <div className="mt-10 h-6 w-28 rounded bg-secondary" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="size-11 rounded-xl bg-secondary" />
            <div className="mt-4 h-4 w-24 rounded bg-secondary" />
            <div className="mt-2 h-10 w-16 rounded bg-secondary" />
          </div>
        ))}
      </div>

      {/* Update profile */}
      <div className="mt-10 h-6 w-36 rounded bg-secondary" />
      <div className="mt-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-16 rounded bg-secondary" />
              <div className="h-11 w-full rounded-lg bg-secondary" />
            </div>
          ))}
        </div>
        <div className="mt-6 h-10 w-full rounded-lg bg-secondary sm:w-36" />
      </div>
    </div>
  );
}