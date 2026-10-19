import {
  BoxIcon,
  ChevronRightIcon,
  CodeIcon,
  DatabaseIcon,
  MegaphoneIcon,
  PencilIcon,
  TrendingUpIcon,
  type LucideIcon,
} from "lucide-react";

const categories: { icon: LucideIcon; name: string; mentors: string }[] = [
  { icon: CodeIcon, name: "Software Engineering", mentors: "120+ mentors" },
  { icon: BoxIcon, name: "Product Management", mentors: "80+ mentors" },
  { icon: TrendingUpIcon, name: "Career Guidance", mentors: "60+ mentors" },
  { icon: PencilIcon, name: "Design", mentors: "45+ mentors" },
  { icon: DatabaseIcon, name: "Data Science", mentors: "70+ mentors" },
  { icon: MegaphoneIcon, name: "Marketing", mentors: "50+ mentors" },
];

export function Categories() {
  return (
    <section id="mentors" className="bg-background">
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore mentors by category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Find the right mentor in your area of interest.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ icon: Icon, name, mentors }) => (
            <a
              key={name}
              href="#"
              className="group flex items-center gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10 transition-colors hover:bg-muted"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-muted-foreground">{mentors}</p>
              </div>
              <ChevronRightIcon className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
