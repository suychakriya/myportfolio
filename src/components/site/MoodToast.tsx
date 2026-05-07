import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMood } from "@/lib/mood-context";

export function MoodToast() {
  const { mood } = useMood();
  const [show, setShow] = useState(false);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (first) {
      setFirst(false);
      return;
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 2400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 pointer-events-none"
        >
          <div className="rounded-full border border-border bg-card/90 backdrop-blur-xl px-5 py-2.5 shadow-deep flex items-center gap-3 text-sm">
            <span className="h-2 w-2 rounded-full bg-sun animate-pulse" />
            <span className="font-medium">{mood === "shine" ? "Shine mode" : "Focus mode"}</span>
            <span className="text-muted-foreground text-xs">
              {mood === "shine" ? "the personal side" : "the professional side"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
