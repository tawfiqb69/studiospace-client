"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import { toast } from "sonner";
import { privateFetch } from "@/lib/api";
import { Button, buttonVariants } from "@/components/ui/button";
import CancelBookingModal from "@/components/my-bookings/CancelBookingModal";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const weekdays = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

// "2026-11-20" theke mash, din ar weekday ber kori (current time use kori na)
function getDateParts(dateString = "") {
  const [year, month, day] = dateString.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return { month: months[month - 1], day, weekday: weekdays[weekday] };
}

function toMinutes(time = "00:00") {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// "13:00" -> "1:00 PM"
function formatTime(time = "00:00") {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function getDuration(start, end) {
  const hours = (toMinutes(end) - toMinutes(start)) / 60;
  const text = Number.isInteger(hours) ? hours : hours.toFixed(1);
  return `${text} ${hours === 1 ? "hour" : "hours"}`;
}

// 4-ta status 4-ta alada rong-e. Text-o ache, tai shudhu rong-er upor depend kore na.
const statusStyles = {
  Pending: "border-gel/60 bg-gel/20 text-foreground",
  Confirmed:
    "border-emerald-600/40 bg-emerald-100 text-emerald-900 dark:border-emerald-400/40 dark:bg-emerald-950 dark:text-emerald-300",
  Completed: "border-border bg-secondary text-secondary-foreground",
  Cancelled: "border-destructive/40 bg-destructive/10 text-destructive",
};

function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.Completed;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${style}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}

function BookingTicket({ booking, onCancel }) {
  const { month, day, weekday } = getDateParts(booking.date);
  const isCancelled = booking.status === "Cancelled";

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-card sm:flex-row ${
        isCancelled ? "opacity-75" : ""
      }`}
    >
      {/* Date stub */}
      <div className="relative flex items-center gap-3 border-b-2 border-dashed border-border bg-secondary px-5 py-4 sm:w-36 sm:shrink-0 sm:flex-col sm:justify-center sm:gap-0 sm:border-b-0 sm:border-r-2 sm:py-6">
        <span className="text-sm font-medium text-muted-foreground">
          {month}
        </span>
        <span className="font-heading text-3xl font-bold leading-none sm:mt-1 sm:text-4xl">
          {day}
        </span>
        <span className="text-sm text-muted-foreground sm:mt-2">{weekday}</span>

        {/* Ticket-er duto notch */}
        <span className="absolute right-0 top-0 hidden size-5 -translate-y-1/2 translate-x-1/2 rounded-full border border-border bg-background sm:block" />
        <span className="absolute bottom-0 right-0 hidden size-5 translate-x-1/2 translate-y-1/2 rounded-full border border-border bg-background sm:block" />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0">
          <h2 className="font-heading text-lg font-semibold sm:text-xl">
            <Link
              href={`/studios/${booking.studioId}`}
              className="transition-colors hover:text-primary"
            >
              {booking.studioTitle}
            </Link>
          </h2>

          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <Clock className="size-4" aria-hidden="true" />
            <span className="font-medium text-foreground">
              {formatTime(booking.startTime)} to {formatTime(booking.endTime)}
            </span>
            <span>({getDuration(booking.startTime, booking.endTime)})</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
          <StatusBadge status={booking.status} />
          <p className="font-heading text-xl font-bold">
            ৳{Number(booking.totalPrice).toLocaleString("en-BD")}
          </p>

          {/* Shudhu Pending booking cancel kora jay */}
          {booking.status === "Pending" && (
            <Button variant="outline" size="sm" onClick={() => onCancel(booking)}>
              Cancel booking
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function MyBookings({ bookings = [], error = "" }) {
  const router = useRouter();
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!bookingToCancel) return;
    const bookingId = bookingToCancel._id;

    setCancelling(true);
    const { ok, data } = await privateFetch(
      `/api/bookings/${bookingId}`,
      { method: "PATCH" },
      router
    );
    setCancelling(false);

    if (ok) {
      toast.success("Booking cancelled");
    } else {
      toast.error(
        data?.message || "Could not cancel the booking. Please try again."
      );
    }

    // Success ba error, dui-te-i modal bondho kore list notun kore anbo
    setBookingToCancel(null);
    router.refresh();
  };

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-center text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[70vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            My Bookings
          </h1>
          <p className="mt-2 text-muted-foreground">
            {bookings.length === 0
              ? "Your booked sessions will show up here."
              : `${bookings.length} ${
                  bookings.length === 1 ? "booking" : "bookings"
                }, newest first.`}
          </p>
        </div>

        {/* <Link href="/studios" className={buttonVariants({ variant: "outline" })}>
          Book another studio
        </Link> */}
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border px-4 py-16 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
            <CalendarDays className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-heading text-xl font-semibold">
            No bookings yet
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
            Find a studio you like and book your first session.
          </p>
          <Link href="/studios" className={`${buttonVariants()} mt-6`}>
            Explore studios
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl space-y-4">
          {bookings.map((booking) => (
            <BookingTicket
              key={booking._id}
              booking={booking}
              onCancel={setBookingToCancel}
            />
          ))}
        </div>
      )}

      <CancelBookingModal
        open={Boolean(bookingToCancel)}
        onOpenChange={(value) => {
          if (!value && !cancelling) setBookingToCancel(null);
        }}
        booking={bookingToCancel}
        onConfirm={handleCancel}
        loading={cancelling}
      />
    </div>
  );
}