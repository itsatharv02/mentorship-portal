import type { ReactNode } from "react";
import { LaptopIcon, type LucideIcon } from "lucide-react";

export type HeroFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: string;
};

export type HeroContent = {
  heading: ReactNode;
  description: string;
  features: HeroFeature[];
};

export function AuthHero({ heading, description, features }: HeroContent) {
  return (
    <section className="relative hidden overflow-hidden bg-linear-to-br from-primary/10 via-background to-background lg:block">
      <div className="relative z-10 max-w-lg px-12 pt-20 xl:px-20">
        <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
          {heading}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">{description}</p>

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
