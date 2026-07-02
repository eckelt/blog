---
title: "Software Factories sind eindeutig besser als alles bisher Dagewesene. Nur das zu belegen fällt mir überraschend schwer."
description: "Ein Benchmark beweist ganz einfach, dass Software Factories unschlagbar sind. Schade das meine Ergebnisse das nicht so klar belegen. :S"
# pubDate: 2026-06-30  # de-published: uncomment to bring the German post back
lang: "de"
translationKey: "sf-benchmark-1"
tags: ["AI", "Software Factory", "Hackers&Wizards"]
---

Ich habe mich kürzlich selbstständig gemacht, um ganz in die AI-Beratung einzusteigen. Für mich wollte ich daher einmal belegen, warum Software Factories so viel besser funktionieren als das, was viele heute als Vibe Coding betreiben.

Meine erste Reaktion war: Easy.

Ich kann direkt ein paar Factories aufbauen, unterschiedliche Methoden gegeneinander antreten lassen und in einem zweiten Schritt auch unterschiedliche Modelle vergleichen. Wenn ich das nur strukturiert genug angehe, entsteht daraus vielleicht sogar ein kontinuierlicher Benchmark für neue Modelle.

Die Hypothese war einfach:

Software Factories liefern höhere Qualität zu geringeren Kosten.

Spoiler: Ganz so einfach wurde es nicht.

## Was ist eine Software Factory?

Eine Software Factory ist für mich ein Setup aus mehreren spezialisierten AI-Agenten. Statt dass ein einzelner Agent alles macht, arbeiten mehrere Rollen zusammen — ähnlich wie in einem Software-Entwicklungsteam.

Der **Planner** ist im Grunde der PO eines agilen Teams. Er nimmt die Anforderungen entgegen. Das kann beliebig konfiguriert werden — ich gebe meine Anforderungen per GitHub-Issue rein und lasse den Planner mit Gegenfragen und Klärungen ein paar Runden mit mir drehen, bis die Anforderung steht. Das entspricht grob dem Refinement, und hier kann es auch zum Splitting kommen. Am Ende stehen die umzusetzenden Specs.

Ist dieser Schritt abgeschlossen, gehen die Specs an den **Builder**. Der implementiert sie gemäß den Vorgaben, wie in diesem Team ganz allgemein entwickelt wird. TDD sei hier nur beispielhaft erwähnt.

Wenn der Builder meint, fertig zu sein, übernimmt der **Reviewer**. Der prüft, ob Leitplanken, Architekturentscheidungen und allgemeine Vorgaben eingehalten sind. Warum dieser Schritt? Weil selbst dann, wenn Builder und Reviewer dasselbe Modell nutzen, der Reviewer meist etwas findet, das der Builder im ersten Lauf etwas leichthin übersehen oder vergessen hat. Dieser Schritt bringt also viel Qualität.

Wenn die hoffentlich wenigen Schleifen hier überwunden sind, kommt der **Validator**. Der prüft, ob die Implementierung das Problem tatsächlich löst. Die Reihenfolge kann je nach Factory variieren — manche validieren zuerst, ob es überhaupt funktioniert, bevor sie Stil und Struktur korrigieren. ...

Und genau jetzt, während ich das hier so hinschreibe, fällt mir auf, dass das so herum tatsächlich mehr Sinn ergibt. Erst prüfen, ob es funktioniert, dann hübsch machen. Das werde ich in meiner Factory auch ändern.

> Make it work, make it pretty, make it fast, make it work again, because you broke it, while you made it fast.

Und wenn auch der letzte Agent fertig ist, geht es in meiner Factory zurück zum Menschen, der die finale Abnahme macht. Das ist die Factory im Groben: PO, Dev, Code Review, QA. Die Feinheiten ergänzt man je nach Geschmack und Erfahrung.

```mermaid
flowchart LR
    PO --> Dev --> Code Reviewer --> QA
```

