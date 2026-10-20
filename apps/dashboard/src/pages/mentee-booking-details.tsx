import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  MonitorIcon,
  StarIcon,
  TagIcon,
  WalletIcon,
  MoreHorizontalIcon,
  CircleDotIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { StatusBadge } from "../components/status-badge";
import { TabsNav } from "../components/tabs-nav";
import {
  MENTEE_BOOKINGS,
  PREPARATION_TIPS,
  SESSION_ABOUT,
} from "../data/mentee-panel";
import { LEARNER_URL } from "../lib/config";
import { formatINR, formatLongDateTime, initials } from "../lib/format";

type DetailsTab = "details" | "preparation" | "notes" | "manage";

const TABS: { value: DetailsTab; label: string }[] = [
  { value: "details", label: "Details" },
  { value: "preparation", label: "Preparation" },
  { value: "notes", label: "Notes" },
  { value: "manage", label: "Reschedule / Cancel" },
];

type CancelStep = "idle" | "confirm" | "requested";

function ChangeSection({ disabled }: { disabled: boolean }) {
  const [step, setStep] = useState<CancelStep>("idle");

  if (disabled) {
    return (
      <p className="text-sm text-muted-foreground">
        This session can no longer be changed.
      </p>
    );
  }

  return (
    <div>
      <p className="text-sm font-medium">Need to make changes?</p>
      <p className="mt-1 text-sm text-muted-foreground">
        You can reschedule or cancel your session up to 12 hours before the
        scheduled time.
      </p>

      {step === "requested" ? (
        <p role="status" className="mt-4 text-sm text-green-600">
          Cancellation requested. This is a demo, so nothing was changed.
        </p>
      ) : step === "confirm" ? (
        <div
          role="alertdialog"
          aria-label="Confirm cancellation"
          className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
        >
          <p className="text-sm font-medium">Cancel this session?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            You won&apos;t be able to undo this.
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("idle")}
            >
              Keep session
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setStep("requested")}
            >
              Yes, cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="lg" className="h-10">
            Reschedule
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="lg"
            className="h-10"
            onClick={() => setStep("confirm")}
          >
            Cancel Session
          </Button>
        </div>
      )}
    </div>
  );
}

export default function MenteeBookingDetailsPage() {
  const { id } = useParams();
  const booking = MENTEE_BOOKINGS.find((item) => item.id === id);
  const [tab, setTab] = useState<DetailsTab>("details");
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);

  if (!booking) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-xl font-bold">Booking not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This booking doesn&apos;t exist or has been removed.
        </p>
        <Link
          to="/mentee/bookings"
          className="mt-4 inline-block text-sm text-primary hover:underline"
        >
          Back to bookings
        </Link>
      </div>
    );
  }

  const { mentor } = booking;
  const isUpcoming = booking.status === "upcoming";
  const profileUrl = `${LEARNER_URL}/mentors/${mentor.id}`;

  const info = [
    { icon: TagIcon, label: "Session Type", value: booking.sessionType },
    {
      icon: CalendarIcon,
      label: "Date & Time",
      value: formatLongDateTime(booking.dateTime),
    },
    {
      icon: ClockIcon,
      label: "Duration",
      value: `${booking.durationMins} minutes`,
    },
    { icon: MonitorIcon, label: "Mode", value: "Google Meet (online)" },
    { icon: WalletIcon, label: "Session Fee", value: formatINR(booking.fee) },
  ];

  return (
    <>
      <Link
        to="/mentee/bookings"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to bookings
      </Link>

      <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-5">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 rounded-xl after:rounded-xl">
            <AvatarImage src={mentor.photo} alt="" className="rounded-xl" />
            <AvatarFallback className="rounded-xl text-lg">
              {initials(mentor.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{mentor.name}</h1>
            <p className="text-sm text-muted-foreground">
              {mentor.role} at {mentor.company}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm">
              <StarIcon className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">4.9</span>
              <span className="text-muted-foreground">(86 reviews)</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={booking.status} />
          {isUpcoming && (
            <>
              {booking.joinable && (
                <Button type="button" size="lg" className="h-10">
                  Join Session
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-10"
              >
                Reschedule
              </Button>
            </>
          )}
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="More actions"
          >
            <MoreHorizontalIcon />
          </Button>
        </div>
      </header>

      <div className="mt-4">
        <TabsNav
          label="Booking sections"
          tabs={TABS}
          value={tab}
          onChange={setTab}
        />
      </div>

      <div className="mt-6">
        {tab === "details" && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <section className="rounded-xl border bg-card p-5">
              <dl className="space-y-4 text-sm">
                {info.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <dt className="flex w-36 shrink-0 items-center gap-2 text-muted-foreground">
                      <Icon className="size-4" />
                      {label}
                    </dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
                <div className="flex items-center gap-4">
                  <dt className="flex w-36 shrink-0 items-center gap-2 text-muted-foreground">
                    <CircleDotIcon className="size-4" />
                    Status
                  </dt>
                  <dd>
                    <StatusBadge status={booking.status} />
                  </dd>
                </div>
              </dl>
            </section>

            <div className="space-y-6">
              <section className="rounded-xl border bg-card p-5">
                <h2 className="font-semibold">About this session</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {SESSION_ABOUT[booking.sessionType] ??
                    "A one-to-one session with your mentor."}
                </p>

                <h3 className="mt-5 text-sm font-semibold">Mentor</h3>
                <div className="mt-2 flex items-center gap-3">
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
                    <p className="font-medium">{mentor.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {mentor.role} at {mentor.company}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={<a href={profileUrl} />}
                  >
                    View Profile
                  </Button>
                </div>
              </section>

              <section className="rounded-xl border bg-card p-5">
                <ChangeSection disabled={!isUpcoming} />
              </section>
            </div>
          </div>
        )}

        {tab === "preparation" && (
          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Get ready for your session</h2>
            <ul className="mt-3 space-y-3">
              {PREPARATION_TIPS.map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-sm">
                  <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === "notes" && (
          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Your notes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Jot down questions to ask or takeaways to remember. Only you can
              see these.
            </p>
            <label htmlFor="session-notes" className="sr-only">
              Session notes
            </label>
            <textarea
              id="session-notes"
              rows={6}
              value={notes}
              onChange={(event) => {
                setNotes(event.target.value);
                setNotesSaved(false);
              }}
              className="mt-3 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <div className="mt-3 flex items-center gap-3">
              <Button
                type="button"
                size="lg"
                className="h-10"
                onClick={() => setNotesSaved(true)}
              >
                Save Notes
              </Button>
              {notesSaved && (
                <p role="status" className="text-sm text-green-600">
                  Notes saved.
                </p>
              )}
            </div>
          </section>
        )}

        {tab === "manage" && (
          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Reschedule or cancel</h2>
            <div className="mt-3">
              <ChangeSection disabled={!isUpcoming} />
            </div>
          </section>
        )}
      </div>
    </>
  );
}
