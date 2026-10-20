import {
  BookOpenIcon,
  CalendarClockIcon,
  LaptopIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: string;
}[] = [
  {
    icon: UsersIcon,
    title: "1:1 mentorship sessions",
    description: "Learn directly from industry experts",
    tone: "bg-blue-100 text-blue-600",
  },
  {
    icon: CalendarClockIcon,
    title: "Flexible scheduling",
    description: "Book sessions at your convenience",
    tone: "bg-green-100 text-green-600",
  },
  {
    icon: BookOpenIcon,
    title: "Practical, real-world advice",
    description: "Get insights that help you grow",
    tone: "bg-purple-100 text-purple-600",
  },
];

export function AuthHero() {
  return (
    <section className="relative hidden overflow-hidden bg-linear-to-br from-primary/10 via-background to-background lg:block">
      <div className="relative z-10 max-w-lg px-12 pt-20 xl:px-20">
        <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
          Learn from people who&apos;ve{" "}
          <span className="text-primary">been there.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Get personalized guidance from experienced professionals to grow your
          career, skills and confidence.
        </p>

        <ul className="mt-8 space-y-5">
          {features.map(({ icon: Icon, title, description, tone }) => (
            <li key={title} className="flex items-center gap-4">
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tone}`}
              >
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden
        className="absolute -right-24 -bottom-24 size-[28rem] rounded-full bg-primary/10"
      />
      <LaptopIcon
        aria-hidden
        className="absolute right-16 bottom-12 size-40 text-primary/30"
      />
    </section>
  );
}
