# Upstream Migration Implementation Plan

**Personal Site Repository Migration - Comprehensive Phased Approach**

## Executive Summary

This plan migrates upstream changes from `/home/sassd/src/github/personal-site-mldangelo` to `/home/sassd/src/github/personal-site` while preserving:

- mise tooling (mise.toml + mise-tasks/)
- MDX support (@next/mdx)
- next-themes dark/light theme system
- Custom SCSS theme files

And adopting:

- Next.js 16.0.6, React 19.2.0
- FontAwesome 7.1.0 (breaking changes)
- Biome linting
- Jest + Testing Library
- Enhanced CI/CD
- CSS modernizations
- Better component patterns

---

## Phase 1: Foundation & Configuration Files

**Objective**: Set up new tooling without breaking existing functionality

### 1.1 Add New Configuration Files (Low Risk)

**Files to create:**

1. **`/home/sassd/src/github/personal-site/biome.json`**
    - Copy from upstream: `/home/sassd/src/github/personal-site-mldangelo/biome.json`
    - No modifications needed
    - Purpose: Linting for TypeScript/JavaScript files

2. **`/home/sassd/src/github/personal-site/.gitattributes`**
    - Copy from upstream: `/home/sassd/src/github/personal-site-mldangelo/.gitattributes`
    - Purpose: Consistent line endings across platforms

3. **`/home/sassd/src/github/personal-site/postcss.config.js`**
    - Copy from upstream: `/home/sassd/src/github/personal-site-mldangelo/postcss.config.js`
    - Purpose: CSS normalization

4. **`/home/sassd/src/github/personal-site/.github/dependabot.yml`**
    - Copy from upstream: `/home/sassd/src/github/personal-site-mldangelo/.github/dependabot.yml`
    - Purpose: Automated dependency updates

**Testing steps:**

```bash
# Verify Biome can run
npx @biomejs/biome check .

# Verify git attributes work
git check-attr -a README.md

# Verify PostCSS config is valid
node -e "require('./postcss.config.js')"
```

**Rollback**: Simply delete the added files if issues occur.

---

### 1.2 Update .gitignore

**File**: `/home/sassd/src/github/personal-site/.gitignore`

**Changes to add:**

```gitignore
# Add at top
yarn.lock
.eslintcache

# Add to env section
.env

# Add to Next.js section
.swc/
tsconfig.tsbuildinfo

# Add at bottom
nohup.out
```

**Keep from current:**

- `.idea` (not in upstream)

**Testing steps:**

```bash
git status # Should not show unwanted files
git check-ignore -v .env .swc tsconfig.tsbuildinfo
```

**Rollback**: Revert `.gitignore` to git HEAD.

---

### 1.3 Update TypeScript Configuration

**File**: `/home/sassd/src/github/personal-site/tsconfig.json`

**Changes:**

```json
{
  "compilerOptions": {
    "target": "es2015",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "new-types.d.ts",
    "next-env.d.ts",
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

**Critical changes:**

- `moduleResolution: "bundler"` - Required for Next.js 16
- `jsx: "react-jsx"` - React 19 automatic JSX transform
- `target: "es2015"` - Better compatibility

**Testing steps:**

```bash
# Type check should pass
npx tsc --noEmit

