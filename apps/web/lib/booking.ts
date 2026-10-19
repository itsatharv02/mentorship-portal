export const DURATION_OPTIONS = [
  { value: "30", label: "30 minutes", factor: 0.5 },
  { value: "45", label: "45 minutes", factor: 0.75 },
  { value: "60", label: "60 minutes", factor: 1 },
];

export const DEFAULT_DURATION = "60";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

export function getSessionPrice(hourlyPrice: number, factor: number): number {
  return Math.round((hourlyPrice * factor) / 50) * 50;
}
