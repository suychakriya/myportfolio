import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMood } from "@/lib/mood-context";

export function DualitySun() {
  const { mood, toggle } = useMood();
  const serious = mood === "focus";
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, x)));
      my.set(Math.max(-1, Math.min(1, y)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div ref={ref} className="relative w-full aspect-square max-w-130 mx-auto select-none">
      {/* Outer aura */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
        animate={{
          background: serious
            ? "radial-gradient(circle, oklch(0.28 0.07 256 / 0.7), transparent 70%)"
            : "radial-gradient(circle, oklch(0.71 0.14 66 / 0.7), transparent 70%)",
          scale: serious ? 1 : 1.15,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Rings */}
      <motion.div
        aria-hidden
        className="absolute inset-6 rounded-full border pointer-events-none"
        animate={{
          borderColor: serious ? "oklch(0.18 0.05 254 / 0.2)" : "oklch(0.71 0.14 66 / 0.2)",
          rotate: 360,
        }}
        transition={{ rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-16 rounded-full border-2 border-dashed pointer-events-none"
        animate={{
          borderColor: serious ? "oklch(0.18 0.05 254 / 0.25)" : "oklch(0.71 0.14 66 / 0.45)",
          rotate: -360,
        }}
        transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}
      />

      {/* The Orb */}
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={`Switch to ${serious ? "shine" : "focus"} mode`}
        className="absolute inset-[18%] rounded-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-sun/50"
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.03 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: serious
              ? "radial-gradient(circle at 30% 30%, oklch(0.35 0.07 256), oklch(0.12 0.04 254) 70%)"
              : "radial-gradient(circle at 30% 30%, oklch(0.92 0.10 82), oklch(0.62 0.16 52) 80%)",
            boxShadow: serious
              ? "0 30px 80px -20px oklch(0.18 0.05 254 / 0.8), inset -10px -20px 40px oklch(0 0 0 / 0.5), inset 10px 20px 40px oklch(0.4 0.07 256 / 0.4)"
              : "0 30px 80px -10px oklch(0.71 0.14 66 / 0.6), inset -10px -20px 40px oklch(0.45 0.14 50 / 0.5), inset 10px 20px 40px oklch(0.96 0.08 82 / 0.6)",
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        {/* Specular highlight */}
        <motion.div
          aria-hidden
          className="absolute top-[12%] left-[18%] h-[28%] w-[28%] rounded-full blur-2xl"
          animate={{
            background: serious ? "oklch(0.6 0.05 256 / 0.5)" : "oklch(1 0.02 85 / 0.85)",
          }}
        />
        {/* Tiny mood label */}
        <motion.span
          className="absolute inset-0 grid place-items-center font-display text-sm tracking-[0.4em]"
          animate={{
            color: serious ? "oklch(0.82 0.14 80)" : "oklch(0.22 0.05 52)",
          }}
          transition={{ duration: 0.8 }}
          key={serious ? "focus" : "shine"}
        >
          {serious ? "FOCUS" : "SHINE"}
        </motion.span>
      </motion.button>

      {/* Floating dot — only in shine mode */}
      <motion.div
        aria-hidden
        className="absolute h-3 w-3 rounded-full bg-sun pointer-events-none"
        style={{
          top: "10%",
          left: "70%",
          x: useTransform(mx, [-1, 1], [-30, 30]),
          y: useTransform(my, [-1, 1], [-30, 30]),
        }}
        animate={{ scale: serious ? 0 : 1 }}
      />

      {/* Hint pulse around the orb to invite the click */}
      <motion.div
        aria-hidden
        className="absolute inset-[18%] rounded-full pointer-events-none"
        animate={{
          boxShadow: serious
            ? ["0 0 0 0 oklch(0.82 0.14 80 / 0.4)", "0 0 0 22px oklch(0.82 0.14 80 / 0)"]
            : ["0 0 0 0 oklch(0.71 0.14 66 / 0.4)", "0 0 0 22px oklch(0.71 0.14 66 / 0)"],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />
    </div>
  );
}
