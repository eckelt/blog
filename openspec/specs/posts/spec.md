# posts Specification

## Purpose

Beiträge als Markdown schreiben, veröffentlichen und als Übersicht und Einzelseite anzeigen. Ist-Zustand zu Commit `c8304618a6c84a595d80744ebb581a10bc3e773e` (Landscape-Inventur 2026-09-27); Fundstellen `[datei:zeile]` beziehen sich auf diesen Commit.

## Requirements

### Requirement: Beitragsschema
Das System SHALL Beiträge aus `src/content/blog/**/*.{md,mdx}` laden und im Frontmatter `title` und `description` verlangen sowie optional `pubDate`, `updatedDate`, `tags` (Standard leer) und `draft` (Standard `false`) akzeptieren [src/content.config.ts:4-14].

#### Scenario: Pflichtfeld fehlt
- **WHEN** ein Beitrag kein `title` oder keine `description` hat
- **THEN** entspricht er nicht dem Schema der Collection `blog` [src/content.config.ts:6-8]

### Requirement: Veröffentlichungsregel
Das System SHALL einen Beitrag nur veröffentlichen, wenn er kein Entwurf ist und sein `pubDate` gesetzt ist und nicht in der Zukunft liegt, gemessen zum Build-Zeitpunkt [src/utils/posts.ts:14-20].

#### Scenario: Entwurf oder fehlendes Datum
- **WHEN** ein Beitrag `draft: true` hat oder kein `pubDate`
- **THEN** erscheint er weder in der Übersicht noch im RSS-Feed, und es wird keine Seite für ihn gebaut [src/utils/posts.ts:3-9; src/pages/index.astro:6; src/pages/rss.xml.js:6; src/pages/blog/[...slug].astro:6-12]

#### Scenario: Datum in der Zukunft
- **WHEN** `pubDate` nach dem Build-Zeitpunkt liegt
- **THEN** bleibt der Beitrag unveröffentlicht, bis nach diesem Datum neu gebaut wird [src/utils/posts.ts:10-12; src/utils/posts.ts:19]

### Requirement: Übersicht
Das System SHALL unter `/` alle veröffentlichten Beiträge absteigend nach `pubDate` mit Datum, Titel und Beschreibung auflisten [src/pages/index.astro:6-31; src/utils/posts.ts:21-23].

#### Scenario: Keine Beiträge
- **WHEN** kein Beitrag veröffentlicht ist
- **THEN** zeigt die Übersicht „Noch keine Beiträge — bald geht's los.“ [src/pages/index.astro:32-36]

### Requirement: Beitragsseite
Das System SHALL jeden veröffentlichten Beitrag unter `/blog/<id>/` rendern, wobei die id aus dem Dateinamen ohne Endung entsteht, mit Datum (de-DE), optionalem Aktualisierungsdatum, Titel und Tags [src/pages/blog/[...slug].astro:6-20; README.md:37; src/layouts/PostLayout.astro:28-47; src/components/FormattedDate.astro:6-13].

#### Scenario: Tag-Farbe
- **WHEN** ein Beitrag Tags hat
- **THEN** bekommt jeder Tag eine Badge-Farbe aus einer festen Zuordnung (`AI`, `Hackers&Wizards` → ai, `Software Factory` → arch, sonst cloud), und der erste Tag bestimmt die Akzentfarbe der Diagramme [src/layouts/PostLayout.astro:13-23; src/layouts/PostLayout.astro:28]

### Requirement: Markdown-Erweiterungen
Das System SHALL Code-Blöcke mit Sprache `mermaid` als `<pre class="mermaid">` ausgeben und Tabellen in ein `div.table-scroll` einpacken. Diagramme SHALL der Mermaid-Adapter des Design-Systems (`https://design.ecke.lt/v1/mermaid.js`, `ecke-design-system:mermaid@1`) rendern; die Akzentfarbe des Beitrags SHALL der Blog als `--diagram-accent` setzen.

#### Scenario: Seite mit Diagramm
- **WHEN** eine Beitragsseite ein `pre.mermaid` enthält
- **THEN** lädt der Browser `/v1/mermaid.js` des Design-Systems, das mit den Design-Tokens und der Akzentfarbe des ersten Tags rendert und beim Wechsel zwischen hellem und dunklem Farbschema neu rendert

#### Scenario: Seite ohne Diagramm
- **WHEN** eine Seite kein `pre.mermaid` enthält
- **THEN** wird kein Mermaid-Skript geladen
