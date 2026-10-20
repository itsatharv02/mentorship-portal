import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";

function FloatingCard({
  className,
  title,
  subtitle,
  initials,
  photo,
}: {
  className: string;
  title: string;
  subtitle: string;
  initials: string;
  photo: string;
}) {
  return (
    <div
      className={`flex max-w-56 items-center gap-3 rounded-xl border bg-card p-3 shadow-lg ${className}`}
    >
      <Avatar size="lg">
        <AvatarImage src={photo} alt="" />
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
    <section className="overflow-x-clip bg-linear-to-b from-primary/10 to-background">
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

        <div className="relative ml-auto w-full max-w-lg">
          <div className="relative aspect-[8/7] overflow-hidden rounded-2xl bg-primary/15 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1543269664-02e941c052f7?q=90&w=1600&auto=format&fit=crop"
              alt="A smiling learner working on a laptop"
              fill
              priority
              quality={100}
              sizes="(min-width: 1152px) 32rem, (min-width: 768px) 45vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <FloatingCard
            className="absolute -top-3 -right-3 lg:-right-8"
            title="Career guidance"
            subtitle="Product Growth"
            initials="CG"
            photo="https://randomuser.me/api/portraits/men/32.jpg"
          />
          <FloatingCard
            className="absolute right-4 -bottom-5 lg:-right-4"
            title="1:1 Session"
            subtitle="Book a session with top mentors"
            initials="MS"
            photo="https://randomuser.me/api/portraits/men/45.jpg"
          />
        </div>
      </div>
    </section>
  );
}
