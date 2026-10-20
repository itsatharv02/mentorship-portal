import { Link, useParams } from "react-router";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { StatusBadge } from "../../shared/components/status-badge";
import { MENTORS } from "../../shared/data/mentors";
import { formatINR, initials } from "../../shared/lib/format";

const SECTIONS = [
  "Overview",
  "Edit Profile",
  "Availability",
  "Sessions",
  "Reviews",
  "Documents",
];

export default function MentorDetailsPage() {
  const { id } = useParams();
  const mentor = MENTORS.find((item) => item.id === id);

  if (!mentor) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-xl font-bold">Mentor not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This mentor doesn&apos;t exist or has been removed.
        </p>
        <Link
          to="/admin/mentors"
          className="mt-4 inline-block text-sm text-primary hover:underline"
        >
          Back to mentors
        </Link>
      </div>
    );
  }

  const info = [
    { label: "Name", value: mentor.name },
    { label: "Email", value: mentor.email },
    { label: "Location", value: mentor.location },
    { label: "Company", value: mentor.company },
    { label: "Experience", value: `${mentor.experienceYears}+ years` },
    { label: "Hourly Rate", value: `${formatINR(mentor.price)} per session` },
  ];

  return (
    <>
      <Link
        to="/admin/mentors"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to mentors
      </Link>

      <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="h-fit rounded-xl border bg-card p-5">
          <Avatar className="size-28 rounded-xl after:rounded-xl">
            <AvatarImage src={mentor.photo} alt="" className="rounded-xl" />
            <AvatarFallback className="rounded-xl text-2xl">
              {initials(mentor.name)}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-lg font-bold">{mentor.name}</h2>
          <p className="text-sm text-muted-foreground">
            {mentor.role} at {mentor.company}
          </p>
          <div className="mt-2">
            <StatusBadge status={mentor.status} />
          </div>

          <ul className="mt-5 space-y-1">
            {SECTIONS.map((section, index) => (
              <li key={section}>
                <button
                  type="button"
                  disabled={index !== 0}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                    index === 0
                      ? "bg-primary/10 text-primary"
                      : "cursor-not-allowed text-muted-foreground/50"
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              Mentor Details
            </h1>
            <Button type="button" size="lg" className="h-10">
              Edit
            </Button>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <section className="rounded-xl border bg-card p-5">
              <h2 className="font-semibold">Basic Information</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {info.map((row) => (
                  <div key={row.label} className="flex gap-4">
                    <dt className="w-28 shrink-0 text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="min-w-0 font-medium break-words">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-xl border bg-card p-5">
              <h2 className="font-semibold">Profile Image</h2>
              <div className="relative mt-4 w-fit">
                <Avatar className="size-32 rounded-xl after:rounded-xl">
                  <AvatarImage
                    src={mentor.photo}
                    alt={`${mentor.name}'s profile`}
                    className="rounded-xl"
                  />
                  <AvatarFallback className="rounded-xl text-3xl">
                    {initials(mentor.name)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label="Change profile image"
                  className="absolute right-2 bottom-2 bg-background"
                >
                  <PencilIcon />
                </Button>
              </div>
            </section>
          </div>

          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">About Me</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {mentor.about}
            </p>
          </section>

          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Areas of Expertise</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {mentor.expertise.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="h-7 bg-primary/10 px-3 text-sm text-primary"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
