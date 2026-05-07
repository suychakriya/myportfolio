import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export type Mood = "focus" | "shine";

interface MoodContextValue {
  mood: Mood;
  toggle: () => void;
  setMood: (m: Mood) => void;
}

const MoodContext = createContext<MoodContextValue | null>(null);

const STORAGE_KEY = "chakriya:mood";

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMoodState] = useState<Mood>("focus");

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "focus" || stored === "shine") setMoodState(stored);
    } catch {
      // ignore
    }
  }, []);

  // Mirror to <html data-mood> + persist
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.mood = mood;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, mood);
    } catch {
      // ignore
    }
  }, [mood]);

  const setMood = useCallback((m: Mood) => setMoodState(m), []);
  const toggle = useCallback(() => setMoodState((m) => (m === "focus" ? "shine" : "focus")), []);

  return <MoodContext.Provider value={{ mood, toggle, setMood }}>{children}</MoodContext.Provider>;
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMood must be used within MoodProvider");
  return ctx;
}
