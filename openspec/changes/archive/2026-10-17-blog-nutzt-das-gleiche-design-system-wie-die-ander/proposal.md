# Blog nutzt das gleiche Design System wie die anderen Apps

## Warum
Nur ein Design-System macht alle Tools konsistent. Die darin entstehende Komponentenbibliothek erspart doppelte Entwicklung und verhindert, dass die Experience auseinanderdriftet (Nils, Werkbank-Skizze 2026-10-17: blog → ecke-design-system „soll nutzen“).

Heute hält der Blog eine eigene Kopie der Tokens (`src/styles/tokens.css`), eigene Fonts (`public/fonts/`) und ein eigenes Mermaid-Theme (`src/scripts/mermaid`). nils.ecke.lt und booking binden bereits `ecke-design-system:styles@1` ein. Alle Custom Properties, die `src/styles/global.css` nutzt, gibt es auch in `/v1/tokens/`.

## Was
`blog/site` bindet `https://ecke-design-system.pages.dev/v1/styles.css` ein (`ecke-design-system:styles@1`); `src/styles/tokens.css` und `public/fonts/` entfallen. `global.css` behält nur Blog-spezifisches Layout. Diagramme rendert `/v1/mermaid.js` (`ecke-design-system:mermaid@1`) statt `src/scripts/mermaid.ts`; die Akzentfarbe je Beitrag (erster Tag) setzt der Blog über `--diagram-accent`. Das Design-System selbst ändert sich nicht.

## Alternativen
- **a: Tokens und Mermaid aus dem Design-System**: zusätzlich `/v1/mermaid.js` (`ecke-design-system:mermaid@1`) statt eigenem Mermaid-Skript. Löst die Drift „mermaid@1 ohne Nutzer“.
- **b: Nur Tokens aus dem Design-System**: das eigene Mermaid-Skript bleibt.

Wahl: **a** (Nils in der Werkbank, 2026-10-17). `twin.json` im Change ist das Soll von Variante a.

## Auswirkungen
- Specs: `shared-design` (Tokens und Fonts aus dem Design-System statt eigener Kopie), bei a auch die Mermaid-Darstellung in `posts`.
- `/v1/styles.css` setzt Grundstile für `html`, `body` und Elemente; `global.css` muss Überschneidungen bereinigen, damit die Blog-Optik erhalten bleibt (Sichtprüfung vor dem Push).
- Laufzeitabhängigkeit: blog.ecke.lt lädt CSS (und bei a JS) von ecke-design-system.pages.dev (CORS offen, ein Jahr immutable).
