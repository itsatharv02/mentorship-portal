const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_MIN_LENGTH = 8;

export function validateEmail(value: string): string | null {
  const email = value.trim();

  if (!email) return "Email is required.";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
  return null;
}

export function validatePassword(
  value: string,
  mode: "login" | "signup",
): string | null {
  if (!value) return "Password is required.";

  if (mode === "signup") {
    if (value.length < PASSWORD_MIN_LENGTH) {
      return `Use at least ${PASSWORD_MIN_LENGTH} characters.`;
    }
    if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
      return "Include at least one letter and one number.";
    }
  }

  return null;
}

export function validateConfirmPassword(
  password: string,
  confirm: string,
): string | null {
  if (!confirm) return "Confirm your password.";
  if (confirm !== password) return "Passwords do not match.";
  return null;
}

export function validateName(value: string, label: string): string | null {
  const name = value.trim();

  if (!name) return `${label} is required.`;
  if (name.length < 2) return `${label} must be at least 2 characters.`;
  return null;
}

export function hasErrors(errors: Record<string, string | null>): boolean {
  return Object.values(errors).some(Boolean);
}
