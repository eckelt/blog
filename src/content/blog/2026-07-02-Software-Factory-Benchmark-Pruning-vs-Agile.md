---
title: "Two tweaks I was sure would improve the factory. One got expensive, one got weird."
description: "Context-Pruning and the Agile Factory — the two variations I pulled out of the first benchmark to keep it readable. Here's what they actually did."
pubDate: 2026-07-02
lang: "en"
tags: ["AI", "Software Factory", "Hackers&Wizards"]
---

In [the first benchmark](/2026-06-30-software-factory-benchmark-1-en) I pulled two variations out of the main story to keep it readable. The spine there was Vibe → Research→Plan→Implement → Factory. On top of the plain factory I had tried two ideas that were supposed to make it clearly better. They didn't behave the way I expected, and they were interesting enough that they earned their own post instead of crowding the first one.

Same setup as before, in short: one spec describing a Trello-style Kanban board, held constant across all experiments. Two rounds — the first greenfield API only (R1), the second UI only (R2). A circuit breaker capped runaway cost. If you want the full context, read part 1 first; this post assumes it.

## The two ideas

**Context-Pruning.** The context window is most effective in its first ~120k tokens, so I wanted to keep it as lean as possible. Whenever a decision gets made, I store it as an ADR (architecture decision record) instead of leaving it to sit in the running context. Sub-agents then load an ADR only when they actually need it. The bet: leaner context per agent, sharper focus, better output.

**Agile Factory.** My attempt to hand the factory an unfair advantage. I let the agents communicate with each other, the way a cross-functional team does — the Planner talking to the Builder, the Builder checking back with the Reviewer, and so on, across rounds. If real teams get their edge from communication, maybe a factory could too.

Both sounded good on paper. That's exactly why I wanted to measure them rather than just assert them.

## The numbers

Here are the plain factory (013) and the two variations (014 Pruning, 015 Agile Factory) side by side:

| Exp |  Round   | Method          | Model   |   Result |     Cost |
| :-: | :------: | --------------- | ------- | -------: | -------: |
| 013 |  R1 API  | factory         | sonnet  |    31/31 |    $1.62 |
| 013 |  R1 API  | factory         | gpt-5.5 |    62/62 |    $1.19 |
| 014 |  R1 API  | factory-pruning | sonnet  |    31/31 |    $3.00 |
| 014 |  R1 API  | factory-pruning | gpt-5.5 |    62/62 |    $0.98 |
| 015 |  R1 API  | agile-factory   | sonnet  | 22/31 ⚠️ |    $3.30 |
| 015 |  R1 API  | agile-factory   | gpt-5.5 | 46/62 ⚠️ |   $36.93 |
| 013 |  R2 UI   | factory         | sonnet  |      0/9 |    $0.89 |
| 014 |  R2 UI   | factory-pruning | sonnet  |      9/9 |    $1.75 |
| 015 |  R2 UI   | agile-factory   | sonnet  |      4/9 |    $2.45 |

⚠️ The circuit breaker kicked in to keep the run from burning arbitrary cost.

## Agent communication is expensive

The Agile Factory is the one that got expensive. In the API round with gpt-5.5 it cost $36.93 and still only reached 46/62 before the circuit breaker tripped — roughly thirty times the plain factory's $1.19 for a worse result.

The mechanism is straightforward once you see it. To communicate, agents have to read each other's context. Even with naive all-to-all communication, the context demand grows quadratically with the number of agents. Spread that over several coordination rounds and it turns into a context explosion. The Agile Factory would probably have finished if cost were no object — that's what the circuit breaker is telling me. But "would have finished if cost didn't matter" is not the win I was hoping for.

So the cross-functional-team analogy has a catch: human teams communicate cheaply relative to their output. Agents don't. Every round of chatter is paid for in tokens, and it compounds.

## Pruning stays a mystery

The result I trust least is in the UI round: Context-Pruning scored 9/9 while the plain factory scored 0/9. That's not a small edge — it's the difference between "works" and "doesn't."

I don't have an explanation I'd defend. My best guess is that pruning gave the sub-agents a more sharply focused context, and for a UI task that focus might be exactly what tips it over. Or it was luck. Both are possible, and I can't currently tell them apart. In the API round the same method cost about twice as much as the plain factory (sonnet $3.00 vs $1.62) for the same 31/31 — so it's not free, and it's not consistently better either.

## Why I can't say more yet

The honest limitation underneath both findings: I couldn't cleanly measure the token consumption of the sub-agents. In my analysis they can't be attributed reliably, so the costs above are fuzzier than I'd like — especially for the variations, which spawn and coordinate the most. I don't want to paper over that.

That's also the thing I need before I take either of these seriously: reliable sub-agent tracking. Until I can see where the tokens actually go, "Agile Factory is too expensive" and "Pruning mysteriously wins at UI" are observations, not conclusions.

So these two go back on the shelf for now — measured, noted, and waiting for a setup that can actually explain them.
