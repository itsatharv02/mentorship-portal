import type { ReactNode } from "react";

export function TableCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">{children}</div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <p className="px-4 py-12 text-center text-sm text-muted-foreground">
      {message}
    </p>
  );
}
