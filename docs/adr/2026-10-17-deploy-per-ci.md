# Der Blog deployt bei Push auf main per GitHub Actions statt per wrangler von Hand

Status: angenommen
Datum: 2026-10-17
Change: deploy-per-ci

## Kontext
Ein Push auf `main` deployte den Blog nicht; jemand musste `npx wrangler deploy` von Hand ausführen. Dadurch blieb B25 (Blog nutzt das Design-System) nach dem Push unveröffentlicht. Der Inhaber: „Es sollte alles automatisiert sein und nichts von Hand angestoßen werden müssen“.

## Entscheidung
`.github/workflows/deploy.yml` läuft bei Push auf `main` (Pfadfilter auf die Quellen) und von Hand: `npm ci`, `npm run build`, `wrangler deploy` und danach eine Live-Prüfung, dass blog.ecke.lt diesen Build ausliefert. Die Secret-Werte setzt der Inhaber; fehlen sie, bricht der Lauf mit klarer Meldung ab.

## Betrachtete Optionen
- **Workflow im Repo** (gewählt): wie in den anderen Repos, nachvollziehbar, mit Live-Prüfung.
- **Deploy von Hand:** bisheriger Stand, verworfen. Ein vergessener Handgriff ließ einen Push unveröffentlicht.
- **Git-Integration von Cloudflare (Workers Builds)** (rekonstruiert): verworfen. Kein Workflow nötig, aber die Konfiguration läge im Dashboard statt im Repo, und eine eigene Live-Prüfung fehlte.

## Folgen
- Neuer Container `deploy` (Pipeline) im Manifest.
- Nachgetragen im Change `adrs-nachtragen`. Quelle: `openspec/changes/archive/2026-10-17-deploy-per-ci/proposal.md`; Grundsatz in ecke-lt-landscape `docs/adr/2026-10-16-deploys-als-code.md`.
