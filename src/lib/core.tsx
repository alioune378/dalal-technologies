import type { ReactNode } from 'react';
import type { Locale } from '../config/site';
import type { L } from '../i18n/ui';

export const href = (locale: Locale, path = '') => `/${locale}/${path ? path.replace(/^\/|\/$/g, '') + '/' : ''}`;

export type PageCtx = {
  locale: Locale;
  /** path without locale, e.g. 'services/business-intelligence' */
  path: string;
};

export const tr = (v: L, locale: Locale) => v[locale];

/**
 * Server-rendered wrapper for an interactive component.
 * The client script finds [data-island] and hydrates it with the same props.
 */
export function Island<P extends object>({ name, props, children, className }: { name: string; props: P; children: ReactNode; className?: string }) {
  return (
    <div className={className} data-island={name} data-props={JSON.stringify(props)}>
      {children}
    </div>
  );
}

export function formatDate(iso: string, locale: Locale) {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
