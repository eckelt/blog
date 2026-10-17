## REMOVED Requirements

### Requirement: Manueller Deploy
**Reason**: Deploys laufen als Code in CI (Nutzer 2026-10-17).
**Migration**: `.github/workflows/deploy.yml` übernimmt; `npx wrangler deploy` von Hand ist nicht mehr nötig.

## ADDED Requirements

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
