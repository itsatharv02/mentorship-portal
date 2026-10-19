import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";

const links = [
  { label: "Find Mentors", href: "/mentors" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Mentors", href: "/#for-mentors" },
  { label: "Resources", href: "/#resources" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="#" className="text-xl font-bold text-primary">
          Mentora
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="lg">
            Log in
          </Button>
          <Button size="lg">Sign up</Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Mentora</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 px-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 p-4">
              <Button variant="outline">Log in</Button>
              <Button>Sign up</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
