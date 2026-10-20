import { Link } from "react-router";
import {
  CalendarCheckIcon,
  CalendarClockIcon,
  CalendarIcon,
  StarIcon,
  WalletIcon,
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { DateRangePill } from "../components/date-range-pill";
import { EarningsChart } from "../components/earnings-chart";
import { PageHeader } from "../../shared/components/page-header";
import { PersonCell } from "../../shared/components/person-cell";
import { StatCard } from "../../shared/components/stat-card";
import {
  CURRENT_MENTOR,
  MENTOR_SESSIONS,
  MENTOR_STATS,
} from "../data/panel";
import { formatDateTime } from "../../shared/lib/format";

export default function MentorDashboardPage() {
  const upcoming = MENTOR_SESSIONS.filter(
    (session) => session.status === "upcoming",
  ).slice(0, 3);
  const firstName = CURRENT_MENTOR.name.split(" ")[0];

  return (
    <>
      <PageHeader
        title={`Good morning, ${firstName}`}
        subtitle="Here's an overview of your mentorship activity."
        actions={<DateRangePill />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CalendarCheckIcon}
          label="Total Bookings"
          value={MENTOR_STATS.totalBookings.value}
          change={MENTOR_STATS.totalBookings.change}
        />
        <StatCard
          icon={WalletIcon}
          label="Total Earnings"
          value={MENTOR_STATS.totalEarnings.value}
          change={MENTOR_STATS.totalEarnings.change}
        />
        <StatCard
          icon={CalendarClockIcon}
          label="Upcoming Sessions"
          value={MENTOR_STATS.upcomingSessions.value}
        />
        <StatCard
          icon={StarIcon}
          label="Average Rating"
          value={MENTOR_STATS.averageRating.value}
          note={MENTOR_STATS.averageRating.note}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <section className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Upcoming Sessions</h2>
            <Link
              to="/mentor/bookings"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <ul className="mt-4 divide-y">
            {upcoming.map((session) => (
              <li
                key={session.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3"
              >
                <div className="min-w-40 flex-1">
                  <PersonCell name={session.learner} />
                  <p className="mt-0.5 pl-11 text-xs text-muted-foreground">
                    {session.sessionType}
                  </p>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarIcon className="size-4" />
                  {formatDateTime(session.dateTime)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {session.durationMins} mins
                </p>
                {session.joinable ? (
                  <Button type="button" className="px-4">
                    Join
                  </Button>
                ) : (
                  <Button type="button" variant="outline">
                    Reschedule
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </section>

        <EarningsChart variant="bar" showTotal />
      </div>
    </>
  );
}
