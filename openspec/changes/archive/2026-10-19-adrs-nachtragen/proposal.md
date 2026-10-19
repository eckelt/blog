# ADRs nachtragen

## Warum
Architekturentscheidungen stehen bisher als Prosa in archivierten Changes. Seit `entscheidungen-im-modell` liegen sie als ADR-Dateien im Repo des Systems und hängen per `adrs[]` an den Knoten. Gesamtliste mit allen Repos und den nicht aufgenommenen Kandidaten: ecke-lt-landscape `openspec/changes/adrs-nachtragen/proposal.md`.

## Was
| id | Titel | Knoten | Quelle |
|---|---|---|---|
| `2026-09-01-alle-apps-nutzen-design-system` | Alle ecke.lt-Apps nutzen das Design-System zur Laufzeit (übergreifend, je Repo eine Datei mit gleicher id) | `site` | Anmerkung des Inhabers 2026-10-19; Design-System README, Commit `a4bb5f0` |
| `2026-10-17-deploy-per-ci` | Deploy bei Push auf main per GitHub Actions | `deploy` | Archiv `2026-10-17-deploy-per-ci` |

Auf Anmerkung des Inhabers (2026-10-19) ersetzt die übergreifende Entscheidung die Einzel-ADR `2026-10-17-blog-nutzt-das-gleiche-design-system-wie-die-ander`; Mermaid geht nicht über „nutzt das Design-System“ hinaus und steht als Repo-Abschnitt in den Folgen.

## Auswirkungen
- Zwei Dateien unter `docs/adr/`, `twin.json` (`adrs[]` an `site` und `deploy`). Kein Code, keine Spec.
