## MODIFIED Requirements

### Requirement: Design-Tokens
Das System SHALL Farben, Schriften, Layout-Werte und die Badge-Palette aus dem ecke.lt Design-System beziehen, indem es `https://design.ecke.lt/v1/styles.css` (`ecke-design-system:styles@1`) einbindet; eine eigene Kopie der Tokens SHALL es nicht mehr geben. Das helle und dunkle Farbschema kommen aus dem Design-System.

#### Scenario: Dunkles Farbschema
- **WHEN** der Browser `prefers-color-scheme: dark` meldet
- **THEN** gelten die Dark-Werte aus `/v1/tokens/colors.css`, einschließlich der Badge-Farben

#### Scenario: Keine eigene Token-Kopie
- **WHEN** der Blog gebaut wird
- **THEN** enthält das Ergebnis weder `tokens.css` noch eigene Definitionen der Design-System-Tokens
