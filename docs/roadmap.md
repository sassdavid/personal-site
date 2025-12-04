# Roadmap

This site has been a work in progress since 2014 (originally by Michael D'Angelo, forked and enhanced by David Sass). It continues to evolve as a WIP guided by the [design goals](./design-goals.md).

## Recently Completed ✅

### 2024-2025 Updates

- **Migrated to TypeScript** - Entire codebase now uses TypeScript for better type safety and developer experience
- **Upgraded to Next.js 16** - Latest version (16.0.6) with App Router and Turbopack support
- **Upgraded to React 19** - Latest React version (19.2) with improved performance
- **Implemented modern Google Analytics 4** - Using @next/third-parties for optimal performance
- **Added Prettier** - Consistent code formatting across the project
- **Enabled Turbopack** - Faster development builds by default
- **Migrated from SCSS `@import` to `@use`** - Addressed all deprecation warnings, using modern Sass module system
- **Added Jest testing with SWC** - 20x faster test execution with TypeScript support
- **Implemented SEO features** - Sitemap generation, Open Graph tags, proper metadata
- **Fixed Resume page styling** - Restored original design consistency
- **Optimized images** - Using Next.js Image component for better performance
- **Migrated from ESLint to Biome** - Faster, more modern linting and formatting
- **Integrated mise** - Tool version management and task automation with cross-platform support
- **Centralized type definitions** - All shared types consolidated in `src/lib/types.tsx`
- **Implemented dark/light theme system** - Using next-themes with comprehensive CSS custom properties
- **Multi-platform CI/CD** - GitHub Actions workflows support Linux, macOS, and Windows builds
- **Cross-platform build support** - Full Windows PowerShell support alongside Unix/Linux bash
- **TOML-based task configuration** - Migrated from file-based tasks to inline TOML tasks in mise.toml
- **Automated statistics** - TypeScript line counting with cross-platform scripts
- **Manual deployment workflows** - Configured GitHub Actions for manual-only deployment via workflow_dispatch

## Future Direction

### High Priority Improvements

- **Better JSON Resume integration** - Use standard resume schema instead of custom format (perform literature search for wiki data resume standard)
- **Improve bundle optimization** - Some bundles are under 1KB, could be better split
- **Make styles more modular** - Continue improving SCSS organization
- **Enhanced testing coverage**:
  - Add more comprehensive component tests
  - Test using Playwright for E2E testing
  - Test cross-browser compatibility
  - Use Google Lighthouse for performance audits
- **Introduce spell checker** - Automated spell checking in CI

### Medium Priority Improvements

- **Simplify FontAwesome integration** - Consider building custom FA library for better tree-shaking
- **Simplify Favicon** - See: https://news.ycombinator.com/item?id=25520655
- **Better data organization** - Separate concerns in src/data/ (some files are data, others are template variables)
- **Navbar improvements** - Use nav provided by template to reduce bundle size

### New Features

- **Backend integration** (under consideration):
  - Completely gut and redo server integration, use JWT
  - Auto-deploy backend, keep frontend on CDN
- **Blog/Posts revival** (under consideration):
  - Put one or two examples up from knowledge base
  - Consider MDX-based blog posts

### Repository Cleanup

- ✅ **Add contributing guidelines** - COMPLETED
- **Branch protection** - Don't allow pushes to main
- **Semantic versioning** - Generate releases using GitHub Action (increment version in package.json)
- **Encourage more PRs** - Support roadmap / pay bug bounties
- **Build change proposal system** - Make it easy for people to propose changes
- **Main/server distinction** - Ensure PRs to main also land in server (if applicable)

### Analytics and Community

- **Implement better analytics** - Track site performance and user behavior
- **Capture community information** - Learn about people who have cloned/forked this site

### Under Consideration

- **Tailwind CSS migration** - Consider migrating from SCSS to Tailwind for more maintainable styles
  - Pros: Utility-first, smaller bundle, better DX
  - Cons: Loss of current SCSS organization, migration effort
- **Husky for git hooks** - Pre-commit hooks for linting/testing (currently using GitHub Actions only)
- **More exotic integrations** - Support for Reason, WebAssembly
- **Hydrate content from single source** - Deploy as npm package + JSON
- **Monorepo structure** - Consider using turborepo or nx if backend is added

## Completed (Historical)

Items from original roadmap that have been addressed:

- ~~Get better at redefining duplicate types~~ - ✅ Centralized in src/lib/types.tsx
- ~~Migrate to TypeScript~~ - ✅ Completed
- ~~Upgrade to Next.js App Router~~ - ✅ Using Next.js 16
- ~~Improve test infrastructure~~ - ✅ Jest with SWC
- ~~Fix SCSS deprecation warnings~~ - ✅ Migrated to @use/@forward

## How to Contribute

If you'd like to help with any of these items, please:

1. Review the [contributing guidelines](./contributing.md)
2. Open an issue to discuss your proposed changes
3. Submit a PR

Thank you for your interest in improving this project!
