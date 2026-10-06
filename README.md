# Quality Shipping Services — Corporate Website

Static, informational corporate website for **Quality Shipping Services Pvt. Ltd.**, a freight forwarding company based in Bengaluru, India.

Built with [Astro](https://astro.build) and output as plain HTML/CSS with optimised images — no backend, database, CMS or server runtime is required. The `dist/` folder produced by the build can be hosted on any static host.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage — hero, company intro, services, value proposition, industries, India connectivity map, process, CTA |
| `/about` | Company profile, service philosophy, capabilities, values |
| `/services` | Services overview with anchored sections for each service |
| `/services/ocean-freight` | Ocean freight (FCL & LCL) detail page |
| `/services/air-freight` | Air freight detail page |
| `/services/import-export-logistics` | Import & export logistics detail page |
| `/services/project-cargo` | Project & special cargo detail page |
| `/industries` | Industries served |
| `/global-network` | Indian trade gateways and international trade lanes |
| `/contact` | Contact details, contact form, map section |
| `/request-a-quote` | Detailed shipping enquiry form |
| `/privacy-policy`, `/terms-and-conditions` | Legal templates (drafts for review) |
| `/404` | Not-found page |

## Getting started

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run check      # type-check all pages and components
```

Node.js 20 or newer is recommended.

## Where to edit company information

All company-specific content lives in **`src/data/site.ts`**. Update this single file and rebuild:

| Field | Status | Notes |
| --- | --- | --- |
| `SITE_URL` | Verified | `https://www.qualityshipping.in`. Used for canonical URLs, Open Graph tags and the sitemap (also referenced in `public/robots.txt`). |
| `FORM_ENDPOINT` | Verified | FormSubmit AJAX endpoint that emails form submissions to `info@qualityshipping.in` — see **Forms** below. |
| `company.email` | Verified | `info@qualityshipping.in` |
| `company.address` | Verified | Jayanagar, Bengaluru 560041 |
| `company.phone` | Verified | `+91 99459 02055` |
| `company.whatsapp` | **Optional** | Leave empty to hide. |
| `company.businessHours` | Verified | Mon–Fri 10:00 AM – 6:00 PM IST; Sat 10:00 AM – 1:30 PM IST; closed Sundays and public holidays. |
| `company.social.linkedin` | Verified | Other networks are empty and therefore hidden. |
| `company.map` | Verified | Office coordinates, Google Maps place link and directions link. The embedded map (`mapEmbedUrl`) is built from these — no API key required. |
| `company.foundingYear` | Verified | `2017` (shown on About page and in structured data). |
| `company.registrations` | Verified | `CIN U74999KA2017PTC101582` (footer, About page, structured data). Add GST / IATA etc. here if desired. |

Other content files:

- `src/data/services.ts` — service descriptions, capabilities, benefits, photos and SEO metadata.
- `src/data/industries.ts` — industries served.
- `src/pages/about.astro` — company story, principles and the `facts` list.
- `src/pages/global-network.astro` — gateway and region descriptions.
- `src/pages/privacy-policy.astro`, `src/pages/terms-and-conditions.astro` — legal pages (approved 6 Oct 2026). Update the `updated` date whenever the text changes.

## Forms (email delivery, no backend)

The Request a Quote and Contact forms deliver each submission **by email to `info@qualityshipping.in`** through [FormSubmit](https://formsubmit.co) — a free relay that needs no account, server or database. The browser posts the fields to `https://formsubmit.co/ajax/info@qualityshipping.in`; FormSubmit emails them as a table, with *Reply-To* set to the visitor's address so the team can reply directly from the inbox.

**One-time activation (important):** the very first submission makes FormSubmit send an *"Activate form"* email to `info@qualityshipping.in`. Someone must click the activation link in that email once. Until that is done, submissions are held and the site shows the fallback panel (see below). After activation, every submission is delivered immediately.

Behaviour on the page:

- fields are validated in the browser before sending; the button shows "Sending…" while the request is in flight;
- on success a confirmation panel is shown and the form is cleared;
- if sending fails (offline, not yet activated, rate-limited) the panel explains this and offers a **"Send Enquiry by Email"** button that opens the visitor's mail client pre-filled with everything they typed — so no enquiry is lost;
- a hidden honeypot field (`_honey`) and FormSubmit's own filtering reduce spam. If spam becomes a problem, set `_captcha` to `'true'` in `src/scripts/forms.ts` to enable FormSubmit's reCAPTCHA step.

To change the destination address, edit `FORM_ENDPOINT` in `src/data/site.ts` (and re-activate). To move to another provider later (Formspree, Web3Forms, Netlify Forms, a custom endpoint), only `src/scripts/forms.ts` needs to change.

## Logo and brand assets

The company only had the logo at 50 × 50 and 100 × 100 px (archived in `src/assets/brand/original/`). The mark was **recreated as a vector**: the teal ring, inner wave and navy swoosh were traced from the bitmap, and the dotted globe was regenerated procedurally so it is crisp at any size. Please review it against the original and request any adjustments.

- `public/images/logo-mark.svg` — master vector mark (used in the header/footer and as the SVG favicon).
- `public/images/logo-mark.png` (1024 px) and `logo-mark-2048.png` — transparent PNGs for print, presentations, partners.
- `public/images/logo-full.png` — horizontal lockup with the company name.
- `public/favicon.svg`, `public/favicon.png`, `public/icons/*` — favicons, Apple touch icon and PWA icons.
- `public/images/og-default.jpg` — social-sharing image.

Regenerate every raster asset from the SVG with `npm run generate:brand`.

## Photography

Photographs are sourced from [Unsplash](https://unsplash.com/license) (free for commercial use, no attribution required; a courtesy credit is shown in the footer). Source files are in `src/assets/photos/` and are converted to responsive WebP at build time. Per the company's preference the site uses this curated stock imagery rather than photos of its own premises; any image can be swapped by replacing the file of the same name.

The dotted world map is generated from [`@svg-maps/world`](https://github.com/VictorCazanave/svg-maps) (CC BY 4.0, credited in the footer): `npm run generate:map`.

## Deployment

### GitHub Pages (configured)

The site is hosted on GitHub Pages and deployed automatically by `.github/workflows/deploy.yml`:

1. Every push to `main` builds the site with Node 22 and publishes `dist/` to GitHub Pages (Settings → Pages → Source must be **GitHub Actions**).
2. `public/CNAME` pins the custom domain `www.qualityshipping.in`; do not delete it.
3. DNS at the domain registrar:
   - `www` → **CNAME** → `mbegar.github.io`
   - apex `qualityshipping.in` → **A** records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and optionally **AAAA** `2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153`). GitHub then redirects the apex to `www`.
4. After DNS propagates, in Settings → Pages tick **Enforce HTTPS** (the certificate is issued automatically, usually within an hour).

To publish a change: edit, commit, `git push` — the live site updates in about two minutes. Deployment history is under the repository's **Actions** tab.

### Other static hosts

Run `npm run build` and upload the contents of `dist/` to any static host.

- **Netlify / Vercel / Cloudflare Pages:** work out of the box — build command `npm run build`, publish directory `dist`. Clean URLs (`/about`) are served automatically.
- **Nginx / Apache / cPanel:** pages are emitted as `about.html`, `services/ocean-freight.html` etc. Enable clean URLs with `try_files $uri $uri.html $uri/ =404;` (Nginx) or `Options +MultiViews` / a rewrite rule (Apache). Alternatively change `build.format` to `'directory'` in `astro.config.mjs`.

## Pre-launch checklist

- [x] Form delivery activated on FormSubmit (6 Oct 2026) — the next real submission is delivered to `info@qualityshipping.in`.
- [ ] Approve the recreated vector logo (or request adjustments).
- [x] Privacy Policy and Terms & Conditions approved and dated.
- [ ] Optionally add a WhatsApp number (`company.whatsapp`) and further registrations (GST, IATA…).
- [x] DNS records added at GoDaddy (6 Oct 2026).
- [ ] Enable **Enforce HTTPS** in GitHub Pages settings once GitHub has issued the certificate.
- [ ] Verify the domain in Google Search Console and submit `https://www.qualityshipping.in/sitemap-index.xml`.
- [ ] Set up analytics (if desired) and update the cookie section of the Privacy Policy accordingly.
