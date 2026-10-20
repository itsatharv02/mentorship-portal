import type { ReactNode } from "react";
import { AuthHero, type HeroContent } from "./auth-hero";

export function AuthLayout({
  hero,
  children,
}: {
  hero: HeroContent;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-2">
      <AuthHero {...hero} />
      <section className="flex min-w-0 items-center justify-center px-4 py-12">
        {children}
      </section>
    </main>
  );
}
