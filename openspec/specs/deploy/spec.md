# deploy Specification

## Purpose

Build der statischen Website und Auslieferung über einen Cloudflare Worker mit Static Assets. Ist-Zustand zu Commit `c8304618a6c84a595d80744ebb581a10bc3e773e` (Landscape-Inventur 2026-09-27).

## Requirements

### Requirement: Statischer Build
Das System SHALL mit `npm run build` (`astro build`) die Website als statische Dateien nach `./dist` bauen; vorgesehen ist Node 22.

#### Scenario: Build-Ausgabe
- **WHEN** `npm run build` läuft
- **THEN** liegt die Website in `./dist`, das nicht versioniert wird

### Requirement: Auslieferung über Worker mit Static Assets
Das System SHALL als Cloudflare Worker `blog` den Inhalt von `./dist` als Static Assets ausliefern, ohne eigenen Worker-Code, ohne Bindings und ohne Secrets, unter der Custom Domain blog.ecke.lt.

#### Scenario: Kein Pages-Projekt
- **WHEN** die Cloudflare-Konfiguration geprüft wird
- **THEN** gibt es den Worker `blog`, aber kein Pages-Projekt `blog`; die Pages-Anleitung in der README gilt nicht

### Requirement: Deploy per CI
Das System SHALL bei jedem Push auf `main`, der Quellen, Abhängigkeiten oder die Worker-Konfiguration ändert, in GitHub Actions bauen und mit `wrangler deploy` als Worker `blog` ausliefern und danach prüfen, dass blog.ecke.lt diesen Build zeigt. Fehlen die Secrets `CLOUDFLARE_API_TOKEN` oder `CLOUDFLARE_ACCOUNT_ID`, SHALL der Lauf vor dem Deploy mit einer klaren Meldung abbrechen.

#### Scenario: Push mit geänderter Seite
- **WHEN** ein Commit auf `main` eine Datei unter `src/` ändert
- **THEN** baut und deployt der Workflow, und die Live-Prüfung findet das CSS-Asset dieses Builds auf https://blog.ecke.lt/

#### Scenario: Secret fehlt
- **WHEN** `CLOUDFLARE_API_TOKEN` leer ist
- **THEN** endet der Lauf rot mit „Secret CLOUDFLARE_API_TOKEN ist leer“, ohne zu deployen

#### Scenario: Nur Doku geändert
- **WHEN** ein Commit nur `openspec/` oder `README.md` ändert
- **THEN** läuft kein Deploy
