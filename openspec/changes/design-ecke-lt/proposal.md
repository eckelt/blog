# Design-System unter design.ecke.lt einbinden

## Warum
Teil des Landscape-Changes `design-ecke-lt` (Wunsch des Inhabers, Chat 2026-10-19): Das Design-System bekommt die eigene Adresse `design.ecke.lt` (Entscheidung `2026-10-19-design-ecke-lt`). blog bindet es heute von `https://ecke-design-system.pages.dev/v1/` ein und stellt auf die neue Adresse um.

## Was
Jede Fundstelle der alten Adresse wird durch `design.ecke.lt` ersetzt (nur Host, Pfad `/v1/...` unverändert). CSP-Header, `_headers` oder Font-Preloads mit der Adresse gibt es in blog nicht.

| Datei | Zeilen | Art |
|---|---|---|
| `README.md` | 57, 78 | Dokumentation/Spec |
| `docs/adr/2026-09-01-alle-apps-nutzen-design-system.md` | 10, 15 | ADR 2026-09-01: Text bleibt, Folge-Zeile ergänzen |
| `openspec/project.md` | 46, 47, 54 | Dokumentation/Spec |
| `openspec/specs/posts/spec.md` | 42 | Dokumentation/Spec |
| `openspec/specs/shared-design/spec.md` | 10 | Dokumentation/Spec |
| `src/components/BaseHead.astro` | 19, 20 | Code |
| `src/layouts/PostLayout.astro` | 58 | Code |
| `src/styles/global.css` | 4 | Code |

- Archivierte Changes und der Text der ADR `2026-09-01-alle-apps-nutzen-design-system` bleiben als Zeitdokument stehen; die ADR bekommt nur unter „Folgen“ eine Zeile mit Verweis auf `2026-10-19-design-ecke-lt`.
- Soll-`twin.json`: Fundstellen-Summaries mit der neuen Adresse (wo dort eine Adresse steht) und die neue Entscheidung `docs/adr/2026-10-19-design-ecke-lt.md` in `adrs[]` des Knotens, der das Design-System nutzt.
- Neue ADR `docs/adr/2026-10-19-design-ecke-lt.md` (Status `vorgeschlagen`, gleiche id wie in den anderen Repos).

## Auswirkungen
- **Reihenfolge:** Erst wenn `https://design.ecke.lt/v1/styles.css` live antwortet (Deploy von ecke-design-system grün, dessen Live-Prüfung auf der neuen Adresse), wird umgestellt. Davor bleibt die alte Adresse maßgeblich; danach bleibt sie als Übergang erreichbar, ein Zwischenzustand bricht also nichts.
- Deploy: kein CI im Repo (Landscape-Eintrag `deploy_on_push` nennt manuellen Deploy); der Gewerk-Agent liefert den `wrangler deploy`-Befehl, den Push löst kein Deploy aus. Laut Inventar läuft der Blog als Worker mit statischen Assets; ob inzwischen ein Workflow existiert (ADR `2026-10-17-deploy-per-ci`), prüft das Gewerk vor dem Push.
- Nutzer sehen keinen Unterschied: gleiche Dateien, gleiche Header (CORS offen, 5 min Cache); der Browser lädt von einem neuen Host, der erste Aufruf braucht eine neue TLS-Verbindung.
- Spec-Änderungen: die genannten Dateien unter `openspec/specs/` und `openspec/project.md` ziehen mit (Deltas schreibt das Gewerk bei `approve`).

## Berührung mit offenen Changes
`adrs-nachtragen` ist hier bereits umgesetzt; `docs/adr/2026-09-01-alle-apps-nutzen-design-system.md` und `adrs[]` stehen im Ist. Kein offener Change im Repo berührt die Fundstellen.

## Alternativen
Siehe `docs/adr/2026-10-19-design-ecke-lt.md` (Optionen: pages.dev behalten, Custom Domain auf Pages, Worker, Unterpfad unter ecke.lt). Gewählt ist die Custom Domain auf Pages.
