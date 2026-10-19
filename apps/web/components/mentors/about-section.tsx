import {
  Building2Icon,
  CalendarIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@repo/ui/components/badge";
import type { MentorDetail } from "../../lib/mentor-details";
import type { Mentor } from "../../lib/mentors";

export function AboutSection({
  mentor,
  detail,
}: {
  mentor: Mentor;
  detail: MentorDetail;
}) {
  const stats: { icon: LucideIcon; value: string; label: string }[] = [
    {
      icon: CalendarIcon,
      value: `${mentor.experienceYears}+`,
      label: "Years Experience",
    },
    {
      icon: Building2Icon,
      value: mentor.company ?? "Independent",
      label: "Current Company",
    },
    {
      icon: UsersIcon,
      value: `${detail.sessionsConducted}+`,
      label: "Sessions Conducted",
    },
  ];

  return (
    <section id="about" className="scroll-mt-32 space-y-8 py-8">
      <div>
        <h2 className="text-xl font-bold">About Me</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          {detail.bio}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold">Areas of Expertise</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {mentor.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="h-7 bg-primary/10 px-3 text-sm text-primary"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold">My Approach</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          {detail.approach}
        </p>
      </div>
    </section>
  );
}
