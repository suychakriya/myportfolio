import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Gamepad2,
  PenLine,
  Coffee,
  Music,
  Cloud,
  ActivityIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getAllNovels } from "@/lib/novels";

const marqueeJoys = [
  "Hay Day",
  "Mobile Legends:bang bang",
  "Jewel Sliding",
  "Wool Crush",
  "Pubg Mobile",
];

const hobbies = [
  {
    icon: Gamepad2,
    title: "Playing games",
    body: "Off the clock, I’m usually tending farms in Hay Day, getting too competitive in Mobile Legends, or disappearing into puzzle games for hours.",
    tag: "Favorite current",
    now: "Mobile Legends: Bang Bang",
  },
  {
    icon: BookOpen,
    title: "Reading novels",
    body: "Magic realism, slow literary fiction, and short story collections I can carry on the train. Print or digital, I'm down for whatever gets the sentences to me.",
    tag: "Favorite current",
    now: "The Lord of Mysteries — Cuttlefish That Loves Diving",
  },
  {
    icon: PenLine,
    title: "Writing novels",
    body: "Notebooks first, screen second. I like sentences that surprise me halfway through. I publish drafts in the blog when they stop embarrassing me.",
    tag: "Writing in progress",
    now: "The Friends, ch. 6",
  },
  {
    icon: ActivityIcon,
    title: "Exploring outdoors",
    body: "I like wandering around Tokyo with no destination in mind, discovering little cafes and quiet parks. It’s the best way to reset after a week of screen time.",
    tag: "Favorite current",
    now: "Hiking",
  },
];

const currentlyShelf = [
  { icon: BookOpen, label: "Reading", value: "Sputnik Sweetheart — Murakami" },
  { icon: Gamepad2, label: "Playing", value: "Stardew Valley (still)" },
  { icon: PenLine, label: "Writing", value: "Cartographer, Ch. 4" },
  { icon: Music, label: "Listening", value: "Cinnamons · evening cécile" },
  { icon: Coffee, label: "Drinking", value: "Iced houjicha latte" },
  { icon: Cloud, label: "Weather", value: "Tokyo, partly cloudy" },
];

const favorites = {
  games: ["Hay Day", "Mobile Legends:bang bang", "Jewel Sliding", "Wool Crush", "Pubg Mobile"],
  novels: [
    "The Lord of Mysteries",
    "I alone level up",
    "My House of Horrors",
    "The Founder of Diabolism",
    "The Rebirth of the Malicious Empress of Military Lineage",
    "Heaven Official's Blessing",
  ],
  films: [
    "3 idiots",
    "Start-up",
    "Guardian: The Lonely and Great God",
    "Descendants of the Sun",
    "Avengers series",
  ],
};

interface Props {
  hero: React.ReactNode;
}

