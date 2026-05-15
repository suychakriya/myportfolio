import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useMood } from "@/lib/mood-context";

const skills = {
  Frontend: [
    "TypeScript",
    "React",
    "Vue.js",
    "Next.js",
    "Vite",
    "Tailwind CSS",
    "i18n",
    "SSR / SSG",
  ],
  Backend: ["Node.js", "Express", "NestJS", "Firebase Functions", "REST APIs"],
  "Infra & DevOps": ["GCP", "Firebase", "Docker", "GitHub Actions", "Supabase", "Cloudflare"],
  "Testing & Quality": ["Vitest", "Jest", "React Testing Library", "Playwright", "Sentry"],
  "Tools & AI": ["Figma", "Storybook", "Remotion", "Cursor", "Claude Code", "FLUX", "ElevenLabs"],
};

const principles = [
  {
    n: "01",
    t: "Ship the boring decision",
    d: "Bold ideas need a calm foundation. I default to the simplest thing that scales until evidence says otherwise.",
  },
  {
    n: "02",
    t: "Performance is a feature",
    d: "Lazy load, code split, measure. Users feel ms long before they notice the design.",
  },
  {
    n: "03",
    t: "Tests are kindness to future me",
    d: "Vitest + Playwright keep the surprises out of Friday afternoons.",
  },
  {
    n: "04",
    t: "Translate, don't gatekeep",
    d: "I bridge engineering ↔ design ↔ stakeholders. Specs in plain language, demos that anyone can follow.",
  },
];

export function AboutPage() {
  const { mood, toggle } = useMood();
  const navigate = useNavigate();

  const goToWork = () => {
    if (mood === "shine") toggle();
    navigate("/work");
  };

  return (
    <>
      <section className="relative px-6 lg:px-10 pt-24 pb-20">
        <div className="absolute -top-20 right-10 h-80 w-80 rounded-full bg-sun-radial opacity-25 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About"
            title={
              <>
                A software engineer who treats the <span className="italic font-light">edges</span>{" "}
                like they matter.
              </>
            }
            description="I write production code in Tokyo, mostly in TypeScript. I came from Cambodia, studied software engineering on a full scholarship, and have been shipping web products since 2022."
          />
        </div>
      </section>

      {/* Bio */}
      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm <strong className="text-foreground">Chakriya Suy</strong>. I currently work as a
              Frontend Engineer at <strong className="text-foreground">Equmenopolis</strong>, a
              Waseda University AI startup recognized in{" "}
              <em>Forbes Japan's Top 100 Startups 2026</em>, building conversational AI agents for
              education and the workplace.
            </p>
            <p>
              Before Tokyo, I led frontend on a hotel booking platform with Mapbox GL, delivered an
              i18n restaurant site for a Cambodian client, and built a real-time WebRTC + Live2D
              avatar app with a Japanese team — leading three engineers through scope, sprints, and
              delivery.
            </p>
            <p>
              I publish things into the world too: an{" "}
              <a
                href="https://www.npmjs.com/package/device-share"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-sun decoration-2 underline-offset-4 text-foreground hover:text-sun-deep"
              >
                an npm package adopted by my team that eliminated PR-preview deploys for mobile
                testing
              </a>
              , an end-to-end AI video pipeline, an anonymous confession platform that
              auto-publishes, and an automated Facebook content system. I like solving the same
              problem twice — once by hand, then forever by code.
            </p>
            <p className="text-foreground italic font-display text-2xl leading-snug pt-4 border-l-2 border-sun pl-6">
              "Different teams, Different Challenges - one consistent thing: shipping."
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-7">
              <div className="text-xs uppercase tracking-widest text-sun-deep font-semibold mb-4">
                Quick facts
              </div>
              <dl className="space-y-3 text-sm">
                {[
                  ["Based in", "Tokyo, Japan"],
                  ["From", "Cambodia"],
                  ["Currently", "Frontend @ Equmenopolis"],
                  ["Languages", "Khmer (native), English (fluent), Japanese (studying)"],
                  ["Education", "B.S. Software Engineering, KIT — full scholarship"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-6 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl bg-primary text-primary-foreground p-7">
              <div className="text-xs uppercase tracking-widest text-sun font-semibold mb-4">
                Achievements
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-sun">★</span> ASEAN Regional 1st Runner-Up · Data Science
                  Explorer 2021
                </li>
                <li className="flex gap-3">
                  <span className="text-sun">★</span> National Winner · ASEAN Data Science Explorer
                  2021
                </li>
                <li className="flex gap-3">
                  <span className="text-sun">★</span> Full scholarship · Kirirom Institute of
                  Technology
                </li>
                <li className="flex gap-3">
                  <span className="text-sun">★</span> 2nd Place · CSAJ Essay Contest 2018
                </li>
                <li className="flex gap-3">
                  <span className="text-sun">★</span> Grade A · Cambodia Baccalaureate II Exam 2016
                </li>
                <li className="flex gap-3">
                  <span className="text-sun">★</span> Special Award · 1st K-film Video Contest 2015
                </li>
                <li className="flex gap-3">
                  <span className="text-sun">★</span> 3rd Place · Red Cross Photo Contest · World
                  Disability Day 2015
                </li>
                <li className="flex gap-3">
                  <span className="text-sun">★</span> 4th Place · Provincial Outstanding Student ·
                  Mathematics 2015
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 lg:px-10 py-24 bg-secondary/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How I work"
            title={
              <>
                Four principles I keep <em className="font-light italic">coming back to</em>.
              </>
            }
          />
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-card border border-border p-8 hover:border-sun/60 transition-colors"
              >
                <div className="font-display text-sun-deep text-2xl">{p.n}</div>
                <h3 className="mt-2 font-display text-2xl">{p.t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills — recruiter-scannable */}
      <section className="px-6 lg:px-10 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Toolkit"
            title="The stack, honestly."
            description="Built for a 10-second scan. Daily drivers up top, full list below."
          />

          {/* Daily drivers — the headline */}
          <div className="mt-14">
            <div className="text-xs uppercase tracking-widest text-sun-deep font-semibold mb-5">
              Daily drivers
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Tailwind CSS",
                "Vite",
                "Vitest",
                "GCP / Firebase",
              ].map((s) => (
                <span
                  key={s}
                  className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-base font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Categorised — clean table-style rows */}
          <div className="mt-14 rounded-2xl border border-border bg-card overflow-hidden">
            {Object.entries(skills).map(([cat, items], i) => (
              <div
                key={cat}
                className={`grid md:grid-cols-[220px_1fr] gap-4 md:gap-8 p-6 md:p-7 ${i !== 0 ? "border-t border-border" : ""}`}
              >
                <div className="font-display text-lg text-foreground md:pt-1">{cat}</div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-muted-foreground">
                  {items.map((s, idx) => (
                    <span key={s} className="inline-flex items-center gap-5">
                      <span className="text-foreground/90 font-medium">{s}</span>
                      {idx < items.length - 1 && <span className="text-border">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-primary text-primary-foreground p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sun-radial opacity-30 blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl">Want the long version?</h3>
              <p className="mt-3 text-primary-foreground/70">
                See the work, the timeline, or send me a message.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={goToWork}
                className="rounded-full bg-sun text-navy-deep px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Experience <ArrowUpRight size={16} />
              </button>
              <Link
                to="/contact"
                className="rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium hover:border-sun hover:text-sun transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
