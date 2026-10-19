"use client";

import { useEffect, useState } from "react";

type Tab = { id: string; label: string };

export function ProfileTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const topmost = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (topmost) setActive(topmost.target.id);
      },
      { rootMargin: "-120px 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(tabs[tabs.length - 1]?.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tabs]);

  return (
    <nav
      aria-label="Profile sections"
      className="sticky top-16 z-30 bg-background/90 backdrop-blur"
    >
      <ul className="flex gap-6 overflow-x-auto shadow-[inset_0_-1px_0_var(--border)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <a
              href={`#${tab.id}`}
              aria-current={active === tab.id ? "true" : undefined}
              className={`block border-b-2 px-1 py-3 text-sm whitespace-nowrap transition-colors ${
                active === tab.id
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
