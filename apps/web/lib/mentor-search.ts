import { DOMAINS, mentors, type Mentor } from "./mentors";

export const PAGE_SIZE = 6;

export const EXPERIENCE_OPTIONS = [
  { value: "0-2", label: "0 - 2 years", matches: (y: number) => y <= 2 },
  {
    value: "3-5",
    label: "3 - 5 years",
    matches: (y: number) => y >= 3 && y <= 5,
  },
  {
    value: "6-10",
    label: "6 - 10 years",
    matches: (y: number) => y >= 6 && y <= 10,
  },
  { value: "10+", label: "10+ years", matches: (y: number) => y > 10 },
];

export const PRICE_OPTIONS = [
  { value: "under-500", label: "Under ₹500", matches: (p: number) => p < 500 },
  {
    value: "500-1000",
    label: "₹500 - ₹1,000",
    matches: (p: number) => p >= 500 && p < 1000,
  },
  {
    value: "1000-2000",
    label: "₹1,000 - ₹2,000",
    matches: (p: number) => p >= 1000 && p < 2000,
  },
  { value: "2000+", label: "₹2,000+", matches: (p: number) => p >= 2000 },
];

export const AVAILABILITY_OPTIONS = [
  { value: "this-week", label: "Available this week" },
  { value: "weekends", label: "Available weekends" },
];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export type MentorFilters = {
  q: string;
  domain: string[];
  exp: string[];
  price: string[];
  availability: string[];
  sort: SortValue;
  page: number;
};

type RawParams = Record<string, string | string[] | undefined>;

function toArray(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function pickKnown(
  value: string | string[] | undefined,
  options: readonly { value: string }[],
): string[] {
  const known = options.map((option) => option.value);
  return toArray(value).filter((item) => known.includes(item));
}

export function parseFilters(params: RawParams): MentorFilters {
  const sort = SORT_OPTIONS.find((o) => o.value === toArray(params.sort)[0]);
  const page = Math.floor(Number(toArray(params.page)[0]));

  return {
    q: toArray(params.q)[0]?.trim() ?? "",
    domain: toArray(params.domain).filter((d) =>
      (DOMAINS as readonly string[]).includes(d),
    ),
    exp: pickKnown(params.exp, EXPERIENCE_OPTIONS),
    price: pickKnown(params.price, PRICE_OPTIONS),
    availability: pickKnown(params.availability, AVAILABILITY_OPTIONS),
    sort: sort?.value ?? "relevance",
    page: page >= 1 ? page : 1,
  };
}

export function filterMentors(filters: MentorFilters): Mentor[] {
  const q = filters.q.toLowerCase();

  return mentors.filter((mentor) => {
    const matchesQuery =
      !q ||
      [
        mentor.name,
        mentor.role,
        mentor.company ?? "",
        mentor.domain,
        ...mentor.skills,
      ].some((text) => text.toLowerCase().includes(q));

    const matchesDomain =
      filters.domain.length === 0 || filters.domain.includes(mentor.domain);

    const matchesExperience =
      filters.exp.length === 0 ||
      EXPERIENCE_OPTIONS.some(
        (o) =>
          filters.exp.includes(o.value) && o.matches(mentor.experienceYears),
      );

    const matchesPrice =
      filters.price.length === 0 ||
      PRICE_OPTIONS.some(
        (o) => filters.price.includes(o.value) && o.matches(mentor.price),
      );

    const matchesAvailability =
      filters.availability.length === 0 ||
      filters.availability.includes(mentor.availability);

    return (
      matchesQuery &&
      matchesDomain &&
      matchesExperience &&
      matchesPrice &&
      matchesAvailability
    );
  });
}

function sortMentors(list: Mentor[], sort: SortValue): Mentor[] {
  const sorted = [...list];
  if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (sort === "rating") {
    sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  }
  return sorted;
}

export function searchMentors(filters: MentorFilters) {
  const sorted = sortMentors(filterMentors(filters), filters.sort);
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);
  const items = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return { items, total, page, pageCount };
}

export function hasActiveFilters(filters: MentorFilters): boolean {
  return (
    Boolean(filters.q) ||
    filters.domain.length > 0 ||
    filters.exp.length > 0 ||
    filters.price.length > 0 ||
    filters.availability.length > 0
  );
}

export function buildMentorsHref(filters: MentorFilters, page: number): string {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  for (const key of ["domain", "exp", "price", "availability"] as const) {
    for (const value of filters[key]) params.append(key, value);
  }
  if (filters.sort !== "relevance") params.set("sort", filters.sort);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/mentors?${query}` : "/mentors";
}
