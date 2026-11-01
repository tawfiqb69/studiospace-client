export default function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-9 w-72 rounded bg-secondary" />
      <div className="mt-3 h-5 w-96 max-w-full rounded bg-secondary" />

      <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-border">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-28 bg-card" />
        ))}
      </div>

      <div className="mt-10 h-6 w-40 rounded bg-secondary" />
      <div className="mt-4 space-y-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-20 rounded-xl bg-secondary" />
        ))}
      </div>
    </div>
  );
}