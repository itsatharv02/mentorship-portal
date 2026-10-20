import { MentorCta } from "./mentor-cta";

const stats = [
  { value: "10,000+", label: "Learners on the platform" },
  { value: "4.9/5", label: "Average session rating" },
  { value: "3,000+", label: "Active mentors" },
];

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="rounded-2xl bg-primary/5 p-6 ring-1 ring-primary/10 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-10">
        <div className="lg:max-w-xl">
          <MentorCta />
        </div>

        <ul className="mt-8 grid grid-cols-3 divide-x divide-primary/15 text-center lg:mt-0 lg:shrink-0">
          {stats.map((stat) => (
            <li key={stat.label} className="px-3 sm:px-6">
              <p className="text-xl font-bold sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
