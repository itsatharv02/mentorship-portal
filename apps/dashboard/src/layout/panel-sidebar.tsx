import type { ReactNode } from "react";
import { NavLink } from "react-router";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  icon: LucideIcon;
  to?: string;
  end?: boolean;
};

const ITEM_CLASSES =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";

export function PanelSidebar({
  items,
  footer,
  onNavigate,
}: {
  items: NavItem[];
  footer: ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <p className="px-6 py-5 text-xl font-bold text-primary">Mentora</p>

      <nav aria-label="Main" className="flex-1 space-y-1 px-3">
        {items.map(({ label, icon: Icon, to, end }) =>
          to ? (
            <NavLink
              key={label}
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `${ITEM_CLASSES} ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ) : (
            <span
              key={label}
              aria-disabled="true"
              title="Coming soon"
              className={`${ITEM_CLASSES} cursor-not-allowed text-muted-foreground/50`}
            >
              <Icon className="size-4" />
              {label}
            </span>
          ),
        )}
      </nav>

      <div className="border-t p-4">{footer}</div>
    </div>
  );
}
