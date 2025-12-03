# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 16 (App Router), React 19.2, TypeScript, and SCSS. The site is statically exported and deployed to GitHub Pages at davidsass.eu via GitHub Actions.

Key architectural choices:
- **Next.js 16 with Turbopack**: Uses Next.js 16.0.6 with Turbopack for faster builds (`output: 'export'` in next.config.ts)
- **React 19.2**: Latest React with modern patterns (useReducer for complex state)
- **MDX Integration**: Content is managed via MDX files using @next/mdx, with pageExtensions configured to include .mdx files
- **Centralized Types**: All TypeScript types are consolidated in src/lib/types.tsx to avoid duplication across components
- **Theme System**: Dark/light theme implementation using next-themes with ThemeProvider in layout.tsx (attribute="class", defaultTheme="dark")
- **Modern Tooling**: Biome for linting, Jest for testing, Bundle Analyzer for optimization
- **Build-time Environment Variables**: Three env vars are dynamically set at build time via mise tasks (see below)

## Development Commands

This project uses [mise](https://mise.jdx.dev/) for tool version management and task running. All commands should be run via mise tasks:

### Core Development Tasks

```bash
# Install dependencies
mise run install    # or: mise r i
npm install         # alternative if not using mise

# Development server (Turbopack - faster)
npm run dev         # uses Turbopack by default
npm run dev:webpack # traditional webpack dev server

# Build for production
mise run build      # or: mise r b
npm run build       # builds static export to ./out

# Code Quality
npm run lint        # Biome linting
npm run type-check  # TypeScript validation
npm run format      # Biome + Prettier formatting
npm run format:check # Verify formatting

# Testing
mise run test       # or: mise r t
npm test            # run Jest tests
npm run test:watch  # watch mode
npm run test:coverage # with coverage report

# Bundle Analysis
npm run analyze     # analyze bundle size (Webpack only)

# CI install (used in GitHub Actions)
mise run ci         # or: mise r ci
# This runs npm ci and depends on utils:nroflines and utils:nrofwordsandtime tasks
```

### Mise Utility Tasks

Two file-based tasks in mise-tasks/utils/ calculate build-time metadata:

- **nroflines**: Counts TypeScript lines using fd and sets NEXT_PUBLIC_NUMBER_OF_LINES
- **nrofwordsandtime**: Calculates word count and reading time for .mdx files, sets NEXT_PUBLIC_MDX_DETAILS_* vars

These tasks run automatically before `mise r ci` (see mise.toml dependencies).

## Environment Variables

Three environment variables are injected at build time (managed via mise.toml):

- **NEXT_PUBLIC_GOOGLE_ANALYTICS**: Google Analytics ID (set via GitHub secret in CI)
- **NEXT_PUBLIC_NUMBER_OF_LINES**: TypeScript line count (calculated by nroflines task)

These are accessed directly via process.env with fallback defaults where needed.

## Architecture

### Directory Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── about/
│   ├── contact/
│   ├── resume/
│   ├── stats/
│   ├── layout.tsx       # Root layout with ThemeProvider and metadata
│   └── page.tsx         # Home page with siteConfig
├── components/          # React components organized by feature
│   ├── contact/
│   ├── resume/          # Education, Experience, Skills, Tools, References
│   ├── stats/           # PersonalStats display components
│   └── template/        # Navigation, SideBar, Hamburger, ThemeSwitch
├── data/                # Static data and content
│   ├── about/about.mdx  # MDX content for about page
│   ├── contact.ts
│   ├── routes.ts
│   ├── resume/          # Data for work history, skills, tools, degrees
│   └── stats/           # GitHub and personal statistics
├── lib/                 # Utilities and shared code
│   └── types.tsx        # Centralized TypeScript type definitions
└── assets/scss/         # SCSS organized by base, components, layout, pages
```

### Key Architectural Patterns

1. **Type Consolidation**: All shared types (JobProps, DegreeProps, SkillProps, etc.) are in src/lib/types.tsx. Always import from here rather than defining inline.

2. **Data Separation**: Component data is separated into src/data/ files. For example, resume work history is in src/data/resume/work.ts as an array that components map over.

3. **MDX Content**: Long-form content like the About page lives in .mdx files (e.g., src/data/about/about.mdx). The build automatically calculates reading time via mise tasks.

4. **SCSS Organization**: Styles follow a strict hierarchy:
   - base/ - Theme variables, typography, global styles
   - components/ - Component-specific styles
   - layout/ - Layout structures (header, footer, sidebar)
   - pages/ - Page-specific styles
   - libs/ - Functions, mixins, variables

5. **Static Export**: The site uses Next.js static export with `output: 'export'`. This means:
   - No custom domain basePath needed (custom domain davidsass.eu configured)
   - Images must be unoptimized (`images: { unoptimized: true }`)
   - All pages are pre-rendered at build time

## Deployment

GitHub Actions workflow (.github/workflows/github-pages.yml) handles CI/CD:

1. Uses mise-action to set up environment
2. Sets NEXT_PUBLIC_GOOGLE_ANALYTICS from GitHub secret
3. Runs `mise r ci` to install deps and calculate metadata
4. Runs `mise r b` to build
5. Deploys ./out directory to GitHub Pages

The CNAME file in public/ configures the custom domain davidsass.eu.

## Code Style

- **Biome**: Modern linter/formatter (biome.json) - primary tool for TypeScript/JavaScript
- **Prettier**: Secondary formatter for markdown, CSS, SCSS (.prettierrc)
- **SCSS**: Modern @use/@forward module system (not deprecated @import)
- **TypeScript**: Strict mode enabled, jsx: "react-jsx" for React 19

## Testing

- **Framework**: Jest 30.2.0 with React Testing Library
- **Transform**: @swc/jest for fast transformations
- **Coverage**: Enabled via `npm run test:coverage`
- **Location**: Tests in `src/components/__tests__/`
- **Mocks**: Next.js Image, router, and ResizeObserver pre-configured in jest.setup.ts

Example test:
```typescript
import { render, screen } from '@testing-library/react';
import Component from '../Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected')).toBeInTheDocument();
  });
});
```

## CI/CD

Two GitHub Actions workflows:

1. **node.js.yml** (CI Validation):
   - Parallel jobs: code-quality, test, build
   - Runs on all pushes and PRs
   - Uses mise for environment management
   - Caches node_modules and .next/cache

2. **github-pages.yml** (Deployment):
   - Builds and deploys to GitHub Pages
   - Runs on push to main
   - Sets environment variables via mise
   - Caches for faster deployments

**Dependabot**: Configured for weekly npm and GitHub Actions updates

## Theme System

**CRITICAL: Theme Color Architecture**

The theme system uses CSS custom properties with next-themes integration:

### Core Files
- `src/assets/scss/base/_themes.scss` - Theme color variable definitions for both dark and light modes
- `src/assets/scss/base/_light-dark-theme.scss` - Theme class selectors (`.dark`, `.light`)
- `src/assets/scss/libs/_vars.scss` - Palette mappings using theme variables

### Theme Colors (Updated 2025-01)

**Dark Theme** (default):
- Backgrounds: `#242424` (main), `#2f2f2f` (alt)
- Text: `#d0d0d0`, `#dbdbdb`, `#c9c9c9`

