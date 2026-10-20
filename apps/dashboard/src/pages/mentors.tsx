import { Link } from "react-router";
import { EyeIcon, PlusIcon } from "lucide-react";
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
import { SearchInput } from "../components/search-input";
import { StatusBadge } from "../components/status-badge";
import { TableCard } from "../components/table-card";
import { MENTORS } from "../data/mentors";
import { formatINR } from "../lib/format";
import { useTableState } from "../lib/use-table-state";

const INITIAL_FILTERS = {
  search: "",
  status: "all",
  domain: "all",
  experience: "all",
  company: "all",
};

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
];

const EXPERIENCE_OPTIONS = [
  { value: "0-2", label: "0 - 2 years" },
  { value: "3-5", label: "3 - 5 years" },
  { value: "6-10", label: "6 - 10 years" },
  { value: "10+", label: "10+ years" },
];

function matchesExperience(years: number, range: string): boolean {
  if (range === "0-2") return years <= 2;
  if (range === "3-5") return years >= 3 && years <= 5;
  if (range === "6-10") return years >= 6 && years <= 10;
  return years > 10;
}

const unique = (values: string[]) =>
  [...new Set(values)].sort().map((value) => ({ value, label: value }));

const DOMAIN_OPTIONS = unique(MENTORS.map((mentor) => mentor.domain));
const COMPANY_OPTIONS = unique(MENTORS.map((mentor) => mentor.company));

export default function MentorsPage() {
  const table = useTableState({
    items: MENTORS,
    initialFilters: INITIAL_FILTERS,
    matches: (mentor, filters) => {
      const search = filters.search.trim().toLowerCase();
      const matchesSearch =
        !search ||
        [mentor.name, mentor.email, mentor.company, mentor.domain].some(
          (text) => text.toLowerCase().includes(search),
        );

      return (
        matchesSearch &&
        (filters.status === "all" || mentor.status === filters.status) &&
        (filters.domain === "all" || mentor.domain === filters.domain) &&
        (filters.company === "all" || mentor.company === filters.company) &&
        (filters.experience === "all" ||
          matchesExperience(mentor.experienceYears, filters.experience))
      );
    },
  });

  return (
    <>
      <PageHeader
        title="Mentors"
        subtitle="Manage mentor profiles, approvals and availability"
        actions={
          <Button type="button" size="lg" className="h-10">
            <PlusIcon />
            Add Mentor
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput
          value={table.filters.search}
          onChange={(value) => table.setFilter("search", value)}
          placeholder="Search by name, email, skill or company..."
        />
        <FilterSelect
          label="Status"
          value={table.filters.status}
          options={STATUS_OPTIONS}
          onChange={(value) => table.setFilter("status", value)}
        />
        <FilterSelect
          label="Domain"
          value={table.filters.domain}
          options={DOMAIN_OPTIONS}
          onChange={(value) => table.setFilter("domain", value)}
        />
        <FilterSelect
          label="Experience"
          value={table.filters.experience}
          options={EXPERIENCE_OPTIONS}
          onChange={(value) => table.setFilter("experience", value)}
        />
        <FilterSelect
          label="Company"
          value={table.filters.company}
          options={COMPANY_OPTIONS}
          onChange={(value) => table.setFilter("company", value)}
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
              <TableHead>Domain</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Price (per session)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.pageItems.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No mentors match your filters.
                </TableCell>
              </TableRow>
            ) : (
              table.pageItems.map((mentor) => (
                <TableRow key={mentor.id}>
                  <TableCell>
                    <Link
                      to={`/admin/mentors/${mentor.id}`}
                      className="hover:underline"
                    >
                      <PersonCell name={mentor.name} photo={mentor.photo} />
                    </Link>
                  </TableCell>
                  <TableCell>{mentor.domain}</TableCell>
                  <TableCell>{mentor.company}</TableCell>
                  <TableCell>{mentor.experienceYears}+ years</TableCell>
                  <TableCell>{formatINR(mentor.price)}</TableCell>
                  <TableCell>
                    <StatusBadge status={mentor.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      nativeButton={false}
                      render={<Link to={`/admin/mentors/${mentor.id}`} />}
                      aria-label={`View ${mentor.name}`}
                    >
                      <EyeIcon />
                    </Button>
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
