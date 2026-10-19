import { ArrowRightIcon, UserRoundIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";

function FloatingCard({
  className,
  title,
  subtitle,
  initials,
}: {
  className: string;
  title: string;
  subtitle: string;
  initials: string;
}) {
  return (
    <div
      className={`flex max-w-56 items-center gap-3 rounded-xl border bg-card p-3 shadow-lg ${className}`}
    >
      <Avatar size="lg">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-linear-to-b from-primary/10 to-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <Badge variant="secondary" className="h-7 px-3 text-sm text-primary">
            1:1 Mentorship for a Brighter Career
          </Badge>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Learn from people who&apos;ve been there
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Get guidance, practical advice and real-world insights from industry
            experts. Build skills, grow your network and take the next step in
            your career.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="h-11 px-6 text-base">
              Explore Mentors
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" className="h-11 px-6 text-base">
              How it Works
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="flex aspect-[4/5] items-center justify-center rounded-3xl bg-primary/15">
            <UserRoundIcon className="size-24 text-primary/40" />
          </div>
          <FloatingCard
            className="absolute -top-4 right-0 md:-right-6"
            title="Career guidance"
            subtitle="Product Growth"
            initials="CG"
          />
          <FloatingCard
            className="absolute -bottom-4 left-0 md:-left-6"
            title="1:1 Session"
            subtitle="Book a session with top mentors"
            initials="MS"
          />
        </div>
      </div>
    </section>
  );
}
