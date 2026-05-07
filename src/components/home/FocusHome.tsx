import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const featured = [
  {
    name: "device-share",
    tag: "npm · 210+ weekly downloads",
    blurb: "A CLI that exposes localhost via QR code — kills the PR-preview-deploy-test loop.",
    href: "https://www.npmjs.com/package/device-share",
  },
  {
    name: "Untold Lores",
    tag: "AI Video Pipeline",
    blurb: "End-to-end automation: Claude → FLUX → ElevenLabs → Remotion. From idea to YouTube.",
    href: "/projects",
  },
  {
    name: "Files Confession",
    tag: "Next.js · Supabase",
    blurb: "Anonymous platform automating what used to be a daily manual chore for admins.",
    href: "/projects",
  },
];

interface Props {
  hero: React.ReactNode;
}

export function FocusHome({ hero }: Props) {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-secondary/40">
        {/* Atmospheric layered gradient */}
        <div
          aria-hidden
          className="hidden lg:block absolute inset-0 pointer-events-none"
          style={{
            background: [
              // Far-right vignette — deepest navy
              "radial-gradient(ellipse 55% 100% at 100% 50%, var(--navy-deep) 0%, transparent 100%)",
              // Cinematic navy bloom around orb area
              "radial-gradient(ellipse 42% 85% at 80% 52%, color-mix(in oklab, var(--navy-deep) 72%, oklch(0.26 0.12 265)) 0%, transparent 100%)",
              // Cool blue haze — transition zone
              "radial-gradient(ellipse 32% 60% at 60% 44%, oklch(0.28 0.10 268 / 0.65) 0%, transparent 100%)",
              // Horizontal base sweep
              "linear-gradient(to right, transparent 22%, color-mix(in oklab, var(--navy-deep) 6%, transparent) 40%, color-mix(in oklab, var(--navy-deep) 32%, transparent) 57%, color-mix(in oklab, var(--navy-deep) 68%, transparent) 75%, var(--navy-deep) 96%)",
            ].join(", "),
          }}
        />
        {/* Soft blurred bloom in mist zone */}
        <div
          aria-hidden
          className="hidden lg:block absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 28% 50% at 58% 44%, oklch(0.34 0.13 270 / 0.22) 0%, transparent 100%)",
            filter: "blur(72px)",
          }}
        />
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-sun-radial opacity-30 blur-3xl animate-float-slow pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-32 lg:pt-32 lg:pb-40 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur px-4 py-1.5 text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-sun animate-ping opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-sun" />
              </span>
              <span className="text-muted-foreground">Tokyo, Japan</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight text-balance"
            >
              Engineer that
              <br />
              <span className="italic font-light text-gradient-focus">feels</span>{" "}
              <span className="text-gradient-sun">considered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed"
            >
              I'm <strong className="text-foreground font-semibold">Chakriya Suy</strong> — a
              software engineer with 4+ years shipping production web apps in{" "}
              <span className="text-foreground">React</span>,{" "}
              <span className="text-foreground">TypeScript</span>, and{" "}
              <span className="text-foreground">Vue</span>. Thoughtful interfaces, reliable systems,
              and a strong bias toward shipping.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:bg-primary/90 transition-all shadow-deep"
              >
                See selected projects
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur px-7 py-3.5 text-sm font-medium hover:border-foreground/40 transition-colors"
              >
                Get in touch
                <Mail size={14} className="opacity-60" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-14 grid grid-cols-3 gap-6 max-w-md"
            >
              {[
                { k: "4+", v: "Years shipping" },
                { k: "10+", v: "Production projects" },
                { k: "210+", v: "Published npm downloads" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl">{s.k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {hero}
        </div>

        {/* Scroll to explore */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 right-1/4 flex flex-col items-center gap-2 text-white"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* INTRO */}
      {/* <section className="relative py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The duality"
            title={
              <>
                Like sunshine when we talk.
                <br />
                <span className="italic font-light text-muted-foreground">
                  Like gravity when I work.
                </span>
              </>
            }
            description="Two modes, one engineer. Friendly and warm in collaboration — direct, decisive, and quietly intense in execution. The interfaces I build aim for the same balance."
          />

          <div className="mt-20 grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl bg-card border border-border p-10 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-sun-radial opacity-50 blur-2xl group-hover:opacity-80 transition-opacity" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-sun-deep font-semibold">
                  Sunshine mode
                </div>
                <h3 className="mt-3 font-display text-3xl">Warm. Curious. Playful.</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  In a stand-up I'm probably the one cracking a small joke before diving into the
                  API contract. I write specs that are easy to read, ask the questions everyone was
                  thinking, and bring people along.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="group relative rounded-3xl bg-primary text-primary-foreground p-10 overflow-hidden"
            >
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-navy/40 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-sun font-semibold">
                  Focus mode
                </div>
                <h3 className="mt-3 font-display text-3xl">Serious. Decisive. Sharp.</h3>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  When the keyboard hits the desk, the room gets quieter. I make the call, ship the
                  change, write the test, and don't romanticize the problem. Output over noise.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* FEATURED WORK */}
      <section className="relative py-32 px-6 lg:px-10 bg-secondary/40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  Things I've shipped <em className="font-light italic">recently</em>.
                </>
              }
            />
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium hover:text-sun-deep transition-colors"
            >
              All projects
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08 }}
                className="group relative rounded-2xl bg-card border border-border p-8 hover:border-sun/60 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-12">
                  <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground group-hover:text-sun-deep group-hover:rotate-12 transition-all"
                  />
                </div>
                <h3 className="font-display text-2xl">{p.name}</h3>
                <div className="mt-1 text-xs uppercase tracking-wider text-sun-deep">{p.tag}</div>
                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{p.blurb}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 lg:px-10 bg-secondary/40">
        <div className="mx-auto max-w-5xl text-center relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-100 w-100 rounded-full bg-sun-radial opacity-30 blur-3xl animate-pulse-sun" />
          </div>
          <SectionHeading
            align="center"
            eyebrow="Let's build"
            title={
              <>
                Got a problem worth <span className="text-gradient-sun">solving</span>?
              </>
            }
            description="I'm based in Tokyo and open to roles, and interesting collaborations."
          />
          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-sm font-medium hover:opacity-90 transition-opacity shadow-sun"
            >
              Start a conversation
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
