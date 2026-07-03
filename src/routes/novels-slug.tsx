import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getNovelBySlug, renderMarkdown } from "@/lib/novels";

export function NovelSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getNovelBySlug(slug) : null;

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Couldn't find that one</h1>
        <p className="mt-3 text-muted-foreground">It may not have been written yet.</p>
        <Link to="/novels" className="mt-8 inline-block underline underline-offset-4">
          ← Back to all writing
        </Link>
      </div>
    );
  }

  const html = renderMarkdown(post.content, { preserveLineBreaks: post.linebreaks === "true" });

  return (
    <article className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-sun-radial opacity-30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-20 pb-32">
        <Link
          to="/novels"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          All writing
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 mb-14 border-b border-border pb-12"
        >
          {post.tag && (
            <div className="text-xs uppercase tracking-[0.3em] text-sun-deep font-semibold">
              {post.tag} {post.reading && <>· {post.reading}</>}
            </div>
          )}
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
            {post.title}
          </h1>
          <div className="mt-6 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="prose-novel"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-20 pt-10 border-t border-border text-center">
          <p className="text-sm text-muted-foreground italic font-display">Thanks for reading.</p>
          <Link
            to="/novels"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-sun/60 transition-colors"
          >
            ← More from the notebook
          </Link>
        </div>
      </div>
    </article>
  );
}
