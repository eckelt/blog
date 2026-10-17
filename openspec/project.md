# blog – Projektkontext

- **Produkt:** blog [landscape:inventory/raw/blog.yaml:1]
- **Repo:** git@github.com:eckelt/blog.git, Branch `main` [landscape:inventory/raw/blog.yaml:2-4]
- **Stand der Aussagen:** Commit `c8304618a6c84a595d80744ebb581a10bc3e773e` [landscape:inventory/raw/blog.yaml:3], aufgenommen am 2026-09-27
- **managed:** `oneshot` (einmalige Ist-Aufnahme von Hand, kein automatischer Abgleich)
- **Architektur-Manifest:** `twin.json` (Schema: ecke-lt-landscape `schema/manifest.v4.schema.json`, v4)

Alle Fundstellen `[datei:zeile]` beziehen sich auf den genannten Commit und sind relativ zum Repo-Root. `[landscape:…]` verweist auf das Repo ecke-lt-landscape. Konventionen: `landscape:CONVENTIONS.md`.

## Capabilities

| Capability | Spec |
|---|---|
| posts | `openspec/specs/posts/spec.md` |
| feeds-seo | `openspec/specs/feeds-seo/spec.md` |
| shared-design | `openspec/specs/shared-design/spec.md` |
| deploy | `openspec/specs/deploy/spec.md` |

## Zweck

blog.ecke.lt ist der persönliche Blog von Nils Eckelt mit Notizen zu Agentic Product Development, Engineering Transformation und Cloud [README.md:1-3; src/consts.ts:1-4].
Beiträge werden als Markdown-Dateien im Repo geschrieben und mit Astro zu einer rein statischen Website gebaut, inklusive Übersicht, Beitragsseiten, RSS-Feed und Sitemap [README.md:19-39; package.json:6-10; astro.config.mjs:8-15].
Ausgeliefert wird die fertige Website von einem Cloudflare Worker mit Static Assets unter blog.ecke.lt, der von Hand deployt wird [wrangler.jsonc:1-7; landscape:inventory/overlay.yaml:19-34; landscape:landscape.yaml:35-39].

## Schnittstellen

### Angeboten

| Schnittstelle | Inhalt | contractRef | Beleg |
|---|---|---|---|
| Website | `https://blog.ecke.lt/` (Übersicht), `/blog/<dateiname>/` (Beiträge), HTML | `blog:site@1` | [astro.config.mjs:9; src/pages/index.astro:1-37; src/pages/blog/[...slug].astro:6-12; README.md:37] |
| RSS-Feed | `/rss.xml` | Teil von `blog:site@1` | [src/pages/rss.xml.js:5-20; src/components/BaseHead.astro:23-28] |
| Sitemap, robots | `/sitemap-index.xml`, `/robots.txt` | Teil von `blog:site@1` | [astro.config.mjs:10; public/robots.txt:1-4] |
| Statische Dateien | `/favicon-32.png`, `/apple-touch-icon.png`, `/ne.svg` | Teil von `blog:site@1` | [src/components/BaseHead.astro:21-24] |

Bekannter Nutzer: nils.ecke.lt verlinkt auf blog.ecke.lt [landscape:inventory/raw/nils.ecke.lt.yaml:64-66].

### Genutzt

| Schnittstelle | Anbieter | contractRef | Beleg |
|---|---|---|---|
| Profilseite `https://nils.ecke.lt` sowie `/impressum/` und `/datenschutz/` (Links) | nils.ecke.lt | `nils.ecke.lt:site@1` | [src/consts.ts:5; src/consts.ts:9; src/components/Footer.astro:23-25] |
| Buchungsseite `https://book.ecke.lt/30min` (Link) | booking | `booking:booking-page@1` | [src/consts.ts:10] |
| Worker mit Static Assets (Hosting) | Cloudflare | `cloudflare-workers:static-assets@1` | [wrangler.jsonc:1-7; landscape:inventory/raw/cloudflare.yaml:32-39] |
| Design-System-Stylesheet `https://ecke-design-system.pages.dev/v1/styles.css` (Tokens, Schriften, Grundstile) | ecke-design-system | `ecke-design-system:styles@1` | [src/components/BaseHead.astro:20] |
| Mermaid-Adapter `https://ecke-design-system.pages.dev/v1/mermaid.js` (nur Beiträge mit Diagramm) | ecke-design-system | `ecke-design-system:mermaid@1` | [src/layouts/PostLayout.astro:25; src/layouts/PostLayout.astro:56-60] |

