---
title: "Software factories against real code: the Deskleaf run"
description: "The Kanban board was too easy. This time the factory goes up against an existing codebase — and doesn't deliver cleanly yet."
pubDate: 2026-07-07
lang: "en"
tags: ["AI", "Software Factory", "Hackers&Wizards"]
---

<!--
DRAFT / SCAFFOLD — do not publish yet.
The Deskleaf factory is still running and hasn't delivered satisfactory results,
so there are no final numbers here on purpose. Fill the TODO blocks as the run
produces data. Placeholder pubDate.
-->

[The first benchmark](/blog/2026-06-30-software-factory-benchmark-1-en) ended with a confession: a Kanban board is the wrong task for proving a factory's worth. It's too small, too well-known, and it rewards pattern reproduction. What it barely tests is what's actually hard in real codebases:

- understanding existing architecture
- respecting legacy code
- spotting side effects
- sharpening requirements across multiple iterations
- keeping quality stable over time

That's exactly where a good software factory should earn its keep. So this time the test is real code.

## The setup

Since last week I've had a factory running against Deskleaf.one's real, existing codebase. Not a toy problem, not a greenfield spec — an actual system with actual history.

<!-- TODO: describe the factory configuration used here.
- Which agents / roles (Planner, Builder, Reviewer, Validator, …)?
- Which models?
- What was the task fed in (issue / spec)?
- What changed vs. the Kanban setup in part 1?
-->

## What's happening so far

Early and honest: it doesn't deliver satisfactorily yet. There are lots of loops, and at the end something is regularly missing — the deployment, for one. That's not a failure to hide; it's the interesting part. A toy problem gives you a clean success that proves nothing. A real codebase gives you a factory wrestling with things a Trello clone never has, and that's where I actually learn something.

<!-- TODO: concrete observations as they come in.
- Where do the loops happen — which agent, which step?
- What is consistently missing at the end besides deployment?
- Any pattern to the failures (context limits? architecture misunderstanding? test gaps?)?
-->

## What I'm measuring this time

Two things I explicitly want to fix from part 1:

**Sub-agent token tracking.** In the first benchmark I couldn't attribute the token consumption of self-spawned sub-agents. Before I trust any cost comparison on a real codebase, I need to see where the tokens actually go.

**Quality as a metric.** Part 1 measured whether things worked, not how good the code was. On an existing codebase, "it runs" is nowhere near enough — respecting the architecture and not introducing side effects matters more than passing a smoke test.

<!-- TODO: results table — pending. Do not fill with estimates.
| Exp | Round | Method | Model | Result | Quality | Cost |
| ... |
-->

## Where this is going

<!-- TODO: write the real conclusion once there's data.
For now: this is the harder, more honest test the first benchmark asked for.
The point isn't a clean win — it's finding out where the factory breaks on real code,
and whether the tracking and quality metrics make the picture legible.
-->

To be continued…
