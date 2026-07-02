import mermaid from "mermaid";

/**
 * Client-side Mermaid renderer wired into the ecke.lt design system.
 *
 * Diagrams inherit the live design tokens (colours + fonts from tokens.css),
 * so they always match the surrounding page and switch automatically between
 * the light and dark palette via prefers-color-scheme.
 */

function themeVariables(scope: Element) {
  const cs = getComputedStyle(scope);
  const v = (name: string) => cs.getPropertyValue(name).trim();

  // Falls back to the site accent when no post category sets --diagram-accent.
  const accent = v("--diagram-accent") || v("--accent");
  const accentBg = v("--diagram-accent-bg") || v("--surface");
  const text = v("--text");
  const muted = v("--muted");
  const bg = v("--bg");
  const rule = v("--rule");

  return {
    fontFamily: v("--font-body") || "sans-serif",
    fontSize: "15px",
    background: bg,
    // nodes — filled and lettered like the matching tag pill: pale tint,
    // accent-colored text and border, exactly like the tag's own styling
    primaryColor: accentBg,
    primaryTextColor: accent,
    primaryBorderColor: accent,
    mainBkg: accentBg,
    nodeBorder: accent,
    nodeTextColor: accent,
    // edges
    lineColor: muted,
    edgeLabelBackground: bg,
    // clusters / subgraphs
    clusterBkg: bg,
    clusterBorder: rule,
    // misc
    secondaryColor: bg,
    tertiaryColor: bg,
    titleColor: text,
    textColor: text,
  };
}

function configure(scope: Element) {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    themeVariables: themeVariables(scope),
    flowchart: { curve: "basis", htmlLabels: true },
  });
}

async function render(nodes: HTMLElement[], scope: Element) {
  configure(scope);
  await mermaid.run({ nodes });
}

export default function initMermaid() {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("pre.mermaid"),
  );
  if (nodes.length === 0) return;

  // Reads --diagram-accent from the post's <article> (set per its first tag),
  // falling back to <html> when there's no enclosing article.
  const scope = nodes[0].closest("article") ?? document.documentElement;

  // Preserve the original source so we can re-render on theme changes.
  nodes.forEach((node) => {
    if (!node.dataset.src) node.dataset.src = node.textContent ?? "";
  });

  render(nodes, scope);

  // Re-render with the other palette when the colour scheme flips.
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", () => {
    nodes.forEach((node) => {
      node.removeAttribute("data-processed");
      node.innerHTML = node.dataset.src ?? "";
    });
    render(nodes, scope);
  });
}
