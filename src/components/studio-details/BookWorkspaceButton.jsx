"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function BookWorkspaceButton({ studioId }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleClick = () => {
    // Login na thakle login page-e pathai, login-er por ei studio-te fire ashe
    if (!session?.user) {
      toast.error("Please login to book this studio");
      router.push(`/login?redirect=/studios/${studioId}`);
      return;
    }

    // TEMPORARY: C9-te ekhane Booking modal khulbe
    toast("Booking form will open here in the next step");
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="h-12 w-full text-base"
    >
      Book Workspace Now
    </Button>
  );
}