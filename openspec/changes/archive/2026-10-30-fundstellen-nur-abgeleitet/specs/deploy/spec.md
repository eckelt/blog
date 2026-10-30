## MODIFIED Requirements

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
