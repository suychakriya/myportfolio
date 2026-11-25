import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNovelBySlug, renderMarkdown, splitIntoArcs, type NovelArc } from "@/lib/novels";
import { cn } from "@/lib/utils";

function clampIndex(value: string | null, length: number): number {
  const n = Number.parseInt(value ?? "", 10);
  if (Number.isNaN(n)) return 0;
  return Math.min(Math.max(n - 1, 0), length - 1);
}

interface PageRef {
  arc: number;
  chapter: number;
}

function usePagination(arcs: NovelArc[]) {
  const [params, setParams] = useSearchParams();
  const pages = useMemo<PageRef[]>(
    () => arcs.flatMap((a, ai) => a.chapters.map((_, ci) => ({ arc: ai, chapter: ci }))),
    [arcs],
  );
  const arcIdx = arcs.length ? clampIndex(params.get("arc"), arcs.length) : 0;
  const chapterIdx = arcs.length ? clampIndex(params.get("ch"), arcs[arcIdx].chapters.length) : 0;
  const pageIdx = pages.findIndex((p) => p.arc === arcIdx && p.chapter === chapterIdx);

  const goTo = (arc: number, chapter = 0) => {
    const next = new URLSearchParams(params);
    next.set("arc", String(arc + 1));
    if (arcs[arc].chapters.length > 1) next.set("ch", String(chapter + 1));
    else next.delete("ch");
    setParams(next);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [arcIdx, chapterIdx]);

  return {
    arcIdx,
    chapterIdx,
    pageIdx,
    total: pages.length,
    prev: pageIdx > 0 ? pages[pageIdx - 1] : null,
    next: pageIdx < pages.length - 1 ? pages[pageIdx + 1] : null,
    goTo,
  };
}

/** Horizontally scrolls a row so its aria-current item sits in the middle. */
function useCenterActive(ref: RefObject<HTMLDivElement | null>, deps: unknown[]) {
  useEffect(() => {
    const row = ref.current;
    const active = row?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!row || !active) return;
    row.scrollTo({
      left: active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2,
      behavior: "smooth",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const scrollRow =
  "-mx-6 px-6 flex gap-2 overflow-x-auto pb-1 relative [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

function pageLabel(arcs: NovelArc[], ref: PageRef): string {
  const arc = arcs[ref.arc];
  const chapter = arc.chapters[ref.chapter];
  return chapter.title && arc.chapters.length > 1 ? chapter.title : arc.title;
}

export function NovelSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getNovelBySlug(slug) : null;
  const arcs = useMemo(
    () => (post?.paginate === "true" ? splitIntoArcs(post.content) : []),
    [post],
  );
  const nav = usePagination(arcs);
  const arcRowRef = useRef<HTMLDivElement>(null);
  const chapterRowRef = useRef<HTMLDivElement>(null);
  useCenterActive(arcRowRef, [nav.arcIdx]);
  useCenterActive(chapterRowRef, [nav.arcIdx, nav.chapterIdx]);

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

  const preserveLineBreaks = post.linebreaks === "true";
  const paginated = arcs.length > 0;
  const currentArc = paginated ? arcs[nav.arcIdx] : null;
  const currentChapter = currentArc ? currentArc.chapters[nav.chapterIdx] : null;
  const html = renderMarkdown(currentChapter ? currentChapter.content : post.content, {
    preserveLineBreaks,
  });
  const pov = currentChapter?.pov ?? currentArc?.pov;
  const isLastPage = !paginated || nav.next === null;

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

        {paginated && currentArc && (
          <nav aria-label="Arcs and chapters" className="mb-12 space-y-4">
            <div ref={arcRowRef} className={scrollRow}>
              {arcs.map((arc, i) => (
                <button
                  key={arc.title}
                  type="button"
                  onClick={() => nav.goTo(i)}
                  aria-current={i === nav.arcIdx ? "page" : undefined}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors",
                    i === nav.arcIdx
                      ? "border-sun bg-sun/15 text-foreground font-medium"
                      : "border-border text-muted-foreground hover:border-sun/60 hover:text-foreground",
                  )}
                >
                  {arc.title}
                </button>
              ))}
            </div>
            {currentArc.chapters.length > 1 && (
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Chapter {nav.chapterIdx + 1} of {currentArc.chapters.length}
                </div>
                <div ref={chapterRowRef} className={scrollRow}>
                  {currentArc.chapters.map((chapter, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => nav.goTo(nav.arcIdx, i)}
                      aria-current={i === nav.chapterIdx ? "page" : undefined}
                      className={cn(
                        "shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs transition-colors",
                        i === nav.chapterIdx
                          ? "bg-foreground text-background"
                          : "bg-foreground/5 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span className="opacity-60 mr-1.5">{i + 1}</span>
                      {chapter.title ?? `Chapter ${i + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>
        )}

        <motion.div
          key={paginated ? `${nav.arcIdx}-${nav.chapterIdx}` : "full"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="prose-novel"
        >
          {pov && (
            <div className="mb-3 text-xs uppercase tracking-[0.3em] text-sun-deep font-semibold">
              {pov}’s POV
            </div>
          )}
          {currentArc && (
            <h2 className="font-display text-3xl md:text-4xl mb-2">{currentArc.title}</h2>
          )}
          {currentArc && currentChapter?.title && (
            <h3 className="font-display text-xl text-muted-foreground mb-6">
              {currentChapter.title}
            </h3>
          )}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </motion.div>

        {paginated && (
          <div className="mt-16 pt-8 border-t border-border">
            <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Page {nav.pageIdx + 1} of {nav.total}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {nav.prev ? (
                <button
                  type="button"
                  onClick={() => nav.goTo(nav.prev!.arc, nav.prev!.chapter)}
                  className="group flex flex-col items-start gap-1 rounded-xl border border-border p-4 text-left hover:border-sun/60 transition-colors"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <ArrowLeft size={12} /> Previous
                  </span>
                  <span className="text-sm font-medium line-clamp-2">
                    {pageLabel(arcs, nav.prev)}
                  </span>
                </button>
              ) : (
                <span />
              )}
              {nav.next && (
                <button
                  type="button"
                  onClick={() => nav.goTo(nav.next!.arc, nav.next!.chapter)}
                  className="group flex flex-col items-end gap-1 rounded-xl border border-border p-4 text-right hover:border-sun/60 transition-colors"
                >
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    Next <ArrowRight size={12} />
                  </span>
                  <span className="text-sm font-medium line-clamp-2">
                    {pageLabel(arcs, nav.next)}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {isLastPage && (
          <div className="mt-20 pt-10 border-t border-border text-center">
            <p className="text-sm text-muted-foreground italic font-display">Thanks for reading.</p>
            <Link
              to="/novels"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-sun/60 transition-colors"
            >
              ← More from the notebook
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
