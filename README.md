# My Personal Website

This repository was originally forked from [Michael D'Angelo's personal site](https://github.com/mldangelo/personal-site). Since then, I have made
several updates and enhancements. I replaced the [create-react-app](https://github.com/facebook/create-react-app) setup
with [Next.js](https://nextjs.org/), leveraging its features for server-side rendering and routing.

I have aimed to maintain clean and simple code while taking full advantage of Next.js capabilities.

For dark theme support, I integrated [next-themes](https://github.com/pacocoursey/next-themes).

To standardize type handling, I consolidated redundant type definitions from various files, particularly in the resume section, into a
single [src/lib/types.tsx](https://github.com/sassdavid/personal-site/blob/main/src/lib/types.tsx). This file serves as a centralized location for
reusable type definitions throughout the project.

Regarding SCSS sources, I adopted best practices for [Sass](https://sass-lang.com/). I resolved all deprecation warnings, which had accumulated over
the years, ensuring the codebase is free from major issues. While the SCSS setup may not be fully cutting-edge, it is now clean and reliable. The
migration process was handled using the official Sass [migrator](https://sass-lang.com/documentation/cli/migrator/).

For managing the [Node.js](https://nodejs.org/en) version and other tools, I utilized [mise](https://mise.jdx.dev/), an efficient tool for managing
multiple CLI tool versions. Finally, I used [mise-tasks](https://mise.jdx.dev/tasks/) to define and manage tasks and their dependencies.

## Mise Tasks

### TOML Tasks

The following TOML tasks are defined in [mise.toml](https://github.com/sassdavid/personal-site/blob/main/mise.toml):

- `install` (`mise r i`): Installs npm dependencies.
- `build` (`mise r b`): Builds the project.
- `format` (`mise r f`): Formats project files.
- `ci` (`mise r ci`): Installs npm dependencies using `npm ci`.

### File Tasks

These file tasks, located in the [mise-tasks](https://github.com/sassdavid/personal-site/tree/main/mise-tasks) directory, help ensure code cleanliness
and dynamically gather project data during build time:

- [mise-tasks/utils/nroflines](https://github.com/sassdavid/personal-site/blob/main/mise-tasks/utils/nroflines): Counts the number of lines of
  TypeScript powering the website.
- [mise-tasks/utils/nrofwordsandtime](https://github.com/sassdavid/personal-site/blob/main/mise-tasks/utils/nrofwordsandtime): Calculates the number
  of words and estimated reading time for `.mdx` files in the project.

## Environment Variables

Three environment variables are used during the build process. Their values are managed through `mise` and defined in `mise.toml`:

- `NEXT_PUBLIC_GOOGLE_ANALYTICS`: Used for Google Analytics integration.
- `NEXT_PUBLIC_NUMBER_OF_LINES`: Reflects the number of TypeScript lines, calculated at build time.

These variables are accessed directly via `process.env` in components with fallback defaults where needed.

## GitHub Action

The GitHub Action workflow is defined
in [.github/workflows/github-pages.yml](https://github.com/sassdavid/personal-site/blob/main/.github/workflows/github-pages.yml).

This workflow builds and deploys the project to [GitHub Pages](https://pages.github.com/). For more details, refer to the workflow file.

To deploy a Next.js application to GitHub Pages, I drew inspiration from [this guide](https://github.com/gregrickaby/nextjs-github-pages).

Since I have my own domain, [davidsass.eu](https://davidsass.eu), I configured the repository to support a custom domain.

To set this up, I took the following steps:

1. Created a [public/CNAME](https://github.com/sassdavid/personal-site/blob/main/public/CNAME).
2. Removed the `basePath` configuration from [next.config.js](https://github.com/gregrickaby/nextjs-github-pages/blob/main/next.config.ts), as it was
   not needed for my setup.
3. Adjusted the code to omit the base path, particularly for imported images, as
   explained [here](https://github.com/gregrickaby/nextjs-github-pages?tab=readme-ov-file#add-base-path-to-pagetsx). This step is unnecessary when
   using a custom domain.

## Acknowledgements

- This project was originally forked from [Michael D'Angelo's personal site](https://github.com/mldangelo/personal-site), a fantastic, easily
  modifiable, statically-exportable [React](https://react.dev/) and [Jamstack](https://jamstack.org/) application.
- The original version was built
  using [create-react-app](https://github.com/facebook/create-react-app), [React-Router](https://reactrouter.com/), [Sass](https://sass-lang.com/), [GitHub Actions](https://github.com/features/actions),
  and many other modern technologies.
- The template is based on [Future Imperfect](https://html5up.net/future-imperfect) by [@ajlkn](https://github.com/ajlkn)
  for [HTML5 UP](https://html5up.net/).
- The dark mode implementation was inspired by [Paige Johnson](https://github.com/Paigej/portfolio-site).
