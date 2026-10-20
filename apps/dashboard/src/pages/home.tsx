import { Link } from "react-router";
import { ArrowRightIcon, ShieldCheckIcon, UserCheckIcon } from "lucide-react";

const PANELS = [
  {
    to: "/admin",
    title: "Admin panel",
    description: "Manage mentors, users, bookings and platform settings.",
    icon: ShieldCheckIcon,
  },
  {
    to: "/mentor",
    title: "Mentor panel",
    description:
      "Manage your sessions, availability, earnings, reviews and profile.",
    icon: UserCheckIcon,
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <p className="text-2xl font-bold text-primary">Mentora</p>
      <h1 className="mt-2 text-xl font-semibold">Choose a panel</h1>

      <div className="mt-8 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {PANELS.map(({ to, title, description, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <h2 className="mt-4 font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Open
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