# Build should succeed
mise r b
```

**Rollback**: Revert `tsconfig.json` to git HEAD.

---

## Phase 2: Testing Infrastructure

**Objective**: Add Jest testing without breaking builds

### 2.1 Create Jest Configuration

**Files to create:**

1. **`/home/sassd/src/github/personal-site/jest.config.ts`**
   ```typescript
   import type { Config } from '@jest/types';
   import nextJest from 'next/jest.js';

   const createJestConfig = nextJest({
     dir: './',
   });

   const config: Config.InitialProjectOptions = {
     transform: {
       '^.+\\.(t|j)sx?$': [
         '@swc/jest',
         {
           jsc: {
             parser: {
               syntax: 'typescript',
               tsx: true,
               decorators: true,
             },
             transform: {
               react: {
                 runtime: 'automatic',
               },
             },
             target: 'es2021',
           },
         },
       ] as [string, any],
     },
     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
     testEnvironment: 'jest-environment-jsdom',
     moduleNameMapper: {
       '^@/(.*)$': '<rootDir>/src/$1',
       '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
     },
     collectCoverageFrom: [
       'src/**/*.{ts,tsx}',
       '!src/**/*.d.ts',
       '!src/**/__tests__/**',
       '!src/**/*.test.{ts,tsx}',
       '!src/**/*.spec.{ts,tsx}',
     ],
     testPathIgnorePatterns: [
       '<rootDir>/.next/',
       '<rootDir>/node_modules/',
       '<rootDir>/build/',
       '<rootDir>/out/',
     ],
     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
     transformIgnorePatterns: [],
     roots: ['<rootDir>'],
     testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],
   };

   export default createJestConfig(config);
   ```

2. **`/home/sassd/src/github/personal-site/jest.setup.ts`**
   ```typescript
   import '@testing-library/jest-dom';

   // Mock Next.js router
   jest.mock('next/navigation', () => ({
     useRouter() {
       return {
         push: jest.fn(),
         replace: jest.fn(),
         prefetch: jest.fn(),
       };
     },
     useSearchParams() {
       return new URLSearchParams();
     },
     usePathname() {
       return '';
     },
   }));

   // Suppress console errors in tests
   global.console = {
     ...console,
     error: jest.fn(),
     warn: jest.fn(),
   };
   ```

**Testing steps:**

```bash
# Should fail gracefully (no tests yet)
npm test

# Dry-run to verify config loads
npx jest --listTests
```

**Rollback**: Delete `jest.config.ts` and `jest.setup.ts`.

---

### 2.2 Integrate Tests with mise

**File**: `/home/sassd/src/github/personal-site/mise.toml`

**Add these tasks:**

```toml
[tasks.test]
alias = "t"
description = "Run tests with Jest"
run = "npm test"

[tasks."test:watch"]
alias = "tw"
description = "Run tests in watch mode"
run = "npm run test:watch"

[tasks."test:coverage"]
alias = "tc"
description = "Run tests with coverage"
run = "npm run test:coverage"

[tasks.lint]
alias = "l"
description = "Lint code with Biome"
run = "npm run lint"

[tasks."type-check"]
description = "Type check with TypeScript"
run = "npm run type-check"
```

**Testing steps:**

```bash
mise tasks # Verify tasks appear
mise r t # Run tests
mise r l # Run linter
```

**Rollback**: Remove added tasks from `mise.toml`.

---

## Phase 3: Package Updates (Part 1 - Non-Breaking)

**Objective**: Update packages that don't require code changes

### 3.1 Update Core Dependencies (Except FontAwesome)

**File**: `/home/sassd/src/github/personal-site/package.json`

**Changes to `dependencies`:**

```json
{
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.7.2",
    "@fortawesome/free-brands-svg-icons": "^6.7.2",
    "@fortawesome/free-regular-svg-icons": "^6.7.2",
    "@fortawesome/react-fontawesome": "^0.2.2",
    "@mdx-js/loader": "^3.1.0",
    "@mdx-js/react": "^3.1.0",
    "@next/mdx": "^16.0.6",
    "@next/third-parties": "^16.0.6",
    "@types/mdx": "^2.0.13",
    "dayjs": "^1.11.19",
    "next": "^16.0.6",
    "next-themes": "^0.4.4",
    "react": "^19.2.0",
    "react-burger-menu": "^3.1.0",
    "react-dom": "^19.2.0"
  }
}
```

**Changes to `devDependencies`:**

```json
{
  "devDependencies": {
    "@biomejs/biome": "^2.3.8",
    "@next/bundle-analyzer": "^16.0.6",
    "@swc/core": "^1.15.3",
    "@swc/jest": "^0.2.39",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@types/jest": "^30.0.0",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.7",
    "@types/react-burger-menu": "^2.8.7",
    "@types/react-dom": "^19.2.3",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^30.2.0",
    "jest-environment-jsdom": "^30.2.0",
    "postcss-normalize": "^13.0.1",
    "prettier": "^3.6.2",
    "sass": "^1.94.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.9.3"
  }
}
```

**Changes to `scripts`:**

```json
{
  "scripts": {
    "build": "next build",
    "dev": "TURBOPACK=1 next dev --turbopack",
    "dev:webpack": "next dev",
    "format": "biome format --write . && prettier --write \"**/*.{md,css,scss,mdx}\"",
    "format:check": "biome format . && prettier --check \"**/*.{md,css,scss,mdx}\"",
    "lint": "biome check .",
    "start": "next start",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "type-check": "tsc --noEmit",
    "analyze": "ANALYZE=true npm run build",
    "analyze:server": "BUNDLE_ANALYZE=server npm run analyze",
    "analyze:browser": "BUNDLE_ANALYZE=browser npm run analyze"
  }
}
```

**Testing steps:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Verify all scripts work
npm run type-check
npm run lint
npm run format:check
npm test
npm run dev # Test Turbopack dev server (Ctrl+C to stop)
npm run build
npm start # Test production build (Ctrl+C to stop)
```

