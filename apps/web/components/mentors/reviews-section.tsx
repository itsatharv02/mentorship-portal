import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import type { Review } from "../../lib/mentor-details";
import type { Mentor } from "../../lib/mentors";

function Stars({ rating }: { rating: number }) {
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="flex gap-0.5"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          className={`size-4 ${
            index < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/40"
          }`}
        />
      ))}
    </span>
  );
}

export function ReviewsSection({
  mentor,
  reviews,
}: {
  mentor: Mentor;
  reviews: Review[];
}) {
  return (
    <section id="reviews" className="scroll-mt-32 border-t py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Reviews</h2>
          <div className="mt-3 flex items-center gap-3">
            <StarIcon className="size-9 fill-amber-400 text-amber-400" />
            <div>
              <p className="text-lg font-bold">
                {mentor.rating}{" "}
                <span className="text-base font-semibold">out of 5</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Based on {mentor.reviews} reviews
              </p>
            </div>
          </div>
        </div>
        <Button type="button" variant="outline" size="lg">
          Write a review
        </Button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="flex gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
          >
            <Avatar size="lg">
              <AvatarFallback>
                {review.author
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="text-sm font-semibold">{review.author}</p>
                <p className="text-xs text-muted-foreground">
                  {review.timeAgo}
                </p>
                <Stars rating={review.rating} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {review.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