**Light Theme** (optimized for readability):
- Backgrounds: `#ffffff` (main), `#f4f4f4` (alt)
- Text: `#646464` (main), `#3c3b3b` (bold), `#646464` (secondary)
- Note: Light theme uses softer grays for better readability

### Important Theme Variables
- `--bgThemeColor1` / `--bgThemeColor2`: Main/alt backgrounds
- `--textThemeColor1` / `--textThemeColor2`: Text colors
- `--textThemeColor1Same`: Light text for both themes (used on blue backgrounds)
- `--bgThemeColor1Swapped`: Opposite theme background (e.g., for theme toggle button)

### Theme Implementation Notes
1. **Skills Section**: Uses `--textThemeColor1Same` for text on blue accent backgrounds
2. **Mini-post Component**: Uses `--bgThemeColor2` for background overlays
3. **Theme Toggle**: Uses `--bgThemeColor1Swapped` and `--textThemeColor1Swapped` for opposite theme styling

## FontAwesome 7

- Version: 7.1.0 (latest)
- Tree-shaking enabled via `optimizePackageImports` in next.config.ts
- Icons imported individually for optimal bundle size
- Example: `import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'`

## Content Guidelines

### Homepage (src/app/page.tsx)
- **Intro paragraph**: Keep compact (20-30 words), action-oriented
- Current: "I build reliable, scalable infrastructure using modern cloud technologies and automation..."
- Avoid: Corporate buzzwords, vague phrases like "constantly exploring innovative approaches"

