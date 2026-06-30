import { visit } from "unist-util-visit";

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/**
 * Turns ```mermaid fenced code blocks into raw <pre class="mermaid"> nodes,
 * before Shiki touches them, so the diagram source survives intact for the
 * client-side renderer. See src/scripts/mermaid.ts for the rendering + theming.
 */
export default function remarkMermaid() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "mermaid" || !parent || index === null) return;
      parent.children[index] = {
        type: "html",
        value: `<pre class="mermaid">${escapeHtml(node.value)}</pre>`,
      };
    });
  };
}
