import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { getAllNovels } from "@/lib/novels";

export function NovelsPage() {
  const posts = getAllNovels();

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-sun-radial opacity-30 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-sun-radial opacity-20 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="px-6 lg:px-10 pt-24 pb-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-sun/40 bg-sun/10 backdrop-blur px-4 py-1.5 text-xs"
          >
            <BookOpen size={12} />
            <span>The notebook</span>
          </motion.div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.0] tracking-tight text-balance">
            Novels & notes,
            <br />
            <span className="italic font-light">slowly written.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Short stories, half-finished chapters, and essays I wrote on trains.
            Posted when they stop embarrassing me — sometimes years after the
            first draft. Print is best. Read with tea.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="px-6 lg:px-10 pb-32">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow={`${posts.length} ${posts.length === 1 ? "piece" : "pieces"}`}
            title={<>The library, <em className="font-light italic">so far</em>.</>}
          />

          <div className="mt-16 divide-y divide-border border-y border-border">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/novels/${post.slug}`}
                  className="group grid md:grid-cols-12 gap-6 py-10 hover:bg-sun/5 transition-colors px-2 -mx-2 rounded-lg"
                >
                  <div className="md:col-span-2 text-sm text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </time>
                  </div>
                  <div className="md:col-span-8">
                    {post.tag && (
                      <div className="text-xs uppercase tracking-widest text-sun-deep mb-2">
                        {post.tag} · {post.reading}
                      </div>
                    )}
                    <h2 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-sun-deep transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-2 max-w-2xl">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    <ArrowUpRight
                      size={20}
                      className="inline-block text-muted-foreground group-hover:text-sun-deep group-hover:rotate-12 transition-all"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="mt-16 text-center text-muted-foreground italic">
              Nothing posted yet. The notebook is full though.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
