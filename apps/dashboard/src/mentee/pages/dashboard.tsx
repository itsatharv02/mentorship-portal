import { Link } from "react-router";
import {
  ArrowRightIcon,
  BookmarkIcon,
  CalendarClockIcon,
  CircleCheckIcon,
  CompassIcon,
  StarIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { MenteeBookingCard } from "../components/booking-card";
import { PageHeader } from "../../shared/components/page-header";
import { StatCard } from "../../shared/components/stat-card";
import {
  CURRENT_MENTEE,
  MENTEE_BOOKINGS,
  RECOMMENDED,
} from "../data/panel";
import { LEARNER_URL } from "../../shared/lib/config";
import { initials } from "../../shared/lib/format";
import { useSavedMentors } from "../lib/saved-mentors-context";

export default function MenteeDashboardPage() {
  const { savedIds, isSaved, toggleSaved } = useSavedMentors();

  const upcoming = MENTEE_BOOKINGS.filter(
    (booking) => booking.status === "upcoming",
  );
  const completed = MENTEE_BOOKINGS.filter(
    (booking) => booking.status === "completed",
  );
  const firstName = CURRENT_MENTEE.name.split(" ")[0];

  return (
    <>
      <PageHeader
        title={`Good morning, ${firstName}`}
        subtitle="Continue your learning journey."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CalendarClockIcon}
          label="Upcoming Sessions"
          value={String(upcoming.length)}
        />
        <StatCard
          icon={CircleCheckIcon}
          label="Completed Sessions"
          value={String(completed.length)}
        />
        <StatCard
          icon={BookmarkIcon}
          label="Saved Mentors"
          value={String(savedIds.length)}
        />
        <StatCard
          icon={StarIcon}
          label="Reviews Given"
          value={String(CURRENT_MENTEE.reviewsGiven)}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Upcoming Sessions</h2>
            <Link
              to="/mentee/bookings"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View all
              <ArrowRightIcon className="size-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcoming.map((booking) => (
              <MenteeBookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-xl border bg-primary/5 p-5">
            <CompassIcon
              aria-hidden
              className="absolute -right-4 -bottom-4 size-32 text-primary/10"
            />
            <div className="relative">
              <h2 className="font-semibold">Continue Exploring</h2>
              <p className="mt-1 max-w-56 text-sm text-muted-foreground">
                Find more mentors to learn from industry experts.
              </p>
              <Button
                size="lg"
                nativeButton={false}
                render={<a href={`${LEARNER_URL}/mentors`} />}
                className="mt-4 h-10"
              >
                Explore Mentors
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </section>

          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Recommended for you</h2>
            <ul className="mt-3 divide-y">
              {RECOMMENDED.map(({ mentor, rating, reviews }) => {
                const saved = isSaved(mentor.id);

                return (
                  <li key={mentor.id} className="flex items-center gap-3 py-3">
                    <Avatar className="size-12 rounded-xl after:rounded-xl">
                      <AvatarImage
                        src={mentor.photo}
                        alt=""
                        className="rounded-xl"
                      />
                      <AvatarFallback className="rounded-xl">
                        {initials(mentor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{mentor.name}</p>
                      <p className="truncate text-sm text-muted-foreground">
                        {mentor.role} at {mentor.company}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1 font-medium">
                          <StarIcon className="size-3.5 fill-amber-400 text-amber-400" />
                          {rating}
                          <span className="font-normal text-muted-foreground">
                            ({reviews})
                          </span>
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary"
                        >
                          {mentor.domain}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-pressed={saved}
                      aria-label={
                        saved
                          ? `Remove ${mentor.name} from saved mentors`
                          : `Save ${mentor.name}`
                      }
                      onClick={() => toggleSaved(mentor.id)}
                    >
                      <BookmarkIcon
                        className={saved ? "fill-primary text-primary" : ""}
                      />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
