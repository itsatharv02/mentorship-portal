export const SESSION_MINUTES = 60;

export const PLATFORM_FEE = 50;

export const BOOKING_WINDOW_DAYS = 30;

export const DAYS_TO_SHOW = 14;

export const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export const PAYMENT_METHODS = [
  { value: "upi", label: "UPI" },
  { value: "card", label: "Credit / Debit Card" },
  { value: "netbanking", label: "Net Banking" },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
};

type Availability = "this-week" | "weekends";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

export function getTotal(sessionFee: number): number {
  return sessionFee + PLATFORM_FEE;
}

export function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromDateKey(key: string): Date {
  const [year = 0, month = 1, day = 1] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isDateAvailable(
  date: Date,
  availability: Availability,
  todayKey: string,
): boolean {
  const today = fromDateKey(todayKey);
  const day = fromDateKey(toDateKey(date));
  const last = addDays(today, BOOKING_WINDOW_DAYS);

  if (day.getTime() <= today.getTime() || day.getTime() > last.getTime()) {
    return false;
  }

  const weekday = day.getDay();
  return availability === "weekends"
    ? weekday === 0 || weekday === 6
    : weekday !== 0;
}

export function getAvailableDays(
  availability: Availability,
  todayKey: string,
  count: number = DAYS_TO_SHOW,
): string[] {
  const today = fromDateKey(todayKey);
  const days: string[] = [];

  for (
    let offset = 1;
    offset <= BOOKING_WINDOW_DAYS && days.length < count;
    offset++
  ) {
    const date = addDays(today, offset);
    if (isDateAvailable(date, availability, todayKey)) {
      days.push(toDateKey(date));
    }
  }

  return days;
}

export function getDayParts(key: string) {
  const date = fromDateKey(key);

  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    day: date.getDate(),
    month: date.toLocaleDateString("en-US", { month: "short" }),
  };
}

export function formatDateLong(key: string): string {
  return fromDateKey(key).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
