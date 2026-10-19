import Link from "next/link";
import { ArrowLeftIcon, StarIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import type { Mentor } from "../../lib/mentors";

export function BookingHeader({ mentor }: { mentor: Mentor }) {
  const initials = mentor.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <header>
      <Link
        href={`/mentors/${mentor.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to mentor profile
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <Avatar className="size-20 rounded-xl after:rounded-xl sm:size-24">
          <AvatarImage src={mentor.photo} alt="" className="rounded-xl" />
          <AvatarFallback className="rounded-xl text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Book a Session with</p>
          <h1 className="text-2xl font-bold tracking-tight">{mentor.name}</h1>
          <p className="text-sm text-muted-foreground">
            {mentor.role}
            {mentor.company && ` at ${mentor.company}`}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm">
            <StarIcon className="size-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{mentor.rating}</span>
            <span className="text-muted-foreground">
              ({mentor.reviews} reviews)
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}
