import { Aperture } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex size-16 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 motion-safe:animate-spin motion-reduce:animate-none" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary motion-safe:animate-spin motion-reduce:animate-none" />
        <Aperture className="relative size-8 text-primary" aria-hidden="true" />
      </div>

      <p className="text-sm font-medium text-muted-foreground">
        Setting up the studio...
      </p>

      <span className="sr-only">Loading</span>
    </div>
  );
}