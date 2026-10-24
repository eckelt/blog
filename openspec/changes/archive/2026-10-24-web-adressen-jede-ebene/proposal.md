# Web-Adressen auf jeder Ebene: blog

## Warum
Teil des Changes `web-adressen-jede-ebene` im Repo ecke-lt-landscape (Regel, Schema, ADR, Tabelle über alle Repos): Eine Web-Adresse (`url`) trägt, wer die Einstiegsseite selbst ausliefert, und zwar auf jeder Ebene (System, Container, Komponente); Backends tragen keine, es gibt keine Vererbung.

## Was
- System `blog`: `url` https://blog.ecke.lt/ (neu); Container `site` behält seine gleiche Adresse

## Auswirkungen
Nur `twin.json` (Soll), kein Code. Gültig gegen das Schema erst nach dem Landscape-Teil des Changes.
