import {
  CalendarDaysIcon,
  LaptopIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const benefits: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: string;
}[] = [
  {
    icon: UsersIcon,
    title: "Give back",
    description: "Help others navigate their career journey.",
    tone: "bg-blue-100 text-blue-600",
  },
  {
    icon: TrendingUpIcon,
    title: "Build your personal brand",
    description: "Get visibility as an industry expert.",
    tone: "bg-green-100 text-green-600",
  },
  {
    icon: CalendarDaysIcon,
    title: "Flexible commitment",
    description: "Set your own availability and session durations.",
    tone: "bg-purple-100 text-purple-600",
  },
  {
    icon: StarIcon,
    title: "Meaningful connections",
    description: "Engage with motivated learners from diverse backgrounds.",
    tone: "bg-amber-100 text-amber-600",
  },
];

export function BecomeMentorHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-background">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image
          src="https://images.unsplash.com/photo-1787647561631-bb68b5ae11e1?q=80&w=1600&auto=format&fit=crop"
          alt="A mentor smiling while working on a laptop"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Become a mentor
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Share your experience.
            <span className="block text-primary">Make an impact.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Help learners grow in their careers by sharing your knowledge and
            real-world experience. Join a community of professionals who are
            shaping the next generation.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, description, tone }) => (
              <li key={title} className="flex items-start gap-4">
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${tone}`}
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
