
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyBookings from "@/components/my-bookings/MyBookings";

async function MyBookingsContent() {
  const cookie = (await headers()).get("cookie");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
    {
      headers: {
        Cookie: cookie || "",
      },
      cache: "no-store",
    }
  );

  if (response.status === 401) {
    redirect("/login?redirect=/my-bookings");
  }

  if (!response.ok) {
    return <MyBookings bookings={[]} error="Unable to load your bookings." />;
  }

  const bookings = await response.json();

  return <MyBookings bookings={bookings} />;
}

export default function MyBookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-6 h-40 animate-pulse rounded-xl bg-muted" />
        </div>
      }
    >
      <MyBookingsContent />
    </Suspense>
  );
}
