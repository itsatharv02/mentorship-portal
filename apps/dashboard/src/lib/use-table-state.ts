import { useState } from "react";

type TableStateOptions<T, F> = {
  items: T[];
  initialFilters: F;
  matches: (item: T, filters: F) => boolean;
  pageSize?: number;
};

export function useTableState<T, F extends Record<string, string>>({
  items,
  initialFilters,
  matches,
  pageSize = 8,
}: TableStateOptions<T, F>) {
  const [filters, setFilters] = useState<F>(initialFilters);
  const [page, setPage] = useState(1);

  const filtered = items.filter((item) => matches(item, filters));
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const isFiltered = Object.keys(initialFilters).some(
    (key) => filters[key] !== initialFilters[key],
  );

  function setFilter(key: keyof F, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  function clearFilters() {
    setFilters(initialFilters);
    setPage(1);
  }

  return {
    filters,
    setFilter,
    clearFilters,
    isFiltered,
    page: currentPage,
    setPage,
    pageCount,
    pageItems,
    total: filtered.length,
  };
}
