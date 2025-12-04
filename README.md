# Personal Website

Welcome to my [personal website](https://davidsass.eu)! This is an [MIT licensed](https://github.com/sassdavid/personal-site/blob/main/LICENSE) Next.js-based Jamstack application. It offers a modern interface, easy modifications, static export capabilities, and free automatic deployments via [GitHub Pages](https://pages.github.com/).

This project was originally forked from [Michael D'Angelo's personal site](https://github.com/mldangelo/personal-site) and has been significantly enhanced with modern tooling and features.

## 🚀 Features

- Built with modern TypeScript, using [Next.js 16](https://nextjs.org/) with Turbopack, [React 19](https://react.dev/), and SCSS.
- Type-safe development with TypeScript strict mode and centralized type definitions.
- Dark/light theme support via [next-themes](https://github.com/pacocoursey/next-themes).
- Optimized performance with static export and automatic font optimization.
- Development environment management with [mise](https://mise.jdx.dev/) - tool version management and task runner.
- Automated workflows via [GitHub Actions](https://github.com/features/actions) with multi-platform CI/CD.
- Modern code quality tools: [Biome](https://biomejs.dev/) for linting, [Jest](https://jestjs.io/) for testing.
- Cross-platform build support (Linux, macOS, Windows) with automated line counting and statistics.
- And more!

## 🛠 Adapting this Project

Want to create your own personal website based on this project? You can set it up in as little as 30 minutes! Follow the setup instructions below and check out the **[detailed guide and checklist](./docs/adapting-guide.md)** on adapting this project to your needs.

## 🤝 Contributing

Your contributions are warmly welcomed! If you wish to contribute, please review the [design goals](./docs/design-goals.md), [roadmap](./docs/roadmap.md), and [contributing guidelines](./docs/contributing.md). For any bugs or suggestions, feel free to submit a pull request or open an issue.

## 🔧 Dependencies

This project uses [mise](https://mise.jdx.dev/) to manage tool versions. Mise will automatically install the correct versions of:

- [Node.js](https://nodejs.org/) (version specified in [mise.toml](./mise.toml))
- [fd](https://github.com/sharkdp/fd) - fast file finder (for statistics)

### Installing mise

Follow the [mise installation guide](https://mise.jdx.dev/getting-started.html) for your platform:

**macOS/Linux:**
```bash
curl https://mise.run | sh
```

**Windows:**
```powershell
irm https://mise.run/install.ps1 | iex
```

Alternatively, if you prefer not to use mise, ensure you have Node.js >= v22 installed manually.

## 🚀 Setup and Running

1. Clone the repository:

   ```bash
   git clone git://github.com/sassdavid/personal-site.git
   cd personal-site
   ```

2. Install dependencies:

   **Using mise (recommended):**
   ```bash
   mise run install
   # or: mise r i
   ```

   **Without mise:**
   ```bash
   npm install
   ```

3. Start the development server:

   **Using mise:**
   ```bash
   npm run dev
   ```

   **Without mise:**
   ```bash
   npm run dev
   ```

   By default, the application will be available at [http://localhost:3000/](http://localhost:3000/).

## 🏗 Building for Production

1. Build the static export:

   **Using mise:**
   ```bash
   mise run build
   # or: mise r b
   ```

   **Without mise:**
   ```bash
   npm run build
   ```

   The build process automatically creates a static export in the `out/` directory and calculates project statistics (TypeScript line count).

2. Preview the production build locally:

   ```bash
   npx serve out
   ```

## 🚢 Deploying

### Deploying to GitHub Pages

1. Configure your repository:
   - Set `NEXT_PUBLIC_GA_TRACKING_ID` as a repository variable (optional)
   - Update [`.github/workflows/github-pages.yml`](.github/workflows/github-pages.yml) if needed

2. Enable GitHub Actions and Pages:
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"

3. Push to the `main` branch to trigger automatic deployment:

   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

### Custom Domain Setup

This site uses a custom domain ([davidsass.eu](https://davidsass.eu)). To set up your own:

1. Create a `public/CNAME` file with your domain name
2. Configure your DNS provider to point to GitHub Pages
3. No `basePath` configuration needed in `next.config.ts` when using a custom domain

### Static Export

You can export the site as static HTML to host anywhere:

```bash
npm run build
```

The static files will be automatically generated in the `out/` directory.

## 🔬 Testing and Quality

```bash
# Code quality checks
npm run lint          # Run Biome linter
npm run type-check    # Run TypeScript type checking
npm run format        # Format code with Biome and Prettier
npm run format:check  # Check code formatting

# Testing
npm test              # Run Jest tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report

# Bundle analysis (Webpack only)
npm run analyze       # Analyze bundle size
```

**Using mise for CI tasks:**
```bash
mise run ci           # Install dependencies with npm ci
mise run test:ci      # Run tests in CI mode with coverage
mise run lint         # Run linting
mise run type-check   # Run type checking
mise run format:check # Check formatting
```

## 📊 Mise Tasks

This project uses [mise tasks](https://mise.jdx.dev/tasks/) for automation. Tasks are defined in [mise.toml](./mise.toml).

### Core Tasks

- `mise run install` (alias: `mise r i`) - Install npm dependencies
- `mise run build` (alias: `mise r b`) - Build for production
- `mise run ci` - Install dependencies with npm ci (for CI environments)
- `mise run test:ci` - Run tests in CI mode with coverage
- `mise run lint` - Run Biome linter
- `mise run type-check` - Run TypeScript type checking
- `mise run format:check` - Check code formatting

### Utility Tasks

- `mise run utils:nroflines` - Count TypeScript lines and update statistics
  - Cross-platform: bash for Unix/Linux/macOS, PowerShell for Windows
  - Automatically runs during CI builds
  - Sets `NEXT_PUBLIC_NUMBER_OF_LINES` environment variable

## 🎨 Customization

- **Personal Information**: Update files in `src/data/` with your information
  - `src/data/about.ts` - About page content
  - `src/data/contact.ts` - Contact information
  - `src/data/resume/` - Work experience, education, skills
  - `src/data/stats/` - Personal statistics
- **Images**: Replace images in `public/images/` with your own
- **Profile Picture**: Replace `public/me.jpg` with your photo
- **Theme Colors**:
  - Dark/Light theme variables in `src/assets/scss/base/_themes.scss`
  - Color palette in `src/assets/scss/libs/_vars.scss`
- **Site Metadata**: Update `src/app/layout.tsx` for SEO and metadata
- **Google Analytics**: Set `NEXT_PUBLIC_GA_TRACKING_ID` in `.env.local` (locally) or GitHub variables (CI)

## 🏗 Architecture

### Key Technologies

- **Next.js 16** with App Router and Turbopack for fast builds
- **React 19** with modern patterns (hooks, client components)
- **TypeScript** with strict mode and centralized types in `src/lib/types.tsx`
- **SCSS** with modern module system (`@use`/`@forward`, no deprecated `@import`)
- **MDX** for long-form content (About page)
- **mise** for tool version management and task automation
- **Biome** for fast linting and formatting
- **Jest + React Testing Library** for testing

### Project Structure

```
├── .github/workflows/    # GitHub Actions CI/CD
│   ├── node.js.yml      # Multi-platform CI (code quality, tests, builds)
│   └── github-pages.yml # Deployment workflow
├── docs/                # Documentation
├── public/              # Static assets (images, CNAME)
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── data/           # Content and data files
│   ├── lib/            # Utilities (centralized types)
│   └── assets/scss/    # SCSS styles
├── mise.toml           # Mise configuration and tasks
└── next.config.ts      # Next.js configuration
```

### Theme System

The site features a comprehensive dark/light theme system:

- **Theme Toggle**: Client-side theme switching via `next-themes`
- **Color Variables**: CSS custom properties defined in `_themes.scss`
- **Automatic Detection**: Respects user's system preference
- **Persistent**: Theme choice saved to localStorage

See [CLAUDE.md](./CLAUDE.md) for detailed theme architecture documentation.

## 🌍 Environment Variables

Two environment variables are used during the build process:

- `NEXT_PUBLIC_GA_TRACKING_ID` - Google Analytics 4 tracking ID (optional, set via GitHub variables in CI)
- `NEXT_PUBLIC_NUMBER_OF_LINES` - TypeScript line count (automatically calculated by `mise run utils:nroflines`)

These are accessed via `process.env` with fallback defaults where needed.

## 📚 Documentation

- [CLAUDE.md](./CLAUDE.md) - Comprehensive developer guide for AI assistants (Claude Code)
- [docs/adapting-guide.md](./docs/adapting-guide.md) - Step-by-step customization guide
- [docs/contributing.md](./docs/contributing.md) - Contribution guidelines
- [docs/design-goals.md](./docs/design-goals.md) - Architecture decisions and design philosophy
- [docs/roadmap.md](./docs/roadmap.md) - Future plans and improvements

## 🙏 Acknowledgements

- This project was originally forked from [Michael D'Angelo's personal site](https://github.com/mldangelo/personal-site), a fantastic, easily modifiable, statically-exportable [React](https://react.dev/) and [Jamstack](https://jamstack.org/) application.
- The original template is based on [Future Imperfect](https://html5up.net/future-imperfect) by [@ajlkn](https://github.com/ajlkn) for [HTML5 UP](https://html5up.net/).
- Dark mode implementation inspired by [Paige Johnson](https://github.com/Paigej/portfolio-site).
- Next.js GitHub Pages deployment inspired by [Greg Rickaby's guide](https://github.com/gregrickaby/nextjs-github-pages).

## 📝 License

[MIT](https://github.com/sassdavid/personal-site/blob/main/LICENSE)

---

**Note**: This is a personal portfolio site. Feel free to fork and adapt it for your own use, but please provide attribution to both this repository and the original [mldangelo/personal-site](https://github.com/mldangelo/personal-site) repository.
