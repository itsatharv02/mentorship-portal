import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";

export function SearchHeader({
  q,
  showClear,
}: {
  q: string;
  showClear: boolean;
}) {
  return (
    <section className="bg-linear-to-b from-primary/10 to-background">
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Find the right mentor for your journey
        </h1>
        <p className="mt-3 text-muted-foreground">
          Browse expert mentors, filter by domain, experience and more.
        </p>

        <div className="mt-8 flex gap-2 rounded-xl bg-card p-2 ring-1 ring-foreground/10">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search by name, skill, company or keyword..."
              aria-label="Search mentors"
              className="h-10 border-0 pl-9 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button type="submit" size="lg" className="h-10 px-6">
            Search
          </Button>
        </div>

        {showClear && (
          <div className="mt-3">
            <Link
              href="/mentors"
              className="text-sm text-primary hover:underline"
            >
              Clear all
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
