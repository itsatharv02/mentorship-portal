import { BookingsTable } from "../components/bookings-table";
import { FilterSelect } from "../../shared/components/filter-select";
import { PageHeader } from "../../shared/components/page-header";
import { PaginationBar } from "../../shared/components/pagination-bar";
import { SearchInput } from "../../shared/components/search-input";
import { TableCard } from "../../shared/components/table-card";
import { TabsNav } from "../../shared/components/tabs-nav";
import { BOOKINGS } from "../data/bookings";
import { useTableState } from "../../shared/lib/use-table-state";

type BookingTab = "all" | "upcoming" | "completed" | "cancelled";

const TABS: { value: BookingTab; label: string }[] = [
  { value: "all", label: "All Bookings" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const INITIAL_FILTERS = { search: "", tab: "all", sessionType: "all" };

const SESSION_TYPE_OPTIONS = [
  ...new Set(BOOKINGS.map((booking) => booking.sessionType)),
]
  .sort()
  .map((value) => ({ value, label: value }));

function isBookingTab(value: string): value is BookingTab {
  return TABS.some((tab) => tab.value === value);
}

export default function BookingsPage() {
  const table = useTableState({
    items: BOOKINGS,
    initialFilters: INITIAL_FILTERS,
    matches: (booking, filters) => {
      const search = filters.search.trim().toLowerCase();
      const matchesSearch =
        !search ||
        [booking.user, booking.mentor, booking.sessionType].some((text) =>
          text.toLowerCase().includes(search),
        );

      const matchesTab =
        filters.tab === "all" ||
        (filters.tab === "upcoming"
          ? booking.status === "upcoming" || booking.status === "confirmed"
          : booking.status === filters.tab);

      return (
        matchesSearch &&
        matchesTab &&
        (filters.sessionType === "all" ||
          booking.sessionType === filters.sessionType)
      );
    },
  });

  const activeTab = isBookingTab(table.filters.tab) ? table.filters.tab : "all";

  return (
    <>
      <PageHeader
        title="Bookings"
        subtitle="Manage all mentor sessions and bookings"
      />

      <TabsNav
        label="Booking status"
        tabs={TABS}
        value={activeTab}
        onChange={(tab) => table.setFilter("tab", tab)}
      />

      <div className="my-4 flex flex-wrap items-center gap-3">
        <SearchInput
          value={table.filters.search}
          onChange={(value) => table.setFilter("search", value)}
          placeholder="Search by user name, mentor name or session type..."
        />
        <FilterSelect
          label="Session Type"
          value={table.filters.sessionType}
          options={SESSION_TYPE_OPTIONS}
          onChange={(value) => table.setFilter("sessionType", value)}
        />
        {table.isFiltered && (
          <button
            type="button"
            onClick={table.clearFilters}
            className="text-sm text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <TableCard>
        <BookingsTable bookings={table.pageItems} showDuration />
        <PaginationBar
          page={table.page}
          pageCount={table.pageCount}
          onPageChange={table.setPage}
        />
      </TableCard>
    </>
  );
}
