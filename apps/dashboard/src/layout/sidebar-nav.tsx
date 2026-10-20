import { NavLink } from "react-router";
import {
  CalendarCheckIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  StarIcon,
  TagsIcon,
  UserCheckIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";

const NAV_ITEMS: { label: string; icon: LucideIcon; to?: string }[] = [
  { label: "Dashboard", icon: LayoutDashboardIcon, to: "/" },
  { label: "Mentors", icon: UserCheckIcon, to: "/mentors" },
  { label: "Users", icon: UsersIcon, to: "/users" },
  { label: "Bookings", icon: CalendarCheckIcon, to: "/bookings" },
  { label: "Categories", icon: TagsIcon },
  { label: "Reviews", icon: StarIcon },
  { label: "Content", icon: FileTextIcon },
  { label: "Settings", icon: SettingsIcon, to: "/settings" },
];

const ITEM_CLASSES =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <p className="px-6 py-5 text-xl font-bold text-primary">Mentora</p>

      <nav aria-label="Main" className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) =>
          to ? (
            <NavLink
              key={label}
              to={to}
              end={to === "/"}
              onClick={onNavigate}
              className={({ isActive }) =>
                `${ITEM_CLASSES} ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ) : (
            <span
              key={label}
              aria-disabled="true"
              title="Coming soon"
              className={`${ITEM_CLASSES} cursor-not-allowed text-muted-foreground/50`}
            >
              <Icon className="size-4" />
              {label}
            </span>
          ),
        )}
      </nav>

      <div className="flex items-center gap-3 border-t p-4">
        <Avatar>
          <AvatarFallback className="text-xs">AD</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-medium">Admin</p>
          <p className="truncate text-xs text-muted-foreground">
            admin@mentora.com
          </p>
        </div>
      </div>
    </div>
  );
}
