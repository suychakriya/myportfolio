import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DualitySun } from "@/components/site/DualitySun";
import { SkillOrbStage } from "@/components/home/SkillOrb";
import { FocusHome } from "@/components/home/FocusHome";
import { ShineHome } from "@/components/home/ShineHome";
import { useMood } from "@/lib/mood-context";

function FocusHero() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="hidden lg:block absolute overflow-visible left-auto -right-9 top-1/2 -translate-y-1/2"
    >
      <div className="lg:w-140">
        <SkillOrbStage />
      </div>
    </motion.div>
  );
}

function ShineHero() {
  const { mood } = useMood();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="lg:col-span-5"
    >
      <DualitySun />
      <div className="mt-2 text-center">
        <Link
          to="/novels"
          className="block w-full text-xs underline-offset-4 hover:underline transition-opacity opacity-100 text-sun-deep cursor-pointer py-1"
        >
          → or jump straight to the novels
        </Link>
      </div>
    </motion.div>
  );
}

export function HomePage() {
  const { mood } = useMood();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mood}
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(8px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {mood === "focus" ? <FocusHome hero={<FocusHero />} /> : <ShineHome hero={<ShineHero />} />}
      </motion.div>
    </AnimatePresence>
  );
}
