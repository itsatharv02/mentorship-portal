import { Badge } from "@repo/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import type { Booking } from "../data/bookings";
import { formatDateTime, formatINR } from "../lib/format";
import { PersonCell } from "./person-cell";
import { StatusBadge } from "./status-badge";

export function BookingsTable({
  bookings,
  showDuration = false,
}: {
  bookings: Booking[];
  showDuration?: boolean;
}) {
  const columns = showDuration ? 7 : 6;

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>User</TableHead>
          <TableHead>Mentor</TableHead>
          <TableHead>Session Type</TableHead>
          <TableHead>Date &amp; Time</TableHead>
          {showDuration && <TableHead>Duration</TableHead>}
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.length === 0 ? (
          <TableRow className="hover:bg-transparent">
            <TableCell
              colSpan={columns}
              className="h-24 text-center text-muted-foreground"
            >
              No bookings match your filters.
            </TableCell>
          </TableRow>
        ) : (
          bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <PersonCell name={booking.user} />
              </TableCell>
              <TableCell>
                <PersonCell name={booking.mentor} photo={booking.mentorPhoto} />
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {booking.sessionType}
                </Badge>
              </TableCell>
              <TableCell>{formatDateTime(booking.dateTime)}</TableCell>
              {showDuration && (
                <TableCell>{booking.durationMins} mins</TableCell>
              )}
              <TableCell>{formatINR(booking.amount)}</TableCell>
              <TableCell>
                <StatusBadge status={booking.status} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
