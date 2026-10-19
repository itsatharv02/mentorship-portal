import type { Metadata } from "next";
import { SearchHeader } from "../../components/mentors/search-header";
import {
  hasActiveFilters,
  parseFilters,
  searchMentors,
} from "../../lib/mentor-search";
import { FilterSidebar } from "../../components/mentors/filter-sidebar";
import { MentorCard } from "../../components/mentors/mentor-card";
import { SortSelect } from "../../components/mentors/sort-select";
import { MentorPagination } from "../../components/mentors/mentor-pagination";
import { MobileFilters } from "../../components/mentors/mobile-filters";

export const metadata: Metadata = {
  title: "Find Mentors - Mentora",
  description: "Browse expert mentors, filter by domain, experience and more.",
};

type MentorsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function MentorsPage({ searchParams }: MentorsPageProps) {
  const filters = parseFilters(await searchParams);
  const { items, total, page, pageCount } = searchMentors(filters);

  return (
    <form method="get" action="/mentors" key={JSON.stringify(filters)}>
      <SearchHeader q={filters.q} showClear={hasActiveFilters(filters)} />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block">
          <div className="rounded-xl bg-muted/40 p-5">
            <FilterSidebar filters={filters} />
          </div>
        </aside>

        <main className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {total} mentors found
            </p>
            <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
              <MobileFilters filters={filters} />
              <SortSelect value={filters.sort} />
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {items.length === 0 ? (
              <p className="rounded-xl bg-muted/40 p-8 text-center text-muted-foreground">
                No mentors match your filters. Try clearing some of them.
              </p>
            ) : (
              items.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))
            )}
          </div>
          <MentorPagination
            filters={filters}
            page={page}
            pageCount={pageCount}
          />
        </main>
      </div>
    </form>
  );
}