## Die Hypothese

Noch einmal in einem Satz: Factories liefern höhere Qualität zu geringeren Kosten. Wenn das stimmt, sollte es sich in einem direkten Vergleich zeigen lassen. Also mein erstes Setup: eine Beispiel-Aufgabe einmal als Vibe-Coding-Session, einmal als Factory. Mal sehen.

### Die Aufgabe

Baue eine Kanban-Board-Webapp, ähnlich wie Trello früher eines war. Keine verrückten Features. Wir wollen Ergebnisse und keine Tokens verbrennen.

Rückblickend war genau das aber ein Problem.

Ein Kanban-Board ist eine denkbar schlechte Aufgabe, wenn man zeigen möchte, dass eine Factory dem Vibe Coding überlegen ist. Trello-Klone, Drag-and-drop-Listen, Cards, Columns, simple Board-APIs — das Zeug ist in Trainingsdaten vermutlich zu Genüge enthalten. Das ist Tutorial-Material. Das ist GitHub-Repo-Material. Das ist „Baue mir mal eine kleine Beispiel-App"-Material.

Damit bekommt Vibe Coding einen Vorteil. Ein einzelner Agent muss hier nicht tief analysieren, er muss vor allem ein bekanntes Muster reproduzieren. Und genau darin sind die Modelle stark.

Das ist wichtig fürs Einordnen der Zahlen weiter unten: Wenn Vibe Coding hier gut abschneidet, heißt das nicht, dass es in echten Projekten genauso gut funktioniert. Es kann auch heißen, dass ich eine Aufgabe gewählt habe, die Vibe Coding entgegenkommt. Merke ich mir.

### Der erste Aufbau

Da die Aufgabe so simpel ist, habe ich auch den direktesten Approach gewählt, der mir einfiel. Ich habe einfach per One-Shot eine Anwendung erstellen lassen, die die Aufgabe erfüllt. Und siehe da, 22 Minuten später hatte ich ein wieder mal überraschend solides Ergebnis. Tokenkosten etwa 4 $.

Beim zweiten Experiment habe ich Opus ebenso blauäugig mitgeteilt, er solle jetzt als Orchestrator fungieren, die Aufgabe mit einem UX-Agenten besprechen und mit dem zusammen eine Spec erstellen, die er dem Builder gibt, und das Ganze am Ende von einem QA-Agenten prüfen lassen. Ergebnis: Der Lauf lief erheblich länger und kostete geschätzte 37 $. Das ist weder schneller noch günstiger.

Und was macht ein guter Wissenschaftler, wenn das Ergebnis nicht zur Hypothese passt? Erst mal das Vorgehen infrage stellen. 😉 Mein Approach war ja auch bewusst simpel gehalten.

_KISS – Keep it simple, stupid._

### Der zweite Aufbau

Zusammen mit meinem Kumpel Opus habe ich eine Spec geschrieben, die ein Trello-Board beschreibt. Dass ich Vibe Coding damit einen Vorteil in die Hand drücke, war mir zu dem Zeitpunkt noch nicht klar. Aber dazu gleich mehr. Wichtig war erstmal, dass alle Experimente dieselbe Spec bekommen. Ja, der Spec-Part ist in der Factory ein besonders interessanter Part, aber mir ist noch keine Lösung eingefallen, das reproduzierbar in den Benchmark zu integrieren. Deshalb merken wir uns das als unsauber und als To-do für Future-Me — aber erstmal ist die Spec konstant für diese Experimente.

