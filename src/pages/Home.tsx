import { home, approach } from '../content/company';
import { services } from '../content/services';
import { industries } from '../content/industries';
import { projectBySlug } from '../content/projects';
import { ui } from '../i18n/ui';
import { href, Island, tr, type PageCtx } from '../lib/core';
import { HeroSignal } from '../components/HeroSignal';
import { IndustryIcon } from '../components/Icons';
import { CtaBand, ProjectCard, SectionHead, ServiceCard } from '../components/ui';
import Dashboard from '../islands/Dashboard';
import Workflow from '../islands/Workflow';

export function Home({ ctx }: { ctx: PageCtx }) {
  const { locale } = ctx;
  const core = services.filter((s) => s.tier === 'core');
  const comp = services.filter((s) => s.tier === 'complementary');
  const featured = ['senegal-consulaire-digital', 'lintel-meridian-advisory', 'teranga-city'].map((s) => projectBySlug(s)!).filter((p) => p.visible);
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">{tr(home.heroMarkets, locale)}</p>
            <h1>{tr(home.heroTitle, locale)}</h1>
            <p className="hero-lead">{tr(home.heroLead, locale)}</p>
            <div className="hero-actions">
              <a className="btn btn-gold" href={href(locale, 'services')}>
                {tr(ui.common.explore, locale)}
              </a>
              <a className="btn btn-ghost-light" href={href(locale, 'contact')}>
                {tr(ui.common.discuss, locale)}
              </a>
            </div>
          </div>
          <HeroSignal locale={locale} />
        </div>
      </section>

      <section className="section" aria-labelledby="what">
        <div className="wrap">
          <SectionHead id="what" title={tr(home.whatTitle, locale)} lead={tr(home.whatLead, locale)} />
          <h3 className="tier-label">{tr(home.core, locale)}</h3>
          <div className="service-grid core">
            {core.map((s) => (
              <ServiceCard key={s.slug} service={s} locale={locale} />
            ))}
          </div>
          <h3 className="tier-label">{tr(home.complementary, locale)}</h3>
          <div className="service-grid comp">
            {comp.map((s) => (
              <ServiceCard key={s.slug} service={s} locale={locale} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section why" aria-labelledby="why">
        <div className="wrap why-grid">
          <div>
            <h2 id="why">{tr(home.whyTitle, locale)}</h2>
            <p className="lead">{tr(home.whyLead, locale)}</p>
          </div>
          <ul className="principles">
            {home.principles.map((p, i) => (
              <li key={i}>
                <h3>{tr(p.title, locale)}</h3>
                <p>{tr(p.body, locale)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section work-feature" aria-labelledby="work">
        <div className="wrap">
          <SectionHead id="work" title={tr(home.workTitle, locale)} lead={tr(home.workLead, locale)} />
          <div className="feature-grid">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} locale={locale} variant={i === 0 ? 'feature' : 'standard'} />
            ))}
          </div>
          <p className="more-link">
            <a className="text-link" href={href(locale, 'work')}>
              {tr(ui.common.viewAll, locale)}
            </a>
          </p>
        </div>
      </section>

      <section className="section navy showcase" aria-labelledby="bi">
        <div className="wrap">
          <SectionHead id="bi" light title={tr(home.biTitle, locale)} lead={tr(home.biLead, locale)} />
          <Island name="Dashboard" props={{ locale }}>
            <Dashboard locale={locale} />
          </Island>
        </div>
      </section>

      <section className="section navy-deep showcase" aria-labelledby="ai">
        <div className="wrap">
          <SectionHead id="ai" light title={tr(home.aiTitle, locale)} lead={tr(home.aiLead, locale)} />
          <Island name="Workflow" props={{ locale }}>
            <Workflow locale={locale} />
          </Island>
        </div>
      </section>

      <section className="section" aria-labelledby="ind">
        <div className="wrap">
          <SectionHead id="ind" title={tr(home.industriesTitle, locale)} lead={tr(home.industriesLead, locale)} />
          <ul className="industry-list">
            {industries.map((i) => (
              <li key={i.slug}>
                <a href={href(locale, `industries/${i.slug}`)}>
                  <IndustryIcon name={i.slug} size={28} className="ind-icon" />
                  <span className="ind-title">{tr(i.title, locale)}</span>
                  <span className="ind-short">{tr(i.short, locale)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section founder-band" aria-labelledby="founder">
        <div className="wrap founder-grid">
          <div className="founder-type">
                        <span className="ft-rule" />
            <span className="ft-name">15+</span>
            <span className="ft-role">{tr({ en: 'years of operations and business intelligence experience in automotive and financial services', fr: 'ans d’expérience en opérations et en intelligence d’affaires dans l’automobile et les services financiers' }, locale)}</span>
          </div>
          <div>
            <h2 id="founder">{tr(home.founderTitle, locale)}</h2>
            <p className="lead">{tr(home.founderBody, locale)}</p>
            <a className="text-link" href={href(locale, 'about')}>
              {tr(home.founderLink, locale)}
            </a>
          </div>
        </div>
      </section>

      <section className="section approach" aria-labelledby="approach">
        <div className="wrap">
          <SectionHead id="approach" title={tr(home.approachTitle, locale)} lead={tr(home.approachLead, locale)} />
          <ol className="steps">
            {approach.map((s, i) => (
              <li key={i}>
                <span className="step-n">{i + 1}</span>
                <h3>{tr(s.title, locale)}</h3>
                <p>{tr(s.body, locale)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand locale={locale} title={tr(home.ctaTitle, locale)} body={tr(home.ctaBody, locale)} />
    </>
  );
}
