---
title: "Software factories are obviously better than anything before them. Proving it turned out to be surprisingly hard."
description: "A benchmark should easily show that software factories are unbeatable. Shame my results don't back that up quite so cleanly. 😩"
pubDate: 2026-06-30
tags: ["AI", "Software Factory", "Hackers&Wizards"]
---

I recently became a freelancer to work full-time in AI consulting. So I wanted to prove, for myself, why software factories work so much better than what many people are doing today under the label of vibe coding.

My first reaction was: easy-peasy.

I can just spin up a few factories, pit different methods against each other, and in a second step compare different models too. If I approach it in a structured enough way, this might even grow into a continuous benchmark for new models.

The hypothesis was simple:

Software factories deliver higher quality at lower cost.

Spoiler: it didn't turn out to be that simple.

## What is a software factory?

To me, a _software factory_ is a setup of several specialized AI agents. Instead of one agent doing everything, multiple roles work together — much like a software development team.

The **Planner** is essentially the PO of an agile team. It takes in the requirements. This can be configured however you like — I feed my requirements in as a GitHub issue and let the Planner run a few rounds with me, asking clarifying questions until the requirement is solid. That roughly corresponds to refinement, and this is also where splitting can happen. At the end, the specs to be implemented are set.

Once that step is done, the specs go to the **Builder**. It implements them according to however this team develops in general. TDD is just one example worth mentioning here.

When the Builder thinks it's done, the **Reviewer** takes over. It checks whether the guardrails, architecture decisions and general guidelines were followed. Why this step? Because even when the Builder and Reviewer use the same model, the Reviewer usually finds something the Builder glossed over or forgot on the first pass. So this step adds a lot of quality.

Once the hopefully few loops here are cleared, the **Validator** comes in. It checks whether the implementation actually solves the problem. The order can vary from factory to factory — some validate first whether it even works before correcting style and structure.

And just now, as I'm writing this, it occurs to me that this order actually makes more sense. First check that it works, then make it pretty. I'm going to change that in my factory too.

> Make it work, make it pretty, make it fast, make it work again, because you broke it while you made it fast.

And when the last agent is done, in my factory it goes back to the human, who does the final sign-off. That's the factory in broad strokes: PO, Dev, Code Review, QA. You add the finer details to taste and experience.

```mermaid
flowchart LR
    Planner --> Builder --> Reviewer --> Validator
```

## The hypothesis

Once more in a single sentence: factories deliver higher quality at lower cost. If that's true, a direct comparison should show it. So my first setup: one example task, once as a vibe-coding session, once as a factory. Let's see.

### The task

Build a Kanban board web app, similar to what Trello used to be. No crazy features. We want results, not burned tokens.

In hindsight, that was exactly the problem.

A Kanban board is about the worst task you could pick if you want to show that a factory beats vibe coding. Trello clones, drag-and-drop lists, cards, columns, simple board APIs — that stuff is probably represented plenty in the training data. This is tutorial material. This is GitHub-repo material. This is "build me a small example app" material.

That hands vibe coding an advantage. A single agent doesn't have to analyze deeply here; it mostly has to reproduce a known pattern. And that's exactly what the models are good at.

This matters for interpreting the numbers below: if vibe coding does well here, that doesn't mean it works just as well in real projects. It might also mean I picked a task that plays to vibe coding's strengths. Noted.

### The first setup

Since the task is so simple, I picked the most direct approach I could think of. I just had an application built in a single one-shot that fulfills the task. And lo and behold, 22 minutes later I had a — once again surprisingly solid — result. Token cost about $4.

For the second experiment, I just as naively told Opus to act as an orchestrator, discuss the task with a UX agent, produce a spec together with it, hand that to the Builder, and have the whole thing checked by a QA agent at the end. Result: the run took considerably longer and cost an estimated $37. That's neither faster nor cheaper.

And what does a good scientist do when the result doesn't fit the hypothesis? First, question the approach. 😉 My approach was deliberately kept simple, after all.

_KISS – Keep it simple, stupid._

### The second setup

Together with my buddy Opus I wrote a spec describing a Trello board. That I was handing vibe coding an advantage with this wasn't clear to me at the time. But more on that shortly. What mattered first was that all experiments got the same spec. Yes, the spec part is a particularly interesting piece of the factory, but I haven't yet come up with a way to integrate it into the benchmark reproducibly. So we note that as sloppy and as a to-do for future me — but for now the spec is held constant across these experiments.

| Code                          | Method                                                          | Expectation                              |
| ----------------------------- | --------------------------------------------------------------- | ---------------------------------------- |
| 011 Vibe                      | Ad-hoc, one instruction after another, no plan                  | Baseline – how most people work today    |
| 012 Research→Plan→Implement   | Plan first, then build                                          | Better than vibe, but not yet a factory  |
| 013 Factory                   | Orchestrator delegates to a sub-agent team                      | This is where the advantages show up     |
| 014 Factory + Context-Pruning | Like 013, but decisions as ADRs, leaner context per agent       | Should beat 013 even further             |
| 015 Agile Factory             | Incremental in sprints with a sign-off gate                     | My clear favorite                        |

