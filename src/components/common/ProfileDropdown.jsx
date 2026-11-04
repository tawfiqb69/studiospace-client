
"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Plus,
  Store,
  CalendarCheck,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const userLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Studio", href: "/add-studio", icon: Plus },
  { label: "My Studio Listings", href: "/my-listings", icon: Store },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarCheck },
];

export default function ProfileDropdown({ user, onLogout }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="rounded-full outline-none"
      >
        <Avatar className="size-9 ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all dark:ring-primary">
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback>
            {user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-72 rounded-2xl border border-border/70 bg-background p-2 shadow-xl shadow-black/10"
      >
        <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
          <Avatar className="size-11">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <div className="px-2 pb-1 pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Account Menu
          </p>
        </div>

        {userLinks.map((link) => {
          const Icon = link.icon;
          const active = pathname.startsWith(link.href);

          return (
            <DropdownMenuItem
              key={link.href}
              onClick={() => router.push(link.href)}
              className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                active
                  ? "bg-primary/10 text-primary focus:bg-primary/15 focus:text-primary"
                  : "text-muted-foreground focus:bg-secondary focus:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              <span className="flex-1 text-sm font-medium">
                {link.label}
              </span>
              <ChevronRight className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60" />
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={onLogout}
          className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="size-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
