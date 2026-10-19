import Link from "next/link";
import { ChevronRightIcon, StarIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { AVAILABILITY_OPTIONS } from "../../lib/mentor-search";
import type { Mentor } from "../../lib/mentors";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const MOBILE_SKILL_LIMIT = 2;

export function MentorCard({ mentor }: { mentor: Mentor }) {
  const initials = mentor.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  const availability = AVAILABILITY_OPTIONS.find(
    (option) => option.value === mentor.availability,
  )?.label;

  const hiddenOnMobile = mentor.skills.length - MOBILE_SKILL_LIMIT;

  return (
    <article className="relative flex gap-3 rounded-xl bg-card p-3 ring-1 ring-foreground/10 sm:items-center sm:gap-4 sm:p-4">
      <Avatar className="size-14 rounded-xl after:rounded-xl sm:size-20">
        <AvatarImage src={mentor.photo} alt="" className="rounded-xl" />
        <AvatarFallback className="rounded-xl text-base sm:text-xl">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <h2 className="font-semibold">
          <Link
            href={`/mentors/${mentor.id}`}
            className="after:absolute after:inset-0"
          >
            {mentor.name}
          </Link>
        </h2>
        <p className="text-sm text-muted-foreground">
          {mentor.role}
          {mentor.company && ` at ${mentor.company}`}
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
          {mentor.skills.map((skill, index) => (
            <Badge
              key={skill}
              variant="secondary"
              className={`bg-primary/10 text-primary ${
                index >= MOBILE_SKILL_LIMIT ? "hidden sm:inline-flex" : ""
              }`}
            >
              {skill}
            </Badge>
          ))}
          {hiddenOnMobile > 0 && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary sm:hidden"
            >
              +{hiddenOnMobile}
            </Badge>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="flex items-center gap-1 font-medium">
            <StarIcon className="size-4 fill-amber-400 text-amber-400" />
            {mentor.rating}
            <span className="font-normal text-muted-foreground">
              ({mentor.reviews})
            </span>
          </span>
          <span className="flex items-center gap-1.5 text-green-600">
            <span className="size-2 rounded-full bg-green-500" />
            {availability}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between sm:justify-center sm:gap-3">
        <div className="text-right">
          <p className="font-bold sm:text-lg">
            {priceFormatter.format(mentor.price)}
          </p>
          <p className="text-xs text-muted-foreground">per session</p>
        </div>
        <ChevronRightIcon className="size-5 text-muted-foreground sm:hidden" />
        <Button
          variant="outline"
          size="lg"
          nativeButton={false}
          render={<Link href={`/mentors/${mentor.id}`} />}
          className="relative hidden sm:inline-flex"
        >
          View Profile
        </Button>
      </div>
    </article>
  );
}
