# Chakriya Suy — Personal Portfolio

Personal portfolio and writing space for [chakriya.dev](https://chakriya.dev) — built with React, TypeScript, and Tailwind CSS v4.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — switches between **Focus mode** (professional) and **Shine mode** (personal) |
| `/about` | About, skills, principles, and achievements |
| `/work` | Work experience timeline |
| `/projects` | Selected projects with problem/solution breakdown |
| `/novels` | Writing — published novel chapters |
| `/contact` | Contact form |

---

## Mood System

The site has two modes toggled via a floating button:

- **Focus mode** — navy palette, professional content, skill orb hero
- **Shine mode** — warm amber palette, personal content, interactive sun hero

Mode is stored in context and persisted via `localStorage`. Switching always navigates to `/`.

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** — build tool
- **Tailwind CSS v4** — `@theme inline`, `oklch` color space throughout
- **Framer Motion** — page transitions, scroll animations, interactive orb
- **React Router v6** — client-side routing
- **Lucide React** — icons

---

## Project Structure

```
src/
├── components/
│   ├── home/
│   │   ├── FocusHome.tsx       — Focus mode home layout
│   │   ├── ShineHome.tsx       — Shine mode home layout
│   │   └── SkillOrb.tsx        — Rotating skill orb (focus hero)
│   └── site/
│       ├── Header.tsx          — Nav with planet logo + mood-aware links
│       ├── MoodFAB.tsx         — Floating mode toggle button
│       ├── DualitySun.tsx      — Interactive sun (shine hero)
│       └── SectionHeading.tsx  — Reusable section heading
├── content/
│   └── novels/                 — Markdown novel files (frontmatter + body)
├── lib/
│   ├── mood-context.tsx        — Mood state (focus | shine) + toggle
│   └── novels.ts               — Markdown parser + renderer for novel posts
└── routes/
    ├── index.tsx               — Home page (mounts Focus or Shine home)
    ├── about.tsx
    ├── work.tsx
    ├── projects.tsx
    ├── novels.tsx
    ├── novels-slug.tsx
    └── contact.tsx
```

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

Requires **Node.js 18+** and **pnpm**.

---

## Adding a Novel

Create a new `.md` file in `src/content/novels/`:

```markdown
---
title: "Story Title"
excerpt: "One-line teaser."
date: "2026-01-01"
tag: "Novel"
reading: "5 min read"
linebreaks: "true"    # optional — preserves single line breaks as <br>
---

Your story content here...
```

The slug is derived from the filename (`the-friends.md` → `/novels/the-friends`).

---

## License

Code is MIT. Written content (novels, copy) is © Chakriya Suy — all rights reserved.
