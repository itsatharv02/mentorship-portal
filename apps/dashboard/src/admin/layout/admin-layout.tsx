import {
  CalendarCheckIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  StarIcon,
  TagsIcon,
  UserCheckIcon,
  UsersIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { PanelLayout } from "../../shared/layout/panel-layout";
import type { NavItem } from "../../shared/layout/panel-sidebar";

const ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboardIcon, to: "/admin", end: true },
  { label: "Mentors", icon: UserCheckIcon, to: "/admin/mentors" },
  { label: "Users", icon: UsersIcon, to: "/admin/users" },
  { label: "Bookings", icon: CalendarCheckIcon, to: "/admin/bookings" },
  { label: "Categories", icon: TagsIcon },
  { label: "Reviews", icon: StarIcon },
  { label: "Content", icon: FileTextIcon },
  { label: "Settings", icon: SettingsIcon, to: "/admin/settings" },
];

function AdminFooter() {
  return (
    <div className="flex items-center gap-3">
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
  );
}

export function AdminLayout() {
  return <PanelLayout items={ITEMS} footer={<AdminFooter />} />;
}
