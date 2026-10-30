## MODIFIED Requirements

### Requirement: Beitragsschema
Das System SHALL Beiträge aus `src/content/blog/**/*.{md,mdx}` laden und im Frontmatter `title` und `description` verlangen sowie optional `pubDate`, `updatedDate`, `tags` (Standard leer) und `draft` (Standard `false`) akzeptieren.

#### Scenario: Pflichtfeld fehlt
- **WHEN** ein Beitrag kein `title` oder keine `description` hat
- **THEN** entspricht er nicht dem Schema der Collection `blog`

### Requirement: Veröffentlichungsregel
Das System SHALL einen Beitrag nur veröffentlichen, wenn er kein Entwurf ist und sein `pubDate` gesetzt ist und nicht in der Zukunft liegt, gemessen zum Build-Zeitpunkt.

#### Scenario: Entwurf oder fehlendes Datum
- **WHEN** ein Beitrag `draft: true` hat oder kein `pubDate`
- **THEN** erscheint er weder in der Übersicht noch im RSS-Feed, und es wird keine Seite für ihn gebaut

#### Scenario: Datum in der Zukunft
- **WHEN** `pubDate` nach dem Build-Zeitpunkt liegt
- **THEN** bleibt der Beitrag unveröffentlicht, bis nach diesem Datum neu gebaut wird

### Requirement: Übersicht
Das System SHALL unter `/` alle veröffentlichten Beiträge absteigend nach `pubDate` mit Datum, Titel und Beschreibung auflisten.

#### Scenario: Keine Beiträge
- **WHEN** kein Beitrag veröffentlicht ist
- **THEN** zeigt die Übersicht „Noch keine Beiträge — bald geht's los.“

### Requirement: Beitragsseite
Das System SHALL jeden veröffentlichten Beitrag unter `/blog/<id>/` rendern, wobei die id aus dem Dateinamen ohne Endung entsteht, mit Datum (de-DE), optionalem Aktualisierungsdatum, Titel und Tags.

#### Scenario: Tag-Farbe
- **WHEN** ein Beitrag Tags hat
- **THEN** bekommt jeder Tag eine Badge-Farbe aus einer festen Zuordnung (`AI`, `Hackers&Wizards` → ai, `Software Factory` → arch, sonst cloud), und der erste Tag bestimmt die Akzentfarbe der Diagramme
