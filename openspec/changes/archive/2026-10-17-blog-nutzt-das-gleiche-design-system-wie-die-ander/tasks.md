## 1. Design-System einbinden
- [x] 1.1 `BaseLayout.astro`: `/v1/styles.css` von ecke-design-system.pages.dev einbinden; `src/styles/tokens.css` und `public/fonts/` entfernen
- [x] 1.2 `global.css` auf Blog-Layout reduzieren, Überschneidungen mit den Grundstilen von `/v1/styles.css` bereinigen

## 2. Diagramme
- [x] 2.1 `PostLayout.astro`: `/v1/mermaid.js` laden, nur wenn die Seite `pre.mermaid` enthält; `src/scripts/mermaid.ts` entfernen
- [x] 2.2 Akzentfarbe des ersten Tags als `--diagram-accent` (und `--diagram-accent-bg`) am Beitrag setzen

## 3. Prüfen
- [x] 3.1 `npm run build`; Sichtprüfung hell/dunkel für Startseite, Beitrag mit und ohne Diagramm
- [x] 3.2 `twin.json` aus dem Change ins Root übernehmen, Change archivieren
