# David Sass-Kovacs — Personal Site

[![Build Status](https://img.shields.io/github/actions/workflow/status/sassdavid/personal-site/node.js.yml?branch=main)](https://github.com/sassdavid/personal-site/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/sassdavid/personal-site?style=social)](https://github.com/sassdavid/personal-site/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/sassdavid/personal-site?style=social)](https://github.com/sassdavid/personal-site/network/members)

The source for [sasskovacs.dev](https://sasskovacs.dev), a portfolio, résumé,
project archive, and writing site built with
[Next.js](https://nextjs.org/), [React](https://react.dev/),
[TypeScript](https://www.typescriptlang.org/), and
[Tailwind CSS](https://tailwindcss.com/).

The architecture is reusable and MIT licensed. The content and visual design
are personal, so a fork needs a full rebrand.

**[Visit the live site →](https://sasskovacs.dev)**

## What is here

- A statically exported Next.js 16 site deployed to GitHub Pages.
- A responsive light/dark design system built from semantic CSS tokens.
- Markdown writing with drafts, RSS, and page metadata.
- A filterable résumé that still prints in full.
- Tests for components, content, metadata, and the final static export.

## Get started

### With a coding agent

Open your fork in a coding agent and ask:

```text
Read AGENTS.md, use the Node version mise.toml pins, install the locked
dependencies, and start the development server. Do not change the site yet.
Tell me the local URL and report any setup failure with its exact output.
```

### Manual setup

This repository pins its toolchain with [mise](https://mise.jdx.dev/) rather
than an `.nvmrc`. With [GitHub CLI](https://cli.github.com/) and mise
installed:

```bash
gh repo fork sassdavid/personal-site --clone
cd personal-site
mise install
npm ci
npm run dev
```

If you use another version manager, choose a release accepted by `engines.node`
in `package.json`.

### GitHub Codespaces

1. Click **Fork** at the top of this page.
2. In your fork, click **Code**, choose **Codespaces**, then create a codespace.
3. Run:

```bash
npm ci
npm run dev
```

Codespaces provides the tools, so you do not need to install them locally. If
its Node is older than `engines.node`, run `mise install` first.

## Adapt it with a coding agent

When you are ready to customize the site, give the agent your résumé, profile
details, links, images, and intended site URL. Try:

```text
Read AGENTS.md and docs/adapting-guide.md, set up the repository, then rebrand
this fork for [NAME] with the details and assets I provide. Work on a topic
branch and preserve the current routes and design unless I say otherwise.
Inventory the existing posts, external writing, résumé, and projects before
changing the shared identity. Do not relabel that content as mine. Ask whether
unmatched personal content should keep its original attribution, be replaced,
or be removed. Use the guide's reference map to update every identity surface
and generated asset. Search for remaining upstream details and run the full
validation suite. Do not commit, push, merge, change GitHub settings, create
secrets, or modify DNS. Report the external steps that remain.
```

The **[adapting guide](./docs/adapting-guide.md)** has focused prompts for
writing, feature removal, visual changes, and deployment, plus a map of the
files an agent should inspect.

## Commands

```bash
npm run dev             # Start the development server
npm run format          # Format with Prettier and Biome
npm run lint            # Run Biome checks
npm run type-check      # Run TypeScript
npm test                # Run Vitest
npm run build           # Build the production static export
npm run verify-export   # Inspect the generated HTML and XML
npm run og              # Regenerate the share card
npm run og:check        # Verify the committed share card is current
```

CI checks formatting, linting, types, the share card, tests, the production
build, and the exported site on every pull request.

### With mise

```bash
mise run check  # Full quality gate: types, lint, format, tests
```

Tasks are short aliases over the `npm` scripts above — `mise r b` to build,
`mise r t` to test, `mise r d` for the dev server, `mise r f` to format.
Anything not aliased is just its `npm run` equivalent; `mise tasks` lists the
current set.

## Deploy

Pushes to `main` deploy the same static build that CI validates. See the
[adapting guide](./docs/adapting-guide.md#deployment-reference) for URL and
domain setup.

## Contributing

See the [contributing guide](./docs/contributing.md) for setup, branch and commit
conventions, validation, and pull request expectations.

## Acknowledgments

This site is based on the excellent [personal-site template](https://github.com/mldangelo/personal-site) by Michael D'Angelo. Thank you for creating such a great starting point!

## License

[MIT](./LICENSE). Use it however you want.
