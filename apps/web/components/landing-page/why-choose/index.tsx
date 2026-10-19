import {
  CalendarIcon,
  LayersIcon,
  TagIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: UserRoundIcon,
    title: "Learn from experts",
    description:
      "Get practical advice from industry professionals with real experience.",
  },
  {
    icon: CalendarIcon,
    title: "1:1 personalized sessions",
    description: "Book sessions based on your goals and interests.",
  },
  {
    icon: LayersIcon,
    title: "Wide range of domains",
    description: "Tech, product, design, marketing, career growth and more.",
  },
  {
    icon: TagIcon,
    title: "Flexible and affordable",
    description: "Choose session durations that fit your schedule and budget.",
  },
];

export function WhyChoose() {
  return (
    <section id="how-it-works" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Why choose Mentora?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to learn, connect and grow.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-base font-semibold">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
