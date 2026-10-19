const companies = ["Google", "Microsoft", "Amazon", "Meta", "Spotify", "Adobe"];

export function TrustedBy() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-center text-sm text-muted-foreground">
          Trusted by learners from top companies
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {companies.map((name) => (
            <li
              key={name}
              className="text-xl font-semibold text-muted-foreground/70"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
