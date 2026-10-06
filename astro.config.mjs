// @ts-check
import { defineConfig } from 'astro/config';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import { SITE_URL } from './src/data/site.ts';

export default defineConfig({
  // Public URL used for canonical links, Open Graph tags and the sitemap.
  // Update SITE_URL in src/data/site.ts once the production domain is confirmed.
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  integrations: [
    sitemap({
      // Every page is static, so the build date is an honest lastmod.
      lastmod: new Date(),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        if (path === '/') return { ...item, priority: 1.0, changefreq: ChangeFreqEnum.WEEKLY };
        if (path.startsWith('/services')) return { ...item, priority: 0.9, changefreq: ChangeFreqEnum.MONTHLY };
        if (path === '/request-a-quote' || path === '/contact')
          return { ...item, priority: 0.8, changefreq: ChangeFreqEnum.MONTHLY };
        if (path === '/privacy-policy' || path === '/terms-and-conditions')
          return { ...item, priority: 0.2, changefreq: ChangeFreqEnum.YEARLY };
        return { ...item, priority: 0.7, changefreq: ChangeFreqEnum.MONTHLY };
      },
    }),
  ],
});
