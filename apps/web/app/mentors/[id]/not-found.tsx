import Link from "next/link";

export default function MentorNotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Mentor not found</h1>
      <p className="mt-2 text-muted-foreground">
        This mentor doesn&apos;t exist or is no longer available.
      </p>
      <Link
        href="/mentors"
        className="mt-6 inline-block text-primary hover:underline"
      >
        Back to mentors
      </Link>
    </main>
  );
}
