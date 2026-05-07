import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const roles = [
  {
    period: "Jan 2024 — Present",
    title: "Frontend Engineer",
    company: "Equmenopolis",
    location: "Tokyo, Japan · Full-time",
    note: "Waseda University AI startup · Forbes Japan Top 100 Startups 2026 · Conversational AI for education & workplaces.",
    bullets: [
      "Built and maintained learner-facing web apps in React + TypeScript + Tailwind, focused on accessibility and cross-device responsiveness.",
      "Developed internal admin dashboards in Vue.js for operational workflows and customer management.",
      "Integrated REST APIs across product surfaces — async state, error boundaries, data-fetching at scale.",
      "Drove frontend performance work: code-splitting, lazy loading, and production performance best practices.",
      "Built and deployed Firebase Cloud Functions for serverless endpoints and background tasks.",
      "Wrote unit tests with Vitest + React Testing Library, E2E tests with Playwright.",
      "Configured GCP testing environments and CI/CD deployment workflows.",
      "Stepped into PM duties after the previous PM departed — wrote specs, gathered requirements, coordinated design ↔ engineering, while keeping full dev output.",
      "Code reviews, sprint planning, and agile collaboration with designers, backend, and stakeholders.",
    ],
    tags: ["React", "TypeScript", "Vue", "Tailwind", "Firebase", "GCP", "Vitest", "Playwright"],
  },
  {
    period: "Mar 2022 — Jul 2023",
    title: "Frontend Developer & Project Lead",
    company: "GK Smart",
    location: "Singapore · Freelance · Remote",
    note: "Hotel booking platform with interactive map-based browsing.",
    bullets: [
      "Led frontend development in React.js + Tailwind, including Mapbox GL for interactive map-based hotel browsing.",
      "Integrated backend APIs — handled data-fetching, error states, and user-facing feedback loops.",
      "Coordinated an 8-person team across frontend and backend — task distribution, sprint planning, progress tracking.",
      "Served as primary client liaison: project updates, expectation management, stakeholder reporting.",
    ],
    tags: ["React", "Tailwind", "Mapbox GL", "Team Lead"],
  },
  {
    period: "Feb 2023 — May 2023",
    title: "Frontend Developer & Project Lead",
    company: "Amok Restaurant",
    link: "https://amokkhmer.com",
    location: "Cambodia · Freelance",
    note: "Full production website with i18n (English/French) for a Cambodian restaurant client.",
    bullets: [
      "Built the full production site in Next.js — responsive layouts, smooth UI transitions, English/French i18n.",
      "Integrated EmailJS for contact form functionality, no backend required.",
      "Coordinated with stakeholders, designers, and devs across the full lifecycle. Client satisfaction led to follow-on work.",
    ],
    tags: ["Next.js", "i18n", "EmailJS"],
  },
  {
    period: "Oct 2022 — Jan 2023",
    title: "Project Lead",
    company: "Japanese Client",
    location: "Remote · Internship",
    note: "Real-time communication platform with live 2D avatars.",
    bullets: [
      "Developed a real-time platform integrating WebRTC and the Live2D SDK — 2D avatars animated in sync with users' live facial movements.",
      "Built complex frontend rendering with PixiJS for real-time 2D avatar animation in-browser.",
      "Led a 3-member team through scoping, sprint planning, prototype design, and delivery reporting.",
    ],
    tags: ["WebRTC", "Live2D", "PixiJS", "Team Lead"],
  },
  {
    period: "Jan 2022 — Aug 2022",
    title: "President",
    company: "KCyberOp",
    location: "Cambodia · Hybrid · Internship",
    note: "Early-stage startup internship with ownership over business strategy and go-to-market planning.",
    bullets: [
      "Developed the business plan and go-to-market strategy.",
      "Built the business model and financial plan.",
      "Conducted market research and defined marketing strategies.",
      "Managed projects and led the team end-to-end.",
    ],
    tags: ["Team Leadership", "Business Strategy", "P&L Management", "Project Management"],
  },
  {
    period: "Dec 2020 — Jan 2022",
    title: "Network & Systems Administrator Intern",
    company: "DynamixD Virtual Company",
    location: "Cambodia · On-site · Internship",
    note: "IT infrastructure internship — managed company-wide networking, servers, and systems.",
    bullets: [
      "Administered firewall (PFSense) — configured VPN, VLAN, access points, and managed switches.",
      "Designed and installed camera infrastructure and GPON/fiber optic networks for new buildings.",
      "Set up and maintained servers: DHCP, DNS, and LAN/WAN components.",
      "Monitored IT systems using Ichinga and reported status updates to management.",
      "Managed team tasks and project planning.",
    ],
    tags: ["Networking", "PFSense", "Infrastructure", "Servers", "Team Leadership"],
  },
];

export function WorkPage() {
  return (
    <>
      <section className="px-6 lg:px-10 pt-24 pb-16 relative">
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-sun-radial opacity-25 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Experience"
            title={
              <>
                Different teams, different challenges -{" "}
                <em className="font-light italic">always</em> shipping.
              </>
            }
            description="From Tokyo to Singapore to Cambodia. Full-time, freelance, internship, lead. Different stacks — same standard."
          />
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-5xl relative">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-6 top-2 bottom-2 w-px bg-border" />

          <div className="space-y-16">
            {roles.map((r, i) => (
              <motion.article
                key={r.title + r.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className="relative pl-12 md:pl-20"
              >
                <span className="absolute left-0 md:left-[10px] top-2 h-6 w-6 rounded-full bg-background border-2 border-sun grid place-items-center">
                  <span className="h-2 w-2 rounded-full bg-sun" />
                </span>

                <div className="text-xs uppercase tracking-widest text-sun-deep font-semibold">
                  {r.period}
                </div>
                <h3 className="mt-2 font-display text-3xl md:text-4xl">{r.title}</h3>
                <div className="mt-1 text-lg flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{r.company}</span>
                  {r.link && (
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-0.5 text-xs font-medium text-sun-deep hover:underline underline-offset-4"
                    >
                      {r.link.replace(/^https?:\/\//, "")}
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                  <span className="text-muted-foreground">· {r.location}</span>
                </div>
                <p className="mt-3 text-muted-foreground italic">{r.note}</p>

                <ul className="mt-6 space-y-3">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-muted-foreground leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sun shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-secondary text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
