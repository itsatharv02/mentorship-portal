"use client";

import { useId, useState, type ComponentProps } from "react";
import { EyeIcon, EyeOffIcon, type LucideIcon } from "lucide-react";
import { Input } from "@repo/ui/components/input";

type AuthFieldProps = Omit<ComponentProps<"input">, "id" | "className"> & {
  label: string;
  showLabel?: boolean;
  icon?: LucideIcon;
  error?: string | null;
};

export function AuthField({
  label,
  showLabel = false,
  icon: Icon,
  error,
  type = "text",
  ...props
}: AuthFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label
        htmlFor={id}
        className={showLabel ? "mb-1.5 block text-sm font-medium" : "sr-only"}
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <Input
          id={id}
          type={isPassword && visible ? "text" : type}
          placeholder={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-11 ${Icon ? "pl-10" : ""} ${isPassword ? "pr-11" : ""}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {visible ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
