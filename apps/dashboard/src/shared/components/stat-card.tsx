import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  note,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  note?: string;
}) {
  return (
    <div className="flex items-start justify-between rounded-xl border bg-card p-5">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-bold">{value}</p>
        {change && (
          <p className="mt-1 text-xs font-medium text-green-600">
            {change}{" "}
            <span className="font-normal text-muted-foreground">
              vs last month
            </span>
          </p>
        )}
        {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
      </div>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
    </div>
  );
}