| Kürzel                        | Methodik                                                        | Erwartung                                |
| ----------------------------- | --------------------------------------------------------------- | ---------------------------------------- |
| 011 Vibe                      | Ad-hoc, eine Anweisung nach der anderen, kein Plan              | Baseline – So arbeiten die meisten heute |
| 012 Research→Plan→Implement   | Erst planen, dann bauen                                         | Besser als Vibe, aber noch keine Factory |
| 013 Factory                   | Orchestrator delegiert an Sub-Agenten-Team                       | Hiermit werden die Vorteile sichtbar     |
| 014 Factory + Context-Pruning | Wie 013, aber Entscheidungen als ADRs, knapper Context je Agent | Sollte 013 noch übertreffen              |
| 015 Agile Factory             | Inkrementell in Sprints mit Abnahme-Gate                        | Mein klarer Favorit                      |

Meine beiden Verbesserungen zur Factory sind:

**Context-Pruning.** Dadurch, dass das Context-Window in den ersten 120k Tokens am effektivsten ist, möchte ich es so schlank wie möglich halten und Entscheidungen, wenn sie getroffen werden, als ADRs speichern. So bleibt das Context-Window schlank, und Sub-Agenten laden die ADRs erst, wenn sie sie brauchen.

**Agile Factory.** Meine Idee, der Factory einen unfairen Vorteil zu verschaffen, indem ich die Agenten miteinander kommunizieren lasse, ganz wie im Vorbild der cross-funktionalen Teams.

Und das mit zwei Durchläufen. Der erste reines Greenfield, nur die API. Der zweite nur die UI, sodass ich anschließend beliebige UIs mit beliebigen APIs mixen kann. Ich bin neugierig und wollte sehen, ob das interchangeably geht. Geht.

## Der Moment, in dem die Prämisse wackelte

Als ich die ersten Experimente gestartet habe, habe ich noch zugesehen. Ein bisschen wie auf Progressbars starren, aber ich will ja wissen, ob ich am Versuchsaufbau etwas ändern muss. Ich startete das Experiment research-plan und sah in den Ausgaben, dass ein Sub-Agent gelauncht wurde.

—

Ein Sub-Agent gelauncht?!

Dieses Experiment war darauf ausgelegt, nur in einem einzelnen Agenten zu laufen. Die Factory mit den definierten Sub-Agenten kommt doch erst noch. Das ist ja genau der Vorteil, den ich in den Factories sehe: spezialisierte Sub-Agenten, die eine Teilaufgabe in ihrem eigenen Context-Window besser erfüllen als im Main. Aber hier, in einer reinen Research-Plan-Session mit Sonnet, hat der Agent von sich aus Sub-Agenten gespawnt.

Das verändert die Prämisse ein wenig. Wenn die Tools ohnehin selbst Sub-Agenten einsetzen, dann ist „ein einzelner Agent gegen Factory" nicht mehr ganz sauber getrennt. Vielleicht steckt in den modernen Coding-Tools bereits eine kleine, generische Factory. Nur eben eine, die nicht auf meinen Kontext, meine Regeln und meine Architektur angepasst ist.

Ich habe trotzdem alles einmal durchlaufen lassen. Das ist das Ergebnis:

| Exp |  Round   | Method          | Model             |   Result |                 Cost |
| :-: | :------: | --------------- | ----------------- | -------: | -------------------: |
| 001 | one-shot | Prompt / Vibe   | sonnet-4.6        |      n/a |                  ~$4 |
| 002 | one-shot | Agent Factory   | opus-4.8 + sonnet |    39/40 |                 ≥$37 |
| 011 |  R1 API  | vibe            | sonnet            | 31/31 ⚠️ |                $5.78 |
| 011 |  R1 API  | vibe            | gpt-5.5           | 22/62 ⚠️ |               $42.62 |
| 012 |  R1 API  | research-plan   | sonnet            |    31/31 |                $1.84 |
| 012 |  R1 API  | research-plan   | gpt-5.5           |    62/62 |                $1.67 |
| 013 |  R1 API  | factory         | sonnet            |    31/31 |                $1.62 |
| 013 |  R1 API  | factory         | gpt-5.5           |    62/62 |                $1.19 |
| 014 |  R1 API  | factory-pruning | sonnet            |    31/31 |                $3.00 |
| 014 |  R1 API  | factory-pruning | gpt-5.5           |    62/62 |                $0.98 |
| 015 |  R1 API  | agile-factory   | sonnet            | 22/31 ⚠️ |                $3.30 |
| 015 |  R1 API  | agile-factory   | gpt-5.5           | 46/62 ⚠️ |               $36.93 |
| 011 |  R2 UI   | vibe            | sonnet            |   7/9 ⚠️ |                $6.43 |
| 012 |  R2 UI   | research-plan   | sonnet            |      0/9 |                $1.96 |
| 012 |  R2 UI   | research-plan   | gpt-5.5           |   4/9 ⚠️ | $8.66 ($6.15–$11.17) |
| 013 |  R2 UI   | factory         | sonnet            |      0/9 |                $0.89 |
| 014 |  R2 UI   | factory-pruning | sonnet            |      9/9 |                $1.75 |
| 015 |  R2 UI   | agile-factory   | sonnet            |      4/9 |                $2.45 |