**Rollback**:

```bash
git checkout package.json
rm -rf node_modules package-lock.json
npm install
```

---

## Phase 4: Next.js Configuration Update

**Objective**: Merge next.config.ts features while preserving MDX

### 4.1 Update next.config.ts

**File**: `/home/sassd/src/github/personal-site/next.config.ts`

**Complete new configuration:**

```typescript
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // MDX support - PRESERVED
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // Static export configuration
  output: 'export',
  images: {
    unoptimized: true,
  },

  // Sass configuration
  sassOptions: {
    includePaths: ['./src/assets/scss'],
    silenceDeprecations: ['import'],
  },

  // Base path configuration
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,

  // React Strict Mode - PRESERVED
  reactStrictMode: true,

  // Turbopack configuration - ADDED
  turbopack: {
    rules: {},
    resolveExtensions: ['.mdx', '.md', '.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  // Experimental features - ADDED
  experimental: {
    optimizePackageImports: [
      '@fortawesome/react-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
    ],
  },
};

// MDX configuration - PRESERVED
const withMDX = createMDX({
  // Add markdown plugins here
});

// Bundle analyzer - ADDED
// Only apply when not using Turbopack
const withBundleAnalyzer = process.env.TURBOPACK !== '1'
  ? require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  : (config: NextConfig) => config;

// Compose configurations
export default withBundleAnalyzer(withMDX(nextConfig));
```

**Testing steps:**

```bash
# Test builds with different modes
npm run dev # Turbopack mode (Ctrl+C to stop)
npm run dev:webpack # Webpack mode (Ctrl+C to stop)
npm run build # Production build

# Test bundle analyzer
ANALYZE=true npm run build

# Verify MDX still works
mise r b
```

**Rollback**:

```bash
git checkout next.config.ts
```

---

## Phase 5: FontAwesome v6 → v7 Migration

**Objective**: Upgrade FontAwesome with breaking changes handled

### 5.1 Understand Breaking Changes

**FontAwesome v6 → v7 breaking changes:**

1. **Package name for React changed:**
    - v6: `@fortawesome/react-fontawesome` v0.2.x
    - v7: `@fortawesome/react-fontawesome` v3.x

2. **Icon import changes:**
    - Some icons may have been renamed or moved
    - Check official migration guide

3. **Configuration API changes:**
    - May need config updates

4. **TypeScript types:**
    - v7 has improved type safety

### 5.2 Update FontAwesome Dependencies

**File**: `/home/sassd/src/github/personal-site/package.json`

**Update these lines:**

```json
{
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^7.1.0",
    "@fortawesome/free-brands-svg-icons": "^7.1.0",
    "@fortawesome/free-regular-svg-icons": "^7.1.0",
    "@fortawesome/react-fontawesome": "^3.1.0"
  }
}
```

**Install:**

```bash
npm install @fortawesome/fontawesome-svg-core@^7.1.0 \
  @fortawesome/free-brands-svg-icons@^7.1.0 \
  @fortawesome/free-regular-svg-icons@^7.1.0 \
  @fortawesome/react-fontawesome@^3.1.0
```

### 5.3 Audit FontAwesome Usage

**Files using FontAwesome:**

- `/home/sassd/src/github/personal-site/src/components/contact/ContactIcons.tsx`
- `/home/sassd/src/github/personal-site/src/data/contact.tsx`

**Check usage pattern:**

```bash
grep -r "@fortawesome" /home/sassd/src/github/personal-site/src --include="*.tsx" --include="*.ts"
```

### 5.4 Update FontAwesome Imports (If Needed)

**Check each icon import and verify:**