### Sidebar About (src/components/template/SideBar.tsx)
- **About paragraph**: Keep brief (30-40 words), technical focus
- Current: "DevOps Engineer with a Computer Engineering degree, specializing in cloud infrastructure and automation..."
- Include: Role, current company, key technologies, focus areas
- Avoid: First-person excessive praise ("highly skilled and experienced")

### Work Experience (src/data/resume/work.ts)

**Data Structure** (conforms to https://jsonresume.org/schema/):
```typescript
interface Position {
  name: string;           // Company name
  position: string;       // Job title
  url: string;           // Company URL
  startDate: string;     // ISO date format (YYYY-MM-DD)
  endDate?: string;      // Optional for current positions
  summary?: string;      // 1-2 sentence overview of the role
  highlights?: string[]; // Bullet points of achievements
}
```

**Best Practices**:
1. **Always add summaries** for positions lasting >6 months
   - Summary: High-level overview (25-40 words)
   - Highlights: Specific achievements (5-6 bullets, condensed when summary exists)
2. **Summaries should**:
   - Start with action verb or gerund (e.g., "Leading...", "Spearheaded...")
   - Mention key technologies/focus areas
   - Reference major accomplishments or clients (when appropriate)
3. **Highlights should be**:
   - Specific and measurable
   - Technology-focused (mention tools/platforms)
   - Achievement-oriented (what you built/delivered)
   - Condensed when a summary exists (avoid redundancy)

**Example** (Current Senior DevOps Engineer role):
```typescript
{
  name: 'Loxon Solutions Zrt.',
  position: 'Senior DevOps Engineer',
  startDate: '2025-07-01',
  summary: 'Leading AWS multi-region infrastructure initiatives and DevOps practices, maintaining multi-tenant environments serving multiple clients across Indonesia...',
  highlights: [
    'Architecting and managing AWS multi-region, multi-tenant infrastructure for enterprise SaaS deployments',
    'Maintaining multi-tenant AWS environments serving major clients including Grab across Indonesia',
    // ... (5-6 concise bullets)
  ]
}
```

## Repository Information

- **GitHub**: https://github.com/sassdavid/personal-site
- **Live Site**: https://davidsass.eu
- **Original Source**: Forked from https://github.com/mldangelo/personal-site (properly attributed in README)

### Important GitHub API References
- All GitHub API calls reference `sassdavid/personal-site`
- Located in: `src/components/stats/Site.tsx` and `src/data/stats/site.ts`

## Critical Layout Requirements

### Root Layout Wrapper
The layout MUST include `<div id="wrapper">` for proper flexbox styling:

```tsx
// src/app/layout.tsx
<body>
  <ThemeProvider {...}>
    <div id="wrapper">  {/* REQUIRED */}
      <Navigation />
      {children}
    </div>
  </ThemeProvider>
</body>
```

The `#wrapper` styles in `src/assets/scss/layout/_wrapper.scss` define:
- Flexbox layout with `flex-direction: row-reverse`
- Max-width, margins, padding
- Responsive breakpoint behavior

**Without this wrapper, the layout will break.**

## Documentation

Additional documentation in `docs/` directory:
- `adapting-guide.md` - Customizing the site (updated for sassdavid repo)
- `contributing.md` - Contribution guidelines
- `design-goals.md` - Architecture decisions
- `roadmap.md` - Future plans
