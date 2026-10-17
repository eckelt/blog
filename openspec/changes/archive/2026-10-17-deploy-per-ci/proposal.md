# Deploy per CI statt von Hand

## Warum
Ein Push auf `main` deployt den Blog bisher nicht; jemand muss `npx wrangler deploy` von Hand ausführen. Das widerspricht der Regel „Deploys als Code in CI, der Nutzer setzt nur Secret-Werte“ und hat B25 (Blog nutzt das Design-System) nach dem Push unveröffentlicht gelassen (Nils, 2026-10-17: „Es sollte alles automatisiert sein und nichts von Hand angestoßen werden müssen“).

## Was
`.github/workflows/deploy.yml`: bei Push auf `main` (Pfadfilter auf Quellen) und von Hand: `npm ci`, `npm run build`, `wrangler deploy`, danach Live-Prüfung, dass blog.ecke.lt diesen Build ausliefert. Secrets `CLOUDFLARE_API_TOKEN` (Workers Scripts: Edit) und `CLOUDFLARE_ACCOUNT_ID` setzt der Nutzer; fehlen sie, bricht der Lauf mit klarer Meldung ab.

## Auswirkungen
- Spec `deploy`: „Manueller Deploy“ wird zu „Deploy per CI“.
- `twin.json`: neuer Container `deploy` (Pipeline), wie in den anderen Repos.
