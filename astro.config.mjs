import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from '@astrojs/mdx';
import prefetch from '@astrojs/prefetch';
import remarkCodeLabels from './plugins/remark-code-labels.mjs';

export default defineConfig({
  site: 'https://solomonhawk.com',
  integrations: [
    mdx({
      remarkPlugins: [remarkCodeLabels],
    }),
    react(),
    prefetch(),
    sitemap(),
    tailwind({
      config: { applyBaseStyles: false },
    })
  ],
});
