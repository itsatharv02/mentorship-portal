import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Separator } from "@repo/ui/components/separator";
import {
  AVAILABILITY_OPTIONS,
  EXPERIENCE_OPTIONS,
  PRICE_OPTIONS,
  type MentorFilters,
} from "../../lib/mentor-search";
import { DOMAINS, mentors } from "../../lib/mentors";

type Option = { value: string; label: string; count: number };

function FilterGroup({
  title,
  name,
  options,
  selected,
}: {
  title: string;
  name: string;
  options: Option[];
  selected: string[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{title}</legend>
      <div className="mt-3 space-y-2.5">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground"
          >
            <Checkbox
              name={name}
              value={option.value}
              defaultChecked={selected.includes(option.value)}
            />
            <span>{option.label}</span>
            <span className="text-muted-foreground/70">({option.count})</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function FilterSidebar({ filters }: { filters: MentorFilters }) {
  const domainOptions = DOMAINS.map((domain) => ({
    value: domain,
    label: domain,
    count: mentors.filter((m) => m.domain === domain).length,
  }));

  const experienceOptions = EXPERIENCE_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label,
    count: mentors.filter((m) => option.matches(m.experienceYears)).length,
  }));

  const priceOptions = PRICE_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label,
    count: mentors.filter((m) => option.matches(m.price)).length,
  }));

  const availabilityOptions = AVAILABILITY_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label,
    count: mentors.filter((m) => m.availability === option.value).length,
  }));

  return (
    <div className="space-y-5">
      <FilterGroup
        title="Domain"
        name="domain"
        options={domainOptions}
        selected={filters.domain}
      />
      <Separator />
      <FilterGroup
        title="Experience"
        name="exp"
        options={experienceOptions}
        selected={filters.exp}
      />
      <Separator />
      <FilterGroup
        title="Price (per session)"
        name="price"
        options={priceOptions}
        selected={filters.price}
      />
      <Separator />
      <FilterGroup
        title="Availability"
        name="availability"
        options={availabilityOptions}
        selected={filters.availability}
      />
      <Button type="submit" className="w-full">
        Apply filters
      </Button>
    </div>
  );
}
