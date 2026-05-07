import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

const skills = [
  "TypeScript",
  "React",
  "Vue",
  "Next.js",
  "Node.js",
  "Tailwind",
  "Vite",
  "Vitest",
  "Playwright",
  "GCP",
  "Firebase",
  "Supabase",
  "Docker",
  "i18n",
  "SSR",
  "Storybook",
  "Remotion",
  "NestJS",
  "REST",
  "Sentry",
  "Figma",
  "GitHub",
  "Cloudflare",
  "Jest",
];

const points = skills.map((s, i) => {
  const y = 1 - (i / (skills.length - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const phi = i * Math.PI * (3 - Math.sqrt(5));
  const x = Math.cos(phi) * r;
  const z = Math.sin(phi) * r;
  return { s, x, y, z };
});

export function SkillOrbStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotY = useMotionValue(0);
  const rotX = useMotionValue(-10);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [, force] = useState(0);

  useAnimationFrame((_, delta) => {
    if (!dragging.current) {
      rotY.set(rotY.get() + (delta / 1000) * 12);
    }
    force((n) => (n + 1) % 1000000);
  });

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    rotY.set(rotY.get() + dx * 0.4);
    rotX.set(Math.max(-60, Math.min(60, rotX.get() + dy * 0.3)));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const ry = (rotY.get() * Math.PI) / 180;
  const rx = (rotX.get() * Math.PI) / 180;
  const cosY = Math.cos(ry),
    sinY = Math.sin(ry);
  const cosX = Math.cos(rx),
    sinX = Math.sin(rx);

  const projected = points.map((p) => {
    const x = p.x * cosY + p.z * sinY;
    let z = -p.x * sinY + p.z * cosY;
    const y = p.y * cosX - z * sinX;
    z = p.y * sinX + z * cosX;
    const depth = (z + 1) / 2;
    return { s: p.s, x, y, depth };
  });

  return (
    <>
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative mx-auto aspect-square w-full max-w-170 cursor-grab active:cursor-grabbing touch-none"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[92%] h-[50%] rounded-[50%] border border-sun/15 rotate-[-8deg]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80%] h-[42%] rounded-[50%] border border-sun/10 rotate-6" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36%] aspect-square pointer-events-none"
        >
          <div className="absolute inset-[-30%] rounded-full bg-white/8 blur-3xl animate-pulse-sun" />
          <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--sun)_70%,white)_0%,color-mix(in_oklab,var(--sun-deep)_80%,var(--navy-deep))_55%,var(--navy-deep)_100%)] shadow-[0_0_120px_-10px_color-mix(in_oklab,var(--sun)_60%,transparent)]">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute inset-y-0 left-1/2 border-x border-sun/30 rounded-[50%]"
                style={{
                  width: `${(i + 1) * 18}%`,
                  transform: `translateX(-50%) scaleX(${1 - i * 0.05})`,
                }}
              />
            ))}
            <div className="absolute top-[10%] left-[18%] w-[35%] h-[20%] rounded-full bg-white/30 blur-xl" />
          </div>
        </motion.div>

        {projected.map(({ s, x, y, depth }) => {
          const radiusPct = 46;
          const left = 50 + x * radiusPct;
          const top = 50 + y * radiusPct;
          const scale = 0.7 + depth * 0.6;
          const opacity = 0.25 + depth * 0.75;
          return (
            <span
              key={s}
              className="absolute -translate-x-1/2 -translate-y-1/2 font-display whitespace-nowrap select-none pointer-events-none"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                fontSize: `${scale}rem`,
                opacity,
                zIndex: Math.round(depth * 100),
                color: "white",
                textShadow: "0 0 10px rgba(160, 80, 255, 0.9), 0 0 30px rgba(130, 60, 220, 0.5)",
              }}
            >
              {s}
            </span>
          );
        })}
      </div>
      <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] text-cream/40">
        Click &amp; drag
      </p>
    </>
  );
}

export function SkillOrb() {
  return (
    <section className="relative px-6 lg:px-10 py-32 overflow-hidden bg-navy-deep text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--sun)_18%,transparent)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-sun mb-4">Toolkit</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">
            A constellation of <em className="font-light italic text-sun">craft</em>.
          </h2>
          <p className="mt-5 text-cream/60 max-w-xl mx-auto">
            Drag to spin the orb — every skill in orbit.
          </p>
        </div>
        <SkillOrbStage />
      </div>
    </section>
  );
}
