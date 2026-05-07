import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMood } from "@/lib/mood-context";

export function MoodFAB() {
  const { mood, toggle } = useMood();
  const navigate = useNavigate();
  const isShine = mood === "shine";

  const handleClick = () => {
    toggle();
    navigate("/");
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={isShine ? "Back to the work side" : "Explore the personal side"}
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-8 right-6 z-50 group flex items-center gap-2.5 rounded-full w-52 justify-center px-5 py-3 text-sm font-medium transition-colors"
      style={
        isShine
          ? { background: "oklch(0.18 0.05 254)", color: "oklch(0.97 0.015 85)" }
          : { background: "oklch(0.82 0.14 80)", color: "oklch(0.18 0.05 254)" }
      }
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={mood}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          {isShine ? (
            <Briefcase size={14} />
          ) : (
            <Sparkles
              size={14}
              className="transition-transform group-hover:rotate-12 group-hover:scale-110"
            />
          )}
          <span>{isShine ? "The work side" : "The personal side"}</span>
          <span aria-hidden className="opacity-60 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
