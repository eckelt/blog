# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal blog (blog.ecke.lt), built with Astro 5 as a fully static site, deployed on Cloudflare Pages (`git push` to `main` triggers build + deploy). Site language is German. Node 22 (`.nvmrc`).

## Commands

```bash
npm run dev      # dev server at http://localhost:4321
npm run build    # static build to ./dist
npm run preview  # serve the built output locally
```

There are no tests and no linter configured.

## Architecture

### Content pipeline

- Posts are Markdown files in `src/content/blog/`; the filename (minus `.md`) becomes the URL slug (`/blog/<filename>/`). Schema lives in `src/content.config.ts` (title, description, optional pubDate/updatedDate, tags, draft).
- **Publishing gate** (`src/utils/posts.ts`): a post is live only if `draft: false` AND `pubDate` exists and lies in the past. All listings, routes, and RSS go through `getPublishedPosts()` — use it instead of `getCollection()` directly. Because the build is static, a future `pubDate` only takes effect after a rebuild.
- Routes: `src/pages/index.astro` (listing), `src/pages/blog/[...slug].astro` (post via `PostLayout`), `src/pages/rss.xml.js` (feed). Sitemap comes from the `@astrojs/sitemap` integration.

### Markdown plugins (`src/plugins/`, wired in `astro.config.mjs`)

- `remark-mermaid.mjs`: converts ` ```mermaid ` fences into raw `<pre class="mermaid">` **before Shiki** would highlight them, so the diagram source survives for the client.
- `rehype-table-scroll.mjs`: wraps tables in `.table-scroll` divs for horizontal scrolling.

### Mermaid rendering (client-side, `src/scripts/mermaid.ts`)

Diagrams render in the browser, not at build time (no headless browser needed on Cloudflare Pages). The renderer reads live CSS custom properties via `getComputedStyle`, so diagrams inherit the site's colors/fonts and switch light/dark automatically. `PostLayout.astro` lazy-loads the script only on posts that contain a `pre.mermaid`, and waits for the window `load` event — otherwise `getComputedStyle` races the stylesheet fetch and Mermaid silently falls back to its default purple theme.

### Design system (shared across three sites)

`src/styles/tokens.css` is the **canonical, framework-free design library** shared with nils.ecke.lt (static HTML) and book.ecke.lt (CSS-in-Worker). It holds all CSS custom properties (light/dark colors, typography, layout, categorical badge palette) plus `@font-face` declarations; fonts live in `public/fonts/`. Keep it portable — no Astro- or blog-specific rules in there. Deliberately not published as an npm package (the sibling sites have no build step). `src/styles/global.css` builds base elements + prose styles on top of it.

### Tag → badge → diagram accent

`PostLayout.astro` maps freeform post tags onto the shared badge palette via the `TAG_BADGE` record (unknown tags fall back to `cloud`). The first tag of a post sets `--diagram-accent` / `--diagram-accent-bg` on the article, which Mermaid diagrams pick up — new tag categories need an entry there to get the right color.

### Site metadata

`src/consts.ts` holds site title/description/URL and the header navigation (links out to profile and booking sites).
