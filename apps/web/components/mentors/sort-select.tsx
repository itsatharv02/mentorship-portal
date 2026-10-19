import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { SORT_OPTIONS, type SortValue } from "../../lib/mentor-search";

export function SortSelect({ value }: { value: SortValue }) {
  return (
    <Select name="sort" defaultValue={value} items={[...SORT_OPTIONS]}>
      <SelectTrigger className="w-44 sm:w-56">
        <span className="text-muted-foreground">Sort by:</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
