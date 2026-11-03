/**
 * Company and contact configuration.
 * Everything here can be changed without touching the design.
 * The site URL can also be set at build time with the SITE_URL environment variable.
 */
export const site = {
  name: 'Dalal Technologies',
  /** Public URL used for canonical links, sitemap and Open Graph. No trailing slash. */
  url: (typeof process !== 'undefined' && process.env.SITE_URL) || 'https://stupendous-starship-46d64a.netlify.app',
  /** Replace with a company-domain address once one exists (e.g. contact@yourdomain). */
  email: 'info@dalaltechnologies.com',
  phoneDisplay: '+1 (614) 589-2962',
  phoneHref: '+16145892962',
  location: { en: '228 Park Ave S, PMB 473086, New York, NY 10003', fr: '228 Park Ave S, PMB 473086, New York, NY 10003, États-Unis' },
  /** Mailing address, also given to search engines as structured data. */
  address: { street: '228 Park Ave S, PMB 473086', city: 'New York', region: 'NY', postalCode: '10003', country: 'US' },
  markets: { en: 'United States, Canada, Senegal and international markets', fr: 'États-Unis, Canada, Sénégal et marchés internationaux' },
  /** Netlify Forms form name. Set to '' to hide the form and show email/phone only. */
  contactFormName: 'contact',
  /** Optional LinkedIn or other profiles. Leave empty to hide. */
  social: [] as { label: string; href: string }[],
  /** Year shown in the footer copyright. */
  year: new Date().getFullYear(),
};

export type Locale = 'en' | 'fr';
export const locales: Locale[] = ['en', 'fr'];
