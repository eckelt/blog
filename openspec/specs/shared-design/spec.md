# shared-design Specification

## Purpose

Eigene Kopie der ecke.lt-Designsprache (Tokens, Fonts) sowie Navigation und Footer mit Verweisen auf die anderen ecke.lt-Seiten. Ist-Zustand zu Commit `c8304618a6c84a595d80744ebb581a10bc3e773e` (Landscape-Inventur 2026-09-27).

## Requirements

### Requirement: Design-Tokens
Das System SHALL Farben, Schriften, Layout-Werte und die Badge-Palette aus dem ecke.lt Design-System beziehen, indem es `https://design.ecke.lt/v1/styles.css` (`ecke-design-system:styles@1`) einbindet; eine eigene Kopie der Tokens SHALL es nicht mehr geben. Das helle und dunkle Farbschema kommen aus dem Design-System.

#### Scenario: Dunkles Farbschema
- **WHEN** der Browser `prefers-color-scheme: dark` meldet
- **THEN** gelten die Dark-Werte aus `/v1/tokens/colors.css`, einschließlich der Badge-Farben

#### Scenario: Keine eigene Token-Kopie
- **WHEN** der Blog gebaut wird
- **THEN** enthält das Ergebnis weder `tokens.css` noch eigene Definitionen der Design-System-Tokens

### Requirement: Navigation und Footer
Das System SHALL im Kopf Links auf „Blog“ (`/`), „Profil“ (`https://nils.ecke.lt`) und „Termin buchen“ (`https://book.ecke.lt/30min`) zeigen und im Footer auf Impressum und Datenschutz von nils.ecke.lt verlinken.

#### Scenario: Rechtstexte
- **WHEN** jemand im Footer auf „Impressum“ oder „Datenschutz“ klickt
- **THEN** führt der Link zu `https://nils.ecke.lt/impressum/` bzw. `https://nils.ecke.lt/datenschutz/`
