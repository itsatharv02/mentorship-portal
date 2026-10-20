import { Link } from "react-router";
import { CalendarIcon, ClockIcon, MoreVerticalIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import type { MenteeBooking } from "../data/panel";
import { formatDate, formatTimeRange, initials } from "../../shared/lib/format";
import { StatusBadge } from "../../shared/components/status-badge";

export function MenteeBookingCard({
  booking,
  showStatus = false,
}: {
  booking: MenteeBooking;
  showStatus?: boolean;
}) {
  const { mentor } = booking;
  const detailsPath = `/mentee/bookings/${booking.id}`;

  return (
    <article className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-xl border bg-card p-4">
      <div className="flex min-w-56 flex-1 items-center gap-3">
        <Avatar className="size-14 rounded-xl after:rounded-xl">
          <AvatarImage src={mentor.photo} alt="" className="rounded-xl" />
          <AvatarFallback className="rounded-xl">
            {initials(mentor.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <Link to={detailsPath} className="font-semibold hover:underline">
            {mentor.name}
          </Link>
          <p className="text-sm text-muted-foreground">
            {mentor.role} at {mentor.company}
          </p>
          <Badge
            variant="secondary"
            className="mt-1.5 bg-primary/10 text-primary"
          >
            {booking.sessionType}
          </Badge>
        </div>
      </div>

      <ul className="space-y-1 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <CalendarIcon className="size-4" />
          {formatDate(booking.dateTime)}
        </li>
        <li className="flex items-center gap-2">
          <ClockIcon className="size-4" />
          {formatTimeRange(booking.dateTime, booking.durationMins)}
        </li>
        <li className="pl-6">{booking.durationMins} minutes</li>
      </ul>

      <div className="flex items-center gap-2">
        {showStatus && <StatusBadge status={booking.status} />}
        {booking.status === "upcoming" ? (
          <>
            {booking.joinable && <Button type="button">Join</Button>}
            <Button type="button" variant="outline">
              Reschedule
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link to={detailsPath} />}
          >
            View Details
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`More actions for the session with ${mentor.name}`}
        >
          <MoreVerticalIcon />
        </Button>
      </div>
    </article>
  );
}