- Icon name still exists in v7
- Import path is correct
- TypeScript types work

**Typical pattern:**

```typescript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
```

### 5.5 Test FontAwesome Components

**Testing steps:**

```bash
# Type check
npm run type-check

# Build
npm run build

# Visual test in dev
npm run dev
# Navigate to pages with icons
# Verify all icons render correctly
# Check browser console for FA warnings
```

**Rollback**:

```bash
# Reinstall v6 packages
npm install @fortawesome/fontawesome-svg-core@^6.7.2 \
  @fortawesome/free-brands-svg-icons@^6.7.2 \
  @fortawesome/free-regular-svg-icons@^6.7.2 \
  @fortawesome/react-fontawesome@^0.2.2
```

---

## Phase 6: CSS & Theme Improvements

**Objective**: Adopt CSS modernizations while preserving dark mode

### 6.1 Update SCSS Structure (Low Risk)

**Files to review and update:**

Compare SCSS files between:

- Current: `/home/sassd/src/github/personal-site/src/assets/scss/`
- Upstream: `/home/sassd/src/github/personal-site-mldangelo/src/static/css/`

**Specific updates:**

1. **Remove vendor prefixes** (if present):
    - Remove `-webkit-`, `-moz-`, `-ms-` prefixes
    - Modern browsers support unprefixed versions
    - PostCSS autoprefixer will handle this

2. **Preserve theme files completely:**
    - `/home/sassd/src/github/personal-site/src/assets/scss/base/_themes.scss` - DO NOT MODIFY
    - `/home/sassd/src/github/personal-site/src/assets/scss/base/_light-dark-theme.scss` - DO NOT MODIFY

3. **Update other SCSS files** with CSS improvements from upstream:
    - Compare component styles
    - Adopt cleaner CSS patterns
    - Keep color variable references

**Testing steps:**

```bash
# Build CSS
npm run build

# Visual regression test
npm run dev
# Navigate all pages
# Toggle dark/light theme
# Verify all colors work
# Check responsive layouts
```

**Rollback**:

```bash
git checkout src/assets/scss/
```

### 6.2 PostCSS Normalize Integration

**Already set up in Phase 1.1**, verify it works:

**Testing:**

```bash
# Build and check for CSS normalize
npm run build
# Check out/_next/static/css/*.css for normalize rules
```

---

## Phase 7: CI/CD Enhancement

**Objective**: Add comprehensive CI while keeping mise integration

### 7.1 Add CI Workflow

**File**: `/home/sassd/src/github/personal-site/.github/workflows/node.js.yml`

**Create new workflow** (adapted from upstream with mise):

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  install:
    name: Install Dependencies
    runs-on: ubuntu-24.04
    timeout-minutes: 5
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Init mise
        uses: jdx/mise-action@v2
        with:
          experimental: true

      - name: Cache node_modules
        id: cache-node-modules
        uses: actions/cache@v4
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-modules-

      - name: Install dependencies
        if: steps.cache-node-modules.outputs.cache-hit != 'true'
        run: mise r ci

  code-quality:
    name: Code Quality
    needs: install
    runs-on: ubuntu-24.04
    timeout-minutes: 5
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Init mise
        uses: jdx/mise-action@v2
        with:
          experimental: true

      - name: Restore node_modules
        uses: actions/cache@v4
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}

      - name: Type Check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Format Check
        run: npm run format:check

  test:
    name: Test
    needs: install
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Init mise
        uses: jdx/mise-action@v2
        with:
          experimental: true

      - name: Restore node_modules
        uses: actions/cache@v4
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}

      - name: Run tests
        run: npm test -- --ci --coverage

      - name: Upload coverage reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/
          retention-days: 7

  build:
    name: Build
    needs: install
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Init mise
        uses: jdx/mise-action@v2
        with:
          experimental: true

      - name: Restore node_modules
        uses: actions/cache@v4
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}

      - name: Build
        run: mise r b
        env:
          NODE_ENV: production
          NEXT_PUBLIC_GOOGLE_ANALYTICS: ${{ secrets.NEXT_PUBLIC_GOOGLE_ANALYTICS }}

      - name: Verify static export
        run: |
          if [ ! -d "out" ]; then
            echo "Error: 'out' directory not found"
            exit 1
          fi
          echo "Build successful: $(find out -type f | wc -l) files"

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: out/
          retention-days: 7

  ci-success:
    name: CI Success
    needs: [code-quality, test, build]
    runs-on: ubuntu-24.04
    if: always()
    steps:
      - name: Check if all jobs succeeded
        run: |
          if [[ "${{ needs.code-quality.result }}" != "success" || 
                "${{ needs.test.result }}" != "success" || 
                "${{ needs.build.result }}" != "success" ]]; then
            echo "One or more jobs failed"
            exit 1
          fi
          echo "All CI checks passed!"
