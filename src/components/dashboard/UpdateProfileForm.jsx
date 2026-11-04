"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function UpdateProfileForm({ name, email }) {
  const router = useRouter();

  const [newName, setNewName] = useState(name || "");
  const [isSaving, setIsSaving] = useState(false);

  const trimmedName = newName.trim();
  const isChanged = trimmedName !== (name || "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!trimmedName) {
      toast.error("Name cannot be empty.");
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({ name: trimmedName });

      if (error) {
        toast.error(error.message || "Unable to update profile.");
        return;
      }

      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="profile-name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="profile-name"
            type="text"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            required
            className="h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="profile-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            value={email || ""}
            readOnly
            className="h-11 w-full min-w-0 cursor-not-allowed rounded-lg border border-input bg-muted px-3 text-sm text-muted-foreground outline-none"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="mt-6 w-full sm:w-auto"
        disabled={isSaving || !isChanged}
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}