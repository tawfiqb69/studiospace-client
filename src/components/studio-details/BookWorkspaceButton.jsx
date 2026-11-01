
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/studio-details/BookingModal";

export default function BookWorkspaceButton({
  studioId,
  studioTitle,
  hourlyRate,
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!session?.user) {
      toast.error("Please login to book this studio");
      router.push(`/login?redirect=/studios/${studioId}`);
      return;
    }

    setIsOpen(true);
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="h-12 w-full text-base"
      >
        Book Workspace Now
      </Button>

      <BookingModal
        open={isOpen}
        onOpenChange={setIsOpen}
        studioId={studioId}
        studioTitle={studioTitle}
        hourlyRate={hourlyRate}
      />
    </>
  );
}
