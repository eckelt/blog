import mermaid from "mermaid";

/**
 * Client-side Mermaid renderer wired into the ecke.lt design system.
 *
 * Diagrams inherit the live design tokens (colours + fonts from tokens.css),
 * so they always match the surrounding page and switch automatically between
 * the light and dark palette via prefers-color-scheme.
 */

function themeVariables() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string) => cs.getPropertyValue(name).trim();

  const accent = v("--accent");
  const text = v("--text");
  const muted = v("--muted");
  const bg = v("--bg");
  const surface = v("--surface");
  const rule = v("--rule");

  return {
    fontFamily: v("--font-body") || "sans-serif",
    fontSize: "15px",
    background: bg,
    // nodes
    primaryColor: surface,
    primaryTextColor: text,
    primaryBorderColor: accent,
    mainBkg: surface,
    nodeBorder: accent,
    nodeTextColor: text,
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

function configure() {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    themeVariables: themeVariables(),
    flowchart: { curve: "basis", htmlLabels: true },
  });
}

async function render(nodes: HTMLElement[]) {
  configure();
  await mermaid.run({ nodes });
}

export default function initMermaid() {
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("pre.mermaid"),
  );
  if (nodes.length === 0) return;

  // Preserve the original source so we can re-render on theme changes.
  nodes.forEach((node) => {
    if (!node.dataset.src) node.dataset.src = node.textContent ?? "";
  });

  render(nodes);

  // Re-render with the other palette when the colour scheme flips.
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", () => {
    nodes.forEach((node) => {
      node.removeAttribute("data-processed");
      node.innerHTML = node.dataset.src ?? "";
    });
    render(nodes);
  });
}
