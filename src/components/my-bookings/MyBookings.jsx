
"use client";

export default function MyBookings({ bookings = [], error = "" }) {
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-center text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">
          My Bookings
        </h1>
        <p className="mt-2 text-muted-foreground">
          View and manage your studio bookings.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-border px-4 py-16 text-center">
          <h2 className="text-xl font-semibold">No bookings yet</h2>
          <p className="mt-2 text-muted-foreground">
            You haven&apos;t booked any studios yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  {booking.studioTitle}
                </h2>

                <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {booking.status}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{booking.date}</span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Start Time</span>
                  <span className="font-medium">{booking.startTime}</span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">End Time</span>
                  <span className="font-medium">{booking.endTime}</span>
                </div>

                <div className="flex justify-between gap-3 border-t border-border pt-3">
                  <span className="text-muted-foreground">Total Price</span>
                  <span className="font-semibold">
                    ৳{Number(booking.totalPrice).toLocaleString("en-BD")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
