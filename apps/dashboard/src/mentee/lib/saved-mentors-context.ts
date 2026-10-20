import { createContext, useContext } from "react";

type SavedMentors = {
  savedIds: string[];
  isSaved: (mentorId: string) => boolean;
  toggleSaved: (mentorId: string) => void;
};

export const SavedMentorsContext = createContext<SavedMentors | null>(null);

export function useSavedMentors(): SavedMentors {
  const context = useContext(SavedMentorsContext);

  if (!context) {
    throw new Error("useSavedMentors must be used inside SavedMentorsProvider");
  }

  return context;
}
