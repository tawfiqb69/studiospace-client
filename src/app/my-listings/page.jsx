
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MyListings from "@/components/my-listings/MyListings";

async function MyListingsContent() {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/my-studios`,
    {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (res.status === 401) {
    redirect("/login?redirect=/my-listings");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch your studios");
  }

  const studios = await res.json();

  return <MyListings studios={studios} />;
}

function MyListingsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    </div>
  );
}

export default function MyListingsPage() {
  return (
    <Suspense fallback={<MyListingsSkeleton />}>
      <MyListingsContent />
    </Suspense>
  );
}