The spine of this comparison is the first three: Vibe, Research→Plan→Implement, and Factory. The last two (Context-Pruning and Agile Factory) are variations I tried on top of the factory. They produced the most puzzling results of the whole run — one surprisingly expensive, one inexplicably good — which is exactly why they deserve their own, more technical write-up rather than crowding this one. I'll come back to them separately.

For this run, two rounds: the first pure greenfield, API only. The second UI only, so that afterwards I can mix arbitrary UIs with arbitrary APIs. I was curious whether that works interchangeably. It does.

## The moment the premise wobbled

When I started the first experiments, I was still watching. A bit like staring at progress bars, but I wanted to know whether I'd have to change something in the setup. I started the research-plan experiment and saw in the output that a sub-agent had been launched.

—

A sub-agent, launched?!

This experiment was designed to run in a single agent only. The factory with the defined sub-agents was supposed to come later. That's exactly the advantage I see in factories: specialized sub-agents that handle a sub-task better in their own context window than in the main one. But here, in a pure research-plan session with Sonnet, the agent had spawned sub-agents on its own.

That shifts the premise a little. If the tools already deploy sub-agents by themselves, then "a single agent vs. a factory" isn't cleanly separated anymore. Maybe modern coding tools already contain a small, generic factory. Just one that isn't adapted to my context, my rules and my architecture.

I let it all run through anyway. Here's the result:

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

⚠️ Here the circuit breaker kicked in, to keep this experiment from running up arbitrary costs.

What I couldn't measure is the actual token consumption of the sub-agents. In my analysis they can't be attributed cleanly, so those costs are fuzzy in the results. I don't want to paper over that here.

## The result

…is different from what I expected. In this setup, the factory had no clear advantage over structured work with a single AI agent. Worse: structured, single-agent work (Research→Plan→Implement) held up remarkably well, and adding the full factory orchestration on top didn't clearly earn its keep — at least when you look at cost, and cost is exactly what I'll look at next.

What I'm not measuring here is the software quality itself. In theory the more expensive factory could deliver better code and thus justify the surcharge. Possible. But I can't prove that with this setup — quality simply isn't one of my metrics here. Honestly, that's the first objection that occurred to me — so it belongs in the post. Note to future me: quality has to go in as a metric.

**1. Vibe coding sucks — d'uh!**
Is what I wanted to write. But the numbers don't make it that easy for me. Precisely because the task was a Kanban board, vibe coding had an advantage — known pattern, plenty of training data. So the real point isn't "vibe coding can't do anything," but: vibe coding is hard to control. Sometimes a surprising amount comes out, sometimes it gets expensive, sometimes the circuit breaker trips. Interesting for experiments, a problem for reproducible software development.

**2. GPT and Claude Code are usually roughly on par on cost.**
Not especially spectacular, but worth noting once.

**3. Structure helps — even without a complete factory.**
Research → Plan → Implement was surprisingly strong in this setup, and regardless of the approach, working APIs come out at the end. That's not a complete factory, but it's also no longer blind prompting into the void. Even a little process seems to buy a lot. Maybe the biggest jump isn't the one from "one agent" to "many agents," but the one from "no process" to "clear process." A factory isn't a magic quality multiplier — it's systems design. And that can be good or bad.

**4. My UI benchmark was too weak.**
I was too limiting in my specs. My UI is an unstyled HTML skeleton. Yes, it works. _– works on my machine –_ Still, there's a UX heart beating in my chest too, and this has to change. If I want to compare UI results seriously, I need better criteria than "are there buttons and do they respond?" Next note to future me: get UX into the setup more cleanly.

## So what does this mean?

I still believe the factory is superior. But this benchmark doesn't show it unambiguously yet. And that's probably the more important insight: if I want to show that the factory method is advantageous in real projects, I need a setup that's closer to real projects.

A Kanban board is too small and too well-known for that. It rewards pattern reproduction. What it barely tests is what's actually hard in real codebases:

- understanding existing architecture
- respecting legacy code
- spotting side effects
- sharpening requirements across multiple iterations
- keeping quality stable over time

That's exactly where a good software factory should be stronger. Not at "build me a Trello clone."

## What's next?

I need a different setup. The next task has to be more complex, smell less like a tutorial, and sit closer to real projects — ideally with an existing codebase, conflicting requirements, a migration path, tests and real trade-offs.

And I'm not just describing that as a hope. It's already running. Since last week I've had a factory going against Deskleaf.one's real codebase. It doesn't deliver satisfactorily yet — lots of loops, and at the end something is regularly missing (the deployment, for instance). That's precisely what makes it the more interesting case: not a clean success on a toy problem, but a factory wrestling with a real, existing system. That's the next post.

The second open problem is measurability. What I couldn't track reliably in this run is the token consumption of the self-spawned sub-agents — and that concerns not just my factory, but Claude Code and Codex too. It looks like the tools themselves have a kind of generic factory built in. That one isn't adapted to my project, my standards and my architecture, and my hunch is that it hits its limits faster in larger existing codebases. But that's just another hypothesis. First I need the tracking.

And that's why I'm carrying on.

To be continued…
