import { SlidersHorizontalIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import type { MentorFilters } from "../../lib/mentor-search";
import { FilterSidebar } from "./filter-sidebar";

export function MobileFilters({ filters }: { filters: MentorFilters }) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button type="button" variant="outline" className="lg:hidden" />
        }
      >
        <SlidersHorizontalIcon />
        Filters
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto overflow-x-hidden">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <form method="get" action="/mentors" className="px-4 pb-6">
          {filters.q && <input type="hidden" name="q" value={filters.q} />}
          {filters.sort !== "relevance" && (
            <input type="hidden" name="sort" value={filters.sort} />
          )}
          <FilterSidebar filters={filters} />
        </form>
      </SheetContent>
    </Sheet>
  );
}