## Datenflüsse

1. **Schreiben:** Beiträge liegen als Markdown mit Frontmatter (`title`, `description`, `pubDate`, `updatedDate`, `tags`, `draft`) unter `src/content/blog/` [README.md:19-39; src/content.config.ts:4-14].
2. **Build:** `npm run build` (`astro build`) erzeugt statisches HTML, RSS und Sitemap in `./dist` [package.json:8; README.md:13; astro.config.mjs:10]. Nur Beiträge ohne `draft` und mit `pubDate` in der Vergangenheit werden gebaut [src/utils/posts.ts:14-20].
3. **Deploy:** `wrangler.jsonc` beschreibt den Worker `blog`, der das Verzeichnis `./dist` als Static Assets ausliefert [wrangler.jsonc:1-7]. Es gibt kein CI und keine Workers Builds; deployt wird manuell [landscape:landscape.yaml:39; landscape:inventory/raw/cloudflare.yaml:32-39]. Der genaue Befehl ist im Repo nicht dokumentiert (siehe Offene Fragen).
4. **Seitenabruf:** Der Browser lädt HTML, CSS, Fonts und Bilder vom Worker `blog` über die Custom Domain blog.ecke.lt [landscape:inventory/overlay.yaml:27-34]. Das Design-System-Stylesheet kommt von ecke-design-system.pages.dev; `v1/mermaid.js` wird nur auf Beitragsseiten mit Diagramm nachgeladen und rendert im Browser [src/components/BaseHead.astro:20; src/layouts/PostLayout.astro:56-60; README.md:54-60].
5. **Weiterleitungen:** Navigation und Footer verlinken auf nils.ecke.lt (Profil, Impressum, Datenschutz) und book.ecke.lt/30min; der Blog sendet selbst keine Daten [src/consts.ts:7-11; src/components/Footer.astro:21-25].

## Abhängigkeiten

### Intern

| Produkt | Art | Beleg |
|---|---|---|
| nils.ecke.lt | Linkziel (Profil, Impressum, Datenschutz) | [src/consts.ts:5; src/components/Footer.astro:23-25; landscape:inventory/raw/blog.yaml:64-66] |
| booking | Linkziel `/30min` | [src/consts.ts:10; landscape:inventory/raw/blog.yaml:67-69] |

### Extern

| Anbieter | Rolle | Beleg |
|---|---|---|
| Cloudflare (Workers) | Hosting: Worker `blog` mit Static Assets, Custom Domain blog.ecke.lt; keine Bindings, keine Secrets | [wrangler.jsonc:1-7; landscape:inventory/raw/cloudflare.yaml:32-39; landscape:inventory/overlay.yaml:19-34] |
| npm-Pakete | Build-Zeit: `astro`, `@astrojs/rss`, `@astrojs/sitemap`, `unist-util-visit` | [package.json:12-18] |

## Bekannte Lücken

- **Deploy-Befehl nicht im Repo:** `package.json` hat kein Deploy-Skript und `wrangler` ist keine Abhängigkeit [package.json:6-18].
- **Geplante Beiträge erscheinen erst nach neuem Build:** Ein Beitrag mit `pubDate` in der Zukunft wird erst sichtbar, wenn nach diesem Datum neu gebaut und (manuell) deployt wird [src/utils/posts.ts:10-12].

## Offene Fragen

- Mit welchem Befehl wird deployt (vermutlich `wrangler deploy` nach `npm run build`), von welchem Rechner und mit welcher Wrangler-Version?
- Ist blog.ecke.lt zusätzlich über `workers.dev` erreichbar, und ist das gewollt? Das Inventar meldet `workers_dev: true`.
- Deckt die Datenschutzerklärung auf nils.ecke.lt blog.ecke.lt und das Hosting auf Cloudflare Workers ab?
- `v1/mermaid.js` lädt das Mermaid-Modul zur Laufzeit von cdn.jsdelivr.net; das ist ein Ladepfad des Design-Systems, nicht des Blogs.
