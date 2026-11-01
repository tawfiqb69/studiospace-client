import StudioForm from "@/components/studio-form/StudioForm";

export default function AddStudioPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        Add your studio
      </h1>
      <p className="mt-2 text-muted-foreground">
        Tell creators what your space offers. You can edit or remove it any time
        from My Studio Listings.
      </p>

      <div className="mt-8">
        <StudioForm mode="add" />
      </div>
    </div>
  );
}