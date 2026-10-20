import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";

export function TagEditor({
  label,
  tags,
  onChange,
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const tag = draft.trim();
    if (!tag || tags.some((item) => item.toLowerCase() === tag.toLowerCase())) {
      return;
    }
    onChange([...tags, tag]);
    setDraft("");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="h-7 gap-1.5 bg-primary/10 pr-1.5 pl-3 text-sm text-primary"
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() => onChange(tags.filter((item) => item !== tag))}
              className="rounded-full p-0.5 hover:bg-primary/20"
            >
              <XIcon className="size-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <Input
          aria-label={label}
          placeholder={label}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
          }}
          className="h-9"
        />
        <Button
          type="button"
          variant="outline"
          className="h-9"
          onClick={addTag}
        >
          <PlusIcon />
          Add
        </Button>
      </div>
    </div>
  );
}
