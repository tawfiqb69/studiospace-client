import { Suspense } from "react";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, CalendarDays, LayoutGrid, Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

const actions = [
  {
    title: "Add New Studio",
    text: "List a space and start getting booking requests.",
    href: "/add-studio",
    Icon: Plus,
  },
  {
    title: "My Studio Listings",
    text: "Edit or remove the studios you host.",
    href: "/my-listings",
    Icon: LayoutGrid,
  },
  {
    title: "My Bookings",
    text: "Check your sessions and cancel pending ones.",
    href: "/my-bookings",
    Icon: CalendarDays,
  },
];

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
    { label: "My listings", value: studios ? studios.length : "–" },
    { label: "My bookings", value: bookings ? bookings.length : "–" },
    { label: "Pending bookings", value: pendingCount ?? "–" },
  ];

  const firstName = session.user.name?.split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        Welcome back, {firstName}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Here is a quick look at your studios and bookings.
      </p>

      {/* Stats */}
      <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card px-4 py-6 sm:px-6">
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Quick actions */}
      <h2 className="mt-12 font-heading text-xl font-semibold">Jump to</h2>
      <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {actions.map(({ title, text, href, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-accent"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading font-semibold">{title}</span>
                <span className="block text-sm text-muted-foreground">
                  {text}
                </span>
              </span>
              <ArrowRight
                className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
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