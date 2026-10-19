import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GlobeIcon,
  StarIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { formatPrice } from "../../lib/booking";
import type { MentorDetail } from "../../lib/mentor-details";
import type { Mentor } from "../../lib/mentors";

function SidebarCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold">{title}</h2>
        {action}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function LanguagesCard({ languages }: { languages: string[] }) {
  return (
    <SidebarCard title="Languages">
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <Badge
            key={language}
            variant="secondary"
            className="h-7 px-3 text-sm"
          >
            <GlobeIcon />
            {language}
          </Badge>
        ))}
      </div>
    </SidebarCard>
  );
}

export function LinksCard({ links }: { links: MentorDetail["links"] }) {
  return (
    <SidebarCard title="Links">
      <ul className="space-y-2">
        {links.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <li key={link.label}>
              <a
                href={link.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLinkIcon className="size-4" />
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </SidebarCard>
  );
}

export function SimilarMentors({ mentors }: { mentors: Mentor[] }) {
  return (
    <SidebarCard
      title="Similar Mentors"
      action={
        <Link
          href="/mentors"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View all
          <ArrowRightIcon className="size-3.5" />
        </Link>
      }
    >
      <ul className="space-y-1">
        {mentors.map((mentor) => (
          <li key={mentor.id}>
            <Link
              href={`/mentors/${mentor.id}`}
              className="-mx-2 flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
            >
              <Avatar size="lg" className="rounded-lg after:rounded-lg">
                <AvatarImage src={mentor.photo} alt="" className="rounded-lg" />
                <AvatarFallback className="rounded-lg">
                  {mentor.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{mentor.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {mentor.role}
                  {mentor.company && ` at ${mentor.company}`}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs">
                  <StarIcon className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-muted-foreground">
                    ({mentor.reviews})
                  </span>
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold">{formatPrice(mentor.price)}</p>
                <p className="text-xs text-muted-foreground">per session</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SidebarCard>
  );
}
