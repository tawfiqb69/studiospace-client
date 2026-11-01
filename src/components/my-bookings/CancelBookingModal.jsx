"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CancelBookingModal({
  open,
  onOpenChange,
  booking,
  onConfirm,
  loading,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Cancel this booking?</DialogTitle>

          <DialogDescription>
            Your pending booking for{" "}
            <span className="font-semibold text-foreground">
              {booking?.studioTitle}
            </span>{" "}
            on {booking?.date}, {booking?.startTime} to {booking?.endTime} will
            be cancelled. This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            Keep booking
          </Button>

          <Button
            variant="destructive"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? "Cancelling..." : "Cancel booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}