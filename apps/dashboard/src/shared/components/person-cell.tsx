import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { initials } from "../lib/format";

export function PersonCell({ name, photo }: { name: string; photo?: string }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        {photo && <AvatarImage src={photo} alt="" />}
        <AvatarFallback className="text-xs">{initials(name)}</AvatarFallback>
      </Avatar>
      <span className="font-medium">{name}</span>
    </div>
  );
}
