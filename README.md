# Dalal Technologies: corporate website

A bilingual (English/French) website for Dalal Technologies: Technology Consulting & Digital Engineering.

**Before publishing, read [`VERIFICATION.md`](VERIFICATION.md)**: every claim that needs your confirmation is listed there.
To put the site online, see [`DEPLOYMENT.md`](DEPLOYMENT.md).

## What's included

| Area | Pages (each in `/en/` and `/fr/`) |
|---|---|
| Home | Hero, capabilities, why Dalal, featured work, **interactive BI dashboard**, **AI workflow demonstration**, industries, experience, approach, contact CTA |
| Services | Overview + 6 detail pages (BI & Analytics, Technology Consulting, Enterprise Software, AI & Automation, Digital Government, Digital Experience) |
| Industries | Overview + 6 sector pages that keep experience, published work, demonstrations and proposed applications separate |
| Work & Innovation | Filterable portfolio (status + sector, shareable URL) + 8 case studies |
| About | Company story and the experience behind it (no names or photos) |
| Insights | 3 short articles |
| Contact | Validated form (Netlify Forms), data notice, email/phone links, thank-you page |
| Legal | Privacy notice, terms of use, 404 page |

66 pages in total, plus sitemap.xml, robots.txt, hreflang tags, Open Graph images, a favicon and a web manifest.

## How it's built

- **React 19 + TypeScript**, pre-rendered to static HTML at build time (fast, SEO-friendly, no server needed).
- Only the interactive parts load JavaScript ("islands"): the dashboard, the AI workflow, the portfolio filter and the contact form. Every other page works without JavaScript.
- **esbuild** for bundling. Hand-written CSS design system in `src/styles/main.css`. Self-hosted Red Hat Display / Red Hat Text fonts (SIL Open Font License).
- The dashboard charts are custom SVG, so no chart library is needed.
- No paid services. Netlify's free tier covers hosting and the contact form.

> The brief preferred Next.js, Tailwind and Recharts. Those packages couldn't be installed in the environment where the site was built. So it uses the same stack as your Sénégal Consulaire Digital demo (React + TypeScript + esbuild on Netlify). The components are standard React and can be moved to Next.js later if you want.

## Editing content

| To change… | Edit |
|---|---|
| Email, phone, location, site URL | `src/config/site.ts` |
| Home and About text, experience section, contact form text | `src/content/company.ts` |
| Services | `src/content/services.ts` |
| Industries | `src/content/industries.ts` |
| Portfolio (add, hide or edit projects) | `src/content/projects.ts`: copy a record, give it a unique `slug`, set `visible: true` |
| Articles | `src/content/insights.ts` |
| Menu and button labels | `src/i18n/ui.ts` |
| Colours, type, layout | `src/styles/main.css` (tokens at the top) |
| Logos | `public/brand/` |
| Project screenshots | `public/work/` (1280×800 JPG) |

Every text entry has an `en` and an `fr` version side by side.

## Commands

```bash
npm install
npm run build            # → dist/
npm run serve            # http://localhost:4321
npm test                 # 16 end-to-end checks (Playwright, Chromium)
node scripts/make-og.mjs # regenerate social-sharing images
```

## Quality checks run before delivery

`npm test` on the production build: **16/16 passed** (see `tests/results.json`):

- All 64 linked pages crawled in both languages: 0 broken links
- 0 console or runtime errors on every page
- Unique title and description on every page; correct `lang` on French pages
- 404 page; language switcher keeps you on the same page; root redirect remembers your language
- Dashboard: period and unit filters update every KPI, chart tooltip, data table
- AI workflow: classification → processing → human review (reassign) → outcome; input validation
- Portfolio filters and shareable filter URLs
- Contact form: 5 validation errors shown, data notice present, then successful submission
- Embassy-demo disclaimer present in both languages
- No horizontal scrolling at 375 px on any page; mobile menu opens, closes with Escape and navigates
- Skip link and visible keyboard focus
- Sitemap, robots, hreflang, Open Graph image

Not tested here: the live Netlify Forms delivery (it needs a real Netlify deploy) and real Safari/iPhone hardware (the tests emulate a 375 px mobile viewport in Chromium).
