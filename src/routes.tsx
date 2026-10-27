import type { ReactElement } from 'react';
import { locales, site, type Locale } from './config/site';
import { about, contactCopy, home } from './content/company';
import { services } from './content/services';
import { industries } from './content/industries';
import { visibleProjects } from './content/projects';
import { insights } from './content/insights';
import { ui } from './i18n/ui';
import { tr, type PageCtx } from './lib/core';
import { Header, Footer } from './components/Chrome';
import { Home } from './pages/Home';
import { IndustriesIndex, IndustryDetail, ServiceDetail, ServicesIndex } from './pages/Capabilities';
import { About, Contact, InsightDetail, InsightsIndex, Legal, legalTitle, NotFound, ProjectDetail, Thanks, WorkIndex } from './pages/Other';

export type Route = {
  locale: Locale;
  path: string; // without locale
  title: string;
  description: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  render: () => ReactElement;
};

const L = (en: string, fr: string) => ({ en, fr });
const meta = {
  services: L('Technology consulting, BI, platforms and AI services', 'Expertises : conseil, BI, plateformes et IA'),
  servicesD: L(
    'Business intelligence and analytics, technology consulting, enterprise software, AI and automation, digital government and web engineering.',
    'Intelligence d’affaires, conseil technologique, logiciels d’entreprise, IA et automatisation, administration numérique et ingénierie web.',
  ),
  industries: L('Industries and sectors of focus', 'Secteurs d’intervention'),
  industriesD: L(
    'Government, financial services, automotive, infrastructure and energy, real estate, and retail: where our experience and work give us a useful point of view.',
    'Administrations, services financiers, automobile, infrastructures et énergie, immobilier et commerce : là où notre expérience et nos travaux nous donnent un point de vue utile.',
  ),
  work: L('Work and innovation', 'Réalisations et innovation'),
  workD: L(
    'Published projects, functional demonstrations and initiatives in development, each labeled with its status and ownership.',
    'Projets en ligne, démonstrations fonctionnelles et initiatives en développement, chacun avec son statut et sa nature.',
  ),
  insights: L('Insights', 'Analyses'),
  insightsD: L('Practical perspectives on data, digital services and responsible automation.', 'Des points de vue concrets sur les données, les services numériques et l’automatisation responsable.'),
};

function page(ctx: PageCtx, body: ReactElement) {
  return (
    <>
      <Header ctx={ctx} />
      <main id="main" tabIndex={-1}>
        {body}
      </main>
      <Footer ctx={ctx} />
    </>
  );
}

export function buildRoutes(): Route[] {
  const out: Route[] = [];
  for (const locale of locales) {
    const add = (path: string, title: string, description: string, el: (ctx: PageCtx) => ReactElement, extra: Partial<Route> = {}) => {
      const ctx = { locale, path };
      out.push({ locale, path, title, description, render: () => page(ctx, el(ctx)), ...extra });
    };
    add('', tr(home.metaTitle, locale), tr(home.metaDescription, locale), (c) => <Home ctx={c} />);
    add('services', tr(meta.services, locale), tr(meta.servicesD, locale), (c) => <ServicesIndex ctx={c} />);
    for (const s of services) add(`services/${s.slug}`, tr(s.title, locale), tr(s.short, locale), (c) => <ServiceDetail ctx={c} slug={s.slug} />);
    add('industries', tr(meta.industries, locale), tr(meta.industriesD, locale), (c) => <IndustriesIndex ctx={c} />);
    for (const i of industries) add(`industries/${i.slug}`, tr(i.title, locale), tr(i.short, locale), (c) => <IndustryDetail ctx={c} slug={i.slug} />);
    add('work', tr(meta.work, locale), tr(meta.workD, locale), (c) => <WorkIndex ctx={c} />);
    for (const p of visibleProjects) add(`work/${p.slug}`, `${p.name}: ${tr(p.sector, locale)}`, tr(p.summary, locale), (c) => <ProjectDetail ctx={c} slug={p.slug} />);
    add('about', tr(about.metaTitle, locale), tr(about.metaDescription, locale), (c) => <About ctx={c} />);
    add('insights', tr(meta.insights, locale), tr(meta.insightsD, locale), (c) => <InsightsIndex ctx={c} />);
    for (const a of insights) add(`insights/${a.slug}`, tr(a.title, locale), tr(a.dek, locale), (c) => <InsightDetail ctx={c} slug={a.slug} />, { type: 'article' });
    add('contact', tr(contactCopy.metaTitle, locale), tr(contactCopy.metaDescription, locale), (c) => <Contact ctx={c} />);
    add('contact/thanks', tr(contactCopy.form.sentTitle, locale), tr(contactCopy.form.sentBody, locale), (c) => <Thanks ctx={c} />, { noindex: true });
    add('privacy', tr(legalTitle('privacy'), locale), `${site.name}: ${tr(legalTitle('privacy'), locale)}`, (c) => <Legal ctx={c} kind="privacy" />);
    add('terms', tr(legalTitle('terms'), locale), `${site.name}: ${tr(legalTitle('terms'), locale)}`, (c) => <Legal ctx={c} kind="terms" />);
  }
  return out;
}

export function notFoundRoute(locale: Locale): Route {
  const ctx = { locale, path: '' };
  return { locale, path: '404', title: locale === 'fr' ? 'Page introuvable' : 'Page not found', description: '', noindex: true, render: () => page(ctx, <NotFound ctx={ctx} />) };
}

export { ui };
