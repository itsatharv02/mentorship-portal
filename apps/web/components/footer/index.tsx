import { Separator } from "@repo/ui/components/separator";

const columns = [
  {
    title: "Product",
    links: ["Find Mentors", "How It Works", "For Mentors", "Resources"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Privacy Policy", "Terms of Service"],
  },
];

const socials = ["LinkedIn", "Twitter", "YouTube"];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <a href="#" className="text-xl font-bold text-primary">
              Mentora
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Connecting learners with experienced professionals for real-world
              guidance and growth.
            </p>
            <ul className="mt-4 flex gap-4">
              {socials.map((name) => (
                <li key={name}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground md:text-right">
          &copy; 2026 Mentora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
