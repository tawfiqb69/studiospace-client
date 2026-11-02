
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { privateFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BookingModal({
  open,
  onOpenChange,
  studioId,
  studioTitle,
  hourlyRate,
}) {
  const router = useRouter();

  const [today] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const startMinutes = startTime
    ? Number(startTime.split(":")[0]) * 60 +
      Number(startTime.split(":")[1])
    : 0;

  const endMinutes = endTime
    ? Number(endTime.split(":")[0]) * 60 +
      Number(endTime.split(":")[1])
    : 0;

  const totalMinutes =
    startTime && endTime && endMinutes > startMinutes
      ? endMinutes - startMinutes
      : 0;

  const totalHours = totalMinutes / 60;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const durationText = hours
    ? `${hours}h ${minutes}m`
    : `${minutes}m`;

  const totalPrice = Math.round(
    totalHours * Number(hourlyRate || 0)
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (date < today) {
      setError("Please select today or a future date.");
      return;
    }

    if (!totalHours) {
      setError("End time must be after start time.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await privateFetch(
        "/api/bookings",
        {
          method: "POST",
          body: JSON.stringify({
            studioId,
            studioTitle,
            date,
            startTime,
            endTime,
            totalPrice,
          }),
        },
        router
      );

      if (!result.ok) {
        const message =
          result.data?.message || "Unable to create booking.";

        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Booking request submitted successfully!");
      onOpenChange(false);

      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Booking error:", error);
      setError("Something went wrong. Please try again.");
      toast.error("Unable to submit booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book this studio</DialogTitle>
          <DialogDescription>
            Select your preferred date and booking time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="text-sm font-medium">{studioTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              ৳{Number(hourlyRate).toLocaleString("en-US")} / hour
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="booking-date" className="text-sm font-medium">
              Booking date
            </label>
            <input
              id="booking-date"
              type="date"
              min={today}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="start-time" className="text-sm font-medium">
                Start time
              </label>
              <input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                required
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="end-time" className="text-sm font-medium">
                End time
              </label>
              <input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                required
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="rounded-lg bg-secondary p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Total duration
              </span>
              <span className="font-medium">
                {durationText}
              </span>
            </div>

            <div className="mt-2 flex justify-between">
              <span className="font-medium">Total price</span>
              <span className="font-heading text-lg font-bold">
                ৳{totalPrice.toLocaleString("en-US")}
              </span>
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !totalHours || !date}
            >
              {isSubmitting ? "Submitting..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
