import { Suspense } from "react";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, Clock, LayoutGrid } from "lucide-react";
import { auth } from "@/lib/auth";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import Image from "next/image";
import UpdateProfileForm from "@/components/dashboard/UpdateProfileForm";

// Cookie Express-e forward kore private list ani
async function fetchList(path, cookieHeader) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (response.status === 401) {
    redirect("/login?redirect=/dashboard");
  }

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function DashboardContent() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login?redirect=/dashboard");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const [studios, bookings] = await Promise.all([
    fetchList("/api/my-studios", cookieHeader),
    fetchList("/api/bookings", cookieHeader),
  ]);

  const pendingCount = bookings
    ? bookings.filter((booking) => booking.status === "Pending").length
    : null;

  // Fetch fail hole number-er jaygay dash dekhabe
  const stats = [
    {
      label: "My listings",
      value: studios ? studios.length : "–",
      href: "/my-listings",
      Icon: LayoutGrid,
    },
    {
      label: "My bookings",
      value: bookings ? bookings.length : "–",
      href: "/my-bookings",
      Icon: CalendarDays,
    },
    {
      label: "Pending bookings",
      value: pendingCount ?? "–",
      href: "/my-bookings",
      Icon: Clock,
    },
  ];

  const user = session.user;
  const firstName = user.name?.split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Welcome card */}
      <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:p-8">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "Profile photo"}
            width={80}
            height={80}
            className="size-20 shrink-0 rounded-full border border-border object-cover"
          />
        ) : (
          <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-3xl font-bold text-primary">
            {firstName.charAt(0).toUpperCase()}
          </span>
        )}

        <div className="min-w-0">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 truncate text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <h2 className="mt-10 font-heading text-xl font-semibold">Overview</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, href, Icon }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent"
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 font-heading text-4xl font-bold">{value}</p>
          </Link>
        ))}
      </div>

            {/* Update profile */}
      <h2 className="mt-10 font-heading text-xl font-semibold">
        Update Profile
      </h2>
      <div className="mt-4">
        <UpdateProfileForm name={user.name} email={user.email} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
