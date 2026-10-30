## MODIFIED Requirements

### Requirement: Navigation und Footer
Das System SHALL im Kopf Links auf „Blog“ (`/`), „Profil“ (`https://nils.ecke.lt`) und „Termin buchen“ (`https://book.ecke.lt/30min`) zeigen und im Footer auf Impressum und Datenschutz von nils.ecke.lt verlinken.

#### Scenario: Rechtstexte
- **WHEN** jemand im Footer auf „Impressum“ oder „Datenschutz“ klickt
- **THEN** führt der Link zu `https://nils.ecke.lt/impressum/` bzw. `https://nils.ecke.lt/datenschutz/`
