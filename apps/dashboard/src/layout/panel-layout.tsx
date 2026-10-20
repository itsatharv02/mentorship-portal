import { useState, type ReactNode } from "react";
import { Outlet } from "react-router";
import { MenuIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";
import { PanelSidebar, type NavItem } from "./panel-sidebar";

export function PanelLayout({
  items,
  footer,
  topbar,
}: {
  items: NavItem[];
  footer: ReactNode;
  topbar?: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r bg-background lg:block">
        <PanelSidebar items={items} footer={footer} />
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background px-4 lg:hidden">
          <span className="text-lg font-bold text-primary">Mentora</span>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <MenuIcon />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <PanelSidebar
                items={items}
                footer={footer}
                onNavigate={() => setMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </header>

        {topbar && (
          <div className="hidden h-16 items-center justify-end gap-3 px-8 lg:flex">
            {topbar}
          </div>
        )}

        <main className={`p-4 sm:p-6 lg:p-8 ${topbar ? "lg:pt-2" : ""}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
