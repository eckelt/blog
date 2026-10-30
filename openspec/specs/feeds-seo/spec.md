# feeds-seo Specification

## Purpose

RSS-Feed, Sitemap, robots.txt und Meta-Tags für Suchmaschinen und Link-Vorschauen. Ist-Zustand zu Commit `74b5352f1b3747e7db1960d6d411bdd6f038681c` (Landscape-Inventur 2026-09-27).

## Requirements

### Requirement: RSS-Feed
Das System SHALL unter `/rss.xml` einen RSS-Feed mit Titel, Beschreibung, Datum und Link `/blog/<id>/` jedes veröffentlichten Beitrags und der Sprache `de-de` ausliefern.

#### Scenario: Feed-Verweis im Kopf
- **WHEN** eine Seite geladen wird
- **THEN** enthält ihr Kopf einen `<link rel="alternate" type="application/rss+xml">` auf `rss.xml`

### Requirement: Sitemap und robots.txt
Das System SHALL mit `@astrojs/sitemap` eine Sitemap für die Site `https://blog.ecke.lt` erzeugen und in `/robots.txt` allen Crawlern alles erlauben und auf `/sitemap-index.xml` verweisen.

#### Scenario: Crawler
- **WHEN** ein Crawler `/robots.txt` abruft
- **THEN** erhält er `Allow: /` und die Sitemap-URL

### Requirement: Meta-Tags
Das System SHALL auf jeder Seite Titel, Beschreibung, Canonical-URL, Open-Graph-Tags (Locale `de_DE`) und Twitter-Card-Tags setzen.

#### Scenario: Beitragsseite
- **WHEN** eine Beitragsseite gerendert wird
- **THEN** lautet der Titel „<Beitragstitel> · Blog · Nils Eckelt“ und `og:type` ist `article`