export function ShineHome({ hero }: Props) {
  const novels = getAllNovels().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 -right-40 h-125 w-125 rounded-full bg-sun-radial opacity-50 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-sun-radial opacity-30 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-32 lg:pt-32 lg:pb-40 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-sun/40 bg-sun/10 backdrop-blur px-4 py-1.5 text-xs"
            >
              <span className="text-2xl leading-none">☀</span>
              <span className="text-foreground/80">The other side</span>
              <span className="text-border">·</span>
              <span className="italic">off the clock</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-balance"
            >
              When the laptop
              <br />
              <span className="italic font-light">closes,</span>{" "}
              <span className="text-gradient-sun">I write.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed"
            >
              Off the clock I'm a novelist with a notebook problem, a gamer who still rank up in
              Mobile Legends: Bang Bang, and a reader who loves all kind of novels. This is the part
              of me that doesn't show up on a CV.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/novels"
                className="group inline-flex items-center gap-2 rounded-full bg-sun text-ink px-7 py-3.5 text-sm font-medium hover:bg-sun-deep hover:text-cream transition-all shadow-sun"
              >
                Read the novels
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <a
                href="#hobbies"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur px-7 py-3.5 text-sm font-medium hover:border-foreground/40 transition-colors"
              >
                The full list
              </a>
            </motion.div>
          </div>

          {hero}
        </div>

        {/* Marquee — joys, not skills */}
        <div className="relative border-y border-border bg-sun text-ink py-5 overflow-hidden">
          <div className="flex marquee gap-12 whitespace-nowrap">
            {[...marqueeJoys, ...marqueeJoys].map((s, i) => (
              <span key={i} className="font-display italic text-2xl flex items-center gap-12">
                {s}
                <span className="text-xl">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOBBIES */}
      <section id="hobbies" className="relative py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Three loves"
            title={
              <>
                Worlds I disappear into
                <br />
                <span className="italic font-light text-muted-foreground">
                  when no one's watching.
                </span>
              </>
            }
            description="Pixel farms, paperback novels, and notebooks full of half-finished sentences. The throughline is the same — I want to live inside a small, well-made world for a while."
          />

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hobbies.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl bg-card border border-border p-7 overflow-hidden hover:border-sun/60 transition-all"
              >
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-sun-radial opacity-30 blur-2xl group-hover:opacity-60 transition-opacity" />
                <div className="relative">
                  <h.icon size={28} className="text-sun-deep" />
                  <h3 className="mt-5 font-display text-2xl">{h.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{h.body}</p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="text-xs uppercase tracking-widest text-sun-deep font-semibold">
                      {h.tag}
                    </div>
                    <div className="mt-1 text-sm font-medium">{h.now}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRENTLY SHELF */}
      {/* <section className="relative py-32 px-6 lg:px-10 bg-sun/10">
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The currently shelf"
            title={
              <>
                What I'm <em className="font-light italic">into</em> this week.
              </>
            }
            description="A tiny status board. I update it more often than my LinkedIn."
          />

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentlyShelf.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl bg-card border border-border px-6 py-5 hover:border-sun/60 transition-colors"
              >
                <div className="h-11 w-11 grid place-items-center rounded-full bg-sun/20 text-sun-deep">
                  <item.icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="font-medium truncate">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* NOVEL BLOG TEASER */}
      <section className="relative py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              eyebrow="From the notebook"
              title={
                <>
                  The novels, <em className="font-light italic">unfinished</em> and otherwise.
                </>
              }
            />
            <Link
              to="/novels"
              className="group inline-flex items-center gap-2 text-sm font-medium hover:text-sun-deep transition-colors"
            >
              All writing
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {novels.map((n, i) => (
              <motion.div
                key={n.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/novels/${n.slug}`}
                  className="group block h-full rounded-2xl bg-card border border-border p-8 hover:border-sun/60 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-10">
                    <span className="text-xs font-mono text-muted-foreground">{n.date}</span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground group-hover:text-sun-deep group-hover:rotate-12 transition-all"
                    />
                  </div>
                  {n.tag && (
                    <div className="text-xs uppercase tracking-wider text-sun-deep mb-2">
                      {n.tag} · {n.reading}
                    </div>
                  )}
                  <h3 className="font-display text-2xl leading-tight">{n.title}</h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-4">
                    {n.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAVORITES */}
      <section className="relative py-32 px-6 lg:px-10 bg-secondary/40">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="A short manifesto"
            title={
              <>
                Some things I'd <em className="font-light italic">recommend</em>.
              </>
            }
            description="Not affiliate links. Not life-changing. Just consistently good company."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            {(
              [
                ["Games", favorites.games, Gamepad2],
                ["Authors", favorites.novels, BookOpen],
                ["Films", favorites.films, PenLine],
              ] as const
            ).map(([label, items, Icon]) => (
              <div key={label}>
                <div className="flex items-center gap-2 mb-6">
                  <Icon size={18} className="text-sun-deep" />
                  <h3 className="font-display text-xl uppercase tracking-widest">{label}</h3>
                </div>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-base border-b border-border pb-3 last:border-b-0"
                    >
                      <span className="h-1 w-1 rounded-full bg-sun" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO / CTA */}
      <section className="relative py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-100 w-100 rounded-full bg-sun-radial opacity-40 blur-3xl animate-pulse-sun" />
          </div>
          <p className="font-display italic text-3xl md:text-4xl leading-snug text-balance">
            "I want to make small, well-made things — code, sentences, dinners, afternoons — that
            someone might want to live inside for a while."
          </p>
          <p className="mt-8 text-sm uppercase tracking-widest text-muted-foreground">
            — that's the whole manifesto
          </p>
          <div className="mt-12">
            <Link
              to="/novels"
              className="inline-flex items-center gap-2 rounded-full bg-sun text-ink px-8 py-4 text-sm font-medium hover:bg-sun-deep hover:text-cream transition-all shadow-sun"
            >
              Read what I've written
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
