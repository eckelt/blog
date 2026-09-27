# feeds-seo Specification

## Purpose

RSS-Feed, Sitemap, robots.txt und Meta-Tags für Suchmaschinen und Link-Vorschauen. Ist-Zustand zu Commit `c8304618a6c84a595d80744ebb581a10bc3e773e` (Landscape-Inventur 2026-09-27); Fundstellen `[datei:zeile]` beziehen sich auf diesen Commit.

## Requirements

### Requirement: RSS-Feed
Das System SHALL unter `/rss.xml` einen RSS-Feed mit Titel, Beschreibung, Datum und Link `/blog/<id>/` jedes veröffentlichten Beitrags und der Sprache `de-de` ausliefern [src/pages/rss.xml.js:5-20].

#### Scenario: Feed-Verweis im Kopf
- **WHEN** eine Seite geladen wird
- **THEN** enthält ihr Kopf einen `<link rel="alternate" type="application/rss+xml">` auf `rss.xml` [src/components/BaseHead.astro:23-28]

### Requirement: Sitemap und robots.txt
Das System SHALL mit `@astrojs/sitemap` eine Sitemap für die Site `https://blog.ecke.lt` erzeugen und in `/robots.txt` allen Crawlern alles erlauben und auf `/sitemap-index.xml` verweisen [astro.config.mjs:9-10; public/robots.txt:1-4; src/components/BaseHead.astro:22].

#### Scenario: Crawler
- **WHEN** ein Crawler `/robots.txt` abruft
- **THEN** erhält er `Allow: /` und die Sitemap-URL [public/robots.txt:1-4]

### Requirement: Meta-Tags
Das System SHALL auf jeder Seite Titel, Beschreibung, Canonical-URL, Open-Graph-Tags (Locale `de_DE`) und Twitter-Card-Tags setzen [src/components/BaseHead.astro:29-45].

#### Scenario: Beitragsseite
- **WHEN** eine Beitragsseite gerendert wird
- **THEN** lautet der Titel „<Beitragstitel> · Blog · Nils Eckelt“ und `og:type` ist `article` [src/components/BaseHead.astro:14; src/layouts/PostLayout.astro:25; src/consts.ts:1]
