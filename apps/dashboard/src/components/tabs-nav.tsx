export function TabsNav<T extends string>({
  tabs,
  value,
  onChange,
  label,
}: {
  tabs: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex gap-6 overflow-x-auto shadow-[inset_0_-1px_0_var(--border)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <li key={tab.value}>
            <button
              type="button"
              aria-current={value === tab.value ? "page" : undefined}
              onClick={() => onChange(tab.value)}
              className={`block border-b-2 px-1 py-3 text-sm whitespace-nowrap transition-colors ${
                value === tab.value
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
