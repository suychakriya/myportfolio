// Markdown-backed novel blog. Files live in src/content/novels/*.md.
// Vite's import.meta.glob bundles them at build time.

const modules = import.meta.glob("/src/content/novels/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export interface NovelFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  tag?: string;
  reading?: string;
  linebreaks?: string;
}

export interface NovelPost extends NovelFrontmatter {
  slug: string;
  content: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: match[2] };
}

export function getAllNovels(): NovelPost[] {
  const posts: NovelPost[] = [];
  for (const path in modules) {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(modules[path]);
    posts.push({
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? "",
      date: data.date ?? "",
      tag: data.tag,
      reading: data.reading,
      linebreaks: data.linebreaks,
      content: body,
    });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNovelBySlug(slug: string): NovelPost | null {
  return getAllNovels().find((p) => p.slug === slug) ?? null;
}

/**
 * Tiny markdown → HTML renderer covering the subset used in novel posts:
 * headings, paragraphs, blockquotes, italic, bold, code, horizontal rules.
 */
export function renderMarkdown(md: string, opts?: { preserveLineBreaks?: boolean }): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const inline = (s: string) =>
    escape(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>");

  const blocks = md.trim().split(/\n{2,}/);
  const html: string[] = [];
  for (const blk of blocks) {
    const trimmed = blk.trim();
    if (!trimmed) continue;
    if (trimmed === "---" || trimmed === "***") {
      html.push('<hr class="my-10 border-t border-border" />');
    } else if (trimmed.startsWith("### ")) {
      html.push(`<h3 class="font-display text-2xl mt-10 mb-4">${inline(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith("## ")) {
      html.push(`<h2 class="font-display text-3xl mt-12 mb-4">${inline(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith("# ")) {
      html.push(`<h1 class="font-display text-4xl mt-12 mb-4">${inline(trimmed.slice(2))}</h1>`);
    } else if (trimmed.startsWith("> ")) {
      const inner = trimmed
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join(" ");
      html.push(
        `<blockquote class="border-l-2 border-sun pl-6 my-8 italic text-xl font-display text-muted-foreground">${inline(inner)}</blockquote>`,
      );
    } else {
      const inlined = inline(trimmed);
      const body = opts?.preserveLineBreaks ? inlined.replace(/\n/g, "<br />") : inlined.replace(/\n/g, " ");
      html.push(
        `<p class="my-5 leading-[1.85] text-lg text-foreground/90">${body}</p>`,
      );
    }
  }
  return html.join("\n");
}
