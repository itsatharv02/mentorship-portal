import { useState } from "react";
import { StarIcon } from "lucide-react";
import { Badge } from "@repo/ui/components/badge";
import { FilterSelect } from "../../shared/components/filter-select";
import { PageHeader } from "../../shared/components/page-header";
import { PersonCell } from "../../shared/components/person-cell";
import { StarRating } from "../components/star-rating";
import { RATING_DISTRIBUTION, REVIEWS } from "../data/reviews";
import { timeAgo } from "../../shared/lib/format";

const SORT_OPTIONS = [
  { value: "highest", label: "Highest Rated" },
  { value: "lowest", label: "Lowest Rated" },
];

export default function MentorReviewsPage() {
  const [sort, setSort] = useState("all");

  const reviews = [...REVIEWS].sort((a, b) => {
    if (sort === "highest") return b.rating - a.rating || a.daysAgo - b.daysAgo;
    if (sort === "lowest") return a.rating - b.rating || a.daysAgo - b.daysAgo;
    return a.daysAgo - b.daysAgo;
  });

  const totalReviews = RATING_DISTRIBUTION.reduce(
    (sum, row) => sum + row.count,
    0,
  );

  return (
    <>
      <PageHeader
        title="Reviews"
        subtitle="See what learners are saying about you."
      />

      <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <section className="h-fit rounded-xl border bg-card p-5">
          <div className="flex items-center gap-3">
            <StarIcon className="size-10 fill-amber-400 text-amber-400" />
            <div>
              <p className="text-xl font-bold">
                4.9{" "}
                <span className="text-base font-semibold text-muted-foreground">
                  out of 5
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Based on {totalReviews} reviews
              </p>
            </div>
          </div>

          <ul className="mt-5 space-y-2.5">
            {RATING_DISTRIBUTION.map((row) => {
              const percent = Math.round((row.count / totalReviews) * 100);

              return (
                <li key={row.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-12 shrink-0 text-muted-foreground">
                    {row.stars} {row.stars === 1 ? "star" : "stars"}
                  </span>
                  <div
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${row.stars} star reviews`}
                    className="h-2 flex-1 overflow-hidden rounded-full bg-muted"
                  >
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-20 shrink-0 text-right text-muted-foreground">
                    {row.count} ({percent}%)
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="min-w-0 rounded-xl border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold">Recent Reviews</h2>
            <FilterSelect
              label="Most Recent"
              value={sort}
              options={SORT_OPTIONS}
              onChange={setSort}
            />
          </div>

          <ul className="mt-2 divide-y">
            {reviews.map((review) => (
              <li key={review.id} className="py-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <PersonCell name={review.author} />
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-muted-foreground">
                    {timeAgo(review.daysAgo)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {review.text}
                </p>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-primary/10 text-primary"
                >
                  {review.sessionType}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
