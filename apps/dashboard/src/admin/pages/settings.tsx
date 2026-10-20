import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { PageHeader } from "../../shared/components/page-header";
import { TabsNav } from "../../shared/components/tabs-nav";

type SettingsTab = "general" | "payment" | "email" | "platform" | "security";

const TABS: { value: SettingsTab; label: string }[] = [
  { value: "general", label: "General" },
  { value: "payment", label: "Payment" },
  { value: "email", label: "Email" },
  { value: "platform", label: "Platform" },
  { value: "security", label: "Security" },
];

const INITIAL_VALUES = {
  name: "Mentora",
  description:
    "Connecting learners with experienced professionals for real-world guidance and growth.",
  supportEmail: "support@mentora.com",
};

type Values = typeof INITIAL_VALUES;

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("general");
  const [values, setValues] = useState<Values>(INITIAL_VALUES);
  const [saved, setSaved] = useState(false);

  function update(field: keyof Values) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setSaved(false);
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage platform settings and preferences"
      />

      <TabsNav
        label="Settings sections"
        tabs={TABS}
        value={tab}
        onChange={setTab}
      />

      {tab !== "general" ? (
        <p className="mt-6 rounded-xl border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
          {TABS.find((item) => item.value === tab)?.label} settings are coming
          soon.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border bg-card p-5"
          >
            <h2 className="font-semibold">Platform Information</h2>

            <div className="mt-4 space-y-4">
              <div className="grid gap-1.5">
                <label htmlFor="platform-name" className="text-sm font-medium">
                  Platform Name
                </label>
                <Input
                  id="platform-name"
                  value={values.name}
                  onChange={update("name")}
                  className="h-10"
                />
              </div>

              <div className="grid gap-1.5">
                <label
                  htmlFor="platform-description"
                  className="text-sm font-medium"
                >
                  Platform Description
                </label>
                <textarea
                  id="platform-description"
                  rows={3}
                  value={values.description}
                  onChange={update("description")}
                  className="w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="support-email" className="text-sm font-medium">
                  Support Email
                </label>
                <Input
                  id="support-email"
                  type="email"
                  value={values.supportEmail}
                  onChange={update("supportEmail")}
                  className="h-10"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Button type="submit" size="lg" className="h-10">
                Save Changes
              </Button>
              {saved && (
                <p role="status" className="text-sm text-green-600">
                  Changes saved.
                </p>
              )}
            </div>
          </form>

          <section className="h-fit rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Logo</h2>
            <p className="mt-3 text-sm text-muted-foreground">Current Logo</p>
            <div className="mt-2 flex h-24 items-center justify-center rounded-lg bg-primary/5 text-2xl font-bold text-primary">
              {values.name || "Mentora"}
            </div>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="mt-4 h-10 w-full"
            >
              Change Logo
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">
              Recommended: 200x50px, PNG or SVG
            </p>
          </section>
        </div>
      )}
    </>
  );
}
