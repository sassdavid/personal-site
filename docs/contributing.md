# How to Contribute

Contributions are encouraged. Please feel free to get in touch, take a look at the [roadmap](./roadmap.md), or open a PR.

## Guidelines

Here are a few recommendations to land PRs quickly:

- Small PRs are better than large PRs. If you do two unrelated things, split your changes into two PRs.
- Review the [design goals](./design-goals.md).
- Respect the [Contributor Covenant](https://www.contributor-covenant.org/).

## Preparing a Pull Request

1. **Write a good summary** in your PR description:
   - Concisely explain your changes.
   - Justify why your changes are important.
   - Explain how to test your change (if not obvious).

2. **Make sure everything runs:**
   ```bash
   npm run type-check  # TypeScript validation
   npm run lint        # Biome linting
   npm test            # Run Jest tests
   npm run build       # Verify production build works
   ```

3. **Write tests** (if appropriate).

4. **Self-review your branch:**
   - Run `npm run format` to auto-fix formatting.
   - Use TypeScript properly - avoid `any` types where possible.
   - Add comments where appropriate and if things are unclear. Comments should help ensure others not familiar with the problem you're solving will understand your code months or years from now.
   - Minimize perceptual changes in files that are not relevant to your feature. Remove any extra whitespaces in other files that were added by mistake.
   - Remove anything unnecessary. Remove extra print statements, commented out blocks of code, unused variables, etc.
   - Check your spelling.

## Development Environment

This project uses [mise](https://mise.jdx.dev/) for tool version management (optional). If you have mise installed, it will automatically use the correct Node.js version. Otherwise, ensure you have Node.js >= v22.

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Code Style

- **Biome** for linting and formatting (TypeScript/JavaScript)
- **Prettier** for formatting (Markdown, SCSS, YAML)
- **TypeScript** strict mode
- **Functional React components** with hooks
- **SCSS** with modern `@use`/`@forward` (not deprecated `@import`)

## References

- [Google Engineering Practices](https://github.com/google/eng-practices) (Recommended Reading)
- [Contributor Covenant](https://www.contributor-covenant.org/)
