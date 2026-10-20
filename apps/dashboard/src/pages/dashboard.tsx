import { Link } from "react-router";
import {
  CalendarCheckIcon,
  CalendarIcon,
  UserCheckIcon,
  UsersIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react";
import { BookingsChart } from "../components/bookings-chart";
import { BookingsTable } from "../components/bookings-table";
import { PageHeader } from "../components/page-header";
import { DonutCard } from "../components/donut-card";
import { StatCard } from "../components/stat-card";
import { TableCard } from "../components/table-card";
import { BOOKINGS } from "../data/bookings";
import { STATS, SESSION_TYPES } from "../data/dashboard";

const STAT_ICONS: Record<string, LucideIcon> = {
  users: UsersIcon,
  mentors: UserCheckIcon,
  bookings: CalendarCheckIcon,
  revenue: WalletIcon,
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your platform's performance"
        actions={
          <div className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
            <CalendarIcon className="size-4 text-muted-foreground" />
            Apr 1, 2024 - Apr 30, 2024
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard
            key={stat.key}
            icon={STAT_ICONS[stat.key] ?? UsersIcon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <BookingsChart />
        <DonutCard
          title="Bookings by Session Type"
          data={SESSION_TYPES}
          centerValue="320"
          centerLabel="Bookings"
        />
      </div>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Recent Bookings</h2>
          <Link
            to="/admin/bookings"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <TableCard>
          <BookingsTable bookings={BOOKINGS.slice(0, 5)} />
        </TableCard>
      </section>
    </>
  );
}
