
import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import StudioForm from "@/components/studio-form/StudioForm";

async function EditStudioContent({ params }) {
  const { id } = await params;

  // Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/login?redirect=/studios/edit/${id}`);
  }

let studio = null;
let notFound = false;
let loadError = false;

try {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/studios/${id}`,
    { cache: "no-store" }
  );

  if (response.status === 400 || response.status === 404) {
    notFound = true;
  } else if (!response.ok) {
    loadError = true;
  } else {
    studio = await response.json();
  }
} catch (error) {
  console.error("Edit studio error:", error);
  loadError = true;
}

if (notFound) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-heading text-3xl font-semibold">
        Studio not found
      </h1>

      <p className="mt-3 text-muted-foreground">
        This studio may have been removed, or the link is incorrect.
      </p>

      <Link
        href="/my-listings"
        className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        Back to My Listings
      </Link>
    </div>
  );
}

if (loadError) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-heading text-2xl font-semibold">
        Unable to load studio
      </h1>

      <p className="mt-3 text-muted-foreground">
        Something went wrong. Please try again later.
      </p>
    </div>
  );
}

if (!studio) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-heading text-3xl font-semibold">
        Studio not found
      </h1>

      <p className="mt-3 text-muted-foreground">
        This studio may have been removed, or the link is incorrect.
      </p>

      <Link
        href="/my-listings"
        className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        Back to My Listings
      </Link>
    </div>
  );
}

  // Check studio ownership
  const userEmail = session.user.email?.toLowerCase();
  const ownerEmail = studio.ownerEmail?.toLowerCase();

  if (!userEmail || userEmail !== ownerEmail) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-semibold">
          Access Denied
        </h1>

        <p className="mt-3 text-muted-foreground">
          You can only edit your own studios.
        </p>

        <Link
          href="/my-listings"
          className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Go to My Listings
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Studio Management
        </p>

        <h1 className="mt-2 font-heading text-3xl font-bold">
          Edit Studio
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update your studio information and keep your listing accurate.
        </p>
      </div>

      <StudioForm mode="edit" studio={studio} />
    </section>
  );
}

function EditStudioSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />

      <div className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-12 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    </div>
  );
}

export default function EditStudioPage({ params }) {
  return (
    <Suspense fallback={<EditStudioSkeleton />}>
      <EditStudioContent params={params} />
    </Suspense>
  );
}