```

### 7.2 Update GitHub Pages Workflow

**File**: `/home/sassd/src/github/personal-site/.github/workflows/github-pages.yml`

**Update with improvements:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    name: Build
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    environment: github-pages
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Init mise
        uses: jdx/mise-action@v2
        with:
          experimental: true

      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          static_site_generator: next

      - name: Cache dependencies
        uses: actions/cache@v4
        with:
          path: |
            ~/.npm
            node_modules
            .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-

      - name: Set Environment Variable for Google Analytics
        run: mise set NEXT_PUBLIC_GOOGLE_ANALYTICS=${{ secrets.NEXT_PUBLIC_GOOGLE_ANALYTICS }}

      - name: Install Dependencies
        run: mise r ci

      - name: Build Project
        run: mise r b
        env:
          NODE_ENV: production

      - name: Verify build output
        run: |
          if [ ! -d "out" ]; then
            echo "Error: 'out' directory not found"
            exit 1
          fi
          echo "Build successful: $(find out -type f | wc -l) files"
          du -sh out/

      - name: Ensure .nojekyll exists
        run: |
          if [ ! -f "out/.nojekyll" ]; then
            touch out/.nojekyll
          fi

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    name: Deploy
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-24.04
    needs: build
    timeout-minutes: 10
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Testing steps:**

```bash
# Push to test branch
git checkout -b test-ci-workflows
git add .github/workflows/
git commit -m "test: Add CI workflows"
git push -u origin test-ci-workflows

# Create PR and watch workflows run
```

**Rollback**: Delete node.js.yml or revert github-pages.yml.

---

## Phase 8: Component Improvements

**Objective**: Adopt better patterns from upstream

### 8.1 Review Skills Component Pattern

**Upstream improvement**: Uses `useReducer` for complex state

**Check for Skills component and consider adopting useReducer pattern**

**Pattern to adopt:**

```typescript
// Instead of multiple useState
const [state1, setState1] = useState();
const [state2, setState2] = useState();

// Use useReducer
type State = { /* ... */ };
type Action = { type: 'ACTION_NAME', payload?: any };

const reducer = (state: State, action: Action): State => {
  switch ( action.type ) {
    case 'ACTION_NAME':
      return { ...state, /* updates */ };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
```

**Testing steps:**

```bash
npm run type-check
npm run build
npm run dev
# Test component interactivity
```

**Rollback**: Revert component changes.

### 8.2 Add Example Tests

**File**: `/home/sassd/src/github/personal-site/src/components/__tests__/ContactIcons.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import ContactIcons from '@/components/contact/ContactIcons';

describe('ContactIcons', () => {
  it('renders contact icons', () => {
    render(<ContactIcons / >);

    const iconList = screen.getByRole('list');
    expect(iconList).toBeInTheDocument();
    expect(iconList).toHaveClass('icons');
  });

  it('renders links with proper attributes', () => {
    render(<ContactIcons / >);

    const links = screen.getAllByRole('link');

    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'nofollow noopener noreferrer');
      expect(link).toHaveAttribute('aria-label');
    });
  });
});
```

**Testing:**

```bash
npm test
mise r t
```

**Rollback**: Delete test files.

---

## Phase 9: Documentation & Polish

**Objective**: Add documentation and final improvements

### 9.1 Add Documentation

**Files to create:**

1. **`/home/sassd/src/github/personal-site/docs/development.md`** - Development guide
2. **`/home/sassd/src/github/personal-site/docs/theme-system.md`** - Theme system documentation
3. **`/home/sassd/src/github/personal-site/TESTING.md`** - Testing guide

See appendix for full content.

### 9.2 Update README

**File**: `/home/sassd/src/github/personal-site/README.md`

**Add sections:**

- Tech Stack
- Development quickstart
- Testing
- Deployment info

### 9.3 Code Formatting Pass

**Run final formatting:**

```bash
# Format all code
mise run format

