# shared-design Specification

## Purpose

Eigene Kopie der ecke.lt-Designsprache (Tokens, Fonts) sowie Navigation und Footer mit Verweisen auf die anderen ecke.lt-Seiten. Ist-Zustand zu Commit `c8304618a6c84a595d80744ebb581a10bc3e773e` (Landscape-Inventur 2026-09-27); Fundstellen `[datei:zeile]` beziehen sich auf diesen Commit.

## Requirements

### Requirement: Design-Tokens
Das System SHALL Farben, Schriften, Layout-Werte und die Badge-Palette als CSS-Custom-Properties aus `src/styles/tokens.css` bereitstellen, mit eigener Palette für `prefers-color-scheme: dark` [src/styles/tokens.css:37-107; src/styles/global.css:4; src/layouts/BaseLayout.astro:2].

#### Scenario: Dunkles Farbschema
- **WHEN** der Browser `prefers-color-scheme: dark` meldet
- **THEN** gelten die Werte aus dem Dark-Block, einschließlich der Badge-Farben [src/styles/tokens.css:80-105]

### Requirement: Selbst gehostete Fonts
Das System SHALL die Schriften Bricolage Grotesque und DM Sans aus `/fonts/` des Blogs selbst laden [src/styles/tokens.css:13-35; public/fonts/bricolage-grotesque.woff2; public/fonts/dm-sans.woff2].

#### Scenario: Font-Laden
- **WHEN** eine Seite gerendert wird
- **THEN** lädt der Browser `/fonts/bricolage-grotesque.woff2` und `/fonts/dm-sans.woff2` von blog.ecke.lt [src/styles/tokens.css:19; src/styles/tokens.css:30]

### Requirement: Navigation und Footer
Das System SHALL im Kopf Links auf „Blog“ (`/`), „Profil“ (`https://nils.ecke.lt`) und „Termin buchen“ (`https://book.ecke.lt/30min`) zeigen und im Footer auf Impressum und Datenschutz von nils.ecke.lt verlinken [src/consts.ts:5-11; src/components/Header.astro:9-20; src/components/Footer.astro:21-25].

#### Scenario: Rechtstexte
- **WHEN** jemand im Footer auf „Impressum“ oder „Datenschutz“ klickt
- **THEN** führt der Link zu `https://nils.ecke.lt/impressum/` bzw. `https://nils.ecke.lt/datenschutz/` [src/components/Footer.astro:23-25; src/consts.ts:5]
