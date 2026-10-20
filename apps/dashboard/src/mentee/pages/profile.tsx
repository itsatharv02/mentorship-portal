import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { PageHeader } from "../../shared/components/page-header";
import { Switch } from "../../shared/components/switch";
import { TagEditor } from "../components/tag-editor";
import { CURRENT_MENTEE, SESSION_MODES } from "../data/panel";
import { initials } from "../../shared/lib/format";

const BIO_LIMIT = 500;

const INITIAL_PROFILE = {
  fullName: CURRENT_MENTEE.name,
  email: CURRENT_MENTEE.email,
  location: CURRENT_MENTEE.location,
  bio: CURRENT_MENTEE.bio,
};

type Profile = typeof INITIAL_PROFILE;

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function MenteeProfilePage() {
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [interests, setInterests] = useState<string[]>(
    CURRENT_MENTEE.interests,
  );
  const [sessionMode, setSessionMode] = useState(CURRENT_MENTEE.sessionMode);
  const [notifications, setNotifications] = useState(
    CURRENT_MENTEE.emailNotifications,
  );
  const [saved, setSaved] = useState(false);

  function update(field: keyof Profile) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProfile((current) => ({ ...current, [field]: event.target.value }));
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
        title="My Profile"
        subtitle="Manage your profile information and preferences."
      />

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[14rem_minmax(0,1.4fr)_minmax(0,1fr)]"
      >
        <section className="h-fit rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Profile Photo</h2>
          <Avatar className="mt-4 size-32 rounded-xl after:rounded-xl">
            <AvatarImage
              src={CURRENT_MENTEE.photo}
              alt={`${profile.fullName}'s profile photo`}
              className="rounded-xl"
            />
            <AvatarFallback className="rounded-xl text-3xl">
              {initials(profile.fullName)}
            </AvatarFallback>
          </Avatar>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="mt-4 h-9 w-full"
          >
            Change Photo
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            JPG, PNG up to 5MB
          </p>
        </section>

        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Basic Information</h2>
          <div className="mt-4 space-y-4">
            <Field id="mentee-name" label="Full Name">
              <Input
                id="mentee-name"
                value={profile.fullName}
                onChange={update("fullName")}
                className="h-10"
              />
            </Field>
            <Field id="mentee-email" label="Email">
              <Input
                id="mentee-email"
                type="email"
                value={profile.email}
                onChange={update("email")}
                className="h-10"
              />
            </Field>
            <Field id="mentee-location" label="Location">
              <Input
                id="mentee-location"
                value={profile.location}
                onChange={update("location")}
                className="h-10"
              />
            </Field>
            <Field id="mentee-bio" label="Bio">
              <textarea
                id="mentee-bio"
                rows={5}
                maxLength={BIO_LIMIT}
                value={profile.bio}
                onChange={update("bio")}
                className="w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <p className="text-right text-xs text-muted-foreground">
                {profile.bio.length}/{BIO_LIMIT}
              </p>
            </Field>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Button type="submit" size="lg" className="h-10">
              Save Changes
            </Button>
            {saved && (
              <p role="status" className="text-sm text-green-600">
                Profile saved.
              </p>
            )}
          </div>
        </section>

        <section className="h-fit rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Preferences</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Set your preferences for a better experience.
          </p>

          <h3 className="mt-5 mb-3 text-sm font-medium">Areas of Interest</h3>
          <TagEditor
            label="Add an interest"
            tags={interests}
            onChange={(next) => {
              setInterests(next);
              setSaved(false);
            }}
          />

          <h3 className="mt-5 mb-1.5 text-sm font-medium">
            Preferred Session Mode
          </h3>
          <Select
            value={sessionMode}
            onValueChange={(next) => {
              if (next) {
                setSessionMode(next);
                setSaved(false);
              }
            }}
            items={SESSION_MODES}
          >
            <SelectTrigger
              className="h-10 w-full bg-background"
              aria-label="Preferred session mode"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SESSION_MODES.map((mode) => (
                <SelectItem key={mode.value} value={mode.value}>
                  {mode.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium">Email Notifications</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Get notified about session updates, mentor messages and platform
                announcements.
              </p>
            </div>
            <Switch
              checked={notifications}
              onChange={(next) => {
                setNotifications(next);
                setSaved(false);
              }}
              label="Email notifications"
            />
          </div>
        </section>
      </form>
    </>
  );
}
