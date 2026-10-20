import { CalendarIcon } from "lucide-react";

export function DateRangePill() {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
      <CalendarIcon className="size-4 text-muted-foreground" />
      Apr 1, 2024 - Apr 30, 2024
    </div>
  );
}
