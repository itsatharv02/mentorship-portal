import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { FilterSelect } from "../../shared/components/filter-select";
import { PageHeader } from "../../shared/components/page-header";
import { PaginationBar } from "../../shared/components/pagination-bar";
import { PersonCell } from "../../shared/components/person-cell";
import { SearchInput } from "../../shared/components/search-input";
import { StatusBadge } from "../../shared/components/status-badge";
import { TableCard } from "../../shared/components/table-card";
import { USERS } from "../data/users";
import { formatDate } from "../../shared/lib/format";
import { useTableState } from "../../shared/lib/use-table-state";

const INITIAL_FILTERS = { search: "", status: "all" };

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function UsersPage() {
  const table = useTableState({
    items: USERS,
    initialFilters: INITIAL_FILTERS,
    matches: (user, filters) => {
      const search = filters.search.trim().toLowerCase();
      const matchesSearch =
        !search ||
        [user.name, user.email, user.location].some((text) =>
          text.toLowerCase().includes(search),
        );

      return (
        matchesSearch &&
        (filters.status === "all" || user.status === filters.status)
      );
    },
  });

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage platform users (students/mentees)"
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput
          value={table.filters.search}
          onChange={(value) => table.setFilter("search", value)}
          placeholder="Search by name, email or location..."
        />
        <FilterSelect
          label="Status"
          value={table.filters.status}
          options={STATUS_OPTIONS}
          onChange={(value) => table.setFilter("status", value)}
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
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.pageItems.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No users match your filters.
                </TableCell>
              </TableRow>
            ) : (
              table.pageItems.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <PersonCell name={user.name} />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>{formatDate(user.joinedAt)}</TableCell>
                  <TableCell>{user.bookings}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
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
