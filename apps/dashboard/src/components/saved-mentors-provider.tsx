import { useState, type ReactNode } from "react";
import { SavedMentorsContext } from "../lib/saved-mentors-context";

const INITIAL_SAVED = [
  "arjun-mehta",
  "priya-sharma",
  "sneha-iyer",
  "rahul-desai",
  "neha-kapoor",
  "vikram-rao",
  "rohit-gupta",
  "divya-menon",
];

export function SavedMentorsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(INITIAL_SAVED);

  function toggleSaved(mentorId: string) {
    setSavedIds((current) =>
      current.includes(mentorId)
        ? current.filter((id) => id !== mentorId)
        : [...current, mentorId],
    );
  }

  return (
    <SavedMentorsContext.Provider
      value={{
        savedIds,
        isSaved: (mentorId) => savedIds.includes(mentorId),
        toggleSaved,
      }}
    >
      {children}
    </SavedMentorsContext.Provider>
  );
}
