import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/pagination";
import { buildMentorsHref, type MentorFilters } from "../../lib/mentor-search";

type PageItem = number | "ellipsis";

function getPageItems(page: number, pageCount: number): PageItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];
  if (page > 3) items.push("ellipsis");
  for (
    let p = Math.max(2, page - 1);
    p <= Math.min(pageCount - 1, page + 1);
    p++
  ) {
    items.push(p);
  }
  if (page < pageCount - 2) items.push("ellipsis");
  items.push(pageCount);
  return items;
}

export function MentorPagination({
  filters,
  page,
  pageCount,
}: {
  filters: MentorFilters;
  page: number;
  pageCount: number;
}) {
  if (pageCount <= 1) return null;

  const isFirst = page === 1;
  const isLast = page === pageCount;

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={isFirst ? undefined : buildMentorsHref(filters, page - 1)}
            aria-disabled={isFirst}
            className={isFirst ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        {getPageItems(page, pageCount).map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={buildMentorsHref(filters, item)}
                isActive={item === page}
                className={
                  item === page
                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : undefined
                }
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={isLast ? undefined : buildMentorsHref(filters, page + 1)}
            aria-disabled={isLast}
            className={isLast ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
