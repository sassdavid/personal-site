# Adapting this Website

If you'd like to adapt this website for your own use, this guide will help you get started. If you find a bug, please submit a pull request or open an issue.

You may wish to fork this repository or remove my remote origin and add your own. Go [here](https://help.github.com/articles/changing-a-remote-s-url/) for more information on how to change remotes.

## Before you start

1. Make sure you have a good text editor. I recommend [Visual Studio Code](https://code.visualstudio.com/).
2. Review the project structure. This is a Next.js 16 app using the App Router. Pages are defined in the `src/app/` directory. If you wish to add or remove a page, you should do so there.
3. (Optional but recommended) Install [mise](https://mise.jdx.dev/) for tool version management. Alternatively, ensure you have Node.js >= v22.

## Checklist

### Setup

1. Run the project before making any modifications by following the setup instructions in the main [README.md](https://github.com/sassdavid/personal-site#-setup-and-running).

2. Create a `.env.local` file. To do this, run:

   ```bash
   cp .env.example .env.local
   ```

   and set values as appropriate. Most people will only need to update the Google Analytics tracking ID (`NEXT_PUBLIC_GA_TRACKING_ID`).

### Adapt Content

I recommend keeping the project running as you go (with `npm run dev`) to help correct mistakes quickly.

1. Start by changing text in the sidebar. This file is located at `src/components/template/SideBar.tsx`.
2. Add an image of yourself in `public/me.jpg`. Your image should be approximately 256 x 256 pixels. Larger and smaller is ok, but avoid very large images to save bandwidth. If you need help resizing your image, Adobe makes a great online tool [here](https://www.adobe.com/photoshop/online/resize-image.html).
3. Modify the text on the homepage. This file is located at `src/app/page.tsx`.
4. Modify the files in `src/data/resume/` next.
5. Modify all of the other files in the `src/data/` directory.
6. You've finished modifying >95% of the pages. Search through the rest of the files for references to `David` or `Sass` and change values to your name.
7. Change or remove the favicon in `public/favicon.ico` and images in `public/images/favicon/`. [This](https://realfavicongenerator.net/) website may be helpful.

### Deploy

See deployment instructions [here](https://github.com/sassdavid/personal-site#deploying-to-github-pages). If you plan to use a custom url, modify `public/CNAME` and enter your URL. You can run:

```bash
echo "[your-custom-domain][.com]" > public/CNAME
```

as a shortcut.

I recommend purchasing your own domain name from [Google Domains](https://domains.google.com) or [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/). The project is pre-configured to automatically deploy to GitHub Pages via the deploy GitHub Action. Go to `https://github.com/[your-github-username]/[your-repo-name]/settings` and configure accordingly:

<center><img src="images/gh-pages.png"></center>

Next, configure your domain's DNS record. See [here](https://help.github.com/articles/using-a-custom-domain-with-github-pages/) for more information. After a few minutes, your website should be live on your domain.

That's it. Thank you for reading. If you go through this guide and run into issues or areas you find unclear, please consider submitting a PR to help others like you.

## Common Pitfalls

Here are answers to questions I've been asked at least twice. I've attempted to simplify development and improve documentation throughout the project to address them. This section is updated frequently.

1. **My CSS isn't rendering, or I see a 404 instead of my site:**

   Make sure the `.nojekyll` file exists in `public/`. This file directs GitHub to not attempt to render the website with Jekyll. If you're using a custom domain, ensure your `CNAME` file is correct. If neither of these work, please open an issue.

2. **LF / CRLF issues with Biome:**

   This is a common Windows development pitfall. Biome should handle line endings automatically, but if you encounter issues, run:
   ```bash
   npm run format
   ```

3. **master / main:**

   GitHub renamed the default branch from master to main. See their reasoning [here](https://github.com/github/renaming). If you're trying to pull in recent changes, consider renaming your own branch, or just create a merge commit.

4. **Google Analytics warnings when building:**

   Either set up Google Analytics 4 (set `NEXT_PUBLIC_GA_TRACKING_ID` in `.env.local` or as a GitHub repository variable) or remove the `<GoogleAnalytics />` component from `src/app/layout.tsx`. The site now uses the official `@next/third-parties` package for GA4 integration.

5. **How do I configure git? What is nano?**

   Read through [git-scm](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)'s excellent documentation. I recommend setting your default text editor to something you're comfortable with.

6. **Can I host at [username.github.io]?**

   Sure, see GitHub's documentation [here](https://pages.github.com/).

7. **How do I disable Biome?**

   I really don't recommend it. Linters are good. They help prevent errors, enforce uniform style so that you can spend less time thinking about formatting and more time reading code, and eliminate easy nits for code reviews. If the rules aren't working for you, you should change them in `biome.json`. See Biome's documentation [here](https://biomejs.dev/) for more information.

8. **Why is my website rendering the README file?**

   See 1. above and make sure that `.nojekyll` still exists in `public/`. This file directs GitHub to not attempt to render the website with Jekyll.

9. **What is mise and do I need it?**

   [mise](https://mise.jdx.dev/) is a tool version manager and task runner. It's optional but recommended. If you prefer not to use it, you can run standard npm commands directly. The main benefit is automatic tool version management and convenient task aliases.

10. **TypeScript errors during build:**

    Run type checking locally:
    ```bash
    npm run type-check
    ```
    Fix any errors before deploying.
