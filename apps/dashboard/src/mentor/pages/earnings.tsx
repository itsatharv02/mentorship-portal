import {
  CalendarCheckIcon,
  CircleDollarSignIcon,
  ClockIcon,
  WalletIcon,
} from "lucide-react";
import { Badge } from "@repo/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { DateRangePill } from "../components/date-range-pill";
import { DonutCard } from "../../shared/components/donut-card";
import { EarningsChart } from "../components/earnings-chart";
import { PageHeader } from "../../shared/components/page-header";
import { PersonCell } from "../../shared/components/person-cell";
import { StatCard } from "../../shared/components/stat-card";
import { StatusBadge } from "../../shared/components/status-badge";
import { TableCard } from "../../shared/components/table-card";
import {
  EARNINGS_BREAKDOWN,
  EARNINGS_STATS,
  MENTOR_SESSIONS,
} from "../data/panel";
import { formatDate, formatINR } from "../../shared/lib/format";

const STAT_ICONS = {
  earnings: WalletIcon,
  sessions: CalendarCheckIcon,
  average: CircleDollarSignIcon,
  payout: ClockIcon,
};

export default function MentorEarningsPage() {
  const transactions = MENTOR_SESSIONS.filter(
    (session) => session.status === "completed",
  ).slice(0, 6);

  return (
    <>
      <PageHeader
        title="Earnings"
        subtitle="Track your earnings and session statistics."
        actions={<DateRangePill />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {EARNINGS_STATS.map((stat) => (
          <StatCard
            key={stat.key}
            icon={STAT_ICONS[stat.key as keyof typeof STAT_ICONS]}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            note={stat.note}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <EarningsChart variant="area" />
        <DonutCard
          title="Earnings Breakdown"
          data={EARNINGS_BREAKDOWN}
          centerValue="₹48,000"
          centerLabel="Total"
        />
      </div>

      <section className="mt-6">
        <h2 className="mb-3 font-semibold">Recent Transactions</h2>
        <TableCard>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Date</TableHead>
                <TableHead>Learner</TableHead>
                <TableHead>Session Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{formatDate(session.dateTime)}</TableCell>
                  <TableCell>
                    <PersonCell name={session.learner} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {session.sessionType}
                    </Badge>
                  </TableCell>
                  <TableCell>{session.durationMins} mins</TableCell>
                  <TableCell>{formatINR(session.amount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={session.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableCard>
      </section>
    </>
  );
}