# Verify formatting
npm run format:check

# Run linter
npm run lint
```

---

## Phase 10: Final Verification

**Objective**: Comprehensive testing before completion

### 10.1 Full Test Suite

**Run all checks:**

```bash
npm run type-check
npm run lint
npm run format:check
npm run test:coverage
npm run build
ANALYZE=true npm run build
npm start # Test production (Ctrl+C to stop)
```

### 10.2 Manual Testing Checklist

- [ ] Dark mode default works
- [ ] Light mode switch works
- [ ] Theme persists on reload
- [ ] All colors correct in both modes
- [ ] All MDX pages render
- [ ] All icons display
- [ ] No browser console errors
- [ ] All pages responsive

### 10.3 CI/CD Verification

**Push to branch and create PR:**

```bash
git checkout -b verify-migration
git add .
git commit -m "feat: Complete upstream migration"
git push -u origin verify-migration
```

**Verify in PR:**

- [ ] CI workflow runs
- [ ] All jobs pass
- [ ] Build succeeds

---

## Emergency Rollback Plan

### Complete Rollback

```bash
# Revert to last working commit
git log --oneline
git revert < commit-hash > --no-commit
git commit -m "revert: Roll back upstream migration"
git push
```

### Partial Rollback

```bash
# Rollback specific files
git checkout HEAD~1 -- package.json
git checkout HEAD~1 -- next.config.ts
npm install
git commit -m "revert: Rollback specific changes"
```

---

## Success Criteria

Migration is successful when:

- [ ] All tests pass
- [ ] CI/CD workflows green
- [ ] Site builds successfully
- [ ] Site deploys to GitHub Pages
- [ ] All pages render correctly
- [ ] Theme system works
- [ ] MDX content renders
- [ ] FontAwesome icons display
- [ ] mise tasks work
- [ ] No console errors

---

## Risk Assessment by Phase

| Phase             | Risk Level | Rollback Difficulty |
|-------------------|------------|---------------------|
| 1: Foundation     | Low        | Easy                |
| 2: Testing        | Low        | Easy                |
| 3: Packages       | Medium     | Moderate            |
| 4: Next.js Config | Medium     | Easy                |
| 5: FontAwesome    | High       | Moderate            |
| 6: CSS            | Low        | Easy                |
| 7: CI/CD          | Low        | Easy                |
| 8: Components     | Low        | Easy                |
| 9: Docs           | Low        | Easy                |
| 10: Verification  | Low        | N/A                 |

**Highest risk**: Phase 5 (FontAwesome v7)

---

## Timeline Estimate

**Total: 8-12 hours**

- Phase 1: 30 min
- Phase 2: 45 min
- Phase 3: 1 hour
- Phase 4: 30 min
- Phase 5: 2-3 hours
- Phase 6: 1-2 hours
- Phase 7: 1 hour
- Phase 8: 1-2 hours
- Phase 9: 1 hour
- Phase 10: 1-2 hours

**Recommended**: Complete in 4 sessions over 2-4 days

---

## Critical Files Modified Summary

**Configuration:**

- `biome.json` - NEW
- `.gitattributes` - NEW
- `postcss.config.js` - NEW
- `.gitignore` - MODIFIED
- `tsconfig.json` - MODIFIED
- `package.json` - MODIFIED
- `next.config.ts` - MODIFIED
- `mise.toml` - MODIFIED

**Testing:**

- `jest.config.ts` - NEW
- `jest.setup.ts` - NEW
- `src/components/__tests__/` - NEW

**CI/CD:**

- `.github/workflows/node.js.yml` - NEW
- `.github/workflows/github-pages.yml` - MODIFIED
- `.github/dependabot.yml` - NEW

**Documentation:**

- `docs/development.md` - NEW
- `docs/theme-system.md` - NEW
- `TESTING.md` - NEW
- `README.md` - MODIFIED

**Preserved (NO changes):**

- `mise-tasks/` - PRESERVED
- `src/assets/scss/base/_themes.scss` - PRESERVED
- `src/assets/scss/base/_light-dark-theme.scss` - PRESERVED
- `src/components/template/ThemeSwitch.tsx` - PRESERVED

---
