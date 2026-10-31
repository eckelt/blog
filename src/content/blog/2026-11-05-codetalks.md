---
title: "code.talks 2026: Architecture Overview gegen Comprehension Debt"
description: "Folien, Quellen und Links zu meinem Vortrag auf der code.talks 2026: Wie ich Änderungen als Delta-Spec lese und mir die Struktur auf einer Karte zeigen lasse."
pubDate: 2026-11-05
tags: ["AI", "Architektur"]
draft: true
---

<!--
ENTWURF — vor dem Talk prüfen:
- PDF unter public/talks/codetalks-2026.pdf ablegen (Export aus den Folien, ohne Backup-Folien)
- Kurzlink ecke.lt/codetalks (und ECKE.LT/CODETALKS) auf diese Seite zeigen lassen
- draft: false setzen. Achtung: Der Beitrag erscheint erst, wenn nach pubDate neu gebaut wird.
-->

Am 5. November habe ich auf der code.talks in Hamburg erzählt, wie ich mit Agenten baue, ohne den Überblick über mein eigenes System zu verlieren. Kein Tool zum Herunterladen, keine Studie, sondern ein Erfahrungsbericht aus meinem Labor: Änderungen entstehen als Delta-Spec, und bevor der Agent baut, zeigt er mir den Plan auf einer Karte.

**[Folien als PDF herunterladen](/talks/codetalks-2026.pdf)**

## Die Kernidee

Mit Agenten wandert das Verstehen vom Code in die Spec. Aber auch die Spec wächst schneller, als ich lesen kann. Deshalb lese ich das Verhalten und lasse mir die Struktur zeigen.

## Zum Mitnehmen

1. Ist-Spec ins Repo.
2. Änderungen nur als Delta-Spec. Reviewt wird das Delta, nicht der Code.
3. Die Struktur als Manifest daneben pflegen und daraus eine Übersicht zeichnen lassen. Mermaid reicht für den Anfang.
4. Die Spec mit einem Rebuild im leeren Repo testen.

Baut euch das Werkzeug, das ihr braucht. Meins ist nur ein Beispiel.

## Quellen

- Addy Osmani: [Comprehension Debt](https://addyosmani.com/blog/comprehension-debt/)
- Dex Horthy bei The Pragmatic Engineer: [Context engineering with Dex Horthy](https://newsletter.pragmaticengineer.com/p/context-engineering-with-dex-horthy)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec): Spec-Driven Development für KI-Coding-Assistenten
- Robert C. Martin (Uncle Bob) im [Aviator-Podcast](https://www.youtube.com/watch?v=5kCISBJwoZo)
- Dave Farley, Modern Software Engineering: [Video auf YouTube](https://www.youtube.com/watch?v=EkH_uoybj8k)

## Feedback und Gespräch

Wie war der Vortrag? Ich freue mich über [Feedback](https://feedback.ecke.lt/codetalks). Und wenn ihr über euer eigenes Vorgehen sprechen wollt: [Termin buchen](https://book.ecke.lt).
