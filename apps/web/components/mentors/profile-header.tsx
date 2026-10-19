import Link from "next/link";
import {
  ArrowLeftIcon,
  BadgeCheckIcon,
  Building2Icon,
  BriefcaseIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import type { Mentor } from "../../lib/mentors";

function SkillBadges({
  skills,
  className,
}: {
  skills: string[];
  className: string;
}) {
  return (
    <div className={`flex-wrap gap-2 ${className}`}>
      {skills.map((skill) => (
        <Badge
          key={skill}
          variant="secondary"
          className="h-7 bg-primary/10 px-3 text-sm text-primary"
        >
          {skill}
        </Badge>
      ))}
    </div>
  );
}

export function ProfileHeader({
  mentor,
  location,
}: {
  mentor: Mentor;
  location: string;
}) {
  const initials = mentor.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <header>
      <Link
        href="/mentors"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to mentors
      </Link>

      <div className="mt-4 flex gap-4 sm:gap-6">
        <Avatar className="size-24 rounded-2xl after:rounded-2xl sm:size-36">
          <AvatarImage src={mentor.photo} alt="" className="rounded-2xl" />
          <AvatarFallback className="rounded-2xl text-2xl sm:text-4xl">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {mentor.name}
            <BadgeCheckIcon className="size-6 shrink-0 fill-primary text-primary-foreground" />
          </h1>
          <p className="mt-1 font-semibold">
            {mentor.role}
            {mentor.company && ` at ${mentor.company}`}
          </p>

          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <MapPinIcon className="size-4" />
              {location}
            </li>
            <li className="flex items-center gap-1.5">
              <BriefcaseIcon className="size-4" />
              {mentor.experienceYears}+ years of experience
            </li>
            {mentor.company && (
              <li className="flex items-center gap-1.5">
                <Building2Icon className="size-4" />
                {mentor.company}
              </li>
            )}
          </ul>

          <p className="mt-3 flex items-center gap-1.5 text-sm">
            <StarIcon className="size-5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{mentor.rating}</span>
            <span className="text-muted-foreground">
              ({mentor.reviews} reviews)
            </span>
          </p>

          <SkillBadges skills={mentor.skills} className="mt-4 hidden sm:flex" />
        </div>
      </div>

      <SkillBadges skills={mentor.skills} className="mt-4 flex sm:hidden" />
    </header>
  );
}
