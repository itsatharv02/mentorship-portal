import { StarIcon } from "lucide-react";

export function StarRating({
  rating,
  className = "size-4",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="flex gap-0.5"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          className={`${className} ${
            index < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/40"
          }`}
        />
      ))}
    </span>
  );
}