⚠️ Hier hat der Circuit-Breaker gegriffen, um mich in diesem Experiment nicht in beliebige Kosten laufen zu lassen.

Was ich nicht messen konnte, ist der tatsächliche Tokenverbrauch der Sub-Agenten. In meinen Auswertungen sind die nicht eindeutig zuzuordnen, und daher sind diese Kosten in den Ergebnissen auch unscharf. Das will ich hier nicht verschleiern.

## Das Ergebnis

…ist anders als erwartet. In diesem Setup hatte die Factory keinen klaren Vorteil gegenüber strukturiertem Arbeiten mit einem einzelnen AI-Agenten. Schlimmer noch: Die beiden „Verbesserungen", die ich der Factory habe zukommen lassen, verschlimmbessern teilweise das Ergebnis erheblich. Zumindest, wenn man die Kosten anschaut – und genau die schaue ich mir gleich genauer an.

Was ich dabei nicht messe, ist die Software-Qualität selbst. Theoretisch könnte die teurere Factory besseren Code liefern und so den Aufpreis rechtfertigen. Möglich. Belegen kann ich das mit diesem Setup aber nicht – Qualität ist hier schlicht keine meiner Messgrößen. Ehrlich gesagt der erste Einwand, der mir selbst kam – also gehört er in den Post. Notiz an Future-Me: Qualität muss als Messgröße rein.

**1. Vibe Coding stinkt – D'uh!**
Wollte ich schreiben. So einfach machen es mir die Zahlen aber nicht. Gerade weil die Aufgabe ein Kanban-Board war, hatte Vibe Coding einen Vorteil — bekanntes Muster, reichlich Trainingsdaten. Der eigentliche Punkt ist also nicht „Vibe Coding kann nichts", sondern: Vibe Coding ist schwer kontrollierbar. Mal kommt erstaunlich viel raus, mal wird es teuer, mal greift der Circuit-Breaker. Für Experimente spannend, für reproduzierbare Softwareentwicklung ein Problem.

**2. GPT und Claude Code liegen bei den Kosten meist gleichauf.**
Nicht sonderlich spektakulär, aber einmal festgehalten.

**3. Struktur hilft — auch ohne komplette Factory.**
Research → Plan → Implement war in diesem Setup erstaunlich stark, und unabhängig vom Ansatz kommen am Ende funktionierende APIs raus. Das ist keine vollständige Factory, aber eben auch kein blindes Drauflos-Prompten mehr. Schon ein bisschen Prozess scheint viel zu bringen. Vielleicht ist der größte Sprung gar nicht der von „ein Agent" zu „viele Agenten", sondern der von „kein Prozess" zu „klarer Prozess". Eine Factory ist eben kein magischer Qualitätsmultiplikator — sie ist Systemdesign. Und das kann gut oder schlecht sein.

