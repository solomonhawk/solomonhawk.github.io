import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';

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
      applyBaseStyles: false,
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    compress({
      css: false,
    }),
  ],
});
