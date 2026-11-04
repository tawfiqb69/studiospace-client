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
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const fullMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// "2026-11-20" theke mash, din ar weekday ber kori (current time use kori na)
function getDateParts(dateString = "") {
  const [year, month, day] = dateString.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return {
    year,
    month: months[month - 1],
    fullMonth: fullMonths[month - 1],
    day,
    weekday: weekdays[weekday],
  };
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
  const totalMinutes = toMinutes(end) - toMinutes(start);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours}h`;
  return `${minutes}m`;
}

// Booking gulo mash onujayi alada group kori (list already newest first)
function groupByMonth(bookings) {
  const groups = [];

  bookings.forEach((booking) => {
    const key = (booking.date || "").slice(0, 7);
    const last = groups[groups.length - 1];

    if (last && last.key === key) {
      last.items.push(booking);
    } else {
      const { fullMonth, year } = getDateParts(booking.date);
      groups.push({ key, label: `${fullMonth} ${year}`, items: [booking] });
    }
  });

  return groups;
}

const statusStyles = {
  Pending: "border-gel/60 bg-gel/20 text-foreground",
  Confirmed: "border-primary/40 bg-primary/10 text-primary",
  Completed: "border-foreground/20 bg-foreground/10 text-foreground",
  Cancelled: "border-border bg-muted text-muted-foreground",
};

const dotStyles = {
  Pending: "bg-gel",
  Confirmed: "bg-primary",
  Completed: "bg-foreground",
  Cancelled: "bg-muted-foreground/50",
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

function BookingCard({ booking, onCancel }) {
  const { month, day, weekday } = getDateParts(booking.date);
  const isCancelled = booking.status === "Cancelled";
  const code = String(booking._id).slice(-6).toUpperCase();

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-border bg-card ${
        isCancelled ? "opacity-70" : ""
      }`}
    >
      {/* Call sheet header bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:px-5">
        <span className="text-foreground">
          {weekday} · {day} {month}
        </span>
        <span className="font-mono">#{code}</span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`min-w-0 font-heading text-lg font-semibold leading-snug sm:text-xl ${
              isCancelled ? "line-through decoration-muted-foreground/50" : ""
            }`}
          >
            <Link
              href={`/studios/${booking.studioId}`}
              className="transition-colors hover:text-primary"
            >
              {booking.studioTitle}
            </Link>
          </h3>
          <StatusBadge status={booking.status} />
        </div>

        {/* Call time */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <Clock className="size-5 text-primary" aria-hidden="true" />
          <span className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            {formatTime(booking.startTime)}
          </span>
          <span className="text-muted-foreground">to</span>
          <span className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            {formatTime(booking.endTime)}
          </span>
          <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
            {getDuration(booking.startTime, booking.endTime)}
          </span>
        </div>

        {/* Price + action */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border pt-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Total
            </p>
            <p className="font-heading text-xl font-bold text-primary">
              ৳{Number(booking.totalPrice).toLocaleString("en-BD")}
            </p>
          </div>

          {/* Shudhu Pending booking cancel kora jay */}
          {booking.status === "Pending" && (
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => onCancel(booking)}
            >
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
      router,
    );
    setCancelling(false);

    if (ok) {
      toast.success("Booking cancelled");
    } else {
      toast.error(
        data?.message || "Could not cancel the booking. Please try again.",
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

  const groups = groupByMonth(bookings);

  return (
    <div className="mx-auto min-h-[70vh] max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Call sheet
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        My Bookings
      </h1>
      <p className="mt-2 text-muted-foreground">
        {bookings.length === 0
          ? "Your booked sessions will show up here."
          : `${bookings.length} ${
              bookings.length === 1 ? "session" : "sessions"
            } on your schedule, newest first.`}
      </p>

      {bookings.length === 0 ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-border px-4 py-16 text-center">
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
        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <section key={group.key}>
              <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-primary">
                {group.label}
              </h2>

              {/* Timeline */}
              <ol className="mt-4 ml-2 space-y-6 border-l-2 border-primary/20">
                {group.items.map((booking) => (
                  <li key={booking._id} className="relative pl-6 sm:pl-8">
                    <span
                      className={`absolute -left-[9px] top-5 size-4 rounded-full ring-4 ring-background ${
                        dotStyles[booking.status] || dotStyles.Completed
                      }`}
                      aria-hidden="true"
                    />
                    <BookingCard
                      booking={booking}
                      onCancel={setBookingToCancel}
                    />
                  </li>
                ))}
              </ol>
            </section>
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