**4. Agenten-Kommunikation ist teuer.**
In der Agilen Factory habe ich etwas ausprobiert, was dieser Methode einen unfairen Vorteil verschaffen sollte: Ich habe die Agenten miteinander kommunizieren lassen, wie in einem echten cross-funktionalen Team. Klang gut. War in der Praxis furchtbar teuer. Die Agenten müssen den Context der anderen lesen. Schon bei naiver All-to-all-Kommunikation wächst der Context-Bedarf quadratisch mit der Anzahl der Agenten. Über mehrere Abstimmungsrunden kann daraus schnell eine Context-Explosion werden. Die Agile Factory hätte es wahrscheinlich auch geschafft, wenn Kosten egal wären — siehe Circuit-Breaker. Oha.

**5. Mein UI-Benchmark war zu schwach.**
Ich war in meinen Specs zu limitierend. Meine UI ist ein ungestyltes HTML-Gerüst. Ja, es funktioniert. _– works on my machine –_ Dennoch schlägt in meiner Brust auch ein UX-Herz, und das muss anders werden. Wenn ich UI-Ergebnisse ernsthaft vergleichen will, brauche ich bessere Kriterien als „Gibt es Buttons und reagieren sie?". Nächste Notiz an Future-Me: UX sauberer in den Versuchsaufbau.

**6. Factory-Pruning bleibt rätselhaft.**
In der UI-Runde ist ein Ergebnis, dem ich noch am wenigsten traue: Factory-Pruning macht 9/9, die reguläre Factory 0/9. Ich habe keine Erklärung dafür, die ich verteidigen würde. Meine beste Vermutung: Durch das Pruning bekamen die Sub-Agenten einen schärfer fokussierten Context — und genau das könnte bei einem UI-Task den Unterschied machen. Oder es war Zufall. Beides ist möglich, und genau deshalb brauche ich als Nächstes zuverlässiges Sub-Agenten-Tracking, bevor ich das ernst nehmen kann.

## Was heißt das jetzt?

Ich glaube immer noch, dass die Factory überlegen ist. Aber dieser Benchmark zeigt es noch nicht eindeutig. Und das ist vermutlich die wichtigere Erkenntnis: Wenn ich zeigen will, dass die Factory-Methode in echten Projekten vorteilhaft ist, brauche ich ein Setup, das näher an echten Projekten liegt.

Ein Kanban-Board ist dafür zu klein und zu bekannt. Es belohnt Muster-Reproduktion. Was es kaum testet, ist das, was in realen Codebasen wirklich schwierig ist:

- bestehende Architektur verstehen
- Legacy-Code respektieren
- Nebenwirkungen erkennen
- Anforderungen über mehrere Iterationen schärfen
- Qualität über längere Zeit stabil halten

Genau dort müsste eine gute Software Factory eigentlich stärker sein. Nicht bei „Baue mir einen Trello-Klon".

## Wie geht's weiter?

Ich brauche ein anderes Setup. Die nächste Aufgabe muss komplexer sein, weniger nach Tutorial riechen und näher an echten Projekten liegen — idealerweise mit bestehender Codebase, widersprüchlichen Anforderungen, Migrationspfad, Tests und echten Trade-offs. Eine Idee habe ich schon.

Das zweite offene Problem ist die Messbarkeit. Was ich in diesem Durchlauf nicht zuverlässig tracken konnte, ist der Tokenverbrauch der selbst gespawnten Sub-Agenten — und das betrifft nicht nur meine Factory, sondern auch Claude Code und Codex. Es scheint, als hätten die Tools selbst eine Art generische Factory eingebaut. Die ist natürlich nicht auf mein Projekt, meine Standards und meine Architektur angepasst, und meine Vermutung ist, dass sie in größeren bestehenden Codebasen schneller an ihre Grenzen kommt. Aber das ist wieder nur eine Hypothese. Zuerst brauche ich das Tracking.

Und deshalb mache ich weiter.

To be continued…
