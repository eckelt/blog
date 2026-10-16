# blog.ecke.lt

Persönlicher Blog von Nils Eckelt — gebaut mit [Astro](https://astro.build),
gehostet als **Cloudflare Worker** mit Static Assets. Teilt sich die Designsprache mit
[nils.ecke.lt](https://nils.ecke.lt) (Profil) und
[book.ecke.lt](https://book.ecke.lt) (Buchung).

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # statischer Output nach ./dist
npm run preview  # gebauten Output lokal ansehen
```

Node 22 (siehe `.nvmrc`).

## Einen Beitrag schreiben

Neue Markdown-Datei unter `src/content/blog/` anlegen, z. B.
`src/content/blog/2026-07-15-mein-thema.md`:

```markdown
---
title: "Titel des Beitrags"
description: "Ein bis zwei Sätze für Übersicht, OG-Tags und RSS."
pubDate: 2026-07-15
# updatedDate: 2026-07-20   # optional
tags: ["Cloud", "Agentic"]   # optional
draft: false                 # true = wird nicht veröffentlicht
---

Inhalt als Markdown …
```

Der Dateiname (ohne `.md`) wird zur URL: `/blog/2026-07-15-mein-thema/`.
Übersicht, Beitragsseite, Sitemap und RSS-Feed (`/rss.xml`) entstehen
automatisch.

### Mermaid-Diagramme

Ein Code-Block mit Sprache `mermaid` wird automatisch als Diagramm gerendert:

````markdown
```mermaid
flowchart LR
    A[Idee] --> B{Sinnvoll?}
    B -->|ja| C[Bauen]
    B -->|nein| A
```
````

Das Rendering passiert **client-seitig** und liest die Design-Tokens live aus —
Diagramme nutzen also dieselben Farben/Schriften wie die Seite und schalten
automatisch zwischen Light/Dark um (siehe `src/scripts/mermaid.ts`). Mermaid
wird nur auf Seiten geladen, die tatsächlich ein Diagramm enthalten, und ist
damit ohne Build-Browser lauffähig.

## Deployment (Cloudflare Worker mit Static Assets)

Ausgeliefert wird `blog.ecke.lt` von einem Cloudflare **Worker** namens `blog`,
der das Build-Verzeichnis `./dist` als Static Assets ausliefert
(`wrangler.jsonc`). Es gibt kein Pages-Projekt, keine Git-Integration und
kein CI: Ein `git push` deployt **nicht**.

Deploy von Hand:

```sh
npm run build
npx wrangler deploy
```

## Design Library

Die gemeinsame Designsprache liegt **framework-frei** in
[`src/styles/tokens.css`](src/styles/tokens.css): alle CSS-Custom-Properties
(Farben für Light/Dark, Typo, Layout, Badge-Palette) plus die `@font-face`-
Deklarationen. Die beiden Fonts liegen in `public/fonts/`.

Das ist die **kanonische Quelle der Designsprache** für alle drei Seiten. Sie
ist bewusst portierbar gehalten:

- **Profil (statisches HTML auf Fastmail):** `tokens.css` einbinden bzw. die
  Variablen daraus übernehmen.
- **Booking (CSS-in-Worker):** denselben `:root`-Block verwenden.

> Bewusst **keine** publizierte npm-Package: Profil hat keinen Build-Schritt
> und Booking rendert CSS als String im Worker — eine Paket-Abhängigkeit dort
> einzuziehen wäre unverhältnismäßig. Sollten beide später einen Build-Schritt
> bekommen, lässt sich `tokens.css` + `public/fonts/` ohne Änderung in ein
> Paket `@eckelt/ui` heben, das alle drei konsumieren.

## Struktur

```
public/
  fonts/            geteilte woff2-Fonts (Bricolage Grotesque, DM Sans)
  favicon-32.png, apple-touch-icon.png, ne.svg
src/
  styles/
    tokens.css      ← Design Library (kanonisch, framework-frei)
    global.css      Basis-Elemente + Prose, baut auf tokens.css
  components/        BaseHead, Header, Footer, FormattedDate
  layouts/           BaseLayout, PostLayout
  content/blog/      die Beiträge (Markdown)
  pages/             index (Übersicht), blog/[...slug], rss.xml
  content.config.ts  Schema der Blog-Collection
  consts.ts          Site-Metadaten + Navigation
```
