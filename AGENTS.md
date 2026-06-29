# AGENTS.md

Guidance for AI coding agents working on this Next.js personal portfolio site.

## Quick Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run format       # Format with Prettier + Biome (run before committing)
npm run lint         # Biome linting
npm run type-check   # TypeScript checking
npm test             # Vitest tests
npm run build        # Production build + static export
```

**File-scoped (faster feedback):**

```bash
npx tsc --noEmit path/to/file.tsx           # Type check single file
npx biome check path/to/file.tsx            # Lint single file
npm test -- ComponentName                    # Test single component
```

## Project Structure

```
src/app/              → Pages, layouts, global CSS
src/app/styles/       → Modular CSS (tokens, base, components, layout, pages)
src/components/       → React components (organized by feature)
src/data/             → Static data (resume, projects, writing, contact)
src/hooks/            → Custom React hooks
src/lib/              → Shared helpers (schema graph, metadata, posts, utils)
content/writing/      → Blog posts (Markdown with frontmatter); empty by default
public/images/        → Images and favicons
docs/                 → Documentation
```

## Code Style

**Do:**

- Use TypeScript strict mode, functional components with hooks
- Style with CSS custom properties in `app/styles/` (tokens in `tokens/`, components in `components/`)
- Keep components small and focused
- Use existing patterns from similar components
- Mark client components with `'use client'`
- Follow conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Run `npm run format` before committing (CI enforces this)

**Don't:**

- Add new dependencies without clear need
- Create god components or monolithic files
- Hard-code colors—use CSS variables (`var(--color-*)`)
- Skip type annotations on function parameters
- Commit without running `npm run format` first

## Git Workflow

- Create a topic branch for every task; never commit or push directly to `main`
- Make small, frequent conventional commits as you go (e.g., `feat:`, `fix:`, `refactor:`)
- Push to your remote branch after every commit to keep it in sync
- Land changes on `main` by merging GitHub PRs with conventional-commit titles (deploys trigger automatically from these merges)
- If multiple PRs need to land together, open an integration branch PR; do not locally merge into `main`
- Treat `main` as protected: force-pushes and history rewrites require explicit user approval

## Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Biome · Vitest

## Key Patterns

- **Theming**: `data-theme` attribute on `<html>`, persisted to `window.localStorage` in client code/tests to avoid Node runtime globals leaking into browser-only paths
- **Static export**: `output: 'export'` for GitHub Pages—no server features
- **Canonical/export URLs**: When generating absolute URLs for metadata, RSS, sitemap, or schema, match `trailingSlash: true` output (`/about/`, `/writing/post-slug/`) instead of non-canonical no-slash variants; file-like routes such as `/feed.xml` and `/sitemap.xml` stay file-like
- **Page metadata**: Route-level `metadata` exports and `generateMetadata` should override `openGraph` and `twitter`, not just `title`/`description`, otherwise subpages inherit the homepage share card from `app/layout.tsx`; for `app/not-found.tsx`, omit `openGraph.url` because there is no stable canonical 404 route in the static export
- **Theme images**: Use `ThemePortrait` component for light/dark variants
- **Profile copy**: Keep role/bio updates in sync across `src/components/Template/Hero.tsx`, `app/layout.tsx` metadata, `src/data/about.ts`, and `src/data/resume/work.ts` so homepage copy, SEO, schema, and resume stay aligned
- **Long-form markdown pages**: Prefer a dedicated renderer component that can parse markdown into semantic sections instead of styling raw headings globally; if `markdown-to-jsx` causes dev/runtime issues in App Router, a `'use client'` boundary may still be required even without hooks. Preserve stable heading ids when converting markdown headings so deep links and `scroll-margin-top` behavior keep working, prefer a shared helper over duplicating slug logic in each page component, and expose those anchors in the UI with section nav or self-links if readers are expected to use them
- **JSON-LD schema**: Structured data is built in `src/lib/schema.ts` as a node graph with stable `@id`s. `SiteSchema` (canonical `Person` + `WebSite`) is emitted once from `app/layout.tsx`; each page emits a `<SchemaGraph nodes={[...]} />` composed from the builders (`profilePageNode`, `collectionPageNode`, `webPageNode`, `blogNode`, `blogPostingNode`, `breadcrumbNode`) instead of repeating entity properties. Keep `SITE_IMAGE_DIMENSIONS` in `lib/utils.ts` in sync with the real `public/images/me.jpg` asset—a test in `lib/__tests__/schema.test.ts` reads the JPEG header and will fail if they drift.
- **Dormant Writing/Projects features**: The `/writing`, `/writing/[slug]`, `/feed.xml`, and `/projects` routes are fully wired but ship with empty data (`src/data/writing.ts`, `src/data/projects.ts`) and no `content/writing/*.md`, so they are intentionally **not** linked from `Navigation`, `Footer`, `routes.ts`, or `sitemap.ts`. To enable one: add content (a Markdown post and/or `writing.ts` entries, or `projects.ts` entries plus images under `public/images/projects/`), then add its nav entry to `src/data/routes.ts` and a `sitemap.ts` entry. Because `output: 'export'` forbids a dynamic route with zero params, `app/writing/[slug]/page.tsx` emits a single `coming-soon` placeholder slug that resolves to the 404 page while there are no posts—remove that fallback once real posts exist.

## Testing

Tests live in `__tests__/` directories adjacent to the code they test. Run `npm test` before committing.

```bash
npm test                        # Run all tests
npm test -- --watch             # Watch mode
npm test -- ComponentName       # Run specific test
```

## Further Reading

- [README.md](./README.md) — Setup and deployment
- [docs/adapting-guide.md](./docs/adapting-guide.md) — Guide for forking and customizing
- [docs/design-goals.md](./docs/design-goals.md) — Architecture principles
- [docs/contributing.md](./docs/contributing.md) — Contribution guidelines

## Maintaining This Document

When creating a PR, audit this file and make small, targeted improvements based on your learnings—new patterns discovered, outdated references, or missing guidance that would have helped.
