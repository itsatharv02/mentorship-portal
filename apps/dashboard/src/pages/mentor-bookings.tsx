import { MoreHorizontalIcon } from "lucide-react";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { FilterSelect } from "../components/filter-select";
import { PageHeader } from "../components/page-header";
import { PaginationBar } from "../components/pagination-bar";
import { PersonCell } from "../components/person-cell";
import { StatusBadge } from "../components/status-badge";
import { TableCard } from "../components/table-card";
import { TabsNav } from "../components/tabs-nav";
import { MENTOR_SESSIONS, type SessionStatus } from "../data/mentor-panel";
import { formatDateTime } from "../lib/format";
import { useTableState } from "../lib/use-table-state";

const INITIAL_FILTERS = { tab: "upcoming", sessionType: "all" };

const SESSION_TYPE_OPTIONS = [
  ...new Set(MENTOR_SESSIONS.map((session) => session.sessionType)),
]
  .sort()
  .map((value) => ({ value, label: value }));

const TAB_LABELS: { value: SessionStatus; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const TABS = TAB_LABELS.map((tab) => ({
  value: tab.value,
  label: `${tab.label} (${
    MENTOR_SESSIONS.filter((session) => session.status === tab.value).length
  })`,
}));

function isSessionStatus(value: string): value is SessionStatus {
  return TABS.some((tab) => tab.value === value);
}

export default function MentorBookingsPage() {
  const table = useTableState({
    items: MENTOR_SESSIONS,
    initialFilters: INITIAL_FILTERS,
    matches: (session, filters) =>
      session.status === filters.tab &&
      (filters.sessionType === "all" ||
        session.sessionType === filters.sessionType),
  });

  const activeTab = isSessionStatus(table.filters.tab)
    ? table.filters.tab
    : "upcoming";

  return (
    <>
      <PageHeader
        title="Bookings"
        subtitle="View and manage your upcoming and past sessions."
      />

      <TabsNav
        label="Booking status"
        tabs={TABS}
        value={activeTab}
        onChange={(tab) => table.setFilter("tab", tab)}
      />

      <div className="my-4 flex flex-wrap items-center gap-3">
        <FilterSelect
          label="All Session Types"
          value={table.filters.sessionType}
          options={SESSION_TYPE_OPTIONS}
          onChange={(value) => table.setFilter("sessionType", value)}
        />
        {table.filters.sessionType !== "all" && (
          <button
            type="button"
            onClick={() => table.setFilter("sessionType", "all")}
            className="text-sm text-primary hover:underline"
          >
            Clear filter
          </button>
        )}
      </div>

      <TableCard>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Learner</TableHead>
              <TableHead>Session Type</TableHead>
              <TableHead>Date &amp; Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.pageItems.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No sessions to show here.
                </TableCell>
              </TableRow>
            ) : (
              table.pageItems.map((session) => (
                <TableRow key={session.id}>
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
                  <TableCell>{formatDateTime(session.dateTime)}</TableCell>
                  <TableCell>{session.durationMins} mins</TableCell>
                  <TableCell>
                    <StatusBadge status={session.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {session.status === "upcoming" && (
                        <>
                          {session.joinable && (
                            <Button type="button">Join</Button>
                          )}
                          <Button type="button" variant="outline">
                            Reschedule
                          </Button>
                        </>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label={`More actions for ${session.learner}`}
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <PaginationBar
          page={table.page}
          pageCount={table.pageCount}
          onPageChange={table.setPage}
        />
      </TableCard>
    </>
  );
}
