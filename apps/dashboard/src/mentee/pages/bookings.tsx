import { MenteeBookingCard } from "../components/booking-card";
import { PageHeader } from "../../shared/components/page-header";
import { TabsNav } from "../../shared/components/tabs-nav";
import {
  MENTEE_BOOKINGS,
  type MenteeBookingStatus,
} from "../data/panel";
import { useState } from "react";

const TAB_NAMES: { value: MenteeBookingStatus; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const TABS = TAB_NAMES.map((tab) => ({
  value: tab.value,
  label: `${tab.label} (${
    MENTEE_BOOKINGS.filter((booking) => booking.status === tab.value).length
  })`,
}));

export default function MenteeBookingsPage() {
  const [tab, setTab] = useState<MenteeBookingStatus>("upcoming");

  const bookings = MENTEE_BOOKINGS.filter((booking) => booking.status === tab);

  return (
    <>
      <PageHeader
        title="My Bookings"
        subtitle="Manage your upcoming and past mentoring sessions."
      />

      <TabsNav
        label="Booking status"
        tabs={TABS}
        value={tab}
        onChange={setTab}
      />

      <div className="mt-4 space-y-3">
        {bookings.length === 0 ? (
          <p className="rounded-xl border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
            No sessions to show here.
          </p>
        ) : (
          bookings.map((booking) => (
            <MenteeBookingCard key={booking.id} booking={booking} showStatus />
          ))
        )}
      </div>
    </>
  );
}
