import {
  ArrowLeftRightIcon,
  BellIcon,
  CalendarCheckIcon,
  CalendarClockIcon,
  ChevronDownIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { CURRENT_MENTOR } from "../data/mentor-panel";
import { initials } from "../lib/format";
import { PanelLayout } from "./panel-layout";
import type { NavItem } from "./panel-sidebar";

const LEARNER_URL =
  (import.meta.env.VITE_LEARNER_URL as string | undefined) ??
  "http://localhost:3000";

const ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboardIcon, to: "/mentor", end: true },
  { label: "Bookings", icon: CalendarCheckIcon, to: "/mentor/bookings" },
  {
    label: "Availability",
    icon: CalendarClockIcon,
    to: "/mentor/availability",
  },
  { label: "Earnings", icon: WalletIcon, to: "/mentor/earnings" },
  { label: "Reviews", icon: StarIcon, to: "/mentor/reviews" },
  { label: "Profile", icon: UserIcon, to: "/mentor/profile" },
  { label: "Messages", icon: MessageSquareIcon },
  { label: "Settings", icon: SettingsIcon },
];

function MentorFooter() {
  return (
    <Button
      variant="outline"
      size="lg"
      nativeButton={false}
      render={<a href={LEARNER_URL} />}
      className="h-10 w-full justify-start"
    >
      <ArrowLeftRightIcon />
      Switch to Learner
    </Button>
  );
}

function MentorTopbar() {
  return (
    <>
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <BellIcon />
      </Button>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={CURRENT_MENTOR.photo} alt="" />
          <AvatarFallback className="text-xs">
            {initials(CURRENT_MENTOR.name)}
          </AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <p className="text-sm font-medium">{CURRENT_MENTOR.name}</p>
          <p className="text-xs text-muted-foreground">Mentor</p>
        </div>
        <ChevronDownIcon className="size-4 text-muted-foreground" />
      </div>
    </>
  );
}

export function MentorLayout() {
  return (
    <PanelLayout
      items={ITEMS}
      footer={<MentorFooter />}
      topbar={<MentorTopbar />}
    />
  );
}
