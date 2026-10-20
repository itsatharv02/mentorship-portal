import { Badge } from "@repo/ui/components/badge";

const STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  inactive: "bg-red-100 text-red-700",
  confirmed: "bg-green-100 text-green-700",
  upcoming: "bg-blue-100 text-blue-700",
  completed: "bg-sky-100 text-sky-700",
  cancelled: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="secondary" className={`capitalize ${STYLES[status] ?? ""}`}>
      {status}
    </Badge>
  );
}
