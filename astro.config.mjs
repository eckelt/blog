// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import remarkMermaid from "./src/plugins/remark-mermaid.mjs";
import rehypeTableScroll from "./src/plugins/rehype-table-scroll.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.ecke.lt",
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkMermaid],
    rehypePlugins: [rehypeTableScroll],
  },
});
