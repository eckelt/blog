---
title: "code.talks 2026: Architecture Overview gegen Comprehension Debt"
description: "Folien, Quellen und Links zu meinem Vortrag auf der code.talks 2026: Wie ich Änderungen als Delta-Spec lese und mir die Struktur auf einer Karte zeigen lasse."
pubDate: 2026-11-05
tags: ["AI", "Architektur"]
draft: false
---

Am 5. November habe ich auf der code.talks in Hamburg erzählt, wie ich mit Agenten baue, ohne den Überblick über mein eigenes System zu verlieren. Kein Tool zum Herunterladen, keine Studie, sondern ein Erfahrungsbericht aus meinem Labor: Änderungen entstehen als Delta-Spec, und bevor der Agent baut, zeigt er mir den Plan auf einer Karte.

**[Folien als PDF herunterladen](/talks/codetalks-2026.pdf)**

## Die Kernidee

Mit Agenten wandert das Verstehen vom Code in die Spec. Aber auch Specs liest man irgendwann nicht mehr selbst. Deshalb lasse ich mir das Verhalten vom Agenten erklären und die Struktur auf einer Karte zeigen. Die Erklärung kommt vom selben Agenten, der das Delta geschrieben hat; die Karte zeigt, was tatsächlich im Manifest steht.

## Zum Mitnehmen

1. Ist-Spec ins Repo. Nur das Was.
2. Änderungen nur als Delta-Spec. Reviewt wird das Delta, nicht der Code.
3. Das Wie getrennt davon: die Struktur als Manifest und Entscheidungen als ADRs pflegen und daraus eine Übersicht zeichnen lassen. Mermaid reicht für den Anfang.
4. Die Spec mit einem Rebuild im leeren Repo testen.

Baut euch das Werkzeug, das ihr braucht. Meins ist nur ein Beispiel.

## Quellen

- Addy Osmani: [Comprehension Debt](https://addyosmani.com/blog/comprehension-debt/)
- Dex Horthy bei The Pragmatic Engineer: [Context engineering with Dex Horthy](https://newsletter.pragmaticengineer.com/p/context-engineering-with-dex-horthy)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec): Spec-Driven Development für KI-Coding-Assistenten
- Robert C. Martin (Uncle Bob) im [Aviator-Podcast](https://www.youtube.com/watch?v=5kCISBJwoZo)
- Dave Farley, Modern Software Engineering: [Video auf YouTube](https://www.youtube.com/watch?v=EkH_uoybj8k)
- Vlad Khononov: [Balanced Coupling](https://coupling.dev) und der [modularity-Skill](https://github.com/vladikk/modularity), den ich als Nächstes ausprobiere

## Feedback und Gespräch

Wie war der Vortrag? Ich freue mich über [Feedback](https://feedback.ecke.lt/codetalks). Und wenn ihr über euer eigenes Vorgehen sprechen wollt: [Termin buchen](https://book.ecke.lt).
