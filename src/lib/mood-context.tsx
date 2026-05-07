import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export type Mood = "focus" | "shine";

interface MoodContextValue {
  mood: Mood;
  toggle: () => void;
  setMood: (m: Mood) => void;
}

const MoodContext = createContext<MoodContextValue | null>(null);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMoodState] = useState<Mood>(() =>
    typeof window !== "undefined" && window.location.pathname.startsWith("/novels")
      ? "shine"
      : "focus",
  );

  useEffect(() => {
    document.documentElement.dataset.mood = mood;
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
