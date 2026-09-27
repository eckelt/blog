# deploy Specification

## Purpose

Build der statischen Website und Auslieferung über einen Cloudflare Worker mit Static Assets. Ist-Zustand zu Commit `c8304618a6c84a595d80744ebb581a10bc3e773e` (Landscape-Inventur 2026-09-27); Fundstellen `[datei:zeile]` beziehen sich auf diesen Commit.

## Requirements

### Requirement: Statischer Build
Das System SHALL mit `npm run build` (`astro build`) die Website als statische Dateien nach `./dist` bauen; vorgesehen ist Node 22 [package.json:6-10; README.md:13; README.md:17; .nvmrc:1].

#### Scenario: Build-Ausgabe
- **WHEN** `npm run build` läuft
- **THEN** liegt die Website in `./dist`, das nicht versioniert wird [README.md:13; .gitignore:1-2]

### Requirement: Auslieferung über Worker mit Static Assets
Das System SHALL als Cloudflare Worker `blog` den Inhalt von `./dist` als Static Assets ausliefern, ohne eigenen Worker-Code, ohne Bindings und ohne Secrets, unter der Custom Domain blog.ecke.lt [wrangler.jsonc:1-7; landscape:inventory/raw/cloudflare.yaml:32-39; landscape:inventory/overlay.yaml:19-34].

#### Scenario: Kein Pages-Projekt
- **WHEN** die Cloudflare-Konfiguration geprüft wird
- **THEN** gibt es den Worker `blog`, aber kein Pages-Projekt `blog`; die Pages-Anleitung in der README gilt nicht [landscape:inventory/overlay.yaml:22-29; landscape:inventory/overlay.yaml:119-127]

### Requirement: Manueller Deploy
Das System SHALL nur durch einen manuellen Deploy aktualisiert werden: Es gibt kein CI im Repo und keine Workers Builds [landscape:landscape.yaml:35-39; landscape:inventory/raw/cloudflare.yaml:36; landscape:inventory/raw/cloudflare.yaml:157].

#### Scenario: Push auf main
- **WHEN** ein Commit auf `main` gepusht wird
- **THEN** wird nichts gebaut oder deployt [landscape:landscape.yaml:39; landscape:inventory/raw/cloudflare.yaml:36]
