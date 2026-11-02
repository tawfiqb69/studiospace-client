
import StudioCard from "./studios/StudioCard";

export default async function FeaturedStudios() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/studios?limit=6&sort=rating`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch studios");
  }

  const studios = await response.json();

  return (
    <section className="bg-background px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-medium text-primary">
            Find your creative space
          </p>

          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Featured Studios
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore some of the top-rated creative spaces for your next project.
          </p>
        </div>

        {studios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-secondary px-5 py-12 text-center">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              No studios available yet
            </h3>
            <p className="mt-2 text-muted-foreground">
              Check back soon to discover creative spaces.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}


export function FeaturedStudiosSkeleton() {
  return (
    <section className="bg-background px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="mx-auto h-4 w-40 animate-pulse rounded bg-secondary" />
          <div className="mx-auto mt-4 h-10 w-64 animate-pulse rounded bg-secondary" />
          <div className="mx-auto mt-4 h-4 max-w-md animate-pulse rounded bg-secondary" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border"
            >
              <div className="aspect-4/3 animate-pulse bg-secondary" />
              <div className="space-y-4 p-5">
                <div className="h-6 w-3/4 animate-pulse rounded bg-secondary" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
                <div className="h-10 animate-pulse rounded bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
