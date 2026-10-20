import {
  BellIcon,
  ChevronDownIcon,
  CompassIcon,
  LayoutDashboardIcon,
  CalendarCheckIcon,
  MessageSquareIcon,
  BookmarkIcon,
  StarIcon,
  UserIcon,
  SettingsIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { SavedMentorsProvider } from "../components/saved-mentors-provider";
import { CURRENT_MENTEE } from "../data/panel";
import { LEARNER_URL } from "../../shared/lib/config";
import { initials } from "../../shared/lib/format";
import { PanelLayout } from "../../shared/layout/panel-layout";
import type { NavItem } from "../../shared/layout/panel-sidebar";

const ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboardIcon, to: "/mentee", end: true },
  { label: "Find Mentors", icon: CompassIcon, href: `${LEARNER_URL}/mentors` },
  { label: "My Bookings", icon: CalendarCheckIcon, to: "/mentee/bookings" },
  { label: "Messages", icon: MessageSquareIcon },
  { label: "Saved Mentors", icon: BookmarkIcon },
  { label: "My Reviews", icon: StarIcon },
  { label: "Profile", icon: UserIcon, to: "/mentee/profile" },
  { label: "Settings", icon: SettingsIcon },
];

function MenteeFooter() {
  return (
    <Button
      variant="outline"
      size="lg"
      nativeButton={false}
      render={<a href={`${LEARNER_URL}/become-a-mentor`} />}
      className="h-10 w-full"
    >
      Become a Mentor
    </Button>
  );
}

function MenteeTopbar() {
  return (
    <>
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <BellIcon />
      </Button>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={CURRENT_MENTEE.photo} alt="" />
          <AvatarFallback className="text-xs">
            {initials(CURRENT_MENTEE.name)}
          </AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <p className="text-sm font-medium">{CURRENT_MENTEE.name}</p>
          <p className="text-xs text-muted-foreground">Mentee</p>
        </div>
        <ChevronDownIcon className="size-4 text-muted-foreground" />
      </div>
    </>
  );
}

export function MenteeLayout() {
  return (
    <SavedMentorsProvider>
      <PanelLayout
        items={ITEMS}
        footer={<MenteeFooter />}
        topbar={<MenteeTopbar />}
      />
    </SavedMentorsProvider>
  );
}
