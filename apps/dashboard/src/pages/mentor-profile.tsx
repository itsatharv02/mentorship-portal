import { useState, type ChangeEvent, type FormEvent } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { PageHeader } from "../components/page-header";
import { CURRENT_MENTOR } from "../data/mentor-panel";
import { initials } from "../lib/format";

const BIO_LIMIT = 500;

const INITIAL_PROFILE = {
  fullName: CURRENT_MENTOR.name,
  headline: `${CURRENT_MENTOR.role} at ${CURRENT_MENTOR.company}`,
  location: CURRENT_MENTOR.location,
  bio: CURRENT_MENTOR.about,
  linkedin: "https://linkedin.com/in/arjunmehta",
  twitter: "https://twitter.com/arjunmehta",
};

type Profile = typeof INITIAL_PROFILE;

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
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

export default function MentorProfilePage() {
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE);
  const [expertise, setExpertise] = useState<string[]>(
    CURRENT_MENTOR.expertise,
  );
  const [newSkill, setNewSkill] = useState("");
  const [saved, setSaved] = useState(false);

  function update(field: keyof Profile) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProfile((current) => ({ ...current, [field]: event.target.value }));
      setSaved(false);
    };
  }

  function addSkill() {
    const skill = newSkill.trim();
    if (
      !skill ||
      expertise.some((item) => item.toLowerCase() === skill.toLowerCase())
    ) {
      return;
    }
    setExpertise((current) => [...current, skill]);
    setNewSkill("");
    setSaved(false);
  }

  function removeSkill(skill: string) {
    setExpertise((current) => current.filter((item) => item !== skill));
    setSaved(false);
  }

  function handleCancel() {
    setProfile(INITIAL_PROFILE);
    setExpertise(CURRENT_MENTOR.expertise);
    setNewSkill("");
    setSaved(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Manage your public profile and showcase your expertise."
      />

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[14rem_minmax(0,1.6fr)_minmax(0,1fr)]"
      >
        <section className="h-fit rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Profile Photo</h2>
          <Avatar className="mt-4 size-32 rounded-xl after:rounded-xl">
            <AvatarImage
              src={CURRENT_MENTOR.photo}
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
            <Field id="full-name" label="Full Name">
              <Input
                id="full-name"
                value={profile.fullName}
                onChange={update("fullName")}
                className="h-10"
              />
            </Field>
            <Field id="headline" label="Headline">
              <Input
                id="headline"
                value={profile.headline}
                onChange={update("headline")}
                className="h-10"
              />
            </Field>
            <Field id="location" label="Location">
              <Input
                id="location"
                value={profile.location}
                onChange={update("location")}
                className="h-10"
              />
            </Field>
            <Field id="bio" label="Bio">
              <textarea
                id="bio"
                rows={6}
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
        </section>

        <div className="space-y-6">
          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Areas of Expertise</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {expertise.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="h-7 gap-1.5 bg-primary/10 pr-1.5 pl-3 text-sm text-primary"
                >
                  {skill}
                  <button
                    type="button"
                    aria-label={`Remove ${skill}`}
                    onClick={() => removeSkill(skill)}
                    className="rounded-full p-0.5 hover:bg-primary/20"
                  >
                    <XIcon className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                aria-label="Add expertise"
                placeholder="Add expertise"
                value={newSkill}
                onChange={(event) => setNewSkill(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
                className="h-9"
              />
              <Button
                type="button"
                variant="outline"
                className="h-9"
                onClick={addSkill}
              >
                <PlusIcon />
                Add
              </Button>
            </div>
          </section>

          <section className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold">Social Links</h2>
            <div className="mt-4 space-y-4">
              <Field id="linkedin" label="LinkedIn">
                <Input
                  id="linkedin"
                  type="url"
                  value={profile.linkedin}
                  onChange={update("linkedin")}
                  className="h-10"
                />
              </Field>
              <Field id="twitter" label="Twitter">
                <Input
                  id="twitter"
                  type="url"
                  value={profile.twitter}
                  onChange={update("twitter")}
                  className="h-10"
                />
              </Field>
            </div>
          </section>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 xl:col-span-3">
          {saved && (
            <p role="status" className="mr-auto text-sm text-green-600">
              Profile saved.
            </p>
          )}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-10"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" size="lg" className="h-10">
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
}
