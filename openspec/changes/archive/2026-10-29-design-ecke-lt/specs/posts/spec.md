## MODIFIED Requirements

### Requirement: Markdown-Erweiterungen
Das System SHALL Code-Blöcke mit Sprache `mermaid` als `<pre class="mermaid">` ausgeben und Tabellen in ein `div.table-scroll` einpacken. Diagramme SHALL der Mermaid-Adapter des Design-Systems (`https://design.ecke.lt/v1/mermaid.js`, `ecke-design-system:mermaid@1`) rendern; die Akzentfarbe des Beitrags SHALL der Blog als `--diagram-accent` setzen.

#### Scenario: Seite mit Diagramm
- **WHEN** eine Beitragsseite ein `pre.mermaid` enthält
- **THEN** lädt der Browser `/v1/mermaid.js` des Design-Systems, das mit den Design-Tokens und der Akzentfarbe des ersten Tags rendert und beim Wechsel zwischen hellem und dunklem Farbschema neu rendert

#### Scenario: Seite ohne Diagramm
- **WHEN** eine Seite kein `pre.mermaid` enthält
- **THEN** wird kein Mermaid-Skript geladen
