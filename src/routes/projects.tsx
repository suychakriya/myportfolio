import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const projects = [
  {
    n: "01",
    name: "device-share",
    tag: "Open source · npm package",
    problem:
      "Testing on devices other than my laptop required opening a PR just to get a preview link — every small change meant pushing code and waiting minutes for CI/CD.",
    bullets: [
      "Built and published an open-source CLI (`npx device-share`) that exposes localhost via QR code instantly — no PR preview deploys for mobile testing.",
      "Supports local network and Cloudflare tunnel modes with built-in password protection, rate limiting, and auto-expiry.",
      "Built for a real problem, adopted by the team. Eliminated PR-preview-deploy cycles for mobile testing entirely.",
    ],
    stack: ["TypeScript", "Node.js CLI", "Cloudflare Tunnel"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/device-share" },
      { label: "GitHub", href: "https://github.com/suychakriya" },
    ],
  },
  {
    n: "02",
    name: "Untold Lores",
    tag: "Automated AI Video Pipeline · Bilingual · Daily publishing",
    problem:
      "I wanted to turn story ideas into published video content daily — across Facebook and YouTube, in both English and Khmer — without touching it manually after setup.",
    bullets: [
      "End-to-end TypeScript pipeline: Claude API generates bilingual 4-part stories (English + Khmer), Kaggle/Colab FLUX generates scene images, F5-TTS + edge-tts narrate in both languages, Remotion renders YouTube (1920×1080), Facebook (1080×1350), Shorts (1080×1920), and thumbnail — all locally.",
      "Modular command architecture (story → translate → images → audio → render → upload → post) with Supabase tracking per-step status and Google Drive bridging local render to cloud. Partial reruns and reliable failure recovery built in.",
      "GitHub Actions cron (9am UTC / 4pm Cambodia) downloads videos from Drive, posts to Facebook (English + Khmer captions) and YouTube with auto-generated titles, descriptions, and tags across 4 active themes: Horror & Thriller, Real Unexplained Events, Ghost Stories, Dark Fantasy.",
    ],
    stack: [
      "TypeScript",
      "Claude API",
      "FLUX",
      "F5-TTS",
      "Remotion",
      "Supabase",
      "Google Drive",
      "GitHub Actions",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/suychakriya" },
      { label: "YouTube", href: "https://www.youtube.com/@untoldlores000" },
      { label: "Facebook", href: "https://www.facebook.com/untoldlores" },
    ],
  },
  {
    n: "03",
    name: "Files Confession",
    tag: "Anonymous Platform · Live in production",
    problem:
      "Confession-page admins were burning daily hours manually reviewing and posting submissions.",
    bullets: [
      "Full-stack platform on Next.js 14 + Supabase — anonymous submissions (no login), 1-per-IP-per-5-min rate limiting, profanity filter, numbered post tracking.",
      "Automated Facebook posting twice daily (11am / 7pm Cambodia time) via GitHub Actions; monthly archive workflow exports to CSV → Supabase Storage → cleans DB.",
      "ESLint + Prettier + Husky pre-commit hooks. Live with 30+ confessions auto-processed and published.",
    ],
    stack: ["Next.js 14", "TypeScript", "Supabase", "GitHub Actions"],
    links: [
      { label: "Website", href: "https://files-confession-facebook-automatio.vercel.app" },
      { label: "Facebook", href: "https://www.facebook.com/filesconfession000" },
      { label: "GitHub", href: "https://github.com/suychakriya" },
    ],
  },
  {
    n: "04",
    name: "AI Facebook Content Automation",
    tag: "Fully autonomous publishing",
    problem:
      "I wanted to maintain a Facebook page consistently, but daily content creation was eating into main work.",
    bullets: [
      "Fully automated TypeScript system: Claude generates 4-part moral dilemma series, FLUX.1-schnell creates cinematic images (HuggingFace primary, Cloudflare Workers AI fallback), and posts to Facebook on schedule.",
      "GitHub Actions scheduling pipeline (daily 9pm Cambodia time) with queue state persisted in the repo — no external DB. After post 4, a new series auto-generates.",
      "Fallback at every layer: image gen, scheduling, posting. 16+ posts autonomously published with zero manual intervention.",
    ],
    stack: ["TypeScript", "Claude AI", "FLUX.1-schnell", "GitHub Actions", "Cloudflare Workers AI"],
    links: [
      { label: "GitHub", href: "https://github.com/suychakriya" },
      { label: "Facebook", href: "https://www.facebook.com/LetsJudge000" },
    ],
  },
];

export function ProjectsPage() {
  return (
    <>
      <section className="px-6 lg:px-10 pt-24 pb-16 relative">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-sun-radial opacity-25 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Selected projects"
            title={
              <>
                Real problems. <em className="font-light italic">Practical engineering.</em>
              </>
            }
            description="A curated set of side projects and open-source work — what the problem was, what I built, what shipped."
          />
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-7xl space-y-8">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className={`group relative overflow-hidden rounded-3xl border border-border ${
                i % 2 === 0 ? "bg-card" : "bg-primary text-primary-foreground"
              } p-8 md:p-12`}
            >
              <div
                className={`absolute -top-32 ${i % 2 === 0 ? "-right-32" : "-left-32"} h-80 w-80 rounded-full bg-sun-radial opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700`}
              />

              <div className="relative grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4 space-y-4">
                  <div
                    className={`font-display text-6xl ${i % 2 === 0 ? "text-sun-deep" : "text-sun"}`}
                  >
                    {p.n}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight">{p.name}</h3>
                  <div
                    className={`text-xs uppercase tracking-widest font-semibold ${i % 2 === 0 ? "text-sun-deep" : "text-sun"}`}
                  >
                    {p.tag}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          i % 2 === 0 ? "bg-secondary" : "bg-primary-foreground/10"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`group/btn inline-flex items-center gap-1.5 text-sm font-medium ${
                          i % 2 === 0 ? "hover:text-sun-deep" : "hover:text-sun"
                        } transition-colors`}
                      >
                        {l.label}
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-8 space-y-5">
                  <div>
                    <div
                      className={`text-xs uppercase tracking-widest font-semibold mb-2 ${i % 2 === 0 ? "text-muted-foreground" : "text-primary-foreground/60"}`}
                    >
                      The problem
                    </div>
                    <p
                      className={`text-lg leading-relaxed ${i % 2 === 0 ? "text-foreground" : "text-primary-foreground"}`}
                    >
                      {p.problem}
                    </p>
                  </div>
                  <div>
                    <div
                      className={`text-xs uppercase tracking-widest font-semibold mb-3 ${i % 2 === 0 ? "text-muted-foreground" : "text-primary-foreground/60"}`}
                    >
                      What I built
                    </div>
                    <ul className="space-y-3">
                      {p.bullets.map((b) => (
                        <li
                          key={b}
                          className={`flex gap-3 leading-relaxed ${i % 2 === 0 ? "text-muted-foreground" : "text-primary-foreground/85"}`}
                        >
                          <span
                            className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${i % 2 === 0 ? "bg-sun-deep" : "bg-sun"}`}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
